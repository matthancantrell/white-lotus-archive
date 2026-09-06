import type { Playbook } from '../data';
import iconImg from '../../../../assets/playbooks/guardian.jpg';
import backgroundImg from '../../../../assets/playbooks/background/guardian.jpg';
import bannerImg from '../../../../assets/playbooks/banner/guardian.jpg';

export const guardian: Playbook = {
  id: 'guardian',
  iconColor: '#b3492e',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  name: 'The Guardian',
  tagline: 'Sworn to protect someone specific, sometimes at the cost of their own goals.',
  principles: ['Duty', 'Freedom'],
  stats: { creativity: -1, focus: 1, harmony: 1, passion: 0 },
  moves: [
    { name: 'Shield', effect: 'When you place yourself between your charge and harm, roll with Focus.' },
    { name: 'Ever Vigilant', effect: 'You always notice a threat to your charge before anyone else at the table does.' },
    { name: 'Steady Hand', effect: 'When you calm your charge in a tense moment, roll with Harmony.' },
    { name: 'Draw Their Eye', effect: 'Once per exchange, redirect an attacker’s focus onto yourself.' },
    { name: 'Off Duty', effect: 'Clear a condition when you take real time for yourself, away from your charge.' },
  ],
  feature: { name: 'Sworn Oath', effect: 'Name who you’ve sworn to protect; your balance shifts whenever that bond is tested.' },
  growth: 'Did protecting your charge cost you something you wanted?',
  history: [
    'Who is your ward, and why do they need protecting?',
    'What did you give up to take on this duty?',
    'Who trained you, and what do they think of your ward?',
    'Which companion do you trust to help you, and which one worries you?',
  ],
  startingTechnique: { name: 'Interpose', approach: 'defend', effect: 'Step between your ward and harm; take the hit’s fatigue in their place and become Prepared.' },
  momentOfBalance: 'Nothing gets through you. Tell the GM how you protect your ward and your companions from a threat that should have overwhelmed them all.',
};
