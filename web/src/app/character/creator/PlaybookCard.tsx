export default function PlaybookCard({
  name,
  principlesLabel,
  iconBg,
  selected,
  onClick,
}: {
  name: string;
  principlesLabel: string;
  iconBg: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border shrink-0"
      style={{
        background: selected ? 'rgba(232,200,116,0.14)' : '#142a2e',
        borderColor: selected ? 'rgba(232,200,116,0.5)' : 'rgba(232,200,116,0.15)',
      }}
    >
      <div className="w-9 h-9 rounded-lg border border-gold/30 shrink-0" style={{ background: iconBg }} />
      <div className="min-w-0">
        <p className="font-display font-semibold text-base text-parchment mb-0.5">{name}</p>
        <p className="text-[11px] text-gold tracking-wide">{principlesLabel}</p>
      </div>
    </button>
  );
}
