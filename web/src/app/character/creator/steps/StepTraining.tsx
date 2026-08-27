import { TRAININGS } from '../data';

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
      <h1 className="font-display font-semibold text-[30px] mb-2">Training &amp; fighting style</h1>
      <p className="text-parchment-dim text-[15px] mb-7 max-w-xl">
        Training defines how you fight &mdash; bending, weapons, or hand-to-hand. Fighting style is how you make that your own.
      </p>
      <div className="grid grid-cols-4 gap-3 mb-7">
        {TRAININGS.map((t) => {
          const selected = trainingName === t;
          return (
            <button
              key={t}
              onClick={() => onSelectTraining(t)}
              className="text-center px-2.5 py-4 rounded-xl border"
              style={{
                background: selected ? 'rgba(232,200,116,0.14)' : '#142a2e',
                borderColor: selected ? 'rgba(232,200,116,0.5)' : 'rgba(232,200,116,0.15)',
              }}
            >
              <p className="font-display font-semibold text-[14.5px]">{t}</p>
            </button>
          );
        })}
      </div>
      <label className="block text-[13px] text-muted mb-2">Fighting style (a word or phrase describing your personal approach)</label>
      <input
        type="text"
        value={fightingStyle}
        onChange={(e) => onFightingStyleChange(e.target.value)}
        placeholder="e.g. Fluid and evasive, striking only when the opening is certain"
        className="w-full box-border bg-white/6 border border-white/18 rounded-[10px] px-3.5 py-3 text-parchment text-[14.5px] placeholder:text-[#6f827d] focus:outline-none focus:border-gold"
      />
    </section>
  );
}
