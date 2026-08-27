'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/client';
import LotusMark from '@/components/LotusMark';

const inputCls =
  'text-[15px] px-3.5 py-3 rounded-[10px] border border-white/[0.18] bg-ink/60 text-parchment w-full box-border placeholder:text-[#6f847f] focus:outline-none focus:border-gold focus:ring-[3px] focus:ring-gold/20';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setSubmitting(false);

    if (error) {
      setError(error.message);
      return;
    }

    router.push(searchParams.get('next') ?? '/profile');
    router.refresh();
  }

  return (
    <main
      className="min-h-screen flex items-center justify-center px-5 py-10 relative overflow-hidden font-body"
      style={{ background: 'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(58,110,165,0.2), transparent 65%), linear-gradient(180deg, #0d1b1e 0%, #142a2e 55%, #0d1b1e 100%)' }}
    >
      <div
        className="absolute rounded-full"
        style={{ top: 60, right: '12%', width: 70, height: 70, background: 'radial-gradient(circle at 35% 35%, #f5eedd, #d9c98a 70%)', boxShadow: '0 0 50px rgba(245,238,221,0.3)' }}
      />

      <div className="relative w-full max-w-[400px]">
        <Link href="/" className="flex items-center justify-center gap-2.5 mb-8">
          <LotusMark size={28} />
          <span className="font-display font-bold text-[16.5px] text-parchment">White Lotus Archive</span>
        </Link>

        <div className="rounded-[22px] p-10 border border-gold/20 shadow-2xl" style={{ background: 'linear-gradient(155deg, #1a3238, #10262a)' }}>
          <h1 className="font-display font-semibold text-2xl mb-1.5 text-parchment">Welcome back</h1>
          <p className="text-[14.5px] text-muted mb-7">Log in to continue your journey.</p>

          <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4.5">
            {error && (
              <p role="alert" className="text-[13.5px] px-3.5 py-2.5 rounded-[10px] bg-[#b3492e]/15 border border-[#b3492e]/40 text-[#e8927a]">
                {error}
              </p>
            )}

            <div className="flex flex-col gap-1.5">
              <label htmlFor="email" className="text-[13px] font-semibold text-parchment-dim">Email</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-invalid={!!error}
                required
                className={inputCls}
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label htmlFor="password" className="text-[13px] font-semibold text-parchment-dim">Password</label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  aria-invalid={!!error}
                  required
                  className={`${inputCls} pr-[68px]`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 bg-transparent border-none text-muted text-xs font-semibold cursor-pointer px-2 py-1.5"
                >
                  {showPassword ? 'Hide' : 'Show'}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="mt-1.5 px-4 py-3.5 text-[15.5px] font-bold text-gold-ink bg-gold border-none rounded-full cursor-pointer disabled:opacity-60 hover:brightness-95"
            >
              {submitting ? 'Logging in\u2026' : 'Log in'}
            </button>
          </form>

          <p className="text-center text-[13.5px] text-muted mt-6">
            Need an account? <Link href="/signup" className="font-semibold">Sign up</Link>
          </p>
        </div>
      </div>
    </main>
  );
}
