import type { Technique } from '@/types';

// Core Book (Appendix A) technique list — verified against Demiplane Nexus
// with Source filtered to Core Book. `training` carries a second, short Form
// tag (e.g. 'Lightning', 'Combustion') for the sub-styles the book itself
// distinguishes.
export const firebending: Technique[] = [
  { name: 'A Single Spark', training: ['Firebending'], approach: 'evade', rare: false, legendary: false, details: 'Unleash your emotions into the flames around you.' },
  { name: 'Breath of Fire', training: ['Firebending'], approach: 'attack', rare: false, legendary: false, details: 'Breathe fire in a massive gout.' },
  { name: 'Fire Blade', training: ['Firebending'], approach: 'attack', rare: false, legendary: false, details: 'Swipe your surroundings with a blade of flame.' },
  { name: 'Fire Pinwheel', training: ['Firebending'], approach: 'attack', rare: true, legendary: false, details: 'Throw a spinning disc of pure flame.' },
  { name: 'Fire Stream', training: ['Firebending'], approach: 'defend', rare: false, legendary: false, details: 'Pour fire upon a target.' },
  { name: 'Fire Whip', training: ['Firebending'], approach: 'defend', rare: false, legendary: false, details: 'Lash out from a distance.' },
  { name: 'Flame Knives', training: ['Firebending'], approach: 'attack', rare: false, legendary: false, details: 'When you inflict fatigue or conditions on a foe, inflict an additional 1-fatigue for each remaining flame.' },
  { name: 'Jet Stepping', training: ['Firebending'], approach: 'evade', rare: false, legendary: false, details: 'Advance to a higher position and become Favored and Prepared for the next exchange.' },
  { name: 'Redirect Lightning', training: ['Firebending'], approach: 'defend', rare: true, legendary: false, details: 'If you are targeted by a lightning attack, turn it back on the attacker.' },
  { name: 'Spiral Flare Kick', training: ['Firebending'], approach: 'attack', rare: true, legendary: false, details: 'Spin skyward on jets of flame as you lash out with your legs.' },
  { name: 'Wall of Fiery Breath', training: ['Firebending'], approach: 'defend', rare: false, legendary: false, details: 'Breathe a gout of flame that keeps foes back as you maneuver away from them.' },
  { name: 'Arc Lightning', training: ['Firebending', 'Lightning'], approach: 'evade', rare: true, legendary: false, details: 'Channel lightning through your body against a closely engaged foe.' },
  { name: 'Lightning Blast', training: ['Firebending', 'Lightning'], approach: 'attack', rare: true, legendary: false, details: 'Hurl a bolt of lightning at a target.' },
  { name: 'Explosive Blast', training: ['Firebending', 'Combustion'], approach: 'attack', rare: true, legendary: false, details: 'Fire a sparking, spitting beam of focused energy that explodes when it reaches its target.' },
];
