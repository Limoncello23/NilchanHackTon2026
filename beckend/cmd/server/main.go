package main

import (
	"fmt"
	"log"
	nethttp "net/http"

	apphttp "github.com/Limoncello23/NilchanHackTon2026/backend/internal/http"
	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/routine"
)

func main() {
	repo := routine.NewMemoryRepository()
	service := routine.NewService(repo)
	handler := routine.NewHandler(service)
	router := apphttp.NewRouter(handler)

	fmt.Println("Server started on :8080")

	if err := nethttp.ListenAndServe(":8080", router); err != nil {
		log.Fatal(err)
	}
}
