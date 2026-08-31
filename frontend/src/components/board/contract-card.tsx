"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import type { Routine } from "@/lib/api";

import { api, ApiError } from "@/lib/api";
import { sumTaskDamage } from "@/lib/routine-stats";

type ContractCardProps = {
  routine: Routine;
};

const REPEAT_LABEL: Record<Routine["repeat"], string> = {
  daily: "ежедневно",
  weekly: "еженедельно",
};

export function ContractCard({ routine }: ContractCardProps) {
  const router = useRouter();
  const total = sumTaskDamage(routine);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function takeContract() {
    if (pending)
      return;

    setPending(true);
    setError(null);

    try {
      const dungeon = await api.createDungeon(routine.id);
      router.push(`/dungeon?id=${dungeon.id}`);
    }
    catch (err) {
      const message
        = err instanceof ApiError ? err.message : "Не удалось взять контракт";
      setError(message);
      setPending(false);
    }
  }

  return (
    <article className="flex flex-col gap-3 rounded-lg border border-tavern-border bg-tavern-panel p-4 shadow-lg shadow-black/40 transition hover:border-tavern-gold/60 hover:shadow-tavern-gold/10">
      <div className="flex items-start justify-between gap-2">
        <h2 className="font-display text-xl leading-tight text-tavern-parchment">
          {routine.name}
        </h2>
        <span className="shrink-0 rounded border border-tavern-border px-2 py-0.5 text-xs uppercase tracking-wide text-tavern-muted">
          {REPEAT_LABEL[routine.repeat]}
        </span>
      </div>

      <dl className="grid grid-cols-3 gap-2 text-center text-sm">
        <div className="rounded bg-tavern-wood/80 px-2 py-2">
          <dt className="text-xs text-tavern-muted">Таски</dt>
          <dd className="font-medium text-tavern-parchment">
            {routine.tasks.length}
          </dd>
        </div>
        <div className="rounded bg-tavern-wood/80 px-2 py-2">
          <dt className="text-xs text-tavern-muted">HP</dt>
          <dd className="font-medium text-tavern-parchment">{total}</dd>
        </div>
        <div className="rounded bg-tavern-wood/80 px-2 py-2">
          <dt className="text-xs text-tavern-muted">XP</dt>
          <dd className="font-medium text-tavern-gold">
            +
            {total}
          </dd>
        </div>
      </dl>

      {error
        ? (
            <p className="text-center text-sm text-red-400" role="alert">
              {error}
            </p>
          )
        : null}

      <button
        type="button"
        onClick={takeContract}
        disabled={pending}
        className="mt-auto block w-full rounded-md border border-tavern-gold/40 bg-tavern-gold/15 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-tavern-gold transition hover:bg-tavern-gold/25 active:scale-[0.98] disabled:cursor-wait disabled:opacity-60"
      >
        {pending ? "Принимаем…" : "Взять контракт"}
      </button>
    </article>
  );
}
