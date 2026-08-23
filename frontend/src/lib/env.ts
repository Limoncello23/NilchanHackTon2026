/* eslint-disable node/no-process-env -- single place for env reads */

const DEFAULT_API_URL = "http://localhost:8080";

function readEnv(key: string): string | undefined {
  return process.env[key];
}

export const env = {
  /** When true (default), use in-memory mock instead of Go backend. */
  useMock: (() => {
    const flag = readEnv("NEXT_PUBLIC_USE_MOCK");
    if (flag === "false")
      return false;
    if (flag === "true")
      return true;
    // Empty / unset API URL → mock
    const apiUrl = readEnv("NEXT_PUBLIC_API_URL");
    if (!apiUrl)
      return true;
    return false;
  })(),

  apiUrl: readEnv("NEXT_PUBLIC_API_URL") || DEFAULT_API_URL,
} as const;
