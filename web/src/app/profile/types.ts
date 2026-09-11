export type Profile = {
  id: string;
  username: string;
  display_name: string | null;
  // A key into ICONS (../character/creator/data), never a URL — resolved via
  // resolveIcon() at render time.
  avatar_icon_id: string | null;
  bio: string | null;
  is_private: boolean;
  created_at: string;
  updated_at: string;
};
