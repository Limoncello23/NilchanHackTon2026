# Routine Dungeon API

Base URL:

http://localhost:8080

---

# 1. Health

## GET /health

Проверка, что Backend работает.

### Response

Status: 200 OK

```json
{
  "status": "ok"
}
```
---

# 2. Routines

Routine — это контракт на бой с Boss.

Пример:

🐉 БЬЁМ NILCHAN

Tasks:

1. Спросил когда выплаты за REP — Damage: 20
2. Спросил когда будет качественный IT контент — Damage: 20
3. Написал аккаунт-менеджеру — Damage: 20

---

## GET /routines

Получить список доступных контрактов.

### Response

Status: 200 OK

```json
[
  {
    "id": 1,
    "name": "БЬЁМ NILCHAN",
    "repeat": "weekly",
    "tasks": [
      {
        "id": 1,
        "title": "Спросил когда выплаты за REP",
        "damage": 20
      },
      {
        "id": 2,
        "title": "Спросил когда будет качественный IT контент",
        "damage": 20
      },
      {
        "id": 3,
        "title": "Написал аккаунт-менеджеру",
        "damage": 20
      }
    ]
  }
]
```
---
## POST /routines

Создать новый контракт.

### Request

```http
POST /routines
Content-Type: application/json
```

### Body

```json
{
  "name": "БЬЁМ NILCHAN",
  "repeat": "weekly",
  "tasks": [
    {
      "title": "Спросил когда выплаты за REP",
      "damage": 20
    },
    {
      "title": "Спросил когда будет качественный IT контент",
      "damage": 20
    },
    {
      "title": "Написал аккаунт-менеджеру",
      "damage": 20
    }
  ]
}
```
### Validation

#### name

- обязательное поле
- не должно быть пустым

#### repeat

Допустимые значения:

```text
daily
weekly
```

#### tasks

- обязательное поле
- минимум 1 задача

#### Task.title

- обязательное поле
- не должно быть пустым

#### Task.damage

- должен быть больше 0

### Response

Status: 201 Created

```json
{
  "id": 1,
  "name": "БЬЁМ NILCHAN",
  "repeat": "weekly",
  "tasks": [
    {
      "id": 1,
      "title": "Спросил когда выплаты за REP",
      "damage": 20
    },
    {
      "id": 2,
      "title": "Спросил когда будет качественный IT контент",
      "damage": 20
    },
    {
      "id": 3,
      "title": "Написал аккаунт-менеджеру",
      "damage": 20
    }
  ]
}
```
---

# 3. Dungeon

Dungeon — это активный контракт, который игрок взял с доски.

Dungeon создаётся на основе Routine.

Пример:

🐉 БЬЁМ NILCHAN

HP: 60 / 60

Tasks:

1. Спросил когда выплаты за REP
   Damage: 20
   Completed: false

2. Спросил когда будет качественный IT контент
   Damage: 20
   Completed: false

3. Написал аккаунт-менеджеру
   Damage: 20
   Completed: false

Max HP Boss:

20 + 20 + 20 = 60
---

## GET /dungeon

Получить текущий активный Dungeon.

### Request

```http
GET /dungeon
```

### Response

Status: 200 OK

```json
{
  "id": 1,
  "name": "БЬЁМ NILCHAN",
  "hp": 60,
  "max_hp": 60,
  "status": "active",
  "tasks": [
    {
      "id": 1,
      "title": "Спросил когда выплаты за REP",
      "damage": 20,
      "completed": false
    },
    {
      "id": 2,
      "title": "Спросил когда будет качественный IT контент",
      "damage": 20,
      "completed": false
    },
    {
      "id": 3,
      "title": "Написал аккаунт-менеджеру",
      "damage": 20,
      "completed": false
    }
  ]
}
```
---

## POST /tasks/{id}/complete

Выполнить Task и нанести Boss урон.

### Request

```http
POST /tasks/1/complete
```

`1` — ID задачи.

### Логика

```text
Task
 ↓
completed = true
 ↓
Boss HP -= damage
 ↓
XP += damage
```

Пример:

```text
До:

Boss HP: 60 / 60

Task Damage: 20

После:

Boss HP: 40 / 60
XP: +20
```

### Response

Status: 200 OK

```json
{
  "task_id": 1,
  "completed": true,
  "damage": 20,
  "boss_hp": 40,
  "xp_earned": 20
}
```
---

# 4. Boss Defeated

Когда Boss HP становится равным `0`:

```text
Boss HP: 0
```

Dungeon получает статус:

```text
completed
```

### Response

```json
{
  "task_id": 3,
  "completed": true,
  "damage": 20,
  "boss_hp": 0,
  "xp_earned": 20,
  "dungeon_status": "completed"
}
```

Frontend показывает:

```text
💀 BOSS DEFEATED!

🐉 БЬЁМ NILCHAN

⭐ +60 XP

[ ВЕРНУТЬСЯ К ДОСКЕ ]
```

После победы игрок возвращается на Guild Board и может взять новый контракт.

---

# 5. MVP Flow

```text
🏰 GUILD BOARD
       ↓
📜 GET /routines
       ↓
🐉 БЬЁМ NILCHAN
       ↓
[ ВЗЯТЬ КОНТРАКТ ]
       ↓
GET /dungeon
       ↓
❤️ 60 / 60
       ↓
POST /tasks/1/complete
       ↓
❤️ 40 / 60
       ↓
POST /tasks/2/complete
       ↓
❤️ 20 / 60
       ↓
POST /tasks/3/complete
       ↓
❤️ 0 / 60
       ↓
💀 BOSS DEFEATED
       ↓
⭐ +60 XP
       ↓
🏰 GUILD BOARD
```