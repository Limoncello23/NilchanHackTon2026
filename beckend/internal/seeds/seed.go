package seeds

import (
	"context"
	"log"

	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/models"
	"github.com/jackc/pgx/v4/pgxpool"
)

func Seed(ctx context.Context, pool *pgxpool.Pool) error {
	log.Println("Seeding database...")
	routines := []models.Routine{
		{
			Name:        "Нилчан",
			Periodicity: "daily",
			Tasks: []models.RoutineTask{
				{Title: "Спросить когда выплаты за rep", Damage: 20},
				{Title: "Спросить когда будет качественный IT контент", Damage: 20},
				{Title: "Написать аккаунт-менеджеру", Damage: 20},
			},
		},
		{
			Name:        "Хейтер",
			Periodicity: "daily",
			Tasks: []models.RoutineTask{
				{Title: "Забанить", Damage: 40},
				{Title: "Заскринить коммент и в своей группе выложить осмеивающий пост", Damage: 15},
				{Title: "Унизить ублюдка", Damage: 5},
			},
		},
		{
			Name:        "Пантела",
			Periodicity: "daily",
			Tasks: []models.RoutineTask{
				{Title: "Снять разоблачающий ролик", Damage: 50},
				{Title: "Сделать ахуенно качественный контент самому", Damage: 10},
			},
		},
	}
	tx, err := pool.Begin(ctx)
	if err != nil {
		return err
	}
	defer tx.Rollback(ctx)
	routineIDs := make(map[string]int)
	for _, r := range routines {
		var id int
		err := tx.QueryRow(ctx,
			`INSERT INTO routines (name, periodicity) VALUES ($1, $2)
			ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
            RETURNING id`,
			r.Name, r.Periodicity).Scan(&id)
		if err != nil {
			return err
		}
		routineIDs[r.Name] = id
	}
	for _, r := range routines {
		routineID := routineIDs[r.Name]
		for _, task := range r.Tasks {
			_, err := tx.Exec(ctx,
				`INSERT INTO routine_tasks (routine_id, title, damage)
			VALUES ($1, $2, $3)
			ON CONFLICT (routine_id, title) DO NOTHING`,
				routineID, task.Title, task.Damage)
			if err != nil {
				return err
			}
		}
	}
	if err := tx.Commit(ctx); err != nil {
		return err
	}
	log.Printf("seeded %d routines with tasks", len(routines))
	return nil
}
