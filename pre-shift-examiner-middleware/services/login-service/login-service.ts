import {QueryResultRow} from "pg";
import pool from "../db-services";
import {IResponseObject, IUser, IAccessTokenPayload} from "pre-shift-examiner-types";
import {ErrorMessages, Units} from "../../shared/constants"
import {QC_SELECT_USER_DATA_BY_PERSONNEL_ID} from "./login-service-sql";
import AccessTokenCookie from "../cookies-service";

class LoginService {

    static async login(personnelId: IUser["personnelId"], accessTokenCookie: any): Promise<IResponseObject> {
        const responseObject: IResponseObject = {httpStatusCode: 500,};

        try {
            if (!accessTokenCookie.cookieValue) {
                accessTokenCookie = await AccessTokenCookie.create();
            }

            let queryResultRows: QueryResultRow[] = (await pool.query(QC_SELECT_USER_DATA_BY_PERSONNEL_ID(personnelId))).rows;

            if (!queryResultRows.length) {
                accessTokenCookie = await AccessTokenCookie.onError(accessTokenCookie.cookieValue);
                return {
                    ...responseObject,
                    httpStatusCode: 401,
                    error: {message: ErrorMessages.PERSONNEL_ID_ERROR},
                    accessTokenCookie: accessTokenCookie
                }
            }

            if (
                queryResultRows[0].time_pass_last_testing &&
                +queryResultRows[0].time_pass_last_testing < +process.env.TESTING_TIMEOUT!
            ) {
                let timeForTestRemaining = Math.ceil((+process.env.TESTING_TIMEOUT! - +queryResultRows[0].time_pass_last_testing)
                    / +Units.TESTING_TIMEOUT_SCALE!);
                return {
                    ...responseObject,
                    httpStatusCode: 401,
                    error: {message: `${ErrorMessages.TESTING_TIMEOUT_ERROR} ${timeForTestRemaining} ${Units.TESTING_TIMEOUT_UNIT}`},
                };
            }

            const user: IUser = {
                surname: queryResultRows[0].surname,
                name: queryResultRows[0].name,
                patronymic: queryResultRows[0].patronymic,
            };

            const newPayload: IAccessTokenPayload | any = {
                id: queryResultRows[0].id,
                numberOfQuestionsPerTest: queryResultRows[0].number_of_questions_per_test,
                categoryIdsPerTest: queryResultRows[0].category_ids_per_test,
                testDuration: queryResultRows[0].test_duration,
                resultDisplayType: queryResultRows[0].result_display_type,
                isSaveAnswers: queryResultRows[0].is_save_answers,
                testingTimeout: queryResultRows[0].testing_timeout,
            }

            accessTokenCookie = await AccessTokenCookie.onLoggedIn(accessTokenCookie.cookieValue, newPayload);

            return {...responseObject, httpStatusCode: 200, user: user, accessTokenCookie: accessTokenCookie};

        } catch (e) {
            return {...responseObject, error: {message: ErrorMessages.SERVER_ERROR}};
        }
    }
}

export default LoginService;
