'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import LotusMark from '@/components/LotusMark';
import { updateCharacter } from '@/lib/charactersApi';
import FeatureEffect from '../../creator/FeatureEffect';
import { highlightStats, rollsWithLabel } from '../../creator/highlightStats';
import CheckboxSquare from '../../creator/CheckboxSquare';
import { TextArea, TextField } from '../../creator/TextField';
import {
  ADVANCEMENTS,
  APPROACH_LABEL,
  BACKGROUNDS,
  BALANCE_TRACK_DARK_FISH_URL,
  BALANCE_TRACK_LIGHT_FISH_URL,
  CharacterDraft,
  Connection,
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

const LEVEL_LABEL: Record<TechniqueLevel, string> = { L: 'Learned', M: 'Mastered' };
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
    return { ...playbook.startingTechnique, training: ['Universal'], rare: false, legendary: false };
  }
  return UNIVERSAL_TECHNIQUES.find((t) => t.name === name) ?? TECHNIQUES.find((t) => t.name === name) ?? null;
}

// The uppercase-gold-label + content block used for every section across the
// tabs below — one place to change the "banner label" treatment.
function Section({
  title,
  children,
  className = '',
  centerTitle = false,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
  centerTitle?: boolean;
}) {
  return (
    <div className={className}>
      <p className={`font-display text-xs tracking-[0.15em] uppercase text-gold mb-3 ${centerTitle ? 'text-center' : ''}`}>{title}</p>
      {children}
    </div>
  );
}

