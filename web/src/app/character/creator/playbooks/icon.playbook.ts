import type { Playbook } from '../data';
// TODO: swap these for the Icon's own real icon/background/banner art.
import iconImg from '../../../../assets/eras/aang.jpg';
import backgroundImg from '../../../../assets/eras/custom.jpg';
import bannerImg from '../../../../assets/eras/korra.jpg';

export const icon: Playbook = {
  id: 'icon',
  iconColor: '#8a5ca8',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  name: 'The Icon',
  tagline: 'Carries a title or legacy they never asked for, and longs to just be themselves.',
  principles: ['Duty', 'Freedom'],
  stats: { creativity: 1, focus: 0, harmony: 0, passion: -1 },
  moves: [
    { name: 'The Weight of the Role', effect: 'When you invoke your title to open doors, roll with Harmony.' },
    { name: 'Slip Away', effect: 'When you shed your public persona to move unseen, roll with Creativity.' },
    { name: 'Rally the Room', effect: 'When you inspire a crowd with who you represent, roll with Passion.' },
    { name: 'Just for a Moment', effect: 'Once per session, clear a condition by doing something purely for yourself.' },
    { name: 'Inherited Trust', effect: 'People you’ve never met extend you goodwill on your family or office’s reputation.' },
  ],
  feature: { name: 'Small Freedoms', effect: 'You mark growth whenever you find joy in an ordinary, unburdened moment — no growth question needed.' },
  growth: 'Did your role and your own wishes pull you in different directions today?',
};
