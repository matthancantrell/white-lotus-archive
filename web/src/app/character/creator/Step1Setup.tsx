'use client';

import { useState } from 'react';
import { ERAS, PORTRAITS } from '../data';
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

const inputCls =
  'w-full box-border bg-white/6 border border-white/18 rounded-[10px] px-3.5 py-3 text-parchment text-[14.5px] placeholder:text-[#6f827d] focus:outline-none focus:border-gold font-body';

export default function Step1Setup({
  eraName, name, portraitId, scopeText, groupFocusesText,
  onSelectEra, onName, onPortrait, onScope, onGroupFocuses,
}: {
  eraName: string | null;
  name: string;
  portraitId: string | null;
  scopeText: string;
  groupFocusesText: string;
  onSelectEra: (name: string | null) => void;
  onName: (v: string) => void;
  onPortrait: (id: string) => void;
  onScope: (v: string) => void;
  onGroupFocuses: (v: string) => void;
}) {
  const [campaignOpen, setCampaignOpen] = useState(false);
  const [portraitsExpanded, setPortraitsExpanded] = useState(false);
  const activeEra = eraName ? ERAS.find((e) => e.name === eraName) ?? null : null;

  return (
    <section>
      <h1 className="font-display font-semibold text-[30px] mb-2">Start your character</h1>
      <p className="text-parchment-dim text-[15px] mb-7">Set the scene before you dive into playbooks and stats &mdash; talk to your GM if you&rsquo;re joining an existing campaign.</p>

      <h2 className="font-display font-semibold text-lg mb-1.5 text-parchment">Choose your era</h2>
      <p className="text-parchment-dim text-[14.5px] mb-4.5">This sets the backdrop for your story.</p>

      <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_380px] gap-6 items-start mb-9">
        <div
          className="grid gap-3.5"
          style={{
            gridTemplateColumns: activeEra ? 'repeat(3, 1fr)' : 'repeat(3, 1fr)',
            gridTemplateRows: activeEra ? 'repeat(2, 200px)' : undefined,
          }}
        >
          {ERAS.map((era) => {
            const selected = eraName === era.name;
            return (
              <button
                key={era.name}
                onClick={() => onSelectEra(selected ? null : era.name)}
                className="relative block rounded-2xl overflow-hidden border-2 bg-ink-soft"
                style={{
                  borderColor: selected ? ERA_ACCENT_HEX[era.name] : 'rgba(232,200,116,0.15)',
                  aspectRatio: activeEra ? undefined : '3/4',
                  width: '100%',
                  height: activeEra ? '100%' : undefined,
                }}
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

        {activeEra && (
          <div className="bg-ink-soft border border-gold/20 rounded-2xl p-6.5 flex flex-col overflow-y-auto" style={{ height: 414 }}>
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
        )}
      </div>

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
            <textarea
              value={scopeText}
              onChange={(e) => onScope(e.target.value)}
              placeholder="e.g. This saga follows the fall and rebuilding of a single Earth Kingdom village."
              rows={2}
              className={`${inputCls} resize-y mb-5.5`}
            />

            <p className="font-display font-semibold text-sm text-parchment mb-1">Group focuses</p>
            <p className="text-[13px] leading-relaxed text-muted mb-2.5">
              What the table wants this saga to actually be about &mdash; the themes and kinds of stories everyone&rsquo;s excited to tell, like found family, coming of age, or war and survival. Agree on a few as a group before you start.
            </p>
            <textarea
              value={groupFocusesText}
              onChange={(e) => onGroupFocuses(e.target.value)}
              placeholder="e.g. Found family, coming of age, and the cost of war."
              rows={2}
              className={`${inputCls} resize-y`}
            />
          </div>
        )}
      </div>

      <h2 className="font-display font-semibold text-lg mb-3.5 text-parchment">Name &amp; portrait</h2>
      <label className="block text-[13px] text-muted mb-2">Character name</label>
      <input type="text" value={name} onChange={(e) => onName(e.target.value)} placeholder="e.g. Teo of the Northern Air Temple" className={`${inputCls} mb-5`} />

      <label className="block text-[13px] text-muted mb-2.5">Choose a portrait</label>
      <div className="relative">
        <div className="pr-1 mb-2.5" style={{ maxHeight: portraitsExpanded ? 340 : 176, overflowY: portraitsExpanded ? 'auto' : 'hidden' }}>
          <div className="flex flex-wrap justify-center gap-3">
            {PORTRAITS.map((p) => {
              const selected = portraitId === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => onPortrait(p.id)}
                  className="rounded-full flex items-center justify-center shrink-0"
                  style={{ width: 76, height: 76, background: p.bg, border: `3px solid ${selected ? '#e8c874' : 'transparent'}` }}
                >
                  {selected && <span className="text-gold-ink text-lg font-bold">&#10003;</span>}
                </button>
              );
            })}
          </div>
        </div>
        {!portraitsExpanded && (
          <div className="absolute left-0 right-1 bottom-2.5 h-11 pointer-events-none" style={{ background: 'linear-gradient(rgba(13,27,30,0), #0d1b1e)' }} />
        )}
      </div>
      <button onClick={() => setPortraitsExpanded((v) => !v)} className="text-gold text-[13.5px] font-semibold">
        {portraitsExpanded ? 'Show fewer' : `Show all ${PORTRAITS.length} portraits`}
      </button>
    </section>
  );
}