export default function CharacterSheet({
  characterId,
  initialDraft,
  iconId,
  readOnly = false,
}: {
  characterId: string;
  initialDraft: CharacterDraft;
  iconId: string | null;
  // Set for the public character-view page (visitors who aren't the owner) —
  // hides every editing affordance (Edit character link, privacy toggle,
  // conditions/fatigue, Concept & Details fields, the Journal composer) and
  // never calls update()/the API. Expand-to-read-details (Moves, Techniques,
  // Journal entries) stays interactive either way — that's just local UI
  // state, not a persisted edit.
  readOnly?: boolean;
}) {
  const [draft, setDraft] = useState(initialDraft);
  const [tab, setTab] = useState<Tab>('moves');
  const [saveError, setSaveError] = useState<string | null>(null);
  const [darkFishFailed, setDarkFishFailed] = useState(false);
  const [lightFishFailed, setLightFishFailed] = useState(false);

  const playbook = draft.playbookId ? PLAYBOOKS.find((p) => p.id === draft.playbookId) ?? null : null;
  const era = draft.eraName ? ERAS.find((e) => e.name === draft.eraName) ?? null : null;
  const icon = resolveIcon(iconId);

  // The sheet has no Save button — every edit applies to local state right
  // away (so typing never feels laggy) and is sent to the API on a debounce,
  // so a whole sentence of typing (or a burst of clicks) becomes one PATCH
  // instead of one per keystroke/click. draftRef always holds the latest
  // draft so the debounced call — which fires well after the state update
  // that scheduled it — never sends a stale copy.
  const draftRef = useRef(draft);
  useEffect(() => {
    draftRef.current = draft;
  }, [draft]);
  const saveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function flushSave() {
    if (!saveTimer.current) return;
    clearTimeout(saveTimer.current);
    saveTimer.current = null;
    updateCharacter(characterId, draftRef.current).catch((err) => {
      setSaveError(err instanceof Error ? err.message : 'Could not save that change.');
    });
  }

  // Send the last pending edit even if the player navigates away before the
  // debounce would otherwise have fired.
  useEffect(() => flushSave, []); // eslint-disable-line react-hooks/exhaustive-deps

  function update(patch: Partial<CharacterDraft>) {
    setDraft((prev) => ({ ...prev, ...patch }));
    setSaveError(null);
    if (saveTimer.current) clearTimeout(saveTimer.current);
    saveTimer.current = setTimeout(flushSave, 800);
  }

  function toggleCondition(name: string) {
    const has = draft.conditions.includes(name);
    update({ conditions: has ? draft.conditions.filter((c) => c !== name) : [...draft.conditions, name] });
  }

  function clickFatigue(i: number) {
    // Clicking the topmost marked box clears it; clicking anywhere else fills
    // up to and including that box — a simple clock-fill, not independent checkboxes.
    update({ fatigueMarked: i + 1 === draft.fatigueMarked ? i : i + 1 });
  }

  function addJournalEntry(title: string, body: string) {
    const entry: JournalEntry = { id: crypto.randomUUID(), title, body, createdAt: new Date().toISOString() };
    update({ journalEntries: [entry, ...draft.journalEntries] });
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
            <div
              className="w-14 h-14 rounded-full border border-gold/35 text-gold flex items-center justify-center font-display text-xl font-bold shrink-0 overflow-hidden"
              style={{ background: 'radial-gradient(circle at 35% 30%, #3a6ea5, #1a3238)' }}
            >
              {(draft.name || 'Unnamed character').charAt(0).toUpperCase()}
            </div>
          )}
          <div>
            <h1 className="font-display font-semibold text-[28px] text-parchment">{draft.name || 'Unnamed character'}</h1>
            <p className="text-[13.5px] text-muted">
              {era ? ERA_HEADER_LABEL[era.name] || era.name : 'No era yet'} &middot; {playbook ? playbook.name : 'No playbook yet'} &middot; {draft.trainingName || 'No training yet'}
            </p>
          </div>
        </div>
        {!readOnly && (
          <div className="flex items-center gap-4 flex-wrap mb-6">
            <Link href={`/character/creator?id=${characterId}`} className="px-4 py-2 rounded-full bg-white/8 border border-white/20 text-parchment text-[13px] font-semibold hover:bg-white/12">
              Edit character
            </Link>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={!draft.isPrivate}
                onChange={(e) => update({ isPrivate: !e.target.checked })}
                className="w-[15px] h-[15px] accent-gold cursor-pointer"
              />
              <span className="text-[13px] text-parchment-dim">Public character</span>
            </label>
            {saveError && <span className="text-[12.5px] text-[#e8927a]">{saveError}</span>}
          </div>
        )}

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
                        disabled={readOnly}
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
                  disabled={readOnly}
                  aria-label={`Mark fatigue up to ${i + 1}`}
                  className={`w-4 h-4 rotate-45 border ${i < draft.fatigueMarked ? 'bg-gold border-gold' : 'bg-transparent border-white/25'}`}
                />
              ))}
            </div>
            {!readOnly && draft.fatigueMarked > 0 && (
              <button onClick={() => update({ fatigueMarked: 0 })} className="text-[11px] text-faint hover:text-parchment-dim uppercase tracking-wide">
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
        {tab === 'concept' && <ConceptDetailsTab draft={draft} playbook={playbook} onUpdate={update} readOnly={readOnly} />}
        {tab === 'growth' && <GrowthTab playbook={playbook} />}
        {tab === 'extras' && <ExtrasTab />}
        {tab === 'journal' && <JournalTab entries={draft.journalEntries} onAdd={addJournalEntry} readOnly={readOnly} />}
      </main>
    </div>
  );
}

