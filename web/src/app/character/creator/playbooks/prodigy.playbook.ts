import type { Playbook } from './playbook';
import iconImg from '../../../../assets/playbooks/prodigy.jpg';
import backgroundImg from '../../../../assets/playbooks/background/prodigy.jpg';
import bannerImg from '../../../../assets/playbooks/banner/prodigy.jpg';

export const prodigy: Playbook = {
  id: 'prodigy',
  iconColor: '#6f8a5c',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  // PLACEHOLDER keys — upload the matching objects to the MEDIA bucket under
  // `playbooks/` for these to resolve (see resolvePlaybookMedia in ../data).
  bannerImageKey: 'prodigy.jpg',
  secondaryImageKey: 'prodigy-secondary.jpg',
  name: 'The Prodigy',
  tagline: 'Naturally gifted and constantly compared to someone they can’t live up to.',
  // PLACEHOLDER — a longer passage describing The Prodigy, expanding on the tagline.
  description: ['PLACEHOLDER description for The Prodigy.', 'PLACEHOLDER second paragraph for The Prodigy.'],
  // Verified against Demiplane Nexus's Playbooks index (Core Book) — page
  // itself is gated on this account, so only principles are corrected here.
  principles: ['Excellence', 'Community'],
  // PLACEHOLDER — flavor text for what it means to live by Excellence vs Community.
  principlesDescription: ['PLACEHOLDER principles description for The Prodigy.'],
  stats: { creativity: 1, focus: 1, harmony: 0, passion: -1 },
  // PLACEHOLDER — suggested demeanors for The Prodigy.
  demeanorOptions: ['PLACEHOLDER demeanor', 'PLACEHOLDER demeanor', 'PLACEHOLDER demeanor'],
  moves: [
    { name: 'An Open Mind', category: 'Playbook', subcategory: 'The Prodigy', rollsWith: null, details: 'You can learn techniques from other skills and trainings, as long as you have a teacher.' },
    { name: 'Challenge', category: 'Playbook', subcategory: 'The Prodigy', rollsWith: 'passion', details: 'When you throw a boastful challenge at an opponent before a fight, roll with Passion.' },
    { name: 'Judging a Rival', category: 'Playbook', subcategory: 'The Prodigy', rollsWith: 'focus', details: 'When you size someone up, roll with Focus.' },
    { name: 'Surprising Entrance', category: 'Playbook', subcategory: 'The Prodigy', rollsWith: 'focus', details: 'When you trick someone by using your skills to disappear and reappear somewhere else within the same scene, roll with Focus instead of Creativity.' },
    { name: 'Wait and Listen', category: 'Playbook', subcategory: 'The Prodigy', rollsWith: 'focus', details: 'When you assess a situation while taking the time to use your extraordinary skills to absorb hidden or deep information, mark 1-fatigue, roll with Focus instead of Creativity, and become Prepared.' },
  ],
  // PLACEHOLDER — guidance on choosing moves for The Prodigy.
  movesAdvice: ['PLACEHOLDER moves advice for The Prodigy.', 'PLACEHOLDER second paragraph of moves advice for The Prodigy.'],
  feature: { name: 'Prodigious', effect: [{ text: 'Choose one extra technique at character creation beyond the usual number.' }] },
  featureMoves: [],
  featureChoices: [],
  growth: 'Did living up to expectations weigh on you today?',
  // PLACEHOLDER — flavor text explaining what the growth question is getting at.
  growthDescription: 'PLACEHOLDER growth description for The Prodigy.',
  history: [
    'Who are you constantly compared to, and how do you fall short?',
    'What comes effortlessly to you that others struggle with?',
    'What did your training cost you as a child?',
    'Which companion do you secretly envy, and which one looks up to you?',
  ],
  // PLACEHOLDER — suggested connection prompts for The Prodigy. A run of 3+
  // underscores marks a fill-in-the-blank spot (see renderBlanks in
  // ../PlaybookInfoPanel).
  connectionPrompts: [
    '___ looks up to you in a way that makes your doubts feel heavier.',
    'You secretly envy how easily ___ seems to accept themselves.',
  ],
  startingTechnique: { name: 'Effortless Form', approach: 'evade', details: 'Execute a technique you have only seen once, at Practiced level, this exchange.' },
  momentOfBalance: 'You finally stop performing and simply act. Tell the GM how you accomplish a feat of skill that no one — including you — thought possible.',
};
