'use client';

import type { ReactNode } from 'react';
import { APPROACH_LABEL, Playbook, PRINCIPLES_EMBLEM_URL, resolvePlaybookMedia, Stats } from './data';
import PlaybookBanner from './PlaybookBanner';
import ChoiceCard from './ChoiceCard';
import { highlightStats } from './highlightStats';

const STAT_ROWS: [keyof Stats, string][] = [['creativity', 'Creativity'], ['focus', 'Focus'], ['harmony', 'Harmony'], ['passion', 'Passion']];
const BULLET_DOT = <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: 'rgba(232,200,116,0.6)' }} />;

// A run of 3+ underscores in a connection prompt (e.g. "___ is your lodestar...")
// marks a fill-in-the-blank spot — swapped for a visual blank line instead of
// showing the literal underscores, so it reads as "write a name here" rather
// than typo'd punctuation.
function renderBlanks(text: string): ReactNode {
  return text.split(/(_{3,})/g).map((part, i) =>
    /^_{3,}$/.test(part)
      ? <span key={i} className="inline-block align-baseline" style={{ width: '5.5em', borderBottom: '1.5px solid rgba(232,200,116,0.55)', margin: '0 2px' }} />
      : part
  );
}

// A section label + body, styled the same way everywhere it's used below — the one
// place to change if the "uppercase gold label" treatment ever needs to change.
function Section({ label, children, className = '' }: { label: string; children: ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="font-display text-xs tracking-wide uppercase text-gold mb-2">{label}</p>
      {children}
    </div>
  );
}

// One paragraph per array entry — used for Description, Feature, and Moves Advice,
// all of which are authored as a set of paragraphs rather than one text blob.
function Paragraphs({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-3">
      {items.map((p, i) => <p key={i} className="text-[13.5px] leading-relaxed text-[#b9c2bd]">{p}</p>)}
    </div>
  );
}

// A left-aligned bulleted list (gold dot, not a native marker) — used for
// Demeanor Options, laid out in two newspaper-style columns so a short list
// doesn't leave the right half of the container empty.
function TwoColumnList({ items }: { items: string[] }) {
  return (
    <div className="sm:columns-2 gap-x-7">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2.5 mb-2.5" style={{ breakInside: 'avoid' }}>
          {BULLET_DOT}
          <p className="text-[13.5px] leading-relaxed text-[#b9c2bd]">{item}</p>
        </div>
      ))}
    </div>
  );
}

// A centered bulleted list — used for History and Connections. `children` may
// contain the rendered blanks from renderBlanks, so items are ReactNode, not
// just strings.
function CenteredList({ items }: { items: ReactNode[] }) {
  return (
    <div className="flex flex-col items-center gap-3">
      {items.map((item, i) => (
        <p key={i} className="text-[13.5px] leading-relaxed text-[#b9c2bd] text-center max-w-md">
          <span className="text-gold mr-2">&bull;</span>{item}
        </p>
      ))}
    </div>
  );
}

