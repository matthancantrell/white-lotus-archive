import Image, { type StaticImageData } from 'next/image';

export default function PlaybookCard({
  name,
  principlesLabel,
  iconColor,
  icon,
  background,
  selected,
  onClick,
}: {
  name: string;
  principlesLabel: string;
  iconColor: string;
  icon: StaticImageData;
  background: StaticImageData;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="relative flex items-center gap-3 text-left px-4 py-3.5 rounded-xl border shrink-0 overflow-hidden"
      style={{ borderColor: selected ? 'rgba(232,200,116,0.5)' : 'rgba(232,200,116,0.15)' }}
    >
      {/* Card background photo, dimmed so the name/principles stay legible over any picture. */}
      <Image src={background} alt="" fill sizes="280px" className="object-cover" />
      <div
        className="absolute inset-0"
        style={{ background: selected ? 'linear-gradient(90deg, rgba(232,200,116,0.28), rgba(20,42,46,0.86))' : 'linear-gradient(90deg, rgba(20,42,46,0.55), rgba(20,42,46,0.86))' }}
      />

      <div className="relative w-9 h-9 rounded-lg overflow-hidden shrink-0" style={{ border: `2px solid ${iconColor}` }}>
        <Image src={icon} alt="" fill sizes="36px" className="object-cover" />
        {/* Color-code the icon per playbook even though the photo underneath is a shared placeholder. */}
        <div className="absolute inset-0" style={{ background: `${iconColor}4d` }} />
      </div>
      <div className="relative min-w-0">
        <p className="font-display font-semibold text-base text-parchment mb-0.5">{name}</p>
        <p className="text-[11px] text-gold tracking-wide">{principlesLabel}</p>
      </div>
    </button>
  );
}
