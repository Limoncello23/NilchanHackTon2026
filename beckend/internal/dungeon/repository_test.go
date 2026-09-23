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

func (p repositoryRoutineProvider) GetTasksOfRoutine(
	context.Context,
	int,
) ([]routine.Task, error) {
	if p.err != nil {
		return nil, p.err
	}

	return p.tasks, nil
}

func (p repositoryRoutineProvider) GetByID(context.Context, int) (*routine.Routine, error) {
	return nil, p.err
}

func TestMemoryRepositoryCreateDungeonWithTasks(t *testing.T) {
	t.Parallel()

	repo := NewMemoryRepository(repositoryRoutineProvider{
		tasks: []routine.Task{
			{
				ID:     10,
				Title:  "Send report",
				Damage: 20,
			},
			{
				ID:     11,
				Title:  "Deploy app",
				Damage: 40,
			},
		},
	})

	dungeon := &Dungeon{
		NameBoss:  "Nilchan",
		MaxHP:     60,
		HP:        60,
		Status:    "ACTIVE",
		RoutineID: 7,
	}

	dungeonID, err := repo.CreateDungeonWithTasks(
		context.Background(),
		dungeon,
	)
	if err != nil {
		t.Fatalf("CreateDungeonWithTasks() error = %v", err)
	}

	if dungeonID != 1 {
		t.Fatalf(
			"dungeonID = %d, want 1",
			dungeonID,
		)
	}

	firstTask, err := repo.GetDungeonTask(
		context.Background(),
		1,
	)
	if err != nil {
		t.Fatalf("GetDungeonTask(1) error = %v", err)
	}

	if firstTask.ID != 1 ||
		firstTask.Title != "Send report" ||
		firstTask.Damage != 20 ||
		firstTask.Completed ||
		firstTask.DungeonID != dungeonID {
		t.Fatalf(
			"first dungeon task = %+v, want copied task with new ID and dungeon ID %d",
			firstTask,
			dungeonID,
		)
	}

	secondTask, err := repo.GetDungeonTask(
		context.Background(),
		2,
	)
	if err != nil {
		t.Fatalf("GetDungeonTask(2) error = %v", err)
	}

	if secondTask.ID != 2 ||
		secondTask.Title != "Deploy app" ||
		secondTask.Damage != 40 ||
		secondTask.Completed ||
		secondTask.DungeonID != dungeonID {
		t.Fatalf(
			"second dungeon task = %+v, want copied task with new ID and dungeon ID %d",
			secondTask,
			dungeonID,
		)
	}

	updatedDungeon, err := repo.CompleteTask(
		context.Background(),
		firstTask.ID,
	)
	if err != nil {
		t.Fatalf("CompleteTask() error = %v", err)
	}

	if updatedDungeon.HP != 40 {
		t.Fatalf(
			"dungeon HP after task completion = %d, want 40",
			updatedDungeon.HP,
		)
	}

	if updatedDungeon.Status != "ACTIVE" {
		t.Fatalf(
			"dungeon status = %q, want ACTIVE",
			updatedDungeon.Status,
		)
	}

	completedTask, err := repo.GetDungeonTask(
		context.Background(),
		firstTask.ID,
	)
	if err != nil {
		t.Fatalf(
			"GetDungeonTask(%d) error = %v",
			firstTask.ID,
			err,
		)
	}

	if !completedTask.Completed {
		t.Fatal("task must be marked as completed")
	}
}

func TestMemoryRepositoryCreateDungeonWithTasksKillsDungeon(t *testing.T) {
	t.Parallel()

	repo := NewMemoryRepository(repositoryRoutineProvider{
		tasks: []routine.Task{
			{
				ID:     10,
				Title:  "Big task",
				Damage: 100,
			},
		},
	})

	dungeon := &Dungeon{
		NameBoss:  "Nilchan",
		MaxHP:     100,
		HP:        100,
		Status:    "ACTIVE",
		RoutineID: 7,
	}

	dungeonID, err := repo.CreateDungeonWithTasks(
		context.Background(),
		dungeon,
	)
	if err != nil {
		t.Fatalf("CreateDungeonWithTasks() error = %v", err)
	}

	got, err := repo.CompleteTask(
		context.Background(),
		1,
	)
	if err != nil {
		t.Fatalf("CompleteTask() error = %v", err)
	}

	if got.ID != dungeonID {
		t.Fatalf(
			"dungeon ID = %d, want %d",
			got.ID,
			dungeonID,
		)
	}

	if got.HP != 0 {
		t.Fatalf(
			"HP = %d, want 0",
			got.HP,
		)
	}

	if got.Status != "DEAD" {
		t.Fatalf(
			"status = %q, want DEAD",
			got.Status,
		)
	}
}

