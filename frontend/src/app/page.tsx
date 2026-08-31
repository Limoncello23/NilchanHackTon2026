import Link from "next/link";

import { ContractCard } from "@/components/board/contract-card";
import { MarkPreloaderReady } from "@/components/layout/mark-preloader-ready";
import { api } from "@/lib/api";

export default async function Home() {
  const routines = await api.getRoutines();

  return (
    <>
      <MarkPreloaderReady />
      <main className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
        <header className="flex flex-col gap-4 border-b border-tavern-border pb-6 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-tavern-muted">
              Гильдия
            </p>
            <h1 className="font-display text-3xl text-tavern-parchment sm:text-4xl">
              Доска контрактов
            </h1>
            <p className="max-w-xl text-sm text-tavern-muted sm:text-base">
              Выбери босса. Выполни рутину. Нанеси урон. Вернись за новым контрактом.
            </p>
          </div>

          <Link
            href="/contracts/new"
            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-md border border-tavern-gold/50 bg-tavern-gold/10 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-tavern-gold transition hover:bg-tavern-gold/20"
          >
            + Создать контракт
          </Link>
        </header>

        {routines.length === 0
          ? (
              <p className="rounded-lg border border-dashed border-tavern-border px-6 py-12 text-center text-tavern-muted">
                На доске пока пусто. Создай первый контракт.
              </p>
            )
          : (
              <section
                aria-label="Контракты"
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {routines.map(routine => (
                  <ContractCard key={routine.id} routine={routine} />
                ))}
              </section>
            )}
      </main>
    </>
  );
}
