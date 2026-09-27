import type { Playbook } from './playbook';
import iconImg from '../../../../assets/playbooks/icon.jpg';
import backgroundImg from '../../../../assets/playbooks/background/icon.jpg';
import bannerImg from '../../../../assets/playbooks/banner/icon.jpg';

// Verified against Demiplane Nexus's full Playbook page (Core Book).
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
  tagline: 'A chosen figure of an ancient tradition, expected to carry forward the duties of their role regardless of what they want.',
  description: [
    'The Icon comes from an ancient tradition and inherits some serious standards to live up to. Play the Icon if you want to be torn between your heart and your duty.',
    'Torn, fun-loving, anxious, dutiful. The Icon was raised to fulfill a particular duty and role in their society—an important role, an honored role, a role that so many others, from adults to children, envy. But the Icon isn’t sure they want the role. They weren’t given any real choice in the matter; it’s their role according to destiny, tradition, prophecy, or some other impulse that guided the hands of their parents, mentors, or guardians.',
    'The Icon has had the massive import of their role impressed upon them from a young age; they have always known how important the duties were. Now, they have all of that responsibility foisted upon them, and where once they could be themselves and live their life, everyone expects them to be something else now.',
  ],
  principles: ['Role', 'Freedom'],
  principlesDescription: 'The Icon is split between the two principles of their Role and their Freedom. Their Role principle represents their commitment to and belief in all the duties and meaning of their role — the higher their Role, the more they begin to see the world through the eyes of someone fulfilling a duty first and foremost. Their Freedom principle represents their desire to be free to make their own choices, act as they want, and just have fun — an Icon with high Freedom tries to avoid their role and its duties, sometimes with significant consequences.',
  stats: { creativity: 0, focus: 1, harmony: 1, passion: -1 },
  demeanorOptions: ['Naive', 'Playful', 'Needy', 'Sad', 'Haughty', 'Grave'],
  moves: [
    { name: 'Use Their Momentum', category: 'Playbook', subcategory: 'The Icon', rollsWith: 'focus', details: 'When you are engaged with a large or powerful foe, mark fatigue to advance and attack with Focus instead of Passion. If you do, you become Prepared and may also choose to use Retaliate as if it were an advance and attack technique.' },
    { name: 'Bonzu Pippinpaddleopsicopolis… the Third', category: 'Playbook', subcategory: 'The Icon', rollsWith: null, details: 'When you trick an NPC by assuming a silly disguise or fake identity, mark Insecure to treat your roll as if it was a 12+. If Insecure is already marked, mark 2-fatigue instead.' },
    { name: 'Concentration', category: 'Playbook', subcategory: 'The Icon', rollsWith: null, details: 'Take +1 Focus (max +3).' },
    { name: 'Otter-Penguins, Unagi, and Hot Springs', category: 'Playbook', subcategory: 'The Icon', rollsWith: 'harmony', details: 'When you visit a new inhabited location you might know about, roll with Harmony. On a 7–9, ask 1. On a 10+, ask 2: What’s the best local pastime? What interesting locations are nearby? Who is the most famous person here? What special tradition is prized by locals? What’s the most interesting legend locals recount about this place? PCs who interact with one of the answers clear 1-fatigue or mark growth. On a miss, tell the GM what you expected to find; they will tell you how this place is different!' },
    { name: 'Yip Yip!', category: 'Playbook', subcategory: 'The Icon', rollsWith: null, details: 'You have an animal companion large enough to ride. Name them and choose their species. When you fight beside your animal companion, mark 1-fatigue to become Favored for an exchange. When something hurts your animal companion, mark a condition. When you and your friends travel via your animal companion, everyone clears all fatigue.' },
  ],
  movesAdvice: [
    'For Use Their Momentum, you become Prepared after you roll to advance and attack. You may use Retaliate as if it were an advance and attack technique the same exchange that you trigger this move.',
    'For Otter-Penguins, Unagi, and Hot Springs, “a new inhabited location you might know about” is a place that you haven’t been to during the game yet, but your character might’ve heard about sometime in the past.',
    'For Yip Yip!, you can choose an animal species not listed if you want. In order to travel via your animal companion, you have to journey for at least a few hours or overnight; riding them across a small village won’t clear any fatigue.',
  ],
  feature: {
    name: 'Burden and Tradition',
    effect: [
      { text: 'You are an icon of your burden and tradition. You are expected to be its exemplar, its single most important representative, trained up from a young age and saddled with the weight of history. Choose 3 responsibilities of your burden and tradition you are expected to assume, and 3 prohibitions you are expected never to violate.' },
      { heading: 'Live Up to Your Role', text: 'When you live up to your Role through the responsibilities of your burden and tradition despite opposition or danger, shift your balance toward Role instead of marking fatigue, and clear fatigue equal to your Role (minimum 0-fatigue).' },
      { heading: 'Break Tradition', text: 'When you directly and openly break a prohibition of your burden and tradition, mark a condition, shift your balance twice towards Freedom, and mark growth.' },
      { heading: 'End of Session', text: 'At the end of each session, answer these after your standard growth questions: Did I uphold a responsibility? If yes, shift balance toward Role and clear a condition. Did I break a prohibition? If yes, shift balance toward Freedom.' },
    ],
  },
  featureMoves: [],
  // Verified against Demiplane Nexus's Roll20 character sheet wizard — both
  // are closed catalogs, not open text (the Core Book's own prose just names
  // "3 responsibilities" and "3 prohibitions" without spelling out the list).
  featureChoices: [
    {
      kind: 'select',
      key: 'responsibilities',
      label: 'Responsibilities',
      count: 3,
      options: [
        'Protecting humanity from natural disasters and dark spirits',
        'Destroying dangerous creatures',
        'Overthrowing tyrants',
        'Serving and defending rightful rulers',
        'Performing rituals',
        'Providing aid and succor to the downtrodden',
        'Searching for hidden histories and artifacts',
        'Guarding nature from threats and destruction',
        'Safekeeping records and relics',
      ],
    },
    {
      kind: 'select',
      key: 'prohibitions',
      label: 'Prohibitions',
      count: 3,
      options: [
        'Never refuse an earnest request for help',
        'Never express great emotion',
        'Never run from a fight',
        'Never start a fight',
        'Never deny someone knowledge or truth',
        'Never use your role for gain',
      ],
    },
  ],
  startingTechnique: { name: 'Wall of Perfection', approach: 'defend', details: 'Create a perfect wall of defense around yourself and any allies directly next to you; mark 1-fatigue to block a single attack towards the wall or keep an enemy at bay who tries to penetrate the wall.' },
  growth: 'Did you accomplish a feat worthy of your burden and tradition?',
  growthDescription: 'The Icon’s growth question points them at building upon the foundation of their role in a similar way. What matters is if they did something worthy of their burden and tradition, whether or not it adhered to any of their prohibitions or responsibilities.',
  history: [
    'What tradition do you represent as its icon? Why can’t you set down the role?',
    'Who was your chief mentor, teaching you the nature of your burden and its value?',
    'Who showed you that even with the weight of your burden, you could still find ways to play?',
    'What token of your burden and tradition do you always carry?',
    'Why are you committed to this group or purpose?',
  ],
  connectionPrompts: [
    '___ seems to not fully understand what it means that I’m the icon of my tradition…and I kind of like feeling free around them.',
    '___ makes me feel better about my responsibilities and my burden with a smile and a few kind words.',
  ],
  momentOfBalance: 'Others have laid a path for you that you cannot escape, but balance means you understand the limits of their vision. You make the role your own in this moment, charting a new path for yourself and your tradition. Tell the GM how your new understanding of your burdens forges a new way forward for everyone.',
};
