//go:build integration

package database

import (
	"context"
	"os"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestConnectionAndSeed(t *testing.T) {
	dsn := os.Getenv("DATABASE_URL")
	pool, err := NewPool(dsn)
	require.NoError(t, err)
	defer pool.Close()

	var count int
	err = pool.QueryRow(context.Background(), "SELECT COUNT(*) FROM routines").Scan(&count)
	require.NoError(t, err)
	require.Greater(t, count, 0, "routines table is empty")

	var taskCount int
	err = pool.QueryRow(context.Background(), "SELECT COUNT(*) FROM routine_tasks").Scan(&taskCount)
	require.NoError(t, err)
	require.Greater(t, taskCount, 0, "routines table is empty")

	t.Logf("Database connected, found %d routines and %d tasks", count, taskCount)
}
