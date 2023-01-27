import {QueryResultRow} from "pg";
import pool from "./db-services";
import {IResponseObject, IUser} from "pre-shift-examiner-types/index";

class LoginService {

    static async login(personnel_id: string): Promise<IResponseObject> {
        const responseObject: IResponseObject = {httpStatusCode: 500};

        let queryText = `SELECT work.users.id,
                                work.users.personnel_id,
                                work.users.surname,
                                work.users.name,
                                work.users.patronymic,
                                work.users.setting_id
                         FROM work.users
                         WHERE work.users.personnel_id = $1`;
        let queryValues = ['НИ00-0011']; //[personnel_id];
        let queryResultRows: QueryResultRow[] = (await pool.query(queryText, queryValues)).rows;

        if (queryResultRows.length != 1) return {...responseObject, httpStatusCode: 401};

        const user: IUser = {
            id: queryResultRows[0].id,
            personnelId: queryResultRows[0].personnel_id,
            surname: queryResultRows[0].surname,
            name: queryResultRows[0].name,
            patronymic: queryResultRows[0].patronymic,
            settingId:queryResultRows[0].setting_id
        };

        return {...responseObject, httpStatusCode: 200, user: user};
    }
}

export default LoginService;
