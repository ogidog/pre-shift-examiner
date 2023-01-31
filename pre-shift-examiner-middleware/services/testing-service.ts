import pool from "./db-services"
import {QueryResultRow} from "pg";
import {IQuestion, IResponseObject, ISettings, ErrorMessages, IUser, IAnswers, IResult} from "pre-shift-examiner-types";

class TestingService {

    static async getQuestions(settingId: IUser["settingId"]): Promise<IResponseObject> {

        const responseObject: IResponseObject = {httpStatusCode: 500};

        try {
            let queryText = `SELECT work.settings.number_of_questions_per_test,
                                    work.settings.category_ids_per_test,
                                    work.settings.test_duration,
                                    work.settings.result_display_type
                             FROM work.settings
                             WHERE work.settings.id = $1`
            let queryValues = [settingId];
            let queryResultRows: QueryResultRow[] = (await pool.query(queryText, queryValues)).rows;
            if (queryResultRows.length != 1) return {
                ...responseObject,
                error: {message: ErrorMessages.SERVER_ERROR}
            };

            const {
                number_of_questions_per_test,
                category_ids_per_test,
                test_duration,
                result_display_type
            } = queryResultRows[0];

            const settings: ISettings = {testDuration: test_duration, resultDisplayType: result_display_type}

            queryText = `SELECT question.question_id,
                                question.question_text,
                                array_agg(work.options.id)                                       AS option_ids,
                                array_agg(work.options.content)                                  AS option_contents,
                                count(work.options.correct) filter ( where work.options.correct) as correct_true_counter
                         FROM work.options,
                              (SELECT work.questions.id   AS question_id,
                                      work.questions.text AS question_text
                               FROM work.questions ${category_ids_per_test ? 'WHERE category_id = ANY ($1)' : ''}
                               ORDER BY random()
                               LIMIT ${category_ids_per_test ? '$2' : '$1'}) as question
                         WHERE work.options.question_id = question.question_id
                         GROUP BY question.question_id, question.question_text
                         ORDER BY random()`;
            queryValues = [category_ids_per_test, number_of_questions_per_test].filter(value => value != null);
            queryResultRows = (await pool.query(queryText, queryValues)).rows;

            if (queryResultRows.length == 0) return {...responseObject, error: {message: ErrorMessages.SERVER_ERROR}};

            let questions: IQuestion[] = [];
            for (let i = 0; i < queryResultRows.length; i++) {
                const {
                    question_id,
                    question_text,
                    option_ids,
                    option_contents,
                    correct_true_counter
                } = queryResultRows[i];
                let question: IQuestion = {
                    id: question_id,
                    text: question_text,
                    options: option_ids.map((id: number, index: number) => {
                        return {id: id, content: option_contents[index]}
                    }),
                    multiple: correct_true_counter > 1 ? true : false
                };
                questions.push(question);
            }

            return {...responseObject, httpStatusCode: 200, questions: questions, settings: settings};

        } catch (error) {
            return {...responseObject, error: {message: ErrorMessages.SERVER_ERROR}};
        }
    }

    static async checkAnswers(userId: IUser["id"], answers: IAnswers, isSaveAnswers: boolean = true): Promise<IResponseObject> {

        const dateTime = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60 * 1000) / 1000);
        const responseObject: IResponseObject = {httpStatusCode: 500};
        const results = [] as IResult[];

        try {
            await pool.query("BEGIN");

            for (let key in answers) {
                let queryText = `
                    WITH correct_options as (SELECT array_agg(id) as ids
                                             FROM work.options
                                             WHERE correct
                                               AND question_id = $2),
                         insert_result as (
                             INSERT
                                 INTO work.answers (user_id, question_id, option_ids, date_time, is_correct)
                                     VALUES ($1, $2, $3, to_timestamp($4),
                                             (SELECT ($3 @> correct_options.ids) and
                                                     (array_length($3, 1) = array_length(correct_options.ids, 1))
                                              FROM correct_options))
                                     RETURNING question_id, option_ids, is_correct)
                    SELECT insert_result.question_id,
                           insert_result.option_ids,
                           insert_result.is_correct,
                           correct_options.ids as correct_options_ids
                    FROM correct_options,
                         insert_result
                `;
                let queryValues = [userId, key, answers[key], dateTime];
                let queryResult: IResult = (await pool.query(queryText, queryValues)).rows[0];
                results.push(queryResult);
            }

            if (isSaveAnswers) {
                await pool.query("COMMIT");
            } else {
                await pool.query("ROLLBACK");
            }

            return {...responseObject, httpStatusCode: 200, results: results};

        } catch (error: any) {
            await pool.query('ROLLBACK');
            return {...responseObject, error: {message: ErrorMessages.SERVER_ERROR}};
        }
    }
}

export default TestingService;
