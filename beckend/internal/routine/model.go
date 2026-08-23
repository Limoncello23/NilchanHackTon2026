package routine

import "time"

type Routine struct {
	ID        int       `json:"id"`
	Name      string    `json:"name"`
	Repeat    string    `json:"repeat"`
	CreatedAt time.Time `json:"created_at"`
	Tasks     []Task    `json:"tasks"`
}

type Task struct {
	ID     int    `json:"id"`
	Title  string `json:"title"`
	Damage int    `json:"damage"`
}
