'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import type { Profile } from './types';
import styles from '@/styles/profile.module.css';

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
    <form className={styles.form} onSubmit={handleSave} noValidate>
      {error && (
        <p className={styles.bannerError} role="alert">
          {error}
        </p>
      )}
      {saved && <p className={styles.bannerSuccess}>Saved.</p>}

      <div className={styles.field}>
        <label className={styles.label} htmlFor="display_name">
          Display name
        </label>
        <input
          id="display_name"
          className={styles.input}
          type="text"
          value={profile.display_name ?? ''}
          onChange={(e) => setProfile({ ...profile, display_name: e.target.value })}
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="bio">
          Bio
        </label>
        <textarea
          id="bio"
          className={styles.textarea}
          value={profile.bio ?? ''}
          onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
          placeholder="Say something about yourself…"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="avatar_url">
          Avatar URL
        </label>
        <input
          id="avatar_url"
          className={styles.input}
          type="text"
          value={profile.avatar_url ?? ''}
          onChange={(e) => setProfile({ ...profile, avatar_url: e.target.value })}
          placeholder="https://…"
        />
      </div>

      <div className={styles.checkboxRow}>
        <input
          id="is_private"
          className={styles.checkbox}
          type="checkbox"
          checked={profile.is_private}
          onChange={(e) => setProfile({ ...profile, is_private: e.target.checked })}
        />
        <label className={styles.checkboxLabel} htmlFor="is_private">
          Public profile
        </label>
      </div>

      <div className={styles.actions}>
        <button className={styles.primaryButton} type="submit" disabled={saving}>
          {saving ? 'Saving…' : 'Save changes'}
        </button>
        <button className={styles.secondaryButton} type="button" onClick={handleSignOut}>
          Sign out
        </button>
      </div>
    </form>
  );
}