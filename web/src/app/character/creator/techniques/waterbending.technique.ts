import type { Technique } from '@/types';

// PLACEHOLDER catalog — replace with the Core Book (Appendix A) technique list.
export const waterbending: Technique[] = [
  { name: 'Water Whip', training: ['Waterbending'], approach: 'attack', details: 'Lash a foe with a tendril of water; they mark 1-fatigue and are knocked off-balance.' },
  { name: 'Flow as Water', training: ['Waterbending'], approach: 'defend', details: 'Mark 1-fatigue to shift to a new position and impair a foe you slip past.' },
  { name: 'Ice Prison', training: ['Waterbending'], approach: 'attack', details: 'Freeze a foe in place; they are Trapped until they break free.' },
  { name: 'Healing Waters', training: ['Waterbending'], approach: 'evade', details: 'Soothe a wound; you or an ally clears 1-fatigue.' },
  { name: 'Bloodbending', training: ['Waterbending', 'Bloodbending'], approach: 'attack', details: 'Under a full moon, seize control of a foe’s body for one exchange. Forbidden nearly everywhere.' },
];
