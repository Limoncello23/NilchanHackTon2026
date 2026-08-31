package main

import (
	"context"
	"fmt"
	"log"
	nethttp "net/http"
	"os"

	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/database"
	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/dungeon"
	apphttp "github.com/Limoncello23/NilchanHackTon2026/backend/internal/http"
	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/routine"
)

func main() {
	ctx := context.Background()

	dsn := os.Getenv("DATABASE_URL")
	if dsn == "" {
		log.Fatal("DATABASE_URL is required")
	}

	pool, err := database.NewPool(dsn)
	if err != nil {
		log.Fatal("DB connection failed:", err)
	}
	defer pool.Close()

	if err := database.CheckDB(ctx, pool); err != nil {
		log.Fatal("DB check failed:", err)
	}

	log.Println("Database is ready")

	routineRepo := routine.NewPostgresRepository(pool)
	routineService := routine.NewService(routineRepo)
	routineHandler := routine.NewHandler(routineService)

	dungeonRepo := dungeon.NewMemoryRepository(routineRepo)
	dungeonService := dungeon.NewService(dungeonRepo, routineService)
	dungeonHandler := dungeon.NewDungeonHandler(dungeonService)

	router := apphttp.NewRouter(routineHandler, dungeonHandler)

	fmt.Println("Server started on :8080")

	if err := nethttp.ListenAndServe(":8080", router); err != nil {
		log.Fatal(err)
	}
}
