import type { Technique } from '@/types';

// PLACEHOLDER catalog — replace with the Core Book (Appendix A) technique list.
export const weapons: Technique[] = [
  { name: 'Precise Strike', training: ['Weapons'], approach: 'attack', details: 'Land a hit that finds the gap in a guard; the foe marks 1-fatigue and a condition.' },
  { name: 'Disarm', training: ['Weapons'], approach: 'attack', details: 'Twist a foe’s weapon from their grip; they are Impaired until they recover it.' },
  { name: 'Parry and Riposte', training: ['Weapons'], approach: 'defend', details: 'Turn a blocked attack into your own opening; take +1 forward.' },
  { name: 'Chi Blocking', training: ['Weapons', 'Chi Blocking'], approach: 'attack', details: 'Strike a bender’s pressure points; they cannot bend for the rest of the exchange.' },
  { name: 'Pincer Movement', training: ['Weapons'], approach: 'defend', details: 'You and an ally flank a foe together; both take +1 forward against them.' },
];
