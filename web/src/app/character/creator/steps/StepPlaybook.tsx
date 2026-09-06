'use client';

import { useRef, useState } from 'react';

import { PLAYBOOKS, Stats } from '../data';
import PlaybookCard from '../PlaybookCard';
import PlaybookBanner from '../PlaybookBanner';
import StepHeader from '../StepHeader';
import ChoiceCard from '../ChoiceCard';
import { highlightStats } from '../highlightStats';

const STAT_ROWS: [keyof Stats, string][] = [['creativity', 'Creativity'], ['focus', 'Focus'], ['harmony', 'Harmony'], ['passion', 'Passion']];
const TABS = ['about', 'principles', 'feature', 'stats', 'moves'] as const;
type TabId = typeof TABS[number];

export default function StepPlaybook({
  playbookId,
  onSelect,
  statBonus,
  onBump,
  selectedMoves,
  onToggleMove,
}: {
  playbookId: string | null;
  onSelect: (id: string | null) => void;
  statBonus: keyof Stats | null;
  onBump: (key: keyof Stats) => void;
  selectedMoves: string[];
  onToggleMove: (name: string) => void;
}) {
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  const [previewId, setPreviewId] = useState<string | null>(null);
  const [tab, setTab] = useState<TabId>('about');
  const [mobileTabFocused, setMobileTabFocused] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

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
    setMobileTabFocused(false);
  }

  function changePlaybook() {
    onSelect(null);
    setPreviewId(null);
    setTab('about');
    setMobileTabFocused(false);
  }

  const tabLabels: Record<TabId, string> = {
    about: `About ${confirmed?.name ?? ''}`,
    principles: 'Principles',
    feature: `Feature: ${confirmed?.feature.name ?? ''}`,
    stats: `Boost Stats (${statBonus ? 1 : 0}/1)`,
    moves: `Select Moves (${selectedMoves.length}/2)`,
  };

  return (
    <section>
      <StepHeader
        title="Choose your playbook"
        subtitle="Your playbook is your archetype — it sets your stats, your balance principles, and the moves available to you. Only one player per playbook in a party."
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
                  principlesLabel={p.principles.join(' / ')}
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
            {TABS.map((id) => (
              <ChoiceCard key={id} selected={tab === id} onClick={() => { setTab(id); setMobileTabFocused(true); }} className="flex items-center gap-3 text-left px-4 py-3.5">
                <div className="w-2 h-2 rounded-full shrink-0" style={{ background: tab === id ? '#e8c874' : 'rgba(245,238,221,0.25)' }} />
                <p className="font-display font-semibold text-sm text-parchment">{tabLabels[id]}</p>
              </ChoiceCard>
            ))}
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
                    <p className="text-xs text-gold tracking-wide">{preview.principles.join(' / ')}</p>
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
                <p className="text-[14.5px] leading-relaxed text-parchment-dim mb-4">{preview.tagline}</p>
                <div className="h-px bg-white/15" />
              </div>

              <div className="px-7 pt-5 pb-7">
                <PlaybookBanner playbook={preview} />

                <p className="font-display text-xs tracking-wide uppercase text-gold mb-2">Starting stats</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {STAT_ROWS.map(([key, label]) => {
                    const val = preview.stats[key];
                    return (
                      <div key={key} className="px-3 py-1.5 rounded-full bg-white/6 border border-white/15 text-[12.5px] text-[#e8ddc4]">
                        <strong className="text-gold font-bold">{label}</strong> {val >= 0 ? `+${val}` : val}
                      </div>
                    );
                  })}
                </div>

                <p className="font-display text-xs tracking-wide uppercase text-gold mb-2">Moves</p>
                <div className="flex flex-col gap-2.5 mb-5">
                  {preview.moves.map((mv) => (
                    <ChoiceCard key={mv.name} as="div" selected={false} className="p-3.5">
                      <p className="font-display font-semibold text-sm text-gold mb-1">{mv.name}</p>
                      <p className="text-[13px] leading-relaxed text-[#b9c2bd]">{highlightStats(mv.effect)}</p>
                    </ChoiceCard>
                  ))}
                </div>

                <p className="font-display text-xs tracking-wide uppercase text-gold mb-1.5">Feature &middot; {preview.feature.name}</p>
                <p className="text-[13px] leading-relaxed text-[#b9c2bd] mb-5">{preview.feature.effect}</p>

                <p className="font-display text-xs tracking-wide uppercase text-gold mb-1.5">Growth question</p>
                <p className="text-[13px] leading-relaxed text-[#b9c2bd]">{preview.growth}</p>
              </div>
            </>
          )}

          {confirmed && (
            <div className="px-7 pt-6.5 pb-7">
              {tab === 'about' && (
                <>
                  <PlaybookBanner playbook={confirmed} />
                  <p className="font-display text-xs tracking-wide uppercase text-gold mb-1.5">About {confirmed.name}</p>
                  <p className="text-[13.5px] leading-relaxed text-parchment-dim">{confirmed.tagline}</p>
                </>
              )}
              {tab === 'principles' && (
                <>
                  <p className="font-display text-xs tracking-wide uppercase text-gold mb-2">Principles</p>
                  <p className="text-[13.5px] leading-relaxed text-[#b9c2bd] mb-5">{confirmed.principles.join(' / ')}</p>
                  <p className="font-display text-xs tracking-wide uppercase text-gold mb-1.5">Growth question</p>
                  <p className="text-[13.5px] leading-relaxed text-[#b9c2bd]">{confirmed.growth}</p>
                </>
              )}
              {tab === 'feature' && (
                <>
                  <p className="font-display text-xs tracking-wide uppercase text-gold mb-1.5">Feature &middot; {confirmed.feature.name}</p>
                  <p className="text-[13.5px] leading-relaxed text-[#b9c2bd]">{confirmed.feature.effect}</p>
                </>
              )}
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
                  <div className="flex flex-col gap-2.5">
                    {confirmed.moves.map((mv) => {
                      const checked = selectedMoves.includes(mv.name);
                      return (
                        <ChoiceCard key={mv.name} selected={checked} onClick={() => onToggleMove(mv.name)} className="text-left w-full px-4 py-3.5 box-border">
                          <p className="font-display font-semibold text-sm text-gold mb-1">{mv.name}</p>
                          <p className="text-[13px] leading-relaxed text-[#b9c2bd]">{highlightStats(mv.effect)}</p>
                        </ChoiceCard>
                      );
                    })}
                  </div>
                </>
              )}
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
