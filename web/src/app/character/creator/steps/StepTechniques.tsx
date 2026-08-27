import { TECHNIQUES } from '../data';

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
      <h1 className="font-display font-semibold text-[30px] mb-2">Starting technique</h1>
      <p className="text-parchment-dim text-[15px] mb-7 max-w-xl">
        Based on your training in {trainingName || 'no training yet'}, choose one technique you&rsquo;ve already mastered.
      </p>
      <div className="grid grid-cols-2 gap-3">
        {options.map((tq) => {
          const selected = selectedTechnique === tq.name;
          return (
            <button
              key={tq.name}
              onClick={() => onSelect(tq.name)}
              className="text-left px-4.5 py-4 rounded-xl border"
              style={{ background: selected ? 'rgba(232,200,116,0.14)' : '#142a2e', borderColor: selected ? 'rgba(232,200,116,0.5)' : 'rgba(232,200,116,0.15)' }}
            >
              <p className="font-display font-semibold text-[15px] mb-1">{tq.name}</p>
              <p className="text-[13px] text-[#b9c2bd]">{tq.effect}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
