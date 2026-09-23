package dungeon

import (
	"context"
	"errors"
	"reflect"
	"testing"

	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/routine"
)

type serviceRoutineProvider struct {
	routine *routine.Routine
	tasks   []routine.Task
	err     error
}

func (p serviceRoutineProvider) GetTasksOfRoutine(
	context.Context,
	int,
) ([]routine.Task, error) {
	return p.tasks, p.err
}

func (p serviceRoutineProvider) GetByID(context.Context, int) (*routine.Routine, error) {
	return p.routine, p.err
}

type serviceRepositoryStub struct {
	createDungeonWithTasksID  int
	createDungeonWithTasksErr error
	createdDungeon            *Dungeon

	getDungeon    *Dungeon
	getDungeonErr error

	task       Task
	getTaskErr error

	completeTaskID   int
	completedDungeon *Dungeon
	completeTaskErr  error

	killDungeonID  int
	killedDungeon  *Dungeon
	killDungeonErr error
}

func (r *serviceRepositoryStub) CreateDungeon(
	ctx context.Context,
	dungeon *Dungeon,
) (int, error) {
	r.createdDungeon = dungeon
	return r.createDungeonWithTasksID, r.createDungeonWithTasksErr
}

func (r *serviceRepositoryStub) CreateDungeonWithTasks(
	ctx context.Context,
	dungeon *Dungeon,
) (int, error) {
	r.createdDungeon = dungeon
	return r.createDungeonWithTasksID, r.createDungeonWithTasksErr
}

func (r *serviceRepositoryStub) GetDungeon(
	ctx context.Context,
	dungeonID int,
) (*Dungeon, error) {
	return r.getDungeon, r.getDungeonErr
}

func (r *serviceRepositoryStub) CompleteTask(
	ctx context.Context,
	taskID int,
) (*Dungeon, error) {
	r.completeTaskID = taskID
	return r.completedDungeon, r.completeTaskErr
}

func (r *serviceRepositoryStub) CreateDungeonTasks(
	ctx context.Context,
	routineID, dungeonID int,
) error {
	return nil
}

func (r *serviceRepositoryStub) GetDungeonTask(
	ctx context.Context,
	taskID int,
) (Task, error) {
	return r.task, r.getTaskErr
}

func (r *serviceRepositoryStub) KillDungeon(
	ctx context.Context,
	dungeonID int,
) (*Dungeon, error) {
	r.killDungeonID = dungeonID
	return r.killedDungeon, r.killDungeonErr
}

func TestServiceCreateDungeon(t *testing.T) {
	t.Parallel()

	repo := &serviceRepositoryStub{
		createDungeonWithTasksID: 8,
	}

	service := NewService(
		repo,
		serviceRoutineProvider{
			routine: &routine.Routine{Name: "Test boss"},
			tasks: []routine.Task{
				{Title: "First", Damage: 15},
				{Title: "Second", Damage: 25},
			},
		},
	)

	dungeon, err := service.CreateDungeon(
		context.Background(),
		3,
	)
	if err != nil {
		t.Fatalf(
			"CreateDungeon() error = %v",
			err,
		)
	}

	if dungeon.ID != 8 ||
		dungeon.NameBoss != "Test boss" ||
		dungeon.HP != 40 ||
		dungeon.MaxHP != 40 ||
		dungeon.Status != "ACTIVE" ||
		dungeon.RoutineID != 3 {
		t.Fatalf(
			"dungeon = %+v, want created active dungeon with 40 HP",
			dungeon,
		)
	}

	if repo.createdDungeon == nil {
		t.Fatal(
			"repository CreateDungeonWithTasks() was not called",
		)
	}

	if repo.createdDungeon.RoutineID != 3 {
		t.Fatalf(
			"routineID = %d, want 3",
			repo.createdDungeon.RoutineID,
		)
	}

	if repo.createdDungeon.MaxHP != 40 {
		t.Fatalf(
			"maxHP = %d, want 40",
			repo.createdDungeon.MaxHP,
		)
	}
}
func TestServiceGetDungeon(t *testing.T) {
	t.Parallel()

	wantDungeon := &Dungeon{
		ID:     4,
		HP:     50,
		Status: "ACTIVE",
	}

	service := NewService(
		&serviceRepositoryStub{
			getDungeon: wantDungeon,
		},
		nil,
	)

	dungeon, err := service.GetDungeon(
		context.Background(),
		4,
	)
	if err != nil {
		t.Fatalf(
			"GetDungeon() error = %v",
			err,
		)
	}

	if dungeon != wantDungeon {
		t.Fatalf(
			"GetDungeon() = %+v, want %+v",
			dungeon,
			wantDungeon,
		)
	}
}

func TestServiceCompleteTask(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name     string
		repo     *serviceRepositoryStub
		want     *Dungeon
		wantErr  error
		wantKill bool
	}{
		{
			name: "rejects a completed task",
			repo: &serviceRepositoryStub{
				task: Task{
					ID:        1,
					Completed: true,
				},
			},
			wantErr: ErrTaskAlreadyCompleted,
		},
		{
			name: "returns active dungeon after task completion",
			repo: &serviceRepositoryStub{
				task: Task{
					ID: 2,
				},
				completedDungeon: &Dungeon{
					ID:     5,
					HP:     10,
					Status: "ACTIVE",
				},
			},
			want: &Dungeon{
				ID:     5,
				HP:     10,
				Status: "ACTIVE",
			},
		},
		{
			name: "returns dead dungeon when HP reaches zero",
			repo: &serviceRepositoryStub{
				task: Task{
					ID: 3,
				},
				completedDungeon: &Dungeon{
					ID:     6,
					HP:     0,
					Status: "DEAD",
				},
			},
			want: &Dungeon{
				ID:     6,
				HP:     0,
				Status: "DEAD",
			},
			wantKill: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			service := NewService(
				tt.repo,
				nil,
			)

			dungeon, err := service.CompleteTask(
				context.Background(),
				tt.repo.task.ID,
			)

			if !errors.Is(err, tt.wantErr) {
				t.Fatalf(
					"error = %v, want %v",
					err,
					tt.wantErr,
				)
			}

			if tt.wantErr != nil {
				return
			}

			if dungeon == nil ||
				!reflect.DeepEqual(*dungeon, *tt.want) {
				t.Fatalf(
					"dungeon = %+v, want %+v",
					dungeon,
					tt.want,
				)
			}

			if tt.wantKill &&
				tt.repo.killDungeonID != tt.want.ID {
				t.Fatalf(
					"KillDungeon() received %d, want %d",
					tt.repo.killDungeonID,
					tt.want.ID,
				)
			}

			if !tt.wantKill &&
				tt.repo.killDungeonID != 0 {
				t.Fatalf(
					"KillDungeon() received %d, want no call",
					tt.repo.killDungeonID,
				)
			}
		})
	}
}
