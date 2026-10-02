'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { AuthTextField, AuthTextArea } from '@/components/AuthTextField';
import { ICONS } from '../character/creator/data';
import type { Profile } from './types';

export function ProfileForm({ initialProfile }: { initialProfile: Profile }) {
  const supabase = createClient();
  const router = useRouter();
  const [profile, setProfile] = useState(initialProfile);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  // Same reasoning as the character creator's icon picker: icons are fetched
  // from R2 through the API, and a broken/unreachable one must never block
  // picking a profile picture or saving the form — it just falls back to a
  // plain placeholder instead of a broken <img> icon.
  const [brokenIconIds, setBrokenIconIds] = useState<Set<string>>(new Set());

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSaved(false);

    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      setError('Your session expired — please log in again.');
      setSaving(false);
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/profiles/me`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${session.access_token}`,
      },
      body: JSON.stringify({
        display_name: profile.display_name,
        bio: profile.bio,
        avatar_icon_id: profile.avatar_icon_id,
        is_private: profile.is_private,
      }),
    });

    setSaving(false);

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setError(body.error ?? 'Something went wrong saving your profile.');
      return;
    }

    const updated: Profile = await res.json();
    setProfile(updated);
    setSaved(true);
    // The header avatar above this form is rendered server-side in page.tsx
    // from the profile fetched when the page loaded — updating this
    // component's own state doesn't reach back into that. Refresh so it
    // re-fetches and shows the newly-saved icon instead of the stale one.
    router.refresh();
  }

  async function handleSignOut() {
    await supabase.auth.signOut();
    window.location.href = '/login';
  }

  return (
    <form onSubmit={handleSave} noValidate className="flex flex-col gap-4.5">
      {error && (
        <p role="alert" className="text-[13.5px] px-3.5 py-2.5 rounded-[10px] bg-[#b3492e]/15 border border-[#b3492e]/40 text-[#e8927a]">
          {error}
        </p>
      )}
      {saved && (
        <p className="text-[13.5px] px-3.5 py-2.5 rounded-[10px] bg-[#4a7c59]/15 border border-[#4a7c59]/40 text-[#a8d5b0]">Saved.</p>
      )}

      <div className="flex flex-col gap-1.5">
        <label htmlFor="display_name" className="text-[13px] font-semibold text-parchment-dim">Display name</label>
        <AuthTextField
          id="display_name"
          type="text"
          value={profile.display_name ?? ''}
          onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="bio" className="text-[13px] font-semibold text-parchment-dim">Bio</label>
        <AuthTextArea
          id="bio"
          value={profile.bio ?? ''}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          placeholder="Say something about yourself…"
          rows={3}
          className="resize-y min-h-[88px]"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-[13px] font-semibold text-parchment-dim">Profile picture</label>
        <div>
          <button
            type="button"
            onClick={() => setPickerOpen((v) => !v)}
            className="px-4 py-2 text-[13.5px] font-semibold text-parchment bg-transparent border border-white/25 rounded-full cursor-pointer hover:bg-white/5"
          >
            {pickerOpen ? 'Close' : 'Change profile picture'}
          </button>
        </div>

        {pickerOpen && (
          <div className="mt-1 pr-1" style={{ maxHeight: 220, overflowY: 'auto' }}>
            <div className="flex flex-wrap gap-2.5">
              {ICONS.map((icon) => {
                const selected = profile.avatar_icon_id === icon.id;
                return (
                  <button
                    key={icon.id}
                    type="button"
                    onClick={() => {
                      setProfile({ ...profile, avatar_icon_id: icon.id });
                      setPickerOpen(false);
                    }}
                    className="relative rounded-full flex items-center justify-center shrink-0 overflow-hidden bg-white/6"
                    style={{ width: 52, height: 52, border: `2px solid ${selected ? '#e8c874' : 'transparent'}` }}
                  >
                    {brokenIconIds.has(icon.id) ? (
                      <div className="w-full h-full" />
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={icon.url}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={() => setBrokenIconIds((prev) => new Set(prev).add(icon.id))}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <label className="flex items-center gap-2.5 py-1 cursor-pointer">
        <input
          type="checkbox"
          checked={!profile.is_private}
          onChange={(e) => setProfile({ ...profile, is_private: !e.target.checked })}
          className="w-[17px] h-[17px] accent-gold cursor-pointer"
        />
        <span className="text-sm text-parchment-dim">Public profile</span>
      </label>

      <div className="flex gap-3 flex-wrap mt-1">
        <button
          type="submit"
          disabled={saving}
          className="flex-1 px-4 py-3.5 text-[15px] font-bold text-gold-ink bg-gold border-none rounded-full cursor-pointer disabled:opacity-60 hover:brightness-95"
        >
          {saving ? 'Saving…' : 'Save changes'}
        </button>
        <button
          type="button"
          onClick={handleSignOut}
          className="px-5 py-3.5 text-[15px] font-semibold text-parchment bg-transparent border border-white/25 rounded-full cursor-pointer hover:bg-white/5"
        >
          Sign out
        </button>
      </div>
    </form>
  );
}
