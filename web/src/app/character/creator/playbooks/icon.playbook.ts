import type { Playbook } from '../data';
import iconImg from '../../../../assets/playbooks/icon.jpg';
import backgroundImg from '../../../../assets/playbooks/background/icon.jpg';
import bannerImg from '../../../../assets/playbooks/banner/icon.jpg';

export const icon: Playbook = {
  id: 'icon',
  iconColor: '#8a5ca8',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  // PLACEHOLDER keys — upload the matching objects to the MEDIA bucket under
  // `playbooks/` for these to resolve (see resolvePlaybookMedia in ../data).
  bannerImageKey: 'icon.jpg',
  secondaryImageKey: 'icon-secondary.jpg',
  name: 'The Icon',
  tagline: 'Carries a title or legacy they never asked for, and longs to just be themselves.',
  // PLACEHOLDER — a longer passage describing The Icon, expanding on the tagline.
  description: ['PLACEHOLDER description for The Icon.', 'PLACEHOLDER second paragraph for The Icon.'],
  principles: ['Duty', 'Freedom'],
  // PLACEHOLDER — flavor text for what it means to live by Duty vs Freedom.
  principlesDescription: 'PLACEHOLDER principles description for The Icon.',
  stats: { creativity: 1, focus: 0, harmony: 0, passion: -1 },
  // PLACEHOLDER — suggested demeanors for The Icon.
  demeanorOptions: ['PLACEHOLDER demeanor', 'PLACEHOLDER demeanor', 'PLACEHOLDER demeanor'],
  moves: [
    { name: 'The Weight of the Role', effect: 'When you invoke your title to open doors, roll with Harmony.' },
    { name: 'Slip Away', effect: 'When you shed your public persona to move unseen, roll with Creativity.' },
    { name: 'Rally the Room', effect: 'When you inspire a crowd with who you represent, roll with Passion.' },
    { name: 'Just for a Moment', effect: 'Once per session, clear a condition by doing something purely for yourself.' },
    { name: 'Inherited Trust', effect: 'People you’ve never met extend you goodwill on your family or office’s reputation.' },
  ],
  // PLACEHOLDER — guidance on choosing moves for The Icon.
  movesAdvice: ['PLACEHOLDER moves advice for The Icon.', 'PLACEHOLDER second paragraph of moves advice for The Icon.'],
  feature: { name: 'Small Freedoms', effect: ['You mark growth whenever you find joy in an ordinary, unburdened moment — no growth question needed.'] },
  growth: 'Did your role and your own wishes pull you in different directions today?',
  // PLACEHOLDER — flavor text explaining what the growth question is getting at.
  growthDescription: 'PLACEHOLDER growth description for The Icon.',
  history: [
    'What title or legacy do you carry, and who gave it to you?',
    'What do people expect of you that you cannot deliver?',
    'When did you last get to be simply yourself?',
    'Which companion sees past the title, and which one only sees it?',
  ],
  // PLACEHOLDER — suggested connection prompts for The Icon. A run of 3+
  // underscores marks a fill-in-the-blank spot (see renderBlanks in
  // ../PlaybookInfoPanel).
  connectionPrompts: [
    '___ is one of the only people who sees past your title to who you actually are.',
    'You let your guard down around ___ in a way your title never allows.',
  ],
  startingTechnique: { name: 'Commanding Presence', approach: 'evade', effect: 'Your bearing halts a foe; they hesitate and cannot act against you this exchange.' },
  momentOfBalance: 'You embody what your title was meant to mean. Tell the GM how your presence alone changes the hearts of everyone in the scene.',
};
