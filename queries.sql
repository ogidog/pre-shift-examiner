-- SELECT *
-- FROM pg_class

-- SELECT
--     tc.constraint_name, tc.table_name, kcu.column_name,
--     ccu.table_name AS foreign_table_name,
--     ccu.column_name AS foreign_column_name
-- FROM
--     information_schema.table_constraints AS tc
--         JOIN information_schema.key_column_usage AS kcu
--              ON tc.constraint_name = kcu.constraint_name
--         JOIN information_schema.constraint_column_usage AS ccu
--              ON ccu.constraint_name = tc.constraint_name
-- WHERE constraint_type = 'FOREIGN KEY' AND tc.table_name='options_B_4_5';

select question.question_id,
       question.question_content,
       array_agg(work.options.id)      as option_ids,
       array_agg(work.options.content) as option_contents
from work.options,
     (select work.questions.id      as question_id,
             work.questions.content as question_content
      from work.questions
      where category_id in (1672818090, 1672818091)
      order by random()
      limit 3) as question
where work.options.question_id = question.question_id
group by question.question_id, question.question_content;


-- delete from work.options
-- insert into work.options (select * from work."options_B_5_2")

-- select question_id, array_agg(id order by question_id), count(correct) as c_correct
-- from work.options where correct group by question_id
--                                 having
--                                     count(correct)=1 and
--                                     array_agg(id order by question_id)=ARRAY[1672819559]

-- CREATE TYPE work.result_display_type AS ENUM ('short', 'detail');

-- select work.users.personnel_id,
--        work.users.surname,
--        work.users.name,
--        work.users.patronymic,
--        work.settings.number_of_questions_per_test,
--        work.settings.categories_per_test,
--        work.settings.test_duration,
--        work.settings.result_display_type
-- from work.users,
--      work.settings
-- where work.users.setting_id = work.settings.id
--   and work.users.personnel_id = 'НИ00-0011';
