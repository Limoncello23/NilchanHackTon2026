import { env } from "@/lib/env";

import type {
  ApiClient,
  CompleteTaskResponse,
  CreateDungeonBody,
  CreateDungeonResponse,
  CreateRoutineBody,
  Dungeon,
  HealthResponse,
  Routine,
} from "./types";

import { ApiError } from "./types";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const res = await fetch(`${env.apiUrl}${path}`, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...init?.headers,
    },
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new ApiError(text || res.statusText || "Request failed", res.status);
  }

  if (res.status === 204)
    return undefined as T;

  return res.json() as Promise<T>;
}

export const liveClient: ApiClient = {
  getHealth: () => request<HealthResponse>("/health"),

  getRoutines: () => request<Routine[]>("/routines"),

  createRoutine: (body: CreateRoutineBody) =>
    request<Routine>("/routines", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  createDungeon: (body: CreateDungeonBody) =>
    request<CreateDungeonResponse>("/dungeons", {
      method: "POST",
      body: JSON.stringify(body),
    }),

  getDungeon: (id: number) => request<Dungeon>(`/dungeons/${id}`),

  completeTask: (taskId: number) =>
    request<CompleteTaskResponse>(`/tasks/${taskId}/complete`, {
      method: "PATCH",
    }),
};
