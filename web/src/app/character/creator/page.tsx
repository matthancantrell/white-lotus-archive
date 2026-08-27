'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import LotusMark from '@/components/LotusMark';
import StepProgress from './StepProgress';
import StepEra from './steps/StepEra';
import StepPlaybook from './steps/StepPlaybook';
import StepTraining from './steps/StepTraining';
import StepStats from './steps/StepStats';
import StepBalance from './steps/StepBalance';
import StepMoves from './steps/StepMoves';
import StepTechniques from './steps/StepTechniques';
import StepIdentity from './steps/StepIdentity';
import StepConnections from './steps/StepConnections';
import StepGrowth from './steps/StepGrowth';
import { CharacterDraft, INITIAL_DRAFT, PLAYBOOKS, TOTAL_STEPS, Stats } from './data';

const STORAGE_KEY = 'wla_character_draft';
const SAVED_KEY = 'wla_saved_characters';

export default function CharacterCreatorPage() {
  const [draft, setDraft] = useState<CharacterDraft>(INITIAL_DRAFT);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setDraft(JSON.parse(raw));
    } catch {}
  }, []);

  function update(patch: Partial<CharacterDraft>) {
    setDraft((prev) => {
      const next = { ...prev, ...patch };
      try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
    setJustSaved(false);
  }

  function saveDraft() {
    try { window.localStorage.setItem(STORAGE_KEY, JSON.stringify(draft)); } catch {}
  }

  function saveCharacter() {
    try {
      const raw = window.localStorage.getItem(SAVED_KEY);
      const list = raw ? JSON.parse(raw) : [];
      list.push({ ...draft, savedAt: Date.now() });
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(list));
    } catch {}
    setJustSaved(true);
  }

  const playbook = PLAYBOOKS.find((p) => p.id === draft.playbookId) || null;

  function goNext() { update({ step: Math.min(TOTAL_STEPS, draft.step + 1) }); }
  function goBack() { update({ step: Math.max(1, draft.step - 1) }); }

  return (
    <div className="bg-ink text-parchment min-h-screen font-body">
      <header className="sticky top-0 z-20 flex items-center justify-between px-10 py-4.5 bg-ink/90 backdrop-blur-md border-b border-gold/15">
        <Link href="/" className="flex items-center gap-3">
          <LotusMark size={30} />
          <span className="font-display font-bold text-[17px] text-parchment">White Lotus Archive</span>
        </Link>
        <div className="flex items-center gap-5.5">
          <span className="text-[13.5px] text-muted hidden sm:inline">Draft auto-saves in this browser</span>
          <button onClick={saveDraft} className="bg-white/8 text-parchment px-4.5 py-2.5 rounded-full text-[13.5px] font-semibold border border-white/22">
            Save draft
          </button>
        </div>
      </header>

      <StepProgress draft={draft} playbookName={playbook ? playbook.name : 'No playbook yet'} onGoTo={(n) => update({ step: n })} />

      <main className="max-w-4xl mx-auto px-10 pt-9 pb-15">
        {draft.step === 1 && <StepEra eraName={draft.eraName} onSelect={(eraName) => update({ eraName })} />}
        {draft.step === 2 && (
          <StepPlaybook
            playbookId={draft.playbookId}
            onSelect={(playbookId) => update({ playbookId, statBonus: null, balanceShift: 0, selectedMoves: [] })}
          />
        )}
        {draft.step === 3 && (
          <StepTraining
            trainingName={draft.trainingName}
            fightingStyle={draft.fightingStyle}
            onSelectTraining={(trainingName) => update({ trainingName, selectedTechnique: null })}
            onFightingStyleChange={(fightingStyle) => update({ fightingStyle })}
          />
        )}
        {draft.step === 4 && (
          <StepStats
            playbook={playbook}
            statBonus={draft.statBonus}
            onBump={(key: keyof Stats) => update({ statBonus: draft.statBonus === key ? null : key })}
          />
        )}
        {draft.step === 5 && (
          <StepBalance
            playbook={playbook}
            balanceShift={draft.balanceShift}
            onShift={(delta) => update({ balanceShift: Math.max(-1, Math.min(1, draft.balanceShift + delta)) })}
          />
        )}
        {draft.step === 6 && (
          <StepMoves
            playbook={playbook}
            selectedMoves={draft.selectedMoves}
            onToggle={(name) => {
              const has = draft.selectedMoves.includes(name);
              let next = draft.selectedMoves;
              if (has) next = next.filter((n) => n !== name);
              else if (next.length < 2) next = [...next, name];
              update({ selectedMoves: next });
            }}
          />
        )}
        {draft.step === 7 && (
          <StepTechniques
            trainingName={draft.trainingName}
            selectedTechnique={draft.selectedTechnique}
            onSelect={(selectedTechnique) => update({ selectedTechnique })}
          />
        )}
        {draft.step === 8 && (
          <StepIdentity
            name={draft.name}
            hometown={draft.hometown}
            look={draft.look}
            background={draft.background}
            demeanor={draft.demeanor}
            onName={(name) => update({ name })}
            onHometown={(hometown) => update({ hometown })}
            onLook={(look) => update({ look })}
            onBackground={(background) => update({ background })}
            onDemeanor={(demeanor) => update({ demeanor })}
          />
        )}
        {draft.step === 9 && (
          <StepConnections
            connections={draft.connections}
            onAdd={() => update({ connections: [...draft.connections, { name: '', note: '' }] })}
            onRemove={(i) => update({ connections: draft.connections.filter((_, j) => j !== i) })}
            onUpdate={(i, patch) => {
              const next = draft.connections.slice();
              next[i] = { ...next[i], ...patch };
              update({ connections: next });
            }}
          />
        )}
        {draft.step === 10 && (
          <StepGrowth
            playbook={playbook}
            trainingName={draft.trainingName}
            eraName={draft.eraName}
            name={draft.name}
            justSaved={justSaved}
            onSave={saveCharacter}
          />
        )}

        <div className="flex justify-between mt-10 pt-6 border-t border-gold/12">
          <button
            onClick={goBack}
            disabled={draft.step === 1}
            className="px-6 py-3 rounded-full text-[14.5px] font-semibold border border-white/20"
            style={{ color: draft.step === 1 ? '#4d5a56' : '#f5eedd' }}
          >
            &larr; Back
          </button>
          {draft.step === TOTAL_STEPS ? (
            <Link href="/" className="bg-white/8 text-parchment px-6.5 py-3 rounded-full text-[14.5px] font-semibold border border-white/25">
              Done &middot; back home
            </Link>
          ) : (
            <button onClick={goNext} className="bg-gold text-gold-ink px-7 py-3 rounded-full text-[14.5px] font-bold hover:brightness-95">
              Next &rarr;
            </button>
          )}
        </div>
      </main>
    </div>
  );
}
