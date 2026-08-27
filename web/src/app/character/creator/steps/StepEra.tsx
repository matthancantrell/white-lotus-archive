import { ERAS } from '../data';

export default function StepEra({ eraName, onSelect }: { eraName: string | null; onSelect: (name: string) => void }) {
  return (
    <section>
      <h1 className="font-display font-semibold text-[30px] mb-2">Choose your era and setting</h1>
      <p className="text-parchment-dim text-[15px] mb-7">This sets the backdrop for your story &mdash; talk to your GM if you&rsquo;re joining an existing campaign.</p>
      <div className="grid grid-cols-3 gap-4">
        {ERAS.map((era) => {
          const selected = eraName === era.name;
          return (
            <button
              key={era.name}
              onClick={() => onSelect(era.name)}
              className="text-left p-4.5 rounded-2xl border"
              style={{
                background: selected ? 'rgba(232,200,116,0.14)' : '#142a2e',
                borderColor: selected ? 'rgba(232,200,116,0.5)' : 'rgba(232,200,116,0.15)',
              }}
            >
              <p className={`mb-1 text-[11px] tracking-[0.14em] uppercase ${era.accent}`}>{era.tag}</p>
              <p className="font-display font-semibold text-[16.5px]">{era.name}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
