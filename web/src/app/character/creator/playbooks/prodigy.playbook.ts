import type { Playbook } from '../data';
import iconImg from '../../../../assets/playbooks/prodigy.jpg';
import backgroundImg from '../../../../assets/playbooks/background/prodigy.jpg';
import bannerImg from '../../../../assets/playbooks/banner/prodigy.jpg';

export const prodigy: Playbook = {
  id: 'prodigy',
  iconColor: '#6f8a5c',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  name: 'The Prodigy',
  tagline: 'Naturally gifted and constantly compared to someone they can’t live up to.',
  // PLACEHOLDER — a longer passage describing The Prodigy, expanding on the tagline.
  description: 'PLACEHOLDER description for The Prodigy.',
  principles: ['Ambition', 'Contentment'],
  stats: { creativity: 1, focus: 1, harmony: 0, passion: -1 },
  // PLACEHOLDER — suggested demeanors for The Prodigy.
  demeanorOptions: ['PLACEHOLDER demeanor', 'PLACEHOLDER demeanor', 'PLACEHOLDER demeanor'],
  moves: [
    { name: 'Natural Talent', effect: 'When you attempt something you’ve never trained for, roll with Creativity.' },
    { name: 'Chasing the Standard', effect: 'When you push yourself past your limits to match a rival or mentor, roll with Focus.' },
    { name: 'Effortless', effect: 'Once per session, succeed automatically at a feat within your training, no roll needed.' },
    { name: 'Cracks Show', effect: 'When the pressure to be the best overwhelms you, mark a condition to gain +1 forward.' },
    { name: 'Quiet Confidence', effect: 'Clear a condition when you succeed without needing anyone to notice.' },
  ],
  // PLACEHOLDER — guidance on choosing moves for The Prodigy.
  movesAdvice: 'PLACEHOLDER moves advice for The Prodigy.',
  feature: { name: 'Prodigious', effect: 'Choose one extra technique at character creation beyond the usual number.' },
  growth: 'Did living up to expectations weigh on you today?',
  history: [
    'Who are you constantly compared to, and how do you fall short?',
    'What comes effortlessly to you that others struggle with?',
    'What did your training cost you as a child?',
    'Which companion do you secretly envy, and which one looks up to you?',
  ],
  // PLACEHOLDER — suggested connection prompts for The Prodigy.
  connectionPrompts: ['PLACEHOLDER connection prompt for The Prodigy.', 'PLACEHOLDER connection prompt for The Prodigy.'],
  startingTechnique: { name: 'Effortless Form', approach: 'evade', effect: 'Execute a technique you have only seen once, at Practiced level, this exchange.' },
  momentOfBalance: 'You finally stop performing and simply act. Tell the GM how you accomplish a feat of skill that no one — including you — thought possible.',
};
