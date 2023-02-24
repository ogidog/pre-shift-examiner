import pool from "../db-services";
import {
    IAccessTokenPayload,
    IQuestion,
    IResponseObject,
    ISettings,
    IAnswers,
    IResult
} from "pre-shift-examiner-types";
import {ErrorMessages, Units} from "../../shared/constants"
import {
    QC_SELECT_QUESTIONS_WITH_OPTIONS,
    QC_INSERT_ANSWERS,
    QC_INSERT_OR_UPDATE_SESSIONS,
    QC_SELECT_SESSION_BY_USER_ID,
} from "./testing-service-sql"
import AccessTokenCookie from "../cookies-service";
import {verifyToken} from "../jwt-service";

class TestingService {

    static async getQuestions(accessToken: any): Promise<IResponseObject> {

        const responseObject: IResponseObject = {httpStatusCode: 500,};

        try {

            const accessTokenPayload: IAccessTokenPayload = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET!);

            const settings: ISettings = {
                testDuration: accessTokenPayload.testDuration,
                resultDisplayType: accessTokenPayload.resultDisplayType,
            }

            let queryResultRows = (await pool.query(
                QC_SELECT_QUESTIONS_WITH_OPTIONS(
                    accessTokenPayload.categoryIdsPerTest,
                    accessTokenPayload.numberOfQuestionsPerTest
                )
            )).rows;
            if (!queryResultRows.length) {
                return {...responseObject, error: {message: ErrorMessages.SERVER_ERROR}};
            }

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

            accessToken = await AccessTokenCookie.onGotQuestions(accessToken);

            return {
                ...responseObject,
                httpStatusCode: 200,
                questions: questions,
                settings: settings,
                accessToken: accessToken,
            };

        } catch (e) {
            return {...responseObject, error: {message: ErrorMessages.SERVER_ERROR}};
        }
    }

    static async checkAnswers(answers: IAnswers, accessToken: any): Promise<IResponseObject> {

        const responseObject: IResponseObject = {httpStatusCode: 500,};
        const dateTime: number = Math.floor((Date.now() - new Date().getTimezoneOffset() * 60 * 1000) / 1000);
        const results = [] as IResult[];

        try {
            const accessTokenPayload: IAccessTokenPayload = await verifyToken(accessToken, process.env.ACCESS_TOKEN_SECRET!);

            const userId = accessTokenPayload.id;
            const isSaveAnswers = accessTokenPayload.isSaveAnswers;

            let queryResultRows = (await pool.query(QC_SELECT_SESSION_BY_USER_ID(accessTokenPayload.id))).rows;
            if (queryResultRows.length &&
                +queryResultRows[0].time_pass_last_testing < +process.env.TESTING_TIMEOUT!
            ) {
                let timeForTestRemaining = Math.ceil((+process.env.TESTING_TIMEOUT! - +queryResultRows[0].time_pass_last_testing)
                    / +Units.TESTING_TIMEOUT_SCALE!);
                return {
                    ...responseObject,
                    httpStatusCode: 401,
                    error: {message: `${ErrorMessages.TESTING_TIMEOUT_ERROR} ${timeForTestRemaining} ${Units.TESTING_TIMEOUT_UNIT}`},
                };
            };

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

            await pool.query(QC_INSERT_OR_UPDATE_SESSIONS(userId));

            return {...responseObject, httpStatusCode: 200, results: results, accessToken: accessToken};

        } catch (e) {
            return {...responseObject, error: {message: ErrorMessages.SERVER_ERROR}, accessToken: accessToken};
        }
    }
}

export default TestingService;
