'use client';

import { useState } from 'react';
import { useCharacterCreationForm } from './useCharacterCreationForm';
import StepOne from './stepOne';
import StepTwo from './stepTwo';

export interface CharacterDraft {
    era: string | null;
    name: string;
}

export default function CharacterCreatorPage() {
    const [draft, setDraft] = useState<CharacterDraft>({ era: null, name: '' });

    function updateDraft(patch: Partial<CharacterDraft>) {
        setDraft((prev) => ({ ...prev, ...patch }));
    }

    const { steps, currentIndex, isFirstStep, isLastStep, nextStep, previousStep } =
        useCharacterCreationForm([
            <StepOne
                key="step-one"
                selectedEra={draft.era}
                onSelectEra={(era) => updateDraft({ era })}
            />,
            <StepTwo
                key="step-two"
                name={draft.name}
                onNameChange={(name) => updateDraft({ name })}
            />,
        ]);

    return (
        <div
            style={{
                position: 'relative',
                background: 'white',
                border: '1px solid black',
                padding: '2rem',
                margin: '1rem',
                borderRadius: '0.5rem',
                fontFamily: 'Arial',
            }}
        >
            <div style={{ position: 'absolute', top: '0.5rem', right: '0.5rem', color: 'black' }}>
                {currentIndex + 1} / {steps.length}
            </div>

            {steps[currentIndex]}

            <div style={{ marginTop: '1.5rem', display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                {!isFirstStep && <button type="button" onClick={previousStep}>Back</button>}
                {!isLastStep && <button type="button" onClick={nextStep}>Next</button>}
            </div>
        </div>
    );
}