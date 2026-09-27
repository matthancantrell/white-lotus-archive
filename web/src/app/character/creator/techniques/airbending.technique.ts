import type { Technique } from '@/types';

// Core Book (Appendix A) technique list — verified against Demiplane Nexus
// with Source filtered to Core Book. No sub-style Forms for Airbending.
export const airbending: Technique[] = [
  { name: 'Air Cushion', training: ['Airbending'], approach: 'evade', rare: false, legendary: false, details: 'Soften the blows an ally takes and get them back on their feet faster.' },
  { name: 'Air Scooter', training: ['Airbending'], approach: 'evade', rare: false, legendary: false, details: 'Summon a ball or ring of air under yourself.' },
  { name: 'Air Swipe', training: ['Airbending'], approach: 'defend', rare: false, legendary: false, details: 'Prepare to cast an arc of pressurized air to knock away incoming attacks and throw enemies off-balance.' },
  { name: 'Breath of Wind', training: ['Airbending'], approach: 'attack', rare: true, legendary: false, details: 'Exhale mightily via pursed lips.' },
  { name: 'Cannonball', training: ['Airbending'], approach: 'attack', rare: false, legendary: false, details: 'Rush forward with the might of the wind behind you and crash into a foe.' },
  { name: 'Concussive Wake', training: ['Airbending'], approach: 'attack', rare: true, legendary: false, details: 'Run in a circle to build up momentum and then release a highly compressed blast of air in the shape of your silhouette.' },
  { name: 'Cushion the Forceful Fist', training: ['Airbending'], approach: 'evade', rare: true, legendary: false, details: 'Put a cushion of twisting air around your body that keeps physical strikes at bay.' },
  { name: 'Directed Funnel', training: ['Airbending'], approach: 'attack', rare: false, legendary: false, details: 'Create a spinning funnel of air that can fire objects at high speed.' },
  { name: 'Reed in the Wind', training: ['Airbending'], approach: 'evade', rare: true, legendary: false, details: 'Adjust your movements to perfectly match and avoid the movements of a foe.' },
  { name: 'Shockwave', training: ['Airbending'], approach: 'evade', rare: true, legendary: false, details: 'Leap into the air and hurtle back to the ground, sending a massive burst of pressurized air all around you.' },
  { name: 'Small Vortex', training: ['Airbending'], approach: 'evade', rare: false, legendary: false, details: 'Spin a single enemy off the ground on a small vortex.' },
  { name: 'Suction', training: ['Airbending'], approach: 'evade', rare: false, legendary: false, details: 'Snatch a small object off the ground or from a foe’s hand with a sucking wind.' },
  { name: 'Twisting Wind', training: ['Airbending'], approach: 'defend', rare: false, legendary: false, details: 'Effortlessly flow around blows like the wind itself.' },
  { name: 'Wind Run', training: ['Airbending'], approach: 'defend', rare: false, legendary: false, details: 'Race at high speeds, dodging attacks and seeking escape.' },
];
