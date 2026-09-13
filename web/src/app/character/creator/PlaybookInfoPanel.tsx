import { APPROACH_LABEL, Playbook, Stats } from './data';
import PlaybookBanner from './PlaybookBanner';
import ChoiceCard from './ChoiceCard';
import { highlightStats } from './highlightStats';

const STAT_ROWS: [keyof Stats, string][] = [['creativity', 'Creativity'], ['focus', 'Focus'], ['harmony', 'Harmony'], ['passion', 'Passion']];

// A section label + body, styled the same way everywhere it's used below — the one
// place to change if the "uppercase gold label" treatment ever needs to change.
function Section({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={className}>
      <p className="font-display text-xs tracking-wide uppercase text-gold mb-2">{label}</p>
      {children}
    </div>
  );
}

// A short list of prompts/options (demeanor options, history questions, connection
// prompts) — bullets are a gold dot rather than a native list marker, matching the
// dot used for the confirmed-tab list in StepPlaybook.
function BulletList({ items }: { items: string[] }) {
  return (
    <div className="flex flex-col gap-2">
      {items.map((item, i) => (
        <div key={i} className="flex items-start gap-2.5">
          <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: 'rgba(232,200,116,0.6)' }} />
          <p className="text-[13.5px] leading-relaxed text-[#b9c2bd]">{item}</p>
        </div>
      ))}
    </div>
  );
}

// The full Roll20-style rundown for a playbook, in a fixed section order: banner,
// tagline, description, principles, starting stats, demeanor options, history,
// connections, moment of balance, feature, moves, moves advice, playbook technique,
// growth question. Used for both the pre-confirm preview and the confirmed "about"
// tab in StepPlaybook, so the two can't drift out of sync with each other.
export default function PlaybookInfoPanel({ playbook }: { playbook: Playbook }) {
  return (
    <>
      <PlaybookBanner playbook={playbook} />

      <p className="text-[14.5px] leading-relaxed text-parchment-dim mb-5">{playbook.tagline}</p>

      <Section label="Description" className="mb-5">
        <p className="text-[13.5px] leading-relaxed text-[#b9c2bd]">{playbook.description}</p>
      </Section>

      <Section label="Principles" className="mb-5">
        <p className="text-[13.5px] leading-relaxed text-[#b9c2bd]">{playbook.principles.join(' / ')}</p>
      </Section>

      <Section label="Starting stats" className="mb-5">
        <div className="flex flex-wrap gap-2">
          {STAT_ROWS.map(([key, label]) => {
            const val = playbook.stats[key];
            return (
              <div key={key} className="px-3 py-1.5 rounded-full bg-white/6 border border-white/15 text-[12.5px] text-[#e8ddc4]">
                <strong className="text-gold font-bold">{label}</strong> {val >= 0 ? `+${val}` : val}
              </div>
            );
          })}
        </div>
      </Section>

      <Section label="Demeanor options" className="mb-5">
        <BulletList items={playbook.demeanorOptions} />
      </Section>

      <Section label="History" className="mb-5">
        <BulletList items={playbook.history} />
      </Section>

      <Section label="Connections" className="mb-5">
        <BulletList items={playbook.connectionPrompts} />
      </Section>

      <Section label="Moment of balance" className="mb-5">
        <p className="text-[13.5px] leading-relaxed text-[#b9c2bd]">{playbook.momentOfBalance}</p>
      </Section>

      <Section label={`Feature · ${playbook.feature.name}`} className="mb-5">
        <p className="text-[13.5px] leading-relaxed text-[#b9c2bd]">{playbook.feature.effect}</p>
      </Section>

      <Section label="Moves" className="mb-5">
        <div className="flex flex-col gap-2.5">
          {playbook.moves.map((mv) => (
            <ChoiceCard key={mv.name} as="div" selected={false} className="p-3.5">
              <p className="font-display font-semibold text-sm text-gold mb-1">{mv.name}</p>
              <p className="text-[13px] leading-relaxed text-[#b9c2bd]">{highlightStats(mv.effect)}</p>
            </ChoiceCard>
          ))}
        </div>
      </Section>

      <Section label="Moves advice" className="mb-5">
        <p className="text-[13.5px] leading-relaxed text-[#b9c2bd]">{playbook.movesAdvice}</p>
      </Section>

      <Section label={`Playbook technique · ${playbook.startingTechnique.name}`} className="mb-5">
        <p className="text-[12px] text-muted mb-1.5">{APPROACH_LABEL[playbook.startingTechnique.approach]}</p>
        <p className="text-[13.5px] leading-relaxed text-[#b9c2bd]">{playbook.startingTechnique.effect}</p>
      </Section>

      <Section label="Growth question">
        <p className="text-[13.5px] leading-relaxed text-[#b9c2bd]">{playbook.growth}</p>
      </Section>
    </>
  );
}
