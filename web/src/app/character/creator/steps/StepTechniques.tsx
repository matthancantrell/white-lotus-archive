'use client';

import { useState } from 'react';
import { APPROACH_LABEL, Playbook, Technique, TechniqueLevel, TECHNIQUES, UNIVERSAL_TECHNIQUES } from '../data';
import StepHeader from '../StepHeader';
import TabbedStepPanel from '../TabbedStepPanel';
import CheckboxSquare from '../CheckboxSquare';

const LEVEL_ON = { background: '#e8c874', color: '#1a1108' };
const LEVEL_OFF = { background: 'transparent', color: '#7f948f' };

function LevelButton({ label, active, onClick, ariaLabel }: { label: string; active: boolean; onClick: () => void; ariaLabel: string }) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className="w-6 h-6 rounded-md flex items-center justify-center text-[11px] font-bold border border-gold/35"
      style={active ? LEVEL_ON : LEVEL_OFF}
    >
      {label}
    </button>
  );
}

function TechniqueCard({
  t,
  level,
  open,
  isStarting,
  playbookName,
  onToggleOpen,
  onToggle,
  onSetLevel,
}: {
  t: Technique;
  level: TechniqueLevel | null;
  open: boolean;
  isStarting: boolean;
  playbookName: string;
  onToggleOpen: () => void;
  onToggle: () => void;
  onSetLevel: (level: TechniqueLevel) => void;
}) {
  const meta = (isStarting ? `${playbookName} · ` : `${t.training} · `) + APPROACH_LABEL[t.approach];
  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{
        background: level ? 'rgba(232,200,116,0.12)' : '#0f2226',
        borderColor: isStarting ? '#e8c874' : level || open ? 'rgba(232,200,116,0.5)' : 'rgba(232,200,116,0.15)',
      }}
    >
      <div className="flex items-start gap-3 px-4 py-3.5">
        <CheckboxSquare checked={!!level} onClick={onToggle} ariaLabel={`Select ${t.name}`} className="mt-0.5" />
        <button onClick={onToggleOpen} className="flex-1 min-w-0 flex items-start justify-between gap-3 text-left">
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-0.5">
              <p className="font-display font-semibold text-sm text-gold">{t.name}</p>
              {isStarting && (
                <span className="text-[10px] tracking-wide uppercase px-1.5 py-0.5 rounded-full bg-gold text-gold-ink font-bold">Playbook</span>
              )}
              {t.rare && (
                <span className="text-[10px] tracking-wide uppercase px-1.5 py-0.5 rounded-full text-[#e8927a] border border-[#e8927a]/40" style={{ background: 'rgba(232,146,122,0.15)' }}>
                  Rare
                </span>
              )}
              {t.groupOnly && (
                <span className="text-[10px] tracking-wide uppercase px-1.5 py-0.5 rounded-full text-[#9ec4e8] border border-[#9ec4e8]/40" style={{ background: 'rgba(158,196,232,0.15)' }}>
                  Group
                </span>
              )}
            </div>
            <p className="text-xs text-muted">{meta}</p>
          </div>
          <span className="text-muted text-[11px] mt-1 shrink-0 inline-block transition-transform" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
            &#9660;
          </span>
        </button>
        <div className="flex gap-1 shrink-0">
          <LevelButton label="L" ariaLabel={`Mark ${t.name} learned`} active={level === 'L'} onClick={() => onSetLevel('L')} />
          <LevelButton label="P" ariaLabel={`Mark ${t.name} practiced`} active={level === 'P'} onClick={() => onSetLevel('P')} />
          <LevelButton label="M" ariaLabel={`Mark ${t.name} mastered`} active={level === 'M'} onClick={() => onSetLevel('M')} />
        </div>
      </div>
      {open && (
        <div className="pt-3.5 pb-4 pr-4 border-t border-white/10" style={{ paddingLeft: 48 }}>
          <p className="text-[13px] leading-relaxed text-parchment-dim">{t.effect}</p>
        </div>
      )}
    </div>
  );
}

