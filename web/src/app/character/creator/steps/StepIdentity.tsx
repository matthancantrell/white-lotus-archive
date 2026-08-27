import { BACKGROUNDS, DEMEANORS } from '../data';

export default function StepIdentity({
  name, hometown, look, background, demeanor,
  onName, onHometown, onLook, onBackground, onDemeanor,
}: {
  name: string; hometown: string; look: string; background: string | null; demeanor: string | null;
  onName: (v: string) => void; onHometown: (v: string) => void; onLook: (v: string) => void;
  onBackground: (v: string) => void; onDemeanor: (v: string) => void;
}) {
  const inputCls = 'w-full box-border bg-white/6 border border-white/18 rounded-[10px] px-3.5 py-3 text-parchment text-[14.5px] placeholder:text-[#6f827d] focus:outline-none focus:border-gold';

  return (
    <section>
      <h1 className="font-display font-semibold text-[30px] mb-2">Look, name &amp; background</h1>
      <p className="text-parchment-dim text-[15px] mb-7 max-w-xl">Be as creative as you like &mdash; use your GM for inspiration.</p>

      <div className="grid grid-cols-2 gap-4 mb-5">
        <div>
          <label className="block text-[13px] text-muted mb-2">Character name</label>
          <input type="text" value={name} onChange={(e) => onName(e.target.value)} placeholder="e.g. Teo of the Northern Air Temple" className={inputCls} />
        </div>
        <div>
          <label className="block text-[13px] text-muted mb-2">Hometown</label>
          <input type="text" value={hometown} onChange={(e) => onHometown(e.target.value)} placeholder="e.g. Gaoling" className={inputCls} />
        </div>
      </div>

      <div className="mb-5">
        <label className="block text-[13px] text-muted mb-2">Look</label>
        <textarea
          value={look}
          onChange={(e) => onLook(e.target.value)}
          placeholder="Age, build, clothing, marks or scars, the way they carry themselves..."
          rows={3}
          className={`${inputCls} resize-y`}
        />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <p className="text-[13px] text-muted mb-2">Background</p>
          <div className="flex flex-wrap gap-2">
            {BACKGROUNDS.map((b) => {
              const selected = background === b;
              return (
                <button
                  key={b}
                  onClick={() => onBackground(b)}
                  className="px-3.5 py-2 rounded-full text-[13px] border"
                  style={{ background: selected ? '#e8c874' : 'rgba(245,238,221,0.06)', color: selected ? '#1a1108' : '#cfc7b3', borderColor: selected ? '#e8c874' : 'rgba(245,238,221,0.18)' }}
                >
                  {b}
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <p className="text-[13px] text-muted mb-2">Demeanor</p>
          <div className="flex flex-wrap gap-2">
            {DEMEANORS.map((d) => {
              const selected = demeanor === d;
              return (
                <button
                  key={d}
                  onClick={() => onDemeanor(d)}
                  className="px-3.5 py-2 rounded-full text-[13px] border"
                  style={{ background: selected ? '#e8c874' : 'rgba(245,238,221,0.06)', color: selected ? '#1a1108' : '#cfc7b3', borderColor: selected ? '#e8c874' : 'rgba(245,238,221,0.18)' }}
                >
                  {d}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
