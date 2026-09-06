import { TECHNIQUES } from '../data';
import StepHeader from '../StepHeader';
import ChoiceCard from '../ChoiceCard';

export default function StepTechniques({
  trainingName,
  selectedTechnique,
  onSelect,
}: {
  trainingName: string | null;
  selectedTechnique: string | null;
  onSelect: (name: string) => void;
}) {
  const options = trainingName ? TECHNIQUES[trainingName] ?? [] : [];
  return (
    <section>
      <StepHeader
        title="Starting technique"
        subtitle={<>Based on your training in {trainingName || 'no training yet'}, choose one technique you&rsquo;ve already mastered.</>}
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-3">
        {options.map((tq) => {
          const selected = selectedTechnique === tq.name;
          return (
            <ChoiceCard key={tq.name} selected={selected} onClick={() => onSelect(tq.name)} className="text-left px-4.5 py-4">
              <p className="font-display font-semibold text-[15px] mb-1">{tq.name}</p>
              <p className="text-[13px] text-[#b9c2bd]">{tq.effect}</p>
            </ChoiceCard>
          );
        })}
      </div>
    </section>
  );
}
