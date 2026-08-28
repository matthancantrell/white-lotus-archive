import type { Playbook } from '../data';
// TODO: swap these for the Idealist's own real icon/background/banner art.
import iconImg from '../../../../assets/eras/kyoshi.jpg';
import backgroundImg from '../../../../assets/eras/roku.jpg';
import bannerImg from '../../../../assets/eras/custom.jpg';

export const idealist: Playbook = {
  id: 'idealist',
  iconColor: '#5c8a8a',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  name: 'The Idealist',
  tagline: 'Sees the good in everyone, sometimes to their own detriment.',
  principles: ['Hope', 'Pragmatism'],
  stats: { creativity: 0, focus: -1, harmony: 2, passion: 0 },
  moves: [
    { name: 'See the Good', effect: 'When you look for the best in someone others have written off, roll with Harmony.' },
    { name: 'Never Turn My Back', effect: 'When you give a second chance to someone who’s wronged you, roll with Harmony.' },
    { name: 'Rousing Belief', effect: 'When you convince someone that change is possible, roll with Passion.' },
    { name: 'Hard Truths', effect: 'Once per session, an ally can force you to face evidence your idealism is misplaced.' },
    { name: 'Faith Rewarded', effect: 'Clear a condition when your belief in someone pays off.' },
  ],
  feature: { name: 'Benefit of the Doubt', effect: 'The first time you extend trust to an antagonist each session, mark growth.' },
  growth: 'Did your faith in someone get tested today?',
};
