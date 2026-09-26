import type { Move } from '@/types';

// PLACEHOLDER catalog — replace with the Core Book (Appendix A) basic-move
// list. Written fresh for this project, not copied from any source; a null
// rollsWith covers moves with no roll at all.
export const basic: Move[] = [
  { name: 'Assess a Situation', category: 'Basic', subcategory: null, rollsWith: 'creativity', details: 'Size up a scene for hidden angles, dangers, or opportunities.' },
  { name: 'Guide and Comfort', category: 'Basic', subcategory: null, rollsWith: 'harmony', details: 'Steady someone through fear or grief; they clear a condition or act on your advice.' },
  { name: 'Intimidate', category: 'Basic', subcategory: null, rollsWith: 'passion', details: 'Press someone with force of will until they back down or give something up.' },
  { name: 'Plead', category: 'Basic', subcategory: null, rollsWith: 'harmony', details: 'Appeal to someone’s better nature to get help or mercy you haven’t earned yet.' },
  { name: 'Push Your Luck', category: 'Basic', subcategory: null, rollsWith: 'passion', details: 'Throw yourself at a risky, uncertain action with no clean fallback.' },
  { name: 'Rely on Your Skills and Training', category: 'Basic', subcategory: null, rollsWith: 'focus', details: 'Use hard-won expertise to accomplish something exacting or technical.' },
  { name: 'Trick', category: 'Basic', subcategory: null, rollsWith: 'creativity', details: 'Mislead or misdirect someone into a mistake they don’t see coming.' },
  { name: 'Help', category: 'Basic', subcategory: null, rollsWith: null, details: 'Lend an ally your aid; they take +1 forward, at some cost or risk to you.' },
  { name: 'Stance Move', category: 'Basic', subcategory: null, rollsWith: null, details: 'Your training’s signature stance — see your Training for its specific effect.' },
  { name: 'Training', category: 'Basic', subcategory: null, rollsWith: null, details: 'The baseline benefit every character gets from their chosen Training.' },
];