function MovesFeaturesTab({ draft, playbook }: { draft: CharacterDraft; playbook: Playbook | null }) {
  const [expandedMoves, setExpandedMoves] = useState<Set<string>>(new Set());
  function toggleExpanded(name: string) {
    setExpandedMoves((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  // Universal moves plus whichever playbook moves were actually selected —
  // one flat list, not split by where the move came from.
  const playbookMoves = playbook ? playbook.moves.filter((mv) => draft.selectedMoves.includes(mv.name)) : [];
  const allMoves = [...UNIVERSAL_MOVES, ...playbookMoves];

  return (
    <div className="grid gap-8 sm:grid-cols-[1.3fr_1fr]">
      <Section title="Moves">
        <div className="flex items-center gap-3 px-4 mb-1.5">
          <span className="flex-1 text-[10px] tracking-wide uppercase text-parchment-dim">Name</span>
          <span className="w-24 shrink-0 text-[10px] tracking-wide uppercase text-parchment-dim text-center">Category</span>
          <span className="w-20 shrink-0 text-right text-[10px] tracking-wide uppercase text-parchment-dim">Roll With</span>
          <span className="w-7.5 shrink-0" />
        </div>
        <div className="flex flex-col gap-2">
          {allMoves.map((mv) => {
            const isPlaybookMove = playbookMoves.includes(mv);
            const expanded = expandedMoves.has(mv.name);
            return (
              <div
                key={mv.name}
                className="rounded-xl border overflow-hidden"
                style={{
                  background: isPlaybookMove ? '#142a2e' : '#0f2226',
                  borderColor: isPlaybookMove ? 'rgba(232,200,116,0.25)' : 'rgba(232,200,116,0.15)',
                }}
              >
                <button
                  type="button"
                  onClick={() => toggleExpanded(mv.name)}
                  aria-expanded={expanded}
                  className="w-full flex items-center gap-3 px-4 py-3 text-left"
                >
                  <p className={`flex-1 min-w-0 font-display font-semibold text-sm truncate ${isPlaybookMove ? 'text-gold' : 'text-parchment'}`}>
                    {mv.name}
                  </p>
                  <span className="w-24 shrink-0 text-[10px] tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-white/8 text-parchment-dim text-center">
                    {mv.category}
                  </span>
                  <span className="w-20 shrink-0 text-right text-[11.5px] text-parchment-dim uppercase tracking-wide">
                    {rollsWithLabel(mv.rollsWith) ?? '—'}
                  </span>
                  <svg
                    viewBox="0 0 16 16"
                    className="w-3 h-3 shrink-0 transition-transform"
                    style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}
                    fill="none"
                    stroke="#e8ddc4"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M3 5.5L8 10.5L13 5.5" />
                  </svg>
                </button>
                {expanded && (
                  <div className="px-4 pb-3.5 border-t border-white/10">
                    <p className="text-[13px] leading-relaxed text-[#b9c2bd] pt-3">{highlightStats(mv.details)}</p>
                  </div>
                )}
              </div>
            );
          })}
          {playbook && draft.selectedMoves.length === 0 && (
            <p className="text-[13px] text-muted mt-1">No playbook moves selected yet.</p>
          )}
        </div>
      </Section>

      <div className="flex flex-col gap-8">
        {playbook && (
          <Section title="Moment of Balance" centerTitle>
            <div className="p-4.5 rounded-xl bg-gold/6 border border-gold/30">
              <p className="text-[13.5px] leading-relaxed text-parchment-dim">{playbook.momentOfBalance}</p>
            </div>
          </Section>
        )}

        {playbook ? (
          <Section title={playbook.feature.name} centerTitle>
            <div className="rounded-xl border border-gold/15 bg-panel p-4">
              <FeatureEffect effect={playbook.feature.effect} />
            </div>
            {playbook.featureChoices.length > 0 && (
              <div className="flex flex-col gap-3 mt-4">
                {playbook.featureChoices.map((choice) => {
                  const picked = (draft.featureChoices[choice.key] ?? []).filter((v) => v.trim());
                  return (
                    <div key={choice.key}>
                      <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">
                        {choice.label} ({picked.length}/{choice.count})
                      </p>
                      {picked.length > 0 ? (
                        <div className="flex flex-col gap-1">
                          {picked.map((v, i) => (
                            <p key={i} className="text-[13px] text-[#b9c2bd]">&bull; {v}</p>
                          ))}
                        </div>
                      ) : (
                        <p className="text-[13px] text-muted">Not chosen yet.</p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </Section>
        ) : (
          <Section title="Feature" centerTitle>
            <p className="text-[13px] text-muted">No playbook chosen yet.</p>
          </Section>
        )}
      </div>
    </div>
  );
}

// An expand-on-click technique row, styled the same way the Moves list's
// cards are — collapsed shows name/training/approach plus the level badge,
// expanded reveals the technique's own details text underneath.
function TechniqueCard({
  name,
  subtitle,
  badge,
  details,
  playbookTone,
  expanded,
  onToggle,
}: {
  name: string;
  subtitle: string;
  badge: string;
  details: string;
  playbookTone: boolean;
  expanded: boolean;
  onToggle: () => void;
}) {
  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{
        background: playbookTone ? '#142a2e' : '#0f2226',
        borderColor: playbookTone ? 'rgba(232,200,116,0.25)' : 'rgba(232,200,116,0.15)',
      }}
    >
      <button type="button" onClick={onToggle} aria-expanded={expanded} className="w-full flex items-center justify-between gap-3 p-3 text-left">
        <div className="min-w-0">
          <p className={`font-display font-semibold text-sm truncate ${playbookTone ? 'text-gold' : 'text-parchment'}`}>{name}</p>
          <p className="text-[12px] text-muted">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-[10px] tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-gold text-gold-ink font-bold">{badge}</span>
          <svg
            viewBox="0 0 16 16"
            className="w-3 h-3 transition-transform"
            style={{ transform: expanded ? 'rotate(180deg)' : 'none' }}
            fill="none"
            stroke="#e8ddc4"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 5.5L8 10.5L13 5.5" />
          </svg>
        </div>
      </button>
      {expanded && (
        <div className="px-3 pb-3 border-t border-white/10">
          <p className="text-[13px] leading-relaxed text-[#b9c2bd] pt-3">{highlightStats(details)}</p>
        </div>
      )}
    </div>
  );
}

function TechniquesTab({ draft, playbook }: { draft: CharacterDraft; playbook: Playbook | null }) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  function toggleExpanded(name: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  // draft.techniqueLevels already includes the playbook's starting technique
  // (set to 'M' the moment a playbook is confirmed — see page.tsx), so it's
  // resolved and rendered once here, not hardcoded as a second, separate card.
  const techniqueEntries = Object.entries(draft.techniqueLevels) as [string, TechniqueLevel][];
  // A playbook's starting technique is always one specific Universal
  // technique (see resolveTechnique's forced training: ['Universal']) — skip
  // it from the plain "every Universal technique" list below so it renders
  // exactly once, via techniqueEntries, in its own gold playbook styling.
  const leveledNames = new Set(techniqueEntries.map(([name]) => name));

  return (
    <Section title="Techniques">
      <div className="flex flex-col gap-2">
        {UNIVERSAL_TECHNIQUES.filter((t) => !leveledNames.has(t.name)).map((t) => (
          <TechniqueCard
            key={t.name}
            name={t.name}
            subtitle={`Universal · ${APPROACH_LABEL[t.approach]}`}
            badge="Mastered"
            details={t.details}
            playbookTone={false}
            expanded={expanded.has(t.name)}
            onToggle={() => toggleExpanded(t.name)}
          />
        ))}

        {techniqueEntries.map(([name, level]) => {
          const t = resolveTechnique(name, playbook);
          if (!t) return null;
          return (
            <TechniqueCard
              key={name}
              name={name}
              subtitle={`${t.training.join(' / ')} · ${APPROACH_LABEL[t.approach]}`}
              badge={LEVEL_LABEL[level]}
              details={t.details}
              playbookTone={!!playbook && playbook.startingTechnique.name === name}
              expanded={expanded.has(name)}
              onToggle={() => toggleExpanded(name)}
            />
          );
        })}

        {techniqueEntries.length === 0 && !playbook && <p className="text-[13px] text-muted">No techniques selected yet.</p>}
      </div>
    </Section>
  );
}

function ConceptDetailsTab({
  draft,
  playbook,
  onUpdate,
  readOnly,
}: {
  draft: CharacterDraft;
  playbook: Playbook | null;
  onUpdate: (patch: Partial<CharacterDraft>) => void;
  readOnly: boolean;
}) {
  function toggleBackground(name: string) {
    if (readOnly) return;
    const has = draft.backgrounds.includes(name);
    let next = draft.backgrounds;
    if (has) next = next.filter((n) => n !== name);
    else if (next.length < 2) next = [...next, name];
    onUpdate({ backgrounds: next });
  }

  function updateConnection(i: number, patch: Partial<Connection>) {
    const next = draft.connections.slice();
    next[i] = { ...next[i], ...patch };
    onUpdate({ connections: next });
  }

  function updateHistory(i: number, value: string) {
    const next = draft.history.slice();
    next[i] = value;
    onUpdate({ history: next });
  }

  return (
    <div className="flex flex-col gap-7">
      <Section title={`Background (${draft.backgrounds.length}/2)`}>
        <div className="flex flex-col gap-2">
          {BACKGROUNDS.map((b) => {
            const picked = draft.backgrounds.includes(b.name);
            const atLimit = !picked && draft.backgrounds.length >= 2;
            return (
              <div
                key={b.name}
                className="flex items-start gap-3 p-3.5 rounded-xl border"
                style={{
                  background: picked ? 'rgba(232,200,116,0.12)' : '#0f2226',
                  borderColor: picked ? 'rgba(232,200,116,0.5)' : 'rgba(232,200,116,0.15)',
                  opacity: atLimit ? 0.5 : 1,
                }}
              >
                <CheckboxSquare
                  checked={picked}
                  onClick={() => { if (!atLimit) toggleBackground(b.name); }}
                  ariaLabel={`Select ${b.name}`}
                  className="mt-0.5"
                />
                <div>
                  <p className={`font-display font-semibold text-sm mb-0.5 ${picked ? 'text-gold' : 'text-parchment'}`}>{b.name}</p>
                  <p className="text-[13px] leading-relaxed text-[#b9c2bd]">{b.tagline}</p>
                </div>
              </div>
            );
          })}
        </div>
      </Section>

      <Section title="Demeanor">
        <TextArea
          value={draft.demeanor}
          onChange={(e) => onUpdate({ demeanor: e.target.value })}
          readOnly={readOnly}
          placeholder="e.g. Cheerful on the surface, watchful underneath"
          rows={3}
          className="resize-y"
        />
      </Section>

      <Section title={`Connections (${draft.connections.filter((c) => c.name.trim()).length})`}>
        <div className="flex flex-col gap-3 mb-3">
          {draft.connections.map((cn, i) => (
            <div key={i} className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-2.5 items-center">
              <TextField compact value={cn.name} onChange={(e) => updateConnection(i, { name: e.target.value })} readOnly={readOnly} placeholder="Companion's name" />
              <TextField compact value={cn.note} onChange={(e) => updateConnection(i, { note: e.target.value })} readOnly={readOnly} placeholder="How do you know them?" />
              {!readOnly && (
                <button
                  onClick={() => onUpdate({ connections: draft.connections.filter((_, j) => j !== i) })}
                  className="text-[#d97a5c] text-[13px] px-2 py-2"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
        {!readOnly && (
          <button
            onClick={() => onUpdate({ connections: [...draft.connections, { name: '', note: '' }] })}
            className="text-gold text-sm font-semibold"
          >
            + Add a connection
          </button>
        )}
      </Section>

      <Section title="Description">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs text-faint mb-1">Looks</p>
            <TextArea
              value={draft.look}
              onChange={(e) => onUpdate({ look: e.target.value })}
              readOnly={readOnly}
              placeholder="Age, build, clothing, marks or scars, the way they carry themselves..."
              rows={4}
              className="resize-y"
            />
          </div>
          <div>
            <p className="text-xs text-faint mb-1">Hometown</p>
            <TextArea
              value={draft.hometown}
              onChange={(e) => onUpdate({ hometown: e.target.value })}
              readOnly={readOnly}
              placeholder="e.g. Yu Dao, a Fire Nation colony in the Earth Kingdom"
              rows={2}
              className="resize-y"
            />
          </div>
        </div>
      </Section>

      {playbook && (
        <Section title="History">
          <div className="flex flex-col gap-3">
            {playbook.history.map((q, i) => (
              <div key={i}>
                <p className="text-[13px] text-[#e8ddc4] mb-1">{q}</p>
                <TextArea value={draft.history[i] || ''} onChange={(e) => updateHistory(i, e.target.value)} readOnly={readOnly} rows={2} placeholder="Your answer..." className="resize-y" />
              </div>
            ))}
          </div>
        </Section>
      )}

      <Section title="Campaign Details">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-xs text-faint mb-1">Campaign Focus</p>
            <TextArea value={draft.scopeText} onChange={(e) => onUpdate({ scopeText: e.target.value })} readOnly={readOnly} rows={2} className="resize-y" />
          </div>
          <div>
            <p className="text-xs text-faint mb-1">Group Focus</p>
            <TextArea value={draft.groupFocusesText} onChange={(e) => onUpdate({ groupFocusesText: e.target.value })} readOnly={readOnly} rows={2} className="resize-y" />
          </div>
          <div>
            <p className="text-xs text-faint mb-1">Location</p>
            <TextArea value={draft.location} onChange={(e) => onUpdate({ location: e.target.value })} readOnly={readOnly} rows={2} className="resize-y" />
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

function JournalTab({ entries, onAdd, readOnly }: { entries: JournalEntry[]; onAdd: (title: string, body: string) => void; readOnly: boolean }) {
  const [query, setQuery] = useState('');
  const [composing, setComposing] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  function toggleExpanded(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

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
        {!readOnly && (
          <button
            onClick={() => setComposing((v) => !v)}
            className="px-4 py-2 rounded-full bg-white/8 border border-white/20 text-parchment text-[13px] font-semibold hover:bg-white/12 shrink-0"
          >
            New Entry
          </button>
        )}
      </div>

      {!readOnly && composing && (
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
        {filtered.map((e) => {
          const isOpen = expanded.has(e.id);
          return (
            <div key={e.id} className="rounded-xl border border-gold/15 bg-ink-soft overflow-hidden">
              <button type="button" onClick={() => toggleExpanded(e.id)} aria-expanded={isOpen} className="w-full flex items-center gap-2 p-3.5 text-left">
                <p className="flex-1 min-w-0 font-display font-semibold text-sm text-gold truncate">{e.title}</p>
                <span className="text-[11px] text-faint shrink-0">{new Date(e.createdAt).toLocaleDateString()}</span>
                <svg
                  viewBox="0 0 16 16"
                  className="w-3 h-3 shrink-0 transition-transform"
                  style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }}
                  fill="none"
                  stroke="#e8ddc4"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M3 5.5L8 10.5L13 5.5" />
                </svg>
              </button>
              {isOpen && (
                <div className="px-3.5 pb-3.5 border-t border-white/10">
                  <p className="text-[13px] leading-relaxed text-[#b9c2bd] whitespace-pre-wrap pt-3">{e.body}</p>
                </div>
              )}
            </div>
          );
        })}
        {entries.length === 0 && <p className="text-[13px] text-muted">Your journal is empty — add a new entry above.</p>}
        {entries.length > 0 && filtered.length === 0 && <p className="text-[13px] text-muted">No entries match your search.</p>}
      </div>
    </Section>
  );
}
