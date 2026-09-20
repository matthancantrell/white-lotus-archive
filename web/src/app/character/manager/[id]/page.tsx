import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { apiFetch } from '@/lib/api';
import { CharacterDraft, INITIAL_DRAFT } from '../../creator/data';
import CharacterSheet from './CharacterSheet';

export default async function CharacterSheetPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) redirect('/login');

  const res = await apiFetch(`/api/characters/${id}`, {
    headers: { Authorization: `Bearer ${session.access_token}` },
    cache: 'no-store',
  });
  if (res.status === 404) notFound();
  if (!res.ok) {
    const body = await res.text();
    console.error('Character fetch failed:', res.status, res.statusText, body);
    throw new Error('Could not load this character.');
  }
  const record: { data: CharacterDraft; icon_id: string | null } = await res.json();
  // Merge under INITIAL_DRAFT rather than trusting the saved shape as-is — same
  // reasoning as the creator's load path: characters saved before a field
  // existed (e.g. conditions, fatigueMarked) won't have it in their stored JSON.
  const draft: CharacterDraft = { ...INITIAL_DRAFT, ...record.data };

  return <CharacterSheet characterId={id} initialDraft={draft} iconId={record.icon_id} />;
}
