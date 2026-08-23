package dungeon

import (
	"encoding/json"
	"errors"
	"net/http"
	"strconv"
)

type DungeonHandler struct {
	service Service
}

func NewDungeonHandler(service Service) *DungeonHandler {
	return &DungeonHandler{
		service: service,
	}
}

func (h *DungeonHandler) CreateDungeon(w http.ResponseWriter, r *http.Request) {
	routineID, err := strconv.Atoi(r.PathValue("id"))
	if err != nil || routineID <= 0 {
		writeDungeonError(w, ErrInvalidRoutineID)
		return
	}

	dungeon, err := h.service.CreateDungeon(routineID)
	if err != nil {
		writeDungeonError(w, err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	res, err := json.MarshalIndent(dungeon, "", "  ")
	if err != nil {
		writeDungeonError(w, err)
		return
	}
	w.WriteHeader(http.StatusCreated)

	w.Write(res)
}

func (h *DungeonHandler) GetDungeon(w http.ResponseWriter, r *http.Request) {
	dungeonID, err := strconv.Atoi(r.PathValue("id"))
	if err != nil || dungeonID <= 0 {
		writeDungeonError(w, ErrInvalidDungeonID)
		return
	}

	dungeon, err := h.service.GetDungeon(dungeonID)
	if err != nil {
		writeDungeonError(w, err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	res, err := json.MarshalIndent(dungeon, "", "  ")
	if err != nil {
		writeDungeonError(w, err)
		return
	}
	w.WriteHeader(http.StatusOK)

	w.Write(res)
}

func (h *DungeonHandler) CompleteTask(w http.ResponseWriter, r *http.Request) {
	taskID, err := strconv.Atoi(r.PathValue("id"))
	if err != nil || taskID <= 0 {
		writeDungeonError(w, ErrInvalidTaskID)
		return
	}

	dungeon, err := h.service.CompleteTask(taskID)
	if err != nil {
		writeDungeonError(w, err)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	res, err := json.MarshalIndent(dungeon, "", "  ")
	if err != nil {
		writeDungeonError(w, err)
		return
	}
	w.WriteHeader(http.StatusOK)

	w.Write(res)
}

func writeDungeonError(w http.ResponseWriter, err error) {
	switch {
	case errors.Is(err, ErrInvalidRoutineID):
		http.Error(w, ErrInvalidRoutineID.Error(), http.StatusBadRequest)
	case errors.Is(err, ErrInvalidDungeonID):
		http.Error(w, ErrInvalidDungeonID.Error(), http.StatusBadRequest)
	case errors.Is(err, ErrInvalidTaskID):
		http.Error(w, ErrInvalidTaskID.Error(), http.StatusBadRequest)
	case errors.Is(err, ErrInvalidDungeon):
		http.Error(w, ErrInvalidDungeon.Error(), http.StatusBadRequest)
	case errors.Is(err, ErrNoTasksInRoutine):
		http.Error(w, ErrNoTasksInRoutine.Error(), http.StatusBadRequest)
	case errors.Is(err, ErrDungeonNotFound):
		http.Error(w, ErrDungeonNotFound.Error(), http.StatusNotFound)
	case errors.Is(err, ErrTaskNotFound):
		http.Error(w, ErrTaskNotFound.Error(), http.StatusNotFound)
	case errors.Is(err, ErrTaskAlreadyCompleted):
		http.Error(w, ErrTaskAlreadyCompleted.Error(), http.StatusConflict)
	default:
		http.Error(w, "internal server error", http.StatusInternalServerError)
	}
}
