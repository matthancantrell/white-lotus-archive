'use client';

import { useCharacterCreationForm } from './useCharacterCreationForm';
import StepOne from './stepOne';

export default function CharacterCreatorPage() {
    const { steps, currentIndex } = useCharacterCreationForm([
        <StepOne key="step-one" />,
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
                fontFamily: 'Arial'
            }}
        >
            <div
                style={{
                    position: 'absolute',
                    top: '0.5rem',
                    right: '0.5rem',
                }}
            >
                {currentIndex + 1} / {steps.length}
            </div>

            {steps[currentIndex]}
        </div>
    )
}