// The "gold-tinted when selected, dark slate otherwise" bordered box shows up across
// training, techniques, and moves — this owns just that selected/unselected chrome;
// callers supply their own inner layout (title, description, a leading checkbox, etc.)
// and any padding/alignment/width tweaks via `className`.
export default function ChoiceCard({
  selected,
  onClick,
  as = 'button',
  className = '',
  children,
}: {
  selected: boolean;
  onClick?: () => void;
  as?: 'button' | 'div';
  className?: string;
  children: React.ReactNode;
}) {
  const style = {
    background: selected ? 'rgba(232,200,116,0.14)' : '#142a2e',
    borderColor: selected ? 'rgba(232,200,116,0.5)' : 'rgba(232,200,116,0.15)',
  };

  if (as === 'div') {
    return (
      <div className={`rounded-xl border ${className}`} style={style}>
        {children}
      </div>
    );
  }

  return (
    <button onClick={onClick} className={`rounded-xl border ${className}`} style={style}>
      {children}
    </button>
  );
}
