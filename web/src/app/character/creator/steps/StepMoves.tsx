import { Playbook } from '../data';

export default function StepMoves({
  playbook,
  selectedMoves,
  onToggle,
}: {
  playbook: Playbook | null;
  selectedMoves: string[];
  onToggle: (name: string) => void;
}) {
  return (
    <section>
      <h1 className="font-display font-semibold text-[30px] mb-2">Playbook moves</h1>
      <p className="text-parchment-dim text-[15px] mb-7 max-w-xl">Pick two moves to start with ({selectedMoves.length}/2 selected).</p>
      <div className="flex flex-col gap-3">
        {(playbook?.moves ?? []).map((mv) => {
          const checked = selectedMoves.includes(mv.name);
          return (
            <button
              key={mv.name}
              onClick={() => onToggle(mv.name)}
              className="text-left px-4.5 py-4 rounded-xl border flex gap-3.5"
              style={{ background: checked ? 'rgba(232,200,116,0.12)' : '#142a2e', borderColor: checked ? 'rgba(232,200,116,0.5)' : 'rgba(232,200,116,0.15)' }}
            >
              <div className="w-5 h-5 rounded-[5px] border-[1.5px] border-gold shrink-0 mt-0.5" style={{ background: checked ? '#e8c874' : 'transparent' }} />
              <div>
                <p className="font-display font-semibold text-[15px] text-parchment mb-1">{mv.name}</p>
                <p className="text-[13.5px] text-[#b9c2bd] leading-relaxed">{mv.effect}</p>
              </div>
            </button>
          );
        })}
      </div>
      {playbook && (
        <div className="mt-5 px-4.5 py-4 rounded-xl bg-gold/8 border border-gold/25">
          <p className="font-display font-semibold text-[15px] text-gold mb-1">Feature &middot; {playbook.feature.name}</p>
          <p className="text-[13.5px] text-parchment-dim leading-relaxed">{playbook.feature.effect}</p>
        </div>
      )}
    </section>
  );
}
