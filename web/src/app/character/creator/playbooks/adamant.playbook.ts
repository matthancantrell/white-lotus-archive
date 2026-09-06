import type { Playbook } from '../data';
// TODO: swap these for the Adamant's own real icon/background/banner art.
import iconImg from '../../../../assets/playbooks/adamant.jpg';
import backgroundImg from '../../../../assets/playbooks/background/adamant.jpg';
import bannerImg from '../../../../assets/playbooks/banner/adamant.jpg';

export const adamant: Playbook = {
  id: 'adamant',
  iconColor: '#3a6ea5',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  name: 'The Adamant',
  tagline: 'Fixes what’s broken by any means necessary, even at cost to themselves and others.',
  principles: ['Restraint', 'Results'],
  stats: { creativity: 0, focus: 1, harmony: -1, passion: 1 },
  moves: [
    { name: 'No Half Measures', effect: 'When you push a plan through over others’ objections, roll with Focus; on a hit it works, but mark a condition on a 7-9.' },
    { name: 'Cutting Remark', effect: 'When you tell someone an uncomfortable truth to spur them into action, roll with Passion.' },
    { name: 'Contingency', effect: 'You always have a backup plan ready; once per session, retroactively declare you set one up.' },
    { name: 'Iron Will', effect: 'Clear a condition whenever you double down on a decision instead of reconsidering it.' },
    { name: 'Lodestar', effect: 'Name another PC as your Lodestar; they can shift your balance without you contesting it.' },
  ],
  feature: { name: 'By Any Means', effect: 'Once per session, ignore the consequences of a harsh method to get a result — the fiction remembers it, though.' },
  growth: 'Did you get results at someone else’s expense today?',
  history: [
    'What is broken in the world that you are determined to fix?',
    'Who taught you that results matter more than methods?',
    'What did fixing something once cost you?',
    'Which companion do you suspect is too soft to do what’s necessary?',
  ],
  startingTechnique: { name: 'Pinpoint Aim', approach: 'attack', effect: 'Wait for the perfect moment; mark 1-fatigue to become Prepared and use an attack technique.' },
  momentOfBalance: 'You see the whole board and the one move that fixes it. Tell the GM how you resolve the crisis in front of you with a single, decisive act — and what it costs you.',
};
