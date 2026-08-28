"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type PreloaderContextValue = {
  isReady: boolean;
  markReady: () => void;
};

const PreloaderContext = createContext<PreloaderContextValue | null>(null);

export function PreloaderProvider({ children }: { children: ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  const markReady = useCallback(() => {
    setIsReady(true);
  }, []);

  const value = useMemo(
    () => ({ isReady, markReady }),
    [isReady, markReady],
  );

  return (
    <PreloaderContext.Provider value={value}>
      {children}
    </PreloaderContext.Provider>
  );
}

export function usePreloader(): PreloaderContextValue {
  const ctx = useContext(PreloaderContext);
  if (!ctx) {
    throw new Error("usePreloader must be used within PreloaderProvider");
  }
  return ctx;
}
