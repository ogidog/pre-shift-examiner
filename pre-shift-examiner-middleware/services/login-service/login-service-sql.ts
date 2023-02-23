import {QueryConfig} from "pg";
import {IUser} from "pre-shift-examiner-types";

export const QC_SELECT_USER_DATA_BY_PERSONNEL_ID = (personnelId: IUser["personnelId"]): QueryConfig => {
    return {
        name: "SELECT_USER_DATA_BY_PERSONNEL_ID",
        text: `WITH auth_user AS (SELECT *
                                  from (SELECT work.users.id,
                                               work.users.personnel_id,
                                               work.users.surname,
                                               work.users.name,
                                               work.users.patronymic,
                                               work.settings.number_of_questions_per_test,
                                               work.settings.category_ids_per_test,
                                               work.settings.test_duration,
                                               work.settings.result_display_type,
                                               work.settings.is_save_answers,
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
        values: process.env.NODE_ENV === 'development' ? ['НИ00-0011'] : [personnelId],
    }
}
