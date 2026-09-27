import type { Playbook } from './playbook';
import iconImg from '../../../../assets/playbooks/adamant.jpg';
import backgroundImg from '../../../../assets/playbooks/background/adamant.jpg';
import bannerImg from '../../../../assets/playbooks/banner/adamant.jpg';

// Verified against Demiplane Nexus's full Playbook page (Core Book).
export const adamant: Playbook = {
  id: 'adamant',
  iconColor: '#3a6ea5',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  // PLACEHOLDER keys — upload the matching objects to the MEDIA bucket under
  // `playbooks/` for these to resolve (see resolvePlaybookMedia in ../data).
  bannerImageKey: 'adamant.jpg',
  secondaryImageKey: 'adamant-secondary.jpg',
  name: 'The Adamant',
  tagline: 'A zealous advocate with a heart of gold and a diamond-hard will, ready to do what it takes to fix the world.',
  description: [
    'The Adamant will fix the world, even if it means breaking all the rules. Play the Adamant if you want to contend with what “doing right” means in a complicated world.',
    'Pragmatic, fervent, dangerous, self-sacrificing. The Adamant is deeply committed to a cause, to the point that they may break all the rules to achieve their end. Sometimes, they might even go a bit too far in their drive—they have no hesitation to push and push and push when it comes to the causes they think are just. That’s why the Adamant needs a lodestar, the one person they listen to who can rein them in, let them know that maybe they should cool it and hold off a bit.',
    'The Adamant can sometimes be dismissive of others, especially if those others stand in the way of the Adamant’s goals…but they’re also aware of their tendency to go too far, and to make sure they listen to the right voices telling them to hold back. The distinction between heroism and villainy can be a fine line for the Adamant, with their focus on results over means. They want to stay on the right side of that line, and they need their friends to find the right path forward.',
  ],
  principles: ['Restraint', 'Results'],
  principlesDescription: 'The Adamant’s two principles reflect their self-awareness and their attempt to manage their best and worst impulses. Their Results principle is all about their drive to change things for the better and have it stick — pragmatic to a fault, willing to make sacrifices and tough choices to achieve the things they deem worth it. Their Restraint principle is all about their desire to hold back and be careful, to think and comprehend and plan instead of bulling ahead — still wanting the same ends, but not at any cost, and more willing to compromise or accept imperfect solutions if it means avoiding other terrible consequences.',
  stats: { creativity: 0, focus: 1, harmony: -1, passion: 1 },
  demeanorOptions: ['Above-it-all', 'Perfectionist', 'Chilly', 'Rebellious', 'Flippant', 'Standoffish'],
  moves: [
    { name: 'This Was a Victory', category: 'Playbook', subcategory: 'The Adamant', rollsWith: 'passion', details: 'When you reveal that you have sabotaged a building, device, or vehicle right as it becomes relevant, mark fatigue and roll with Passion. On a hit, your work pays off, creating an opportunity for you and your allies at just the right time. On a 7–9, the opportunity is fleeting—act fast to stay ahead of the consequences. On a miss, your action was ill-judged and something or someone you care about is hurt as collateral damage.' },
    { name: 'Takes One to Know One', category: 'Playbook', subcategory: 'The Adamant', rollsWith: 'focus', details: 'When you verbally needle someone by finding the weaknesses in their armor, roll with Focus. On a hit, ask 1 question. On a 7–9, they ask 1 of you as well: What is your principle? What do you need to prove? What could shake your certainty? Whom do you care about more than you let on? Anyone who lies or stonewalls marks 2-fatigue. On a miss, your attack leaves you exposed; they may ask you any one question from the list, and you must answer honestly.' },
    { name: 'No Time for Feelings', category: 'Playbook', subcategory: 'The Adamant', rollsWith: null, details: 'When you have equal or fewer conditions marked than your highest principle, mark fatigue to push down your feelings for the rest of the scene and ignore condition penalties until the end of the scene. When you resist an NPC shifting your balance, mark a condition to roll with conditions marked (max +4). You cannot then choose to clear a condition by immediately proving them wrong.' },
    { name: 'I Don’t Hate You', category: 'Playbook', subcategory: 'The Adamant', rollsWith: 'passion', details: 'When you guide and comfort someone in an awkward, understated, or idiosyncratic fashion, roll with Passion instead of Harmony if you mark Insecure or Insecure is already marked.' },
    { name: 'Driven by Justice', category: 'Playbook', subcategory: 'The Adamant', rollsWith: null, details: 'Take +1 to Passion (max +3).' },
  ],
  movesAdvice: [
    'For I Don’t Hate You, you must have Insecure marked to represent how awkwardly you act. If you don’t have it marked, you can choose to mark it.',
    'For This Was a Victory, you reveal your sabotage after you could have performed it. You mark fatigue not at the moment you engaged in sabotage, but at the moment it actually matters and comes into play, like revealing that you weakened a bridge just as the soldiers chasing you start to cross it. On a 7–9, your sabotage only creates a quick opportunity. On a miss, your sabotage now causes different, worse, or more expansive problems than you anticipated.',
    'For No Time for Feelings, there are two discrete effects to this move that both point to how you try to resist your feelings, even when others push you on them. Whenever you resist an NPC shifting your balance, you can mark a condition to roll with conditions instead of rolling without any bonus — but you can’t roll higher than a +4, and if you choose to do this, you can’t choose to clear a condition by immediately acting to prove them wrong. You can still mark growth by immediately acting to prove them wrong. For the other part of the move, you can only internalize your conditions and ignore their penalties when you have conditions marked up to your highest principle.',
    'For Takes One to Know One, make sure you actually needle your target, saying things that pick at them and mess with them! Be aware that doing so can reveal something of your own character at the same time, as on a 7–9 they get to ask you a question as well. The other party doesn’t have to answer the question, even out of character — they can instead mark 2-fatigue to stonewall and try to hide the answer. On a miss, however, you don’t get the option of stonewalling, and must answer honestly.',
  ],
  feature: {
    name: 'The Lodestar',
    effect: [
      { text: 'There’s only one person you often let past your emotional walls. Name your lodestar (choose a PC to start).' },
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
  featureChoices: [{ kind: 'freeform', key: 'lodestar', label: 'Lodestar', count: 1, prompt: 'Name your lodestar (choose a PC to start).' }],
  startingTechnique: { name: 'Pinpoint Aim', approach: 'defend', details: 'Take the time you need to line up a perfect shot; become Prepared. In the next exchange, if you advance and attack, roll with Focus or Passion, your choice. If you use Strike, you do not have to mark fatigue to choose what you inflict.' },
  growth: 'Did you seek support or guidance from others?',
  growthDescription: 'The Adamant’s growth question is all about learning to see other people as sources of wisdom and understanding. When the Adamant seeks support or guidance from others, they learn to temper their own drive with the ideas of others.',
  history: [
    'What experience of being deceived or manipulated convinced you to steel yourself against being swayed by other people?',
    'Who was your first lodestar, and why were they an exception? Why aren’t they your lodestar anymore?',
    'Who earned your grudging respect by teaching you pragmatism?',
    'What heirloom or piece of craftsmanship do you carry to remind you to stay true to yourself?',
    'Why are you committed to this group or purpose?',
  ],
  connectionPrompts: [
    '___ takes issue with my methods—perhaps they have a point, but I certainly can’t admit that to them!',
    '___ is my lodestar; something about them makes them the one person I let my guard down around.',
  ],
  momentOfBalance: 'You’ve held true to a core of conviction even while getting your hands dirty to do what you deemed necessary. But balance means appreciating that other people are just as complex as you are, not merely obstacles or pawns. Tell the GM how you solve an intractable problem or calm a terrible conflict by relating to dangerous people on a human level.',
};
