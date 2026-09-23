package http

import (
	"bytes"
	"context"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/dungeon"
	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/routine"
)

func TestRouterRoutineEndpoints(t *testing.T) {
	t.Parallel()

	routineRepo := routine.NewMemoryRepository()
	routineService := routine.NewService(routineRepo)
	routineHandler := routine.NewHandler(routineService)

	dungeonRepo := dungeon.NewMemoryRepository(routineService)
	dungeonService := dungeon.NewService(
		dungeonRepo,
		routineService,
	)
	dungeonHandler := dungeon.NewDungeonHandler(dungeonService)

	router := NewRouter(
		routineHandler,
		dungeonHandler,
	)

	body := bytes.NewBufferString(`{
		"name": "Morning routine",
		"repeat": "daily",
		"tasks": [
			{
				"title": "Push ups",
				"damage": 10
			},
			{
				"title": "Read Go",
				"damage": 20
			}
		]
	}`)

	req := httptest.NewRequest(
		http.MethodPost,
		"/routines",
		body,
	)
	req.Header.Set("Content-Type", "application/json")

	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf(
			"POST /routines status = %d, want %d; body = %s",
			rec.Code,
			http.StatusCreated,
			rec.Body.String(),
		)
	}

	var created routine.Routine

	if err := json.NewDecoder(rec.Body).Decode(&created); err != nil {
		t.Fatalf("decode created routine: %v", err)
	}

	if created.ID != 1 {
		t.Fatalf(
			"created routine ID = %d, want 1",
			created.ID,
		)
	}

	if created.Name != "Morning routine" {
		t.Fatalf(
			"created routine name = %q, want %q",
			created.Name,
			"Morning routine",
		)
	}

	if len(created.Tasks) != 2 {
		t.Fatalf(
			"created routine tasks = %d, want 2",
			len(created.Tasks),
		)
	}

	req = httptest.NewRequest(
		http.MethodGet,
		"/routines",
		nil,
	)

	rec = httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf(
			"GET /routines status = %d, want %d",
			rec.Code,
			http.StatusOK,
		)
	}

	var routines []*routine.Routine

	if err := json.NewDecoder(rec.Body).Decode(&routines); err != nil {
		t.Fatalf("decode routines: %v", err)
	}

	if len(routines) != 1 {
		t.Fatalf(
			"routines count = %d, want 1",
			len(routines),
		)
	}

	if routines[0].ID != 1 {
		t.Fatalf(
			"routine ID = %d, want 1",
			routines[0].ID,
		)
	}

	req = httptest.NewRequest(
		http.MethodGet,
		"/routines/1",
		nil,
	)

	rec = httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf(
			"GET /routines/1 status = %d, want %d",
			rec.Code,
			http.StatusOK,
		)
	}

	var got routine.Routine

	if err := json.NewDecoder(rec.Body).Decode(&got); err != nil {
		t.Fatalf("decode routine: %v", err)
	}

	if got.ID != 1 {
		t.Fatalf(
			"routine ID = %d, want 1",
			got.ID,
		)
	}
}

func TestRouterDungeonEndpoints(t *testing.T) {
	t.Parallel()

	routineRepo := routine.NewMemoryRepository()
	routineService := routine.NewService(routineRepo)
	routineHandler := routine.NewHandler(routineService)

	dungeonRepo := dungeon.NewMemoryRepository(routineService)
	dungeonService := dungeon.NewService(
		dungeonRepo,
		routineService,
	)
	dungeonHandler := dungeon.NewDungeonHandler(dungeonService)

	router := NewRouter(
		routineHandler,
		dungeonHandler,
	)

	routine := &routine.Routine{
		Name:   "Morning routine",
		Repeat: "daily",
		Tasks: []routine.Task{
			{
				Title:  "Push ups",
				Damage: 10,
			},
			{
				Title:  "Read Go",
				Damage: 20,
			},
		},
	}

	if err := routineRepo.Create(
		context.Background(),
		routine,
	); err != nil {
		t.Fatalf("create routine: %v", err)
	}

	req := httptest.NewRequest(
		http.MethodPost,
		"/routines/1/dungeons",
		nil,
	)

	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusCreated {
		t.Fatalf(
			"POST /routines/1/dungeons status = %d, want %d; body = %s",
			rec.Code,
			http.StatusCreated,
			rec.Body.String(),
		)
	}

	var created dungeon.Dungeon

	if err := json.NewDecoder(rec.Body).Decode(&created); err != nil {
		t.Fatalf("decode dungeon: %v", err)
	}

	if created.ID != 1 {
		t.Fatalf(
			"dungeon ID = %d, want 1",
			created.ID,
		)
	}

	if created.MaxHP != 30 {
		t.Fatalf(
			"dungeon MaxHP = %d, want 30",
			created.MaxHP,
		)
	}

	if created.HP != 30 {
		t.Fatalf(
			"dungeon HP = %d, want 30",
			created.HP,
		)
	}

	if created.Status != "ACTIVE" {
		t.Fatalf(
			"dungeon status = %q, want ACTIVE",
			created.Status,
		)
	}

	if len(created.Tasks) != 2 {
		t.Fatalf(
			"dungeon tasks = %d, want 2",
			len(created.Tasks),
		)
	}

	req = httptest.NewRequest(
		http.MethodGet,
		"/dungeons/1",
		nil,
	)

	rec = httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf(
			"GET /dungeons/1 status = %d, want %d",
			rec.Code,
			http.StatusOK,
		)
	}

	var got dungeon.Dungeon

	if err := json.NewDecoder(rec.Body).Decode(&got); err != nil {
		t.Fatalf("decode dungeon: %v", err)
	}

	if got.HP != 30 {
		t.Fatalf(
			"dungeon HP = %d, want 30",
			got.HP,
		)
	}

	req = httptest.NewRequest(
		http.MethodPost,
		"/tasks/1/complete",
		nil,
	)

	rec = httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf(
			"POST /tasks/1/complete status = %d, want %d; body = %s",
			rec.Code,
			http.StatusOK,
			rec.Body.String(),
		)
	}

	if err := json.NewDecoder(rec.Body).Decode(&got); err != nil {
		t.Fatalf("decode completed dungeon: %v", err)
	}

	if got.HP != 20 {
		t.Fatalf(
			"dungeon HP after task = %d, want 20",
			got.HP,
		)
	}

	if got.Status != "ACTIVE" {
		t.Fatalf(
			"dungeon status after task = %q, want ACTIVE",
			got.Status,
		)
	}
}
