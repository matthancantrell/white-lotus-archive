const PETAL_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export default function LotusMark({ size = 34, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 34 34" className={className}>
      <circle cx="17" cy="17" r="16" fill="none" stroke="#e8c874" strokeWidth="1.5" />
      <g>
        {PETAL_ANGLES.map((angle) => (
          <path
            key={angle}
            d="M17 17 C 14 12.5, 14 8, 17 4 C 20 8, 20 12.5, 17 17 Z"
            fill="#e8c874"
            fillOpacity="0.92"
            stroke="#c99e3f"
            strokeWidth="0.4"
            transform={`rotate(${angle} 17 17)`}
          />
        ))}
      </g>
      <circle cx="17" cy="17" r="2.4" fill="#0d1b1e" stroke="#e8c874" strokeWidth="1" />
    </svg>
  );
}
