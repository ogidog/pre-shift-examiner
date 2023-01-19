import {QueryResultRow} from "pg";
import pool from "./db-services";

class LoginService {

    static async login(personnel_id: string): Promise<ResponseObject> {
        const responseObject: ResponseObject = {httpStatusCode: 500};

        let queryText = `SELECT work.users.id,
                                work.users.personnel_id,
                                work.users.surname,
                                work.users.name,
                                work.users.patronymic
                         FROM work.users
                         WHERE work.users.personnel_id = $1`;
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

        return {...responseObject, httpStatusCode: 200, user: user};
    }
}

export default LoginService;
