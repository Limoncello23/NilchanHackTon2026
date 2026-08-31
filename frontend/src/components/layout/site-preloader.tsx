"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

import { usePreloader } from "@/components/layout/preloader-context";

const FADE_MS = 300;
const FALLBACK_MS = 10_000;

export function SitePreloader() {
  const { isReady, markReady } = usePreloader();
  const [mounted, setMounted] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (isReady) {
      setVisible(false);
    }
  }, [isReady]);

  useEffect(() => {
    const fallbackTimer = window.setTimeout(() => {
      markReady();
    }, FALLBACK_MS);

    return () => window.clearTimeout(fallbackTimer);
  }, [markReady]);

  useEffect(() => {
    if (visible)
      return;

    const unmountTimer = window.setTimeout(() => {
      setMounted(false);
    }, FADE_MS);

    return () => window.clearTimeout(unmountTimer);
  }, [visible]);

  useEffect(() => {
    if (!mounted)
      return;

    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previous;
    };
  }, [mounted]);

  if (!mounted)
    return null;

  return (
    <div
      role="status"
      aria-busy={visible}
      aria-label="Loading"
      className={`fixed inset-0 z-100 flex items-center justify-center bg-background transition-opacity ease-out ${
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
      style={{ transitionDuration: `${FADE_MS}ms` }}
    >
      <div className="flex flex-col items-center gap-6">
        <Image
          src="/assets/brand/logo-mark.svg"
          alt=""
          width={96}
          height={96}
          className="size-24 animate-pulse"
          priority
        />
        <div
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={isReady ? 100 : undefined}
          aria-label="Loading progress"
          className="h-0.5 w-28 overflow-hidden rounded-full bg-tavern-border"
        >
          <div
            className={`h-full bg-tavern-gold ${
              isReady ? "w-full" : "animate-preloader-indeterminate"
            }`}
          />
        </div>
      </div>
    </div>
  );
}
