package dungeon

import (
	"context"
	"encoding/json"
	"errors"
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"
)

type handlerServiceStub struct {
	createDungeonResult *Dungeon
	createDungeonErr    error

	getDungeonResult *Dungeon
	getDungeonErr    error

	completeTaskResult *Dungeon
	completeTaskErr    error

	lastRoutineID int
	lastDungeonID int
	lastTaskID    int
}

func (s *handlerServiceStub) CreateDungeon(
	ctx context.Context,
	routineID int,
) (*Dungeon, error) {
	s.lastRoutineID = routineID
	return s.createDungeonResult, s.createDungeonErr
}

func (s *handlerServiceStub) GetDungeon(
	ctx context.Context,
	dungeonID int,
) (*Dungeon, error) {
	s.lastDungeonID = dungeonID
	return s.getDungeonResult, s.getDungeonErr
}

func (s *handlerServiceStub) CompleteTask(
	ctx context.Context,
	taskID int,
) (*Dungeon, error) {
	s.lastTaskID = taskID
	return s.completeTaskResult, s.completeTaskErr
}

func TestDungeonHandlerCreateDungeon(t *testing.T) {
	t.Parallel()

	service := &handlerServiceStub{
		createDungeonResult: &Dungeon{
			ID:        10,
			NameBoss:  "Nilchan",
			MaxHP:     30,
			HP:        30,
			Status:    "ACTIVE",
			RoutineID: 7,
		},
	}

	handler := NewDungeonHandler(service)

	req := httptest.NewRequest(
		http.MethodPost,
		"/routines/7/dungeons",
		nil,
	)

	req.SetPathValue("id", "7")

	rec := httptest.NewRecorder()

	handler.CreateDungeon(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusCreated)
	}

	if service.lastRoutineID != 7 {
		t.Fatalf("routineID = %d, want 7", service.lastRoutineID)
	}

	var got Dungeon

	if err := json.NewDecoder(rec.Body).Decode(&got); err != nil {
		t.Fatalf("decode response: %v", err)
	}

	if got.ID != 10 {
		t.Fatalf("dungeon ID = %d, want 10", got.ID)
	}
}

func TestDungeonHandlerGetDungeon(t *testing.T) {
	t.Parallel()

	service := &handlerServiceStub{
		getDungeonResult: &Dungeon{
			ID:        5,
			NameBoss:  "Nilchan",
			MaxHP:     100,
			HP:        70,
			Status:    "ACTIVE",
			RoutineID: 7,
		},
	}

	handler := NewDungeonHandler(service)

	req := httptest.NewRequest(
		http.MethodGet,
		"/dungeons/5",
		nil,
	)

	req.SetPathValue("id", "5")

	rec := httptest.NewRecorder()

	handler.GetDungeon(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}

	if service.lastDungeonID != 5 {
		t.Fatalf("dungeonID = %d, want 5", service.lastDungeonID)
	}

	var got Dungeon

	if err := json.NewDecoder(rec.Body).Decode(&got); err != nil {
		t.Fatalf("decode response: %v", err)
	}

	if got.ID != 5 {
		t.Fatalf("dungeon ID = %d, want 5", got.ID)
	}

	if got.HP != 70 {
		t.Fatalf("HP = %d, want 70", got.HP)
	}
}

func TestDungeonHandlerCompleteTask(t *testing.T) {
	t.Parallel()

	service := &handlerServiceStub{
		completeTaskResult: &Dungeon{
			ID:     5,
			MaxHP:  30,
			HP:     20,
			Status: "ACTIVE",
		},
	}

	handler := NewDungeonHandler(service)

	req := httptest.NewRequest(
		http.MethodPost,
		"/tasks/3/complete",
		nil,
	)

	req.SetPathValue("id", "3")

	rec := httptest.NewRecorder()

	handler.CompleteTask(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("status = %d, want %d", rec.Code, http.StatusOK)
	}

	if service.lastTaskID != 3 {
		t.Fatalf("taskID = %d, want 3", service.lastTaskID)
	}

	var got Dungeon

	if err := json.NewDecoder(rec.Body).Decode(&got); err != nil {
		t.Fatalf("decode response: %v", err)
	}

	if got.HP != 20 {
		t.Fatalf("HP = %d, want 20", got.HP)
	}
}

func TestDungeonHandlerErrors(t *testing.T) {
	t.Parallel()

	tests := []struct {
		name       string
		method     string
		pathValue  string
		serviceErr error
		wantStatus int
		wantBody   string
	}{
		{
			name:       "invalid dungeon id",
			method:     http.MethodGet,
			pathValue:  "abc",
			wantStatus: http.StatusBadRequest,
			wantBody:   "invalid dungeon id",
		},
		{
			name:       "dungeon not found",
			method:     http.MethodGet,
			pathValue:  "999",
			serviceErr: ErrDungeonNotFound,
			wantStatus: http.StatusNotFound,
			wantBody:   "dungeon not found",
		},
		{
			name:       "task not found",
			method:     http.MethodPost,
			pathValue:  "999",
			serviceErr: ErrTaskNotFound,
			wantStatus: http.StatusNotFound,
			wantBody:   "task not found",
		},
		{
			name:       "task already completed",
			method:     http.MethodPost,
			pathValue:  "3",
			serviceErr: ErrTaskAlreadyCompleted,
			wantStatus: http.StatusConflict,
			wantBody:   "task already completed",
		},
		{
			name:       "internal error",
			method:     http.MethodGet,
			pathValue:  "5",
			serviceErr: errors.New("database unavailable"),
			wantStatus: http.StatusInternalServerError,
			wantBody:   "internal server error",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()

			service := &handlerServiceStub{
				getDungeonErr:   tt.serviceErr,
				completeTaskErr: tt.serviceErr,
			}

			handler := NewDungeonHandler(service)

			req := httptest.NewRequest(
				tt.method,
				"/dungeons/"+strconv.Itoa(1),
				nil,
			)

			req.SetPathValue("id", tt.pathValue)

			rec := httptest.NewRecorder()

			switch tt.method {
			case http.MethodGet:
				handler.GetDungeon(rec, req)
			case http.MethodPost:
				handler.CompleteTask(rec, req)
			}

			if rec.Code != tt.wantStatus {
				t.Fatalf(
					"status = %d, want %d; body = %q",
					rec.Code,
					tt.wantStatus,
					rec.Body.String(),
				)
			}

			if !contains(rec.Body.String(), tt.wantBody) {
				t.Fatalf(
					"body = %q, want to contain %q",
					rec.Body.String(),
					tt.wantBody,
				)
			}
		})
	}
}

func contains(s, substr string) bool {
	return len(s) >= len(substr) && stringContains(s, substr)
}

func stringContains(s, substr string) bool {
	for i := 0; i+len(substr) <= len(s); i++ {
		if s[i:i+len(substr)] == substr {
			return true
		}
	}

	return false
}
