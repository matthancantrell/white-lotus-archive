import type { Playbook } from '../data';
// TODO: swap these for the Bold's own real icon/background/banner art.
import iconImg from '../../../../assets/eras/korra.jpg';
import backgroundImg from '../../../../assets/eras/kyoshi.jpg';
import bannerImg from '../../../../assets/eras/aang.jpg';

export const bold: Playbook = {
  id: 'bold',
  iconColor: '#4a7c3a',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  name: 'The Bold',
  tagline: 'Charges in first, talks a big game, and backs it up more often than not.',
  principles: ['Confidence', 'Loyalty'],
  stats: { creativity: 1, focus: -1, harmony: 0, passion: 1 },
  moves: [
    { name: 'Big Talk', effect: 'When you boast about what you’re about to do, roll with Passion; a hit means the room believes you.' },
    { name: 'Reckless Charge', effect: 'When you throw yourself into danger to protect someone, roll with Creativity.' },
    { name: 'Crack the Plan', effect: 'When you improvise past a failed plan, roll with Creativity to find the opening.' },
    { name: 'Rally', effect: 'Once per session, give an ally advantage on their next roll by talking up their odds.' },
    { name: 'Never Back Down', effect: 'Clear a condition whenever you refuse to retreat from a fight you started.' },
  ],
  feature: { name: 'All In', effect: 'When the odds are worst, take +1 to your next roll for committing fully to the moment.' },
  growth: 'Did your confidence talk the group into a plan today?',
};
