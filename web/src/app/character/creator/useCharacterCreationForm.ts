import { ReactElement, useState } from 'react';

export function useCharacterCreationForm(steps: ReactElement[]) {
    const [currentStep, setCurrentStep] = useState(0);

    function nextStep() {
        setCurrentStep(i => {
            if (i >= steps.length - 1) return i;
            return i + 1;
        });
    }

    function previousStep() {
        setCurrentStep(i => {
            if (i <= 0) return i;
            return i - 1;
        });
    }

    function goToStep(index: number) { setCurrentStep(index); }

    return {
        currentIndex: currentStep,
        currentStep: steps[currentStep],
        steps,
        isFirstStep: currentStep === 0,
        isLastStep: currentStep === steps.length - 1,
        goToStep,
        nextStep,
        previousStep,
    }
}