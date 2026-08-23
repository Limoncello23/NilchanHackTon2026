export type Repeat = "daily" | "weekly";

export type HealthResponse = {
  status: string;
};

export type RoutineTask = {
  id?: number;
  title: string;
  damage: number;
};

export type Routine = {
  id: number;
  name: string;
  repeat: Repeat;
  tasks: RoutineTask[];
};

export type CreateRoutineBody = {
  name: string;
  repeat: Repeat;
  tasks: Array<{
    title: string;
    damage: number;
  }>;
};

export type DungeonStatus = "active" | "completed";

export type DungeonTask = {
  id: number;
  title: string;
  damage: number;
  completed: boolean;
};

export type Dungeon = {
  id: number;
  name: string;
  hp: number;
  max_hp: number;
  status: DungeonStatus;
  tasks: DungeonTask[];
};

export type CompleteTaskResponse = {
  task_id: number;
  completed: boolean;
  damage: number;
  boss_hp: number;
  xp_earned: number;
  dungeon_status?: DungeonStatus;
};

export type ApiClient = {
  getHealth: () => Promise<HealthResponse>;
  getRoutines: () => Promise<Routine[]>;
  createRoutine: (body: CreateRoutineBody) => Promise<Routine>;
  getDungeon: () => Promise<Dungeon>;
  completeTask: (taskId: number) => Promise<CompleteTaskResponse>;
};

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}
