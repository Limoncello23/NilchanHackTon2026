package dungeon

import (
	"context"
	"fmt"
	"sync"
	"time"

	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/routine"
)

type RoutineTaskProvider interface {
	GetTasksOfRoutine(ctx context.Context, routineID int) ([]routine.Task, error)
	GetByID(ctx context.Context, id int) (*routine.Routine, error)

}

type Repository interface {
	CreateDungeon(ctx context.Context, dungeon *Dungeon) (int, error)
	CreateDungeonWithTasks(ctx context.Context, dungeon *Dungeon) (int, error)
	GetDungeon(ctx context.Context, dungeonID int) (*Dungeon, error)
	CompleteTask(ctx context.Context, taskID int) (*Dungeon, error)
	CreateDungeonTasks(ctx context.Context, routineID, dungeonID int) error
	GetDungeonTask(ctx context.Context, taskID int) (Task, error)
}

type MemoryRepository struct {
	mu sync.RWMutex

	routineRepo  RoutineTaskProvider
	dungeons     map[int]*Dungeon
	dungeonTasks map[int][]Task

	nextDungeonID int
	nextTaskID    int
}

func NewMemoryRepository(routineRepo RoutineTaskProvider) *MemoryRepository {
	return &MemoryRepository{
		routineRepo:   routineRepo,
		dungeons:      make(map[int]*Dungeon),
		dungeonTasks:  make(map[int][]Task),
		nextDungeonID: 1,
		nextTaskID:    1,
	}
}

func (r *MemoryRepository) CreateDungeon(
	ctx context.Context,
	dungeon *Dungeon,
) (int, error) {
	if dungeon == nil {
		return 0, ErrInvalidDungeon
	}

	r.mu.Lock()
	defer r.mu.Unlock()

	dungeon.ID = r.nextDungeonID

	if dungeon.CreatedAt.IsZero() {
		dungeon.CreatedAt = time.Now()
	}

	r.dungeons[dungeon.ID] = cloneDungeon(dungeon)
	r.nextDungeonID++

	return dungeon.ID, nil
}

func (r *MemoryRepository) CreateDungeonWithTasks(
	ctx context.Context,
	dungeon *Dungeon,
) (int, error) {
	if dungeon == nil {
		return 0, ErrInvalidDungeon
	}

	if r.routineRepo == nil {
		return 0, ErrRoutineRepositoryRequired
	}

	if dungeon.RoutineID <= 0 {
		return 0, ErrInvalidRoutineID
	}

	routineTasks, err := r.routineRepo.GetTasksOfRoutine(
		ctx,
		dungeon.RoutineID,
	)
	if err != nil {
		return 0, fmt.Errorf("get routine tasks: %w", err)
	}

	if len(routineTasks) == 0 {
		return 0, ErrNoTasksInRoutine
	}

	if dungeon.CreatedAt.IsZero() {
		dungeon.CreatedAt = time.Now()
	}

	r.mu.Lock()
	defer r.mu.Unlock()

	dungeon.ID = r.nextDungeonID

	r.dungeons[dungeon.ID] = cloneDungeon(dungeon)

	dungeonTasks := make([]Task, 0, len(routineTasks))

	for _, routineTask := range routineTasks {
		dungeonTasks = append(dungeonTasks, Task{
			ID:        r.nextTaskID,
			Title:     routineTask.Title,
			Damage:    routineTask.Damage,
			Completed: false,
			DungeonID: dungeon.ID,
		})

		r.nextTaskID++
	}

	r.dungeonTasks[dungeon.ID] = dungeonTasks
	r.nextDungeonID++

	return dungeon.ID, nil
}

