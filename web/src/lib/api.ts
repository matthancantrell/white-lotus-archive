/**
 * Calls the API worker from server-side code (Server Components, Route
 * Handlers, Server Actions).
 *
 * Both `web` and `api` are deployed as separate Cloudflare Workers. A
 * Worker that `fetch()`es another Worker's public *.workers.dev (or any
 * Cloudflare-proxied) URL gets rejected at the edge with error 1042 —
 * the request never reaches the target Worker at all. See the "API"
 * service binding in wrangler.jsonc, which routes the request directly
 * worker-to-worker instead.
 *
 * Falls back to a plain fetch against NEXT_PUBLIC_API_URL when the
 * binding isn't available — e.g. running under plain `next dev`,
 * outside the Cloudflare Workers runtime.
 */
export async function apiFetch(path: string, init?: RequestInit): Promise<Response> {
  try {
    const { env } = (await import('cloudflare:workers')) as {
      env: { API?: { fetch: typeof fetch } };
    };
    if (env?.API) {
      return env.API.fetch(`https://api.internal${path}`, init);
    }
  } catch {
    // Not running inside the Cloudflare Workers runtime — fall through.
  }
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, init);
}
