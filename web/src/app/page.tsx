import Link from "next/link";
import LotusMark from "@/components/LotusMark";

const ERAS = [
  { name: "Avatar Roku", tag: "Fire Nation dawn", img: "/eras/roku.jpg", accent: "text-[#e8927a]" },
  { name: "Avatar Aang", tag: "Hundred Year War\u2019s end", img: "/eras/aang.jpg", accent: "text-[#9ec4e8]" },
  { name: "Avatar Kyoshi", tag: "Age of the Daofei", img: "/eras/kyoshi.jpg", accent: "text-[#a3c98a]" },
  { name: "Hundred Year War", tag: "A world at war", img: "/eras/hundred-year-war.jpg", accent: "text-[#d97a5c]" },
  { name: "Avatar Korra", tag: "Age of industry", img: "/eras/korra.jpg", accent: "text-[#9ec4e8]" },
  { name: "Your own era", tag: "Build a custom setting", img: "/eras/custom.jpg", accent: "text-gold" },
];

export default function Home() {
  return (
    <div className="bg-ink text-parchment min-h-screen font-body">
      {/* NAV */}
      <header className="sticky top-0 z-20 flex items-center justify-between px-14 py-5 bg-ink/85 backdrop-blur-md border-b border-gold/15">
        <Link href="/" className="flex items-center gap-3">
          <LotusMark size={34} />
          <span className="font-display font-bold text-lg tracking-wide text-parchment">White Lotus Archive</span>
        </Link>
        <nav className="flex items-center gap-9">
          <a href="#eras" className="text-parchment-dim text-[15px] font-medium hover:text-parchment">Eras</a>
          <div className="group relative">
            <button className="flex items-center gap-1.5 text-parchment-dim text-[15px] font-medium">
              Character
              <svg width="10" height="6" viewBox="0 0 10 6" className="shrink-0">
                <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="hidden group-hover:block group-focus-within:block absolute top-full left-1/2 -translate-x-1/2 mt-3.5 bg-ink-soft border border-gold/20 rounded-2xl p-2 min-w-[200px] shadow-2xl z-30">
              <Link href="/character/creator" className="block px-3.5 py-2.5 rounded-lg text-parchment text-sm font-medium hover:bg-white/5">Create a character</Link>
              <Link href="/signup" className="block px-3.5 py-2.5 rounded-lg text-parchment text-sm font-medium hover:bg-white/5">Manage characters</Link>
            </div>
          </div>
          <Link href="/login" className="text-parchment-dim text-[15px] font-medium hover:text-parchment">Log in</Link>
          <Link href="/signup" className="bg-gold text-gold-ink px-5.5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap hover:brightness-95">Sign up free</Link>
        </nav>
      </header>

      {/* HERO */}
      <section
        className="relative px-14 pt-[120px] pb-[140px] text-center overflow-hidden"
        style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(58,110,165,0.22), transparent 65%), linear-gradient(180deg, #0d1b1e 0%, #142a2e 60%, #0d1b1e 100%)" }}
      >
        <div
          className="absolute rounded-full"
          style={{ top: 90, right: "12%", width: 90, height: 90, background: "radial-gradient(circle at 35% 35%, #f5eedd, #d9c98a 70%)", boxShadow: "0 0 60px rgba(245,238,221,0.35)" }}
        />
        <p className="relative font-display text-[13px] tracking-[0.32em] uppercase text-gold mb-5">An Avatar Legends companion</p>
        <h1 className="relative font-display font-semibold text-[62px] leading-[1.12] mx-auto mb-6 max-w-3xl text-parchment">
          Your story across the four nations, kept in one place
        </h1>
        <p className="relative text-lg leading-relaxed text-parchment-dim max-w-xl mx-auto mb-11">
          Build characters, track your growth, and carry your Avatar Legends saga from your first spark to your final bending &mdash; all in one warm little archive.
        </p>
        <div className="relative flex gap-4 justify-center flex-wrap mb-18">
          <Link href="/signup" className="bg-gold text-gold-ink px-8.5 py-4 rounded-full text-base font-bold hover:brightness-95">Sign up &amp; create your character</Link>
          <a href="#eras" className="bg-white/8 text-parchment px-8.5 py-4 rounded-full text-base font-semibold border border-white/25">Explore the eras</a>
        </div>
        <div className="relative flex justify-center max-w-xl mx-auto">
          <div className="w-3 h-3 rounded-full -mx-0.5" style={{ background: "#3a6ea5", boxShadow: "0 0 14px rgba(58,110,165,0.6)" }} />
          <div className="w-3 h-3 rounded-full -mx-0.5" style={{ background: "#4a7c3a", boxShadow: "0 0 14px rgba(74,124,58,0.6)" }} />
          <div className="w-3 h-3 rounded-full -mx-0.5" style={{ background: "#b3492e", boxShadow: "0 0 14px rgba(179,73,46,0.6)" }} />
          <div className="w-3 h-3 rounded-full -mx-0.5" style={{ background: "#d9c98a", boxShadow: "0 0 14px rgba(217,201,138,0.6)" }} />
        </div>
      </section>

      {/* CHARACTER CREATOR PREVIEW */}
      <section id="creator" className="px-14 py-[120px] bg-panel">
        <div className="max-w-6xl mx-auto grid grid-cols-2 gap-18 items-center">
          <div>
            <p className="font-display text-[12.5px] tracking-[0.28em] uppercase text-gold mb-4">Character creator</p>
            <h2 className="font-display font-semibold text-4xl leading-tight mb-5 text-parchment">A guided path from playbook to full sheet</h2>
            <p className="text-[16.5px] leading-relaxed text-parchment-dim mb-8 max-w-md">
              Pick your era, choose a playbook, and we&rsquo;ll walk you through training, techniques, and growth &mdash; with everything saved to your profile the moment you finish.
            </p>
            <div className="flex flex-col gap-4.5 mb-9">
              {["Choose your era and setting", "Pick a playbook and bending style", "Fill in balance, connections, and growth"].map((t, i) => (
                <div key={t} className="flex gap-3.5 items-start">
                  <div className="w-7 h-7 rounded-full bg-gold/15 text-gold flex items-center justify-center font-display font-bold text-[13px] shrink-0">{i + 1}</div>
                  <p className="mt-1 text-[15px] text-[#e8ddc4]">{t}</p>
                </div>
              ))}
            </div>
            <Link href="/character/creator" className="bg-gold text-gold-ink px-7 py-3.5 rounded-full text-[15px] font-bold hover:brightness-95">Start creating</Link>
          </div>
          <div className="rounded-3xl p-8 border border-gold/20 shadow-2xl" style={{ background: "linear-gradient(155deg, #1a3238, #10262a)" }}>
            <div className="flex justify-between items-center mb-5.5">
              <span className="font-display text-[15px] font-semibold text-parchment">Step 2 of 4 &middot; Playbook</span>
              <span className="text-[12.5px] text-muted">Kyoshi era</span>
            </div>
            <div className="h-1.5 rounded-full bg-white/10 mb-7 overflow-hidden">
              <div className="w-1/2 h-full bg-gold rounded-full" />
            </div>
            <div className="grid grid-cols-2 gap-3.5">
              {[
                { name: "The Waterbender", note: "Flow, healing, adaptation", tint: "rgba(58,110,165,0.5)", bg: "rgba(58,110,165,0.12)" },
                { name: "The Bodyguard", note: "Protection, loyalty, resolve", tint: "rgba(232,200,116,0.55)", bg: "rgba(232,200,116,0.14)" },
                { name: "The Adamant", note: "Earth, stability, defiance", tint: "rgba(74,124,58,0.5)", bg: "rgba(74,124,58,0.12)" },
                { name: "The Rebel", note: "Fire, defiance, change", tint: "rgba(179,73,46,0.5)", bg: "rgba(179,73,46,0.12)" },
              ].map((c) => (
                <div key={c.name} className="rounded-2xl p-4" style={{ border: `1px solid ${c.tint}`, background: c.bg }}>
                  <p className="font-display text-sm text-parchment mb-1">{c.name}</p>
                  <p className="text-xs text-muted">{c.note}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ERA GALLERY */}
      <section id="eras" className="px-14 py-[120px] bg-ink">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p className="font-display text-[12.5px] tracking-[0.28em] uppercase text-gold mb-4">Choose your era</p>
            <h2 className="font-display font-semibold text-4xl mb-4 text-parchment">Six chapters of the Avatar world</h2>
            <p className="text-base text-parchment-dim max-w-lg mx-auto">Play in a time you know by heart, or build a setting entirely your own.</p>
          </div>
          <div className="grid grid-cols-3 gap-6">
            {ERAS.map((era) => (
              <div key={era.name} className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-gold/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={era.img} alt={era.name} className="absolute inset-0 w-full h-full object-cover" />
                <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(180deg, rgba(13,27,30,0) 35%, rgba(13,27,30,0.92) 100%)" }} />
                <Link href="/signup" className="absolute left-5 right-5 bottom-5">
                  <p className={`mb-1 text-[11.5px] tracking-[0.18em] uppercase ${era.accent}`}>{era.tag}</p>
                  <p className="font-display font-semibold text-xl text-parchment">{era.name}</p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BAND */}
      <section className="px-14 py-[100px] text-center border-t border-gold/10" style={{ background: "linear-gradient(180deg, #0d1b1e, #142a2e)" }}>
        <h2 className="font-display font-semibold text-[34px] mb-4.5 text-parchment">Your journey starts with a single spark</h2>
        <p className="text-base text-parchment-dim mb-9">Free to join. Your characters and progress travel with you.</p>
        <Link href="/signup" className="bg-gold text-gold-ink px-9 py-4 rounded-full text-base font-bold hover:brightness-95">Sign up &amp; create a character</Link>
      </section>

      {/* FOOTER */}
      <footer className="px-14 py-14 bg-ink-deep border-t border-gold/10">
        <div className="max-w-6xl mx-auto flex justify-between flex-wrap gap-10">
          <div className="max-w-[280px]">
            <div className="flex items-center gap-2.5 mb-3.5">
              <LotusMark size={26} />
              <span className="font-display font-bold text-base text-parchment">White Lotus Archive</span>
            </div>
            <p className="text-[13.5px] text-faint leading-relaxed">
              A fan-made companion for the Avatar Legends tabletop roleplaying game. Unofficial and unaffiliated with Magpie Games or Avatar Studios.
            </p>
          </div>
          <div className="flex gap-16 flex-wrap">
            <div>
              <p className="font-display text-[13px] text-gold mb-3.5">Explore</p>
              <div className="flex flex-col gap-2.5">
                <a href="#eras" className="text-[13.5px] text-muted">Eras</a>
                <a href="#creator" className="text-[13.5px] text-muted">Character creator</a>
              </div>
            </div>
            <div>
              <p className="font-display text-[13px] text-gold mb-3.5">Account</p>
              <div className="flex flex-col gap-2.5">
                <Link href="/login" className="text-[13.5px] text-muted">Log in</Link>
                <Link href="/signup" className="text-[13.5px] text-muted">Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
