import type { Technique } from '@/types';

// PLACEHOLDER catalog — replace with the Core Book (Appendix A) technique list.
export const firebending: Technique[] = [
  { name: 'Flame Whip', training: ['Firebending'], approach: 'attack', details: 'Strike a foe at range with a controlled arc of fire.' },
  { name: 'Breath of Fire', training: ['Firebending'], approach: 'defend', details: 'Exhale a burst of flame to clear space; foes engaged with you must mark 1-fatigue or back off.' },
  { name: 'Jet Stepping', training: ['Firebending'], approach: 'evade', details: 'Propel yourself with bursts of flame to reposition anywhere in the scene.' },
  { name: 'Lightning Generation', training: ['Firebending', 'Lightning'], approach: 'attack', details: 'Separate the energies and release lightning; a foe marks 3-fatigue or is taken out.' },
  { name: 'Lightning Redirection', training: ['Firebending', 'Lightning'], approach: 'defend', details: 'Catch lightning through your body and release it elsewhere, unharmed.' },
];
