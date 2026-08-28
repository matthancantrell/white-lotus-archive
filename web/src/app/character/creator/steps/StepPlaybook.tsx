'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { PLAYBOOKS } from '../data';
import PlaybookCard from '../PlaybookCard';

const STAT_LABELS: [string, string][] = [['creativity', 'Creativity'], ['focus', 'Focus'], ['harmony', 'Harmony'], ['passion', 'Passion']];

export default function StepPlaybook({
  playbookId,
  onSelect,
  onAdvance,
}: {
  playbookId: string | null;
  onSelect: (id: string | null) => void;
  onAdvance: () => void;
}) {
  const [atTop, setAtTop] = useState(true);
  const [atBottom, setAtBottom] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const pb = PLAYBOOKS.find((p) => p.id === playbookId) ?? null;

  function handleListScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    setAtTop(el.scrollTop <= 2);
    setAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 2);
  }

  function toggle(id: string) {
    onSelect(playbookId === id ? null : id);
  }

  return (
    <section>
      <h1 className="font-display font-semibold text-[30px] mb-2">Choose your playbook</h1>
      <p className="text-parchment-dim text-[15px] mb-7 max-w-xl">
        Your playbook is your archetype &mdash; it sets your stats, your balance principles, and the moves available to you. Only one player per playbook in a party.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-6 items-start">
        {/* List: hidden on mobile once a playbook is selected */}
        <div className={`relative ${pb ? 'hidden md:block' : 'block'}`}>
          <div ref={listRef} onScroll={handleListScroll} className="hide-scrollbar flex flex-col gap-2 pr-1.5" style={{ height: 480, overflowY: 'auto' }}>
            {PLAYBOOKS.map((p) => (
              <PlaybookCard
                key={p.id}
                name={p.name}
                principlesLabel={p.principles.join(' · ')}
                iconColor={p.iconColor}
                icon={p.iconImage}
                background={p.backgroundImage}
                selected={playbookId === p.id}
                onClick={() => toggle(p.id)}
              />
            ))}
          </div>
          {!atTop && <div className="absolute top-0 left-0 right-1.5 h-7 pointer-events-none" style={{ background: 'linear-gradient(#0d1b1e, rgba(13,27,30,0))' }} />}
          {!atBottom && <div className="absolute bottom-0 left-0 right-1.5 h-7 pointer-events-none" style={{ background: 'linear-gradient(rgba(13,27,30,0), #0d1b1e)' }} />}
        </div>

        {/* Detail panel: hidden on mobile until a playbook is selected */}
        <div className={`hide-scrollbar bg-ink-soft border border-gold/20 rounded-2xl flex flex-col box-border ${pb ? 'block' : 'hidden md:block'}`} style={{ height: 480, overflowY: 'auto' }}>
          {pb ? (
            <>
              <div className="sticky top-0 z-10 bg-ink-soft pt-6.5 px-7 rounded-t-2xl">
                <div className="flex justify-between items-start gap-3 mb-2.5">
                  <div>
                    <h3 className="font-display font-semibold text-2xl text-parchment mb-1">{pb.name}</h3>
                    <p className="text-xs text-gold tracking-wide">{pb.principles.join(' · ')}</p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <button onClick={onAdvance} className="bg-gold text-gold-ink px-4.5 py-2.5 rounded-full text-[13.5px] font-bold whitespace-nowrap hover:brightness-95">
                      Select {pb.name}
                    </button>
                    <button
                      onClick={() => onSelect(null)}
                      aria-label="Close"
                      className="w-7.5 h-7.5 rounded-full bg-white/8 border border-white/20 text-parchment flex items-center justify-center text-base shrink-0"
                    >
                      &times;
                    </button>
                  </div>
                </div>
                <p className="text-[14.5px] leading-relaxed text-parchment-dim mb-4">{pb.tagline}</p>
                <div className="h-px bg-white/15" />
              </div>

              <div className="px-7 pt-5 pb-7">
                <Image
                  src={pb.bannerFile}
                  alt={pb.name}
                  // Real banner art is 1920x600 — matching that ratio here (instead of a
                  // fixed pixel height) keeps the full shape of the photo at any width,
                  // mobile included, rather than cropping harder as the panel narrows.
                  className="w-full aspect-[1920/600] object-cover mb-5"
                  style={{ outline: '1px solid #e8c874', outlineOffset: '-5px' }}
                />

                <p className="font-display text-xs tracking-wide uppercase text-gold mb-2">Starting stats</p>
                <div className="flex flex-wrap gap-2 mb-5">
                  {STAT_LABELS.map(([key, label]) => {
                    const val = pb.stats[key as keyof typeof pb.stats];
                    return (
                      <div key={key} className="px-3 py-1.5 rounded-full bg-white/6 border border-white/15 text-[12.5px] text-[#e8ddc4]">
                        {label} {val >= 0 ? `+${val}` : val}
                      </div>
                    );
                  })}
                </div>

                <p className="font-display text-xs tracking-wide uppercase text-gold mb-2">Moves</p>
                <div className="flex flex-col gap-2.5 mb-5">
                  {pb.moves.map((mv) => (
                    <div key={mv.name}>
                      <p className="font-display font-semibold text-sm text-parchment mb-0.5">{mv.name}</p>
                      <p className="text-[13px] leading-relaxed text-[#b9c2bd]">{mv.effect}</p>
                    </div>
                  ))}
                </div>

                <p className="font-display text-xs tracking-wide uppercase text-gold mb-1.5">Feature &middot; {pb.feature.name}</p>
                <p className="text-[13px] leading-relaxed text-[#b9c2bd] mb-5">{pb.feature.effect}</p>

                <p className="font-display text-xs tracking-wide uppercase text-gold mb-1.5">Growth question</p>
                <p className="text-[13px] leading-relaxed text-[#b9c2bd]">{pb.growth}</p>
              </div>
            </>
          ) : (
            <div className="m-auto p-7 text-center">
              <p className="font-display font-semibold text-base text-gold mb-2">Which archetype fits you?</p>
              <p className="text-[13.5px] leading-relaxed text-muted">Select a playbook on the left to see its stats, moves, and feature.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
