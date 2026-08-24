package routine

import (
	"context"
	"testing"
)

func TestMemoryRepositoryCreate(t *testing.T) {
	repo := NewMemoryRepository()

	routine1 := &Routine{
		Name:   "First routine",
		Repeat: "daily",
	}

	routine2 := &Routine{
		Name:   "Second routine",
		Repeat: "weekly",
	}

	err := repo.Create(context.Background(), routine1)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	err = repo.Create(context.Background(), routine2)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if routine1.ID != 1 {
		t.Errorf("expected first ID 1, got %d", routine1.ID)
	}

	if routine2.ID != 2 {
		t.Errorf("expected second ID 2, got %d", routine2.ID)
	}
}

func TestMemoryRepositoryGetAll(t *testing.T) {
	tests := []struct {
		name          string
		setup         func(repo Repository)
		wantLen       int
		wantFirstName string
	}{
		{
			name:    "empty repository",
			setup:   func(repo Repository) {},
			wantLen: 0,
		},
		{
			name: "returns routines",
			setup: func(repo Repository) {
				_ = repo.Create(context.Background(), &Routine{
					Name:   "First routine",
					Repeat: "daily",
				})
				_ = repo.Create(context.Background(), &Routine{
					Name:   "Second routine",
					Repeat: "weekly",
				})
			},
			wantLen:       2,
			wantFirstName: "First routine",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			repo := NewMemoryRepository()

			tt.setup(repo)

			routines, err := repo.GetAll(context.Background())
			if err != nil {
				t.Fatalf("unexpected error: %v", err)
			}

			if len(routines) != tt.wantLen {
				t.Fatalf("expected %d routines, got %d", tt.wantLen, len(routines))
			}

			if tt.wantLen > 0 && routines[0].Name != tt.wantFirstName {
				t.Errorf(
					"expected first routine %q, got %q",
					tt.wantFirstName,
					routines[0].Name,
				)
			}
		})
	}
}

func TestGetTasksOfRoutine(t *testing.T) {
	routine := &Routine{
		Name:   "Test routine",
		Repeat: "daily",
		Tasks: []Task{
			{Title: "Task 1", Damage: 10},
			{Title: "Task 2", Damage: 20},
		},
	}

	repo := NewMemoryRepository()
	if err := repo.Create(context.Background(), routine); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	tasksOK, errOK := repo.GetTasksOfRoutine(context.Background(), routine.ID)

	if errOK != nil {
		t.Fatalf("unexpected error: %v", errOK)
	}

	if len(tasksOK) != 2 {
		t.Errorf("expected 2 tasks, got %d", len(tasksOK))
	}

	if tasksOK[0].Title != "Task 1" || tasksOK[1].Title != "Task 2" {
		t.Error("unexpected task names")
	}

	tasks404, err404 := repo.GetTasksOfRoutine(context.Background(), 42)

	if tasks404 != nil {
		t.Error("expected nil, got tasks")
	}

	if err404 != ErrRoutineNotExist {
		t.Errorf("expected %q, got %q", ErrRoutineNotExist, err404)
	}
}
