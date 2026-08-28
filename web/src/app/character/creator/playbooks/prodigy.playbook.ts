import type { Playbook } from '../data';
// TODO: swap these for the Prodigy's own real icon/background/banner art.
import iconImg from '../../../../assets/eras/korra.jpg';
import backgroundImg from '../../../../assets/eras/kyoshi.jpg';
import bannerImg from '../../../../assets/eras/aang.jpg';

export const prodigy: Playbook = {
  id: 'prodigy',
  iconColor: '#6f8a5c',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  name: 'The Prodigy',
  tagline: 'Naturally gifted and constantly compared to someone they can’t live up to.',
  principles: ['Ambition', 'Contentment'],
  stats: { creativity: 1, focus: 1, harmony: 0, passion: -1 },
  moves: [
    { name: 'Natural Talent', effect: 'When you attempt something you’ve never trained for, roll with Creativity.' },
    { name: 'Chasing the Standard', effect: 'When you push yourself past your limits to match a rival or mentor, roll with Focus.' },
    { name: 'Effortless', effect: 'Once per session, succeed automatically at a feat within your training, no roll needed.' },
    { name: 'Cracks Show', effect: 'When the pressure to be the best overwhelms you, mark a condition to gain +1 forward.' },
    { name: 'Quiet Confidence', effect: 'Clear a condition when you succeed without needing anyone to notice.' },
  ],
  feature: { name: 'Prodigious', effect: 'Choose one extra technique at character creation beyond the usual number.' },
  growth: 'Did living up to expectations weigh on you today?',
};
