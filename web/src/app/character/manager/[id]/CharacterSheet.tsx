'use client';

import { useState } from 'react';
import Link from 'next/link';
import LotusMark from '@/components/LotusMark';
import { updateCharacter } from '@/lib/charactersApi';
import {
  ADVANCEMENTS,
  APPROACH_LABEL,
  BACKGROUNDS,
  BALANCE_TRACK_DARK_FISH_URL,
  BALANCE_TRACK_LIGHT_FISH_URL,
  CharacterDraft,
  CONDITIONS,
  ERAS,
  ERA_HEADER_LABEL,
  JournalEntry,
  MAX_FATIGUE,
  PLAYBOOKS,
  Playbook,
  resolveIcon,
  STANDARD_GROWTH,
  Stats,
  TECHNIQUES,
  Technique,
  TechniqueLevel,
  UNIVERSAL_MOVES,
  UNIVERSAL_TECHNIQUES,
} from '../../creator/data';

const LEVEL_LABEL: Record<TechniqueLevel, string> = { L: 'Learned', P: 'Practiced', M: 'Mastered' };
const STAT_ROWS: [keyof Stats, string][] = [
  ['creativity', 'Creativity'],
  ['focus', 'Focus'],
  ['harmony', 'Harmony'],
  ['passion', 'Passion'],
];

const TABS = ['moves', 'techniques', 'concept', 'growth', 'extras', 'journal'] as const;
type Tab = (typeof TABS)[number];
const TAB_LABELS: Record<Tab, string> = {
  moves: 'Moves & Features',
  techniques: 'Techniques',
  concept: 'Concept & Details',
  growth: 'Growth',
  extras: 'Extras',
  journal: 'Journal',
};

function resolveTechnique(name: string, playbook: Playbook | null): Technique | null {
  if (playbook && playbook.startingTechnique.name === name) {
    return { ...playbook.startingTechnique, training: 'Universal' };
  }
  return UNIVERSAL_TECHNIQUES.find((t) => t.name === name) ?? TECHNIQUES.find((t) => t.name === name) ?? null;
}

// The uppercase-gold-label + content block used for every section across the
// tabs below — one place to change the "banner label" treatment.
function Section({ title, children, className = '' }: { title: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="font-display text-xs tracking-[0.15em] uppercase text-gold mb-3">{title}</p>
      {children}
    </div>
  );
}

