package models

import "time"

type Routine struct {
	ID          int           `db:"id" json:"id"`
	Name        string        `db:"name" json:"name"`
	Periodicity string        `db:"periodicity" json:"periodicity"`
	CreatedAt   time.Time     `db:"created_at" json:"created_at"`
	Tasks       []RoutineTask `db:"-" json:"tasks,omitempty"`
}
type RoutineTask struct {
	ID        int    `db:"id" json:"id"`
	RoutineID int    `db:"routine_id" json:"routine_id"`
	Title     string `db:"title" json:"title"`
	Damage    int    `db:"damage" json:"damage"`
}
type Dungeon struct {
	ID              int       `db:"id" json:"id"`
	NameBoss        string    `db:"name_boss" json:"name_boss"`
	DescriptionBoss string    `db:"description_boss" json:"description_boss"`
	MaxHP           int       `db:"max_hp" json:"max_hp"`
	HP              int       `db:"hp" json:"hp"`
	CreatedAt       time.Time `db:"created_at" json:"created_at"`
	Status          string    `db:"status" json:"status"`
	RoutineID       int       `db:"routine_id" json:"routine_id"`
	Tasks           []Task    `db:"-" json:"tasks,omitempty"`
}
type Task struct {
	ID        int    `db:"id" json:"id"`
	Title     string `db:"title" json:"title"`
	Damage    int    `db:"damage" json:"damage"`
	Completed bool   `db:"completed" json:"completed"`
	DungeonID int    `db:"dungeon_id" json:"dungeon_id"`
}
