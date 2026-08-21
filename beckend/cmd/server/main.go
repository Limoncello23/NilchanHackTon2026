package main

import (
	"fmt"
	"log"
	nethttp "net/http"

	apphttp "github.com/Limoncello23/NilchanHackTon2026/backend/internal/http"
)

func main() {
	router := apphttp.NewRouter()

	fmt.Println("Server started on :8080")

	if err := nethttp.ListenAndServe(":8080", router); err != nil {
		log.Fatal(err)
	}
}
