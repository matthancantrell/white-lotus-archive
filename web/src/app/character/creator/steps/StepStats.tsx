import { Playbook, Stats } from '../data';

const STAT_ROWS: [keyof Stats, string][] = [
  ['creativity', 'Creativity'],
  ['focus', 'Focus'],
  ['harmony', 'Harmony'],
  ['passion', 'Passion'],
];

export default function StepStats({
  playbook,
  statBonus,
  onBump,
}: {
  playbook: Playbook | null;
  statBonus: keyof Stats | null;
  onBump: (key: keyof Stats) => void;
}) {
  return (
    <section>
      <h1 className="font-display font-semibold text-[30px] mb-2">Stats</h1>
      <p className="text-parchment-dim text-[15px] mb-7 max-w-xl">Your playbook sets your starting array. You may add +1 to one stat (max +2).</p>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-3.5">
        {STAT_ROWS.map(([key, label]) => {
          const base = playbook ? playbook.stats[key] : 0;
          const bonus = statBonus === key ? 1 : 0;
          const val = base + bonus;
          const active = statBonus === key;
          return (
            <div key={key} className="p-5 rounded-2xl bg-ink-soft border border-gold/18 text-center">
              <p className="font-display text-[13.5px] text-gold tracking-wide uppercase mb-2.5">{label}</p>
              <p className="font-display font-bold text-[30px] mb-3.5">{val >= 0 ? `+${val}` : val}</p>
              <button
                onClick={() => onBump(key)}
                disabled={!playbook}
                className="text-[12.5px] px-3.5 py-1.5 rounded-full border border-gold/40 disabled:opacity-40"
                style={{ background: active ? '#e8c874' : 'rgba(245,238,221,0.06)', color: active ? '#1a1108' : '#e8c874' }}
              >
                +1 here
              </button>
            </div>
          );
        })}
      </div>
    </section>
  );
}
