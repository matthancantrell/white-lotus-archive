import type { Technique } from '@/types';

// Core Book (Appendix A) technique list — verified against Demiplane Nexus
// with Source filtered to Core Book. No sub-style Forms for Technology.
export const technology: Technique[] = [
  { name: 'Better, Faster, Stronger', training: ['Technology'], approach: 'defend', rare: false, legendary: false, details: 'You push your equipment to its limits to move fast and charge up.' },
  { name: 'Blinded by Science', training: ['Technology'], approach: 'attack', rare: false, legendary: false, details: 'Use your gadgets and gizmos in a way that confuses and dazzles even the most tech-savvy foe.' },
  { name: 'Collect Material', training: ['Technology'], approach: 'evade', rare: false, legendary: false, details: 'Scrounge up bits and bobs from the area around you that you can use to your advantage.' },
  { name: 'Entangler', training: ['Technology'], approach: 'attack', rare: false, legendary: false, details: 'Entangle a foe with a weapon or device.' },
  { name: 'Full-Power Attack', training: ['Technology'], approach: 'attack', rare: true, legendary: false, details: 'Discharge your batteries, release the high-tension coils, and otherwise unleash the full charge of your equipment!' },
  { name: 'Jolt', training: ['Technology'], approach: 'attack', rare: false, legendary: false, details: 'Launch a disruptive attack on a target within reach in an attempt to control or slow them.' },
  { name: 'Jury Rig', training: ['Technology'], approach: 'attack', rare: true, legendary: false, details: 'Create a new device on the fly.' },
  { name: 'Pinpoint Flaws', training: ['Technology'], approach: 'evade', rare: false, legendary: false, details: 'Identify weak points in your environment.' },
  { name: 'Plant Trap', training: ['Technology'], approach: 'evade', rare: false, legendary: false, details: 'Place a snare or triggered explosive into your environment.' },
  { name: 'Rebuild', training: ['Technology'], approach: 'defend', rare: false, legendary: false, details: 'Using your technological know-how, you improve your situation by quickly tuning, repairing, and adjusting your available equipment.' },
  { name: 'Smoke Bomb', training: ['Technology'], approach: 'defend', rare: false, legendary: false, details: 'Throw a smoke bomb to cover your escape from the combat.' },
  { name: 'Wind Up', training: ['Technology'], approach: 'defend', rare: true, legendary: false, details: 'Wind up a technological device to build tension and charge!' },
];
