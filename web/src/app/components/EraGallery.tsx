'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import rokuEraImg from '../../assets/eras/roku.jpg';
import aangEraImg from '../../assets/eras/aang.jpg';
import kyoshiEraImg from '../../assets/eras/kyoshi.jpg';
import hywEraImg from '../../assets/eras/hundred-year-war.jpg';
import korraEraImg from '../../assets/eras/korra.jpg';
import customEraImg from '../../assets/eras/custom.jpg';

const ERAS = [
  { name: "Avatar Roku", tag: "Fire Nation dawn", img: rokuEraImg, accent: "text-[#e8927a]", accentHex: "#e8927a",
    desc: "A generation before the war begins. Firebending is still a source of pride, not fear, and the world hasn’t yet split into occupier and occupied. Play out the friendships and choices that plant the seeds of what’s coming." },
  { name: "Avatar Aang", tag: "Hundred Year War’s end", img: aangEraImg, accent: "text-[#9ec4e8]", accentHex: "#9ec4e8",
    desc: "The war is in its final year and the Avatar has just returned to a broken world. Join the fight to end the Fire Nation’s conquest, whether that means striking at the Fire Lord directly or rebuilding what’s been lost along the way." },
  { name: "Avatar Kyoshi", tag: "Age of the Daofei", img: kyoshiEraImg, accent: "text-[#a3c98a]", accentHex: "#a3c98a",
    desc: "Centuries before Aang, the Earth Kingdom is vast, lawless, and run as much by outlaw societies as by its own government. Make your name as a bandit, a lawkeeper, or something in between in a world without an Avatar to keep the balance." },
  { name: "Hundred Year War", tag: "A world at war", img: hywEraImg, accent: "text-[#d97a5c]", accentHex: "#d97a5c",
    desc: "Set your own chapter anywhere across the century of Fire Nation conquest, away from the events of the main story. Occupied villages, resistance cells, and refugee camps all make for stories worth telling." },
  { name: "Avatar Korra", tag: "Age of industry", img: korraEraImg, accent: "text-[#9ec4e8]", accentHex: "#9ec4e8",
    desc: "Decades after Aang, the world has modernized: spirit vines power cities, and old grudges wear new political clothes. Navigate a world of industry, revolution, and a spirit world pressing back in." },
  { name: "Your own era", tag: "Build a custom setting", img: customEraImg, accent: "text-gold", accentHex: "#e8c874",
    desc: "Not tied to a canon era? Build your own timeframe and backdrop with your group — pick the technology level, the state of bending, and the conflicts that matter to your table." },
];

// The homepage's only interactive piece — pulled into its own client component
// so page.tsx can be a Server Component and check login state server-side
// (see EraGallery's isLoggedIn prop, and page.tsx for why).
export default function EraGallery({ isLoggedIn }: { isLoggedIn: boolean }) {
  const [activeEraName, setActiveEraName] = useState<string | null>(null);
  const activeEra = activeEraName ? ERAS.find((e) => e.name === activeEraName) ?? null : null;

  return (
    <section id="eras" className="px-[clamp(20px,6vw,56px)] py-[clamp(64px,12vw,120px)] bg-ink">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <p className="font-display text-[12.5px] tracking-[0.28em] uppercase text-gold mb-4">Choose your era</p>
          <h2 className="font-display font-semibold text-[clamp(27px,4.2vw,38px)] mb-4 text-parchment">Six chapters of the Avatar world</h2>
          <p className="text-base text-parchment-dim max-w-lg mx-auto">Play in a time you know by heart, or build a setting entirely your own.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_340px] gap-8 items-center">
          <div className="grid grid-cols-3 gap-3.5">
            {ERAS.map((era) => {
              const selected = activeEraName === era.name;
              return (
                <button
                  key={era.name}
                  onClick={() => setActiveEraName(selected ? null : era.name)}
                  className="relative block aspect-[3/4] rounded-2xl overflow-hidden border-2 transition-colors"
                  style={{ borderColor: selected ? era.accentHex : 'rgba(232,200,116,0.18)' }}
                >
                  <Image src={era.img} alt={era.name} fill className="absolute inset-0 w-full h-full object-cover" />
                  <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(13,27,30,0) 40%, rgba(13,27,30,0.9) 100%)" }} />
                  <div className="absolute left-3.5 right-3.5 bottom-3">
                    <p className={`mb-0.5 text-[10.5px] tracking-[0.16em] uppercase ${era.accent}`}>{era.tag}</p>
                    <p className="font-display font-semibold text-base text-parchment">{era.name}</p>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="flex flex-col rounded-[20px] p-7.5 border border-gold/20 shadow-2xl min-h-[280px]" style={{ background: "linear-gradient(155deg, #1a3238, #10262a)" }}>
            {activeEra ? (
              <>
                <p className={`mb-2 text-xs tracking-[0.2em] uppercase ${activeEra.accent}`}>{activeEra.tag}</p>
                <h3 className="font-display font-semibold text-2xl text-parchment mb-4">{activeEra.name}</h3>
                <p className="text-[15px] leading-relaxed text-parchment-dim mb-6.5">{activeEra.desc}</p>
                <Link href={isLoggedIn ? '/character/creator' : '/signup'} className="inline-block bg-gold text-gold-ink px-6.5 py-3 rounded-full text-[14.5px] font-bold w-fit hover:brightness-95">
                  {isLoggedIn ? 'Create a character in this era' : 'Sign up to create a character in this era'}
                </Link>
              </>
            ) : (
              <div className="m-auto text-center">
                <p className="font-display font-semibold text-lg text-gold mb-2">Which era calls to you?</p>
                <p className="text-sm leading-relaxed text-muted">Select one of the six chapters to read its story before you begin.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
