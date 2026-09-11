'use client';

import { useEffect, useRef, useState } from 'react';
import { ERAS, ICONS } from './data';
import StepHeader from './StepHeader';
import { TextField, TextArea } from './TextField';
import rokuEraImg from '../../../assets/eras/roku.jpg';
import aangEraImg from '../../../assets/eras/aang.jpg';
import kyoshiEraImg from '../../../assets/eras/kyoshi.jpg';
import hywEraImg from '../../../assets/eras/hundred-year-war.jpg';
import korraEraImg from '../../../assets/eras/korra.jpg';
import customEraImg from '../../../assets/eras/custom.jpg';

const ERA_IMAGES: Record<string, typeof rokuEraImg> = {
  'Avatar Roku': rokuEraImg,
  'Avatar Aang': aangEraImg,
  'Avatar Kyoshi': kyoshiEraImg,
  'Hundred Year War': hywEraImg,
  'Avatar Korra': korraEraImg,
  'Your own era': customEraImg,
};

const ERA_ACCENT_HEX: Record<string, string> = {
  'Avatar Roku': '#e8927a',
  'Avatar Aang': '#9ec4e8',
  'Avatar Kyoshi': '#a3c98a',
  'Hundred Year War': '#d97a5c',
  'Avatar Korra': '#9ec4e8',
  'Your own era': '#e8c874',
};

