import { createBrowserClient } from '@supabase/ssr';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_PUBLIC_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY!;

export function createClient() { return createBrowserClient(SUPABASE_URL, SUPABASE_PUBLIC_KEY); }