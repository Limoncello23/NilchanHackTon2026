"use client";

import { useEffect } from "react";

import { usePreloader } from "@/components/layout/preloader-context";

export function MarkPreloaderReady() {
  const { markReady } = usePreloader();

  useEffect(() => {
    markReady();
  }, [markReady]);

  return null;
}
