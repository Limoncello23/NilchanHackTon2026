import type { ApiClient } from "./types";

import { liveClient } from "./client";

export type {
  ApiClient,
  CreateRoutineBody,
  Dungeon,
  DungeonTask,
  HealthResponse,
  Repeat,
  Routine,
  RoutineTask,
} from "./types";
export { ApiError } from "./types";

export const api: ApiClient = liveClient;
