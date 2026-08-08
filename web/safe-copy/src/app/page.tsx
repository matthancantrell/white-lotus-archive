'use client'

/* eslint-disable react/jsx-key */
import { useState } from 'react';
import { useCharacterCreationForm } from '@/app/characters/creator/useCharacterCreationForm';
import EraSelector from './characters/creator/eras/eraSelector';
import InformationPanel from './characters/creator/informationPanel';

export default function Home() {
    const [ selectedEra, setSelectedEra ] = useState<string | null>(null);
    const { steps, currentIndex, currentStep, isFirstStep, isLastStep, nextStep, previousStep } = useCharacterCreationForm([
        <div>One</div>,
        <div>Two</div>,
        <div>Three</div>
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
      <h1>Create a character</h1>

      <EraSelector selectedEra={selectedEra} onSelectEra={setSelectedEra} />
      <InformationPanel selectedEra={selectedEra} />

      <form>
          <div
              style={{ 
                  position: 'absolute',
                  top: '0.5rem',
                  right: '0.5rem',
                  color: 'black',
              }}
          >
              { currentIndex + 1} / {steps.length}
              {currentStep}
          </div>
          <div style = {{
              marginTop: '1rem',
              display: 'flex',
              gap: '0.5rem',
              justifyContent: 'flex-end',
          }}>

            {!isFirstStep && <button type="button" onClick={previousStep}>Back</button>}
            {!isLastStep && <button type="button" onClick={nextStep}>Next</button>}
          </div>
      </form>

    </div>
  )
}