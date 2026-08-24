/* eslint-disable node/no-process-env -- single place for env reads */

const DEFAULT_API_URL = "http://localhost:8080";

function readEnv(key: string): string | undefined {
  return process.env[key];
}

export const env = {
  apiUrl: readEnv("NEXT_PUBLIC_API_URL") || DEFAULT_API_URL,
} as const;