func TestMemoryRepositoryGetDungeonWithTasks(t *testing.T) {
	t.Parallel()

	repo := NewMemoryRepository(repositoryRoutineProvider{
		tasks: []routine.Task{
			{
				ID:     10,
				Title:  "Send report",
				Damage: 20,
			},
			{
				ID:     11,
				Title:  "Deploy app",
				Damage: 40,
			},
		},
	})

	dungeon := &Dungeon{
		NameBoss:  "Nilchan",
		MaxHP:     60,
		HP:        60,
		Status:    "ACTIVE",
		RoutineID: 7,
	}

	dungeonID, err := repo.CreateDungeonWithTasks(
		context.Background(),
		dungeon,
	)
	if err != nil {
		t.Fatalf("CreateDungeonWithTasks() error = %v", err)
	}

	got, err := repo.GetDungeon(
		context.Background(),
		dungeonID,
	)
	if err != nil {
		t.Fatalf("GetDungeon() error = %v", err)
	}

	if len(got.Tasks) != 2 {
		t.Fatalf(
			"len(Tasks) = %d, want 2",
			len(got.Tasks),
		)
	}

	if got.Tasks[0].Title != "Send report" {
		t.Fatalf(
			"first task title = %q, want %q",
			got.Tasks[0].Title,
			"Send report",
		)
	}

	if got.Tasks[0].Damage != 20 {
		t.Fatalf(
			"first task damage = %d, want 20",
			got.Tasks[0].Damage,
		)
	}

	if got.Tasks[1].Title != "Deploy app" {
		t.Fatalf(
			"second task title = %q, want %q",
			got.Tasks[1].Title,
			"Deploy app",
		)
	}

	if got.Tasks[1].Damage != 40 {
		t.Fatalf(
			"second task damage = %d, want 40",
			got.Tasks[1].Damage,
		)
	}

	if got.Tasks[0].DungeonID != dungeonID ||
		got.Tasks[1].DungeonID != dungeonID {
		t.Fatal("tasks have wrong dungeon ID")
	}
}

func TestMemoryRepositoryCreateDungeonWithTasksErrors(t *testing.T) {
	t.Parallel()

	routineRepoErr := errors.New("routine repository unavailable")

	tests := []struct {
		name string
		repo *MemoryRepository
		call func(*MemoryRepository) error
		want error
	}{
		{
			name: "nil dungeon",
			repo: NewMemoryRepository(repositoryRoutineProvider{
				tasks: []routine.Task{
					{
						Title:  "Task",
						Damage: 1,
					},
				},
			}),
			call: func(repo *MemoryRepository) error {
				_, err := repo.CreateDungeonWithTasks(
					context.Background(),
					nil,
				)

				return err
			},
			want: ErrInvalidDungeon,
		},
		{
			name: "invalid routine ID",
			repo: NewMemoryRepository(repositoryRoutineProvider{
				tasks: []routine.Task{
					{
						Title:  "Task",
						Damage: 1,
					},
				},
			}),
			call: func(repo *MemoryRepository) error {
				_, err := repo.CreateDungeonWithTasks(
					context.Background(),
					&Dungeon{
						RoutineID: 0,
					},
				)

				return err
			},
			want: ErrInvalidRoutineID,
		},
		{
			name: "routine repository required",
			repo: NewMemoryRepository(nil),
			call: func(repo *MemoryRepository) error {
				_, err := repo.CreateDungeonWithTasks(
					context.Background(),
					&Dungeon{
						RoutineID: 1,
					},
				)

				return err
			},
			want: ErrRoutineRepositoryRequired,
		},
		{
			name: "routine has no tasks",
			repo: NewMemoryRepository(
				repositoryRoutineProvider{},
			),
			call: func(repo *MemoryRepository) error {
				_, err := repo.CreateDungeonWithTasks(
					context.Background(),
					&Dungeon{
						RoutineID: 1,
					},
				)

				return err
			},
			want: ErrNoTasksInRoutine,
		},
		{
			name: "routine repository error",
			repo: NewMemoryRepository(
				repositoryRoutineProvider{
					err: routineRepoErr,
				},
			),
			call: func(repo *MemoryRepository) error {
				_, err := repo.CreateDungeonWithTasks(
					context.Background(),
					&Dungeon{
						RoutineID: 1,
					},
				)

				return err
			},
			want: routineRepoErr,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			err := tt.call(tt.repo)

			if !errors.Is(err, tt.want) {
				t.Fatalf(
					"error = %v, want %v",
					err,
					tt.want,
				)
			}
		})
	}
}

