'use client';

import { useRef, useState } from 'react';

import { PLAYBOOKS, Stats } from '../data';
import PlaybookCard from '../PlaybookCard';
import PlaybookInfoPanel from '../PlaybookInfoPanel';
import FeatureEffect from '../FeatureEffect';
import StepHeader from '../StepHeader';
import ChoiceCard from '../ChoiceCard';
import CheckboxSquare from '../CheckboxSquare';
import { TextArea } from '../TextField';
import { highlightStats, rollsWithLabel } from '../highlightStats';

const STAT_ROWS: [keyof Stats, string][] = [['creativity', 'Creativity'], ['focus', 'Focus'], ['harmony', 'Harmony'], ['passion', 'Passion']];
const TABS = ['about', 'stats', 'moves', 'feature'] as const;
type TabId = typeof TABS[number];

export default function StepPlaybook({
  playbookId,
  onSelect,
  statBonus,
  onBump,
  selectedMoves,
  onToggleMove,
  featureChoices,
  onToggleFeatureChoice,
  onFeatureFreeformChange,
}: {
  playbookId: string | null;
  onSelect: (id: string | null) => void;
  statBonus: keyof Stats | null;
  onBump: (key: keyof Stats) => void;
  selectedMoves: string[];
  onToggleMove: (name: string) => void;
  featureChoices: Record<string, string[]>;
  onToggleFeatureChoice: (key: string, value: string, count: number) => void;
  onFeatureFreeformChange: (key: string, index: number, value: string) => void;
}) {
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [tab, setTab] = useState<TabId>('about');
  const [mobileTabFocused, setMobileTabFocused] = useState(false);
  const [expandedMoves, setExpandedMoves] = useState<Set<string>>(new Set());
  // Which FeatureChoice (if any) is open as a nested subtab under the Feature
  // tab in the sidebar — null means the Feature tab itself is showing its
  // read-only overview (see FeatureEffect), not a selectable choice.
  const [featureChoiceTab, setFeatureChoiceTab] = useState<string | null>(null);
  const listRef = useRef<HTMLDivElement>(null);

  function toggleExpanded(name: string) {
    setExpandedMoves((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  }

  const confirmed = playbookId ? PLAYBOOKS.find((p) => p.id === playbookId) ?? null : null;
  const preview = !confirmed && previewId ? PLAYBOOKS.find((p) => p.id === previewId) ?? null : null;

  function handleListScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    setAtTop(el.scrollTop <= 2);
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 2);
  }

  function togglePreview(id: string) {
    setPreviewId((cur) => (cur === id ? null : id));
  }

  function confirmPlaybook() {
    if (!previewId) return;
    onSelect(previewId);
    setPreviewId(null);
    setTab('about');
    setFeatureChoiceTab(null);
    setMobileTabFocused(false);
  }

  function changePlaybook() {
    onSelect(null);
    setPreviewId(null);
    setTab('about');
    setFeatureChoiceTab(null);
    setMobileTabFocused(false);
  }

  // The Feature tab only exists for playbooks whose feature actually asks the
  // player to choose something (see Playbook.featureChoices) — most playbooks
  // have none yet, so the tab stays hidden rather than showing an empty panel.
  const hasFeatureChoices = !!confirmed && confirmed.featureChoices.length > 0;
  const visibleTabs = hasFeatureChoices ? TABS : TABS.filter((id) => id !== 'feature');

  const tabLabels: Record<TabId, string> = {
    about: `About ${confirmed?.name ?? ''}`,
    stats: `Boost Stats (${statBonus ? 1 : 0}/1)`,
    moves: `Select Moves (${selectedMoves.length}/2)`,
    feature: `Feature: ${confirmed?.feature.name ?? ''}`,
  };

  return (
    <section>
      <StepHeader
        title="Choose Your Playbook"
        subtitle="Your playbook is your archetype. It sets your stats, your balance principles, and the moves available to you. Only one player per playbook in a party."
      />

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 items-start">
        {/* Browse list */}
        {!confirmed && (
          <div className={`relative ${preview ? 'hidden md:block' : 'block'}`}>
            <div ref={listRef} onScroll={handleListScroll} className="hide-scrollbar flex flex-col gap-2 pr-1.5" style={{ height: 480, overflowY: 'auto' }}>
              {PLAYBOOKS.map((p) => (
                <PlaybookCard
                  key={p.id}
                  name={p.name}
                  principlesLabel={p.principles.join(' · ')}
                  iconColor={p.iconColor}
                  icon={p.iconImage}
                  background={p.backgroundImage}
                  selected={previewId === p.id}
                  onClick={() => togglePreview(p.id)}
                />
              ))}
            </div>
            {!atTop && <div className="absolute top-0 left-0 right-1.5 h-7 pointer-events-none" style={{ background: 'linear-gradient(#0d1b1e, rgba(13,27,30,0))' }} />}
            {!atBottom && <div className="absolute bottom-0 left-0 right-1.5 h-7 pointer-events-none" style={{ background: 'linear-gradient(rgba(13,27,30,0), #0d1b1e)' }} />}
          </div>
        )}

        {/* Confirmed: header + tab list */}
        {confirmed && (
          <div className={`bg-ink-soft border border-gold/25 rounded-2xl p-3.5 flex-col gap-2.5 ${mobileTabFocused ? 'hidden md:flex' : 'flex'}`}>
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/15">
              <p className="font-display font-semibold text-[15.5px] text-parchment min-w-0 break-words">{confirmed.name}</p>
              <button onClick={changePlaybook} className="shrink-0 px-3 py-1.5 rounded-full bg-white/8 border border-white/20 text-[#e8ddc4] text-[11.5px] font-semibold whitespace-nowrap">
                &larr; Back
              </button>
            </div>
            {visibleTabs.flatMap((id) => {
              const isFeature = id === 'feature';
              const selected = tab === id && !(isFeature && featureChoiceTab);
              const rows = [
                <ChoiceCard
                  key={id}
                  selected={selected}
                  onClick={() => {
                    setTab(id);
                    if (isFeature) setFeatureChoiceTab(null);
                    setMobileTabFocused(true);
                  }}
                  className="flex items-center gap-3 text-left px-4 py-3.5"
                >
                  <div className="w-2 h-2 rounded-full shrink-0" style={{ background: selected ? '#e8c874' : 'rgba(245,238,221,0.25)' }} />
                  <p className="font-display font-semibold text-sm text-parchment">{tabLabels[id]}</p>
                </ChoiceCard>,
              ];
              // Nested, indented subtabs for each choice the feature asks the
              // player to make — kept visually subordinate to the Feature row
              // above (smaller dot, extra left padding) rather than shown as
              // pills inside the content panel.
              if (isFeature && confirmed) {
                for (const choice of confirmed.featureChoices) {
                  const made = (featureChoices[choice.key] ?? []).filter((v) => v.trim()).length;
                  const active = tab === 'feature' && featureChoiceTab === choice.key;
                  rows.push(
                    <ChoiceCard
                      key={choice.key}
                      selected={active}
                      onClick={() => {
                        setTab('feature');
                        setFeatureChoiceTab(choice.key);
                        setMobileTabFocused(true);
                      }}
                      className="flex items-center gap-2.5 text-left pl-8 pr-4 py-2.5"
                    >
                      <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: active ? '#e8c874' : 'rgba(245,238,221,0.25)' }} />
                      <p className="font-display text-[13px] text-parchment-dim">{choice.label} ({made}/{choice.count})</p>
                    </ChoiceCard>
                  );
                }
              }
              return rows;
            })}
          </div>
        )}

        {/* Detail / content panel */}
        <div
          className={`hide-scrollbar bg-ink-soft border border-gold/20 rounded-2xl flex-col box-border ${
            confirmed ? (mobileTabFocused ? 'flex' : 'hidden md:flex') : preview ? 'flex' : 'hidden md:flex'
          }`}
          style={{ height: 480, overflowY: 'auto' }}
        >
          {confirmed && (
            <div className="sticky top-0 z-10 bg-ink-soft px-7 pt-4 pb-3 border-b border-white/15 md:hidden">
              <button onClick={() => setMobileTabFocused(false)} className="px-3.5 py-1.5 rounded-full bg-white/8 border border-white/20 text-[#e8ddc4] text-xs font-semibold">
                &larr; Back to tabs
              </button>
            </div>
          )}

          {preview && (
            <>
              <div className="sticky top-0 z-10 bg-ink-soft pt-6.5 px-7 rounded-t-2xl">
                <div className="flex justify-between items-start gap-3 mb-2.5">
                  <div>
                    <h3 className="font-display font-semibold text-2xl text-parchment mb-1">{preview.name}</h3>
                    <p className="text-xs text-gold tracking-wide">{preview.principles.join(' · ')}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={confirmPlaybook} className="bg-gold text-gold-ink px-4.5 py-2.5 rounded-full text-[13.5px] font-bold whitespace-nowrap hover:brightness-95">
                      Select {preview.name}
                    </button>
                    <button onClick={() => setPreviewId(null)} aria-label="Close" className="w-7.5 h-7.5 rounded-full bg-white/8 border border-white/20 text-parchment flex items-center justify-center text-base shrink-0">
                      &times;
                    </button>
                  </div>
                </div>
                <div className="h-px bg-white/15" />
              </div>

              <div className="px-7 pt-5 pb-7">
                <PlaybookInfoPanel playbook={preview} />
              </div>
            </>
          )}

          {confirmed && (
            <div className="px-7 pt-6.5 pb-7">
              {tab === 'about' && <PlaybookInfoPanel playbook={confirmed} />}
              {tab === 'stats' && (
                <>
                  <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Boost stats</p>
                  <p className="text-[12.5px] text-muted mb-3">Add +1 to one stat (max +2).</p>
                  <div className="grid grid-cols-2 gap-2.5">
                    {STAT_ROWS.map(([key, label]) => {
                      const bonus = statBonus === key ? 1 : 0;
                      const val = confirmed.stats[key] + bonus;
                      const isActive = statBonus === key;
                      return (
                        <ChoiceCard key={key} selected={isActive} onClick={() => onBump(key)} className="relative p-4 text-center">
                          <p className="absolute top-2 right-2.5 text-[10.5px] text-muted">({bonus}/1)</p>
                          <p className="font-display text-xs text-gold tracking-wide uppercase mb-2">{label}</p>
                          <p className="font-display font-bold text-2xl text-parchment">{val >= 0 ? `+${val}` : val}</p>
                        </ChoiceCard>
                      );
                    })}
                  </div>
                </>
              )}
              {tab === 'moves' && (
                <>
                  <p className="font-display text-xs tracking-wide uppercase text-gold mb-2.5">Select 2 moves</p>
                  <div className="flex items-center gap-3 px-4 mb-1.5">
                    <span className="flex-1 text-[10px] tracking-wide uppercase text-parchment-dim">Name</span>
                    <span className="w-16 shrink-0 text-right text-[10px] tracking-wide uppercase text-parchment-dim">Rolls</span>
                    <span className="w-[68px] shrink-0" />
                    <span className="w-7.5 shrink-0" />
                  </div>
                  <div className="flex flex-col gap-2.5">
                    {confirmed.moves.map((mv) => {
                      const checked = selectedMoves.includes(mv.name);
                      const expanded = expandedMoves.has(mv.name);
                      const rollsWith = rollsWithLabel(mv.rollsWith);
                      const atLimit = !checked && selectedMoves.length >= 2;
                      return (
                        <ChoiceCard key={mv.name} as="div" selected={checked} className="text-left w-full box-border">
                          <div className="flex items-center gap-3 px-4 py-3.5">
                            <div className="min-w-0 flex-1">
                              <p className="font-display font-semibold text-sm text-gold">{mv.name}</p>
                            </div>
                            <p className="w-16 shrink-0 text-right text-[11.5px] text-parchment-dim uppercase tracking-wide">{rollsWith ?? '—'}</p>
                            <button
                              type="button"
                              onClick={() => onToggleMove(mv.name)}
                              disabled={atLimit}
                              className="shrink-0 px-3 py-1.5 rounded-full text-[11.5px] font-semibold whitespace-nowrap disabled:opacity-40 disabled:cursor-not-allowed"
                              style={
                                checked
                                  ? { background: '#e8c874', color: '#1a1108' }
                                  : { background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.2)', color: '#e8ddc4' }
                              }
                            >
                              {checked ? 'Selected' : 'Select'}
                            </button>
                            <button
                              type="button"
                              onClick={() => toggleExpanded(mv.name)}
                              aria-label={expanded ? 'Collapse move details' : 'Expand move details'}
                              aria-expanded={expanded}
                              className="shrink-0 w-7.5 h-7.5 rounded-full bg-white/8 border border-white/20 flex items-center justify-center"
                            >
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
                            </button>
                          </div>
                          {expanded && (
                            <div className="px-4 pb-3.5 border-t border-white/10">
                              <p className="text-[13px] leading-relaxed text-[#b9c2bd] pt-3">{highlightStats(mv.details)}</p>
                            </div>
                          )}
                        </ChoiceCard>
                      );
                    })}
                  </div>
                </>
              )}
              {tab === 'feature' && !featureChoiceTab && <FeatureEffect effect={confirmed.feature.effect} />}

              {tab === 'feature' && featureChoiceTab && confirmed.featureChoices.map((choice) => {
                if (choice.key !== featureChoiceTab) return null;
                if (choice.kind === 'select') {
                  // Options already picked under a sibling choice this one is
                  // linked to (e.g. Domain / Secondary Domain share one
                  // catalog) can't be picked again here.
                  const claimedElsewhere = new Set(
                    (choice.excludeChoiceKeys ?? []).flatMap((k) => featureChoices[k] ?? [])
                  );
                  return (
                    <div key={choice.key}>
                      <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">{choice.label}</p>
                      <p className="text-[12.5px] text-muted mb-3.5">
                        Choose {choice.count} {choice.label.toLowerCase()} from the list below.
                      </p>
                      <div className="flex flex-col gap-2">
                        {choice.options.map((opt) => {
                          const picked = (featureChoices[choice.key] ?? []).includes(opt);
                          const claimed = !picked && claimedElsewhere.has(opt);
                          const atLimit = !picked && !claimed && (featureChoices[choice.key] ?? []).length >= choice.count;
                          const disabled = claimed || atLimit;
                          return (
                            <div
                              key={opt}
                              className="flex items-center gap-3 px-4 py-2.5 rounded-xl border"
                              style={{
                                background: picked ? 'rgba(232,200,116,0.12)' : '#0f2226',
                                borderColor: picked ? 'rgba(232,200,116,0.5)' : 'rgba(232,200,116,0.15)',
                                opacity: disabled ? 0.5 : 1,
                              }}
                            >
                              <CheckboxSquare
                                checked={picked}
                                onClick={() => { if (!disabled) onToggleFeatureChoice(choice.key, opt, choice.count); }}
                                ariaLabel={`Select ${opt}`}
                              />
                              <p className="text-[13px] leading-relaxed text-[#b9c2bd] flex-1">{opt}</p>
                              {claimed && <p className="text-[11px] text-faint whitespace-nowrap">Already chosen</p>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={choice.key}>
                    <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">{choice.label}</p>
                    <p className="text-[12.5px] text-muted mb-2">{choice.prompt}</p>
                    {choice.examples && (
                      <p className="text-[12px] text-faint mb-3.5">e.g. {choice.examples.join(', ')}</p>
                    )}
                    <div className="flex flex-col gap-2.5">
                      {Array.from({ length: choice.count }).map((_, i) => (
                        <TextArea
                          key={i}
                          value={(featureChoices[choice.key] ?? [])[i] ?? ''}
                          onChange={(e) => onFeatureFreeformChange(choice.key, i, e.target.value)}
                          rows={2}
                          placeholder={`${choice.label} ${i + 1}`}
                          className="resize-y"
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {!preview && !confirmed && (
            <div className="m-auto p-7 text-center">
              <p className="font-display font-semibold text-base text-gold mb-2">Which archetype fits you?</p>
              <p className="text-[13.5px] leading-relaxed text-muted">Select a playbook on the left to browse its feature, stats, and moves.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
