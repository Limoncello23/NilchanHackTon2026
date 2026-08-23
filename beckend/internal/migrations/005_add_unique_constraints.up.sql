ALTER TABLE routines ADD CONSTRAINT unique_routine_name UNIQUE (name);
ALTER TABLE routine_tasks ADD CONSTRAINT unique_routine_task UNIQUE (routine_id, title);