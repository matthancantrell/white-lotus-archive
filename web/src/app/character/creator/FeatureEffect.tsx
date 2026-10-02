import type { FeatureParagraph } from './playbooks/playbook';

const BULLET_DOT = <div className="w-1.5 h-1.5 rounded-full shrink-0 mt-1.5" style={{ background: 'rgba(232,200,116,0.6)' }} />;

// Renders a Feature's `effect` paragraphs (optional heading, optional body
// text, optional bulleted list) — shared by PlaybookInfoPanel's About tab and
// StepPlaybook's Feature tab overview so the two can't drift apart.
export default function FeatureEffect({ effect }: { effect: FeatureParagraph[] }) {
  return (
    <div className="flex flex-col gap-4">
      {effect.map((p, i) => (
        <div key={i}>
          {p.heading && <p className="font-display font-semibold text-sm text-parchment mb-1.5">{p.heading}</p>}
          {p.text && <p className="text-[13.5px] leading-relaxed text-[#b9c2bd]">{p.text}</p>}
          {p.list && (
            <div className="sm:columns-2 gap-x-7 mt-2.5">
              {p.list.map((item, j) => (
                <div key={j} className="flex items-start gap-2.5 mb-2" style={{ breakInside: 'avoid' }}>
                  {BULLET_DOT}
                  <p className="text-[13.5px] leading-relaxed text-[#b9c2bd]">{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
