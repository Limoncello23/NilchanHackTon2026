type HpBarProps = {
  hp: number;
  maxHp: number;
  shake?: boolean;
};

export function HpBar({ hp, maxHp, shake = false }: HpBarProps) {
  const safeMax = maxHp > 0 ? maxHp : 1;
  const ratio = Math.max(0, Math.min(1, hp / safeMax));
  const percent = Math.round(ratio * 100);

  return (
    <div className={`w-full space-y-2 ${shake ? "animate-hp-shake" : ""}`}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-xs uppercase tracking-[0.15em] text-tavern-muted">
          HP
        </span>
        <span className="font-display text-sm text-tavern-parchment">
          {hp}
          /
          {maxHp}
        </span>
      </div>
      <div
        className="h-4 overflow-hidden rounded-full border border-tavern-border bg-tavern-wood"
        role="progressbar"
        aria-valuenow={hp}
        aria-valuemin={0}
        aria-valuemax={maxHp}
        aria-label={`Здоровье босса ${hp} из ${maxHp}`}
      >
        <div
          className="h-full rounded-full bg-tavern-gold transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
