import type { Playbook } from '../data';
// TODO: swap these for the Hammer's own real icon/background/banner art.
import iconImg from '../../../../assets/eras/roku.jpg';
import backgroundImg from '../../../../assets/eras/korra.jpg';
import bannerImg from '../../../../assets/eras/hundred-year-war.jpg';

export const hammer: Playbook = {
  id: 'hammer',
  iconColor: '#d9c98a',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  name: 'The Hammer',
  tagline: 'Believes every problem has a direct solution and volunteers to deliver it.',
  principles: ['Aggression', 'Diplomacy'],
  stats: { creativity: 0, focus: 0, harmony: -1, passion: 2 },
  moves: [
    { name: 'Overwhelming Force', effect: 'When you go all-out in a fight, roll with Passion for extra effect on a hit.' },
    { name: 'No Diplomacy Needed', effect: 'When you settle a dispute by force instead of words, roll with Focus.' },
    { name: 'Break Through', effect: 'When you smash through an obstacle rather than go around it, roll with Passion.' },
    { name: 'Cool Down', effect: 'Once per session, an ally can talk you down before you escalate further.' },
    { name: 'Point Taken', effect: 'Clear a condition when you accept that force wasn’t the answer this time.' },
  ],
  feature: { name: 'First to the Fight', effect: 'You act first when a fight breaks out, before initiative is otherwise decided.' },
  growth: 'Did you solve a problem with force today?',
};
