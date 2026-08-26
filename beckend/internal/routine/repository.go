package routine

import (
	"context"
)

type Repository interface {
	Create(ctx context.Context, routine *Routine) error
	GetAll(ctx context.Context) ([]*Routine, error)
	GetByID(ctx context.Context, id int) (*Routine, error)
	GetTasksOfRoutine(ctx context.Context, id int) ([]Task, error)
}

type MemoryRepository struct {
	routines map[int]*Routine
	nextID   int
}

func NewMemoryRepository() Repository {
	return &MemoryRepository{
		routines: make(map[int]*Routine),
		nextID:   1,
	}
}

func (r *MemoryRepository) Create(ctx context.Context, routine *Routine) error {
	routine.ID = r.nextID
	r.routines[routine.ID] = routine
	r.nextID++

	return nil
}

func (r *MemoryRepository) GetAll(ctx context.Context) ([]*Routine, error) {
	routines := make([]*Routine, 0, len(r.routines))

	for k := range r.routines {
		routines = append(routines, r.routines[k])
	}

	return routines, nil
}

func (r *MemoryRepository) GetByID(ctx context.Context, id int) (*Routine, error) {
	routine, ok := r.routines[id]
	if !ok {
		return nil, ErrRoutineNotExist
	}

	return routine, nil
}

func (r *MemoryRepository) GetTasksOfRoutine(ctx context.Context, id int) ([]Task, error) {
	routine, ok := r.routines[id]
	if !ok {
		return nil, ErrRoutineNotExist
	}

	return routine.Tasks, nil
}
