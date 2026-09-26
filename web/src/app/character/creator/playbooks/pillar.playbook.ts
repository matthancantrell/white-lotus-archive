import type { Playbook } from './playbook';
import iconImg from '../../../../assets/playbooks/pillar.jpg';
import backgroundImg from '../../../../assets/playbooks/background/pillar.jpg';
import bannerImg from '../../../../assets/playbooks/banner/pillar.jpg';


export const pillar: Playbook = {
  id: 'pillar',
  iconColor: '#c98a4c',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  // PLACEHOLDER keys — upload the matching objects to the MEDIA bucket under
  // `playbooks/` for these to resolve (see resolvePlaybookMedia in ../data).
  bannerImageKey: 'pillar.jpg',
  secondaryImageKey: 'pillar-secondary.jpg',
  name: 'The Pillar',
  tagline: 'Leads the group tactically, torn between commanding and supporting.',
  // PLACEHOLDER — a longer passage describing The Pillar, expanding on the tagline.
  description: ['PLACEHOLDER description for The Pillar.', 'PLACEHOLDER second paragraph for The Pillar.'],
  principles: ['Leadership', 'Support'],
  // PLACEHOLDER — flavor text for what it means to live by Leadership vs Support.
  principlesDescription: 'PLACEHOLDER principles description for The Pillar.',
  stats: { creativity: 0, focus: 2, harmony: 0, passion: -1 },
  // PLACEHOLDER — suggested demeanors for The Pillar.
  demeanorOptions: ['PLACEHOLDER demeanor', 'PLACEHOLDER demeanor', 'PLACEHOLDER demeanor'],
  moves: [
    { name: 'Tactical Read', category: 'Playbook', subcategory: null, rollsWith: 'focus', details: 'When you size up a situation before acting, roll with Focus.' },
    { name: 'Take Point', category: 'Playbook', subcategory: null, rollsWith: 'focus', details: 'When you take charge of a plan under pressure, roll with Focus.' },
    { name: 'Step Back', category: 'Playbook', subcategory: null, rollsWith: 'harmony', details: 'When you let someone else lead instead of taking over, roll with Harmony.' },
    { name: 'Coordinated Strike', category: 'Playbook', subcategory: null, rollsWith: null, details: 'Once per exchange, direct an ally’s action for a bonus if they follow it.' },
    { name: 'Weight of Command', category: 'Playbook', subcategory: null, rollsWith: null, details: 'Clear a condition when a plan you called succeeds.' },
  ],
  // PLACEHOLDER — guidance on choosing moves for The Pillar.
  movesAdvice: ['PLACEHOLDER moves advice for The Pillar.', 'PLACEHOLDER second paragraph of moves advice for The Pillar.'],
  feature: { name: 'Command Presence', effect: ['Allies who follow your called plan take +1 to the roll.'] },
  featureMoves: [],
  growth: 'Did you have to choose between leading and supporting today?',
  // PLACEHOLDER — flavor text explaining what the growth question is getting at.
  growthDescription: 'PLACEHOLDER growth description for The Pillar.',
  history: [
    'Who taught you to lead, and what did they get wrong?',
    'When did a plan of yours fail, and who paid for it?',
    'Why does this group need you to hold it together?',
    'Which companion do you rely on most, and which one won’t follow orders?',
  ],
  // PLACEHOLDER — suggested connection prompts for The Pillar. A run of 3+
  // underscores marks a fill-in-the-blank spot (see renderBlanks in
  // ../PlaybookInfoPanel).
  connectionPrompts: [
    '___ paid the price once for a plan of yours that fell apart.',
    'You rely on ___ more than you’d ever admit out loud.',
  ],
  startingTechnique: { name: 'Coordinated Assault', approach: 'attack', details: 'Direct an ally’s attack; they take +1 and the foe is Impaired.' },
  momentOfBalance: 'The team moves as one under your guidance. Tell the GM how you lead your companions through a situation that should have broken them apart.',
};