export default function StepTechniques({
  playbook,
  trainingName,
  techniqueLevels,
  onSetLevel,
}: {
  playbook: Playbook | null;
  trainingName: string | null;
  techniqueLevels: Record<string, TechniqueLevel>;
  onSetLevel: (name: string, level: TechniqueLevel | null) => void;
}) {
  const [openTechnique, setOpenTechnique] = useState<string | null>(null);
  const [browseAll, setBrowseAll] = useState(false);

  const playbookName = playbook ? playbook.name : 'No playbook yet';
  const startingName = playbook ? playbook.startingTechnique.name : null;

  const universalPool: Technique[] = playbook
    ? [{ ...playbook.startingTechnique, training: 'Universal' }, ...UNIVERSAL_TECHNIQUES.filter((t) => t.name !== startingName)]
    : UNIVERSAL_TECHNIQUES;
  const trainingPool: Technique[] = trainingName ? TECHNIQUES.filter((t) => browseAll || t.training === trainingName) : [];

  const masteredCount = Object.values(techniqueLevels).filter((v) => v === 'M').length;
  const learnedCount = Object.values(techniqueLevels).filter((v) => v === 'L').length;

  function renderCard(t: Technique) {
    const level = techniqueLevels[t.name] || null;
    return (
      <TechniqueCard
        key={t.name}
        t={t}
        level={level}
        open={openTechnique === t.name}
        isStarting={!!startingName && t.name === startingName}
        playbookName={playbookName}
        onToggleOpen={() => setOpenTechnique((cur) => (cur === t.name ? null : t.name))}
        onToggle={() => onSetLevel(t.name, level ? null : 'L')}
        onSetLevel={(lvl) => onSetLevel(t.name, lvl)}
      />
    );
  }

  const universalTab = (
    <>
      <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Universal techniques</p>
      <p className="text-[12.5px] leading-relaxed text-muted mb-3.5">
        Available to every character regardless of training. Your playbook’s starting technique is pre-selected as mastered — change or remove it if you prefer.
      </p>
      <div className="flex flex-col gap-2.5">{universalPool.map(renderCard)}</div>
    </>
  );

  const trainingTab = (
    <>
      <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">{trainingName || 'Training'} techniques</p>
      <p className="text-[12.5px] leading-relaxed text-muted mb-2.5">
        Techniques unique to your training{browseAll ? ' and every other training (ask your GM to convert one)' : ''}.
      </p>
      {!trainingName && <p className="text-[13.5px] text-muted mb-3">Choose a training first to see its techniques.</p>}
      <button onClick={() => setBrowseAll((v) => !v)} className="block w-fit whitespace-nowrap text-gold text-xs font-semibold mb-3.5">
        {browseAll ? 'Show only my training' : 'Browse other trainings'}
      </button>
      <div className="flex flex-col gap-2.5">{trainingPool.map(renderCard)}</div>
    </>
  );

  return (
    <section>
      <StepHeader
        title="Techniques"
        subtitle="Special combat abilities rated Learned, Practiced, or Mastered. Your playbook grants one mastered technique (pre-selected); most campaigns add one learned technique. Pick from the universal list or your training."
      />

      <div className="flex items-center justify-between gap-3 flex-wrap mb-6 px-4.5 py-3.5 rounded-xl bg-panel border border-gold/20">
        <p className="text-[12.5px] leading-relaxed text-muted flex-1 min-w-[180px]">
          Select a technique, then set its level with L / P / M. Counts show the standard start — your GM may allow more.
        </p>
        <div className="flex gap-2 shrink-0 flex-nowrap">
          <span className="px-4 py-2 rounded-full text-[12.5px] font-bold whitespace-nowrap inline-block bg-white/6 text-gold border border-gold/50">
            Mastered ({masteredCount}/1)
          </span>
          <span className="px-4 py-2 rounded-full text-[12.5px] font-bold whitespace-nowrap inline-block bg-white/6 text-gold border border-gold/50">
            Learned ({learnedCount}/1)
          </span>
        </div>
      </div>

      <TabbedStepPanel
        headerTitle={trainingName || 'No training yet'}
        headerLabel="Techniques"
        tabs={[
          { id: 'universal', label: 'Universal Techniques', content: universalTab },
          { id: 'training', label: `${trainingName || 'Training'} Techniques`, content: trainingTab },
        ]}
      />
    </section>
  );
}
