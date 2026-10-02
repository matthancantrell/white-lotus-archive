import type { Playbook } from './playbook';
import iconImg from '../../../../assets/playbooks/rogue.jpg';
import backgroundImg from '../../../../assets/playbooks/background/rogue.jpg';
import bannerImg from '../../../../assets/playbooks/banner/rogue.jpg';

export const rogue: Playbook = {
  id: 'rogue',
  iconColor: '#a54e6e',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  // PLACEHOLDER keys — upload the matching objects to the MEDIA bucket under
  // `playbooks/` for these to resolve (see resolvePlaybookMedia in ../data).
  bannerImageKey: 'rogue.jpg',
  secondaryImageKey: 'rogue-secondary.jpg',
  name: 'The Rogue',
  tagline: 'Answers to no one, trusts no one, and is slowly learning that might have to change.',
  // PLACEHOLDER — a longer passage describing The Rogue, expanding on the tagline.
  description: ['PLACEHOLDER description for The Rogue.', 'PLACEHOLDER second paragraph for The Rogue.'],
  // Verified against Demiplane Nexus's Playbooks index (Core Book) — page
  // itself is gated on this account, so only principles are corrected here.
  // (The old 'Self-Reliance'/'Trust' pair here was actually The Guardian's —
  // apparent mixup in the original placeholder data.)
  principles: ['Friendship', 'Survival'],
  // PLACEHOLDER — flavor text for what it means to live by Friendship vs Survival.
  principlesDescription: ['PLACEHOLDER principles description for The Rogue.'],
  stats: { creativity: 1, focus: 0, harmony: -1, passion: 1 },
  // PLACEHOLDER — suggested demeanors for The Rogue.
  demeanorOptions: ['PLACEHOLDER demeanor', 'PLACEHOLDER demeanor', 'PLACEHOLDER demeanor'],
  moves: [
    { name: 'Casing the Joint', category: 'Playbook', subcategory: 'The Rogue', rollsWith: null, details: 'When you assess a situation, add these questions to the list.' },
    { name: 'Is That the Best You Got?', category: 'Playbook', subcategory: 'The Rogue', rollsWith: 'passion', details: 'When you goad or provoke an NPC into foolhardy action, say what you want them to do and roll with Passion.' },
    { name: 'Roguish Charm', category: 'Playbook', subcategory: 'The Rogue', rollsWith: 'creativity', details: 'When you plead with an NPC or guide and comfort someone by flattering them and empathizing with them, mark 1-fatigue to roll with Creativity instead of Harmony.' },
    { name: 'Slippery Eel-Hound', category: 'Playbook', subcategory: 'The Rogue', rollsWith: null, details: 'When you defend and maneuver and choose to use Seize a Position to escape the scene, foes must mark an additional 2-fatigue to stop you, and you may bring any allies within reach when you retreat.' },
    { name: 'You’re Not My Master!', category: 'Playbook', subcategory: 'The Rogue', rollsWith: null, details: 'When you resist an NPC shifting your balance, roll +2 instead of +0.' },
  ],
  // PLACEHOLDER — guidance on choosing moves for The Rogue.
  movesAdvice: ['PLACEHOLDER moves advice for The Rogue.', 'PLACEHOLDER second paragraph of moves advice for The Rogue.'],
  // Feature name/moves inferred (not directly page-confirmed — The Rogue's
  // full page is gated on this account): the two "Playbook Feature" moves
  // tagged subcategory "Bad Habits" in the Core Book move list roll with
  // "Survival" and "Friendship" — an exact match to Rogue's real principles
  // above, strongly indicating this is Rogue's actual feature name.
  feature: { name: 'Bad Habits', effect: [{ text: 'PLACEHOLDER — full feature description pending direct page access.' }] },
  featureMoves: [
    { name: 'Indulge a bad habit on your own', category: 'Playbook Feature', subcategory: 'Bad Habits', rollsWith: 'Survival', details: 'When you indulge a bad habit on your own, shift your balance toward Survival, and roll with Survival.' },
    { name: 'Indulge a bad habit with a friend', category: 'Playbook Feature', subcategory: 'Bad Habits', rollsWith: 'Friendship', details: 'When you indulge a bad habit with a friend, shift your balance toward Friendship, and roll with Friendship.' },
  ],
  featureChoices: [],
  growth: 'Did you choose to rely on someone else today?',
  // PLACEHOLDER — flavor text explaining what the growth question is getting at.
  growthDescription: 'PLACEHOLDER growth description for The Rogue.',
  history: [
    'Who betrayed you, and how did it change you?',
    'What are you running from, and how close is it?',
    'What is the one job you refused to take?',
    'Which companion are you starting to trust despite yourself?',
  ],
  // PLACEHOLDER — suggested connection prompts for The Rogue. A run of 3+
  // underscores marks a fill-in-the-blank spot (see renderBlanks in
  // ../PlaybookInfoPanel).
  connectionPrompts: [
    '___ is the one companion you’re starting to trust despite yourself.',
    'You still haven’t told ___ what you’re really running from.',
  ],
  startingTechnique: { name: 'Dirty Trick', approach: 'attack', details: 'Fight unfairly; a foe is Impaired and you slip out of their reach.' },
  momentOfBalance: 'You let people in and it makes you stronger. Tell the GM how you save your companions by trusting them completely, and what that changes.',
};
