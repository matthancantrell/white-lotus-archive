import type { Move } from '@/types';

// PLACEHOLDER catalog — replace with the Core Book (Appendix A) balance-move
// list. Written fresh for this project, not copied from any source; these
// resolve against your Balance track rather than a stat, hence rollsWith: null.
export const balance: Move[] = [
  { name: 'Live Up to Your Principle', category: 'Balance', subcategory: null, rollsWith: null, details: 'Act decisively in line with one of your principles to shift your Balance toward it.' },
  { name: 'Call Someone Out', category: 'Balance', subcategory: null, rollsWith: null, details: 'Confront someone drifting from their own principle and push them to reckon with it.' },
  { name: 'Deny a Callout', category: 'Balance', subcategory: null, rollsWith: null, details: 'Refuse a callout aimed at you, holding your ground against the push to shift.' },
  { name: 'Resist Shifting Your Balance', category: 'Balance', subcategory: null, rollsWith: null, details: 'Fight to stay where you are on your Balance track against outside pressure.' },
  { name: 'Lose Your Balance', category: 'Balance', subcategory: null, rollsWith: null, details: 'Tip fully into one principle, gaining power at your center’s expense.' },
];
