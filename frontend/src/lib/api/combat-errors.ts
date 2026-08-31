import { ApiError } from "./types";

export function mapCombatApiError(err: unknown): string {
  if (!(err instanceof ApiError))
    return "Не удалось выполнить задачу";

  if (err.status === 409)
    return "Уже выполнено";

  return err.message.trim() || "Не удалось выполнить задачу";
}
