import {QueryConfig} from "pg";
import {IUser} from "pre-shift-examiner-types";

export const QC_SELECT_PERSONNEL_ID_SQL = (personnelId: IUser["personnelId"]): QueryConfig => {
    return {
        name: "QC_SELECT_PERSONNEL_ID_SQL",
        text: `SELECT work.users.id,
                      work.users.personnel_id,
                      work.users.surname,
                      work.users.name,
                      work.users.patronymic,
                      work.users.setting_id
               FROM work.users
               WHERE work.users.personnel_id = $1`,
        values: process.env.NODE_ENV==='development'? [process.env.PERSONNEL_ID]: [personnelId],

    }
}
