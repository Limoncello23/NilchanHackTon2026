package dungeon

import (
	"context"
	"errors"
	"time"

	"github.com/jackc/pgx/v4"
	"github.com/jackc/pgx/v4/pgxpool"
)

type PostgresRepository struct {
	pool *pgxpool.Pool
}

func NewPostgresRepository(pool *pgxpool.Pool) *PostgresRepository {
	return &PostgresRepository{
		pool: pool,
	}
}

func (r *PostgresRepository) CreateDungeon(ctx context.Context, dungeon *Dungeon) (int, error) {
	if dungeon == nil {
		return 0, ErrInvalidDungeon
	}

	if dungeon.CreatedAt.IsZero() {
		dungeon.CreatedAt = time.Now()
	}

	tx, err := r.pool.Begin(ctx)
	if err != nil {
		return 0, err
	}
	defer tx.Rollback(ctx)

	var dungeonID int

	err = tx.QueryRow(
		ctx,
		`INSERT INTO dungeons (
			name_boss,
			description_boss,
			max_hp,
			hp,
			status,
			routine_id,
			created_at
		)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING id`,
		dungeon.NameBoss,
		dungeon.DescriptionBoss,
		dungeon.MaxHP,
		dungeon.HP,
		"ACTIVE",
		dungeon.RoutineID,
		dungeon.CreatedAt,
	).Scan(&dungeonID)

	if err != nil {
		return 0, err
	}

	if err := tx.Commit(ctx); err != nil {
		return 0, err
	}

	return dungeonID, nil
}

func (r *PostgresRepository) CreateDungeonTasks(
	ctx context.Context,
	routineID, dungeonID int,
) error {
	_, err := r.pool.Exec(
		ctx,
		`INSERT INTO tasks (title, damage, dungeon_id)
		 SELECT title, damage, $1
		 FROM routine_tasks
		 WHERE routine_id = $2`,
		dungeonID,
		routineID,
	)

	if err != nil {
		return err
	}

	return nil
}

func (r *PostgresRepository) GetDungeon(
	ctx context.Context,
	dungeonID int,
) (*Dungeon, error) {
	dungeon := &Dungeon{}

	err := r.pool.QueryRow(
		ctx,
		`SELECT id, name_boss, description_boss, max_hp, hp, created_at, status, routine_id
		 FROM dungeons
		 WHERE id = $1`,
		dungeonID,
	).Scan(
		&dungeon.ID,
		&dungeon.NameBoss,
		&dungeon.DescriptionBoss,
		&dungeon.MaxHP,
		&dungeon.HP,
		&dungeon.CreatedAt,
		&dungeon.Status,
		&dungeon.RoutineID,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, ErrDungeonNotFound
		}

		return nil, err
	}

	rows, err := r.pool.Query(
		ctx,
		`SELECT id, title, damage, completed, dungeon_id
		 FROM tasks
		 WHERE dungeon_id = $1
		 ORDER BY id`,
		dungeonID,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	dungeon.Tasks = make([]Task, 0)

	for rows.Next() {
		var task Task

		if err := rows.Scan(
			&task.ID,
			&task.Title,
			&task.Damage,
			&task.Completed,
			&task.DungeonID,
		); err != nil {
			return nil, err
		}

		dungeon.Tasks = append(dungeon.Tasks, task)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return dungeon, nil
}

func (r *PostgresRepository) GetDungeonTask(
	ctx context.Context,
	taskID int,
) (Task, error) {
	var task Task

	err := r.pool.QueryRow(
		ctx,
		`SELECT id, title, damage, completed, dungeon_id
		 FROM tasks
		 WHERE id = $1`,
		taskID,
	).Scan(
		&task.ID,
		&task.Title,
		&task.Damage,
		&task.Completed,
		&task.DungeonID,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return Task{}, ErrTaskNotFound
		}

		return Task{}, err
	}

	return task, nil
}

func (r *PostgresRepository) CompleteTask(
	ctx context.Context,
	taskID int,
) (*Dungeon, error) {
	tx, err := r.pool.Begin(ctx)
	if err != nil {
		return nil, err
	}
	defer tx.Rollback(ctx)

	var dungeonID int
	var completed bool
	var damage int

	err = tx.QueryRow(
		ctx,
		`SELECT dungeon_id, completed, damage
		 FROM tasks
		 WHERE id = $1
		 FOR UPDATE`,
		taskID,
	).Scan(
		&dungeonID,
		&completed,
		&damage,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, ErrTaskNotFound
		}

		return nil, err
	}

	if completed {
		return nil, ErrTaskAlreadyCompleted
	}

	_, err = tx.Exec(
		ctx,
		`UPDATE tasks
		 SET completed = TRUE
		 WHERE id = $1`,
		taskID,
	)
	if err != nil {
		return nil, err
	}

	var dungeon Dungeon

	err = tx.QueryRow(
		ctx,
		`UPDATE dungeons
		 SET
			hp = GREATEST(hp - $1, 0),
			status = CASE
				WHEN hp - $1 <= 0 THEN 'DEAD'
				ELSE status
			END
		 WHERE id = $2
		 RETURNING
			id,
			name_boss,
			description_boss,
			max_hp,
			hp,
			created_at,
			status,
			routine_id`,
		damage,
		dungeonID,
	).Scan(
		&dungeon.ID,
		&dungeon.NameBoss,
		&dungeon.DescriptionBoss,
		&dungeon.MaxHP,
		&dungeon.HP,
		&dungeon.CreatedAt,
		&dungeon.Status,
		&dungeon.RoutineID,
	)

	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return nil, ErrDungeonNotFound
		}

		return nil, err
	}

	if err := tx.Commit(ctx); err != nil {
		return nil, err
	}

	return &dungeon, nil
}
func (r *PostgresRepository) CreateDungeonWithTasks(
	ctx context.Context,
	dungeon *Dungeon,
) (int, error) {
	if dungeon == nil {
		return 0, ErrInvalidDungeon
	}

	if dungeon.RoutineID <= 0 {
		return 0, ErrInvalidRoutineID
	}

	if dungeon.CreatedAt.IsZero() {
		dungeon.CreatedAt = time.Now()
	}

	tx, err := r.pool.Begin(ctx)
	if err != nil {
		return 0, err
	}
	defer tx.Rollback(ctx)

	var dungeonID int

	err = tx.QueryRow(
		ctx,
		`INSERT INTO dungeons (
			name_boss,
			description_boss,
			max_hp,
			hp,
			status,
			routine_id,
			created_at
		)
		VALUES ($1, $2, $3, $4, 'ACTIVE', $5, $6)
		RETURNING id`,
		dungeon.NameBoss,
		dungeon.DescriptionBoss,
		dungeon.MaxHP,
		dungeon.HP,
		dungeon.RoutineID,
		dungeon.CreatedAt,
	).Scan(&dungeonID)

	if err != nil {
		return 0, err
	}

	commandTag, err := tx.Exec(
		ctx,
		`INSERT INTO tasks (title, damage, dungeon_id)
		 SELECT title, damage, $1
		 FROM routine_tasks
		 WHERE routine_id = $2`,
		dungeonID,
		dungeon.RoutineID,
	)
	if err != nil {
		return 0, err
	}

	if commandTag.RowsAffected() == 0 {
		return 0, ErrNoTasksInRoutine
	}

	if err := tx.Commit(ctx); err != nil {
		return 0, err
	}

	return dungeonID, nil
}
