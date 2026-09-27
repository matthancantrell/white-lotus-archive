import { notFound } from 'next/navigation';
import { apiFetch } from '@/lib/api';
import { CharacterDraft, INITIAL_DRAFT } from '../creator/data';
import CharacterSheet from '../manager/[id]/CharacterSheet';

// The public, read-only view of a character — no login required. Visibility
// is enforced entirely by the API's /public endpoint (404s for both a
// nonexistent id and a private character), not by anything checked here.
export default async function PublicCharacterPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const res = await apiFetch(`/api/characters/${id}/public`, { cache: 'no-store' });
  if (res.status === 404) notFound();
  if (!res.ok) {
    const body = await res.text();
    console.error('Public character fetch failed:', res.status, res.statusText, body);
    throw new Error('Could not load this character.');
  }
  const record: { data: CharacterDraft; icon_id: string | null } = await res.json();
  // Same backfill reasoning as the owner-only page: a character saved before
  // a field existed won't have it in its stored JSON.
  const draft: CharacterDraft = { ...INITIAL_DRAFT, ...record.data };

  return <CharacterSheet characterId={id} initialDraft={draft} iconId={record.icon_id} readOnly />;
}
