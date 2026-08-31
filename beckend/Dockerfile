FROM golang:1.27-alpine AS builder

WORKDIR /app

COPY go.mod go.sum ./
RUN go mod tidy

COPY . .

RUN go build -o /server ./cmd/server
RUN go build -o /migrate ./cmd/migrate

FROM golang:1.27-alpine AS server

RUN apk add --no-cache wget

WORKDIR /app

COPY --from=builder /server ./server

EXPOSE 8080

CMD ["./server"]

FROM golang:1.27-alpine AS migrate

WORKDIR /app

COPY --from=builder /migrate ./migrate
COPY --from=builder /app/internal/migrations ./internal/migrations

CMD ["./migrate", "-direction", "up", "-seed"]
