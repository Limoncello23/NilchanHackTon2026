package dungeon

import (
	"context"
	"errors"
	"os"
	"testing"

	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/database"
	"github.com/stretchr/testify/require"
)

func TestPostgresRepositoryDungeonLifecycle(t *testing.T) {
	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		t.Skip("DATABASE_URL is not set")
	}

	ctx := context.Background()

	pool, err := database.NewPool(dsn)
	require.NoError(t, err)
	defer pool.Close()

	repo := NewPostgresRepository(pool)

	// Routine #7 comes from the existing seed data.
	const routineID = 7

	dungeon := &Dungeon{
		NameBoss:  "Integration Test Boss",
		MaxHP:     30,
		HP:        30,
		Status:    "ACTIVE",
		RoutineID: routineID,
	}

	dungeonID, err := repo.CreateDungeon(ctx, dungeon)
	require.NoError(t, err)

	t.Cleanup(func() {
		_, _ = pool.Exec(ctx, `DELETE FROM tasks WHERE dungeon_id = $1`, dungeonID)
		_, _ = pool.Exec(ctx, `DELETE FROM dungeons WHERE id = $1`, dungeonID)
	})

	err = repo.CreateDungeonTasks(ctx, routineID, dungeonID)
	require.NoError(t, err)

	got, err := repo.GetDungeon(ctx, dungeonID)
	require.NoError(t, err)

	require.Equal(t, dungeonID, got.ID)
	require.Equal(t, 30, got.HP)
	require.Equal(t, "ACTIVE", got.Status)
	require.Len(t, got.Tasks, 2)

	// Routine #7 contains Push ups (10) and Read Go (20).
	firstTaskID := got.Tasks[0].ID
	secondTaskID := got.Tasks[1].ID

	updated, err := repo.CompleteTask(ctx, firstTaskID)
	require.NoError(t, err)
	require.Equal(t, 20, updated.HP)
	require.Equal(t, "ACTIVE", updated.Status)

	updated, err = repo.CompleteTask(ctx, secondTaskID)
	require.NoError(t, err)
	require.Equal(t, 0, updated.HP)
	require.Equal(t, "DEAD", updated.Status)

	// Verify that the state was persisted in PostgreSQL.
	got, err = repo.GetDungeon(ctx, dungeonID)
	require.NoError(t, err)

	require.Equal(t, 0, got.HP)
	require.Equal(t, "DEAD", got.Status)
	require.Len(t, got.Tasks, 2)
	require.True(t, got.Tasks[0].Completed)
	require.True(t, got.Tasks[1].Completed)

	// A completed task cannot be completed twice.
	_, err = repo.CompleteTask(ctx, firstTaskID)
	require.Error(t, err)
	require.True(t, errors.Is(err, ErrTaskAlreadyCompleted))
}
