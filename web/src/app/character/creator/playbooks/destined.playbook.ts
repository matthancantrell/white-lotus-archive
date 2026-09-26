import type { Playbook } from './playbook';
import iconImg from '../../../../assets/playbooks/destined.jpg';
import backgroundImg from '../../../../assets/playbooks/background/destined.jpg';
import bannerImg from '../../../../assets/playbooks/banner/destined.jpg';


export const destined: Playbook = {
  id: 'destined',
  iconColor: '#8a7c3a',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  // PLACEHOLDER keys — upload the matching objects to the MEDIA bucket under
  // `playbooks/` for these to resolve (see resolvePlaybookMedia in ../data).
  bannerImageKey: 'destined.jpg',
  secondaryImageKey: 'destined-secondary.jpg',
  name: 'The Destined',
  tagline: 'Touched by something spiritual and otherworldly they don’t fully understand yet.',
  // PLACEHOLDER — a longer passage describing The Destined, expanding on the tagline.
  description: ['PLACEHOLDER description for The Destined.', 'PLACEHOLDER second paragraph for The Destined.'],
  principles: ['Control', 'Connection'],
  // PLACEHOLDER — flavor text for what it means to live by Control vs Connection.
  principlesDescription: 'PLACEHOLDER principles description for The Destined.',
  stats: { creativity: 1, focus: 0, harmony: 0, passion: 0 },
  // PLACEHOLDER — suggested demeanors for The Destined.
  demeanorOptions: ['PLACEHOLDER demeanor', 'PLACEHOLDER demeanor', 'PLACEHOLDER demeanor'],
  moves: [
    { name: 'Reach Beyond', category: 'Playbook', subcategory: null, rollsWith: 'harmony', details: 'When you open yourself to your destiny sign’s influence, roll with Harmony.' },
    { name: 'Hold the Line', category: 'Playbook', subcategory: null, rollsWith: 'focus', details: 'When you suppress the pull of your destiny to stay in control, roll with Focus.' },
    { name: 'Uncanny Insight', category: 'Playbook', subcategory: null, rollsWith: null, details: 'Once per session, receive a cryptic but true hint from the GM about what’s coming.' },
    { name: 'Marked', category: 'Playbook', subcategory: null, rollsWith: 'passion', details: 'Your destiny sign is visible to those who know to look; roll with Passion to use it to unsettle someone.' },
    { name: 'Anchor', category: 'Playbook', subcategory: null, rollsWith: null, details: 'Clear a condition when a companion helps ground you against your destiny’s pull.' },
  ],
  // PLACEHOLDER — guidance on choosing moves for The Destined.
  movesAdvice: ['PLACEHOLDER moves advice for The Destined.', 'PLACEHOLDER second paragraph of moves advice for The Destined.'],
  feature: { name: 'Destiny Sign', effect: ['Choose one destiny sign at creation; it grants a special ability tied to your fate.'] },
  featureMoves: [],
  growth: 'Did your destiny pull you somewhere you didn’t choose to go?',
  // PLACEHOLDER — flavor text explaining what the growth question is getting at.
  growthDescription: 'PLACEHOLDER growth description for The Destined.',
  history: [
    'What is your destiny sign, and when did you first feel it?',
    'Who told you what your destiny means, and do you believe them?',
    'What have you already lost to your fate?',
    'Which companion grounds you, and which one is tangled in your destiny?',
  ],
  // PLACEHOLDER — suggested connection prompts for The Destined. A run of 3+
  // underscores marks a fill-in-the-blank spot (see renderBlanks in
  // ../PlaybookInfoPanel).
  connectionPrompts: [
    '___ grounds you whenever your destiny’s pull gets to be too much.',
    'You suspect ___ is somehow tangled up in your own fate.',
  ],
  startingTechnique: { name: 'Fated Step', approach: 'evade', details: 'Move as your destiny guides; you avoid a threat before it fully forms.' },
  momentOfBalance: 'Your destiny and your choice align for one moment. Tell the GM how you change the course of events in a way that echoes far beyond this scene.',
};
