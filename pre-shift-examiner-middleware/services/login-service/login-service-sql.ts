import {QueryConfig} from "pg";
import {IUser} from "pre-shift-examiner-types";

export const QC_INSERT_OR_UPDATE_SESSIONS = (userId: IUser["id"]): QueryConfig => {
    return {
        name: "INSERT_OR_UPDATE_SESSIONS",
        text: `INSERT INTO work.sessions (user_id, last_testing_timestamp)
               values ($1, CURRENT_TIMESTAMP)
               ON CONFLICT (user_id) DO UPDATE SET last_testing_timestamp=CURRENT_TIMESTAMP`,
        values: [userId]
    }
}

export const QC_SELECT_USER_DATA_BY_PERSONNEL_ID = (personnelId: IUser["personnelId"]): QueryConfig => {
    return {
        name: "QC_SELECT_PERSONNEL_ID_SQL",
        text: `WITH auth_user AS (SELECT *
                                  from (SELECT work.users.id,
                                               work.users.personnel_id,
                                               work.users.surname,
                                               work.users.name,
                                               work.users.patronymic,
                                               work.users.setting_id,
                                               work.settings.testing_timeout
                                        FROM work.users,
                                             work.settings
                                        WHERE work.users.personnel_id = $1
                                          AND work.users.setting_id = work.settings.id) AS t1
                                           LEFT JOIN work.sessions ON t1.id = work.sessions.user_id)
               SELECT *,
                      (EXTRACT(EPOCH FROM current_timestamp)::int -
                       EXTRACT(EPOCH FROM last_testing_timestamp)::int) as testing_timeout_remaining
               FROM auth_user`,
        values: process.env.NODE_ENV === 'development' ? ['НИ00-00111'] : [personnelId],
    }
}
