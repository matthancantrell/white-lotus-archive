import Link from 'next/link';
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { apiFetch } from '@/lib/api';
import LotusMark from '@/components/LotusMark';
import { ProfileForm } from './ProfileForm';
import type { Profile } from './types';

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
  const displayName = profile.display_name || profile.username;

  return (
    <div className="bg-ink text-parchment min-h-screen font-body">
      <header className="sticky top-0 z-20 flex items-center justify-between flex-wrap gap-y-3 px-[clamp(20px,6vw,56px)] py-[clamp(14px,3vw,20px)] bg-ink/85 backdrop-blur-md border-b border-gold/15">
        <Link href="/" className="flex items-center gap-3">
          <LotusMark size={34} />
          <span className="font-display font-bold text-lg tracking-wide text-parchment">White Lotus Archive</span>
        </Link>
        <nav className="flex items-center gap-[clamp(16px,3vw,36px)] flex-wrap">
          <Link href="/#eras" className="hidden sm:inline text-parchment-dim text-[15px] font-medium hover:text-parchment">Eras</Link>
          <div className="hidden sm:block group relative">
            <button className="flex items-center gap-1.5 text-parchment-dim text-[15px] font-medium">
              Character
              <svg width="10" height="6" viewBox="0 0 10 6" className="shrink-0">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="hidden group-hover:block group-focus-within:block absolute top-full left-1/2 -translate-x-1/2 mt-3.5 bg-ink-soft border border-gold/20 rounded-2xl p-2 min-w-[200px] shadow-2xl z-30">
              <Link href="/character/creator" className="block px-3.5 py-2.5 rounded-lg text-parchment text-sm font-medium hover:bg-white/5">Create a character</Link>
              <Link href="/signup" className="block px-3.5 py-2.5 rounded-lg text-parchment text-sm font-medium hover:bg-white/5">Manage characters</Link>
            </div>
          </div>
          <Link href="/profile" className="text-parchment text-[15px] font-semibold">Profile</Link>
        </nav>
      </header>

      <div
        className="relative px-5 pt-[clamp(36px,8vw,60px)] pb-[clamp(48px,10vw,80px)] overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(58,110,165,0.2), transparent 65%), linear-gradient(180deg, #0d1b1e 0%, #142a2e 55%, #0d1b1e 100%)' }}
      >
        <div
          className="absolute rounded-full"
          style={{ top: 60, right: '12%', width: 70, height: 70, background: 'radial-gradient(circle at 35% 35%, #f5eedd, #d9c98a 70%)', boxShadow: '0 0 50px rgba(245,238,221,0.3)' }}
        />

        <div className="relative w-full max-w-[460px] mx-auto">
          <div className="rounded-[22px] p-[clamp(24px,6vw,40px)] border border-gold/20 shadow-2xl" style={{ background: 'linear-gradient(155deg, #1a3238, #10262a)' }}>
            <div className="flex items-center gap-4 mb-7.5">
              <div className="w-[58px] h-[58px] rounded-full border border-gold/35 text-gold flex items-center justify-center font-display text-xl font-bold shrink-0 overflow-hidden" style={{ background: 'radial-gradient(circle at 35% 30%, #3a6ea5, #1a3238)' }}>
                {profile.avatar_url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={profile.avatar_url} alt="" className="w-full h-full object-cover" />
                ) : (
                  displayName.charAt(0).toUpperCase()
                )}
              </div>
              <div>
                <h1 className="font-display font-semibold text-[22px] text-parchment mb-0.5">{displayName}</h1>
                <p className="text-[13.5px] text-muted">@{profile.username}</p>
              </div>
            </div>
            <ProfileForm initialProfile={profile} />
          </div>
        </div>
      </div>
    </div>
  );
}
