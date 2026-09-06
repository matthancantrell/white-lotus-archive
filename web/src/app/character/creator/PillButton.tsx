// The rounded-full toggle pill (solid gold fill when selected) used for the
// background/demeanor choices on the identity step.
export default function PillButton({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="px-3.5 py-2 rounded-full text-[13px] border"
      style={{
        background: selected ? '#e8c874' : 'rgba(245,238,221,0.06)',
        color: selected ? '#1a1108' : '#cfc7b3',
        borderColor: selected ? '#e8c874' : 'rgba(245,238,221,0.18)',
      }}
    >
      {children}
    </button>
  );
}
