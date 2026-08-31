"use client";

import type { FormEvent } from "react";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Repeat } from "@/lib/api";

import { api } from "@/lib/api";
import { mapRoutineApiError } from "@/lib/api/routine-errors";

type TaskDraft = {
  key: string;
  title: string;
  damage: string;
};

type FormErrors = {
  name?: string;
  tasks?: string;
  submit?: string;
};

function newTaskDraft(): TaskDraft {
  return {
    key: crypto.randomUUID(),
    title: "",
    damage: "20",
  };
}

function validateClient(
  name: string,
  repeat: Repeat,
  tasks: TaskDraft[],
): FormErrors {
  const errors: FormErrors = {};

  if (!name.trim())
    errors.name = "Укажи название босса";

  if (repeat !== "daily" && repeat !== "weekly")
    errors.submit = "Повтор: только ежедневно или еженедельно";

  if (tasks.length === 0) {
    errors.tasks = "Добавь хотя бы один таск";
    return errors;
  }

  for (const task of tasks) {
    if (!task.title.trim()) {
      errors.tasks = "У каждого таска должно быть название";
      return errors;
    }
    const damage = Number(task.damage);
    if (!Number.isFinite(damage) || damage <= 0) {
      errors.tasks = "Урон таска должен быть больше 0";
      return errors;
    }
  }

  return errors;
}

