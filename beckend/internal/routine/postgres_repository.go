package routine

import (
	"context"

	"github.com/jackc/pgx/v4/pgxpool"
)

type PostgresRepository struct {
	pool *pgxpool.Pool
}

func NewPostgresRepository(pool *pgxpool.Pool) Repository {
	return &PostgresRepository{
		pool: pool,
	}
}

func (r *PostgresRepository) Create(ctx context.Context, routine *Routine) error {
	tx, err := r.pool.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)

	err = tx.QueryRow(
		ctx,
		`INSERT INTO routines (name, periodicity)
		 VALUES ($1, $2)
		 RETURNING id, created_at`,
		routine.Name,
		routine.Repeat,
	).Scan(&routine.ID, &routine.CreatedAt)
	if err != nil {
		return err
	}

	for i := range routine.Tasks {
		err = tx.QueryRow(
			ctx,
			`INSERT INTO routine_tasks (routine_id, title, damage)
			 VALUES ($1, $2, $3)
			 RETURNING id`,
			routine.ID,
			routine.Tasks[i].Title,
			routine.Tasks[i].Damage,
		).Scan(&routine.Tasks[i].ID)

		if err != nil {
			return err
		}
	}

	return tx.Commit(ctx)
}
func (r *PostgresRepository) GetAll(ctx context.Context) ([]*Routine, error) {
	rows, err := r.pool.Query(
		ctx,
		`SELECT id, name, periodicity, created_at
		 FROM routines
		 ORDER BY id`,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	routines := make([]*Routine, 0)

	for rows.Next() {
		routine := &Routine{}

		if err := rows.Scan(
			&routine.ID,
			&routine.Name,
			&routine.Repeat,
			&routine.CreatedAt,
		); err != nil {
			return nil, err
		}

		tasks, err := r.GetTasksOfRoutine(ctx, routine.ID)
		if err != nil {
			return nil, err
		}

		routine.Tasks = tasks
		routines = append(routines, routine)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return routines, nil
}
func (r *PostgresRepository) GetByID(ctx context.Context, id int) (*Routine, error) {
	routine := &Routine{}

	err := r.pool.QueryRow(
		ctx,
		`SELECT id, name, periodicity, created_at
		 FROM routines
		 WHERE id = $1`,
		id,
	).Scan(
		&routine.ID,
		&routine.Name,
		&routine.Repeat,
		&routine.CreatedAt,
	)
	if err != nil {
		return nil, err
	}

	tasks, err := r.GetTasksOfRoutine(ctx, id)
	if err != nil {
		return nil, err
	}

	routine.Tasks = tasks

	return routine, nil
}

func (r *PostgresRepository) GetTasksOfRoutine(ctx context.Context, id int) ([]Task, error) {
	rows, err := r.pool.Query(
		ctx,
		`SELECT id, title, damage
		 FROM routine_tasks
		 WHERE routine_id = $1
		 ORDER BY id`,
		id,
	)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	tasks := make([]Task, 0)

	for rows.Next() {
		var task Task

		if err := rows.Scan(
			&task.ID,
			&task.Title,
			&task.Damage,
		); err != nil {
			return nil, err
		}

		tasks = append(tasks, task)
	}

	if err := rows.Err(); err != nil {
		return nil, err
	}

	return tasks, nil
}
