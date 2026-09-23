<p align="center">
  <img src="assets/Mygoodteam.png" alt="Routine Dungeon">
</p>

# 🏰 Routine Dungeon

> Turn your tasks into damage.

## 🎮 Concept

Your routine is the dungeon.  
Your tasks are your attacks.

Complete tasks → deal damage → defeat the boss.

## 🚀 Запуск

```bash
docker compose up -d --build
```

После запуска:

- **Frontend:** http://localhost:3000
- **API:** http://localhost:8080
- **PostgreSQL:** `localhost:5432`

Миграции и seed применяются автоматически.

### Только БД

Для локальной разработки backend:

```bash
docker compose -f docker-compose.db.yml up -d
```

Миграции вручную из папки `beckend`:

```bash
cd beckend
go run cmd/migrate/main.go -direction up -seed -dsn "postgres://postgres:postgres@127.0.0.1:5432/routine_dungeon?sslmode=disable"
```

### Аргументы migrate

- `-direction` — `up` или `down`
- `-dsn` — PostgreSQL DSN
- `-force` — принудительно установить версию миграций
- `-seed` — применить seed-данные
- `-step` — количество миграций (`0` = все)
