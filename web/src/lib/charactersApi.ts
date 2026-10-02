'use client';

import { createClient } from './supabase/client';
import type { CharacterDraft } from '@/app/character/creator/data';

// Client-side helpers for /api/characters — same auth pattern ProfileForm already
// uses (grab the current Supabase session's access token, send it as a bearer
// token), factored out here since both the character creator and the character
// manager need it, unlike ProfileForm's one-off inline version.

export type CharacterSummary = {
  id: string;
  name: string;
  playbook_id: string | null;
  era_name: string | null;
  icon_id: string | null; // key into ICONS (creator/data.ts), not a URL — see api/schema/0001_characters.sql
  updated_at: string;
};

export type CharacterRecord = CharacterSummary & {
  data: CharacterDraft;
  created_at: string;
};

async function authHeaders(): Promise<HeadersInit> {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session) throw new Error('Your session expired — please log in again.');
  return { 'Content-Type': 'application/json', Authorization: `Bearer ${session.access_token}` };
}

async function parseOrThrow<T>(res: Response, fallbackMessage: string): Promise<T> {
  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error ?? fallbackMessage);
  }
  return res.json();
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function listCharacters(): Promise<CharacterSummary[]> {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/api/characters`, { headers });
  return parseOrThrow(res, 'Could not load your characters.');
}

export async function getCharacter(id: string): Promise<CharacterRecord> {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/api/characters/${id}`, { headers });
  return parseOrThrow(res, 'Could not load that character.');
}

export async function createCharacter(draft: CharacterDraft): Promise<CharacterRecord> {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/api/characters`, { method: 'POST', headers, body: JSON.stringify(draft) });
  return parseOrThrow(res, 'Could not save your character.');
}

export async function updateCharacter(id: string, draft: CharacterDraft): Promise<CharacterRecord> {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/api/characters/${id}`, { method: 'PATCH', headers, body: JSON.stringify(draft) });
  return parseOrThrow(res, 'Could not save your character.');
}

export async function deleteCharacter(id: string): Promise<void> {
  const headers = await authHeaders();
  const res = await fetch(`${API_URL}/api/characters/${id}`, { method: 'DELETE', headers });
  await parseOrThrow(res, 'Could not delete that character.');
}
