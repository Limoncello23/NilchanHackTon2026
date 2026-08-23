import Image from "next/image";
import Link from "next/link";

import type { Routine } from "@/lib/api";

import { getBossArtPath } from "@/lib/boss-art";
import { sumTaskDamage } from "@/lib/routine-stats";

type ContractCardProps = {
  routine: Routine;
};

const REPEAT_LABEL: Record<Routine["repeat"], string> = {
  daily: "ежедневно",
  weekly: "еженедельно",
};

export function ContractCard({ routine }: ContractCardProps) {
  const total = sumTaskDamage(routine);
  const artSrc = getBossArtPath(routine.name, 100);
  const href = `/dungeon?routineId=${routine.id}`;

  return (
    <article className="flex flex-col overflow-hidden rounded-lg border-b border-tavern-border bg-tavern-panel shadow-lg shadow-black/40 transition hover:border-tavern-gold/60 hover:shadow-tavern-gold/10">
      <Link
        href={href}
        className="group block focus:outline-none focus-visible:ring-2 focus-visible:ring-tavern-gold"
      >
        <div className="relative aspect-[4/5] w-full bg-tavern-wood">
          <Image
            src={artSrc}
            alt={routine.name}
            fill
            className="object-cover object-top transition group-hover:scale-[1.02]"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            priority={routine.id === 1}
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-4">
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
            <dd className="font-medium text-tavern-gold">+{total}</dd>
          </div>
        </dl>

        <Link
          href={href}
          className="mt-auto block rounded-md border border-tavern-gold/40 bg-tavern-gold/15 px-4 py-3 text-center text-sm font-semibold uppercase tracking-wider text-tavern-gold transition hover:bg-tavern-gold/25 active:scale-[0.98]"
        >
          Взять контракт
        </Link>
      </div>
    </article>
  );
}
