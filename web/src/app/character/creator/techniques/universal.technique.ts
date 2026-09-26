import type { Technique } from '@/types';

// Available to every character regardless of training. A playbook's own
// starting technique (see each playbook's `startingTechnique`) is shown
// alongside these, not listed here, so it isn't duplicated for playbooks
// that happen to share a name.
// PLACEHOLDER catalog — replace with the Core Book (Appendix A) technique list.
export const universal: Technique[] = [
  { name: 'Pinpoint Aim', training: ['Universal'], approach: 'attack', details: 'Wait for the perfect moment; mark 1-fatigue to become Prepared and use an advance & attack technique.' },
  { name: 'Ready Stance', training: ['Universal'], approach: 'defend', details: 'Set your feet and read the fight; you become Prepared and shrug off the next attempt to knock you down.' },
  { name: 'Feint', training: ['Universal'], approach: 'evade', details: 'Sell a false opening; a foe commits and is Impaired against your next action.' },
  { name: 'Press the Advantage', training: ['Universal'], approach: 'attack', details: 'Against an Impaired or Stunned foe, inflict 1 extra fatigue.' },
  { name: 'Retreat', training: ['Universal'], approach: 'evade', details: 'Break contact cleanly; leave the exchange and take no consequences from foes you were engaged with.' },
  { name: 'Group Up', training: ['Universal'], approach: 'defend', details: 'You and every adjacent ally become Prepared together.' },
];
