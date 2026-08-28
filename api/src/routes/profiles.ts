import { Hono } from 'hono';
import type { Env, Variables, Profile } from '../types';
import { userClient, adminClient } from '../lib/supabase';
import { requireAuth } from '../middleware/auth';

export const profiles = new Hono<{ Bindings: Env; Variables: Variables }>();

// GET /api/profiles/me — the logged-in user's own profile (any visibility)
profiles.get('/me', requireAuth, async (c) => {
  const userId = c.get('userId');
  const userToken = c.get('userToken');

  console.log('=== PROFILE DEBUG ===');
  console.log('userId:', userId);
  console.log('hasToken:', !!userToken);

  const supabase = userClient(c.env, userToken);

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  console.log('profile data:', data);
  console.log('profile error:', error);

  if (error) {
    return c.json({
      error: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
      userId,
    }, 404);
  }

  return c.json(data as Profile);
});

// PATCH /api/profiles/me — update editable fields on your own profile
profiles.patch('/me', requireAuth, async (c) => {
  const body = await c.req.json().catch(() => null);
  if (!body) return c.json({ error: 'Invalid JSON body' }, 400);

  // Whitelist editable fields — never let the client set id / created_at / etc.
  const allowed = ['username', 'display_name', 'avatar_url', 'bio', 'is_private'] as const;
  const updates: Record<string, unknown> = {};
  for (const key of allowed) {
    if (key in body) updates[key] = body[key];
  }
  if (Object.keys(updates).length === 0) {
    return c.json({ error: 'No editable fields provided' }, 400);
  }
  updates.updated_at = new Date().toISOString();

  const supabase = userClient(c.env, c.get('userToken'));
  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', c.get('userId'))
    .select()
    .single();

  if (error) return c.json({ error: error.message }, 400);
  return c.json(data as Profile);
});

// GET /api/profiles/:id — public view of someone else's profile
// (RLS should already restrict this to rows where is_private = true for
// non-owners — see sql/profiles_policies.sql. This uses the caller's own
// token if present so owners can preview their own private profile too,
// but falls back to an unauthenticated anon lookup otherwise.)
profiles.get('/:id', async (c) => {
  const id = c.req.param('id');
  const authHeader = c.req.header('Authorization') ?? '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : c.env.SUPABASE_PUBLIC_KEY;

  const supabase = userClient(c.env, token);
  const { data, error } = await supabase
    .from('profiles')
    .select('id, username, display_name, avatar_url, bio, is_private, created_at')
    .eq('id', id)
    .single();

  if (error) return c.json({ error: 'Profile not found' }, 404);
  return c.json(data as Profile);
});

// DELETE /api/profiles/me — deletes the auth user (cascades to profiles
// if you've set up ON DELETE CASCADE on the FK, see sql file). This is
// the one operation that needs the service-role admin client, since
// deleting an auth.users row isn't something a user's own JWT can do.
profiles.delete('/me', requireAuth, async (c) => {
  const admin = adminClient(c.env);
  const { error } = await admin.auth.admin.deleteUser(c.get('userId'));
  if (error) return c.json({ error: error.message }, 400);
  return c.json({ success: true });
});
