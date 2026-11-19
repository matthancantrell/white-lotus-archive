import type { Move } from '@/types';

// Core Book balance-move list — verified against Demiplane Nexus with Source
// filtered to Core Book. These resolve against your Balance track rather
// than a stat, hence rollsWith: null throughout.
export const balance: Move[] = [
  {
    name: 'Live Up to Your Principle',
    category: 'Balance',
    subcategory: null, 
    rollsWith: null, 
    details: `When you take action in accordance with the values of a principle, mark 1-fatigue to roll with that principle instead of whatever stat you would normally roll.`
  },
  {
    name: 'Call Someone Out',
    category: 'Balance',
    subcategory: null,
    rollsWith: null,
    details: `When you openly call on someone to live up to their principle, shift your balance away from center, then name and roll with their principle.
    \n On a hit, they are called to act as you say. They must either do it or mark a condition.
    \n On a 7–9, they challenge your view of the world in turn. Mark 1-fatigue or they shift your balance as they choose.
    \n On a miss, they can demand you act in accordance with one of your principles instead. Mark a condition or act as they request.
    `
  },
  {
    name: 'Deny a Callout',
    category: 'Balance',
    subcategory: null,
    rollsWith: null,
    details: `When you deny an NPC calling on you to live up to your principle, roll with that principle.
    \n On a hit, act as they say or mark 1-fatigue.
    \n On a 10+, their words hit hard. You must also shift your balance towards the called-on principle.
    \n On a miss, you stand strong. Clear a condition, clear 1-fatigue, or shift your balance, your choice.
    `
  },
  {
    name: 'Lose Your Balance',
    category: 'Balance',
    subcategory: null,
    rollsWith: null,
    details: `If your balance shifts past the end of the track, you lose your balance. You obsess over that principle to a degree that’s not healthy for you or anyone around you.
    \n Choose one of the following:
    \n- Give in or submit to your opposition
    \n- Lose control of yourself in a destructive and harmful way
    \n- Take an extreme action in line with the principle, then flee
    \n Afterward, when you’ve had some time to recover and recenter yourself, shift your center one step towards the principle you exceeded and clear all your conditions and fatigue. Reset your balance to your new center.
    `
  }
];