func (r *MemoryRepository) CompleteTask(
	ctx context.Context,
	taskID int,
) (*Dungeon, error) {
	if taskID <= 0 {
		return nil, ErrInvalidTaskID
	}

	r.mu.Lock()
	defer r.mu.Unlock()

	dungeonID, task, ok := r.findDungeonTask(taskID)
	if !ok {
		return nil, fmt.Errorf(
			"complete task %d: %w",
			taskID,
			ErrTaskNotFound,
		)
	}

	if task.Completed {
		return nil, ErrTaskAlreadyCompleted
	}

	dungeon, ok := r.dungeons[dungeonID]
	if !ok {
		return nil, fmt.Errorf(
			"complete task: dungeon %d: %w",
			dungeonID,
			ErrDungeonNotFound,
		)
	}

	if dungeon.Status == "DEAD" {
		return nil, ErrDungeonAlreadyDead
	}

	task.Completed = true
	dungeon.HP -= task.Damage

	if dungeon.HP <= 0 {
		dungeon.HP = 0
		dungeon.Status = "DEAD"
	}

	return cloneDungeon(dungeon), nil
}
func (r *MemoryRepository) CreateDungeonTasks(
	ctx context.Context,
	routineID, dungeonID int,
) error {
	if routineID <= 0 {
		return ErrInvalidRoutineID
	}

	if dungeonID <= 0 {
		return ErrInvalidDungeonID
	}

	if r.routineRepo == nil {
		return ErrRoutineRepositoryRequired
	}

	routineTasks, err := r.routineRepo.GetTasksOfRoutine(
		ctx,
		routineID,
	)
	if err != nil {
		return fmt.Errorf("get routine tasks: %w", err)
	}

	if len(routineTasks) == 0 {
		return ErrNoTasksInRoutine
	}

	r.mu.Lock()
	defer r.mu.Unlock()

	if _, ok := r.dungeons[dungeonID]; !ok {
		return fmt.Errorf(
			"create dungeon tasks: dungeon %d: %w",
			dungeonID,
			ErrDungeonNotFound,
		)
	}

	if len(r.dungeonTasks[dungeonID]) > 0 {
		return fmt.Errorf(
			"create dungeon tasks: dungeon %d: %w",
			dungeonID,
			ErrDungeonTasksAlreadyExist,
		)
	}

	dungeonTasks := make([]Task, 0, len(routineTasks))

	for _, routineTask := range routineTasks {
		dungeonTasks = append(dungeonTasks, Task{
			ID:        r.nextTaskID,
			Title:     routineTask.Title,
			Damage:    routineTask.Damage,
			Completed: false,
			DungeonID: dungeonID,
		})

		r.nextTaskID++
	}

	r.dungeonTasks[dungeonID] = dungeonTasks

	return nil
}

func (r *MemoryRepository) GetDungeon(
	ctx context.Context,
	dungeonID int,
) (*Dungeon, error) {
	if dungeonID <= 0 {
		return nil, ErrInvalidDungeonID
	}

	r.mu.RLock()
	defer r.mu.RUnlock()

	dungeon, ok := r.dungeons[dungeonID]
	if !ok {
		return nil, fmt.Errorf(
			"get dungeon %d: %w",
			dungeonID,
			ErrDungeonNotFound,
		)
	}

	result := cloneDungeon(dungeon)

	tasks := r.dungeonTasks[dungeonID]

	result.Tasks = make([]Task, len(tasks))
	copy(result.Tasks, tasks)

	return result, nil
}

func (r *MemoryRepository) GetDungeonTask(
	ctx context.Context,
	taskID int,
) (Task, error) {
	if taskID <= 0 {
		return Task{}, ErrInvalidTaskID
	}

	r.mu.RLock()
	defer r.mu.RUnlock()

	_, task, ok := r.findDungeonTask(taskID)
	if !ok {
		return Task{}, fmt.Errorf(
			"get dungeon task %d: %w",
			taskID,
			ErrTaskNotFound,
		)
	}

	return *task, nil
}

// findDungeonTask must be called while r.mu is held.
func (r *MemoryRepository) findDungeonTask(
	taskID int,
) (int, *Task, bool) {
	for dungeonID, tasks := range r.dungeonTasks {
		for i := range tasks {
			if tasks[i].ID == taskID {
				return dungeonID, &tasks[i], true
			}
		}
	}

	return 0, nil, false
}

func cloneDungeon(dungeon *Dungeon) *Dungeon {
	clone := *dungeon

	if dungeon.DescriptionBoss != nil {
		description := *dungeon.DescriptionBoss
		clone.DescriptionBoss = &description
	}

	if dungeon.Tasks != nil {
		clone.Tasks = make([]Task, len(dungeon.Tasks))
		copy(clone.Tasks, dungeon.Tasks)
	}

	return &clone
}
