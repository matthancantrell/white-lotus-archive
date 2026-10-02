// Bolds any stat name (Creativity/Focus/Harmony/Passion) inside a move/technique
// effect string. Shared so move text reads the same wherever it's shown, instead of
// each place that displays a move re-deciding whether to apply the treatment.
export function highlightStats(text: string) {
  return text.split(/(Creativity|Focus|Harmony|Passion)/g).map((part, i) =>
    /^(Creativity|Focus|Harmony|Passion)$/.test(part)
      ? <strong key={i} className="text-gold font-bold">{part}</strong>
      : part
  );
}

// Bolds any of the given terms (e.g. a playbook's own move names) wherever they
// appear inside a body of text — used so Moves Advice call-outs like "use
// Reveal Weakness" stand out the same way stat names do above.
export function highlightTerms(text: string, terms: string[]) {
  const sorted = [...terms].sort((a, b) => b.length - a.length);
  if (sorted.length === 0) return text;
  const pattern = new RegExp(`(${sorted.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'g');
  return text.split(pattern).map((part, i) =>
    terms.includes(part) ? <strong key={i} className="text-gold font-bold">{part}</strong> : part
  );
}

// rollsWith is stored lowercase for stats (creativity/focus/harmony/passion)
// but Title Case for principles (see Move.rollsWith in ../../../types) —
// capitalizing the first letter reads right either way. Shared between the
// creator's Select Moves tab and the manager's read-only Moves & Features tab.
export function rollsWithLabel(rollsWith: string | null): string | null {
  return rollsWith ? rollsWith[0].toUpperCase() + rollsWith.slice(1) : null;
}
