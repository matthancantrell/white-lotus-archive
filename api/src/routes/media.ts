import { Hono } from 'hono';
import type { Context } from 'hono';
import type { Env, Variables } from '../types';

export const media = new Hono<{ Bindings: Env; Variables: Variables }>();

// Icons and playbook art are static, dev-uploaded, and never overwritten in place
// under the same key (see ICONS and the playbook `*ImageKey` fields in
// web/src/app/character/creator/data.ts) — safe to cache hard, both at
// Cloudflare's edge and in the requesting browser.
const CACHE_CONTROL = 'public, max-age=31536000, immutable';

// Shared by every /media/*/:key route below — streams one object out of the
// MEDIA bucket under `prefix/key`, edge-caching a HIT so repeat requests cost
// zero R2 operations. See the /icons/:key route for why this exists instead of
// just making the bucket public.
async function serveMediaObject(c: Context<{ Bindings: Env; Variables: Variables }>, prefix: string, key: string) {
  const cache = caches.default;
  const cacheKey = new Request(c.req.url, c.req.raw);

  const cached = await cache.match(cacheKey);
  if (cached) return cached;

  const object = await c.env.MEDIA.get(`${prefix}/${key}`);
  if (!object) return c.notFound();

  const headers = new Headers();
  object.writeHttpMetadata(headers);
  headers.set('etag', object.httpEtag);
  headers.set('Cache-Control', CACHE_CONTROL);

  const response = new Response(object.body, { headers });
  // Populate the edge cache without making the caller wait on it.
  c.executionCtx.waitUntil(cache.put(cacheKey, response.clone()));
  return response;
}

// GET /media/icons/:key — profile/character icon art. Deliberately
// unauthenticated: icons are catalog art, not user data, and get loaded
// directly from <img> tags.
//
// R2 bills a read the same whether it comes through this binding, the S3 API,
// or a public bucket URL — routing through a Worker doesn't itself reduce
// operation count. The cache check in serveMediaObject is what does that.
media.get('/icons/:key', (c) => serveMediaObject(c, 'icons', c.req.param('key')));

// GET /media/playbooks/:key — playbook banner art (key: `<playbookId>.jpg`),
// the shared Principles yin-yang emblem (`principles-emblem.png`), and each
// playbook's secondary image shown between Moves Advice and Playbook Technique
// (key: `<playbookId>-secondary.jpg`) — see PlaybookInfoPanel and
// resolvePlaybookMedia in web/src/app/character/creator/data.ts. Same
// unauthenticated, cache-hard treatment as icons.
media.get('/playbooks/:key', (c) => serveMediaObject(c, 'playbooks', c.req.param('key')));

// GET /media/content/:key — one-off site art that isn't playbook- or
// icon-specific, e.g. the character sheet's two Balance-track koi images
// (`white-koi.png`, `black-koi.png`) — see resolveContentMedia in
// web/src/app/character/creator/data.ts. Same unauthenticated, cache-hard
// treatment as icons/playbooks.
media.get('/content/:key', (c) => serveMediaObject(c, 'content', c.req.param('key')));
