'use client';

import { useState } from 'react';
import ChoiceCard from './ChoiceCard';

// The sidebar-tabs + scrollable-content-panel shell shared by Concept, Training,
// Techniques, and Growth: a 280px tab list (name/section header + a ChoiceCard per
// tab) beside a 480px content panel, with the mobile "collapse to tabs" behavior
// built in. Owns its own tab/mobile-focus state — callers just supply the tabs and
// what each one renders.
//
// StepPlaybook's confirmed view uses the same visual shell but shares its content
// panel with two other states (the browse list and the preview-before-confirming
// view) that don't fit this "always tab-driven" shape, so it isn't built on this.
export interface TabbedStepPanelTab {
  id: string;
  label: string;
  content: React.ReactNode;
}

export default function TabbedStepPanel({
  headerTitle,
  headerLabel,
  headerAction,
  tabs,
  initialTab,
}: {
  headerTitle: string;
  headerLabel?: string;
  headerAction?: { label: string; onClick: () => void };
  tabs: TabbedStepPanelTab[];
  initialTab?: string;
}) {
  const [tab, setTab] = useState(initialTab ?? tabs[0]?.id);
  const [mobileTabFocused, setMobileTabFocused] = useState(false);

  const active = tabs.find((t) => t.id === tab) ?? tabs[0];

  function selectTab(id: string) {
    setTab(id);
    setMobileTabFocused(true);
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 items-start">
      <div className={`bg-ink-soft border border-gold/25 rounded-2xl p-3.5 flex-col gap-2.5 ${mobileTabFocused ? 'hidden md:flex' : 'flex'}`}>
        <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-white/15">
          <p className="font-display font-semibold text-[15.5px] text-parchment min-w-0 break-words">{headerTitle}</p>
          {headerAction ? (
            <button
              onClick={headerAction.onClick}
              className="shrink-0 px-3 py-1.5 rounded-full bg-white/8 border border-white/20 text-[#e8ddc4] text-[11.5px] font-semibold whitespace-nowrap"
            >
              {headerAction.label}
            </button>
          ) : (
            <span className="shrink-0 text-[11px] tracking-[0.12em] uppercase text-gold">{headerLabel}</span>
          )}
        </div>
        {tabs.map((t) => (
          <ChoiceCard key={t.id} selected={tab === t.id} onClick={() => selectTab(t.id)} className="flex items-center gap-3 text-left px-4 py-3.5">
            <div className="w-2 h-2 rounded-full shrink-0" style={{ background: tab === t.id ? '#e8c874' : 'rgba(245,238,221,0.25)' }} />
            <p className="font-display font-semibold text-sm text-parchment">{t.label}</p>
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
        <div className="px-7 pt-6.5 pb-7">{active?.content}</div>
      </div>
    </div>
  );
}
