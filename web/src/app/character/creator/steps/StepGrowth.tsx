'use client';

import { useState } from 'react';
import { ADVANCEMENTS, Playbook, STANDARD_GROWTH } from '../data';
import StepHeader from '../StepHeader';
import ChoiceCard from '../ChoiceCard';

const TABS = ['questions', 'advancements', 'moment'] as const;
type TabId = typeof TABS[number];

export default function StepGrowth({
  playbook,
  trainingName,
  eraName,
  name,
  justSaved,
  onSave,
}: {
  playbook: Playbook | null;
  trainingName: string | null;
  eraName: string | null;
  name: string;
  justSaved: boolean;
  onSave: () => void;
}) {
  const [tab, setTab] = useState<TabId>('questions');
  const [mobileTabFocused, setMobileTabFocused] = useState(false);

  const playbookName = playbook ? playbook.name : 'No playbook yet';

  const tabLabels: Record<TabId, string> = {
    questions: 'Growth Questions',
    advancements: 'Advancements',
    moment: 'Moment of Balance',
  };

  function selectTab(id: TabId) {
    setTab(id);
    setMobileTabFocused(true);
  }

  return (
    <section>
      <StepHeader
        title="Growth"
        subtitle={<>Nothing to mark yet — this is how {name || 'your character'} will grow. At the end of each session, every &ldquo;yes&rdquo; marks one growth; four growth earns an advancement.</>}
      />

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 items-start mb-6">
        <div className={`bg-ink-soft border border-gold/25 rounded-2xl p-3.5 flex-col gap-2.5 ${mobileTabFocused ? 'hidden md:flex' : 'flex'}`}>
          <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/15">
            <p className="font-display font-semibold text-[15.5px] text-parchment min-w-0 break-words">{playbookName}</p>
            <span className="shrink-0 text-[11px] tracking-[0.12em] uppercase text-gold">Growth</span>
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
            {tab === 'questions' && (
              <>
                <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Growth questions</p>
                <p className="text-[12.5px] leading-relaxed text-muted mb-3.5">Answered by every player at the end of each session. Each yes marks one growth box.</p>
                <div className="flex flex-col gap-2.5 mb-4.5">
                  {STANDARD_GROWTH.map((q) => (
                    <div key={q} className="px-4 py-3.5 rounded-xl bg-panel border border-gold/14 text-[13.5px] leading-relaxed text-[#e8ddc4]">{q}</div>
                  ))}
                  <div className="px-4 py-3.5 rounded-xl bg-gold/8 border border-gold/30 text-[13.5px] leading-relaxed text-parchment">
                    <span className="text-gold font-semibold">{playbookName}: </span>
                    {playbook ? playbook.growth : ''}
                  </div>
                </div>
                <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Growth track</p>
                <div className="flex gap-2 mt-2">
                  {[1, 2, 3, 4].map((n) => (
                    <div key={n} className="w-7.5 h-7.5 rounded-md border-[1.5px] border-gold/50 bg-white/4" />
                  ))}
                </div>
              </>
            )}

            {tab === 'advancements' && (
              <>
                <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Growth advancements</p>
                <p className="text-[12.5px] leading-relaxed text-muted mb-3.5">Spend four growth on one of these. Each can be taken twice.</p>
                <div className="flex flex-col gap-2.5">
                  {ADVANCEMENTS.map((a) => (
                    <div key={a} className="flex items-center justify-between gap-3.5 px-4 py-3.5 rounded-xl bg-panel border border-gold/14">
                      <p className="text-[13.5px] leading-relaxed text-[#e8ddc4] flex-1 min-w-0">{a}</p>
                      <div className="flex gap-1.5 shrink-0">
                        <div className="w-5 h-5 rounded-[5px] border-[1.5px] border-gold/50" />
                        <div className="w-5 h-5 rounded-[5px] border-[1.5px] border-gold/50" />
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {tab === 'moment' && (
              <>
                <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Moment of Balance &middot; locked</p>
                <p className="text-[12.5px] leading-relaxed text-muted mb-3.5">
                  Unlocked through advancement and usable only while your balance sits at its center. Once used, it must be unlocked again.
                </p>
                {!playbook && <p className="text-[13.5px] text-muted">Choose a playbook first.</p>}
                {playbook && (
                  <div className="p-4.5 rounded-xl bg-gold/6 border border-gold/30">
                    <p className="font-display font-semibold text-sm text-gold mb-2">{playbook.name}</p>
                    <p className="text-[13.5px] leading-relaxed text-parchment-dim">{playbook.momentOfBalance}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className="bg-panel border border-gold/25 rounded-2xl p-7">
        <p className="font-display font-semibold text-lg text-parchment mb-4">Ready to save {name || 'your character'}</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-6 gap-y-2.5 text-[13.5px] text-[#b9c2bd] mb-5.5">
          <p><span className="text-faint">Playbook:</span> {playbook ? playbook.name : 'not chosen'}</p>
          <p><span className="text-faint">Training:</span> {trainingName || 'not chosen'}</p>
          <p><span className="text-faint">Era:</span> {eraName || 'not chosen'}</p>
        </div>
        <button onClick={onSave} className="bg-gold text-gold-ink px-7.5 py-3.5 rounded-full text-[15px] font-bold hover:brightness-95">
          Save character to my archive
        </button>
        {justSaved && <p className="mt-3.5 text-[#a3c98a] text-[13.5px]">Saved. This will sync to your account once the archive is connected.</p>}
      </div>
    </section>
  );
}
