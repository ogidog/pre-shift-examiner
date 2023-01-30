import pool from "./db-services"
import {QueryResultRow} from "pg";
import {IQuestion, IResponseObject, ISettings, ErrorMessages, IUser, IAnswers} from "pre-shift-examiner-types";

class TestingService {

    static async getQuestions(settingId: IUser["settingId"]): Promise<IResponseObject> {

        let responseObject: IResponseObject = {httpStatusCode: 500};

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

    static async saveAnswers(userId: IUser["id"], answers: IAnswers): Promise<IResponseObject> {
        let responseObject: IResponseObject = {httpStatusCode: 500};
        const dateTime = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60 * 1000) / 1000);

        try {
            await pool.query("BEGIN");
            for (let key in answers) {
                let queryText = `INSERT INTO work.testing (user_id, question_id, option_ids, date_time)
                                 VALUES ($1, $2, $3, to_timestamp($4))`;
                let queryValues = [userId, key, answers[key], dateTime];
                await pool.query(queryText, queryValues);
            }
            await pool.query("COMMIT");

            return {...responseObject, httpStatusCode: 200};

        } catch (error) {
            await pool.query('ROLLBACK');
            return {...responseObject, error: {message: ErrorMessages.SAVING_ANSWERS_ERROR}};
        }
    }
}

export default TestingService;
