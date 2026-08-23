CREATE TABLE IF NOT EXISTS dungeons (
  id SERIAL PRIMARY KEY,
  name_boss TEXT NOT NULL,
  description_boss TEXT NULL,
  max_hp INT NOT NULL,
  hp INT NOT NULL,
  created_at TIMESTAMP NOT NULL,
  status TEXT NOT NULL DEFAULT 'ACTIVE',
  routine_id INT NOT NULL REFERENCES routines(id) ON DELETE CASCADE
);