import { BACKGROUNDS, DEMEANORS } from '../data';
import StepHeader from '../StepHeader';
import PillButton from '../PillButton';
import { TextArea } from '../TextField';

export default function StepIdentity({
  look, background, demeanor,
  onLook, onBackground, onDemeanor,
}: {
  look: string; background: string | null; demeanor: string | null;
  onLook: (v: string) => void;
  onBackground: (v: string) => void; onDemeanor: (v: string) => void;
}) {
  return (
    <section>
      <StepHeader title="Look & background" subtitle="Be as creative as you like — use your GM for inspiration." />

      <div className="mb-5">
        <label className="block text-[13px] text-muted mb-2">Look</label>
        <TextArea
          value={look}
          onChange={(e) => onLook(e.target.value)}
          placeholder="Age, build, clothing, marks or scars, the way they carry themselves..."
          rows={3}
          className="resize-y"
        />
      </div>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6">
        <div>
          <p className="text-[13px] text-muted mb-2">Background</p>
          <div className="flex flex-wrap gap-2">
            {BACKGROUNDS.map((b) => (
              <PillButton key={b} selected={background === b} onClick={() => onBackground(b)}>{b}</PillButton>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[13px] text-muted mb-2">Demeanor</p>
          <div className="flex flex-wrap gap-2">
            {DEMEANORS.map((d) => (
              <PillButton key={d} selected={demeanor === d} onClick={() => onDemeanor(d)}>{d}</PillButton>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
