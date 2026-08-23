package routine

import (
	"context"
	"errors"
	"testing"
)

func TestCreateRoutine(t *testing.T) {
	tests := []struct {
		name          string
		routineName   string
		repeat        string
		tasks         []Task
		wantErr       error
		wantName      string
		wantTaskTitle string
	}{
		{
			name:          "success",
			routineName:   "Test routine",
			repeat:        "daily",
			tasks:         []Task{{Title: "Test task", Damage: 10}},
			wantName:      "Test routine",
			wantTaskTitle: "Test task",
		},
		{
			name:          "trim spaces",
			routineName:   "  Test routine  ",
			repeat:        "daily",
			tasks:         []Task{{Title: "  Test task  ", Damage: 10}},
			wantName:      "Test routine",
			wantTaskTitle: "Test task",
		},
		{
			name:        "invalid name",
			routineName: "",
			repeat:      "daily",
			tasks:       []Task{{Title: "Test task", Damage: 10}},
			wantErr:     ErrInvalidName,
		},
		{
			name:        "invalid repeat",
			routineName: "Test routine",
			repeat:      "monthly",
			tasks:       []Task{{Title: "Test task", Damage: 10}},
			wantErr:     ErrInvalidRepeat,
		},
		{
			name:        "no tasks",
			routineName: "Test routine",
			repeat:      "daily",
			tasks:       []Task{},
			wantErr:     ErrNoTasks,
		},
		{
			name:        "invalid task title",
			routineName: "Test routine",
			repeat:      "daily",
			tasks:       []Task{{Title: "", Damage: 10}},
			wantErr:     ErrInvalidTaskTitle,
		},
		{
			name:        "zero damage",
			routineName: "Test routine",
			repeat:      "daily",
			tasks:       []Task{{Title: "Test task", Damage: 0}},
			wantErr:     ErrInvalidTaskDamage,
		},
		{
			name:        "negative damage",
			routineName: "Test routine",
			repeat:      "daily",
			tasks:       []Task{{Title: "Test task", Damage: -10}},
			wantErr:     ErrInvalidTaskDamage,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			repo := NewMemoryRepository()
			service := NewService(repo)

			routine, err := service.CreateRoutine(
				context.Background(),
				tt.routineName,
				tt.repeat,
				tt.tasks,
			)

			if !errors.Is(err, tt.wantErr) {
				t.Fatalf("expected error %v, got %v", tt.wantErr, err)
			}

			if tt.wantErr != nil {
				if routine != nil {
					t.Fatal("expected routine to be nil")
				}
				return
			}

			if routine == nil {
				t.Fatal("expected routine, got nil")
			}

			if routine.Name != tt.wantName {
				t.Errorf("expected name %q, got %q", tt.wantName, routine.Name)
			}

			if len(routine.Tasks) != 1 {
				t.Fatalf("expected 1 task, got %d", len(routine.Tasks))
			}

			if routine.Tasks[0].Title != tt.wantTaskTitle {
				t.Errorf(
					"expected task title %q, got %q",
					tt.wantTaskTitle,
					routine.Tasks[0].Title,
				)
			}
		})
	}
}

func TestGetRoutines(t *testing.T) {
	repo := NewMemoryRepository()
	service := NewService(repo)

	routine := &Routine{
		Name:   "Test routine",
		Repeat: "daily",
	}

	if err := repo.Create(context.Background(), routine); err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	routines, err := service.GetRoutines(context.Background())
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	if len(routines) != 1 {
		t.Fatalf("expected 1 routine, got %d", len(routines))
	}

	if routines[0].Name != "Test routine" {
		t.Errorf("expected Test routine, got %q", routines[0].Name)
	}
}

func TestGetByID(t *testing.T) {
	repo := NewMemoryRepository()
	service := NewService(repo)

	routine := &Routine{
		Name:   "Test routine",
		Repeat: "daily",
	}

	if err := repo.Create(context.Background(), routine); err != nil {
		t.Fatalf("unexpacted error: %v", err)
	}

	resOK, errOK := service.GetByID(context.Background(), routine.ID)

	if resOK == nil {
		t.Fatal("expected routine, got nil")
	}

	if errOK != nil {
		t.Fatalf("unexpected error: %v", errOK)
	}

	if resOK.Name != "Test routine" {
		t.Errorf("expected name: %q, got: %q", "Test routine", resOK.Name)
	}

	res404, err404 := service.GetByID(context.Background(), 42)

	if res404 != nil {
		t.Fatal("expected nil, got routine")
	}

	if err404 != ErrRoutineNotExist {
		t.Fatalf("unexpected error: %v", err404)
	}
}
