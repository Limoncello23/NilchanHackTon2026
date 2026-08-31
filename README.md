# 🎮 Routine Dungeon

Gamification of routine through RPG mechanics.

## Concept

🏰 Guild Board
↓
📜 Contract
↓
🐉 Dungeon
↓
⚔️ Tasks
↓
💥 Damage
↓
❤️ Boss HP
↓
💀 Boss Defeated
↓
⭐ XP

## Запуск всего стека (БД + API + фронт + миграции/seed)

```bash
docker compose up -d --build
```

После старта:

- Frontend: http://localhost:3000
- API: http://localhost:8080
- Postgres: `localhost:5432`

Миграции и seed применяются автоматически при инициализации контейнера.

## Только БД (локальная разработка бэкенда)

```bash
docker compose -f docker-compose.db.yml up -d
```

Миграции вручную из папки `beckend`:

```bash
go run cmd/migrate/main.go -direction up -seed -dsn "postgres://postgres:postgres@127.0.0.1:5432/routine_dungeon?sslmode=disable"
```

### Аргументы migrate

- `-direction` — `up` или `down` (default `up`)
- `-dsn` — Postgresql DSN (overrides env)
- `-force` — force clean dirty database state to a specific version (default `-1`)
- `-seed` — apply seed data
- `-step` — number of migrations to apply (`0` = all)
