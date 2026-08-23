export type BossSlug = "NILCHAN" | "PANTELA" | "HATER";

export type BossHealthPercent = 0 | 20 | 60 | 100;

const FALLBACK_SLUG: BossSlug = "NILCHAN";

function resolveSlug(name: string): BossSlug {
  const lower = name.toLowerCase();
  if (lower.includes("nilchan"))
    return "NILCHAN";
  if (lower.includes("pantela"))
    return "PANTELA";
  if (lower.includes("хейтер") || lower.includes("hater"))
    return "HATER";
  return FALLBACK_SLUG;
}

function fileStem(slug: BossSlug): string {
  return slug.toLowerCase();
}

/** Portrait path for a routine / boss name at a given HP sprite tier. */
export function getBossArtPath(
  name: string,
  health: BossHealthPercent = 100,
): string {
  const slug = resolveSlug(name);
  return `/assets/bosses/${slug}/${fileStem(slug)}-health-${health}.png`;
}
