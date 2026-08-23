import type { Routine } from "@/lib/api";

/** Display-only totals from tasks. Not game logic — backend owns HP/XP. */
export function sumTaskDamage(routine: Routine): number {
  return routine.tasks.reduce((sum, task) => sum + task.damage, 0);
}
