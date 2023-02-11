import {QueryResultRow} from "pg";
import pool from "../../shared/services/db-services";
import {IResponseObject, IUser, ErrorMessages} from "pre-shift-examiner-types";
import {QC_SELECT_PERSONNEL_ID_SQL} from "./login-service-sql";

class LoginService {

    static async login(personnelId: IUser["personnelId"]): Promise<IResponseObject> {
        const responseObject: IResponseObject = {httpStatusCode: 500};

        try {
            let queryResultRows: QueryResultRow[] = (await pool.query(QC_SELECT_PERSONNEL_ID_SQL(personnelId))).rows;

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
                settingId: queryResultRows[0].setting_id
            };

            return {...responseObject, httpStatusCode: 200, user: user};

        } catch (e) {
            return {...responseObject, error: {message: ErrorMessages.SERVER_ERROR}};
        }
    }
}

export default LoginService;
