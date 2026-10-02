// Shared input styling for the character creator's plain-page text fields (as opposed
// to the auth pages' — see components/AuthTextField.tsx for those, which use a
// different background/focus treatment). `compact` matches the smaller inline-grid
// sizing StepConnections needs; everything else uses the standard full-width size.
// Extra classes (resize-y, spacing, etc.) and any other input/textarea props pass through.

const BASE = 'box-border bg-white/6 border border-white/18 rounded-[10px] text-parchment placeholder:text-[#6f827d] focus:outline-none focus:border-gold';
const SIZE = {
  standard: 'w-full px-3.5 py-3 text-[14.5px]',
  compact: 'px-3 py-2.5 text-sm',
};

export function TextField({
  compact,
  className = '',
  ...props
}: { compact?: boolean; className?: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${BASE} ${compact ? SIZE.compact : SIZE.standard} ${className}`} />;
}

export function TextArea({
  compact,
  className = '',
  ...props
}: { compact?: boolean; className?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...props} className={`${BASE} ${compact ? SIZE.compact : SIZE.standard} ${className}`} />;
}
