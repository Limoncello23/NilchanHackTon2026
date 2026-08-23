package dungeon

import (
	"context"
	"errors"
	"testing"

	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/routine"
)

type serviceRoutineProvider struct {
	tasks []routine.Task
	err   error
}

func (p serviceRoutineProvider) GetTasksOfRoutine(context.Context, int) ([]routine.Task, error) {
	return p.tasks, p.err
}

type serviceRepositoryStub struct {
	createDungeonID  int
	createDungeonErr error
	createdDungeon   *Dungeon

	createTasksRoutineID int
	createTasksDungeonID int
	createTasksErr       error

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

func (r *serviceRepositoryStub) CreateDungeon(dungeon *Dungeon) (int, error) {
	r.createdDungeon = dungeon
	return r.createDungeonID, r.createDungeonErr
}

func (r *serviceRepositoryStub) GetDungeon(int) (*Dungeon, error) {
	return r.getDungeon, r.getDungeonErr
}

func (r *serviceRepositoryStub) CompleteTask(taskID int) (*Dungeon, error) {
	r.completeTaskID = taskID
	return r.completedDungeon, r.completeTaskErr
}

func (r *serviceRepositoryStub) CreateDungeonTasks(routineID, dungeonID int) error {
	r.createTasksRoutineID = routineID
	r.createTasksDungeonID = dungeonID
	return r.createTasksErr
}

func (r *serviceRepositoryStub) GetDungeonTask(int) (Task, error) {
	return r.task, r.getTaskErr
}

func (r *serviceRepositoryStub) KillDungeon(dungeonID int) (*Dungeon, error) {
	r.killDungeonID = dungeonID
	return r.killedDungeon, r.killDungeonErr
}

func TestServiceCreateDungeon(t *testing.T) {
	t.Parallel()

	repo := &serviceRepositoryStub{createDungeonID: 8}
	service := NewService(repo, serviceRoutineProvider{tasks: []routine.Task{
		{Title: "First", Damage: 15},
		{Title: "Second", Damage: 25},
	}})

	dungeon, err := service.CreateDungeon(3)
	if err != nil {
		t.Fatalf("CreateDungeon() error = %v", err)
	}
	if dungeon.ID != 8 || dungeon.HP != 40 || dungeon.MaxHP != 40 || !dungeon.Status || dungeon.RoutineID != 3 {
		t.Fatalf("dungeon = %+v, want created active dungeon with 40 HP", dungeon)
	}
	if repo.createdDungeon == nil {
		t.Fatal("repository CreateDungeon() was not called")
	}
	if repo.createTasksRoutineID != 3 || repo.createTasksDungeonID != 8 {
		t.Fatalf("CreateDungeonTasks() received (%d, %d), want (3, 8)", repo.createTasksRoutineID, repo.createTasksDungeonID)
	}
}

func TestServiceGetDungeon(t *testing.T) {
	t.Parallel()

	wantDungeon := &Dungeon{ID: 4, HP: 50}
	service := NewService(&serviceRepositoryStub{getDungeon: wantDungeon}, nil)

	dungeon, err := service.GetDungeon(4)
	if err != nil {
		t.Fatalf("GetDungeon() error = %v", err)
	}
	if dungeon != wantDungeon {
		t.Fatalf("GetDungeon() = %+v, want %+v", dungeon, wantDungeon)
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
			name:    "rejects a completed task",
			repo:    &serviceRepositoryStub{task: Task{ID: 1, Completed: true}},
			wantErr: ErrTaskAlreadyCompleted,
		},
		{
			name: "returns active dungeon after task completion",
			repo: &serviceRepositoryStub{
				task:             Task{ID: 2},
				completedDungeon: &Dungeon{ID: 5, HP: 10, Status: true},
			},
			want: &Dungeon{ID: 5, HP: 10, Status: true},
		},
		{
			name: "kills dungeon when HP reaches zero",
			repo: &serviceRepositoryStub{
				task:             Task{ID: 3},
				completedDungeon: &Dungeon{ID: 6, HP: 0, Status: true},
				killedDungeon:    &Dungeon{ID: 6, HP: 0, Status: false},
			},
			want:     &Dungeon{ID: 6, HP: 0, Status: false},
			wantKill: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			service := NewService(tt.repo, nil)
			dungeon, err := service.CompleteTask(tt.repo.task.ID)
			if !errors.Is(err, tt.wantErr) {
				t.Fatalf("error = %v, want %v", err, tt.wantErr)
			}
			if tt.wantErr != nil {
				return
			}
			if dungeon == nil || *dungeon != *tt.want {
				t.Fatalf("dungeon = %+v, want %+v", dungeon, tt.want)
			}
			if tt.wantKill && tt.repo.killDungeonID != tt.want.ID {
				t.Fatalf("KillDungeon() received %d, want %d", tt.repo.killDungeonID, tt.want.ID)
			}
			if !tt.wantKill && tt.repo.killDungeonID != 0 {
				t.Fatalf("KillDungeon() received %d, want no call", tt.repo.killDungeonID)
			}
		})
	}
}
