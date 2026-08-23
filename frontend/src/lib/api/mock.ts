import type {
  ApiClient,
  CompleteTaskResponse,
  CreateRoutineBody,
  Dungeon,
  HealthResponse,
  Routine,
} from "./types";

import { ApiError } from "./types";

const SEED_ROUTINES: Routine[] = [
  {
    id: 1,
    name: "БЬЁМ NILCHAN",
    repeat: "weekly",
    tasks: [
      { id: 1, title: "Спросил когда выплаты за REP", damage: 20 },
      { id: 2, title: "Спросил когда будет качественный IT контент", damage: 20 },
      { id: 3, title: "Написал аккаунт-менеджеру", damage: 20 },
    ],
  },
  {
    id: 2,
    name: "Pantela",
    repeat: "weekly",
    tasks: [
      { id: 4, title: "Закрыл все тикеты в бэклоге", damage: 25 },
      { id: 5, title: "Проверил метрики за неделю", damage: 15 },
      { id: 6, title: "Синк с командой без слака", damage: 20 },
    ],
  },
  {
    id: 3,
    name: "Хейтер",
    repeat: "daily",
    tasks: [
      { id: 7, title: "Не ответил на токсичный коммент", damage: 15 },
      { id: 8, title: "Сделал ревью без сарказма", damage: 20 },
    ],
  },
];

function notImplemented(method: string): never {
  throw new ApiError(`${method} is not implemented in mock (slice 1)`, 501);
}

export const mockClient: ApiClient = {
  async getHealth(): Promise<HealthResponse> {
    return { status: "ok" };
  },

  async getRoutines(): Promise<Routine[]> {
    return structuredClone(SEED_ROUTINES);
  },

  async createRoutine(_body: CreateRoutineBody): Promise<Routine> {
    return notImplemented("createRoutine");
  },

  async getDungeon(): Promise<Dungeon> {
    return notImplemented("getDungeon");
  },

  async completeTask(_taskId: number): Promise<CompleteTaskResponse> {
    return notImplemented("completeTask");
  },
};
