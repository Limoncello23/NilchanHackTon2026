"use client";

import { useState } from "react";

type Locale = "ru" | "en";

type LanguageToggleProps = {
  className?: string;
};

export function LanguageToggle({ className = "" }: LanguageToggleProps) {
  const [locale, setLocale] = useState<Locale>("ru");

  return (
    <div
      className={`inline-flex rounded-md border border-tavern-border p-0.5 ${className}`}
      role="group"
      aria-label="Language"
    >
      {(["ru", "en"] as const).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={`min-h-9 min-w-11 rounded px-3 text-xs font-semibold uppercase tracking-wider transition ${
              active
                ? "bg-tavern-gold/20 text-tavern-gold"
                : "text-tavern-muted hover:text-tavern-parchment"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
