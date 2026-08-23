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

# Для запуска приложения  и бд напишите команду
docker compose up -d --build
# Запуск только бд
docker compose -f docker-compose.bd.yml up -d
# Для миграций 
Перейдите в папку beckend и выполните команду:

go run cmd/migrate/main.go -direction up -seed -dsn "postgres://postgres:postgres@127.0.0.1:5432/routine_dungeon?sslmode=disable"

# Аргументы для миграции:
-direction string
        up or down (default "up")
-dsn string
        Postgresql dsn (overrides env)
-force int
        force clean dirty database state to a specific version (default -1)
-seed
        apply seed data
-step int
        number of migrations to apply (0 = all)