// The full Roll20-style rundown for a playbook, in a fixed section order: banner,
// tagline, description, principles, starting stats, demeanor options, history,
// connections, moment of balance, feature, moves, moves advice, a secondary
// image, playbook technique, growth question. Used for both the pre-confirm
// preview and the confirmed "about" tab in StepPlaybook, so the two can't drift
// out of sync with each other.
export default function PlaybookInfoPanel({ playbook }: { playbook: Playbook }) {
  return (
    <>
      <PlaybookBanner playbook={playbook} />

      <p className="italic text-[14.5px] leading-relaxed mb-5" style={{ color: playbook.iconColor }}>{playbook.tagline}</p>

      <Section label="Description" className="mb-5">
        <Paragraphs items={playbook.description} />
      </Section>

      {/* Principles — a contained, Roll20-style box: centered header, the shared
          yin-yang emblem with "Principle vs Principle" laid over its seam, and
          flavor text below the emblem but still inside this same container. */}
      <div className="rounded-2xl border border-gold/25 bg-ink-soft p-6 mb-5 text-center">
        <p className="font-display text-xs tracking-wide uppercase text-gold mb-4">Principles</p>
        <div className="relative w-28 h-28 mx-auto mb-4">
          <div
            className="absolute inset-0 rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(232,200,116,0.16), rgba(232,200,116,0.03))', border: '1px solid rgba(232,200,116,0.3)' }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element -- bucket-hosted, not a static import. */}
          <img
            src={PRINCIPLES_EMBLEM_URL}
            alt=""
            className="absolute inset-0 w-full h-full object-contain p-3"
            onError={(e) => { e.currentTarget.style.visibility = 'hidden'; }}
          />
          <div className="absolute inset-0 flex items-center justify-center px-1">
            <p className="font-display font-semibold text-[11.5px] leading-tight" style={{ color: playbook.iconColor, textShadow: '0 1px 3px rgba(13,27,30,0.9)' }}>
              {playbook.principles[0]} <span className="text-parchment-dim">vs</span> {playbook.principles[1]}
            </p>
          </div>
        </div>
        <p className="text-[13.5px] leading-relaxed text-[#b9c2bd] max-w-md mx-auto">{playbook.principlesDescription}</p>
      </div>

      <Section label="Starting stats" className="mb-5">
        <div className="flex flex-wrap gap-2">
          {STAT_ROWS.map(([key, label]) => {
            const val = playbook.stats[key];
            return (
              <div key={key} className="px-3 py-1.5 rounded-full bg-white/6 border border-white/15 text-[12.5px] text-[#e8ddc4]">
                <strong className="text-gold font-bold">{label}</strong> {val >= 0 ? `+${val}` : val}
              </div>
            );
          })}
        </div>
      </Section>

      <Section label="Demeanor options" className="mb-5">
        <TwoColumnList items={playbook.demeanorOptions} />
      </Section>

      <Section label="History" className="mb-5">
        <CenteredList items={playbook.history} />
      </Section>

      <Section label="Connections" className="mb-5">
        <CenteredList items={playbook.connectionPrompts.map((p, i) => <span key={i}>{renderBlanks(p)}</span>)} />
      </Section>

      <Section label="Moment of balance" className="mb-5">
        <div className="p-4.5 rounded-xl bg-gold/6 border border-gold/30">
          <p className="font-display font-semibold text-sm text-gold mb-2">{playbook.name}</p>
          <p className="text-[13.5px] leading-relaxed text-parchment-dim">{playbook.momentOfBalance}</p>
        </div>
      </Section>

      <Section label={`Feature · ${playbook.feature.name}`} className="mb-5">
        <Paragraphs items={playbook.feature.effect} />
      </Section>

      <Section label="Moves" className="mb-5">
        <div className="flex flex-col gap-2.5">
          {playbook.moves.map((mv) => (
            <ChoiceCard key={mv.name} as="div" selected={false} className="p-3.5">
              <p className="font-display font-semibold text-sm text-gold mb-1">{mv.name}</p>
              <p className="text-[13px] leading-relaxed text-[#b9c2bd]">{highlightStats(mv.effect)}</p>
            </ChoiceCard>
          ))}
        </div>
      </Section>

      <Section label="Moves advice" className="mb-5">
        <Paragraphs items={playbook.movesAdvice} />
      </Section>

      {/* No local fallback for this one — the art doesn't exist yet, so the slot
          just disappears until the bucket object is uploaded. */}
      {/* eslint-disable-next-line @next/next/no-img-element -- bucket-hosted, not a static import. */}
      <img
        src={resolvePlaybookMedia(playbook.secondaryImageKey)}
        alt={playbook.name}
        className="w-full aspect-[1920/600] object-cover mb-5 rounded-lg"
        style={{ outline: '2px solid #e8c874', outlineOffset: '-6px' }}
        onError={(e) => { e.currentTarget.style.display = 'none'; }}
      />

      <Section label="Playbook technique" className="mb-5">
        <ChoiceCard as="div" selected className="p-4 text-center mb-3">
          <p className="font-display font-bold text-base text-gold mb-1">{playbook.startingTechnique.name}</p>
          <p className="text-[11px] text-muted uppercase tracking-wide">{APPROACH_LABEL[playbook.startingTechnique.approach]}</p>
        </ChoiceCard>
        <p className="text-[13.5px] leading-relaxed text-[#b9c2bd]">{playbook.startingTechnique.effect}</p>
      </Section>

      <Section label="Growth question">
        <p className="font-display font-semibold text-[13.5px] leading-relaxed text-parchment mb-2">{playbook.growth}</p>
        <p className="text-[13.5px] leading-relaxed text-[#b9c2bd]">{playbook.growthDescription}</p>
      </Section>
    </>
  );
}
