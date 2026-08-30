import type { Playbook } from '../data';
import iconImg from '../../../../assets/playbooks/elder.jpg';
import backgroundImg from '../../../../assets/playbooks/background/elder.jpg';
import bannerImg from '../../../../assets/playbooks/banner/elder.jpg';


export const elder: Playbook = {
  id: 'elder',
  iconColor: '#3a9e8f',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  name: 'The Elder',
  tagline: 'Lived longer than the others, mastered their training many times over.',
  principles: ['Determination', 'Patience'],
  stats: { creativity: 0, focus: 1, harmony: 1, passion: -1 },
  moves: [
    { name: 'Decades of Practice', effect: 'When you draw on a lifetime of experience, roll with Focus.' },
    { name: 'Patient Teacher', effect: 'When you guide a companion through a technique, roll with Harmony; on a hit they gain a temporary bonus.' },
    { name: 'Seen It Before', effect: 'Once per session, recognize a tactic or trap because you’ve encountered it before.' },
    { name: 'One More Fight', effect: 'When your body pushes past what it should be capable of, roll with Focus.' },
    { name: 'Let It Go', effect: 'Clear a condition when you choose patience over pushing an old grudge.' },
  ],
  feature: { name: 'Mastered Techniques', effect: 'Start with four mastered techniques instead of one, chosen freely from your training.' },
  growth: 'Did your age and experience change how you handled something today?',
};
