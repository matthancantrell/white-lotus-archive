import Image from 'next/image';
import type { Playbook } from './data';

// Used for both the preview panel and the confirmed "about" tab in StepPlaybook — a
// single shared piece so the two can't drift out of sync with each other again.
export default function PlaybookBanner({ playbook }: { playbook: Playbook }) {
  return (
    <Image
      src={playbook.bannerFile}
      alt={playbook.name}
      // Real banner art is 1920x600 — matching that ratio here (instead of a
      // fixed pixel height) keeps the full shape of the photo at any width,
      // mobile included, rather than cropping harder as the panel narrows.
      className="w-full aspect-[1920/600] object-cover mb-5"
      style={{ outline: '2px solid #e8c874', outlineOffset: '-8px' }}
    />
  );
}
