import type { Context, Next } from 'hono';
import type { Env, Variables } from '../types';
import { userClient } from '../lib/supabase';

/**
 * Expects `Authorization: Bearer <supabase access token>`.
 * Verifies the token with Supabase, then stashes the user id + raw token
 * on context so route handlers can build a user-scoped client.
 */
export async function requireAuth(
  c: Context<{ Bindings: Env; Variables: Variables }>,
  next: Next
) {
  const authHeader = c.req.header('Authorization') ?? '';
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null;

  if (!token) {
    return c.json({ error: 'Missing bearer token' }, 401);
  }

  const supabase = userClient(c.env, token);
  const { data, error } = await supabase.auth.getUser();

  if (error || !data.user) {
    return c.json({ error: 'Invalid or expired session' }, 401);
  }

  c.set('userId', data.user.id);
  c.set('userToken', token);
  await next();
}
