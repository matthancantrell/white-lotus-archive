'use client';

import { useState } from 'react';
import Image from 'next/image';
import { resolvePlaybookMedia, type Playbook } from './data';

// Real banner art is 1920x600 — matching that ratio here (instead of a fixed
// pixel height) keeps the full shape of the photo at any width, mobile
// included, rather than cropping harder as the panel narrows.
const BANNER_CLASS = 'w-full aspect-[1920/600] object-cover mb-5';
const BANNER_STYLE = { outline: '2px solid #e8c874', outlineOffset: '-8px' };

// Used for both the preview panel and the confirmed "about" tab in StepPlaybook — a
// single shared piece so the two can't drift out of sync with each other again.
//
// Tries the media bucket first (Playbook.bannerImageKey, via the API — see
// resolvePlaybookMedia) and falls back to the bundled local file
// (Playbook.bannerFile) if that request 404s, e.g. before the bucket object has
// been uploaded. Once every playbook's banner is uploaded to R2 under
// `playbooks/<bannerImageKey>`, the fallback simply never triggers.
export default function PlaybookBanner({ playbook }: { playbook: Playbook }) {
  const [bucketFailed, setBucketFailed] = useState(false);

  if (bucketFailed) {
    return <Image src={playbook.bannerFile} alt={playbook.name} className={BANNER_CLASS} style={BANNER_STYLE} />;
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element -- bucket-hosted, not a static import Next can optimize.
    <img
      src={resolvePlaybookMedia(playbook.bannerImageKey)}
      alt={playbook.name}
      className={BANNER_CLASS}
      style={BANNER_STYLE}
      onError={() => setBucketFailed(true)}
    />
  );
}
