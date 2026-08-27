package dungeon

import (
	"context"
	"errors"
	"testing"

	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/routine"
)

type repositoryRoutineProvider struct {
	tasks []routine.Task
	err   error
}

func (p repositoryRoutineProvider) GetTasksOfRoutine(context.Context, int) ([]routine.Task, error) {
	if p.err != nil {
		return nil, p.err
	}

	return p.tasks, nil
}

func TestMemoryRepositoryCreateDungeonTasks(t *testing.T) {
	t.Parallel()

	repo := NewMemoryRepository(repositoryRoutineProvider{
		tasks: []routine.Task{
			{ID: 10, Title: "Send report", Damage: 20},
			{ID: 11, Title: "Deploy app", Damage: 40},
		},
	})

	dungeon := &Dungeon{
		NameBoss:  "Nilchan",
		MaxHP:     60,
		HP:        60,
		Status:    true,
		RoutineID: 7,
	}
	dungeonID, err := repo.CreateDungeon(dungeon)
	if err != nil {
		t.Fatalf("CreateDungeon() error = %v", err)
	}

	if err := repo.CreateDungeonTasks(7, dungeonID); err != nil {
		t.Fatalf("CreateDungeonTasks() error = %v", err)
	}

	firstTask, err := repo.GetDungeonTask(1)
	if err != nil {
		t.Fatalf("GetDungeonTask(1) error = %v", err)
	}
	if firstTask.ID != 1 || firstTask.Title != "Send report" || firstTask.Damage != 20 || firstTask.Completed || firstTask.DungeonID != dungeonID {
		t.Fatalf("first dungeon task = %+v, want copied task with a new ID and dungeon ID %d", firstTask, dungeonID)
	}

	secondTask, err := repo.GetDungeonTask(2)
	if err != nil {
		t.Fatalf("GetDungeonTask(2) error = %v", err)
	}
	if secondTask.ID != 2 || secondTask.Title != "Deploy app" || secondTask.Damage != 40 || secondTask.Completed || secondTask.DungeonID != dungeonID {
		t.Fatalf("second dungeon task = %+v, want copied task with a new ID and dungeon ID %d", secondTask, dungeonID)
	}

	updatedDungeon, err := repo.CompleteTask(firstTask.ID)
	if err != nil {
		t.Fatalf("CompleteTask() error = %v", err)
	}
	if updatedDungeon.HP != 40 {
		t.Fatalf("dungeon HP after task completion = %d, want 40", updatedDungeon.HP)
	}

	completedTask, err := repo.GetDungeonTask(firstTask.ID)
	if err != nil {
		t.Fatalf("GetDungeonTask(%d) error = %v", firstTask.ID, err)
	}
	if !completedTask.Completed {
		t.Fatal("task must be marked as completed")
	}
}
func TestMemoryRepositoryGetDungeonWithTasks(t *testing.T) {
	t.Parallel()

	repo := NewMemoryRepository(repositoryRoutineProvider{
		tasks: []routine.Task{
			{ID: 10, Title: "Send report", Damage: 20},
			{ID: 11, Title: "Deploy app", Damage: 40},
		},
	})

	dungeon := &Dungeon{
		NameBoss:  "Nilchan",
		MaxHP:     60,
		HP:        60,
		Status:    true,
		RoutineID: 7,
	}

	dungeonID, err := repo.CreateDungeon(dungeon)
	if err != nil {
		t.Fatalf("CreateDungeon() error = %v", err)
	}

	if err := repo.CreateDungeonTasks(7, dungeonID); err != nil {
		t.Fatalf("CreateDungeonTasks() error = %v", err)
	}

	got, err := repo.GetDungeon(dungeonID)
	if err != nil {
		t.Fatalf("GetDungeon() error = %v", err)
	}

	if len(got.Tasks) != 2 {
		t.Fatalf("len(Tasks) = %d, want 2", len(got.Tasks))
	}

	if got.Tasks[0].Title != "Send report" {
		t.Fatalf("first task title = %q, want %q", got.Tasks[0].Title, "Send report")
	}

	if got.Tasks[0].Damage != 20 {
		t.Fatalf("first task damage = %d, want 20", got.Tasks[0].Damage)
	}

	if got.Tasks[1].Title != "Deploy app" {
		t.Fatalf("second task title = %q, want %q", got.Tasks[1].Title, "Deploy app")
	}

	if got.Tasks[1].Damage != 40 {
		t.Fatalf("second task damage = %d, want 40", got.Tasks[1].Damage)
	}

	if got.Tasks[0].DungeonID != dungeonID || got.Tasks[1].DungeonID != dungeonID {
		t.Fatalf("tasks have wrong dungeon ID")
	}
}

func TestMemoryRepositoryCreateDungeonTasksErrors(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name string
		repo *MemoryRepository
		call func(*MemoryRepository) error
		want error
	}{
		{
			name: "invalid routine ID",
			repo: NewMemoryRepository(repositoryRoutineProvider{}),
			call: func(repo *MemoryRepository) error {
				return repo.CreateDungeonTasks(0, 1)
			},
			want: ErrInvalidRoutineID,
		},
		{
			name: "routine has no tasks",
			repo: NewMemoryRepository(repositoryRoutineProvider{}),
			call: func(repo *MemoryRepository) error {
				dungeonID, err := repo.CreateDungeon(&Dungeon{HP: 1})
				if err != nil {
					return err
				}
				return repo.CreateDungeonTasks(1, dungeonID)
			},
			want: ErrNoTasksInRoutine,
		},
		{
			name: "dungeon does not exist",
			repo: NewMemoryRepository(repositoryRoutineProvider{tasks: []routine.Task{{Title: "Task", Damage: 1}}}),
			call: func(repo *MemoryRepository) error {
				return repo.CreateDungeonTasks(1, 99)
			},
			want: ErrDungeonNotFound,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			err := tt.call(tt.repo)
			if !errors.Is(err, tt.want) {
				t.Fatalf("error = %v, want %v", err, tt.want)
			}
		})
	}
}
