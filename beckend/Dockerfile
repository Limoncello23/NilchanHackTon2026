FROM golang:1.27-alpine AS builder

WORKDIR /app

COPY go.mod ./
RUN go mod tidy

COPY . .

RUN go build -o /server ./cmd/server

FROM golang:1.27-alpine

WORKDIR /app

COPY --from=builder /server ./server

EXPOSE 8080

CMD ["./server"]