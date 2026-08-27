import { PLAYBOOKS } from '../data';

export default function StepPlaybook({ playbookId, onSelect }: { playbookId: string | null; onSelect: (id: string) => void }) {
  return (
    <section>
      <h1 className="font-display font-semibold text-[30px] mb-2">Choose your playbook</h1>
      <p className="text-parchment-dim text-[15px] mb-7 max-w-xl">
        Your playbook is your archetype &mdash; it sets your stats, your balance principles, and the moves available to you. Only one player per playbook in a party.
      </p>
      <div className="grid grid-cols-2 gap-3.5">
        {PLAYBOOKS.map((pb) => {
          const selected = playbookId === pb.id;
          return (
            <button
              key={pb.id}
              onClick={() => onSelect(pb.id)}
              className="text-left px-5 py-4.5 rounded-2xl border"
              style={{
                background: selected ? 'rgba(232,200,116,0.14)' : '#142a2e',
                borderColor: selected ? 'rgba(232,200,116,0.5)' : 'rgba(232,200,116,0.15)',
              }}
            >
              <div className="flex justify-between items-baseline mb-1.5">
                <p className="font-display font-semibold text-lg text-parchment">{pb.name}</p>
                <p className="text-[11px] text-gold tracking-wide">{pb.principles.join(' / ')}</p>
              </div>
              <p className="text-[13.5px] text-[#b9c2bd] leading-relaxed">{pb.tagline}</p>
            </button>
          );
        })}
      </div>
    </section>
  );
}
