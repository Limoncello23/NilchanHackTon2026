package routine

import (
	"bytes"
	"context"
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestCreateRoutineHandler(t *testing.T) {
	repo := NewMemoryRepository()
	service := NewService(repo)
	handler := NewHandler(service)

	body := `{
		"name": "Test routine",
		"repeat": "daily",
		"tasks": [
			{
				"title": "Test task",
				"damage": 10
			}
		]
	}`

	req := httptest.NewRequest(
		http.MethodPost,
		"/routines",
		bytes.NewBufferString(body),
	)
	req = req.WithContext(context.Background())

	rec := httptest.NewRecorder()

	handler.CreateRoutine(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf("expected status 201, got %d", rec.Code)
	}

	if contentType := rec.Header().Get("Content-Type"); contentType != "application/json" {
		t.Errorf("expected Content-Type application/json, got %q", contentType)
	}
}

func TestCreateRoutineHandlerInvalidJSON(t *testing.T) {
	repo := NewMemoryRepository()
	service := NewService(repo)
	handler := NewHandler(service)

	req := httptest.NewRequest(
		http.MethodPost,
		"/routines",
		bytes.NewBufferString(`{"name": "Test routine",`),
	)

	rec := httptest.NewRecorder()

	handler.CreateRoutine(rec, req)

	if rec.Code != http.StatusBadRequest {
		t.Fatalf("expected status 400, got %d", rec.Code)
	}
}

func TestCreateRoutineHandlerValidation(t *testing.T) {
	tests := []struct {
		name string
		body string
	}{
		{
			name: "invalid name",
			body: `{
				"name": "",
				"repeat": "daily",
				"tasks": [
					{"title": "Test task", "damage": 10}
				]
			}`,
		},
		{
			name: "invalid repeat",
			body: `{
				"name": "Test routine",
				"repeat": "monthly",
				"tasks": [
					{"title": "Test task", "damage": 10}
				]
			}`,
		},
		{
			name: "no tasks",
			body: `{
				"name": "Test routine",
				"repeat": "daily",
				"tasks": []
			}`,
		},
		{
			name: "invalid task title",
			body: `{
				"name": "Test routine",
				"repeat": "daily",
				"tasks": [
					{"title": "", "damage": 10}
				]
			}`,
		},
		{
			name: "negative damage",
			body: `{
				"name": "Test routine",
				"repeat": "daily",
				"tasks": [
					{"title": "Test task", "damage": -10}
				]
			}`,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			repo := NewMemoryRepository()
			service := NewService(repo)
			handler := NewHandler(service)

			req := httptest.NewRequest(
				http.MethodPost,
				"/routines",
				bytes.NewBufferString(tt.body),
			)

			rec := httptest.NewRecorder()

			handler.CreateRoutine(rec, req)

			if rec.Code != http.StatusBadRequest {
				t.Fatalf("expected status 400, got %d", rec.Code)
			}
		})
	}
}

func TestGetRoutinesHandler(t *testing.T) {
	repo := NewMemoryRepository()
	service := NewService(repo)
	handler := NewHandler(service)

	err := repo.Create(context.Background(), &Routine{
		Name:   "Test routine",
		Repeat: "daily",
	})
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	req := httptest.NewRequest(
		http.MethodGet,
		"/routines",
		nil,
	)

	rec := httptest.NewRecorder()

	handler.GetRoutines(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf("expected status 200, got %d", rec.Code)
	}

	if contentType := rec.Header().Get("Content-Type"); contentType != "application/json" {
		t.Errorf("expected Content-Type application/json, got %q", contentType)
	}
}
