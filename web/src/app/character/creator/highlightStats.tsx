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
