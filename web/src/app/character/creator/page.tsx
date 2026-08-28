'use client';

import { Suspense, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import LotusMark from '@/components/LotusMark';
import StepProgress from './StepProgress';
import Step1Setup from './Step1Setup';
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

const SAVED_KEY = 'wla_saved_characters';

function makeCharacterId() {
  try { return crypto.randomUUID(); } catch { return 'char_' + Date.now() + '_' + Math.random().toString(36).slice(2); }
}

function loadSavedList(): (CharacterDraft & { characterId: string; status: string; updatedAt: number })[] {
  try {
    const raw = window.localStorage.getItem(SAVED_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function CharacterCreatorInner() {
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  const [draft, setDraft] = useState<CharacterDraft>(() => {
    // Editing an existing saved character (linked from the character manager) loads it by id.
    // Any other visit to the creator always starts a blank character.
    if (typeof window !== 'undefined' && editId) {
      const existing = loadSavedList().find((c) => c.characterId === editId);
      if (existing) return existing;
    }
    return { ...INITIAL_DRAFT, characterId: makeCharacterId() } as CharacterDraft;
  });
  const [justSaved, setJustSaved] = useState(false);

  function update(patch: Partial<CharacterDraft>) {
    setDraft((prev) => ({ ...prev, ...patch }));
    setJustSaved(false);
  }

  function upsertSaved(status: 'draft' | 'complete') {
    try {
      const list = loadSavedList();
      const record = { ...draft, status, updatedAt: Date.now() };
      const idx = list.findIndex((c) => c.characterId === draft.characterId);
      if (idx >= 0) list[idx] = record; else list.push(record);
      window.localStorage.setItem(SAVED_KEY, JSON.stringify(list));
    } catch {}
  }

  function saveDraft() {
    upsertSaved('draft');
    setJustSaved(true);
  }

  function saveCharacter() {
    upsertSaved('complete');
    setJustSaved(true);
  }

  const playbook = PLAYBOOKS.find((p) => p.id === draft.playbookId) || null;

  function goNext() { update({ step: Math.min(TOTAL_STEPS, draft.step + 1) }); }
  function goBack() { update({ step: Math.max(1, draft.step - 1) }); }

  return (
    <div className="bg-ink text-parchment min-h-screen font-body">
      <header className="sticky top-0 z-20 flex items-center justify-between flex-wrap gap-y-2.5 px-[clamp(16px,5vw,40px)] py-[clamp(12px,3vw,18px)] bg-ink/90 backdrop-blur-md border-b border-gold/15">
        <Link href="/" className="flex items-center gap-3">
          <LotusMark size={30} />
          <span className="font-display font-bold text-[17px] text-parchment">White Lotus Archive</span>
        </Link>
        <div className="flex items-center gap-5.5">
          <span className="text-[13.5px] text-muted hidden sm:inline">Save your progress to revisit this character later</span>
          <button onClick={saveDraft} className="bg-white/8 text-parchment px-4.5 py-2.5 rounded-full text-[13.5px] font-semibold border border-white/22">
            Save draft
          </button>
        </div>
      </header>

      <StepProgress draft={draft} playbookName={playbook ? playbook.name : 'No playbook yet'} onGoTo={(n) => update({ step: n })} />

      <main className="max-w-7xl mx-auto px-[clamp(16px,5vw,40px)] pt-[clamp(24px,5vw,36px)] pb-15">
        {draft.step === 1 && (
          <Step1Setup
            eraName={draft.eraName}
            name={draft.name}
            portraitId={draft.portraitId}
            scopeText={draft.scopeText}
            groupFocusesText={draft.groupFocusesText}
            onSelectEra={(eraName) => update({ eraName })}
            onName={(name) => update({ name })}
            onPortrait={(portraitId) => update({ portraitId })}
            onScope={(scopeText) => update({ scopeText })}
            onGroupFocuses={(groupFocusesText) => update({ groupFocusesText })}
          />
        )}
        {draft.step === 2 && (
          <StepPlaybook
            playbookId={draft.playbookId}
            onSelect={(playbookId) => update({ playbookId, statBonus: null, balanceShift: 0, selectedMoves: [] })}
            onAdvance={goNext}
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
            look={draft.look}
            background={draft.background}
            demeanor={draft.demeanor}
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

        <div className="flex justify-between flex-wrap gap-3 mt-10 pt-6 border-t border-gold/12">
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

export default function CharacterCreatorPage() {
  return (
    <Suspense fallback={null}>
      <CharacterCreatorInner />
    </Suspense>
  );
}
