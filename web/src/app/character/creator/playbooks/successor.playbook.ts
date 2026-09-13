import type { Playbook } from '../data';
import iconImg from '../../../../assets/playbooks/successor.jpg';
import backgroundImg from '../../../../assets/playbooks/background/successor.jpg';
import bannerImg from '../../../../assets/playbooks/banner/successor.jpg';

export const successor: Playbook = {
  id: 'successor',
  iconColor: '#4c7ac9',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  name: 'The Successor',
  tagline: 'Next in line for a role or legacy, and unsure whether they want it.',
  // PLACEHOLDER — a longer passage describing The Successor, expanding on the tagline.
  description: 'PLACEHOLDER description for The Successor.',
  principles: ['Duty', 'Individuality'],
  stats: { creativity: 0, focus: 1, harmony: 1, passion: -1 },
  // PLACEHOLDER — suggested demeanors for The Successor.
  demeanorOptions: ['PLACEHOLDER demeanor', 'PLACEHOLDER demeanor', 'PLACEHOLDER demeanor'],
  moves: [
    { name: 'Inherited Skill', effect: 'When you draw on training passed down to you, roll with Focus.' },
    { name: 'My Own Path', effect: 'When you break from tradition to do things your way, roll with Creativity.' },
    { name: 'Voice of the Legacy', effect: 'When you invoke your predecessor’s name or reputation, roll with Harmony.' },
    { name: 'Question Everything', effect: 'Once per session, gain insight by challenging an assumption everyone else takes for granted.' },
    { name: 'Steady the Line', effect: 'Clear a condition when you honor the legacy in a way that still feels like you.' },
  ],
  // PLACEHOLDER — guidance on choosing moves for The Successor.
  movesAdvice: 'PLACEHOLDER moves advice for The Successor.',
  feature: { name: 'The Weight of What’s Next', effect: 'Once per session, ask the GM what your predecessor would have done in this exact moment.' },
  growth: 'Did the pull between legacy and your own path come up today?',
  history: [
    'What legacy are you next in line for, and who held it before you?',
    'What part of that legacy do you want no part of?',
    'Who is waiting for you to take your place, and who hopes you never will?',
    'Which companion knows what you truly want?',
  ],
  // PLACEHOLDER — suggested connection prompts for The Successor.
  connectionPrompts: ['PLACEHOLDER connection prompt for The Successor.', 'PLACEHOLDER connection prompt for The Successor.'],
  startingTechnique: { name: 'Inherited Form', approach: 'defend', effect: 'Fall back on drilled technique; you are Prepared and clear 1-fatigue.' },
  momentOfBalance: 'You honor your legacy in a way that is wholly your own. Tell the GM how you resolve a crisis in a way your predecessor never could have.',
};
