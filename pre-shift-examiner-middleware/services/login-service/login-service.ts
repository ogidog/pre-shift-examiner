import {QueryResultRow} from "pg";
import pool from "../db-services";
import {IResponseObject, IUser, IAccessTokenPayload} from "pre-shift-examiner-types";
import {ErrorMessages} from "../../shared/constants"
import {QC_SELECT_USER_DATA_BY_PERSONNEL_ID} from "./login-service-sql";
import AccessTokenCookie from "../cookies-service";

class LoginService {

    static async login(personnelId: IUser["personnelId"], accessToken: any): Promise<IResponseObject> {
        const responseObject: IResponseObject = {httpStatusCode: 500, error: {message: ErrorMessages.SERVER_ERROR}};

        try {
            if (!accessToken) {
                accessToken = await AccessTokenCookie.onLogin();
            }

            let queryResultRows: QueryResultRow[] = (await pool.query(QC_SELECT_USER_DATA_BY_PERSONNEL_ID(personnelId))).rows;

            if (!queryResultRows.length) {
                accessToken = await AccessTokenCookie.onError(accessToken.cookieValue);
                return {
                    ...responseObject,
                    httpStatusCode: 401,
                    error: {message: ErrorMessages.PERSONNEL_ID_ERROR},
                    accessToken: accessToken
                }
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

            accessToken = await AccessTokenCookie.onLoggedIn(accessToken.cookieValue, newPayload);

            return {...responseObject, httpStatusCode: 200, user: user, accessToken: accessToken};

        } catch (e) {
            return responseObject;
        }
    }
}

export default LoginService;
