'use client';

import { useEffect } from 'react';

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body style={{ margin: 0, minHeight: '100vh', background: '#0d1b1e', color: '#f5eedd', fontFamily: 'system-ui, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
        <div
          style={{
            width: '100%',
            maxWidth: 480,
            textAlign: 'center',
            borderRadius: 22,
            padding: 40,
            border: '1px solid rgba(232,200,116,0.2)',
            background: 'linear-gradient(155deg, #1a3238, #10262a)',
            boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
          }}
        >
          <h1 style={{ fontWeight: 600, fontSize: 28, lineHeight: 1.2, marginBottom: 12 }}>Something went wrong</h1>
          <p style={{ fontSize: 15.5, lineHeight: 1.6, color: '#cfc7b3', marginBottom: 32 }}>
            The spirits are restless. Something broke on our end &mdash; try again, or head back home.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => reset()}
              style={{ background: '#e8c874', color: '#1a1108', padding: '12px 26px', borderRadius: 9999, fontSize: 14.5, fontWeight: 700, border: 'none', cursor: 'pointer' }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{ background: 'rgba(255,255,255,0.08)', color: '#f5eedd', padding: '12px 26px', borderRadius: 9999, fontSize: 14.5, fontWeight: 600, border: '1px solid rgba(255,255,255,0.25)', textDecoration: 'none' }}
            >
              Return home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
