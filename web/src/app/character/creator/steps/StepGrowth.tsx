import { Playbook, STANDARD_GROWTH } from '../data';

export default function StepGrowth({
  playbook,
  trainingName,
  eraName,
  name,
  justSaved,
  onSave,
}: {
  playbook: Playbook | null;
  trainingName: string | null;
  eraName: string | null;
  name: string;
  justSaved: boolean;
  onSave: () => void;
}) {
  return (
    <section>
      <h1 className="font-display font-semibold text-[30px] mb-2">Growth questions</h1>
      <p className="text-parchment-dim text-[15px] mb-7 max-w-xl">Answered at the end of every session. Four &ldquo;yes&rdquo; answers let you mark an advancement.</p>

      <div className="flex flex-col gap-3 mb-6">
        {STANDARD_GROWTH.map((q) => (
          <div key={q} className="px-4.5 py-3.5 rounded-xl bg-ink-soft border border-gold/14 text-sm text-[#e8ddc4]">{q}</div>
        ))}
        <div className="px-4.5 py-3.5 rounded-xl bg-gold/8 border border-gold/30 text-sm text-parchment">
          <span className="text-gold font-semibold">{playbook ? playbook.name : 'No playbook yet'}: </span>
          {playbook ? playbook.growth : ''}
        </div>
      </div>

      <div className="bg-panel border border-gold/25 rounded-2xl p-7">
        <p className="font-display font-semibold text-lg text-parchment mb-4">Ready to save {name || 'your character'}</p>
        <div className="grid grid-cols-3 gap-x-6 gap-y-2.5 text-[13.5px] text-[#b9c2bd] mb-5.5">
          <p><span className="text-faint">Playbook:</span> {playbook ? playbook.name : 'not chosen'}</p>
          <p><span className="text-faint">Training:</span> {trainingName || 'not chosen'}</p>
          <p><span className="text-faint">Era:</span> {eraName || 'not chosen'}</p>
        </div>
        <button onClick={onSave} className="bg-gold text-gold-ink px-7.5 py-3.5 rounded-full text-[15px] font-bold hover:brightness-95">
          Save character to my archive
        </button>
        {justSaved && <p className="mt-3.5 text-[#a3c98a] text-[13.5px]">Saved. This will sync to your account once the archive is connected.</p>}
      </div>
    </section>
  );
}
