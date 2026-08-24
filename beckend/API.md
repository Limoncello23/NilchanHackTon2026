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
---

# 2. Routines

Routine — это готовый контракт с набором задач.

Пользователь выбирает Routine на Guild Board.

После выбора из Routine создаётся Dungeon.

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
---
## POST /routines

Создать новый контракт.

### Request

```http
POST /routines
Content-Type: application/json
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
### Validation
#### name

- обязательное поле
- не должно быть пустым

#### repeat

Допустимые значения:

- `daily`
- `weekly`

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
---
# 3. Dungeon

Dungeon — это конкретный экземпляр выбранной пользователем Routine.

Пользователь сначала получает список Routine через `GET /routines`.

Затем выбирает Routine и передаёт её `routine_id` при создании Dungeon.

Dungeon создаётся на основе выбранной Routine.

Tasks Dungeon создаются из Tasks выбранной Routine и имеют собственное состояние `completed`.

---

### Request

POST /dungeons

Content-Type: application/json

{
  "routine_id": 1
}

### Response

201 Created

{
  "id": 1,
  "name": "БЬЁМ NILCHAN",
  "hp": 60
}
---

## GET /dungeons/{id}

Получить Dungeon по ID.

### Request

GET /dungeons/1

### Response

200 OK

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
---

## PATCH /tasks/{id}/complete

Выполнить Task.

### Request

PATCH /tasks/1/complete

### Response

200 OK

{
  "task_id": 1,
  "completed": true,
  "damage": 20,
  "boss_hp": 40,
  "status": "active"
}
---

## Dungeon Victory

Если после выполнения Task HP босса становится равным 0:

status = "completed"

Пример:

200 OK

{
  "task_id": 3,
  "completed": true,
  "damage": 20,
  "boss_hp": 0,
  "status": "completed"
}