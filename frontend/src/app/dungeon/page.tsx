"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useState } from "react";

import type { Dungeon } from "@/lib/api";

import { HpBar } from "@/components/dungeon/hp-bar";
import { TaskRow } from "@/components/dungeon/task-row";
import { usePreloader } from "@/components/layout/preloader-context";
import { VictoryScreen } from "@/components/victory/victory-screen";
import { api, ApiError } from "@/lib/api";
import { mapCombatApiError } from "@/lib/api/combat-errors";

type HitFeedback = {
  damage: number;
  key: number;
};

function isVictory(dungeon: Dungeon): boolean {
  return !dungeon.status || dungeon.hp <= 0;
}

function DungeonView() {
  const searchParams = useSearchParams();
  const rawId = searchParams.get("id");
  const dungeonId = rawId ? Number(rawId) : NaN;
  const { markReady } = usePreloader();

  const [dungeon, setDungeon] = useState<Dungeon | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);
  const [loading, setLoading] = useState(Number.isFinite(dungeonId));
  const [completingId, setCompletingId] = useState<number | null>(null);
  const [shake, setShake] = useState(false);
  const [hitFeedback, setHitFeedback] = useState<HitFeedback | null>(null);

  useEffect(() => {
    if (!Number.isFinite(dungeonId)) {
      setDungeon(null);
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;

    setLoading(true);
    setError(null);
    setActionError(null);

    api
      .getDungeon(dungeonId)
      .then((data) => {
        if (!cancelled) {
          setDungeon(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        if (cancelled)
          return;
        const message
          = err instanceof ApiError
            ? err.message
            : "Не удалось загрузить подземелье";
        setError(message);
        setDungeon(null);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [dungeonId]);

  useEffect(() => {
    if (!loading) {
      markReady();
    }
  }, [loading, markReady]);

  useEffect(() => {
    if (!shake)
      return;
    const timer = window.setTimeout(setShake, 400, false);
    return () => window.clearTimeout(timer);
  }, [shake]);

  useEffect(() => {
    if (!hitFeedback)
      return;
    const timer = window.setTimeout(setHitFeedback, 1800, null);
    return () => window.clearTimeout(timer);
  }, [hitFeedback]);

  const handleComplete = useCallback(
    async (taskId: number) => {
      if (!dungeon || completingId !== null)
        return;

      const task = dungeon.tasks.find(item => item.id === taskId);
      if (!task || task.completed)
        return;

      setCompletingId(taskId);
      setActionError(null);

      try {
        const result = await api.completeTask(taskId);
        setDungeon((prev) => {
          if (!prev)
            return prev;
          return {
            ...prev,
            hp: result.hp,
            status: result.status,
            tasks: prev.tasks.map(item =>
              item.id === taskId ? { ...item, completed: true } : item,
            ),
          };
        });
        setShake(true);
        setHitFeedback({ damage: task.damage, key: Date.now() });
      }
      catch (err) {
        if (err instanceof ApiError && err.status === 409) {
          setDungeon((prev) => {
            if (!prev)
              return prev;
            return {
              ...prev,
              tasks: prev.tasks.map(item =>
                item.id === taskId ? { ...item, completed: true } : item,
              ),
            };
          });
          setActionError(mapCombatApiError(err));
          return;
        }
        setActionError(mapCombatApiError(err));
      }
      finally {
        setCompletingId(null);
      }
    },
    [completingId, dungeon],
  );

  if (loading) {
    return (
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-tavern-muted">
          Подземелье
        </p>
        <h1 className="font-display text-3xl text-tavern-parchment">
          Загрузка…
        </h1>
        <p className="text-tavern-muted">Открываем контракт…</p>
      </main>
    );
  }

  if (error) {
    return (
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-tavern-muted">
          Подземелье
        </p>
        <h1 className="font-display text-3xl text-tavern-parchment">
          Не удалось открыть
        </h1>
        <p className="text-tavern-muted" role="alert">
          {error}
        </p>
        <BackToBoard />
      </main>
    );
  }

  if (!dungeon) {
    return (
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-tavern-muted">
          Подземелье
        </p>
        <h1 className="font-display text-3xl text-tavern-parchment">
          Нет активного боя
        </h1>
        <p className="text-tavern-muted">
          Выбери контракт на доске гильдии.
        </p>
        <BackToBoard />
      </main>
    );
  }

  const victory = isVictory(dungeon);
  const busy = completingId !== null;

  return (
    <>
      <main className="mx-auto flex w-full max-w-2xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
        <header className="space-y-2 border-b border-tavern-border pb-6">
          <p className="text-xs uppercase tracking-[0.2em] text-tavern-muted">
            Подземелье
          </p>
          <h1 className="font-display text-3xl text-tavern-parchment sm:text-4xl">
            {dungeon.name_boss}
          </h1>
          <p className="text-sm text-tavern-muted">
            Контракт #
            {dungeon.id}
            {victory ? " · побеждён" : " · бой идёт"}
          </p>
        </header>

        <section className="relative rounded-lg border border-tavern-border bg-tavern-panel p-4 shadow-lg shadow-black/40 sm:p-5">
          <HpBar hp={dungeon.hp} maxHp={dungeon.max_hp} shake={shake} />
          {hitFeedback
            ? (
                <p
                  key={hitFeedback.key}
                  className="pointer-events-none absolute right-4 top-3 space-x-3 text-sm font-semibold animate-pulse"
                  aria-live="polite"
                >
                  <span className="text-red-400">
                    −
                    {hitFeedback.damage}
                    {" "}
                    HP
                  </span>
                  <span className="text-tavern-gold">
                    +
                    {hitFeedback.damage}
                    {" "}
                    XP
                  </span>
                </p>
              )
            : null}
        </section>

        {actionError
          ? (
              <p className="text-center text-sm text-red-400" role="alert">
                {actionError}
              </p>
            )
          : null}

        <section className="space-y-3">
          <h2 className="text-xs uppercase tracking-[0.2em] text-tavern-muted">
            Задачи
          </h2>
          <ul className="flex flex-col gap-3">
            {dungeon.tasks.map(task => (
              <TaskRow
                key={task.id}
                task={task}
                pending={completingId === task.id}
                disabled={busy || victory}
                onComplete={handleComplete}
              />
            ))}
          </ul>
        </section>

        <BackToBoard />
      </main>

      {victory
        ? (
            <VictoryScreen
              bossName={dungeon.name_boss}
              xpEarned={dungeon.max_hp}
            />
          )
        : null}
    </>
  );
}

function BackToBoard() {
  return (
    <Link
      href="/"
      className="inline-flex min-h-12 items-center justify-center self-center rounded-md border border-tavern-border px-5 py-3 text-sm font-semibold uppercase tracking-wider text-tavern-parchment transition hover:border-tavern-gold/50 hover:text-tavern-gold"
    >
      Вернуться к доске
    </Link>
  );
}

export default function DungeonPage() {
  return (
    <Suspense
      fallback={(
        <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
          <p className="text-xs uppercase tracking-[0.2em] text-tavern-muted">
            Подземелье
          </p>
          <h1 className="font-display text-3xl text-tavern-parchment">
            Загрузка…
          </h1>
        </main>
      )}
    >
      <DungeonView />
    </Suspense>
  );
}