export default function CharacterSheet({
  characterId,
  initialDraft,
  iconId,
}: {
  characterId: string;
  initialDraft: CharacterDraft;
  iconId: string | null;
}) {
  const [draft, setDraft] = useState(initialDraft);
  const [tab, setTab] = useState<Tab>('moves');
  const [saveError, setSaveError] = useState<string | null>(null);
  const [darkFishFailed, setDarkFishFailed] = useState(false);
  const [lightFishFailed, setLightFishFailed] = useState(false);

  const playbook = draft.playbookId ? PLAYBOOKS.find((p) => p.id === draft.playbookId) ?? null : null;
  const era = draft.eraName ? ERAS.find((e) => e.name === draft.eraName) ?? null : null;
  const icon = resolveIcon(iconId);

  async function persist(next: CharacterDraft) {
    setDraft(next);
    setSaveError(null);
    try {
      await updateCharacter(characterId, next);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Could not save that change.');
    }
  }

  function toggleCondition(name: string) {
    const has = draft.conditions.includes(name);
    persist({ ...draft, conditions: has ? draft.conditions.filter((c) => c !== name) : [...draft.conditions, name] });
  }

  function clickFatigue(i: number) {
    // Clicking the topmost marked box clears it; clicking anywhere else fills
    // up to and including that box — a simple clock-fill, not independent checkboxes.
    persist({ ...draft, fatigueMarked: i + 1 === draft.fatigueMarked ? i : i + 1 });
  }

  function addJournalEntry(title: string, body: string) {
    const entry: JournalEntry = { id: crypto.randomUUID(), title, body, createdAt: new Date().toISOString() };
    persist({ ...draft, journalEntries: [entry, ...draft.journalEntries] });
  }

  const balancePos = Math.max(-3, Math.min(3, draft.balanceShift));

  return (
    <div className="bg-ink text-parchment min-h-screen font-body">
      <header className="sticky top-0 z-20 flex items-center justify-between flex-wrap gap-y-3 px-[clamp(20px,6vw,56px)] py-[clamp(14px,3vw,20px)] bg-ink/85 backdrop-blur-md border-b border-gold/15">
        <Link href="/" className="flex items-center gap-3">
          <LotusMark size={34} />
          <span className="font-display font-bold text-lg tracking-wide text-parchment">White Lotus Archive</span>
        </Link>
        <Link href="/character/manager" className="text-parchment-dim text-[15px] font-medium hover:text-parchment">&larr; Your characters</Link>
      </header>

      <main className="max-w-5xl mx-auto px-[clamp(16px,5vw,40px)] py-[clamp(28px,5vw,44px)]">
        <div className="flex items-center gap-4 mb-2">
          {icon ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={icon.url} alt="" className="w-14 h-14 rounded-full object-cover shrink-0 border border-gold/30" />
          ) : (
            <div className="w-14 h-14 rounded-full shrink-0 border border-gold/20 bg-white/6" />
          )}
          <div>
            <h1 className="font-display font-semibold text-[28px] text-parchment">
              {draft.name || 'Unnamed character'}
              {playbook && <span className="text-gold ml-2 text-[15px] font-medium tracking-wide">{playbook.name}</span>}
            </h1>
            <p className="text-[13.5px] text-muted">
              {era ? ERA_HEADER_LABEL[era.name] || era.name : 'No era yet'} &middot; {draft.trainingName || 'No training yet'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mb-6">
          <Link href={`/character/creator?id=${characterId}`} className="px-4 py-2 rounded-full bg-white/8 border border-white/20 text-parchment text-[13px] font-semibold hover:bg-white/12">
            Edit character
          </Link>
          {saveError && <span className="text-[12.5px] text-[#e8927a]">{saveError}</span>}
        </div>

        {/* Stats / Balance / Conditions — the sheet's always-visible main panel. */}
        <div className="rounded-2xl border border-gold/25 bg-ink-soft p-6 mb-8">
          <div className="grid gap-8 sm:grid-cols-[1fr_1.4fr_1fr]">
            <div>
              <p className="font-display text-xs tracking-[0.15em] uppercase text-gold mb-3 text-center sm:text-left">Stats</p>
              <div className="flex flex-col gap-2.5">
                {STAT_ROWS.map(([key, label]) => {
                  const base = playbook ? playbook.stats[key] : 0;
                  const bonus = draft.statBonus === key ? 1 : 0;
                  const val = base + bonus;
                  return (
                    <div key={key} className="flex items-center gap-3 justify-center sm:justify-start">
                      <div className="w-8 h-8 rounded-full border border-gold/40 bg-white/6 flex items-center justify-center text-[12px] font-bold text-gold shrink-0">
                        {val >= 0 ? `+${val}` : val}
                      </div>
                      <span className="font-display text-sm text-parchment">{label}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            <div>
              <p className="font-display text-xs tracking-[0.15em] uppercase text-gold mb-3 text-center">Balance</p>
              <div
                className="relative rounded-xl border border-gold/20 px-3 pt-14 pb-14 overflow-hidden min-h-[168px]"
                style={{ background: 'radial-gradient(circle, rgba(232,200,116,0.06), rgba(0,0,0,0.15))' }}
              >
                {/* Dark koi arcing over the top half, light koi arcing under the bottom
                    half — together framing the single balance row like a yin-yang. */}
                {!darkFishFailed && (
                  // eslint-disable-next-line @next/next/no-img-element -- bucket-hosted, hidden gracefully if not uploaded yet.
                  <img
                    src={BALANCE_TRACK_DARK_FISH_URL}
                    alt=""
                    className="absolute inset-x-0 top-0 w-full h-20 object-contain opacity-60 pointer-events-none"
                    onError={() => setDarkFishFailed(true)}
                  />
                )}
                {!lightFishFailed && (
                  // eslint-disable-next-line @next/next/no-img-element -- bucket-hosted, hidden gracefully if not uploaded yet.
                  <img
                    src={BALANCE_TRACK_LIGHT_FISH_URL}
                    alt=""
                    className="absolute inset-x-0 bottom-0 w-full h-20 object-contain opacity-60 pointer-events-none"
                    onError={() => setLightFishFailed(true)}
                  />
                )}

                <div className="relative flex items-center justify-between text-[10px] font-display uppercase tracking-wide text-parchment-dim mb-3 px-1">
                  <span>{playbook ? playbook.principles[0] : 'Principle'}</span>
                  <span>{playbook ? playbook.principles[1] : 'Principle'}</span>
                </div>
                <div className="relative flex items-center justify-center gap-1.5">
                  {[-3, -2, -1, 0, 1, 2, 3].map((n) => (
                    <div
                      key={n}
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold border ${
                        n === balancePos ? 'bg-gold text-gold-ink border-gold' : 'bg-ink/70 text-parchment-dim border-white/20'
                      }`}
                    >
                      {n > 0 ? `+${n}` : n}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="font-display text-xs tracking-[0.15em] uppercase text-gold mb-3 text-center sm:text-right">Conditions</p>
              <div className="flex flex-col gap-2">
                {CONDITIONS.map((cond) => {
                  const marked = draft.conditions.includes(cond.name);
                  return (
                    <label key={cond.name} className="flex items-start gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        checked={marked}
                        onChange={() => toggleCondition(cond.name)}
                        className="mt-0.5 w-3.5 h-3.5 accent-[#e8c874] shrink-0"
                      />
                      <span>
                        <span className={`text-[12.5px] font-display font-semibold uppercase tracking-wide ${marked ? 'text-gold' : 'text-parchment'}`}>
                          {cond.name}
                        </span>
                        <span className="block text-[11px] text-muted leading-snug">{cond.effect}</span>
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 justify-center mt-6 pt-5 border-t border-gold/15">
            <span className="font-display text-xs tracking-[0.15em] uppercase text-gold">Fatigue</span>
            <div className="flex gap-1.5">
              {Array.from({ length: MAX_FATIGUE }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => clickFatigue(i)}
                  aria-label={`Mark fatigue up to ${i + 1}`}
                  className={`w-4 h-4 rotate-45 border ${i < draft.fatigueMarked ? 'bg-gold border-gold' : 'bg-transparent border-white/25'}`}
                />
              ))}
            </div>
            {draft.fatigueMarked > 0 && (
              <button onClick={() => persist({ ...draft, fatigueMarked: 0 })} className="text-[11px] text-faint hover:text-parchment-dim uppercase tracking-wide">
                Reset
              </button>
            )}
          </div>
        </div>

        {/* Tab bar */}
        <div className="flex items-center gap-1 mb-6 border-b border-gold/20 overflow-x-auto hide-scrollbar">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3.5 py-2.5 text-[13px] font-display whitespace-nowrap ${
                tab === t ? 'text-gold border-b-2 border-gold' : 'text-parchment-dim hover:text-parchment'
              }`}
            >
              {TAB_LABELS[t]}
            </button>
          ))}
        </div>

        {tab === 'moves' && <MovesFeaturesTab draft={draft} playbook={playbook} />}
        {tab === 'techniques' && <TechniquesTab draft={draft} playbook={playbook} />}
        {tab === 'concept' && <ConceptDetailsTab draft={draft} playbook={playbook} />}
        {tab === 'growth' && <GrowthTab playbook={playbook} />}
        {tab === 'extras' && <ExtrasTab />}
        {tab === 'journal' && <JournalTab entries={draft.journalEntries} onAdd={addJournalEntry} />}
      </main>
    </div>
  );
}

function MovesFeaturesTab({ draft, playbook }: { draft: CharacterDraft; playbook: Playbook | null }) {
  return (
    <div className="grid gap-8 sm:grid-cols-[1.3fr_1fr]">
      <Section title="Universal Moves">
        <div className="flex flex-col gap-2">
          {UNIVERSAL_MOVES.map((mv) => (
            <div key={mv.name} className="p-3.5 rounded-xl bg-ink-soft border border-gold/15">
              <div className="flex items-center justify-between gap-2 flex-wrap mb-1">
                <p className="font-display font-semibold text-sm text-parchment">{mv.name}</p>
                <span className="text-[10px] tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-white/8 text-parchment-dim">
                  {mv.category === 'Balance' ? 'Balance' : mv.rollsWith ?? 'Basic'}
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-[#b9c2bd]">{mv.effect}</p>
            </div>
          ))}
        </div>
      </Section>

      {playbook ? (
        <Section title="Playbook Moves">
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
          <div className="flex flex-col gap-2">
            {playbook.feature.effect.map((p, i) => (
              <p key={i} className="text-[13px] leading-relaxed text-[#b9c2bd]">{p}</p>
            ))}
          </div>
        </Section>
      ) : (
        <Section title="Playbook Moves">
          <p className="text-[13px] text-muted">No playbook chosen yet.</p>
        </Section>
      )}
    </div>
  );
}

function TechniquesTab({ draft, playbook }: { draft: CharacterDraft; playbook: Playbook | null }) {
  const techniqueEntries = Object.entries(draft.techniqueLevels) as [string, TechniqueLevel][];
  return (
    <Section title="Techniques">
      <div className="flex flex-col gap-2">
        {UNIVERSAL_TECHNIQUES.map((t) => (
          <div key={t.name} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-ink-soft border border-gold/15">
            <div>
              <p className="font-display font-semibold text-sm text-parchment">{t.name}</p>
              <p className="text-[12px] text-muted">Universal &middot; {APPROACH_LABEL[t.approach]}</p>
            </div>
            <span className="text-[10px] tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-gold text-gold-ink font-bold shrink-0">Mastered</span>
          </div>
        ))}

        {playbook && (
          <div className="flex items-center justify-between gap-3 p-3 rounded-xl bg-panel border border-gold/25">
            <div>
              <p className="font-display font-semibold text-sm text-gold">{playbook.startingTechnique.name}</p>
              <p className="text-[12px] text-muted">Playbook &middot; {APPROACH_LABEL[playbook.startingTechnique.approach]}</p>
            </div>
            <span className="text-[10px] tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-gold text-gold-ink font-bold shrink-0">Mastered</span>
          </div>
        )}

        {techniqueEntries.map(([name, level]) => {
          const t = resolveTechnique(name, playbook);
          if (!t) return null;
          return (
            <div key={name} className="flex items-center justify-between gap-3 p-3 rounded-xl bg-ink-soft border border-gold/15">
              <div>
                <p className="font-display font-semibold text-sm text-parchment">{name}</p>
                <p className="text-[12px] text-muted">{t.training} &middot; {APPROACH_LABEL[t.approach]}</p>
              </div>
              <span className="text-[10px] tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-gold text-gold-ink font-bold shrink-0">{LEVEL_LABEL[level]}</span>
            </div>
          );
        })}

        {techniqueEntries.length === 0 && !playbook && <p className="text-[13px] text-muted">No techniques selected yet.</p>}
      </div>
    </Section>
  );
}

function ConceptDetailsTab({ draft, playbook }: { draft: CharacterDraft; playbook: Playbook | null }) {
  const selectedBackgrounds = BACKGROUNDS.filter((b) => draft.backgrounds.includes(b.name));
  return (
    <div className="flex flex-col gap-7">
      <Section title="Background">
        {selectedBackgrounds.length > 0 ? (
          <div className="flex flex-col gap-2">
            {selectedBackgrounds.map((b) => (
              <div key={b.name} className="p-3.5 rounded-xl bg-ink-soft border border-gold/15">
                <p className="font-display font-semibold text-sm text-gold mb-1">{b.name}</p>
                <p className="text-[13px] leading-relaxed text-[#b9c2bd]">{b.desc}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-[13px] text-muted">No background chosen yet.</p>
        )}
      </Section>

      <Section title="Demeanor">
        <p className="text-[13.5px] text-parchment-dim leading-relaxed">{draft.demeanor || 'Not written yet.'}</p>
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

      <Section title="Description">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs text-faint mb-1">Looks</p>
            <p className="text-[13.5px] text-parchment-dim leading-relaxed">{draft.look || 'Not written yet.'}</p>
          </div>
          <div>
            <p className="text-xs text-faint mb-1">Hometown</p>
            <p className="text-[13.5px] text-parchment-dim leading-relaxed">{draft.hometown || 'Not written yet.'}</p>
          </div>
        </div>
      </Section>

      {playbook && draft.history.some((a) => a.trim()) && (
        <Section title="History">
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
        </Section>
      )}

      <Section title="Campaign Details">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs text-faint mb-1">Campaign Focus</p>
            <p className="text-[13.5px] text-parchment-dim leading-relaxed">{draft.scopeText || 'Not written yet.'}</p>
          </div>
          <div>
            <p className="text-xs text-faint mb-1">Group Focus</p>
            <p className="text-[13.5px] text-parchment-dim leading-relaxed">{draft.groupFocusesText || 'Not written yet.'}</p>
          </div>
          <div>
            <p className="text-xs text-faint mb-1">Location</p>
            <p className="text-[13.5px] text-parchment-dim leading-relaxed">{draft.location || 'Not written yet.'}</p>
          </div>
        </div>
      </Section>
    </div>
  );
}

function GrowthTab({ playbook }: { playbook: Playbook | null }) {
  return (
    <div className="flex flex-col gap-7">
      <Section title="Growth Questions">
        <div className="flex flex-col gap-2">
          {STANDARD_GROWTH.map((q) => (
            <div key={q} className="px-4 py-3 rounded-xl bg-panel border border-gold/14 text-[13px] text-[#e8ddc4]">{q}</div>
          ))}
        </div>
      </Section>

      {playbook && (
        <Section title="Unique Playbook Question">
          <div className="px-4 py-3 rounded-xl bg-gold/8 border border-gold/30 mb-2">
            <p className="font-display font-semibold text-[13.5px] leading-relaxed text-parchment">{playbook.growth}</p>
          </div>
          <p className="text-[13.5px] leading-relaxed text-[#b9c2bd]">{playbook.growthDescription}</p>
        </Section>
      )}

      <Section title="Growth Advancements">
        <div className="flex flex-col gap-2">
          {ADVANCEMENTS.map((a) => (
            <div key={a} className="px-4 py-3 rounded-xl bg-ink-soft border border-gold/15 text-[13px] text-[#b9c2bd]">{a}</div>
          ))}
        </div>
      </Section>
    </div>
  );
}

function ExtrasTab() {
  return (
    <Section title="Extras Section">
      <p className="text-[13px] text-muted">No extra systems are available for this game yet.</p>
    </Section>
  );
}

function JournalTab({ entries, onAdd }: { entries: JournalEntry[]; onAdd: (title: string, body: string) => void }) {
  const [query, setQuery] = useState('');
  const [composing, setComposing] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const filtered = entries.filter(
    (e) => !query.trim() || e.title.toLowerCase().includes(query.toLowerCase()) || e.body.toLowerCase().includes(query.toLowerCase())
  );

  function submit() {
    if (!body.trim()) return;
    onAdd(title.trim() || 'Untitled entry', body.trim());
    setTitle('');
    setBody('');
    setComposing(false);
  }

  return (
    <Section title="Journal">
      <div className="flex items-center gap-3 mb-4">
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search your journal"
          className="flex-1 px-3.5 py-2 rounded-lg bg-panel border border-gold/20 text-[13px] text-parchment placeholder:text-faint focus:outline-none focus:border-gold/50"
        />
        <button
          onClick={() => setComposing((v) => !v)}
          className="px-4 py-2 rounded-full bg-white/8 border border-white/20 text-parchment text-[13px] font-semibold hover:bg-white/12 shrink-0"
        >
          New Entry
        </button>
      </div>

      {composing && (
        <div className="p-4 rounded-xl bg-ink-soft border border-gold/20 mb-4 flex flex-col gap-2.5">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="px-3 py-2 rounded-lg bg-panel border border-gold/20 text-[13px] text-parchment placeholder:text-faint focus:outline-none focus:border-gold/50"
          />
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="What happened?"
            rows={4}
            className="px-3 py-2 rounded-lg bg-panel border border-gold/20 text-[13px] text-parchment placeholder:text-faint focus:outline-none focus:border-gold/50 resize-none"
          />
          <div className="flex justify-end gap-2">
            <button onClick={() => setComposing(false)} className="px-3.5 py-1.5 rounded-full text-[12.5px] text-parchment-dim hover:text-parchment">Cancel</button>
            <button onClick={submit} className="px-3.5 py-1.5 rounded-full bg-gold text-gold-ink text-[12.5px] font-semibold">Save Entry</button>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        {filtered.map((e) => (
          <div key={e.id} className="p-3.5 rounded-xl bg-ink-soft border border-gold/15">
            <div className="flex items-center justify-between gap-2 mb-1">
              <p className="font-display font-semibold text-sm text-gold">{e.title}</p>
              <span className="text-[11px] text-faint shrink-0">{new Date(e.createdAt).toLocaleDateString()}</span>
            </div>
            <p className="text-[13px] leading-relaxed text-[#b9c2bd] whitespace-pre-wrap">{e.body}</p>
          </div>
        ))}
        {entries.length === 0 && <p className="text-[13px] text-muted">Your journal is empty — add a new entry above.</p>}
        {entries.length > 0 && filtered.length === 0 && <p className="text-[13px] text-muted">No entries match your search.</p>}
      </div>
    </Section>
  );
}
