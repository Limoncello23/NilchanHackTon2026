package routine

import (
	"context"
	"strings"
)

type Service interface {
	CreateRoutine(ctx context.Context, name, repeat string, tasks []Task) (*Routine, error)
	GetRoutines(ctx context.Context) ([]*Routine, error)
	GetByID(ctx context.Context, id int) (*Routine, error)
}

type service struct {
	repo Repository
}

func NewService(repo Repository) Service {
	return &service{
		repo: repo,
	}
}

func (s *service) CreateRoutine(ctx context.Context, name, repeat string, tasks []Task) (*Routine, error) {
	name = strings.TrimSpace(name)

	if name == "" {
		return nil, ErrInvalidName
	}

	if repeat != "daily" && repeat != "weekly" {
		return nil, ErrInvalidRepeat
	}

	if len(tasks) == 0 {
		return nil, ErrNoTasks
	}

	for k := range tasks {
		if err := validateTask(&tasks[k]); err != nil {
			return nil, err
		}
	}

	routine := &Routine{
		Name:   name,
		Repeat: repeat,
		Tasks:  tasks,
	}

	if err := s.repo.Create(ctx, routine); err != nil {
		return nil, err
	}

	return routine, nil
}

func validateTask(task *Task) error {
	task.Title = strings.TrimSpace(task.Title)

	if task.Title == "" {
		return ErrInvalidTaskTitle
	}

	if task.Damage <= 0 {
		return ErrInvalidTaskDamage
	}

	return nil
}

func (s *service) GetRoutines(ctx context.Context) ([]*Routine, error) {
	routines, err := s.repo.GetAll(ctx)
	if err != nil {
		return nil, err
	}

	if routines == nil {
		routines = []*Routine{}
	}

	return routines, nil
}

func (s *service) GetByID(ctx context.Context, id int) (*Routine, error) {
	routine, err := s.repo.GetByID(ctx, id)
	if err != nil {
		return nil, err
	}

	return routine, err
}