func TestMemoryRepositoryGetDungeonErrors(t *testing.T) {
	t.Parallel()

	repo := NewMemoryRepository(
		repositoryRoutineProvider{},
	)

	_, err := repo.GetDungeon(
		context.Background(),
		999,
	)

	if !errors.Is(err, ErrDungeonNotFound) {
		t.Fatalf(
			"error = %v, want %v",
			err,
			ErrDungeonNotFound,
		)
	}
}

func TestMemoryRepositoryGetDungeonTaskErrors(t *testing.T) {
	t.Parallel()

	repo := NewMemoryRepository(
		repositoryRoutineProvider{},
	)

	_, err := repo.GetDungeonTask(
		context.Background(),
		999,
	)

	if !errors.Is(err, ErrTaskNotFound) {
		t.Fatalf(
			"error = %v, want %v",
			err,
			ErrTaskNotFound,
		)
	}
}

func TestMemoryRepositoryCompleteTaskErrors(t *testing.T) {
	t.Parallel()

	repo := NewMemoryRepository(
		repositoryRoutineProvider{
			tasks: []routine.Task{
				{
					Title:  "Task",
					Damage: 10,
				},
			},
		},
	)

	_, err := repo.CompleteTask(
		context.Background(),
		0,
	)

	if !errors.Is(err, ErrInvalidTaskID) {
		t.Fatalf(
			"error = %v, want %v",
			err,
			ErrInvalidTaskID,
		)
	}

	_, err = repo.CompleteTask(
		context.Background(),
		999,
	)

	if !errors.Is(err, ErrTaskNotFound) {
		t.Fatalf(
			"error = %v, want %v",
			err,
			ErrTaskNotFound,
		)
	}
}
func TestMemoryRepositoryCompleteTaskAfterDungeonDeath(t *testing.T) {
	t.Parallel()

	repo := NewMemoryRepository(repositoryRoutineProvider{
		tasks: []routine.Task{
			{
				Title:  "Kill dungeon",
				Damage: 100,
			},
			{
				Title:  "Second task",
				Damage: 20,
			},
		},
	})

	_, err := repo.CreateDungeonWithTasks(
		context.Background(),
		&Dungeon{
			NameBoss:  "Nilchan",
			MaxHP:     100,
			HP:        100,
			Status:    "ACTIVE",
			RoutineID: 7,
		},
	)
	if err != nil {
		t.Fatalf("CreateDungeonWithTasks() error = %v", err)
	}

	got, err := repo.CompleteTask(
		context.Background(),
		1,
	)
	if err != nil {
		t.Fatalf("first CompleteTask() error = %v", err)
	}

	if got.HP != 0 {
		t.Fatalf(
			"HP = %d, want 0",
			got.HP,
		)
	}

	if got.Status != "DEAD" {
		t.Fatalf(
			"status = %q, want DEAD",
			got.Status,
		)
	}

	_, err = repo.CompleteTask(
		context.Background(),
		2,
	)
	if !errors.Is(err, ErrDungeonAlreadyDead) {
		t.Fatalf(
			"CompleteTask() error = %v, want %v",
			err,
			ErrDungeonAlreadyDead,
		)
	}
}
