import pool from "./db-services"
import {QueryResultRow} from "pg";
import {IQuestion, IResponseObject, ISettings} from "pre-shift-examiner-types";

class TestingService {

    static async getQuestions(setting_id: string): Promise<IResponseObject> {

        let responseObject: IResponseObject = {httpStatusCode: 500};

        try {
            let queryText = `SELECT work.settings.number_of_questions_per_test,
                                    work.settings.category_ids_per_test,
                                    work.settings.test_duration,
                                    work.settings.result_display_type
                             FROM work.settings
                             WHERE work.settings.id = $1`
            let queryValues = [setting_id];
            let queryResultRows: QueryResultRow[] = (await pool.query(queryText, queryValues)).rows;

            if (queryResultRows.length != 1) return {...responseObject, httpStatusCode: 401};

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
                              (SELECT work.questions.id      AS question_id,
                                      work.questions.text AS question_text
                               FROM work.questions ${category_ids_per_test ? 'WHERE category_id = ANY ($1)' : ''}
                               ORDER BY random()
                               LIMIT ${category_ids_per_test ? '$2' : '$1'}) as question
                         WHERE work.options.question_id = question.question_id
                         GROUP BY question.question_id, question.question_text
                         ORDER BY random()`;
            queryValues = [category_ids_per_test, number_of_questions_per_test].filter(value => value != null);
            queryResultRows = (await pool.query(queryText, queryValues)).rows;

            if (queryResultRows.length == 0) return responseObject;

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

        } catch (e) {
            return responseObject;
        }
    }
}

export default TestingService;
