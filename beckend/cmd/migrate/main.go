package main

import (
	"context"
	"flag"
	"log"
	"os"

	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/database"
	"github.com/Limoncello23/NilchanHackTon2026/backend/internal/seeds"
	"github.com/golang-migrate/migrate/v4"
	_ "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
)

func main() {
	var (
		direction = flag.String("direction", "up", "up or down")
		step      = flag.Int("step", 0, "number of migrations to apply (0 = all)")
		dsn       = flag.String("dsn", "", "Postgresql dsn (overrides env)")
		seed      = flag.Bool("seed", false, "apply seed data")
		force     = flag.Int("force", -1, "force clean dirty database state to a specific version")
	)
	flag.Parse()
	dsnStr := *dsn
	if dsnStr == "" {
		dsnStr = os.Getenv("DATABASE_URL")
	}
	if dsnStr == "" {
		log.Fatal("DATABASE_URL not set and --dsn not provided")
	}
	m, err := migrate.New("file://internal/migrations", dsnStr)
	if err != nil {
		log.Fatal("Failed to create migrate:", err)
	}
	if *force >= 0 {
		if err := m.Force(*force); err != nil {
			log.Fatal("Failed to force version:", err)
		}
		log.Printf("Forced database to version %d. Please rerun without -force.", *force)
		return
	}
	switch *direction {
	case "up":
		if *step > 0 {
			err = m.Steps(*step)
		} else {
			err = m.Up()
		}
	case "down":
		if *step > 0 {
			err = m.Steps(-*step)
		} else {
			err = m.Down()
		}
	default:
		log.Fatal("direction must be 'up' or 'down'")
	}

	if err != nil && err != migrate.ErrNoChange {
		log.Fatal("Migrate failed:", err)
	}
	log.Println("Migration", *direction, "complete")

	if *seed {
		pool, err := database.NewPool(dsnStr)
		if err != nil {
			log.Fatal("Failed to connect for seeding", err)
		}
		defer pool.Close()
		if err := seeds.Seed(context.Background(), pool); err != nil {
			log.Fatal("Seeding failed:", err)
		}
	}
}
