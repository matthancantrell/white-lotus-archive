import type { Move } from '@/types';

// Core Book basic-move list — verified against Demiplane Nexus with Source
// filtered to Core Book. A null rollsWith covers moves with no roll at all.
// 'Training' is the only Basic move with a non-null subcategory.
export const basic: Move[] = [
  { name: 'Assess a Situation', category: 'Basic', subcategory: null, rollsWith: 'creativity', details: 'Any time you try to gather specific or useful information during a tense moment, you make the assess a situation move.' },
  { name: 'Guide and Comfort', category: 'Basic', subcategory: null, rollsWith: 'harmony', details: 'Any time you try to comfort, offer guidance, or steer someone’s course of action through wisdom, not persuasion, you’re guiding and comforting someone.' },
  { name: 'Intimidate', category: 'Basic', subcategory: null, rollsWith: 'passion', details: 'Any time you threaten an NPC into retreat or surrender with words or fists, you are intimidating them.' },
  { name: 'Plead', category: 'Basic', subcategory: null, rollsWith: 'harmony', details: 'Any time you try to get help or a favor from an NPC, you are pleading with an NPC.' },
  { name: 'Push Your Luck', category: 'Basic', subcategory: null, rollsWith: 'passion', details: 'Any time you rely on fate and luck to carry you through instead of skills or training, you’re pushing your luck.' },
  { name: 'Rely on Your Skills and Training', category: 'Basic', subcategory: null, rollsWith: 'focus', details: 'Any time you use your expertise and knowledge to overcome a significant complication or risk, you’re relying on your skills and training.' },
  { name: 'Trick', category: 'Basic', subcategory: null, rollsWith: 'creativity', details: 'Any time you use your wits and skills to fool, confuse, or deceive NPCs, you’re tricking an NPC.' },
  { name: 'Help', category: 'Basic', subcategory: null, rollsWith: null, details: 'Any time you step in and assist another PC’s actions, you are helping a companion.' },
  { name: 'Stance Move', category: 'Basic', subcategory: null, rollsWith: null, details: 'To determine how many techniques a PC combatant can use, they make the stance move when resolving approaches: each player rolls with the appropriate stat, based on the approach they chose.' },
  { name: 'Training', category: 'Basic', subcategory: 'Advancement', rollsWith: null, details: 'When you spend time with a teacher learning and training in a new technique, roll with modifiers from the following questions.' },
];
