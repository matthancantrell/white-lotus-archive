import type { Playbook } from './playbook';
import iconImg from '../../../../assets/playbooks/elder.jpg';
import backgroundImg from '../../../../assets/playbooks/background/elder.jpg';
import bannerImg from '../../../../assets/playbooks/banner/elder.jpg';


export const elder: Playbook = {
  id: 'elder',
  iconColor: '#3a9e8f',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  // PLACEHOLDER keys — upload the matching objects to the MEDIA bucket under
  // `playbooks/` for these to resolve (see resolvePlaybookMedia in ../data).
  bannerImageKey: 'elder.jpg',
  secondaryImageKey: 'elder-secondary.jpg',
  name: 'The Elder',
  tagline: 'Lived longer than the others, mastered their training many times over.',
  // PLACEHOLDER — a longer passage describing The Elder, expanding on the tagline.
  description: ['PLACEHOLDER description for The Elder.', 'PLACEHOLDER second paragraph for The Elder.'],
  principles: ['Determination', 'Patience'],
  // PLACEHOLDER — flavor text for what it means to live by Determination vs Patience.
  principlesDescription: 'PLACEHOLDER principles description for The Elder.',
  stats: { creativity: 0, focus: 1, harmony: 1, passion: -1 },
  // PLACEHOLDER — suggested demeanors for The Elder.
  demeanorOptions: ['PLACEHOLDER demeanor', 'PLACEHOLDER demeanor', 'PLACEHOLDER demeanor'],
  moves: [
    { name: 'Decades of Practice', category: 'Playbook', subcategory: null, rollsWith: 'focus', details: 'When you draw on a lifetime of experience, roll with Focus.' },
    { name: 'Patient Teacher', category: 'Playbook', subcategory: null, rollsWith: 'harmony', details: 'When you guide a companion through a technique, roll with Harmony; on a hit they gain a temporary bonus.' },
    { name: 'Seen It Before', category: 'Playbook', subcategory: null, rollsWith: null, details: 'Once per session, recognize a tactic or trap because you’ve encountered it before.' },
    { name: 'One More Fight', category: 'Playbook', subcategory: null, rollsWith: 'focus', details: 'When your body pushes past what it should be capable of, roll with Focus.' },
    { name: 'Let It Go', category: 'Playbook', subcategory: null, rollsWith: null, details: 'Clear a condition when you choose patience over pushing an old grudge.' },
  ],
  // PLACEHOLDER — guidance on choosing moves for The Elder.
  movesAdvice: ['PLACEHOLDER moves advice for The Elder.', 'PLACEHOLDER second paragraph of moves advice for The Elder.'],
  feature: { name: 'Mastered Techniques', effect: ['Start with four mastered techniques instead of one, chosen freely from your training.'] },
  featureMoves: [],
  growth: 'Did your age and experience change how you handled something today?',
  // PLACEHOLDER — flavor text explaining what the growth question is getting at.
  growthDescription: 'PLACEHOLDER growth description for The Elder.',
  history: [
    'What mastery have you spent a lifetime earning?',
    'What great mistake of your youth still follows you?',
    'Why are you traveling with people so much younger than you?',
    'Which companion reminds you of who you used to be?',
  ],
  // PLACEHOLDER — suggested connection prompts for The Elder. A run of 3+
  // underscores marks a fill-in-the-blank spot (see renderBlanks in
  // ../PlaybookInfoPanel).
  connectionPrompts: [
    '___ reminds you so much of who you used to be that it’s unsettling.',
    'You’ve started teaching ___ something you spent a lifetime mastering.',
  ],
  startingTechnique: { name: 'Old Reliable', approach: 'defend', details: 'A form drilled for decades; you deflect an attack and the foe marks 1-fatigue.' },
  momentOfBalance: 'A lifetime of skill flows through you. Tell the GM how you demonstrate true mastery, resolving a conflict in a way only someone who has seen everything could.',
};
