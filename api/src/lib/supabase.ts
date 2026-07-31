import { createClient } from '@supabase/supabase-js';
import type { Env } from '../types';

/**
 * A client that acts AS THE REQUESTING USER — it forwards their access
 * token on every request, so Postgres RLS policies apply exactly as if
 * they'd called Supabase directly. Use this for all normal CRUD.
 */
export function userClient(env: Env, accessToken: string) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_PUBLIC_KEY, {
    global: { headers: { Authorization: `Bearer ${accessToken}` } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
  
/**
 * Full-privilege client that bypasses RLS. Only use for operations that
 * genuinely require admin rights (e.g. deleting an auth.users row).
 * Never expose this client's key to the browser.
 */
export function adminClient(env: Env) {
  return createClient(env.SUPABASE_URL, env.SUPABASE_PRIVATE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
