import type { Playbook } from '../data';
import iconImg from '../../../../assets/playbooks/hammer.jpg';
import backgroundImg from '../../../../assets/playbooks/background/hammer.jpg';
import bannerImg from '../../../../assets/playbooks/banner/hammer.jpg';

export const hammer: Playbook = {
  id: 'hammer',
  iconColor: '#d9c98a',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  // PLACEHOLDER keys — upload the matching objects to the MEDIA bucket under
  // `playbooks/` for these to resolve (see resolvePlaybookMedia in ../data).
  bannerImageKey: 'hammer.jpg',
  secondaryImageKey: 'hammer-secondary.jpg',
  name: 'The Hammer',
  tagline: 'Believes every problem has a direct solution and volunteers to deliver it.',
  // PLACEHOLDER — a longer passage describing The Hammer, expanding on the tagline.
  description: ['PLACEHOLDER description for The Hammer.', 'PLACEHOLDER second paragraph for The Hammer.'],
  principles: ['Aggression', 'Diplomacy'],
  // PLACEHOLDER — flavor text for what it means to live by Aggression vs Diplomacy.
  principlesDescription: 'PLACEHOLDER principles description for The Hammer.',
  stats: { creativity: 0, focus: 0, harmony: -1, passion: 2 },
  // PLACEHOLDER — suggested demeanors for The Hammer.
  demeanorOptions: ['PLACEHOLDER demeanor', 'PLACEHOLDER demeanor', 'PLACEHOLDER demeanor'],
  moves: [
    { name: 'Overwhelming Force', effect: 'When you go all-out in a fight, roll with Passion for extra effect on a hit.' },
    { name: 'No Diplomacy Needed', effect: 'When you settle a dispute by force instead of words, roll with Focus.' },
    { name: 'Break Through', effect: 'When you smash through an obstacle rather than go around it, roll with Passion.' },
    { name: 'Cool Down', effect: 'Once per session, an ally can talk you down before you escalate further.' },
    { name: 'Point Taken', effect: 'Clear a condition when you accept that force wasn’t the answer this time.' },
  ],
  // PLACEHOLDER — guidance on choosing moves for The Hammer.
  movesAdvice: ['PLACEHOLDER moves advice for The Hammer.', 'PLACEHOLDER second paragraph of moves advice for The Hammer.'],
  feature: { name: 'First to the Fight', effect: ['You act first when a fight breaks out, before initiative is otherwise decided.'] },
  growth: 'Did you solve a problem with force today?',
  // PLACEHOLDER — flavor text explaining what the growth question is getting at.
  growthDescription: 'PLACEHOLDER growth description for The Hammer.',
  history: [
    'Who hurt someone you cared about, and what did you do about it?',
    'When did force fail you, and who saw it?',
    'Who first told you that you hit too hard?',
    'Which companion keeps trying to talk you down, and does it work?',
  ],
  // PLACEHOLDER — suggested connection prompts for The Hammer. A run of 3+
  // underscores marks a fill-in-the-blank spot (see renderBlanks in
  // ../PlaybookInfoPanel).
  connectionPrompts: [
    '___ is the only one who can talk you down once you’ve decided to hit something.',
    'You hurt ___ once by solving their problem the only way you know how.',
  ],
  startingTechnique: { name: 'Overwhelming Blow', approach: 'attack', effect: 'Put everything into one strike; a foe marks 2-fatigue and is knocked back.' },
  momentOfBalance: 'You choose the moment to hold back — or not. Tell the GM how you end a conflict by knowing exactly how much force it needs, and no more.',
};
