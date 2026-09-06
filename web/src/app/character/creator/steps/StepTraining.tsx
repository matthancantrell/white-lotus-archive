'use client';

import { useState } from 'react';
import { TRAININGS } from '../data';
import StepHeader from '../StepHeader';
import ChoiceCard from '../ChoiceCard';
import { TextArea } from '../TextField';

const TABS = ['pick', 'style'] as const;
type TabId = typeof TABS[number];

export default function StepTraining({
  playbookName,
  trainingName,
  fightingStyle,
  onSelectTraining,
  onFightingStyleChange,
}: {
  playbookName: string;
  trainingName: string | null;
  fightingStyle: string;
  onSelectTraining: (name: string | null) => void;
  onFightingStyleChange: (v: string) => void;
}) {
  const [tab, setTab] = useState<TabId>('pick');
  const [mobileTabFocused, setMobileTabFocused] = useState(false);

  const tabLabels: Record<TabId, string> = {
    pick: `Training (${trainingName ? 1 : 0}/1)`,
    style: fightingStyle.trim() ? 'Fighting Style ✓' : 'Fighting Style',
  };

  function selectTab(id: TabId) {
    setTab(id);
    setMobileTabFocused(true);
  }

  return (
    <section>
      <StepHeader
        title="Training & fighting style"
        subtitle="Training is how you fight — one of the four bending arts, weapons, or technology. Fighting style is how you make it your own."
      />

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 items-start">
        <div className={`bg-ink-soft border border-gold/25 rounded-2xl p-3.5 flex-col gap-2.5 ${mobileTabFocused ? 'hidden md:flex' : 'flex'}`}>
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/15">
            <p className="font-display font-semibold text-[15.5px] text-parchment min-w-0 break-words">{playbookName}</p>
            <span className="shrink-0 text-[11px] tracking-[0.12em] uppercase text-gold">Training</span>
          </div>
          {TABS.map((id) => (
            <ChoiceCard key={id} selected={tab === id} onClick={() => selectTab(id)} className="flex items-center gap-3 text-left px-4 py-3.5">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: tab === id ? '#e8c874' : 'rgba(245,238,221,0.25)' }} />
              <p className="font-display font-semibold text-sm text-parchment">{tabLabels[id]}</p>
            </ChoiceCard>
          ))}
        </div>

        <div
          className={`hide-scrollbar bg-ink-soft border border-gold/20 rounded-2xl flex-col box-border ${mobileTabFocused ? 'flex' : 'hidden md:flex'}`}
          style={{ height: 480, overflowY: 'auto' }}
        >
          <div className="sticky top-0 z-10 bg-ink-soft px-7 pt-4 pb-3 border-b border-white/15 md:hidden">
            <button onClick={() => setMobileTabFocused(false)} className="px-3.5 py-1.5 rounded-full bg-white/8 border border-white/20 text-[#e8ddc4] text-xs font-semibold">
              &larr; Back to tabs
            </button>
          </div>

          <div className="px-7 pt-6.5 pb-7">
            {tab === 'pick' && (
              <>
                <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Training &middot; choose 1</p>
                <p className="text-[12.5px] leading-relaxed text-muted mb-3.5">
                  Bending arts are limited to one per character. Weapons covers any martial discipline — blades, staves, chi-blocking, or bare hands. Technology is gadgets and machines.
                </p>
                <div className="flex flex-col gap-2.5">
                  {TRAININGS.map((t) => {
                    const selected = trainingName === t.name;
                    return (
                      <ChoiceCard
                        key={t.name}
                        selected={selected}
                        onClick={() => onSelectTraining(selected ? null : t.name)}
                        className="flex items-center gap-3.5 text-left px-4 py-3.5"
                      >
                        <div
                          className="w-5 h-5 rounded-full border-[1.5px] border-gold shrink-0 flex items-center justify-center"
                          style={{ background: selected ? '#e8c874' : 'transparent' }}
                        >
                          {selected && <span className="text-[#1a1108] text-xs font-bold">&#10003;</span>}
                        </div>
                        <div className="min-w-0">
                          <p className="font-display font-semibold text-sm text-parchment mb-0.5">{t.name}</p>
                          <p className="text-[12.5px] leading-relaxed text-[#b9c2bd]">{t.desc}</p>
                        </div>
                      </ChoiceCard>
                    );
                  })}
                </div>
              </>
            )}

            {tab === 'style' && (
              <>
                <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Fighting style</p>
                <p className="text-[12.5px] leading-relaxed text-muted mb-3.5">
                  There is no list — a word or phrase for your personal approach. An earthbender might favor &ldquo;brute boulder tossing&rdquo;; a weapons fighter, &ldquo;paper-fan slicing.&rdquo; Work with your GM.
                </p>
                <TextArea
                  value={fightingStyle}
                  onChange={(e) => onFightingStyleChange(e.target.value)}
                  placeholder="e.g. Fluid and evasive, striking only when the opening is certain"
                  rows={3}
                  className="resize-y"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
