import type { Playbook } from '../data';
// TODO: swap these for the Destined's own real icon/background/banner art.
import iconImg from '../../../../assets/eras/aang.jpg';
import backgroundImg from '../../../../assets/eras/custom.jpg';
import bannerImg from '../../../../assets/eras/korra.jpg';

export const destined: Playbook = {
  id: 'destined',
  iconColor: '#8a7c3a',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  name: 'The Destined',
  tagline: 'Touched by something spiritual and otherworldly they don’t fully understand yet.',
  principles: ['Control', 'Connection'],
  stats: { creativity: 1, focus: 0, harmony: 0, passion: 0 },
  moves: [
    { name: 'Reach Beyond', effect: 'When you open yourself to your destiny sign’s influence, roll with Harmony.' },
    { name: 'Hold the Line', effect: 'When you suppress the pull of your destiny to stay in control, roll with Focus.' },
    { name: 'Uncanny Insight', effect: 'Once per session, receive a cryptic but true hint from the GM about what’s coming.' },
    { name: 'Marked', effect: 'Your destiny sign is visible to those who know to look; roll with Passion to use it to unsettle someone.' },
    { name: 'Anchor', effect: 'Clear a condition when a companion helps ground you against your destiny’s pull.' },
  ],
  feature: { name: 'Destiny Sign', effect: 'Choose one destiny sign at creation; it grants a special ability tied to your fate.' },
  growth: 'Did your destiny pull you somewhere you didn’t choose to go?',
};
