import { Hono } from 'hono';
import type { Env, Variables } from '../types';

export const media = new Hono<{ Bindings: Env; Variables: Variables }>();

// Icons are static, dev-uploaded, and never overwritten in place under the same
// key (see ICONS in web/src/app/character/creator/data.ts) — safe to cache hard,
// both at Cloudflare's edge and in the requesting browser.
const CACHE_CONTROL = 'public, max-age=31536000, immutable';

// GET /media/icons/:key — streams one object out of the MEDIA bucket, which is
// bound to this Worker only (no r2.dev subdomain, no custom domain, no public
// bucket access at all). Deliberately unauthenticated: icons are catalog art,
// not user data, and get loaded directly from <img> tags.
//
// R2 bills a read the same whether it comes through this binding, the S3 API,
// or a public bucket URL — routing through a Worker doesn't itself reduce
// operation count. The cache check below is what does: a HIT never calls
// `MEDIA.get()`, so repeat requests for the same icon cost zero R2 operations.
// That's the entire reason this route exists instead of just making the bucket
// public.
media.get('/icons/:key', async (c) => {
  const key = c.req.param('key');
  const cache = caches.default;
  const cacheKey = new Request(c.req.url, c.req.raw);

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const object = await c.env.MEDIA.get(`icons/${key}`);
  if (!object) return c.notFound();

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('Cache-Control', CACHE_CONTROL);

  const response = new Response(object.body, { headers });
  // Populate the edge cache without making the caller wait on it.
  c.executionCtx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
});
