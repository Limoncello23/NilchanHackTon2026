package dungeon

import "errors"

var (
	ErrTaskAlreadyCompleted      = errors.New("task already completed")
	ErrNoTasksInRoutine          = errors.New("no tasks in routine")
	ErrInvalidRoutineID          = errors.New("invalid routine id")
	ErrInvalidDungeonID          = errors.New("invalid dungeon id")
	ErrInvalidTaskID             = errors.New("invalid task id")
	ErrInvalidDungeon            = errors.New("invalid dungeon")
	ErrDungeonNotFound           = errors.New("dungeon not found")
	ErrTaskNotFound              = errors.New("task not found")
	ErrRoutineRepositoryRequired = errors.New("routine repository is required")
	ErrDungeonTasksAlreadyExist  = errors.New("dungeon tasks already exist")
)
