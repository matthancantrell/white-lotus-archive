import type { Technique } from '@/types';

// Core Book (Appendix A) technique list — verified against Demiplane Nexus
// with Source filtered to Core Book. No sub-style Forms for Weapons.
export const weapons: Technique[] = [
  { name: 'Boom!', training: ['Weapons'], approach: 'attack', rare: true, legendary: false, details: 'Throw a small prepared explosive into the midst of your foes.' },
  { name: 'Chart a Course', training: ['Weapons'], approach: 'evade', rare: true, legendary: false, details: 'Plan a clear and perfect path of action.' },
  { name: 'Chi-Blocking Jabs', training: ['Weapons'], approach: 'attack', rare: true, legendary: false, details: 'Pinpoint weapon or hand strikes to block a foe’s chi.' },
  { name: 'Counterstrike', training: ['Weapons'], approach: 'defend', rare: false, legendary: false, details: 'Using impeccable timing, read your foe’s movement and lash out with blinding speed.' },
  { name: 'Disarm', training: ['Weapons'], approach: 'defend', rare: false, legendary: false, details: 'Target your foe’s ability to fight by breaking, removing, or limiting a particular style.' },
  { name: 'Feint', training: ['Weapons'], approach: 'evade', rare: false, legendary: false, details: 'Trick your foes into overextending themselves against you.' },
  { name: 'Parry', training: ['Weapons'], approach: 'defend', rare: false, legendary: false, details: 'Stop a foe’s attack before it connects.' },
  { name: 'Pin a Fly to a Tree', training: ['Weapons'], approach: 'attack', rare: true, legendary: false, details: 'Fire arrows with perfect accuracy to pin a foe in place.' },
  { name: 'Pinpoint Thrust', training: ['Weapons'], approach: 'attack', rare: false, legendary: false, details: 'Using a thrusting or stabbing weapon, go straight for the target with precision and accuracy.' },
  { name: 'Switch It Up', training: ['Weapons'], approach: 'evade', rare: false, legendary: false, details: 'Switch up your style, footwork, weapon, or bearing, causing your foe to second-guess your next move.' },
  { name: 'Take the High Ground', training: ['Weapons'], approach: 'defend', rare: false, legendary: false, details: 'Move to an advantageous position above your foe.' },
  { name: 'Turn the Tables', training: ['Weapons'], approach: 'attack', rare: true, legendary: false, details: 'Make careful strikes to undermine your foe’s advantageous position.' },
];
