import type { Technique } from '@/types';

// Core Book (Appendix A) technique list — verified against Demiplane Nexus
// with Source filtered to Core Book. `training` carries a second, short Form
// tag (e.g. 'Blood', 'Heal') for the sub-styles the book itself distinguishes.
export const waterbending: Technique[] = [
  { name: 'Water Whip', training: ['Waterbending'], approach: 'defend', rare: false, legendary: false, details: 'Lash out with a tendril of water. Mark 1-fatigue to inflict a condition or 2-fatigue, your choice.' },
  { name: 'Flow as Water', training: ['Waterbending'], approach: 'defend', rare: false, legendary: false, details: 'Use a jet of water to propel you smoothly around obstacles.' },
  { name: 'Breath of Ice', training: ['Waterbending'], approach: 'defend', rare: false, legendary: false, details: 'Become ready to breathe shivering cold upon any foe who gets close to you.' },
  { name: 'Creeping Ice', training: ['Waterbending'], approach: 'evade', rare: false, legendary: false, details: 'Carefully and stealthily extend a sheet of ice out beneath foes of your choice; they become Impaired as long as they remain on the ice, and you become Prepared to engage with them.' },
  { name: 'Crushing Grip of Seas', training: ['Waterbending'], approach: 'attack', rare: true, legendary: false, details: 'Throw a tendril of water that wraps around a foe’s limb and holds it in place.' },
  { name: 'Ice Gauntlet', training: ['Waterbending'], approach: 'defend', rare: false, legendary: false, details: 'Cover your hand with a sheathe of ice.' },
  { name: 'Ice Prison', training: ['Waterbending'], approach: 'attack', rare: true, legendary: false, details: 'Aggressively wrap a foe in ice.' },
  { name: 'Slip Over Ice', training: ['Waterbending'], approach: 'evade', rare: false, legendary: false, details: 'Use ice and water to slip around your environment with ease while putting foes off-balance.' },
  { name: 'Stream the Water', training: ['Waterbending'], approach: 'attack', rare: false, legendary: false, details: 'Push a high-powered stream of water from a significant source.' },
  { name: 'Water Cloak', training: ['Waterbending'], approach: 'defend', rare: true, legendary: false, details: 'Surround yourself with water; mark fatigue and hold 3.' },
  { name: 'Blood Twisting', training: ['Waterbending', 'Blood'], approach: 'attack', rare: true, legendary: false, details: 'Use bloodbending to move and twist a foe’s body in painful ways.' },
  { name: 'Freeze Blood', training: ['Waterbending', 'Blood'], approach: 'attack', rare: true, legendary: false, details: 'Use bloodbending to seize a target and hold them in place.' },
  { name: 'Refresh', training: ['Waterbending', 'Heal'], approach: 'evade', rare: false, legendary: false, details: 'Apply water to reinvigorate and close wounds on a willing target.' },
];
