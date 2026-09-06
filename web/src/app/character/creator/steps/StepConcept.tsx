'use client';

import { useState } from 'react';
import { BACKGROUNDS, Playbook } from '../data';
import StepHeader from '../StepHeader';
import TabbedStepPanel from '../TabbedStepPanel';
import CheckboxSquare from '../CheckboxSquare';
import { TextArea } from '../TextField';

export default function StepConcept({
  name,
  playbook,
  hometown,
  onHometown,
  look,
  onLook,
  demeanor,
  onDemeanor,
  backgrounds,
  onToggleBackground,
  history,
  onHistoryChange,
}: {
  name: string;
  playbook: Playbook | null;
  hometown: string;
  onHometown: (v: string) => void;
  look: string;
  onLook: (v: string) => void;
  demeanor: string;
  onDemeanor: (v: string) => void;
  backgrounds: string[];
  onToggleBackground: (name: string) => void;
  history: string[];
  onHistoryChange: (i: number, v: string) => void;
}) {
  const [openBackground, setOpenBackground] = useState<string | null>(null);

  const playbookName = playbook ? playbook.name : 'No playbook yet';
  const historyQuestions = playbook ? playbook.history : [];
  const detailsFilledCount = [hometown, look, demeanor].filter((v) => v.trim()).length;
  const historyAnsweredCount = historyQuestions.filter((_, i) => (history[i] || '').trim()).length;

  const backgroundTab = (
    <>
      <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Background &middot; choose up to 2</p>
      <p className="text-[12.5px] leading-relaxed text-muted mb-3.5">
        Where you came from and how you were raised. It shapes what you know and who you know — the GM may ask about it when it matters.
      </p>
      <div className="flex flex-col gap-2.5">
        {BACKGROUNDS.map((bg) => {
          const selected = backgrounds.includes(bg.name);
          const open = openBackground === bg.name;
          return (
            <div
              key={bg.name}
              className="rounded-xl border overflow-hidden"
              style={{
                background: selected ? 'rgba(232,200,116,0.12)' : '#0f2226',
                borderColor: selected || open ? 'rgba(232,200,116,0.5)' : 'rgba(232,200,116,0.15)',
              }}
            >
              <div className="flex items-center gap-3 px-4 py-3.5">
                <CheckboxSquare checked={selected} onClick={() => onToggleBackground(bg.name)} ariaLabel={`Select ${bg.name}`} />
                <button
                  onClick={() => setOpenBackground(open ? null : bg.name)}
                  className="flex-1 min-w-0 flex items-center justify-between gap-3 text-left"
                >
                  <div className="min-w-0">
                    <p className="font-display font-semibold text-sm text-parchment mb-0.5">{bg.name}</p>
                    <p className="text-[12.5px] leading-relaxed text-[#b9c2bd]">{bg.desc}</p>
                  </div>
                  <span
                    className="text-muted text-[11px] shrink-0 inline-block transition-transform"
                    style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
                  >
                    &#9660;
                  </span>
                </button>
              </div>
              {open && (
                <div className="pt-3.5 pb-4 pr-4 border-t border-white/10" style={{ paddingLeft: 46 }}>
                  <p className="text-[13px] leading-relaxed text-parchment-dim mb-3">{bg.detail}</p>
                  <p className="font-display text-[11px] tracking-wide uppercase text-gold mb-1.5">You might know</p>
                  <p className="text-[13px] leading-relaxed text-[#b9c2bd]">{bg.knows}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );

  const detailsTab = (
    <div className="flex flex-col gap-6.5">
      <div>
        <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Hometown</p>
        <p className="text-[12.5px] leading-relaxed text-muted mb-3">Where you grew up. A village, a city district, a ship, a temple — anywhere in the world of your era.</p>
        <TextArea value={hometown} onChange={(e) => onHometown(e.target.value)} placeholder="e.g. Yu Dao, a Fire Nation colony in the Earth Kingdom" rows={2} className="resize-y" />
      </div>
      <div>
        <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Look</p>
        <p className="text-[12.5px] leading-relaxed text-muted mb-3">What people notice first. Be as creative as you like — ask your GM for inspiration.</p>
        <TextArea value={look} onChange={(e) => onLook(e.target.value)} placeholder="Age, build, clothing, marks or scars, the way they carry themselves..." rows={4} className="resize-y" />
      </div>
      <div>
        <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Demeanor</p>
        <p className="text-[12.5px] leading-relaxed text-muted mb-3">How you come across when someone first meets you — a word or two, like &ldquo;guarded and dry&rdquo; or &ldquo;earnest, a little naive.&rdquo;</p>
        <TextArea value={demeanor} onChange={(e) => onDemeanor(e.target.value)} placeholder="e.g. Cheerful on the surface, watchful underneath" rows={3} className="resize-y" />
      </div>
    </div>
  );

  const historyTab = (
    <>
      <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">History</p>
      <p className="text-[12.5px] leading-relaxed text-muted mb-4">
        Answer {playbookName}&rsquo;s questions in a sentence or two each. You can leave gaps to fill in at the table.
      </p>
      {!playbook && <p className="text-[13.5px] text-muted">Choose a playbook first to see its history questions.</p>}
      <div className="flex flex-col gap-4">
        {historyQuestions.map((q, i) => (
          <div key={i}>
            <label className="block text-sm leading-relaxed text-[#e8ddc4] mb-2">{q}</label>
            <TextArea value={history[i] || ''} onChange={(e) => onHistoryChange(i, e.target.value)} rows={2} placeholder="Your answer..." className="resize-y" />
          </div>
        ))}
      </div>
    </>
  );

  return (
    <section>
      <StepHeader
        title="Your concept"
        subtitle={<>Who is {name || 'your character'} before the story begins? Pick a background and demeanor, then answer your playbook’s history questions.</>}
      />
      <TabbedStepPanel
        headerTitle={playbookName}
        headerLabel="Concept"
        tabs={[
          { id: 'background', label: `Backgrounds (${backgrounds.length}/2)`, content: backgroundTab },
          { id: 'details', label: `Hometown, Look & Demeanor (${detailsFilledCount}/3)`, content: detailsTab },
          { id: 'history', label: `History Questions (${historyAnsweredCount}/${historyQuestions.length})`, content: historyTab },
        ]}
      />
    </section>
  );
}
