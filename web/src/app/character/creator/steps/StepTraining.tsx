import { TRAININGS } from '../data';
import StepHeader from '../StepHeader';
import TabbedStepPanel from '../TabbedStepPanel';
import ChoiceCard from '../ChoiceCard';
import { TextArea } from '../TextField';

// Bending arts are limited to one per character; Weapons and Technology can
// stand alongside one (or each other) for playbooks that start with more than
// one training.
const BENDING_ARTS = ['Waterbending', 'Earthbending', 'Firebending', 'Airbending'];

export default function StepTraining({
  playbookName,
  trainingNames,
  trainingCount,
  fightingStyle,
  onToggleTraining,
  onFightingStyleChange,
}: {
  playbookName: string;
  trainingNames: string[];
  trainingCount: number;
  fightingStyle: string;
  onToggleTraining: (name: string) => void;
  onFightingStyleChange: (v: string) => void;
}) {
  const pickTab = (
    <>
      <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Training &middot; choose {trainingCount}</p>
      <p className="text-[12.5px] leading-relaxed text-muted mb-3.5">
        Bending arts are limited to one per character. Weapons covers any martial discipline — blades, staves, chi-blocking, or bare hands. Technology is gadgets and machines.
      </p>
      <div className="flex flex-col gap-2.5">
        {TRAININGS.map((t) => {
          const selected = trainingNames.includes(t.name);
          const blocked =
            !selected &&
            (trainingNames.length >= trainingCount ||
              (BENDING_ARTS.includes(t.name) && trainingNames.some((n) => BENDING_ARTS.includes(n))));
          return (
            <ChoiceCard
              key={t.name}
              selected={selected}
              onClick={() => { if (!blocked) onToggleTraining(t.name); }}
              className={`flex items-center gap-3.5 text-left px-4 py-3.5${blocked ? ' opacity-40 cursor-not-allowed' : ''}`}
            >
              <div
                className="w-5 h-5 rounded-full border-[1.5px] border-gold shrink-0 flex items-center justify-center"
                style={{ background: selected ? '#e8c874' : 'transparent' }}
              >
                {selected && <span className="text-[#1a1108] text-xs font-bold">&#10003;</span>}
              </div>
              <div className="min-w-0">
                <p className="font-display font-semibold text-sm text-parchment mb-0.5">{t.name}</p>
                <p className="text-[12.5px] leading-relaxed text-[#b9c2bd]">{t.desc}</p>
              </div>
            </ChoiceCard>
          );
        })}
      </div>
    </>
  );

  const styleTab = (
    <>
      <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Fighting style</p>
      <p className="text-[12.5px] leading-relaxed text-muted mb-3.5">
        There is no list — a word or phrase for your personal approach. An earthbender might favor &ldquo;brute boulder tossing&rdquo;; a weapons fighter, &ldquo;paper-fan slicing.&rdquo; Work with your GM.
      </p>
      <TextArea
        value={fightingStyle}
        onChange={(e) => onFightingStyleChange(e.target.value)}
        placeholder="e.g. Fluid and evasive, striking only when the opening is certain"
        rows={3}
        className="resize-y"
      />
    </>
  );

  return (
    <section>
      <StepHeader
        title="Training & fighting style"
        subtitle="Training is how you fight — one of the four bending arts, weapons, or technology. Fighting style is how you make it your own."
      />
      <TabbedStepPanel
        headerTitle={playbookName}
        headerLabel="Training"
        tabs={[
          { id: 'pick', label: `Training (${trainingNames.length}/${trainingCount})`, content: pickTab },
          { id: 'style', label: fightingStyle.trim() ? 'Fighting Style ✓' : 'Fighting Style', content: styleTab },
        ]}
      />
    </section>
  );
}
