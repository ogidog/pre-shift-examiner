import {QueryResultRow} from "pg";
import pool from "../db-services";
import {IResponseObject, IUser, ErrorMessages} from "pre-shift-examiner-types";
import {QC_INSERT_OR_UPDATE_SESSIONS, QC_SELECT_USER_DATA_BY_PERSONNEL_ID} from "./login-service-sql";

class LoginService {

    static async login(personnelId: IUser["personnelId"], responseObject: IResponseObject): Promise<IResponseObject> {

        try {
            let queryResultRows: QueryResultRow[] = (await pool.query(QC_SELECT_USER_DATA_BY_PERSONNEL_ID(personnelId))).rows;

            if (queryResultRows.length != 1) return {
                ...responseObject,
                httpStatusCode: 401,
                error: {message: ErrorMessages.PERSONNEL_ID_ERROR}
            };

            const user: IUser = {
                id: queryResultRows[0].id,
                personnelId: queryResultRows[0].personnel_id,
                surname: queryResultRows[0].surname,
                name: queryResultRows[0].name,
                patronymic: queryResultRows[0].patronymic,
                settingId: queryResultRows[0].setting_id,
            };

            if (queryResultRows[0].testing_timeout >= queryResultRows[0].testing_timeout_remaining) {
                return {
                    ...responseObject,
                    error: {message: `${ErrorMessages.TESTING_TIMEOUT_ERROR} ${queryResultRows[0].testing_timeout - queryResultRows[0].testing_timeout_remaining} c.`}
                };
            }

            // await pool.query(QC_INSERT_OR_UPDATE_SESSIONS(user.id));

            return {...responseObject, httpStatusCode: 200, user: user};

        } catch (e) {
            return {...responseObject, error: {message: ErrorMessages.SERVER_ERROR}};
        }
    }
}

export default LoginService;
