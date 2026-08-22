import Link from "next/link";

export default function FaqPage() {
  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-tavern-muted">
        FAQ
      </p>
      <h1 className="font-display text-3xl text-tavern-parchment">
        Вопросы и ответы
      </h1>
      <p className="text-tavern-muted">
        Контент появится позже.
      </p>
      <Link
        href="/"
        className="mt-4 inline-flex min-h-12 items-center justify-center rounded-md border border-tavern-border px-5 py-3 text-sm font-semibold uppercase tracking-wider text-tavern-parchment transition hover:border-tavern-gold/50 hover:text-tavern-gold"
      >
        Вернуться к доске
      </Link>
    </main>
  );
}
