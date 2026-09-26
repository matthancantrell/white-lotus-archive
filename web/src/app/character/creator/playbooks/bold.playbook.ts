import type { Playbook } from './playbook';
import iconImg from '../../../../assets/playbooks/bold.jpg';
import backgroundImg from '../../../../assets/playbooks/background/bold.jpg';
import bannerImg from '../../../../assets/playbooks/banner/bold.jpg';

export const bold: Playbook = {
  id: 'bold',
  iconColor: '#4a7c3a',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  // PLACEHOLDER keys — upload the matching objects to the MEDIA bucket under
  // `playbooks/` for these to resolve (see resolvePlaybookMedia in ../data).
  bannerImageKey: 'bold.jpg',
  secondaryImageKey: 'bold-secondary.jpg',
  name: 'The Bold',
  tagline: 'Charges in first, talks a big game, and backs it up more often than not.',
  // PLACEHOLDER — a longer passage describing The Bold, expanding on the tagline.
  description: ['PLACEHOLDER description for The Bold.', 'PLACEHOLDER second paragraph for The Bold.'],
  principles: ['Confidence', 'Loyalty'],
  // PLACEHOLDER — flavor text for what it means to live by Confidence vs Loyalty.
  principlesDescription: 'PLACEHOLDER principles description for The Bold.',
  stats: { creativity: 1, focus: -1, harmony: 0, passion: 1 },
  // PLACEHOLDER — suggested demeanors for The Bold.
  demeanorOptions: ['PLACEHOLDER demeanor', 'PLACEHOLDER demeanor', 'PLACEHOLDER demeanor'],
  moves: [
    { name: 'Big Talk', category: 'Playbook', subcategory: null, rollsWith: 'passion', details: 'When you boast about what you’re about to do, roll with Passion; a hit means the room believes you.' },
    { name: 'Reckless Charge', category: 'Playbook', subcategory: null, rollsWith: 'creativity', details: 'When you throw yourself into danger to protect someone, roll with Creativity.' },
    { name: 'Crack the Plan', category: 'Playbook', subcategory: null, rollsWith: 'creativity', details: 'When you improvise past a failed plan, roll with Creativity to find the opening.' },
    { name: 'Rally', category: 'Playbook', subcategory: null, rollsWith: null, details: 'Once per session, give an ally advantage on their next roll by talking up their odds.' },
    { name: 'Never Back Down', category: 'Playbook', subcategory: null, rollsWith: null, details: 'Clear a condition whenever you refuse to retreat from a fight you started.' },
  ],
  // PLACEHOLDER — guidance on choosing moves for The Bold.
  movesAdvice: ['PLACEHOLDER moves advice for The Bold.', 'PLACEHOLDER second paragraph of moves advice for The Bold.'],
  feature: { name: 'All In', effect: ['When the odds are worst, take +1 to your next roll for committing fully to the moment.'] },
  featureMoves: [],
  growth: 'Did your confidence talk the group into a plan today?',
  // PLACEHOLDER — flavor text explaining what the growth question is getting at.
  growthDescription: 'PLACEHOLDER growth description for The Bold.',
  history: [
    'What feat are you most proud of, and who doubted you could do it?',
    'Who do you owe your loyalty to, and why?',
    'What is the one thing you are secretly afraid of?',
    'Which companion have you promised to have their back, no matter what?',
  ],
  // PLACEHOLDER — suggested connection prompts for The Bold. A run of 3+
  // underscores marks a fill-in-the-blank spot (see renderBlanks in
  // ../PlaybookInfoPanel).
  connectionPrompts: [
    '___ doubted you once, and you still haven’t let them forget you proved them wrong.',
    'You promised ___ you’d always have their back, no matter what.',
  ],
  startingTechnique: { name: 'Showboating Strike', approach: 'attack', details: 'Land a flashy blow; a foe marks 1-fatigue and everyone watching believes your next boast.' },
  momentOfBalance: 'You find a way to stand with your companions like no one else could. Tell the GM how you strike down an impossibly strong enemy or obstacle to protect your friends as the best version of yourself.',
};
