import { TRAININGS } from '../data';
import StepHeader from '../StepHeader';
import ChoiceCard from '../ChoiceCard';
import { TextField } from '../TextField';

export default function StepTraining({
  trainingName,
  fightingStyle,
  onSelectTraining,
  onFightingStyleChange,
}: {
  trainingName: string | null;
  fightingStyle: string;
  onSelectTraining: (name: string) => void;
  onFightingStyleChange: (v: string) => void;
}) {
  return (
    <section>
      <StepHeader
        title="Training & fighting style"
        subtitle="Training defines how you fight — bending, weapons, or hand-to-hand. Fighting style is how you make that your own."
      />
      <div className="grid grid-cols-[repeat(auto-fit,minmax(120px,1fr))] gap-3 mb-7">
        {TRAININGS.map((t) => {
          const selected = trainingName === t;
          return (
            <ChoiceCard key={t} selected={selected} onClick={() => onSelectTraining(t)} className="text-center px-2.5 py-4">
              <p className="font-display font-semibold text-[14.5px]">{t}</p>
            </ChoiceCard>
          );
        })}
      </div>
      <label className="block text-[13px] text-muted mb-2">Fighting style (a word or phrase describing your personal approach)</label>
      <TextField
        type="text"
        value={fightingStyle}
        onChange={(e) => onFightingStyleChange(e.target.value)}
        placeholder="e.g. Fluid and evasive, striking only when the opening is certain"
      />
    </section>
  );
}
