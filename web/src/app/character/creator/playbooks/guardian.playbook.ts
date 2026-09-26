import type { Playbook } from './playbook';
import iconImg from '../../../../assets/playbooks/guardian.jpg';
import backgroundImg from '../../../../assets/playbooks/background/guardian.jpg';
import bannerImg from '../../../../assets/playbooks/banner/guardian.jpg';

export const guardian: Playbook = {
  id: 'guardian',
  iconColor: '#b3492e',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  // PLACEHOLDER keys — upload the matching objects to the MEDIA bucket under
  // `playbooks/` for these to resolve (see resolvePlaybookMedia in ../data).
  bannerImageKey: 'guardian.jpg',
  secondaryImageKey: 'guardian-secondary.jpg',
  name: 'The Guardian',
  tagline: 'Sworn to protect someone specific, sometimes at the cost of their own goals.',
  // PLACEHOLDER — a longer passage describing The Guardian, expanding on the tagline.
  description: ['PLACEHOLDER description for The Guardian.', 'PLACEHOLDER second paragraph for The Guardian.'],
  principles: ['Duty', 'Freedom'],
  // PLACEHOLDER — flavor text for what it means to live by Duty vs Freedom.
  principlesDescription: 'PLACEHOLDER principles description for The Guardian.',
  stats: { creativity: -1, focus: 1, harmony: 1, passion: 0 },
  // PLACEHOLDER — suggested demeanors for The Guardian.
  demeanorOptions: ['PLACEHOLDER demeanor', 'PLACEHOLDER demeanor', 'PLACEHOLDER demeanor'],
  moves: [
    { name: 'Shield', category: 'Playbook', subcategory: null, rollsWith: 'focus', details: 'When you place yourself between your charge and harm, roll with Focus.' },
    { name: 'Ever Vigilant', category: 'Playbook', subcategory: null, rollsWith: null, details: 'You always notice a threat to your charge before anyone else at the table does.' },
    { name: 'Steady Hand', category: 'Playbook', subcategory: null, rollsWith: 'harmony', details: 'When you calm your charge in a tense moment, roll with Harmony.' },
    { name: 'Draw Their Eye', category: 'Playbook', subcategory: null, rollsWith: null, details: 'Once per exchange, redirect an attacker’s focus onto yourself.' },
    { name: 'Off Duty', category: 'Playbook', subcategory: null, rollsWith: null, details: 'Clear a condition when you take real time for yourself, away from your charge.' },
  ],
  // PLACEHOLDER — guidance on choosing moves for The Guardian.
  movesAdvice: ['PLACEHOLDER moves advice for The Guardian.', 'PLACEHOLDER second paragraph of moves advice for The Guardian.'],
  feature: { name: 'Sworn Oath', effect: ['Name who you’ve sworn to protect; your balance shifts whenever that bond is tested.'] },
  featureMoves: [],
  growth: 'Did protecting your charge cost you something you wanted?',
  // PLACEHOLDER — flavor text explaining what the growth question is getting at.
  growthDescription: 'PLACEHOLDER growth description for The Guardian.',
  history: [
    'Who is your ward, and why do they need protecting?',
    'What did you give up to take on this duty?',
    'Who trained you, and what do they think of your ward?',
    'Which companion do you trust to help you, and which one worries you?',
  ],
  // PLACEHOLDER — suggested connection prompts for The Guardian. A run of 3+
  // underscores marks a fill-in-the-blank spot (see renderBlanks in
  // ../PlaybookInfoPanel).
  connectionPrompts: [
    '___ worries you more than any threat to your ward ever could.',
    'You trust ___ to watch your back while you watch your charge’s.',
  ],
  startingTechnique: { name: 'Interpose', approach: 'defend', details: 'Step between your ward and harm; take the hit’s fatigue in their place and become Prepared.' },
  momentOfBalance: 'Nothing gets through you. Tell the GM how you protect your ward and your companions from a threat that should have overwhelmed them all.',
};
