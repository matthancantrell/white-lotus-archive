import Link from 'next/link';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { createClient } from '@/lib/supabase/server';
import { apiFetch } from '@/lib/api';
import LotusMark from '@/components/LotusMark';
import { ERA_HEADER_LABEL, PLAYBOOKS, resolveIcon } from '../creator/data';
import { ConfirmSubmitButton } from './ConfirmSubmitButton';

// Mirrors the API's CharacterSummary (web/src/lib/charactersApi.ts) — see
// api/schema/0001_characters.sql for the full field-by-field reasoning.
type CharacterSummary = {
  id: string;
  name: string;
  playbook_id: string | null;
  era_name: string | null;
  icon_id: string | null;
  updated_at: string;
};

export default async function CharacterManagerPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) redirect('/login');

  const res = await apiFetch('/api/characters', {
    headers: { Authorization: `Bearer ${session.access_token}` },
    cache: 'no-store',
  });

  if (!res.ok) {
    const body = await res.text();
    console.error('Character list fetch failed:', res.status, res.statusText, body);
    throw new Error('Could not load your characters.');
  }
  const characters: CharacterSummary[] = await res.json();

  async function deleteCharacter(id: string) {
    'use server';
    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;
    await apiFetch(`/api/characters/${id}`, {
      method: 'DELETE',
      headers: { Authorization: `Bearer ${session.access_token}` },
    });
    revalidatePath('/character/manager');
  }

  return (
    <div className="bg-ink text-parchment min-h-screen font-body">
      <header className="sticky top-0 z-20 flex items-center justify-between flex-wrap gap-y-3 px-[clamp(20px,6vw,56px)] py-[clamp(14px,3vw,20px)] bg-ink/85 backdrop-blur-md border-b border-gold/15">
        <Link href="/" className="flex items-center gap-3">
          <LotusMark size={34} />
          <span className="font-display font-bold text-lg tracking-wide text-parchment">White Lotus Archive</span>
        </Link>
        <nav className="flex items-center gap-[clamp(16px,3vw,36px)] flex-wrap">
          <Link href="/character/creator" className="hidden sm:inline text-parchment-dim text-[15px] font-medium hover:text-parchment">New character</Link>
          <Link href="/profile" className="text-parchment-dim text-[15px] font-medium hover:text-parchment">Profile</Link>
        </nav>
      </header>

      <div
        className="relative px-5 pt-[clamp(36px,8vw,60px)] pb-[clamp(48px,10vw,80px)] overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(58,110,165,0.2), transparent 65%), linear-gradient(180deg, #0d1b1e 0%, #142a2e 55%, #0d1b1e 100%)' }}
      >
        <div
          className="absolute rounded-full"
          style={{ top: 60, right: '12%', width: 70, height: 70, background: 'radial-gradient(circle at 35% 30%, #f5eedd, #d9c98a 70%)', boxShadow: '0 0 50px rgba(245,238,221,0.3)' }}
        />

        <div className="relative w-full max-w-3xl mx-auto">
          <div className="flex items-center justify-between gap-4 flex-wrap mb-7">
            <h1 className="font-display font-semibold text-2xl text-parchment">Your characters</h1>
            <Link href="/character/creator" className="bg-gold text-gold-ink px-5.5 py-2.5 rounded-full text-sm font-bold hover:brightness-95 whitespace-nowrap">
              + New character
            </Link>
          </div>

          {characters.length === 0 ? (
            <div className="rounded-[22px] p-[clamp(24px,6vw,40px)] border border-gold/20 shadow-2xl text-center" style={{ background: 'linear-gradient(155deg, #1a3238, #10262a)' }}>
              <p className="font-display font-semibold text-lg text-parchment mb-2">No characters yet</p>
              <p className="text-[14.5px] text-muted mb-6">Start your first saga with a guided walk through playbooks, training, and growth.</p>
              <Link href="/character/creator" className="inline-block bg-gold text-gold-ink px-6.5 py-3 rounded-full text-[14.5px] font-bold hover:brightness-95">
                Create a character
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-3.5">
              {characters.map((ch) => {
                const playbookName = ch.playbook_id ? PLAYBOOKS.find((p) => p.id === ch.playbook_id)?.name : null;
                const eraLabel = ch.era_name ? ERA_HEADER_LABEL[ch.era_name] || ch.era_name : null;
                const icon = resolveIcon(ch.icon_id);
                return (
                  <div
                    key={ch.id}
                    className="flex items-center justify-between gap-4 flex-wrap rounded-2xl p-5.5 border border-gold/20"
                    style={{ background: 'linear-gradient(155deg, #1a3238, #10262a)' }}
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      {icon ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={icon.url} alt="" className="w-11 h-11 rounded-full object-cover shrink-0 border border-gold/30" />
                      ) : (
                        <div className="w-11 h-11 rounded-full shrink-0 border border-gold/20 bg-white/6" />
                      )}
                      <div className="min-w-0">
                        <p className="font-display font-semibold text-lg text-parchment mb-1 break-words">{ch.name || 'Unnamed character'}</p>
                        <p className="text-[13px] text-muted">
                          {playbookName || 'No playbook yet'} &middot; {eraLabel || 'No era yet'} &middot; Last edited{' '}
                          {new Date(ch.updated_at).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap shrink-0">
                      <Link href={`/character/manager/${ch.id}`} className="px-4 py-2 rounded-full bg-white/8 border border-white/20 text-parchment text-[13px] font-semibold hover:bg-white/12">
                        View sheet
                      </Link>
                      <Link href={`/character/creator?id=${ch.id}`} className="px-4 py-2 rounded-full bg-white/8 border border-white/20 text-parchment text-[13px] font-semibold hover:bg-white/12">
                        Edit
                      </Link>
                      <form action={deleteCharacter.bind(null, ch.id)}>
                        <ConfirmSubmitButton
                          confirmMessage={`Delete ${ch.name || 'this character'}? This can't be undone.`}
                          className="px-4 py-2 rounded-full bg-transparent border border-[#d97a5c]/40 text-[#e8927a] text-[13px] font-semibold hover:bg-[#d97a5c]/10"
                        >
                          Delete
                        </ConfirmSubmitButton>
                      </form>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
