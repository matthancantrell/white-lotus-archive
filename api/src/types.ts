export type Env = {
  SUPABASE_URL: string;
  SUPABASE_PUBLIC_KEY: string;
  SUPABASE_PRIVATE_KEY: string; // set via `wrangler secret put`, only used for account deletion
  ALLOWED_ORIGIN: string;
};

// Adjust these field names if your actual Postgres columns differ
// (Supabase/Postgres convention is snake_case even if your notes used
// camelCase — e.g. "displayname" -> "display_name"). Update this type
// AND the column names in routes/profiles.ts together.
export type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  avatar_url: string | null;
  bio: string | null;
  is_private: boolean;
  created_at: string;
  updated_at: string;
};

export type Variables = {
  userId: string;
  userToken: string;
};
