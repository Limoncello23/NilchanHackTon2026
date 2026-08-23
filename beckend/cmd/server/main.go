package main

import (
	"context"
	"fmt"
	"log"
	nethttp "net/http"
	"os"

	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/database"
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

	repo := routine.NewMemoryRepository()
	service := routine.NewService(repo)
	handler := routine.NewHandler(service)
	router := apphttp.NewRouter(handler)

	fmt.Println("Server started on :8080")

	if err := nethttp.ListenAndServe(":8080", router); err != nil {
		log.Fatal(err)
	}
}
