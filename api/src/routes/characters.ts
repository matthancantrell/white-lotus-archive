import { Hono } from 'hono';
import type { Env, Variables, CharacterRecord } from '../types';
import { requireAuth } from '../middleware/auth';

export const characters = new Hono<{ Bindings: Env; Variables: Variables }>();

// Pulls the columns the character manager's list view sorts/filters on out of an
// arbitrary character-draft body, with safe fallbacks — never trust the shape of
// client JSON directly into SQL params.
function extractSummary(body: Record<string, unknown>) {
  return {
    name: typeof body.name === 'string' ? body.name : '',
    playbook_id: typeof body.playbookId === 'string' ? body.playbookId : null,
    era_name: typeof body.eraName === 'string' ? body.eraName : null,
    // icon_id (see ICONS in data.ts): not sent yet, no icon-picker UI exists —
    // this just lets the column round-trip once one does.
    icon_id: typeof body.iconId === 'string' ? body.iconId : null,
  } as const;
}

// GET /api/characters — the caller's own characters, summary fields only (no
// `data` blob — the manager's list view doesn't need the full draft per row).
characters.get('/', requireAuth, async (c) => {
  const userId = c.get('userId');
  const { results } = await c.env.DB.prepare(
    'SELECT id, name, playbook_id, era_name, icon_id, updated_at FROM characters WHERE user_id = ? ORDER BY updated_at DESC'
  ).bind(userId).all();
  return c.json(results);
});

// GET /api/characters/:id — one character, including its full data blob.
// Ownership is enforced in the WHERE clause, not checked after the fact — D1 has
// no RLS, so this is the only thing standing between users' characters.
characters.get('/:id', requireAuth, async (c) => {
  const userId = c.get('userId');
  const id = c.req.param('id');
  const row = await c.env.DB.prepare('SELECT * FROM characters WHERE id = ? AND user_id = ?')
    .bind(id, userId)
    .first<CharacterRecord>();
  if (!row) return c.json({ error: 'Character not found' }, 404);
  return c.json({ ...row, data: JSON.parse(row.data as unknown as string) });
});

// POST /api/characters — create a new character owned by the caller. The id is
// always server-assigned (never trust a client-supplied primary key on insert).
characters.post('/', requireAuth, async (c) => {
  const userId = c.get('userId');
  const body = await c.req.json().catch(() => null);
  if (!body || typeof body !== 'object') return c.json({ error: 'Invalid JSON body' }, 400);

  const id = crypto.randomUUID();
  const now = new Date().toISOString();
  const summary = extractSummary(body as Record<string, unknown>);

  await c.env.DB.prepare(
    `INSERT INTO characters (id, user_id, name, playbook_id, era_name, icon_id, data, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(id, userId, summary.name, summary.playbook_id, summary.era_name, summary.icon_id, JSON.stringify(body), now, now).run();

  return c.json({ id, user_id: userId, ...summary, data: body, created_at: now, updated_at: now }, 201);
});

// PATCH /api/characters/:id — full replace of an existing character's data.
characters.patch('/:id', requireAuth, async (c) => {
  const userId = c.get('userId');
  const id = c.req.param('id');
  const body = await c.req.json().catch(() => null);
  if (!body || typeof body !== 'object') return c.json({ error: 'Invalid JSON body' }, 400);

  const now = new Date().toISOString();
  const summary = extractSummary(body as Record<string, unknown>);

  const result = await c.env.DB.prepare(
    `UPDATE characters SET name = ?, playbook_id = ?, era_name = ?, icon_id = ?, data = ?, updated_at = ?
     WHERE id = ? AND user_id = ?`
  ).bind(summary.name, summary.playbook_id, summary.era_name, summary.icon_id, JSON.stringify(body), now, id, userId).run();

  if (result.meta.changes === 0) return c.json({ error: 'Character not found' }, 404);
  return c.json({ id, user_id: userId, ...summary, data: body, updated_at: now });
});

// DELETE /api/characters/:id
characters.delete('/:id', requireAuth, async (c) => {
  const userId = c.get('userId');
  const id = c.req.param('id');
  const result = await c.env.DB.prepare('DELETE FROM characters WHERE id = ? AND user_id = ?').bind(id, userId).run();
  if (result.meta.changes === 0) return c.json({ error: 'Character not found' }, 404);
  return c.json({ success: true });
});
