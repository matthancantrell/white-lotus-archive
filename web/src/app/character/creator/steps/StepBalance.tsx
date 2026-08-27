import { Playbook } from '../data';

export default function StepBalance({
  playbook,
  balanceShift,
  onShift,
}: {
  playbook: Playbook | null;
  balanceShift: number;
  onShift: (delta: -1 | 1) => void;
}) {
  const principleLeft = playbook ? playbook.principles[0] : '\u2014';
  const principleRight = playbook ? playbook.principles[1] : '\u2014';
  const centerIdx = 3;
  const posIdx = centerIdx + balanceShift;

  return (
    <section>
      <h1 className="font-display font-semibold text-[30px] mb-2">Balance</h1>
      <p className="text-parchment-dim text-[15px] mb-7 max-w-xl">
        Your balance is the tug-of-war between your two principles. It starts centered; you may shift it once now.
      </p>
      <div className="bg-ink-soft border border-gold/18 rounded-2xl p-7">
        <div className="flex justify-between mb-4.5">
          <span className="font-display text-[14.5px] text-[#9ec4e8]">{principleLeft}</span>
          <span className="font-display text-[14.5px] text-[#e8927a]">{principleRight}</span>
        </div>
        <div className="flex gap-1.5 mb-5">
          {Array.from({ length: 7 }, (_, i) => i - 3).map((val, i) => (
            <div
              key={val}
              className="flex-1 h-8.5 rounded-lg border flex items-center justify-center text-xs text-parchment"
              style={{
                background: i === posIdx ? '#e8c874' : 'rgba(245,238,221,0.06)',
                borderColor: i === posIdx ? '#e8c874' : 'rgba(245,238,221,0.15)',
                color: i === posIdx ? '#1a1108' : '#f5eedd',
              }}
            >
              {val === 0 ? '0' : val > 0 ? `+${val}` : val}
            </div>
          ))}
        </div>
        <div className="flex gap-3 justify-center">
          <button
            onClick={() => onShift(-1)}
            disabled={!playbook}
            className="bg-[#9ec4e8]/15 text-[#9ec4e8] px-4.5 py-2.5 rounded-full text-[13.5px] font-semibold border border-[#9ec4e8]/40 disabled:opacity-40"
          >
            &larr; Shift toward {principleLeft}
          </button>
          <button
            onClick={() => onShift(1)}
            disabled={!playbook}
            className="bg-[#e8927a]/15 text-[#e8927a] px-4.5 py-2.5 rounded-full text-[13.5px] font-semibold border border-[#e8927a]/40 disabled:opacity-40"
          >
            Shift toward {principleRight} &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
