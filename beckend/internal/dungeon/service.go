package dungeon

import (
	"context"
	"fmt"
)

type Service interface {
	CreateDungeon(ctx context.Context, routineID int) (*Dungeon, error)
	GetDungeon(ctx context.Context, dungeonID int) (*Dungeon, error)
	CompleteTask(ctx context.Context, taskID int) (*Dungeon, error)
}

type service struct {
	repo        Repository
	routineRepo RoutineTaskProvider
}

func NewService(repo Repository, routineRepo RoutineTaskProvider) *service {
	return &service{
		repo:        repo,
		routineRepo: routineRepo,
	}
}

func (s *service) CreateDungeon(ctx context.Context, routineID int) (*Dungeon, error) {
	if routineID <= 0 {
		return nil, ErrInvalidRoutineID
	}

	routine, err := s.routineRepo.GetByID(ctx, routineID)
	if err != nil {
		return nil, fmt.Errorf("get routine: %w", err)
	}

	routineTasks, err := s.routineRepo.GetTasksOfRoutine(ctx, routineID)
	if err != nil {
		return nil, fmt.Errorf("get routine tasks: %w", err)
	}

	if len(routineTasks) == 0 {
		return nil, ErrNoTasksInRoutine
	}

	calculatedMaxHP := 0

	for _, task := range routineTasks {
		calculatedMaxHP += task.Damage
	}

	dungeon := &Dungeon{
		ID:        0,
		NameBoss:  routine.Name,
		MaxHP:     calculatedMaxHP,
		HP:        calculatedMaxHP,
		Status:    "ACTIVE",
		RoutineID: routineID,
	}

	id, err := s.repo.CreateDungeonWithTasks(ctx, dungeon)
	if err != nil {
		return nil, fmt.Errorf("create dungeon with tasks: %w", err)
	}

	dungeon.ID = id

	dungeon, err = s.repo.GetDungeon(ctx, dungeon.ID)
	if err != nil {
		return nil, fmt.Errorf("get created dungeon: %w", err)
	}

	return dungeon, nil
}

func (s *service) GetDungeon(ctx context.Context, dungeonID int) (*Dungeon, error) {
	if dungeonID <= 0 {
		return nil, ErrInvalidDungeonID
	}

	dungeon, err := s.repo.GetDungeon(ctx, dungeonID)
	if err != nil {
		return nil, fmt.Errorf("get dungeon: %w", err)
	}

	return dungeon, nil
}

func (s *service) CompleteTask(ctx context.Context, taskID int) (*Dungeon, error) {
	if taskID <= 0 {
		return nil, ErrInvalidTaskID
	}

	task, err := s.repo.GetDungeonTask(ctx, taskID)
	if err != nil {
		return nil, fmt.Errorf("get dungeon task: %w", err)
	}

	if task.Completed {
		return nil, ErrTaskAlreadyCompleted
	}

	dungeon, err := s.repo.CompleteTask(ctx, taskID)
	if err != nil {
		return nil, fmt.Errorf("complete task: %w", err)
	}

	return dungeon, nil
}
