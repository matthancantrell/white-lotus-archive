import type { Playbook } from '../data';
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
  principles: ['Self-Reliance', 'Trust'],
  // PLACEHOLDER — flavor text for what it means to live by Self-Reliance vs Trust.
  principlesDescription: 'PLACEHOLDER principles description for The Rogue.',
  stats: { creativity: 1, focus: 0, harmony: -1, passion: 1 },
  // PLACEHOLDER — suggested demeanors for The Rogue.
  demeanorOptions: ['PLACEHOLDER demeanor', 'PLACEHOLDER demeanor', 'PLACEHOLDER demeanor'],
  moves: [
    { name: 'Solo Job', effect: 'When you handle something alone rather than ask for help, roll with Creativity.' },
    { name: 'Leap of Trust', effect: 'When you rely on the party instead of going it alone, roll with Harmony.' },
    { name: 'Slip the Net', effect: 'When you talk or sneak your way out of trouble, roll with Creativity.' },
    { name: 'No Strings', effect: 'Once per session, walk away from an obligation with no mechanical consequence.' },
    { name: 'Found Family', effect: 'Clear a condition the first time you let the party in on something personal.' },
  ],
  // PLACEHOLDER — guidance on choosing moves for The Rogue.
  movesAdvice: ['PLACEHOLDER moves advice for The Rogue.', 'PLACEHOLDER second paragraph of moves advice for The Rogue.'],
  feature: { name: 'Always an Out', effect: ['You always know a way out of the room you’re in, however unlikely.'] },
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
  startingTechnique: { name: 'Dirty Trick', approach: 'attack', effect: 'Fight unfairly; a foe is Impaired and you slip out of their reach.' },
  momentOfBalance: 'You let people in and it makes you stronger. Tell the GM how you save your companions by trusting them completely, and what that changes.',
};
