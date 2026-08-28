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
	CreateDungeon(dungeon *Dungeon) (int, error)
	GetDungeon(dungeonID int) (*Dungeon, error)
	CompleteTask(taskID int) (*Dungeon, error)
	CreateDungeonTasks(routineID, dungeonID int) error
	GetDungeonTask(taskID int) (Task, error)
	KillDungeon(dungeonID int) (*Dungeon, error)
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

func (r *MemoryRepository) CreateDungeon(dungeon *Dungeon) (int, error) {
	if dungeon == nil {
		return 0, ErrInvalidDungeon
	}

	r.mu.Lock()
	defer r.mu.Unlock()

	dungeon.ID = r.nextDungeonID
	if dungeon.CreatedAt.IsZero() {
		dungeon.CreatedAt = time.Now()
	}

	r.dungeons[dungeon.ID] = cloneDungeon(dungeon) // Защита от изменения внешнего объекта после сохранения в репозитории
	r.nextDungeonID++

	return dungeon.ID, nil
}

func (r *MemoryRepository) CompleteTask(taskID int) (*Dungeon, error) {
	if taskID <= 0 {
		return nil, ErrInvalidTaskID
	}

	r.mu.Lock()
	defer r.mu.Unlock()

	dungeonID, task, ok := r.findDungeonTask(taskID)
	if !ok {
		return nil, fmt.Errorf("complete task %d: %w", taskID, ErrTaskNotFound)
	}
	if task.Completed {
		return nil, ErrTaskAlreadyCompleted
	}

	dungeon, ok := r.dungeons[dungeonID]
	if !ok {
		return nil, fmt.Errorf("complete task: dungeon %d: %w", dungeonID, ErrDungeonNotFound)
	}

	task.Completed = true
	dungeon.HP -= task.Damage

	return cloneDungeon(dungeon), nil
}

func (r *MemoryRepository) CreateDungeonTasks(routineID, dungeonID int) error {
	if routineID <= 0 {
		return ErrInvalidRoutineID
	}
	if dungeonID <= 0 {
		return ErrInvalidDungeonID
	}
	if r.routineRepo == nil {
		return ErrRoutineRepositoryRequired
	}

	routineTasks, err := r.routineRepo.GetTasksOfRoutine(context.Background(), routineID)
	if err != nil {
		return fmt.Errorf("get routine tasks: %w", err)
	}
	if len(routineTasks) == 0 {
		return ErrNoTasksInRoutine
	}

	r.mu.Lock()
	defer r.mu.Unlock()

	if _, ok := r.dungeons[dungeonID]; !ok {
		return fmt.Errorf("create dungeon tasks: dungeon %d: %w", dungeonID, ErrDungeonNotFound)
	}

	// Tут берем из routineTasks[routineID] и создаем новые задачи для dungeonID

	if len(r.dungeonTasks[dungeonID]) > 0 {
		return fmt.Errorf("create dungeon tasks: dungeon %d: %w", dungeonID, ErrDungeonTasksAlreadyExist)
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

func (r *MemoryRepository) KillDungeon(dungeonID int) (*Dungeon, error) {
	if dungeonID <= 0 {
		return nil, ErrInvalidDungeonID
	}

	r.mu.Lock()
	defer r.mu.Unlock()

	dungeon, ok := r.dungeons[dungeonID]
	if !ok {
		return nil, fmt.Errorf("kill dungeon %d: %w", dungeonID, ErrDungeonNotFound)
	}

	dungeon.Status = false

	return cloneDungeon(dungeon), nil
}

func (r *MemoryRepository) GetDungeon(dungeonID int) (*Dungeon, error) {
	if dungeonID <= 0 {
		return nil, ErrInvalidDungeonID
	}

	r.mu.RLock()
	defer r.mu.RUnlock()

	dungeon, ok := r.dungeons[dungeonID]
	if !ok {
		return nil, fmt.Errorf("get dungeon %d: %w", dungeonID, ErrDungeonNotFound)
	}

	result := cloneDungeon(dungeon)

	tasks := r.dungeonTasks[dungeonID]
	result.Tasks = make([]Task, len(tasks))
	copy(result.Tasks, tasks)

	return result, nil
}

func (r *MemoryRepository) GetDungeonTask(taskID int) (Task, error) {
	if taskID <= 0 {
		return Task{}, ErrInvalidTaskID
	}

	r.mu.RLock()
	defer r.mu.RUnlock()

	_, task, ok := r.findDungeonTask(taskID)
	if !ok {
		return Task{}, fmt.Errorf("get dungeon task %d: %w", taskID, ErrTaskNotFound)
	}

	return *task, nil
}

// findDungeonTask must be called while r.mu is held for reading or writing.
func (r *MemoryRepository) findDungeonTask(taskID int) (int, *Task, bool) {
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

	return &clone
}