export default function Step1Setup({
  eraName, name, iconId, scopeText, groupFocusesText,
  onSelectEra, onName, onIcon, onScope, onGroupFocuses,
}: {
  eraName: string | null;
  name: string;
  iconId: string | null;
  scopeText: string;
  groupFocusesText: string;
  onSelectEra: (name: string | null) => void;
  onName: (v: string) => void;
  onIcon: (id: string) => void;
  onScope: (v: string) => void;
  onGroupFocuses: (v: string) => void;
}) {
  const [campaignOpen, setCampaignOpen] = useState(false);
  const [iconsExpanded, setIconsExpanded] = useState(false);
  // Icons are fetched from R2 through the API — a slow network or a
  // misconfigured/unreachable API must never block finishing this step, so a
  // broken image just falls back to a plain placeholder instead of a broken
  // <img> icon, and picking one is optional either way (nothing below gates
  // moving on).
  const [brokenIconIds, setBrokenIconIds] = useState<Set<string>>(new Set());
  const [detailAtBottom, setDetailAtBottom] = useState(true);
  const detailRef = useRef<HTMLDivElement>(null);
  const activeEra = eraName ? ERAS.find((e) => e.name === eraName) ?? null : null;

  function handleDetailScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    setDetailAtBottom(el.scrollTop + el.clientHeight >= el.scrollHeight - 2);
  }

  useEffect(() => {
    const el = detailRef.current;
    if (!el) return;
    el.scrollTop = 0;
    setDetailAtBottom(el.scrollHeight <= el.clientHeight + 2);
  }, [eraName]);

  return (
    <section>
      <StepHeader
        title="Start your character"
        subtitle={<>Set the scene before you dive into playbooks and stats &mdash; talk to your GM if you&rsquo;re joining an existing campaign.</>}
      />

      <h2 className="font-display font-semibold text-lg mb-1.5 text-parchment">Choose your era</h2>
      <p className="text-parchment-dim text-[14.5px] mb-4.5">This sets the backdrop for your story.</p>

      {!activeEra && (
        <div className="grid grid-cols-3 md:grid-cols-6 gap-3.5 mb-9">
          {ERAS.map((era) => (
            <button
              key={era.name}
              onClick={() => onSelectEra(era.name)}
              className="relative block aspect-[3/4] rounded-2xl overflow-hidden border-2 bg-ink-soft"
              style={{ borderColor: 'rgba(232,200,116,0.15)' }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={ERA_IMAGES[era.name].src} alt={era.name} className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(13,27,30,0) 40%, rgba(13,27,30,0.9) 100%)' }} />
              <div className="absolute left-3.5 right-3.5 bottom-3">
                <p className={`mb-0.5 text-[10.5px] tracking-[0.12em] uppercase ${era.accent}`}>{era.tag}</p>
                <p className="font-display font-semibold text-[15.5px] text-parchment">{era.name}</p>
              </div>
            </button>
          ))}
        </div>
      )}

      {activeEra && (
      <div className="grid grid-cols-1 md:grid-cols-[560px_minmax(0,1fr)] gap-6 items-start mb-9">
        <div className="grid grid-cols-3 gap-3.5 content-start">
          {ERAS.map((era) => {
            const selected = eraName === era.name;
            return (
              <button
                key={era.name}
                onClick={() => onSelectEra(selected ? null : era.name)}
                className="relative block aspect-[3/4] w-full rounded-2xl overflow-hidden border-2 bg-ink-soft"
                style={{ borderColor: selected ? ERA_ACCENT_HEX[era.name] : 'rgba(232,200,116,0.15)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={ERA_IMAGES[era.name].src} alt={era.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0" style={{ background: 'linear-gradient(180deg, rgba(13,27,30,0) 40%, rgba(13,27,30,0.9) 100%)' }} />
                <div className="absolute left-3 right-3 bottom-2.5">
                  <p className={`mb-0.5 text-[10px] tracking-[0.12em] uppercase ${era.accent}`}>{era.tag}</p>
                  <p className="font-display font-semibold text-sm text-parchment">{era.name}</p>
                </div>
              </button>
            );
          })}
        </div>

        {
          <div className="relative bg-ink-soft border border-gold/20 rounded-2xl overflow-hidden" style={{ height: 486 }}>
            <div ref={detailRef} onScroll={handleDetailScroll} className="h-full flex flex-col p-6.5 overflow-y-auto hide-scrollbar">
              <p className={`mb-1.5 text-[11px] tracking-[0.18em] uppercase ${activeEra.accent}`}>{activeEra.tag}</p>
              <h3 className="font-display font-semibold text-[22px] text-parchment mb-4">{activeEra.name}</h3>
              <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Overview</p>
              <p className="text-sm leading-relaxed text-parchment-dim mb-4">{activeEra.overview}</p>
              <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">The Avatar</p>
              <p className="text-sm leading-relaxed text-parchment-dim mb-4">{activeEra.avatarStatus}</p>
              <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Key events &amp; consequences</p>
              <p className="text-sm leading-relaxed text-parchment-dim mb-4">{activeEra.events}</p>
              <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Tone</p>
              <p className="text-sm leading-relaxed text-parchment-dim mb-4">{activeEra.tone}</p>
              <p className="font-display text-xs tracking-wide uppercase text-gold mb-1">Key tension</p>
              <p className="text-sm leading-relaxed text-parchment-dim">{activeEra.tension}</p>
            </div>
            {!detailAtBottom && (
              <div className="absolute left-0 right-0 bottom-0 h-14 pointer-events-none" style={{ background: 'linear-gradient(rgba(20,42,46,0), #142a2e)' }} />
            )}
          </div>
        }
      </div>
      )}

      <div className="rounded-2xl bg-ink-soft border border-gold/18 mb-9 overflow-hidden">
        <button onClick={() => setCampaignOpen((v) => !v)} className="flex items-center justify-between w-full px-5 py-4">
          <span className="font-display font-semibold text-base text-parchment">Campaign details</span>
          <span className="text-muted text-xs inline-block transition-transform" style={{ transform: campaignOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}>&#9660;</span>
        </button>
        {campaignOpen && (
          <div className="px-5 pb-5.5 border-t border-white/10">
            <p className="font-display font-semibold text-sm text-parchment mt-4.5 mb-1">Scope</p>
            <p className="text-[13px] leading-relaxed text-muted mb-2.5">
              How far this story reaches &mdash; a personal drama between a few people, the fate of one community, or something that shakes the wider world. Talk it through with your GM and write down what you land on.
            </p>
            <TextArea
              value={scopeText}
              onChange={(e) => onScope(e.target.value)}
              placeholder="e.g. This saga follows the fall and rebuilding of a single Earth Kingdom village."
              rows={2}
              className="resize-y mb-5.5"
            />

            <p className="font-display font-semibold text-sm text-parchment mb-1">Group focuses</p>
            <p className="text-[13px] leading-relaxed text-muted mb-2.5">
              What the table wants this saga to actually be about &mdash; the themes and kinds of stories everyone&rsquo;s excited to tell, like found family, coming of age, or war and survival. Agree on a few as a group before you start.
            </p>
            <TextArea
              value={groupFocusesText}
              onChange={(e) => onGroupFocuses(e.target.value)}
              placeholder="e.g. Found family, coming of age, and the cost of war."
              rows={2}
              className="resize-y"
            />
          </div>
        )}
      </div>

      <h2 className="font-display font-semibold text-lg mb-3.5 text-parchment">Name &amp; icon</h2>
      <label className="block text-[13px] text-muted mb-2">Character name</label>
      <TextField type="text" value={name} onChange={(e) => onName(e.target.value)} placeholder="e.g. Teo of the Northern Air Temple" className="mb-5" />

      <label className="block text-[13px] text-muted mb-2.5">Choose an icon (optional)</label>
      <div className="relative">
        <div className="pr-1 mb-2.5" style={{ maxHeight: iconsExpanded ? 340 : 176, overflowY: iconsExpanded ? 'auto' : 'hidden' }}>
          <div className="flex flex-wrap justify-center gap-3">
            {ICONS.map((icon) => {
              const selected = iconId === icon.id;
              return (
                <button
                  key={icon.id}
                  onClick={() => onIcon(icon.id)}
                  className="relative rounded-full flex items-center justify-center shrink-0 overflow-hidden bg-white/6"
                  style={{ width: 76, height: 76, border: `3px solid ${selected ? '#e8c874' : 'transparent'}` }}
                >
                  {brokenIconIds.has(icon.id) ? (
                    <div className="w-full h-full" />
                  ) : (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={icon.url}
                      alt=""
                      className="w-full h-full object-cover"
                      onError={() => setBrokenIconIds((prev) => new Set(prev).add(icon.id))}
                    />
                  )}
                  {selected && <span className="absolute text-gold-ink text-lg font-bold drop-shadow">&#10003;</span>}
                </button>
              );
            })}
          </div>
        </div>
        {!iconsExpanded && (
          <div className="absolute left-0 right-1 bottom-2.5 h-11 pointer-events-none" style={{ background: 'linear-gradient(rgba(13,27,30,0), #0d1b1e)' }} />
        )}
      </div>
      <button onClick={() => setIconsExpanded((v) => !v)} className="text-gold text-[13.5px] font-semibold">
        {iconsExpanded ? 'Show fewer' : `Show all ${ICONS.length} icons`}
      </button>
    </section>
  );
}
