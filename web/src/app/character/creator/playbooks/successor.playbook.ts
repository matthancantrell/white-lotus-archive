import type { Playbook } from './playbook';
import iconImg from '../../../../assets/playbooks/successor.jpg';
import backgroundImg from '../../../../assets/playbooks/background/successor.jpg';
import bannerImg from '../../../../assets/playbooks/banner/successor.jpg';

// Shared between the Domain and Secondary Domain choices below — both draw
// from this identical 12-option catalog (see featureChoices' excludeChoiceKeys).
const DOMAINS = [
  'High society',
  'Military command',
  'Arts and entertainment',
  'Land ownership',
  'Organized crime',
  'Spiritual authority',
  'State politics',
  'Business and industry',
  'Elite academics',
  'Vigilante militias',
  'Media and news',
  'Vital supply chains',
];

// Verified against Demiplane Nexus's full Playbook page (Core Book).
export const successor: Playbook = {
  id: 'successor',
  iconColor: '#4c7ac9',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  // PLACEHOLDER keys — upload the matching objects to the MEDIA bucket under
  // `playbooks/` for these to resolve (see resolvePlaybookMedia in ../data).
  bannerImageKey: 'successor.jpg',
  secondaryImageKey: 'successor-secondary.jpg',
  name: 'The Successor',
  tagline: 'The inheritor of a massively powerful legacy, known all over, with its own dark history.',
  description: [
    'The Successor comes from a powerful, tarnished lineage. Play the Successor if you want to struggle against your lineage as it threatens to draw you in.',
    'Prestigious, redemptive, pigeonholed, rebellious. The Successor comes from a powerful family, group, order, or lineage—they’re the inheritor of real power, in one way or another, and everyone in the group believes the Successor belongs to it. But the lineage of the Successor is mired in corruption, or tragedy, or dark rumors. It’s not an unequivocally noble inheritance; it’s characterized by a tradition of destructive or cruel decisions and practices.',
    'The Successor is a bit like the Icon; this identity has been foisted upon them. But unlike the Icon, this isn’t some specific, honored role that the Successor faces; it has the weight of an entire legacy with its own enemies, allies, responsibilities, and benefits. Getting out from under that name, its weight, and its borne assumptions is quite the challenge for the Successor.',
  ],
  principles: ['Tradition', 'Progress'],
  principlesDescription: [
    'The Successor’s split between their desire to uphold the greatness of their lineage and their desire to forge their own path is represented in their two principles. The Successor’s principle of Tradition represents their commitment to the lineage, both its heritage and its practices and power. A Successor with a high Tradition cares about their lineage and seeks to uphold it. A high Tradition Successor may not be happy with the darker elements of their lineage, but they aren’t out-of-hand opposed and disgusted. Instead, they see the value and power of the lineage and the way it has done things and seek to respect and honor their forebears.',
    'The Successor’s Progress principle, on the other hand, represents their desire to find new ways, different from the ways of their lineage. They don’t have to be outright disrespectful or disdainful of their lineage, but they certainly aren’t deeply rigid about it or refraining from making changes on the grounds that “this is how it’s always been done.” A Successor with high Progress very often wants to make amends for the worst excesses of their lineage but might also be looking for other non-traditional changes to their lineage.',
    'The Successor finds a way to combine these two paths in their Moment of Balance. When they use their Moment of Balance, they both appreciate and value their lineage and everything it has given them, while also finding a new and better way to actually apply that power. They innovate while drawing on their lineage’s resources to solve an unsolvable problem.',
  ],
  stats: { creativity: 1, focus: 1, harmony: -1, passion: 0 },
  demeanorOptions: ['Perky', 'Intense', 'By-the-book', 'Casual', 'Arrogant', 'Oblivious'],
  moves: [
    { name: 'Way of the Future', category: 'Playbook', subcategory: 'The Successor', rollsWith: null, details: 'Take +1 Creativity (max +3).' },
    { name: 'Black Koala-Sheep', category: 'Playbook', subcategory: 'The Successor', rollsWith: 'creativity', details: 'When you behave in a way that shocks and unsettles people from one of your backgrounds, roll with Creativity to intimidate them or push your luck.' },
    { name: 'A Life of Regret', category: 'Playbook', subcategory: 'The Successor', rollsWith: 'focus', details: 'When you guide and comfort an NPC by apologizing and honestly promising to make amends for the harm they have suffered, roll with Focus instead of Harmony. If they choose not to open up to you, you do not take +1 forward against them. If they choose to open up to you, take +1 ongoing to attempts to take action to make amends.' },
    { name: 'Walk This Way', category: 'Playbook', subcategory: 'The Successor', rollsWith: 'creativity', details: 'When you make over, disguise, and/or coach your friends to fit in with a specific crowd appropriate to one of your backgrounds, roll with Creativity. On a 10+, the performance is flawless; you gain access to wherever you wanted to fit in while attracting little suspicion. On a 7–9, you fool nearly everyone; there’s only a single gatekeeper who asks any questions or stands in your way. On a miss, the only way to get the access you desired is for one of your friends to take on an uncomfortable, dangerous, or attention-grabbing role.' },
    { name: 'Worldly Knowledge', category: 'Playbook', subcategory: 'The Successor', rollsWith: null, details: 'Your upbringing expanded your horizons, skillsets, and contacts. Choose another training and another background.' },
  ],
  movesAdvice: [
    'For Black Koala-Sheep, the GM is the final arbiter of whether or not you behaved in a way that shocks or unsettles people from one of your backgrounds.',
    'For A Life of Regret, you can apologize and honestly promise to make amends for harm that you did not personally inflict—especially if that harm was inflicted by your lineage.',
    'For Walk This Way, the makeover or disguise is only useful to get your friends past suspicion or observation. Make sure you know your destination when you use this move.',
    'For Worldly Knowledge, you cannot choose a second form of bending, but you can always choose Weapons or Technology, or your first form of bending.',
  ],
  feature: {
    name: 'A Tainted Past',
    effect: [
      { text: 'You hail from a powerful, infamous lineage—one with an impressive and terrible reputation. Its reach extends over the whole scope of your story, and everyone in the scope knows of it. Choose one domain that is the source of your lineage’s power (e.g. high society, military command, organized crime, business and industry, spiritual authority), and another into which they’re now beginning to extend their reach.' },
      { heading: 'Lineage Resources', text: 'You have access to your family’s extensive stores of two resources (e.g. obscure or forbidden knowledge, introductions and connections, servants or muscle, high technology, cold hard cash, spiritual artifacts or tomes). Spend resources during the session to establish a boon your lineage’s unique position and stores could provide: a vehicle, an invitation, a chest of jade coins, etc.' },
    ],
  },
  // Auto-granted by A Tainted Past above — both performed by the Successor,
  // tied to their lineage's stored resources.
  featureMoves: [
    { name: 'Humble Yourself', category: 'Playbook Feature', subcategory: 'A Tainted Past', rollsWith: 'Tradition', details: 'When you politely and obediently humble yourself before a powerful member of your lineage, roll with your Tradition. On a hit, you earn some credit; hold 3-resources. On a 7–9, their resources don’t come without strings; you’ll need to promise to fulfill some other obligation of your lineage, or let them shift your balance. On a miss, they’re dissatisfied with your display; they’re cutting you off until you fulfill some task they set to you.' },
    { name: 'Raid Your Lineage’s Resources', category: 'Playbook Feature', subcategory: 'A Tainted Past', rollsWith: 'Progress', details: 'When you raid your lineage’s resources without their consent or knowledge, mark a condition and roll with your Progress. On a hit, hold 1-resource. On a 7–9, choose 1. On a 10+, choose 2: you obtain an additional 1-resource; you nab your goodies quietly, your lineage is none the wiser; you steel yourself for what you’re doing, avoid marking a condition. On a miss, you’re caught red-handed by a powerful member of your lineage who saw you coming.' },
  ],
  // Verified against Demiplane Nexus's Roll20 character sheet wizard — Domains
  // and Secondary Domain are both closed catalogs drawing from the identical
  // 12-option list (the Core Book's own prose only gives 5 "e.g." examples),
  // so a pick in one excludes it from the other. Lineage Resources is its own
  // separate 6-option catalog with no overlap.
  featureChoices: [
    {
      kind: 'select',
      key: 'domain',
      label: 'Domain',
      count: 1,
      options: DOMAINS,
      excludeChoiceKeys: ['secondaryDomain'],
    },
    {
      kind: 'select',
      key: 'secondaryDomain',
      label: 'Secondary Domain',
      count: 1,
      options: DOMAINS,
      excludeChoiceKeys: ['domain'],
    },
    {
      kind: 'select',
      key: 'resources',
      label: 'Lineage Resources',
      count: 2,
      options: ['Obscure or forbidden knowledge', 'Introductions and connections', 'Servants or muscle', 'High technology', 'Cold hard cash', 'Spiritual artifacts or tomes'],
    },
  ],
  startingTechnique: { name: 'Break', approach: 'evade', details: 'Target a foe’s vulnerable equipment; render it useless or broken—possibly inflicting or overcoming a fictionally appropriate status.' },
  growth: 'Did you learn something meaningful or important about your lineage, its members, or its effects on the world and others?',
  growthDescription: 'The Successor’s growth question is all about coming to learn more, discover more, and better understand their own lineage. Because the Successor’s lineage should be well-known throughout the scope of your game, it shouldn’t be hard to find out something about them nearly anywhere the Successor goes.',
  history: [
    'Who is the current head of your lineage? How do you love and frustrate each other?',
    'What close member of your lineage wants to revolutionize it?',
    'What do you carry that reminds you of the place most associated with your lineage?',
    'What part of your lineage’s identity is most important and valuable to you as a person?',
    'Why are you committed to this group or purpose?',
  ],
  connectionPrompts: [
    '___ has major concerns, fears, or grievances with my lineage—and with me, by proxy.',
    '___ seems free of their past in a way I wish I could let go of mine; hearing them talk about the future feels amazing!',
  ],
  momentOfBalance: 'You may never escape the legacy of your family, but balance allows you to learn from them without defining yourself in their image. You call upon a resource of your family to innovate a new solution to an intractable problem, never forgetting who you are in the face of incredible danger. Tell the GM how you knock down obstacles that seem impossible to overcome and save the day.',
};
