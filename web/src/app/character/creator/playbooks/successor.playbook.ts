import type { Playbook } from '../data';
// TODO: swap these for the Successor's own real icon/background/banner art.
import iconImg from '../../../../assets/eras/roku.jpg';
import backgroundImg from '../../../../assets/eras/korra.jpg';
import bannerImg from '../../../../assets/eras/hundred-year-war.jpg';

export const successor: Playbook = {
  id: 'successor',
  iconColor: '#4c7ac9',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  name: 'The Successor',
  tagline: 'Next in line for a role or legacy, and unsure whether they want it.',
  principles: ['Duty', 'Individuality'],
  stats: { creativity: 0, focus: 1, harmony: 1, passion: -1 },
  moves: [
    { name: 'Inherited Skill', effect: 'When you draw on training passed down to you, roll with Focus.' },
    { name: 'My Own Path', effect: 'When you break from tradition to do things your way, roll with Creativity.' },
    { name: 'Voice of the Legacy', effect: 'When you invoke your predecessor’s name or reputation, roll with Harmony.' },
    { name: 'Question Everything', effect: 'Once per session, gain insight by challenging an assumption everyone else takes for granted.' },
    { name: 'Steady the Line', effect: 'Clear a condition when you honor the legacy in a way that still feels like you.' },
  ],
  feature: { name: 'The Weight of What’s Next', effect: 'Once per session, ask the GM what your predecessor would have done in this exact moment.' },
  growth: 'Did the pull between legacy and your own path come up today?',
};
