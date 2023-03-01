import {IUser, ISettings, IOption} from "pre-shift-examiner-types"
import {QueryConfig} from "pg";

export const QC_INSERT_OR_UPDATE_SESSIONS = (userId: IUser["id"]): QueryConfig => {
    return {
        name: "TESTING_SERVICE_INSERT_OR_UPDATE_SESSIONS",
        text: `INSERT INTO work.sessions (user_id, last_testing_timestamp)
               values ($1, CURRENT_TIMESTAMP)
               ON CONFLICT (user_id) DO UPDATE SET last_testing_timestamp=CURRENT_TIMESTAMP`,
        values: [userId]
    }
}

export const QC_SELECT_QUESTIONS_WITH_OPTIONS = (
    category_ids_per_test: ISettings["categoryIdsPerTest"],
    number_of_questions_per_test: ISettings["numberOfQuestionsPerTest"]): QueryConfig => {

    return {
        name: "TESTING_SERVICE_SELECT_QUESTIONS_WITH_OPTIONS",
        text: `SELECT question.question_id,
                      question.question_text,
                      array_agg(work.options.id)                                       AS option_ids,
                      array_agg(work.options.content)                                  AS option_contents,
                      count(work.options.correct) filter ( where work.options.correct) as correct_true_counter
               FROM work.options,
                    (SELECT work.questions.id   AS question_id,
                            work.questions.text AS question_text
                     FROM work.questions ${category_ids_per_test ? 'WHERE category_id = ANY ($1)' : ''}
                     ORDER BY random()
                     LIMIT ${category_ids_per_test ? '$2' : '$1'}) as question
               WHERE work.options.question_id = question.question_id
               GROUP BY question.question_id, question.question_text
               ORDER BY random()`,
        values: [category_ids_per_test, number_of_questions_per_test].filter(value => value != null) // May be null in table
    }
}

export const QC_INSERT_ANSWERS = (userId: IUser["id"],
                                  key: number,
                                  optionIds: IOption["id"][],
                                  dateTime: number): QueryConfig => {
    return {
        name: "TESTING_SERVICE_INSERT_ANSWERS",
        text: `
            WITH correct_options as (SELECT array_agg(id) as ids
                                     FROM work.options
                                     WHERE correct
                                       AND question_id = $2),
                 insert_result as (
                     INSERT
                         INTO work.answers (user_id, question_id, option_ids, date_time, is_correct)
                             VALUES ($1, $2, $3, to_timestamp($4),
                                     (SELECT ($3 @> correct_options.ids) and
                                             (array_length($3, 1) = array_length(correct_options.ids, 1))
                                      FROM correct_options))
                             RETURNING question_id, option_ids, is_correct)
            SELECT insert_result.question_id,
                   insert_result.option_ids,
                   insert_result.is_correct,
                   correct_options.ids
            FROM correct_options,
                 insert_result
        `,
        values: [userId, key, optionIds, dateTime]
    }
}

export const QC_SELECT_SESSION_BY_USER_ID = (userId: IUser["id"]): QueryConfig => {
    return {
        name: "TESTING_SERVICE_SELECT_SESSION_BY_USER_ID",
        text: `SELECT (extract(EPOCH FROM current_timestamp)::int -
                      extract(EPOCH FROM work.sessions.last_testing_timestamp)::int) as time_pass_last_testing
               FROM work.sessions
               WHERE user_id = $1`,
        values: [userId],
    }
}
