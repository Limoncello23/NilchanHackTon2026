package http

import (
	"fmt"
	nethttp "net/http"

	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/dungeon"
	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/routine"
)

func NewRouter(routineHandler *routine.Handler, dungeonHandler *dungeon.DungeonHandler) nethttp.Handler {
	mux := nethttp.NewServeMux()

	mux.HandleFunc("/health", healthHandler)
	mux.HandleFunc("GET /routines", routineHandler.GetRoutines)
	mux.HandleFunc("POST /routines", routineHandler.CreateRoutine)
	mux.HandleFunc("POST /routines/{id}/dungeons", dungeonHandler.CreateDungeon)
	mux.HandleFunc("GET /dungeons/{id}", dungeonHandler.GetDungeon)
	mux.HandleFunc("POST /tasks/{id}/complete", dungeonHandler.CompleteTask)

	return cors(mux)
}

func healthHandler(w nethttp.ResponseWriter, r *nethttp.Request) {
	w.Header().Set("Content-Type", "application/json")
	fmt.Fprintln(w, `{"status":"ok"}`)
}

func cors(next nethttp.Handler) nethttp.Handler {
	return nethttp.HandlerFunc(func(w nethttp.ResponseWriter, r *nethttp.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

		if r.Method == nethttp.MethodOptions {
			w.WriteHeader(nethttp.StatusNoContent)
			return
		}

		next.ServeHTTP(w, r)
	})
}
