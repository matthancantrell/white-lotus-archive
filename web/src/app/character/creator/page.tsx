'use client';

import { Suspense, useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import LotusMark from '@/components/LotusMark';
import { createCharacter, getCharacter, updateCharacter } from '@/lib/charactersApi';
import StepProgress from './StepProgress';
import Step1Setup from './Step1Setup';
import StepPlaybook from './steps/StepPlaybook';
import StepConcept from './steps/StepConcept';
import StepTraining from './steps/StepTraining';
import StepBalance from './steps/StepBalance';
import StepTechniques from './steps/StepTechniques';
import StepConnections from './steps/StepConnections';
import StepGrowth from './steps/StepGrowth';
import { CharacterDraft, INITIAL_DRAFT, PLAYBOOKS, TOTAL_STEPS, Stats, TechniqueLevel } from './data';

function CharacterCreatorInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get('id');

  // Loading is only relevant when editing an existing character (editId set) —
  // a brand-new draft has nothing to fetch and starts ready immediately.
  const [draft, setDraft] = useState<CharacterDraft | null>(editId ? null : { ...INITIAL_DRAFT });
  const [loading, setLoading] = useState(!!editId);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    if (!editId) return;
    let cancelled = false;
    setLoading(true);
    setLoadError(null);
    getCharacter(editId)
      .then((record) => {
        if (cancelled) return;
        // Merge under INITIAL_DRAFT rather than trusting the saved shape as-is —
        // a character saved before a field (hometown, techniqueLevels, ...) existed
        // would otherwise come back with that field missing instead of its default.
        setDraft({ ...INITIAL_DRAFT, ...record.data, characterId: record.id });
      })
      .catch((err) => {
        if (!cancelled) setLoadError(err instanceof Error ? err.message : 'Could not load that character.');
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [editId]);

  function update(patch: Partial<CharacterDraft>) {
    setDraft((prev) => (prev ? { ...prev, ...patch } : prev));
    setJustSaved(false);
  }

  // The only way a character reaches the database at all — there's no separate
  // "save draft" path. Called once, from the last step's "Save character to my
  // archive" (and again on subsequent edits to an already-saved character).
  async function persist() {
    if (!draft) return;
    setSaving(true);
    setSaveError(null);
    try {
      const record = draft.characterId
        ? await updateCharacter(draft.characterId, draft)
        : await createCharacter(draft);
      setDraft((prev) => (prev ? { ...prev, characterId: record.id } : prev));
      if (!draft.characterId) {
        // First save assigns the permanent id — reflect it in the URL so a refresh
        // (or sharing the link) keeps editing this same character.
        router.replace(`/character/creator?id=${record.id}`);
      }
      setJustSaved(true);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Could not save your character.');
    } finally {
      setSaving(false);
    }
  }

  const playbook = draft ? PLAYBOOKS.find((p) => p.id === draft.playbookId) || null : null;

  function goNext() { if (draft) update({ step: Math.min(TOTAL_STEPS, draft.step + 1) }); }
  function goBack() { if (draft) update({ step: Math.max(1, draft.step - 1) }); }

  return (
    <div className="bg-ink text-parchment min-h-screen font-body">
      <header className="sticky top-0 z-20 flex items-center justify-between flex-wrap gap-y-2.5 px-[clamp(16px,5vw,40px)] py-[clamp(12px,3vw,18px)] bg-ink/90 backdrop-blur-md border-b border-gold/15">
        <Link href="/" className="flex items-center gap-3">
          <LotusMark size={30} />
          <span className="font-display font-bold text-[17px] text-parchment">White Lotus Archive</span>
        </Link>
        <span className="text-[13.5px] text-muted hidden sm:inline">Finish every step to save your character to your archive</span>
      </header>

      {loading && (
        <div className="max-w-4xl mx-auto px-[clamp(16px,5vw,40px)] py-20 text-center text-muted">Loading your character…</div>
      )}

      {!loading && loadError && (
        <div className="max-w-4xl mx-auto px-[clamp(16px,5vw,40px)] py-20 text-center">
          <p className="text-[#e8927a] mb-4">{loadError}</p>
          <Link href="/character/manager" className="text-gold font-semibold">&larr; Back to your characters</Link>
        </div>
      )}

      {!loading && !loadError && draft && (
        <>
          <StepProgress draft={draft} playbookName={playbook ? playbook.name : 'No playbook yet'} onGoTo={(n) => update({ step: n })} />

          <main className="max-w-7xl mx-auto px-[clamp(16px,5vw,40px)] pt-[clamp(24px,5vw,36px)] pb-15">
            {draft.step === 1 && (
              <Step1Setup
                eraName={draft.eraName}
                name={draft.name}
                iconId={draft.iconId}
                scopeText={draft.scopeText}
                groupFocusesText={draft.groupFocusesText}
                onSelectEra={(eraName) => update({ eraName })}
                onName={(name) => update({ name })}
                onIcon={(iconId) => update({ iconId })}
                onScope={(scopeText) => update({ scopeText })}
                onGroupFocuses={(groupFocusesText) => update({ groupFocusesText })}
              />
            )}
            {draft.step === 2 && (
              <StepPlaybook
                playbookId={draft.playbookId}
                onSelect={(playbookId) => {
                  // Confirming a playbook grants its starting technique at Mastered and
                  // clears out anything tied to whichever playbook was picked before
                  // (its stat bump, balance shift, moves, history answers, techniques).
                  const newPlaybook = playbookId ? PLAYBOOKS.find((p) => p.id === playbookId) ?? null : null;
                  update({
                    playbookId,
                    statBonus: null,
                    balanceShift: 0,
                    selectedMoves: [],
                    history: [],
                    techniqueLevels: newPlaybook ? { [newPlaybook.startingTechnique.name]: 'M' } : {},
                  });
                }}
                statBonus={draft.statBonus}
                onBump={(key: keyof Stats) => update({ statBonus: draft.statBonus === key ? null : key })}
                selectedMoves={draft.selectedMoves}
                onToggleMove={(name) => {
                  const has = draft.selectedMoves.includes(name);
                  let next = draft.selectedMoves;
                  if (has) next = next.filter((n) => n !== name);
                  else if (next.length < 2) next = [...next, name];
                  update({ selectedMoves: next });
                }}
              />
            )}
            {draft.step === 3 && (
              <StepConcept
                name={draft.name}
                playbook={playbook}
                hometown={draft.hometown}
                onHometown={(hometown) => update({ hometown })}
                look={draft.look}
                onLook={(look) => update({ look })}
                demeanor={draft.demeanor}
                onDemeanor={(demeanor) => update({ demeanor })}
                backgrounds={draft.backgrounds}
                onToggleBackground={(name) => {
                  const has = draft.backgrounds.includes(name);
                  let next = draft.backgrounds;
                  if (has) next = next.filter((n) => n !== name);
                  else if (next.length < 2) next = [...next, name];
                  update({ backgrounds: next });
                }}
                history={draft.history}
                onHistoryChange={(i, value) => {
                  const next = draft.history.slice();
                  next[i] = value;
                  update({ history: next });
                }}
              />
            )}
            {draft.step === 4 && (
              <StepTraining
                playbookName={playbook ? playbook.name : 'No playbook yet'}
                trainingName={draft.trainingName}
                fightingStyle={draft.fightingStyle}
                onSelectTraining={(trainingName) => {
                  // Switching (or clearing) training drops any training-specific technique
                  // choices, but keeps the playbook's own granted technique if it had a level set.
                  const startName = playbook?.startingTechnique.name;
                  const keep: Record<string, TechniqueLevel> = startName && draft.techniqueLevels[startName]
                    ? { [startName]: draft.techniqueLevels[startName] }
                    : {};
                  update({ trainingName, techniqueLevels: keep });
                }}
                onFightingStyleChange={(fightingStyle) => update({ fightingStyle })}
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
              <StepTechniques
                playbook={playbook}
                trainingName={draft.trainingName}
                techniqueLevels={draft.techniqueLevels}
                onSetLevel={(name, level) => {
                  const next = { ...draft.techniqueLevels };
                  if (level === null) delete next[name]; else next[name] = level;
                  update({ techniqueLevels: next });
                }}
              />
            )}
            {draft.step === 7 && (
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
            {draft.step === 8 && (
              <StepGrowth
                playbook={playbook}
                trainingName={draft.trainingName}
                eraName={draft.eraName}
                name={draft.name}
                saving={saving}
                saveError={saveError}
                justSaved={justSaved}
                onSave={persist}
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
                draft.characterId ? (
                  <Link href="/character/manager" className="bg-white/8 text-parchment px-6.5 py-3 rounded-full text-[14.5px] font-semibold border border-white/25">
                    Done &middot; back to my characters
                  </Link>
                ) : (
                  <span className="text-muted text-[13.5px] italic">Save your character above to finish</span>
                )
              ) : (
                <button onClick={goNext} className="bg-gold text-gold-ink px-7 py-3 rounded-full text-[14.5px] font-bold hover:brightness-95">
                  Next &rarr;
                </button>
              )}
            </div>
          </main>
        </>
      )}
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
