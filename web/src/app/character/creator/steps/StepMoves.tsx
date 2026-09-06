import { Playbook } from '../data';
import StepHeader from '../StepHeader';
import ChoiceCard from '../ChoiceCard';
import { highlightStats } from '../highlightStats';

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
      <StepHeader title="Playbook moves" subtitle={`Pick two moves to start with (${selectedMoves.length}/2 selected).`} />
      <div className="flex flex-col gap-3">
        {(playbook?.moves ?? []).map((mv) => {
          const checked = selectedMoves.includes(mv.name);
          return (
            <ChoiceCard key={mv.name} selected={checked} onClick={() => onToggle(mv.name)} className="text-left px-4.5 py-4 flex gap-3.5">
              <div className="w-5 h-5 rounded-[5px] border-[1.5px] border-gold shrink-0 mt-0.5" style={{ background: checked ? '#e8c874' : 'transparent' }} />
              <div>
                <p className="font-display font-semibold text-[15px] text-parchment mb-1">{mv.name}</p>
                <p className="text-[13.5px] text-[#b9c2bd] leading-relaxed">{highlightStats(mv.effect)}</p>
              </div>
            </ChoiceCard>
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
