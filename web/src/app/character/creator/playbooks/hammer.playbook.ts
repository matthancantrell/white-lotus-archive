import type { Playbook } from './playbook';
import iconImg from '../../../../assets/playbooks/hammer.jpg';
import backgroundImg from '../../../../assets/playbooks/background/hammer.jpg';
import bannerImg from '../../../../assets/playbooks/banner/hammer.jpg';

// Verified against Demiplane Nexus's full Playbook page (Core Book).
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
  tagline: 'A fighter, looking to solve problems by smashing them, even when that might not be the right solution.',
  description: [
    'The Hammer is strong, tough, and looking for a deserving face to punch. Play the Hammer if you want to grapple with what force can and can’t solve.',
    'Brash, daring, forceful, foolhardy. The Hammer is a powerful fighter, a dangerous enemy, and a blunt object—they don’t really have that many additional strategies or approaches beyond “punch it hard.” They constantly face the difficulty of wanting to make the world better, to serve real justice and protect the innocent…all without a particularly versatile toolset.',
    'The Hammer is, at heart, a hero. They’re trying to do good! They’ve just found punching a useful or appropriate response to badness, and they got real good at it! But now that they’ve joined this group and are pursuing an important, larger purpose, they are encountering problems they can’t punch into submission—foes against whom combat isn’t even an option, let alone the right option.',
  ],
  principles: ['Force', 'Care'],
  principlesDescription: [
    'The Hammer’s struggle is between the principles of Force and Care. The Hammer is drawn between a desire to use overwhelming, direct force to enact change on the world, and a desire to be careful, to use the right application of will and strength at the right moment. Their Force principle is all about their desire to smash their way through problems and foes. Some obstacles can only be bulldozed! Some foes deserve to be destroyed! The Hammer is very good at punching their way to victory, and the Force principle represents that impulse.',
    'Their Care principle is all about their belief that the world is worth saving, protecting, and serving…and their desire to pull their punches so they don’t smash all of it. The use of Force has an unfortunate tendency to leave things broken and shattered—perhaps even to snap things when they could have been saved, redeemed, or rescued. Care is about the Hammer coming to understand and appreciate the need to prevent collateral damage, sometimes to give others a chance to make new decisions and better themselves instead of being broken.',
    'The Hammer tries to balance these two principles by finding when it’s time to hit hard, and when it’s time to pull a punch. Their Moment of Balance is all about successfully finding that equilibrium—punching hard to act as a wall and protect something worth protecting. Breaking and destroying isn’t the goal in that moment, so much as the goal is saving something they care about…but the Hammer is ready to hit harder than ever to do that.',
  ],
  stats: { creativity: 1, focus: -1, harmony: 0, passion: 1 },
  demeanorOptions: ['Playful', 'Blunt', 'Quiet', 'Loud', 'Excessive', 'Determined'],
  moves: [
    { name: 'Fueled by Anger', category: 'Playbook', subcategory: 'The Hammer', rollsWith: null, details: 'Mark Angry to use an additional basic or mastered technique when you advance and attack, even on a miss. While Angry is marked, take +1 ongoing to intimidate others.' },
    { name: 'Walls Can’t Hold Me', category: 'Playbook', subcategory: 'The Hammer', rollsWith: 'passion', details: 'When you rely on your skills and training to dangerously smash your way through walls or other obstacles, roll with Passion instead of Focus.' },
    { name: 'Punch Where It Matters', category: 'Playbook', subcategory: 'The Hammer', rollsWith: null, details: 'When you assess a situation, you can always ask, “Who or what here is most vulnerable to me?”, even on a miss. Remember to take +1 ongoing to act in accordance with the answer.' },
    { name: 'Comprehend Your Foe', category: 'Playbook', subcategory: 'The Hammer', rollsWith: 'creativity', details: 'When you defend and maneuver against a foe whose balance principle you know, you may mark fatigue to roll with Creativity instead of Focus.' },
    { name: 'Stand and Fight!', category: 'Playbook', subcategory: 'The Hammer', rollsWith: 'passion', details: 'When you provoke an NPC opponent into attacking you, roll with Passion. On a hit, they’re coming at you specifically. On a 10+, you’re ready for them; clear a condition or become Prepared. On a miss, they take advantage of your provocation to strike a blow where you least expect it.' },
  ],
  movesAdvice: [
    'For Fueled by Anger, remember that you can’t mark Angry if it’s already marked.',
    'For Walls Can’t Hold Me, “dangerously smashing your way through walls or other obstacles” means the most likely additional consequence of your action is collateral damage to others, or unintended additional destruction to your environment.',
    'For Punch Where It Matters, “Who here is most vulnerable to me?” doesn’t always have to refer specifically to combat — the GM might give you an answer pointing out other vulnerabilities, for example knowing their secret.',
    'For Comprehend Your Foe, you can name their balance principle in the moment, much like when you call them out; as long as you’re close enough, and the principle you name contains the same overarching idea as their principle, the move can trigger.',
    'For Stand and Fight!, you can use the move to start a whole new fight, or between exchanges to try to get an opponent to pay attention to you first and foremost.',
  ],
  feature: {
    name: 'Bringing Them Down',
    effect: [
      { text: 'You always have an adversary, one who represents the things you’re trying to smash through—tyranny, inequality, war; larger and more dangerous concepts that, to you at least, this one person embodies. Name your adversary, and choose a goal you have for them: capture them, discredit them, depose them, restrain them, expose them, or exile them.' },
      { text: 'Take -1 ongoing to plead with, trick, or guide and comfort your adversary.' },
      { text: 'You can change your adversary any time you mark a condition, or at the end of each session. When you do, choose an appropriate goal, and the GM shifts your balance twice to match your new adversary and your new goal. When you successfully accomplish your goal and defeat your adversary, take a growth advancement and choose a new adversary.' },
      { text: 'When you enter into a fight against your adversary, clear all fatigue and become Inspired. When you select any combat approach against your adversary, mark fatigue to roll with conditions marked instead of your normal stat.' },
    ],
  },
  featureMoves: [],
  // Adversary Goal is a closed list — the Core Book spells the six options
  // out directly in the feature text itself, unlike Adamant/Guardian's plain
  // "name a PC" choices.
  featureChoices: [
    { kind: 'freeform', key: 'adversary', label: 'Adversary', count: 1, prompt: 'Name your adversary.' },
    {
      kind: 'select',
      key: 'adversaryGoal',
      label: 'Adversary Goal',
      count: 1,
      options: ['Capture them', 'Discredit them', 'Depose them', 'Restrain them', 'Expose them', 'Exile them'],
    },
  ],
  startingTechnique: { name: 'Overpower', approach: 'attack', details: 'Throw a punch with all your weight behind it; mark 3-fatigue to inflict Stunned on an engaged foe.' },
  growth: 'Did you make progress towards your goal against your adversary?',
  growthDescription: 'The Hammer’s growth question drives them to always aim themselves at their adversary. “Make progress toward your goal” means they took some step to achieve their goal against their adversary, whether or not the end is in sight.',
  history: [
    'What injustice has driven you to use your strength for good?',
    'Who represents the kind of positive strength and force you want to embody?',
    'Who tried their best to teach you restraint, calm, and thoughtfulness?',
    'What fragile trinket or heirloom do you keep and protect?',
    'Why are you committed to this group or purpose?',
  ],
  connectionPrompts: [
    '___ has a way to solve problems with words instead of fists—it’s really impressive!',
    'I worry ___ won’t be able to hold their own when things get tough. I’m going to toughen them up!',
  ],
  momentOfBalance: 'You can knock down every wall in the world, but balance isn’t found in conquest and destruction. You know some walls need to stand to keep people safe. Tell the GM how you put yourself directly in the path of an inescapable threat to completely protect someone or something from harm.',
};
