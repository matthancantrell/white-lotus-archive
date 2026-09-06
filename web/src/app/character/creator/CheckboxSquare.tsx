// The rounded-square checkbox (gold border, filled + checkmark when checked) used
// to toggle selection in an expandable card — backgrounds in StepConcept, techniques
// in StepTechniques. `className` lets a caller nudge alignment (e.g. StepTechniques'
// items-start rows need a small top margin the items-center ones don't).
export default function CheckboxSquare({
  checked,
  onClick,
  ariaLabel,
  className = '',
}: {
  checked: boolean;
  onClick: () => void;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={ariaLabel}
      className={`w-5 h-5 rounded-[5px] border-[1.5px] border-gold shrink-0 flex items-center justify-center ${className}`}
      style={{ background: checked ? '#e8c874' : 'transparent' }}
    >
      {checked && <span className="text-[#1a1108] text-xs font-bold">&#10003;</span>}
    </button>
  );
}
