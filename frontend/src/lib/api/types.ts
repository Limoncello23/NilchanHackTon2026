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

export type DungeonTask = {
  id: number;
  title: string;
  damage: number;
  completed: boolean;
  dungeon_id?: number;
};

export type Dungeon = {
  id: number;
  name_boss: string;
  description_boss?: string | null;
  hp: number;
  max_hp: number;
  /** `true` = active, `false` = defeated */
  status: boolean;
  routine_id?: number;
  created_at?: string;
  tasks: DungeonTask[];
};

export type ApiClient = {
  getHealth: () => Promise<HealthResponse>;
  getRoutines: () => Promise<Routine[]>;
  createRoutine: (body: CreateRoutineBody) => Promise<Routine>;
  createDungeon: (routineId: number) => Promise<Dungeon>;
  getDungeon: (id: number) => Promise<Dungeon>;
  completeTask: (taskId: number) => Promise<Dungeon>;
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
