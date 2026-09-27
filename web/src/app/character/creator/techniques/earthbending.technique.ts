import type { Technique } from '@/types';

// Core Book (Appendix A) technique list — verified against Demiplane Nexus
// with Source filtered to Core Book. `training` carries a second, short Form
// tag (e.g. 'Metal', 'Lava', 'Seismic Sense') for the sub-styles the book
// itself distinguishes.
export const earthbending: Technique[] = [
  { name: 'Dust Stepping', training: ['Earthbending'], approach: 'defend', rare: false, legendary: false, details: 'Step up into the air on thin pillars of dust and stone.' },
  { name: 'Earth Armor', training: ['Earthbending'], approach: 'defend', rare: false, legendary: false, details: 'Gather earth, crystal, or other available material around you to create armor.' },
  { name: 'Earth Gauntlet', training: ['Earthbending'], approach: 'attack', rare: false, legendary: false, details: 'Wrap your arm or fist in rock and strike!' },
  { name: 'Earth Launch', training: ['Earthbending'], approach: 'defend', rare: false, legendary: false, details: 'Throw yourself into the air with a massive burst of force.' },
  { name: 'Earth Sinking', training: ['Earthbending'], approach: 'attack', rare: true, legendary: false, details: 'Sink a foe into the earth itself.' },
  { name: 'Earthquake', training: ['Earthbending'], approach: 'attack', rare: true, legendary: false, details: 'Ripple the earth and stone all around you with terrible force.' },
  { name: 'Eat Dirt', training: ['Earthbending'], approach: 'evade', rare: false, legendary: false, details: 'Even the smallest pebble can cause a gator-phant to stumble.' },
  { name: 'Ground Shift', training: ['Earthbending'], approach: 'evade', rare: false, legendary: false, details: 'Twist the ground itself to displace or unbalance foes.' },
  { name: 'Rock Column', training: ['Earthbending'], approach: 'attack', rare: false, legendary: false, details: 'Pin a foe with a column of earth.' },
  { name: 'Stone Shield', training: ['Earthbending'], approach: 'defend', rare: true, legendary: false, details: 'Raise a defensive shield of stone that protects you or someone else.' },
  { name: 'Thick Mud', training: ['Earthbending'], approach: 'evade', rare: false, legendary: false, details: 'Transform the earth and stone around you into sticky, sucking mud.' },
  { name: 'Detect the Heavy Step', training: ['Earthbending', 'Seismic Sense'], approach: 'defend', rare: true, legendary: false, details: 'Use seismic sense to detect the instant an enemy is about to move against you.' },
  { name: 'Hurl Metal', training: ['Earthbending', 'Metal'], approach: 'attack', rare: true, legendary: false, details: 'Rip and bend big pieces of metal in the surrounding area to strike at a foe.' },
  { name: 'Metal Bindings', training: ['Earthbending', 'Metal'], approach: 'evade', rare: true, legendary: false, details: 'Catch an enemy’s limbs in metal you control.' },
  { name: 'Lava Star', training: ['Earthbending', 'Lava'], approach: 'defend', rare: true, legendary: false, details: 'Create a floating, spinning star of lava that can cut through nearly anything.' },
  { name: 'Lava Wave', training: ['Earthbending', 'Lava'], approach: 'attack', rare: true, legendary: false, details: 'Raise and push a wave of lava from the earth around you.' },
];
