import type { Playbook } from './playbook';
import iconImg from './../../../../assets/playbooks/foundling.jpg';
import backgroundImg from '../../../../assets/playbooks/background/foundling.jpg';
import bannerImg from '../../../../assets/playbooks/banner/foundling.jpg';

export const foundling: Playbook = {
  id: 'foundling',
  iconColor: '#3a6ea5',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  bannerImageKey: 'foundling.jpg',
  secondaryImageKey: 'foundling-secondary.jpg',
  name: 'The Foundling',
  tagline: 'The Foundling is the child of two cultures, belonging to both but not at home in either. Play the Foundling if you want to synthetize the lessons and traditions of your heritage.',
  description: [
    "Dualistic, torn, innovative, exploring. The Foundling is a child of two different heritages, each with their own traditions, their own practices, their own trainings. The Foundling might be an earthbender raised by Air Nomads, or a sword-wielding Fire Nation orphan raised in the Southern Water Tribe. Both of their heritages have a place in the Foundling's life and identity, and they struggle to find ways to belong to either heritage or to combine both. The struggle between belonging and owning one heritage and uniquely mixing both defines the Foundling's path.",
    "A Foundling cannot bend two different elements, but they are always stronger for incorporating elements of another culture and training. A waterbender who knows how to use firebending forms with waterbending is that much more effective. With their unique perspective, the Foundling can pick up skills that no other character can, adapting them and building a new style all their own.",
  ],
  principles: ['Unity', 'Heritage'],
  principlesDescription: [
    "The Foundling’s two principles reflect their self-awareness and their attempt to manage their best and worst impulses. Their Unity principle is all about their drive to bring different cultures and traditions together, creating a harmonious blend that honors both heritages. Their Heritage principle is all about their desire to preserve and respect the traditions and practices of their background, ensuring that they remain connected to their roots while also embracing the diversity of their environment.",
  ],
  stats: { creativity: 1, focus: -1, harmony: 1, passion: 1 },
  demeanorOptions: ['Caring', 'Dedicated', 'Friendly', 'Modest', 'Respectful', 'Shy'],
  moves: [
    { name: 'Empty Your Mind', category: 'Playbook', subcategory: 'The Foundling', rollsWith: 'passion', details: '' },
    { name: 'Building Bridges', category: 'Playbook', subcategory: 'The Foundling', rollsWith: 'focus', details: 'rks 2-fatigue. On a miss, your attack leaves you exposed; they may ask you any one question from the list, and you must answer honestly.' },
    { name: 'Martial Sensitive', category: 'Playbook', subcategory: 'The Foundling', rollsWith: null, details: '' },
    { name: 'Trusty Talisman', category: 'Playbook', subcategory: 'The Foundling', rollsWith: 'passion', details: '' },
    { name: 'Things in Common', category: 'Playbook', subcategory: 'The Foundling', rollsWith: null, details: '' },
  ],
  movesAdvice: [
    'For I Don’t Hate You, you must have Insecure marked to represent how awkwardly you act. If you don’t have it marked, you can choose to mark it.',
    'For This Was a Victory, you reveal your sabotage after you could have performed it. You mark fatigue not at the moment you engaged in sabotage, but at the moment it actually matters and comes into play, like revealing that you weakened a bridge just as the soldiers chasing you start to cross it. On a 7–9, your sabotage only creates a quick opportunity. On a miss, your sabotage now causes different, worse, or more expansive problems than you anticipated.',
    'For No Time for Feelings, there are two discrete effects to this move that both point to how you try to resist your feelings, even when others push you on them. Whenever you resist an NPC shifting your balance, you can mark a condition to roll with conditions instead of rolling without any bonus — but you can’t roll higher than a +4, and if you choose to do this, you can’t choose to clear a condition by immediately acting to prove them wrong. You can still mark growth by immediately acting to prove them wrong. For the other part of the move, you can only internalize your conditions and ignore their penalties when you have conditions marked up to your highest principle.',
    'For Takes One to Know One, make sure you actually needle your target, saying things that pick at them and mess with them! Be aware that doing so can reveal something of your own character at the same time, as on a 7–9 they get to ask you a question as well. The other party doesn’t have to answer the question, even out of character — they can instead mark 2-fatigue to stonewall and try to hide the answer. On a miss, however, you don’t get the option of stonewalling, and must answer honestly.',
  ],
  // Double Heritage: two trainings and two Mastered techniques at creation.
  startingTrainingCount: 2,
  startingMasteredCount: 2,
  feature: {
    name: 'Double Heritage',
    effect: [
      { text: "You are a child of two cultures. At character creation, choose two trainings and two backgrounds that represent your two heritages. You also start play with two mastered techniques instead of just one." },
      { text: 'You can shift your lodestar to someone new when they guide and comfort you and you open up to them, or when you guide and comfort them and they open up to you. If you do choose to shift your lodestar, clear a condition.' },
      { text: 'When your lodestar shifts your balance or calls you out, you cannot resist it. Treat an NPC lodestar calling you out as if you rolled a 10+, and a PC lodestar calling you out as if they rolled a 10+.' },
    ],
  },
  // Auto-granted by The Lodestar feature above — both performed BY the Adamant,
  // triggered by their relationship with their designated lodestar (a second,
  // named PC or NPC), not moves the lodestar character themselves takes.
  featureMoves: [
    { name: 'Shut Down Someone Vulnerable', category: 'Playbook Feature', subcategory: 'The Lodestar', rollsWith: 'Results', details: 'When you shut down someone vulnerable to harsh words or icy silence, shift your balance toward Results and roll with Results. On a hit, they mark a condition and you may clear the same condition. On a 10+, they also cannot shift your balance or call you out for the rest of the scene. On a miss, they have exactly the right retort; mark a condition and they shift your balance. You cannot use this on your lodestar.' },
    { name: 'Consult Your Lodestar for Advice', category: 'Playbook Feature', subcategory: 'The Lodestar', rollsWith: 'Restraint', details: 'When you consult your lodestar for advice on a problem (or permission to use your preferred solution), roll with Restraint. On a 10+ take all three; on a 7–9 they choose two: you see the wisdom of their advice and they shift your balance twice if you follow it; the conversation bolsters you, clear a condition or 2-fatigue; they feel at ease offering their opinion, they clear a condition or 2-fatigue. On a miss, something about their advice infuriates you — mark a condition or have the GM shift your balance twice.' },
  ],
  // Verified against Demiplane Nexus's Roll20 character sheet wizard — a
  // single freeform name, no catalog to choose from.
  featureChoices: [
      { 
        kind: 'freeform', 
        key: 'lodestar', label: 'Lodestar', 
        count: 1, 
        prompt: 'Name your lodestar (choose a PC to start).' 
      },
      {
        kind: 'freeform', 
        key: 'lodestarShift', label: 'Lodestar Shift', 
        count: 1, 
        prompt: 'Name the person who has become your new lodestar.' 
      }
  ],
  startingTechnique: { name: 'Feel The Flow', approach: 'evade', details: "You take pause to feel the flow of battle and study the way your opposition fights. You become 'Favored'. If they share a training with you, learn their principle. If you know their principle, clear 1-fatigue (even if they do not share the same training)." },
  growth: 'Did you resolve an issue or conflict relying on something other than your trainings?',
  growthDescription: "The Foundling's growth question is all about exploring more of the world beyond the two trainings that divide them. The Foundling may be deeply defined by those trainings, but that means they need to round themselves out as a full person by learning other ways of solving problems or dealing with the world.",
  history: [
    "How and when did you learn about your second heritage?",
    "Who in your family insists you focus on upholding the family heritage?",
    "Who helped you understand that your two trainings can complement each other?",
    "What detail of your clothing or visible trinket reveals you belong to two cultures?",
    "Why are you committed to this group or purpose?",
  ],
  connectionPrompts: [
    "___ seems to think one of my heritages should be valued more; There's something persuasive in their words.",
    "___ is so awesome! With skills and heritage I've never seen! I want to learn all I can about them and their background.",
  ],
  momentOfBalance: "You have always struggled to find unity between your two halves while trying to honor their traditions. But true balance is about knowing that everything is part of a greater whole. One heritage cannot exist without the other. Especially within you. Tell the GM how your new understanding lets you use both your trainings to accomplish an incredible feat or vanquish an enemy that seems unstoppable.",
};
