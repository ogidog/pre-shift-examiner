import pool from "../db-services";
import {QueryResultRow} from "pg";
import {IQuestion, IResponseObject, ISettings, ErrorMessages, IUser, IAnswers, IResult} from "pre-shift-examiner-types";
import {
    QC_SELECT_SETTINGS,
    QC_SELECT_QUESTIONS_WITH_OPTIONS,
    QC_INSERT_ANSWERS,
} from "./testing-service-sql"

class TestingService {

    static async getQuestions(settingId: IUser["settingId"]): Promise<IResponseObject> {

        const responseObject: IResponseObject = {httpStatusCode: 500};

        try {
            let queryResultRows: QueryResultRow[] = (await pool.query(QC_SELECT_SETTINGS(settingId))).rows;
            if (queryResultRows.length != 1) return {
                ...responseObject,
                error: {message: ErrorMessages.SERVER_ERROR}
            };

            const {
                number_of_questions_per_test,
                category_ids_per_test,
                test_duration,
                result_display_type,
            } = queryResultRows[0];

            const settings: ISettings = {
                testDuration: test_duration,
                resultDisplayType: result_display_type,
            }

            queryResultRows = (await pool.query(QC_SELECT_QUESTIONS_WITH_OPTIONS(category_ids_per_test, number_of_questions_per_test))).rows;
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
                    multiple: correct_true_counter > 1
                };
                questions.push(question);
            }

            return {...responseObject, httpStatusCode: 200, questions: questions, settings: settings};

        } catch (error) {
            return {...responseObject, error: {message: ErrorMessages.SERVER_ERROR}};
        }
    }

    static async checkAnswers(userId: IUser["id"], settingId: IUser["settingId"], answers: IAnswers): Promise<IResponseObject> {

        const dateTime: number = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60 * 1000) / 1000);
        const responseObject: IResponseObject = {httpStatusCode: 500};
        const results = [] as IResult[];

        try {

            let queryResultRows: QueryResultRow[] = (await pool.query(QC_SELECT_SETTINGS(settingId))).rows;
            if (queryResultRows.length != 1) return {
                ...responseObject,
                error: {message: ErrorMessages.SERVER_ERROR}
            };

            const isSaveAnswers = queryResultRows[0]["is_save_answers"];

            await pool.query("BEGIN");

            for (let key in answers) {
                let optionIds = answers[key];
                let queryResult: IResult = (await pool.query(QC_INSERT_ANSWERS(userId, Number(key), optionIds, dateTime))).rows[0];
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
