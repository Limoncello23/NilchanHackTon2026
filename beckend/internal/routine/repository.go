package routine

import (
	"context"
)

type Repository interface {
	Create(ctx context.Context, routine *Routine) error

	GetAll(ctx context.Context) ([]*Routine, error)
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
	res := make([]*Routine, 0, len(r.routines))

	for k := range r.routines {
		res = append(res, r.routines[k])
	}

	return res, nil
}
