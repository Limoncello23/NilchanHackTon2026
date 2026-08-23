package routine

import (
	"encoding/json"
	"net/http"
)

type CreateRoutineRequest struct {
	Name   string `json:"name"`
	Repeat string `json:"repeat"`
	Tasks  []Task `json:"tasks"`
}

type Handler struct {
	service Service
}

func NewHandler(service Service) *Handler {
	return &Handler{
		service: service,
	}
}

func (h *Handler) CreateRoutine(w http.ResponseWriter, r *http.Request) {
	var req CreateRoutineRequest

	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}

	routine, err := h.service.CreateRoutine(
		r.Context(),
		req.Name,
		req.Repeat,
		req.Tasks,
	)
	if err != nil {
		checkErrAndReturnStatus400or500(err, w)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusCreated)

	if err := json.NewEncoder(w).Encode(routine); err != nil {
		return
	}
}

func (h *Handler) GetRoutines(w http.ResponseWriter, r *http.Request) {
	routines, err := h.service.GetRoutines(r.Context())
	if err != nil {
		http.Error(w, "internal server error", http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(routines); err != nil {
		return
	}
}

func (h *Handler) GetByID(w http.ResponseWriter, r *http.Request) {
	var id int
	if err := json.NewDecoder(r.Body).Decode(&id); err != nil {
		http.Error(w, "bad request", http.StatusBadRequest)
		return
	}

	routine, err := h.service.GetByID(r.Context(), id)
	if err != nil {
		checkErrAndReturnStatus400or500(err, w)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err := json.NewEncoder(w).Encode(routine); err != nil {
		return
	}
}
