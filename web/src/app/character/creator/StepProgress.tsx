import { CharacterDraft, TOTAL_STEPS, STEP_LABELS, ERA_HEADER_LABEL } from './data';

export default function StepProgress({
  draft,
  playbookName,
  onGoTo,
}: {
  draft: CharacterDraft;
  playbookName: string;
  onGoTo: (n: number) => void;
}) {
  const progressPct = Math.round((draft.step / TOTAL_STEPS) * 100);
  const eraLabel = draft.eraName ? ERA_HEADER_LABEL[draft.eraName] || draft.eraName : 'No era yet';

  return (
    <div className="max-w-4xl mx-auto px-[clamp(16px,5vw,40px)] pt-[clamp(18px,4vw,28px)]">
      <div className="flex justify-between items-center gap-4 mb-3.5 flex-wrap">
        <p className="font-display text-[12.5px] tracking-[0.2em] uppercase text-gold whitespace-nowrap">
          Step {draft.step} of {TOTAL_STEPS} &middot; {STEP_LABELS[draft.step - 1]}
        </p>
        <div className="flex items-center gap-2 text-[12.5px] text-faint whitespace-nowrap overflow-hidden text-ellipsis">
          <span>{eraLabel}</span>
          <span className="w-1 h-1 rounded-full bg-faint shrink-0" />
          <span>{playbookName}</span>
        </div>
      </div>
      <div className="h-1.5 rounded-full bg-white/8 overflow-hidden">
        <div className="h-full bg-gold rounded-full transition-[width] duration-300" style={{ width: `${progressPct}%` }} />
      </div>
      <div className="flex gap-1.5 mt-3.5 flex-wrap">
        {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((n) => {
          const active = n === draft.step;
          const done = n < draft.step;
          return (
            <button
              key={n}
              onClick={() => onGoTo(n)}
              className="w-6.5 h-6.5 rounded-full flex items-center justify-center text-[11px] font-bold border"
              style={{
                background: active ? '#e8c874' : done ? 'rgba(232,200,116,0.25)' : 'rgba(245,238,221,0.06)',
                color: active ? '#1a1108' : '#cfc7b3',
                borderColor: active ? '#e8c874' : 'rgba(245,238,221,0.2)',
              }}
            >
              {n}
            </button>
          );
        })}
      </div>
    </div>
  );
}
