import type { Move } from '@/types';

// Core Book balance-move list — verified against Demiplane Nexus with Source
// filtered to Core Book. These resolve against your Balance track rather
// than a stat, hence rollsWith: null throughout.
export const balance: Move[] = [
  { name: 'Live Up to Your Principle', category: 'Balance', subcategory: null, rollsWith: null, details: 'Any time you take action that aligns with one of your playbook’s two principles on your balance track, you can live up to your principle before you make your move.' },
  { name: 'Call Someone Out', category: 'Balance', subcategory: null, rollsWith: null, details: 'When you make this move, you remind someone (a PC or NPC) of one of their principles and call on them to take immediate action related to that ideal.' },
  { name: 'Deny a Callout', category: 'Balance', subcategory: null, rollsWith: null, details: 'NPCs can, and will, call on you to live up to one of your principles just as you can call them out.' },
  { name: 'Resist Shifting Your Balance', category: 'Balance', subcategory: null, rollsWith: null, details: 'When you resist shifting your balance, you’re not just choosing to ignore an NPC’s words—you’re rejecting any shift to your balance, the current state of your principles and beliefs.' },
  { name: 'Lose Your Balance', category: 'Balance', subcategory: null, rollsWith: null, details: 'When you lose your balance, you become so obsessed with one of your principles that you end up causing problems for yourself and others.' },
];
