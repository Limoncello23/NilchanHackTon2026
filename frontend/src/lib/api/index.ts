import type { ApiClient } from "./types";

import { liveClient } from "./client";

export type {
  ApiClient,
  CompleteTaskResponse,
  CreateDungeonBody,
  CreateDungeonResponse,
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

export const api: ApiClient = liveClient;
