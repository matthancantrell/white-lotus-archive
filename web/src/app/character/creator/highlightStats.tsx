// Bolds any stat name (Creativity/Focus/Harmony/Passion) inside a move/technique
// effect string. Shared so move text reads the same wherever it's shown — this used
// to live only in StepPlaybook, so the identical text in StepMoves rendered plain.
export function highlightStats(text: string) {
  return text.split(/(Creativity|Focus|Harmony|Passion)/g).map((part, i) =>
    /^(Creativity|Focus|Harmony|Passion)$/.test(part)
      ? <strong key={i} className="text-gold font-bold">{part}</strong>
      : part
  );
}
