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

--select * from work."questions" where section_id in (1672818090, 1672818091) order by random() limit 1;

-- delete from work.options
-- insert into work.options (select * from work."options_B_5_2")

select question_id, array_agg(id order by question_id), count(correct) as c_correct
from work.options where correct group by question_id
having
        count(correct)=1 and
        array_agg(id order by question_id)=ARRAY[1672819559]
