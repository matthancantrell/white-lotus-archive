import type { Technique } from '@/types';

// PLACEHOLDER catalog — replace with the Core Book (Appendix A) technique list.
export const earthbending: Technique[] = [
  { name: 'Stone Wall', training: ['Earthbending'], approach: 'defend', details: 'Raise a barrier of earth; you and an adjacent ally are Prepared against the next attack.' },
  { name: 'Seismic Sense', training: ['Earthbending'], approach: 'evade', details: 'Read the ground; learn a foe’s position and next intention even if you cannot see them.' },
  { name: 'Rock Slide', training: ['Earthbending'], approach: 'attack', details: 'Send a wave of rubble at foes in a line; each marks 1-fatigue or is knocked down.' },
  { name: 'Metalbending', training: ['Earthbending', 'Metalbending'], approach: 'attack', details: 'Bend refined metal as if it were earth; bypass metal armor or bind a foe in their own gear.' },
  { name: 'Lavabending', training: ['Earthbending', 'Lavabending'], approach: 'attack', details: 'Melt stone into lava; create an impassable hazard or force a foe to mark 2-fatigue.' },
];
