import Link from "next/link";

type DungeonPageProps = {
  searchParams: Promise<{ routineId?: string }>;
};

export default async function DungeonPage({ searchParams }: DungeonPageProps) {
  const { routineId } = await searchParams;

  return (
    <main className="mx-auto flex w-full max-w-lg flex-1 flex-col items-center justify-center gap-6 px-4 py-16 text-center">
      <p className="text-xs uppercase tracking-[0.2em] text-tavern-muted">
        Подземелье
      </p>
      <h1 className="font-display text-3xl text-tavern-parchment">
        Скоро здесь будет бой
      </h1>
      <p className="text-tavern-muted">
        {routineId
          ? (
              <>
                Контракт #
                {routineId}
                {" "}
                принят. Экран dungeon появится в следующем слайсе.
              </>
            )
          : "Выбери контракт на доске гильдии."}
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
