import type { Playbook } from './playbook';
import iconImg from '../../../../assets/playbooks/adamant.jpg';
import backgroundImg from '../../../../assets/playbooks/background/adamant.jpg';
import bannerImg from '../../../../assets/playbooks/banner/adamant.jpg';

export const adamant: Playbook = {
  id: 'adamant',
  iconColor: '#3a6ea5',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  // PLACEHOLDER keys — upload the matching objects to the MEDIA bucket under
  // `playbooks/` for these to resolve (see resolvePlaybookMedia in ../data).
  bannerImageKey: 'adamant.jpg',
  secondaryImageKey: 'adamant-secondary.jpg',
  name: 'The Adamant',
  tagline: 'Fixes what’s broken by any means necessary, even at cost to themselves and others.',
  // PLACEHOLDER — a longer passage describing The Adamant, expanding on the tagline.
  description: ['PLACEHOLDER description for The Adamant.', 'PLACEHOLDER second paragraph for The Adamant.'],
  principles: ['Restraint', 'Results'],
  // PLACEHOLDER — flavor text for what it means to live by Restraint vs Results.
  principlesDescription: 'PLACEHOLDER principles description for The Adamant.',
  stats: { creativity: 0, focus: 1, harmony: -1, passion: 1 },
  // PLACEHOLDER — suggested demeanors for The Adamant.
  demeanorOptions: ['PLACEHOLDER demeanor', 'PLACEHOLDER demeanor', 'PLACEHOLDER demeanor'],
  moves: [
    { name: 'No Half Measures', category: 'Playbook', subcategory: null, rollsWith: 'focus', details: 'When you push a plan through over others’ objections, roll with Focus; on a hit it works, but mark a condition on a 7-9.' },
    { name: 'Cutting Remark', category: 'Playbook', subcategory: null, rollsWith: 'passion', details: 'When you tell someone an uncomfortable truth to spur them into action, roll with Passion.' },
    { name: 'Contingency', category: 'Playbook', subcategory: null, rollsWith: null, details: 'You always have a backup plan ready; once per session, retroactively declare you set one up.' },
    { name: 'Iron Will', category: 'Playbook', subcategory: null, rollsWith: null, details: 'Clear a condition whenever you double down on a decision instead of reconsidering it.' },
    { name: 'Lodestar', category: 'Playbook', subcategory: null, rollsWith: null, details: 'Name another PC as your Lodestar; they can shift your balance without you contesting it.' },
  ],
  // PLACEHOLDER — guidance on choosing moves for The Adamant.
  movesAdvice: ['PLACEHOLDER moves advice for The Adamant.', 'PLACEHOLDER second paragraph of moves advice for The Adamant.'],
  feature: { name: 'By Any Means', effect: ['Once per session, ignore the consequences of a harsh method to get a result — the fiction remembers it, though.'] },
  featureMoves: [],
  growth: 'Did you get results at someone else’s expense today?',
  // PLACEHOLDER — flavor text explaining what the growth question is getting at.
  growthDescription: 'PLACEHOLDER growth description for The Adamant.',
  history: [
    'What is broken in the world that you are determined to fix?',
    'Who taught you that results matter more than methods?',
    'What did fixing something once cost you?',
    'Which companion do you suspect is too soft to do what’s necessary?',
  ],
  // PLACEHOLDER — suggested connection prompts for The Adamant. A run of 3+
  // underscores marks a fill-in-the-blank spot (see renderBlanks in
  // ../PlaybookInfoPanel).
  connectionPrompts: [
    '___ is the companion whose methods you privately think are too soft.',
    'You once fixed a problem for ___ in a way they still haven’t forgiven you for.',
  ],
  startingTechnique: { name: 'Pinpoint Aim', approach: 'attack', details: 'Wait for the perfect moment; mark 1-fatigue to become Prepared and use an attack technique.' },
  momentOfBalance: 'You see the whole board and the one move that fixes it. Tell the GM how you resolve the crisis in front of you with a single, decisive act — and what it costs you.',
};
