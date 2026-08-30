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
};
