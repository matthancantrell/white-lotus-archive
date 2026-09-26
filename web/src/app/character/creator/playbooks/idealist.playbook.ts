import type { Playbook } from './playbook';
import iconImg from '../../../../assets/playbooks/idealist.jpg';
import backgroundImg from '../../../../assets/playbooks/background/idealist.jpg';
import bannerImg from '../../../../assets/playbooks/banner/idealist.jpg';

export const idealist: Playbook = {
  id: 'idealist',
  iconColor: '#5c8a8a',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  // PLACEHOLDER keys — upload the matching objects to the MEDIA bucket under
  // `playbooks/` for these to resolve (see resolvePlaybookMedia in ../data).
  bannerImageKey: 'idealist.jpg',
  secondaryImageKey: 'idealist-secondary.jpg',
  name: 'The Idealist',
  tagline: 'Sees the good in everyone, sometimes to their own detriment.',
  // PLACEHOLDER — a longer passage describing The Idealist, expanding on the tagline.
  description: ['PLACEHOLDER description for The Idealist.', 'PLACEHOLDER second paragraph for The Idealist.'],
  principles: ['Hope', 'Pragmatism'],
  // PLACEHOLDER — flavor text for what it means to live by Hope vs Pragmatism.
  principlesDescription: 'PLACEHOLDER principles description for The Idealist.',
  stats: { creativity: 0, focus: -1, harmony: 2, passion: 0 },
  // PLACEHOLDER — suggested demeanors for The Idealist.
  demeanorOptions: ['PLACEHOLDER demeanor', 'PLACEHOLDER demeanor', 'PLACEHOLDER demeanor'],
  moves: [
    { name: 'See the Good', category: 'Playbook', subcategory: null, rollsWith: 'harmony', details: 'When you look for the best in someone others have written off, roll with Harmony.' },
    { name: 'Never Turn My Back', category: 'Playbook', subcategory: null, rollsWith: 'harmony', details: 'When you give a second chance to someone who’s wronged you, roll with Harmony.' },
    { name: 'Rousing Belief', category: 'Playbook', subcategory: null, rollsWith: 'passion', details: 'When you convince someone that change is possible, roll with Passion.' },
    { name: 'Hard Truths', category: 'Playbook', subcategory: null, rollsWith: null, details: 'Once per session, an ally can force you to face evidence your idealism is misplaced.' },
    { name: 'Faith Rewarded', category: 'Playbook', subcategory: null, rollsWith: null, details: 'Clear a condition when your belief in someone pays off.' },
  ],
  // PLACEHOLDER — guidance on choosing moves for The Idealist.
  movesAdvice: ['PLACEHOLDER moves advice for The Idealist.', 'PLACEHOLDER second paragraph of moves advice for The Idealist.'],
  feature: { name: 'Benefit of the Doubt', effect: ['The first time you extend trust to an antagonist each session, mark growth.'] },
  featureMoves: [],
  growth: 'Did your faith in someone get tested today?',
  // PLACEHOLDER — flavor text explaining what the growth question is getting at.
  growthDescription: 'PLACEHOLDER growth description for The Idealist.',
  history: [
    'What do you believe the world could become?',
    'Who shattered your faith once, and how did you rebuild it?',
    'Who did you refuse to give up on, and were you right?',
    'Which companion do you think has more good in them than they admit?',
  ],
  // PLACEHOLDER — suggested connection prompts for The Idealist. A run of 3+
  // underscores marks a fill-in-the-blank spot (see renderBlanks in
  // ../PlaybookInfoPanel).
  connectionPrompts: [
    '___ has more good in them than they’d ever admit, and you plan to prove it.',
    'You refused to give up on ___ long after everyone else had.',
  ],
  startingTechnique: { name: 'Open Hand', approach: 'defend', details: 'Refuse to strike back; a foe who attacks you marks a condition instead.' },
  momentOfBalance: 'You reach someone no one else could. Tell the GM how you turn an enemy aside from their path through sheer faith in who they could be.',
};
