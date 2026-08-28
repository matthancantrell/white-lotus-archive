import type { Playbook } from '../data';
// TODO: swap these for the Rogue's own real icon/background/banner art.
import iconImg from '../../../../assets/eras/custom.jpg';
import backgroundImg from '../../../../assets/eras/hundred-year-war.jpg';
import bannerImg from '../../../../assets/eras/kyoshi.jpg';

export const rogue: Playbook = {
  id: 'rogue',
  iconColor: '#a54e6e',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  name: 'The Rogue',
  tagline: 'Answers to no one, trusts no one, and is slowly learning that might have to change.',
  principles: ['Self-Reliance', 'Trust'],
  stats: { creativity: 1, focus: 0, harmony: -1, passion: 1 },
  moves: [
    { name: 'Solo Job', effect: 'When you handle something alone rather than ask for help, roll with Creativity.' },
    { name: 'Leap of Trust', effect: 'When you rely on the party instead of going it alone, roll with Harmony.' },
    { name: 'Slip the Net', effect: 'When you talk or sneak your way out of trouble, roll with Creativity.' },
    { name: 'No Strings', effect: 'Once per session, walk away from an obligation with no mechanical consequence.' },
    { name: 'Found Family', effect: 'Clear a condition the first time you let the party in on something personal.' },
  ],
  feature: { name: 'Always an Out', effect: 'You always know a way out of the room you’re in, however unlikely.' },
  growth: 'Did you choose to rely on someone else today?',
};
