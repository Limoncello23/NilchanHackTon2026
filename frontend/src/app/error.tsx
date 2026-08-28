"use client";

import Link from "next/link";

import { MarkPreloaderReady } from "@/components/layout/mark-preloader-ready";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <MarkPreloaderReady />
      <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
        <p className="text-xs uppercase tracking-[0.2em] text-tavern-muted">
          Ошибка
        </p>
        <h1 className="font-display text-3xl text-tavern-parchment">
          Что-то пошло не так
        </h1>
        <p className="text-tavern-muted">
          Не удалось загрузить данные. Попробуй ещё раз.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={reset}
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-tavern-gold/50 bg-tavern-gold/10 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-tavern-gold transition hover:bg-tavern-gold/20"
          >
            Повторить
          </button>
          <Link
            href="/"
            className="inline-flex min-h-12 items-center justify-center rounded-md border border-tavern-border px-5 py-3 text-sm font-semibold uppercase tracking-wider text-tavern-parchment transition hover:border-tavern-gold/50 hover:text-tavern-gold"
          >
            На доску
          </Link>
        </div>
      </main>
    </>
  );
}
