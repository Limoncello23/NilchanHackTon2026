import type { DungeonTask } from "@/lib/api";

type TaskRowProps = {
  task: DungeonTask;
  pending?: boolean;
  disabled?: boolean;
  onComplete?: (taskId: number) => void;
};

export function TaskRow({
  task,
  pending = false,
  disabled = false,
  onComplete,
}: TaskRowProps) {
  const done = task.completed;
  const locked = done || pending || disabled;

  return (
    <li className="flex flex-col gap-3 rounded-lg border border-tavern-border bg-tavern-panel p-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0 space-y-1">
        <p className="font-medium text-tavern-parchment">
          {done ? "☑ " : ""}
          {task.title}
        </p>
        <p className="text-sm text-tavern-muted">
          Урон
          {" "}
          <span className="text-tavern-gold">
            −
            {task.damage}
          </span>
        </p>
      </div>

      <button
        type="button"
        disabled={locked}
        onClick={() => {
          if (locked || !onComplete)
            return;
          onComplete(task.id);
        }}
        className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md border border-tavern-gold/40 bg-tavern-gold/15 px-4 py-3 text-sm font-semibold uppercase tracking-wider text-tavern-gold transition hover:bg-tavern-gold/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:border-tavern-border disabled:bg-transparent disabled:text-tavern-muted disabled:opacity-70"
      >
        {done ? "Выполнено" : pending ? "Удар…" : "Выполнить"}
      </button>
    </li>
  );
}
