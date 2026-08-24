import Link from "next/link";

type VictoryScreenProps = {
  bossName: string;
  xpEarned: number;
};

export function VictoryScreen({ bossName, xpEarned }: VictoryScreenProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-4 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      aria-labelledby="victory-title"
    >
      <div className="w-full max-w-md space-y-6 rounded-lg border border-tavern-gold/50 bg-tavern-panel p-8 text-center shadow-2xl shadow-tavern-gold/20">
        <p className="text-xs uppercase tracking-[0.25em] text-tavern-muted">
          Победа
        </p>
        <h2
          id="victory-title"
          className="font-display text-3xl text-tavern-gold sm:text-4xl"
        >
          💀 BOSS DEFEATED
        </h2>
        <p className="font-display text-xl text-tavern-parchment">
          {bossName}
        </p>
        <p className="text-2xl font-semibold text-tavern-gold">
          +
          {xpEarned}
          {" "}
          XP
        </p>
        <Link
          href="/"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-md border border-tavern-gold/50 bg-tavern-gold/15 px-5 py-3 text-sm font-semibold uppercase tracking-wider text-tavern-gold transition hover:bg-tavern-gold/25"
        >
          Вернуться в гильдию
        </Link>
      </div>
    </div>
  );
}
