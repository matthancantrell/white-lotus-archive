export type Env = {
  SUPABASE_URL: string;
  SUPABASE_PUBLIC_KEY: string;
  SUPABASE_PRIVATE_KEY: string; // set via `wrangler secret put`, only used for account deletion
  ALLOWED_ORIGIN: string;
  DB: D1Database; // character data — see schema/0001_characters.sql
  MEDIA: R2Bucket; // icon art — privately bound, never a public bucket; see routes/media.ts
};

// A saved character record — columns match schema/0001_characters.sql, which
// explains the denormalized fields and `icon_id`. `data` is the full
// CharacterDraft as JSON (parsed).
export type CharacterRecord = {
  id: string;
  user_id: string;
  name: string;
  playbook_id: string | null;
  era_name: string | null;
  icon_id: string | null;
  data: unknown;
  created_at: string;
  updated_at: string;
};

// Adjust these field names if your actual Postgres columns differ
// (Supabase/Postgres convention is snake_case even if your notes used
// camelCase — e.g. "displayname" -> "display_name"). Update this type
// AND the column names in routes/profiles.ts together.
export type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  // A key into the web app's icon catalog (ICONS in
  // web/src/app/character/creator/data.ts), never a URL — same reasoning as
  // characters' icon_id. Resolved to an actual URL via resolveIcon() at render
  // time, so a future catalog/URL change never needs a data backfill.
  avatar_icon_id: string | null;
  bio: string | null;
  is_private: boolean;
  created_at: string;
  updated_at: string;
};

export type Variables = {
  userId: string;
  userToken: string;
};
