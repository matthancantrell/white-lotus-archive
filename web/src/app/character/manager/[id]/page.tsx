import Link from 'next/link';
import { redirect, notFound } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { apiFetch } from '@/lib/api';
import LotusMark from '@/components/LotusMark';
import {
  BACKGROUNDS,
  CharacterDraft,
  ERAS,
  ERA_HEADER_LABEL,
  PLAYBOOKS,
  resolveIcon,
  STANDARD_GROWTH,
  TECHNIQUES,
  UNIVERSAL_TECHNIQUES,
  Technique,
  TechniqueLevel,
} from '../../creator/data';

const LEVEL_LABEL: Record<TechniqueLevel, string> = { L: 'Learned', P: 'Practiced', M: 'Mastered' };

function findPlaybook(id: string | null) {
  return id ? PLAYBOOKS.find((p) => p.id === id) ?? null : null;
}

function resolveTechnique(name: string, playbook: ReturnType<typeof findPlaybook>): Technique | null {
  if (playbook && playbook.startingTechnique.name === name) {
    return { ...playbook.startingTechnique, training: 'Universal' };
  }
  return UNIVERSAL_TECHNIQUES.find((t) => t.name === name) ?? TECHNIQUES.find((t) => t.name === name) ?? null;
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-7">
      <p className="font-display text-xs tracking-[0.15em] uppercase text-gold mb-3">{title}</p>
      {children}
    </div>
  );
}

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
  const draft = record.data;

  const playbook = findPlaybook(draft.playbookId);
  const era = draft.eraName ? ERAS.find((e) => e.name === draft.eraName) ?? null : null;
  const icon = resolveIcon(record.icon_id);
  const selectedBackgrounds = BACKGROUNDS.filter((b) => draft.backgrounds.includes(b.name));
  const techniqueEntries = Object.entries(draft.techniqueLevels) as [string, TechniqueLevel][];

  return (
    <div className="bg-ink text-parchment min-h-screen font-body">
      <header className="sticky top-0 z-20 flex items-center justify-between flex-wrap gap-y-3 px-[clamp(20px,6vw,56px)] py-[clamp(14px,3vw,20px)] bg-ink/85 backdrop-blur-md border-b border-gold/15">
        <Link href="/" className="flex items-center gap-3">
          <LotusMark size={34} />
          <span className="font-display font-bold text-lg tracking-wide text-parchment">White Lotus Archive</span>
        </Link>
        <Link href="/character/manager" className="text-parchment-dim text-[15px] font-medium hover:text-parchment">&larr; Your characters</Link>
      </header>

      <main className="max-w-3xl mx-auto px-[clamp(16px,5vw,40px)] py-[clamp(28px,5vw,44px)]">
        <div className="flex items-center gap-4 mb-2">
          {icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={icon.url} alt="" className="w-14 h-14 rounded-full object-cover shrink-0 border border-gold/30" />
          ) : (
            <div className="w-14 h-14 rounded-full shrink-0 border border-gold/20 bg-white/6" />
          )}
          <div>
            <h1 className="font-display font-semibold text-[28px] text-parchment">{draft.name || 'Unnamed character'}</h1>
            <p className="text-[13.5px] text-muted">
              {era ? ERA_HEADER_LABEL[era.name] || era.name : 'No era yet'} &middot; {playbook ? playbook.name : 'No playbook yet'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-8">
          <Link href={`/character/creator?id=${id}`} className="px-4 py-2 rounded-full bg-white/8 border border-white/20 text-parchment text-[13px] font-semibold hover:bg-white/12">
            Edit character
          </Link>
        </div>

        {playbook && (
          <Section title="Playbook">
            <div className="p-5.5 rounded-2xl bg-ink-soft border border-gold/20">
              <p className="font-display font-semibold text-lg text-parchment mb-1">{playbook.name}</p>
              <p className="text-xs text-gold tracking-wide mb-3">{playbook.principles.join(' / ')}</p>
              <p className="text-[13.5px] leading-relaxed text-parchment-dim mb-4">{playbook.tagline}</p>

              <p className="font-display text-xs tracking-wide uppercase text-gold mb-2">Stats</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {(Object.keys(playbook.stats) as (keyof typeof playbook.stats)[]).map((key) => {
                  const base = playbook.stats[key];
                  const bonus = draft.statBonus === key ? 1 : 0;
                  const val = base + bonus;
                  return (
                    <div key={key} className="px-3 py-1.5 rounded-full bg-white/6 border border-white/15 text-[12.5px] text-[#e8ddc4] capitalize">
                      <strong className="text-gold font-bold">{key}</strong> {val >= 0 ? `+${val}` : val}
                    </div>
                  );
                })}
              </div>

              <p className="font-display text-xs tracking-wide uppercase text-gold mb-2">Moves ({draft.selectedMoves.length}/2)</p>
              <div className="flex flex-col gap-2 mb-4">
                {playbook.moves
                  .filter((mv) => draft.selectedMoves.includes(mv.name))
                  .map((mv) => (
                    <div key={mv.name} className="p-3.5 rounded-xl bg-panel border border-gold/15">
                      <p className="font-display font-semibold text-sm text-gold mb-1">{mv.name}</p>
                      <p className="text-[13px] leading-relaxed text-[#b9c2bd]">{mv.effect}</p>
                    </div>
                  ))}
                {draft.selectedMoves.length === 0 && <p className="text-[13px] text-muted">No moves selected yet.</p>}
              </div>

              <p className="font-display text-xs tracking-wide uppercase text-gold mb-1.5">Feature &middot; {playbook.feature.name}</p>
              <p className="text-[13px] leading-relaxed text-[#b9c2bd]">{playbook.feature.effect}</p>
            </div>
          </Section>
        )}

        <Section title="Balance">
          <p className="text-[13.5px] text-parchment-dim">
            {playbook ? (
              <>
                Centered between <span className="text-[#9ec4e8]">{playbook.principles[0]}</span> and{' '}
                <span className="text-[#e8927a]">{playbook.principles[1]}</span>, shifted{' '}
                {draft.balanceShift === 0 ? 'to center' : draft.balanceShift > 0 ? `+${draft.balanceShift} toward ${playbook.principles[1]}` : `${draft.balanceShift} toward ${playbook.principles[0]}`}.
              </>
            ) : (
              'No playbook chosen yet.'
            )}
          </p>
        </Section>

        <Section title="Training">
          <p className="text-[13.5px] text-parchment-dim mb-1">
            <span className="text-faint">Training:</span> {draft.trainingName || 'not chosen'}
          </p>
          <p className="text-[13.5px] text-parchment-dim">
            <span className="text-faint">Fighting style:</span> {draft.fightingStyle || 'not written yet'}
          </p>
        </Section>

        <Section title={`Techniques (${techniqueEntries.length})`}>
          {techniqueEntries.length === 0 && <p className="text-[13px] text-muted">No techniques selected yet.</p>}
          <div className="flex flex-col gap-2">
            {techniqueEntries.map(([name, level]) => {
              const t = resolveTechnique(name, playbook);
              return (
                <div key={name} className="p-3.5 rounded-xl bg-ink-soft border border-gold/15">
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <p className="font-display font-semibold text-sm text-gold">{name}</p>
                    <span className="text-[10px] tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-gold text-gold-ink font-bold">{LEVEL_LABEL[level]}</span>
                  </div>
                  {t && <p className="text-[13px] leading-relaxed text-[#b9c2bd]">{t.effect}</p>}
                </div>
              );
            })}
          </div>
        </Section>

        <Section title="Concept">
          <div className="flex flex-col gap-4">
            {selectedBackgrounds.length > 0 && (
              <div>
                <p className="text-xs text-faint mb-1">Background</p>
                <p className="text-[13.5px] text-parchment-dim">{selectedBackgrounds.map((b) => b.name).join(', ')}</p>
              </div>
            )}
            {draft.hometown && (
              <div>
                <p className="text-xs text-faint mb-1">Hometown</p>
                <p className="text-[13.5px] text-parchment-dim leading-relaxed">{draft.hometown}</p>
              </div>
            )}
            {draft.look && (
              <div>
                <p className="text-xs text-faint mb-1">Look</p>
                <p className="text-[13.5px] text-parchment-dim leading-relaxed">{draft.look}</p>
              </div>
            )}
            {draft.demeanor && (
              <div>
                <p className="text-xs text-faint mb-1">Demeanor</p>
                <p className="text-[13.5px] text-parchment-dim leading-relaxed">{draft.demeanor}</p>
              </div>
            )}
            {playbook && draft.history.some((a) => a.trim()) && (
              <div>
                <p className="text-xs text-faint mb-2">History</p>
                <div className="flex flex-col gap-3">
                  {playbook.history.map((q, i) =>
                    draft.history[i]?.trim() ? (
                      <div key={i}>
                        <p className="text-[13px] text-[#e8ddc4] mb-1">{q}</p>
                        <p className="text-[13.5px] text-parchment-dim leading-relaxed">{draft.history[i]}</p>
                      </div>
                    ) : null
                  )}
                </div>
              </div>
            )}
          </div>
        </Section>

        <Section title={`Connections (${draft.connections.filter((c) => c.name.trim()).length})`}>
          <div className="flex flex-col gap-2">
            {draft.connections.filter((c) => c.name.trim()).map((c, i) => (
              <div key={i} className="p-3.5 rounded-xl bg-ink-soft border border-gold/15">
                <p className="font-display font-semibold text-sm text-parchment mb-0.5">{c.name}</p>
                <p className="text-[13px] text-[#b9c2bd]">{c.note}</p>
              </div>
            ))}
            {draft.connections.filter((c) => c.name.trim()).length === 0 && <p className="text-[13px] text-muted">No connections added yet.</p>}
          </div>
        </Section>

        <Section title="Growth">
          <div className="flex flex-col gap-2">
            {STANDARD_GROWTH.map((q) => (
              <div key={q} className="px-4 py-3 rounded-xl bg-panel border border-gold/14 text-[13px] text-[#e8ddc4]">{q}</div>
            ))}
            {playbook && (
              <div className="px-4 py-3 rounded-xl bg-gold/8 border border-gold/30 text-[13px] text-parchment">
                <span className="text-gold font-semibold">{playbook.name}: </span>
                {playbook.growth}
              </div>
            )}
          </div>
        </Section>
      </main>
    </div>
  );
}
