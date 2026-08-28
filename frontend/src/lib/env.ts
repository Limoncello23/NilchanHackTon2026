/* eslint-disable node/no-process-env -- single place for env reads */

const DEFAULT_API_URL = "http://localhost:8080";

export const env = {
  // API_URL: server-side (e.g. Docker SSR → http://app:8080)
  // NEXT_PUBLIC_API_URL: browser / build-time public URL
  apiUrl:
    process.env.API_URL
    || process.env.NEXT_PUBLIC_API_URL
    || DEFAULT_API_URL,
} as const;