export function ContractForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [repeat, setRepeat] = useState<Repeat>("weekly");
  const [tasks, setTasks] = useState<TaskDraft[]>([newTaskDraft()]);
  const [errors, setErrors] = useState<FormErrors>({});
  const [pending, setPending] = useState(false);

  function updateTask(key: string, patch: Partial<Omit<TaskDraft, "key">>) {
    setTasks(prev =>
      prev.map(task => (task.key === key ? { ...task, ...patch } : task)),
    );
  }

  function addTask() {
    setTasks(prev => [...prev, newTaskDraft()]);
  }

  function removeTask(key: string) {
    setTasks((prev) => {
      if (prev.length <= 1)
        return prev;
      return prev.filter(task => task.key !== key);
    });
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    if (pending)
      return;

    const clientErrors = validateClient(name, repeat, tasks);
    if (clientErrors.name || clientErrors.tasks || clientErrors.submit) {
      setErrors(clientErrors);
      return;
    }

    setPending(true);
    setErrors({});

    try {
      await api.createRoutine({
        name: name.trim(),
        repeat,
        tasks: tasks.map(task => ({
          title: task.title.trim(),
          damage: Number(task.damage),
        })),
      });
      router.push("/");
      router.refresh();
    }
    catch (err) {
      setErrors({ submit: mapRoutineApiError(err) });
      setPending(false);
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className="flex w-full flex-col gap-6 rounded-lg border border-tavern-border bg-tavern-panel p-5 shadow-lg shadow-black/40 sm:p-6"
      noValidate
    >
      <div className="space-y-2">
        <label
          htmlFor="boss-name"
          className="block text-xs uppercase tracking-[0.15em] text-tavern-muted"
        >
          Название босса
        </label>
        <input
          id="boss-name"
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          disabled={pending}
          placeholder="Имя босса"
          className="w-full rounded-md border border-tavern-border bg-tavern-wood px-3 py-3 text-tavern-parchment placeholder:text-tavern-muted/60 focus:border-tavern-gold/50 focus:outline-none"
        />
        {errors.name
          ? (
              <p className="text-sm text-red-400" role="alert">
                {errors.name}
              </p>
            )
          : null}
      </div>

      <fieldset className="space-y-2" disabled={pending}>
        <legend className="text-xs uppercase tracking-[0.15em] text-tavern-muted">
          Повтор
        </legend>
        <div className="flex flex-wrap gap-3">
          {(
            [
              { value: "daily", label: "Ежедневно" },
              { value: "weekly", label: "Еженедельно" },
            ] as const
          ).map(option => (
            <label
              key={option.value}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-md border px-4 py-2 text-sm transition ${
                repeat === option.value
                  ? "border-tavern-gold/60 bg-tavern-gold/15 text-tavern-gold"
                  : "border-tavern-border text-tavern-parchment hover:border-tavern-gold/40"
              }`}
            >
              <input
                type="radio"
                name="repeat"
                value={option.value}
                checked={repeat === option.value}
                onChange={() => setRepeat(option.value)}
                className="sr-only"
              />
              {option.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div className="space-y-3">
        <div className="flex items-end justify-between gap-3">
          <p className="text-xs uppercase tracking-[0.15em] text-tavern-muted">
            Таски
          </p>
          <button
            type="button"
            onClick={addTask}
            disabled={pending}
            className="text-sm font-semibold uppercase tracking-wider text-tavern-gold transition hover:text-tavern-parchment disabled:opacity-60"
          >
            + Таск
          </button>
        </div>

        <ul className="flex flex-col gap-3">
          {tasks.map((task, index) => (
            <li
              key={task.key}
              className="flex flex-col gap-2 rounded-md border border-tavern-border bg-tavern-wood/60 p-3 sm:flex-row sm:items-end"
            >
              <div className="min-w-0 flex-1 space-y-1">
                <label
                  htmlFor={`task-title-${task.key}`}
                  className="block text-xs text-tavern-muted"
                >
                  Таск
                  {" "}
                  {index + 1}
                </label>
                <input
                  id={`task-title-${task.key}`}
                  type="text"
                  value={task.title}
                  onChange={e => updateTask(task.key, { title: e.target.value })}
                  disabled={pending}
                  placeholder="Сделал дело"
                  className="w-full rounded-md border border-tavern-border bg-tavern-wood px-3 py-2.5 text-sm text-tavern-parchment placeholder:text-tavern-muted/60 focus:border-tavern-gold/50 focus:outline-none"
                />
              </div>
              <div className="w-full space-y-1 sm:w-28">
                <label
                  htmlFor={`task-damage-${task.key}`}
                  className="block text-xs text-tavern-muted"
                >
                  Урон
                </label>
                <input
                  id={`task-damage-${task.key}`}
                  type="number"
                  min={1}
                  step={1}
                  value={task.damage}
                  onChange={e => updateTask(task.key, { damage: e.target.value })}
                  disabled={pending}
                  className="w-full rounded-md border border-tavern-border bg-tavern-wood px-3 py-2.5 text-sm text-tavern-parchment focus:border-tavern-gold/50 focus:outline-none"
                />
              </div>
              <button
                type="button"
                onClick={() => removeTask(task.key)}
                disabled={pending || tasks.length <= 1}
                className="min-h-11 rounded-md border border-tavern-border px-3 text-sm text-tavern-muted transition hover:border-red-400/50 hover:text-red-400 disabled:cursor-not-allowed disabled:opacity-40"
                aria-label={`Убрать таск ${index + 1}`}
              >
                Убрать
              </button>
            </li>
          ))}
        </ul>

        {errors.tasks
          ? (
              <p className="text-sm text-red-400" role="alert">
                {errors.tasks}
              </p>
            )
          : null}
      </div>

      {errors.submit
        ? (
            <p className="text-center text-sm text-red-400" role="alert">
              {errors.submit}
            </p>
          )
        : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:justify-end">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-md border border-tavern-border px-5 py-3 text-sm font-semibold uppercase tracking-wider text-tavern-parchment transition hover:border-tavern-gold/50 hover:text-tavern-gold"
        >
          Отмена
        </Link>
        <button
          type="submit"
          disabled={pending}
          className="inline-flex min-h-12 items-center justify-center rounded-md border border-tavern-gold/50 bg-tavern-gold/15 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-tavern-gold transition hover:bg-tavern-gold/25 disabled:cursor-wait disabled:opacity-60"
        >
          {pending ? "Создаём…" : "Создать контракт"}
        </button>
      </div>
    </form>
  );
}
