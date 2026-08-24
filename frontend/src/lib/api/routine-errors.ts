import { ApiError } from "./types";

const SERVER_ERROR_MAP: Array<{ match: string; message: string }> = [
  { match: "invalid routine name", message: "Укажи название босса" },
  { match: "invalid repeat", message: "Повтор: только ежедневно или еженедельно" },
  { match: "no tasks", message: "Добавь хотя бы один таск" },
  { match: "invalid task title", message: "У каждого таска должно быть название" },
  { match: "invalid task damage", message: "Урон таска должен быть больше 0" },
];

export function mapRoutineApiError(err: unknown): string {
  if (!(err instanceof ApiError))
    return "Не удалось создать контракт";

  const lower = err.message.toLowerCase();
  for (const entry of SERVER_ERROR_MAP) {
    if (lower.includes(entry.match))
      return entry.message;
  }

  return err.message.trim() || "Не удалось создать контракт";
}
