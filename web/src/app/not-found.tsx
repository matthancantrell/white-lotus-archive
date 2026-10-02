import Link from 'next/link';
import LotusMark from '@/components/LotusMark';

export default function NotFound() {
  return (
    <div className="bg-ink text-parchment min-h-screen font-body flex flex-col">
      <header className="flex items-center px-[clamp(20px,6vw,56px)] py-[clamp(14px,3vw,20px)] border-b border-gold/15">
        <Link href="/" className="flex items-center gap-3">
          <LotusMark size={34} />
          <span className="font-display font-bold text-lg tracking-wide text-parchment">White Lotus Archive</span>
        </Link>
      </header>

      <div
        className="relative flex-1 flex items-center justify-center px-5 py-[clamp(48px,10vw,96px)] overflow-hidden"
        style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(58,110,165,0.2), transparent 65%), linear-gradient(180deg, #0d1b1e 0%, #142a2e 55%, #0d1b1e 100%)' }}
      >
        <div
          className="absolute rounded-full"
          style={{ top: 60, right: '12%', width: 70, height: 70, background: 'radial-gradient(circle at 35% 30%, #f5eedd, #d9c98a 70%)', boxShadow: '0 0 50px rgba(245,238,221,0.3)' }}
        />

        <div className="relative w-full max-w-lg mx-auto rounded-[22px] p-[clamp(28px,6vw,48px)] border border-gold/20 shadow-2xl text-center" style={{ background: 'linear-gradient(155deg, #1a3238, #10262a)' }}>
          <h1 className="font-display font-semibold text-[clamp(24px,4vw,32px)] leading-tight text-parchment mb-3">Lost on the road</h1>
          <p className="text-[15.5px] leading-relaxed text-parchment-dim mb-8">
            This page doesn&rsquo;t exist, or it isn&rsquo;t part of your saga to see. Let&rsquo;s get you back on the path.
          </p>
          <div className="flex gap-3.5 justify-center flex-wrap">
            <Link href="/" className="bg-gold text-gold-ink px-6.5 py-3 rounded-full text-[14.5px] font-bold hover:brightness-95">
              Return home
            </Link>
            <Link href="/character/manager" className="bg-white/8 text-parchment px-6.5 py-3 rounded-full text-[14.5px] font-semibold border border-white/25 hover:bg-white/12">
              Your characters
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
