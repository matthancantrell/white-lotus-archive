import type { Playbook } from './playbook';
import iconImg from '../../../../assets/playbooks/successor.jpg';
import backgroundImg from '../../../../assets/playbooks/background/successor.jpg';
import bannerImg from '../../../../assets/playbooks/banner/successor.jpg';

export const successor: Playbook = {
  id: 'successor',
  iconColor: '#4c7ac9',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  // PLACEHOLDER keys — upload the matching objects to the MEDIA bucket under
  // `playbooks/` for these to resolve (see resolvePlaybookMedia in ../data).
  bannerImageKey: 'successor.jpg',
  secondaryImageKey: 'successor-secondary.jpg',
  name: 'The Successor',
  tagline: 'Next in line for a role or legacy, and unsure whether they want it.',
  // PLACEHOLDER — a longer passage describing The Successor, expanding on the tagline.
  description: ['PLACEHOLDER description for The Successor.', 'PLACEHOLDER second paragraph for The Successor.'],
  principles: ['Duty', 'Individuality'],
  // PLACEHOLDER — flavor text for what it means to live by Duty vs Individuality.
  principlesDescription: 'PLACEHOLDER principles description for The Successor.',
  stats: { creativity: 0, focus: 1, harmony: 1, passion: -1 },
  // PLACEHOLDER — suggested demeanors for The Successor.
  demeanorOptions: ['PLACEHOLDER demeanor', 'PLACEHOLDER demeanor', 'PLACEHOLDER demeanor'],
  moves: [
    { name: 'Inherited Skill', category: 'Playbook', subcategory: null, rollsWith: 'focus', details: 'When you draw on training passed down to you, roll with Focus.' },
    { name: 'My Own Path', category: 'Playbook', subcategory: null, rollsWith: 'creativity', details: 'When you break from tradition to do things your way, roll with Creativity.' },
    { name: 'Voice of the Legacy', category: 'Playbook', subcategory: null, rollsWith: 'harmony', details: 'When you invoke your predecessor’s name or reputation, roll with Harmony.' },
    { name: 'Question Everything', category: 'Playbook', subcategory: null, rollsWith: null, details: 'Once per session, gain insight by challenging an assumption everyone else takes for granted.' },
    { name: 'Steady the Line', category: 'Playbook', subcategory: null, rollsWith: null, details: 'Clear a condition when you honor the legacy in a way that still feels like you.' },
  ],
  // PLACEHOLDER — guidance on choosing moves for The Successor.
  movesAdvice: ['PLACEHOLDER moves advice for The Successor.', 'PLACEHOLDER second paragraph of moves advice for The Successor.'],
  feature: { name: 'The Weight of What’s Next', effect: ['Once per session, ask the GM what your predecessor would have done in this exact moment.'] },
  featureMoves: [],
  growth: 'Did the pull between legacy and your own path come up today?',
  // PLACEHOLDER — flavor text explaining what the growth question is getting at.
  growthDescription: 'PLACEHOLDER growth description for The Successor.',
  history: [
    'What legacy are you next in line for, and who held it before you?',
    'What part of that legacy do you want no part of?',
    'Who is waiting for you to take your place, and who hopes you never will?',
    'Which companion knows what you truly want?',
  ],
  // PLACEHOLDER — suggested connection prompts for The Successor. A run of 3+
  // underscores marks a fill-in-the-blank spot (see renderBlanks in
  // ../PlaybookInfoPanel).
  connectionPrompts: [
    '___ is the only one who knows what you truly want, apart from the legacy.',
    'You hope ___ never has to inherit a burden like yours.',
  ],
  startingTechnique: { name: 'Inherited Form', approach: 'defend', details: 'Fall back on drilled technique; you are Prepared and clear 1-fatigue.' },
  momentOfBalance: 'You honor your legacy in a way that is wholly your own. Tell the GM how you resolve a crisis in a way your predecessor never could have.',
};
