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
  // Verified against Demiplane Nexus's Playbooks index (Core Book) — page
  // itself is gated on this account, so only principles are corrected here.
  principles: ['Support', 'Leadership'],
  // PLACEHOLDER — flavor text for what it means to live by Support vs Leadership.
  principlesDescription: ['PLACEHOLDER principles description for The Pillar.'],
  stats: { creativity: 0, focus: 2, harmony: 0, passion: -1 },
  // PLACEHOLDER — suggested demeanors for The Pillar.
  demeanorOptions: ['PLACEHOLDER demeanor', 'PLACEHOLDER demeanor', 'PLACEHOLDER demeanor'],
  moves: [
    { name: 'A Warrior’s Heart', category: 'Playbook', subcategory: 'The Pillar', rollsWith: null, details: 'When you live up to your principle while you have 3+ conditions marked, ignore your condition penalties.' },
    { name: 'Fighting Like Dancing', category: 'Playbook', subcategory: 'The Pillar', rollsWith: 'harmony', details: 'When you advance and attack against a group of foes—or a foe who has previously defeated you—roll with Harmony instead of Passion.' },
    { name: 'Out of Uniform', category: 'Playbook', subcategory: 'The Pillar', rollsWith: 'creativity', details: 'When you put on a disguised or physically altered persona to fool a community into thinking you’re two different people, roll with Creativity.' },
    { name: 'Taking Care of Business', category: 'Playbook', subcategory: 'The Pillar', rollsWith: null, details: 'When you lose your balance in a battle, instead of choosing one of the normal options, you may instead sacrifice yourself for your companions.' },
    { name: 'Understanding Mien', category: 'Playbook', subcategory: 'The Pillar', rollsWith: null, details: 'Take +1 to Harmony (max +3).' },
  ],
  // PLACEHOLDER — guidance on choosing moves for The Pillar.
  movesAdvice: ['PLACEHOLDER moves advice for The Pillar.', 'PLACEHOLDER second paragraph of moves advice for The Pillar.'],
  feature: { name: 'Command Presence', effect: [{ text: 'Allies who follow your called plan take +1 to the roll.' }] },
  featureMoves: [],
  featureChoices: [],
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
