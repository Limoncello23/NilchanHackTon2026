package dungeon

import (
	"time"
)

type Dungeon struct {
	ID              int       `json:"id"`
	NameBoss        string    `json:"name_boss"`
	DescriptionBoss *string   `json:"description_boss,omitempty"`
	MaxHP           int       `json:"max_hp"`
	HP              int       `json:"hp"`
	CreatedAt       time.Time `json:"created_at"`
	Status          bool      `json:"status"`
	RoutineID       int       `json:"routine_id"`
}

type Task struct {
	ID 		int    `json:"id"`
	Title 	string `json:"title"`
	Damage 	int    `json:"damage"`
	Completed bool  `json:"completed"`
	DungeonID int    `json:"dungeon_id"`
}
