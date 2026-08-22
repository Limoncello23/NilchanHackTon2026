package routine

import (
	"errors"
	"net/http"
)

var (
	ErrInvalidName       = errors.New("invalid routine name")
	ErrInvalidRepeat     = errors.New("invalid repeat")
	ErrNoTasks           = errors.New("no tasks")
	ErrInvalidTaskTitle  = errors.New("invalid task title")
	ErrInvalidTaskDamage = errors.New("invalid task damage")
)

func check400or500(err error, w http.ResponseWriter) {
	if errors.Is(err, ErrInvalidName) || errors.Is(err, ErrInvalidRepeat) ||
		errors.Is(err, ErrNoTasks) || errors.Is(err, ErrInvalidTaskTitle) ||
		errors.Is(err, ErrInvalidTaskDamage) {

		http.Error(w, "bad request: "+err.Error(), http.StatusBadRequest)

	} else {

		http.Error(w, "internal server error", http.StatusInternalServerError)
	}
}
