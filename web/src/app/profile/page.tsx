import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { apiFetch } from '@/lib/api';
import { ProfileForm } from './ProfileForm';
import type { Profile } from './types';
import styles from '@/styles/profile.module.css';

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const res = await apiFetch('/api/profiles/me', {
    headers: { Authorization: `Bearer ${session.access_token}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('Profile fetch failed:', res.status, res.statusText, body);
    throw new Error('Could not load your profile.');
  }
  const profile: Profile = await res.json();

  return (
    <main className={styles.page}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.avatar}>
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt="" />
            ) : (
              (profile.display_name || profile.username).charAt(0).toUpperCase()
            )}
          </div>
          <div>
            <h1 className={styles.title}>{profile.display_name || profile.username}</h1>
            <p className={styles.handle}>@{profile.username}</p>
          </div>
        </div>
        <ProfileForm initialProfile={profile} />
      </div>
    </main>
  );
}