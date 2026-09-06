import { ADVANCEMENTS, Playbook, STANDARD_GROWTH } from '../data';
import StepHeader from '../StepHeader';
import TabbedStepPanel from '../TabbedStepPanel';

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
  const playbookName = playbook ? playbook.name : 'No playbook yet';

  const questionsTab = (
    <>
      <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Growth questions</p>
      <p className="text-[12.5px] leading-relaxed text-muted mb-3.5">Answered by every player at the end of each session. Each yes marks one growth box.</p>
      <div className="flex flex-col gap-2.5 mb-4.5">
        {STANDARD_GROWTH.map((q) => (
          <div key={q} className="px-4 py-3.5 rounded-xl bg-panel border border-gold/14 text-[13.5px] leading-relaxed text-[#e8ddc4]">{q}</div>
        ))}
        <div className="px-4 py-3.5 rounded-xl bg-gold/8 border border-gold/30 text-[13.5px] leading-relaxed text-parchment">
          <span className="text-gold font-semibold">{playbookName}: </span>
          {playbook ? playbook.growth : ''}
        </div>
      </div>
      <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Growth track</p>
      <div className="flex gap-2 mt-2">
        {[1, 2, 3, 4].map((n) => (
          <div key={n} className="w-7.5 h-7.5 rounded-md border-[1.5px] border-gold/50 bg-white/4" />
        ))}
      </div>
    </>
  );

  const advancementsTab = (
    <>
      <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Growth advancements</p>
      <p className="text-[12.5px] leading-relaxed text-muted mb-3.5">Spend four growth on one of these. Each can be taken twice.</p>
      <div className="flex flex-col gap-2.5">
        {ADVANCEMENTS.map((a) => (
          <div key={a} className="flex items-center justify-between gap-3.5 px-4 py-3.5 rounded-xl bg-panel border border-gold/14">
            <p className="text-[13.5px] leading-relaxed text-[#e8ddc4] flex-1 min-w-0">{a}</p>
            <div className="flex gap-1.5 shrink-0">
              <div className="w-5 h-5 rounded-[5px] border-[1.5px] border-gold/50" />
              <div className="w-5 h-5 rounded-[5px] border-[1.5px] border-gold/50" />
            </div>
          </div>
        ))}
      </div>
    </>
  );

  const momentTab = (
    <>
      <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Moment of Balance &middot; locked</p>
      <p className="text-[12.5px] leading-relaxed text-muted mb-3.5">
        Unlocked through advancement and usable only while your balance sits at its center. Once used, it must be unlocked again.
      </p>
      {!playbook && <p className="text-[13.5px] text-muted">Choose a playbook first.</p>}
      {playbook && (
        <div className="p-4.5 rounded-xl bg-gold/6 border border-gold/30">
          <p className="font-display font-semibold text-sm text-gold mb-2">{playbook.name}</p>
          <p className="text-[13.5px] leading-relaxed text-parchment-dim">{playbook.momentOfBalance}</p>
        </div>
      )}
    </>
  );

  return (
    <section>
      <StepHeader
        title="Growth"
        subtitle={<>Nothing to mark yet — this is how {name || 'your character'} will grow. At the end of each session, every &ldquo;yes&rdquo; marks one growth; four growth earns an advancement.</>}
      />

      <div className="mb-6">
        <TabbedStepPanel
          headerTitle={playbookName}
          headerLabel="Growth"
          tabs={[
            { id: 'questions', label: 'Growth Questions', content: questionsTab },
            { id: 'advancements', label: 'Advancements', content: advancementsTab },
            { id: 'moment', label: 'Moment of Balance', content: momentTab },
          ]}
        />
      </div>

      <div className="bg-panel border border-gold/25 rounded-2xl p-7">
        <p className="font-display font-semibold text-lg text-parchment mb-4">Ready to save {name || 'your character'}</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(150px,1fr))] gap-x-6 gap-y-2.5 text-[13.5px] text-[#b9c2bd] mb-5.5">
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
