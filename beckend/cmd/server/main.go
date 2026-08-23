package main

import (
	"fmt"
	"log"
	nethttp "net/http"

	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/dungeon"
	apphttp "github.com/Limoncello23/NilchanHackTon2026/backend/internal/http"
	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/routine"
)

func main() {
	routineRepo := routine.NewMemoryRepository()
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
