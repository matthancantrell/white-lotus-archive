import type { Playbook } from '../data';
// TODO: swap these for the Pillar's own real icon/background/banner art.
import iconImg from '../../../../assets/eras/hundred-year-war.jpg';
import backgroundImg from '../../../../assets/eras/aang.jpg';
import bannerImg from '../../../../assets/eras/roku.jpg';

export const pillar: Playbook = {
  id: 'pillar',
  iconColor: '#c98a4c',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  name: 'The Pillar',
  tagline: 'Leads the group tactically, torn between commanding and supporting.',
  principles: ['Leadership', 'Support'],
  stats: { creativity: 0, focus: 2, harmony: 0, passion: -1 },
  moves: [
    { name: 'Tactical Read', effect: 'When you size up a situation before acting, roll with Focus.' },
    { name: 'Take Point', effect: 'When you take charge of a plan under pressure, roll with Focus.' },
    { name: 'Step Back', effect: 'When you let someone else lead instead of taking over, roll with Harmony.' },
    { name: 'Coordinated Strike', effect: 'Once per exchange, direct an ally’s action for a bonus if they follow it.' },
    { name: 'Weight of Command', effect: 'Clear a condition when a plan you called succeeds.' },
  ],
  feature: { name: 'Command Presence', effect: 'Allies who follow your called plan take +1 to the roll.' },
  growth: 'Did you have to choose between leading and supporting today?',
};
