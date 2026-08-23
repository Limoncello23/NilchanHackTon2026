import { env } from "@/lib/env";

import type { ApiClient } from "./types";

import { liveClient } from "./client";
import { mockClient } from "./mock";

export type {
  ApiClient,
  CompleteTaskResponse,
  CreateRoutineBody,
  Dungeon,
  DungeonStatus,
  DungeonTask,
  HealthResponse,
  Repeat,
  Routine,
  RoutineTask,
} from "./types";
export { ApiError } from "./types";

export const api: ApiClient = env.useMock ? mockClient : liveClient;
