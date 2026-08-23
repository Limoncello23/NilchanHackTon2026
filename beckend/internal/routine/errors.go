package routine

import (
	"errors"
	"net/http"
)

var (
	ErrInvalidName       = errors.New("invalid routine name")
	ErrInvalidRepeat     = errors.New("invalid repeat")
	ErrNoTasks           = errors.New("no tasks")
	ErrRoutineNotExist   = errors.New("task doesn't exist")
	ErrInvalidTaskTitle  = errors.New("invalid task title")
	ErrInvalidTaskDamage = errors.New("invalid task damage")
)

func checkErrAndReturnStatus400or500(err error, w http.ResponseWriter) {
	if errors.Is(err, ErrInvalidName) || errors.Is(err, ErrInvalidRepeat) ||
		errors.Is(err, ErrNoTasks) || errors.Is(err, ErrRoutineNotExist) ||
		errors.Is(err, ErrInvalidTaskDamage) || errors.Is(err, ErrInvalidTaskTitle) {

		http.Error(w, "bad request: "+err.Error(), http.StatusBadRequest)

	} else {

		http.Error(w, "internal server error", http.StatusInternalServerError)
	}
}
