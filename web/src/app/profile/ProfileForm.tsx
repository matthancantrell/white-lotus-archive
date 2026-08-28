'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from './types';

const inputCls =
  'text-[15px] px-3.5 py-3 rounded-[10px] border border-white/[0.18] bg-ink/60 text-parchment w-full box-border placeholder:text-[#6f847f] focus:outline-none focus:border-gold focus:ring-[3px] focus:ring-gold/20 font-body';

export function ProfileForm({ initialProfile }: { initialProfile: Profile }) {
  const supabase = createClient();
  const [profile, setProfile] = useState(initialProfile);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

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
        avatar_url: profile.avatar_url,
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
        <input
          id="display_name"
          type="text"
          value={profile.display_name ?? ''}
          onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
          className={inputCls}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="bio" className="text-[13px] font-semibold text-parchment-dim">Bio</label>
        <textarea
          id="bio"
          value={profile.bio ?? ''}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          placeholder="Say something about yourself…"
          rows={3}
          className={`${inputCls} resize-y min-h-[88px]`}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label htmlFor="avatar_url" className="text-[13px] font-semibold text-parchment-dim">Avatar URL</label>
        <input
          id="avatar_url"
          type="text"
          value={profile.avatar_url ?? ''}
          onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
          placeholder="https://…"
          className={inputCls}
        />
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
