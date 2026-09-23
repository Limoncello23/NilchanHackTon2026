package http

import (
	"net/http"
	"net/http/httptest"
	"testing"
)

func TestRouterHealth(t *testing.T) {
	t.Parallel()

	router := NewRouter(nil, nil)

	req := httptest.NewRequest(
		http.MethodGet,
		"/health",
		nil,
	)

	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusOK {
		t.Fatalf(
			"status = %d, want %d",
			rec.Code,
			http.StatusOK,
		)
	}

	if got := rec.Body.String(); got != "{\"status\":\"ok\"}\n" {
		t.Fatalf(
			"body = %q, want %q",
			got,
			"{\"status\":\"ok\"}\n",
		)
	}

	if got := rec.Header().Get("Content-Type"); got != "application/json" {
		t.Fatalf(
			"Content-Type = %q, want application/json",
			got,
		)
	}
}

func TestRouterCORS(t *testing.T) {
	t.Parallel()

	router := NewRouter(nil, nil)

	req := httptest.NewRequest(
		http.MethodOptions,
		"/health",
		nil,
	)

	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusNoContent {
		t.Fatalf(
			"status = %d, want %d",
			rec.Code,
			http.StatusNoContent,
		)
	}

	tests := map[string]string{
		"Access-Control-Allow-Origin":  "*",
		"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
		"Access-Control-Allow-Headers": "Content-Type",
	}

	for header, want := range tests {
		if got := rec.Header().Get(header); got != want {
			t.Fatalf(
				"%s = %q, want %q",
				header,
				got,
				want,
			)
		}
	}
}

func TestRouterNotFound(t *testing.T) {
	t.Parallel()

	router := NewRouter(nil, nil)

	req := httptest.NewRequest(
		http.MethodGet,
		"/does-not-exist",
		nil,
	)

	rec := httptest.NewRecorder()

	router.ServeHTTP(rec, req)

	if rec.Code != http.StatusNotFound {
		t.Fatalf(
			"status = %d, want %d",
			rec.Code,
			http.StatusNotFound,
		)
	}
}
