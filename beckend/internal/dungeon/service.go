package dungeon

import (
	"context"
	"fmt"
)

type Service interface {
	CreateDungeon(routineID int) (*Dungeon, error)
	GetDungeon(dungeonID int) (*Dungeon, error)
	CompleteTask(taskID int) (*Dungeon, error)
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

func (s *service) CreateDungeon(routineID int) (*Dungeon, error) {
	if routineID <= 0 {
		return nil, ErrInvalidRoutineID
	}

	routineTasks, err := s.routineRepo.GetTasksOfRoutine(context.Background(), routineID)
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
		ID:        0,               // ID will be set by the database - next id like in routie
		NameBoss:  "Nilchan",       // Default boss name
		MaxHP:     calculatedMaxHP, // Default max HP - we can take tasksDMG * taksQuantity
		HP:        calculatedMaxHP, // Default current HP
		Status:    true,            // Dungeon is active
		RoutineID: routineID,
	}

	if id, err := s.repo.CreateDungeon(dungeon); err != nil {
		return nil, fmt.Errorf("create dungeon: %w", err)
	} else {
		dungeon.ID = id
	}

	if err := s.repo.CreateDungeonTasks(routineID, dungeon.ID); err != nil {
		return nil, fmt.Errorf("create dungeon tasks: %w", err)
	}

	return dungeon, nil
}

func (s *service) GetDungeon(dungeonID int) (*Dungeon, error) {
	if dungeonID <= 0 {
		return nil, ErrInvalidDungeonID
	}

	if dungeon, err := s.repo.GetDungeon(dungeonID); err != nil {
		return nil, fmt.Errorf("get dungeon: %w", err)
	} else {
		return dungeon, nil
	}
}

func (s *service) CompleteTask(taskID int) (*Dungeon, error) {
	if taskID <= 0 {
		return nil, ErrInvalidTaskID
	}

	task, err := s.repo.GetDungeonTask(taskID)
	if err != nil {
		return nil, fmt.Errorf("get dungeon task: %w", err)
	}

	if task.Completed {
		return nil, ErrTaskAlreadyCompleted // Task already completed, no need to update dungeon
	} else {

		dungeon, err := s.repo.CompleteTask(taskID)
		if err != nil {
			return nil, fmt.Errorf("complete task: %w", err)
		}

		// If the dungeon's HP is less than or equal to 0, mark it as dead
		if dungeon.HP <= 0 {
			dungeonKilled, err := s.repo.KillDungeon(dungeon.ID)
			if err != nil {
				return nil, fmt.Errorf("kill dungeon: %w", err)
			}
			return dungeonKilled, nil
		}

		return dungeon, nil
	}
}
