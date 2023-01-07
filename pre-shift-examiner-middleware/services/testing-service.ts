import pool from "./db-services"
import {QueryResultRow} from "pg";

interface Settings {
    testDuration: number,
    resultDisplayType: 'short' | 'detail'
}

interface Question {
    id: number,
    content: string,
    options: { id: number, content: string }[],
}

interface User {
    id: number,
    personnel_id: number,
    surname: string,
    name: string,
    patronymic: string,
}

interface ResponseObject {
    httpStatusCode: number,
    questions?: Question[] | null,
    user?: User | null,
    settings?: Settings | null
}

class TestingService {

    static async getQuestions(personnel_id: string): Promise<ResponseObject> {

        let responseObject: ResponseObject = {httpStatusCode: 500};

        let queryText = `SELECT work.users.id,
                                work.users.personnel_id,
                                work.users.surname,
                                work.users.name,
                                work.users.patronymic,
                                work.settings.number_of_questions_per_test,
                                work.settings.category_ids_per_test,
                                work.settings.test_duration,
                                work.settings.result_display_type
                         FROM work.users,
                              work.settings
                         WHERE work.users.setting_id = work.settings.id
                           AND work.users.personnel_id = $1`;
        let queryValues = [personnel_id];
        let queryResultRows: QueryResultRow[] = (await pool.query(queryText, queryValues)).rows;

        if (queryResultRows.length != 1) return {...responseObject, httpStatusCode: 401};

        const user: User = {
            id: queryResultRows[0].id,
            personnel_id: queryResultRows[0].personnel_id,
            surname: queryResultRows[0].surname,
            name: queryResultRows[0].name,
            patronymic: queryResultRows[0].patronymic,
        };

        const {
            number_of_questions_per_test,
            category_ids_per_test,
            test_duration,
            result_display_type
        } = queryResultRows[0];

        const settings: Settings = {testDuration: test_duration, resultDisplayType: result_display_type}

        queryText = `SELECT question.question_id,
                            question.question_content,
                            array_agg(work.options.id)      AS option_ids,
                            array_agg(work.options.content) AS option_contents
                     FROM work.options,
                          (SELECT work.questions.id      AS question_id,
                                  work.questions.content AS question_content
                           FROM work.questions ${category_ids_per_test ? 'WHERE category_id = ANY ($1)' : ''}
                           ORDER BY random()
                           LIMIT ${category_ids_per_test ? '$2' : '$1'}) as question
                     WHERE work.options.question_id = question.question_id
                     GROUP BY question.question_id, question.question_content
                     ORDER BY random()`;
        queryValues = [category_ids_per_test, number_of_questions_per_test].filter(value => value != null);
        queryResultRows = (await pool.query(queryText, queryValues)).rows;

        if (queryResultRows.length == 0) return responseObject;

        let questions: Question[] = [];
        for (let i = 0; i < queryResultRows.length; i++) {
            const {question_id, question_content, option_ids, option_contents} = queryResultRows[i];
            let question: Question = {
                id: question_id,
                content: question_content,
                options: option_ids.map((id: number, index: number) => {
                    return {id: id, content: option_contents[index]}
                })
            };
            questions.push(question);
        }

        return {...responseObject, httpStatusCode: 200, questions: questions, user: user, settings: settings};
    }
}

export default TestingService;
