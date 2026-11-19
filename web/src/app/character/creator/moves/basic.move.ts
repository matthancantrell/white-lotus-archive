import type { Move } from '@/types';

// Core Book basic-move list — verified against Demiplane Nexus with Source
// filtered to Core Book. A null rollsWith covers moves with no roll at all.
// 'Training' is the only Basic move with a non-null subcategory.
export const basic: Move[] = [
  { 
    name: 'Assess a Situation',
    category: 'Basic', 
    subcategory: null,
    rollsWith: 'creativity',
    details: `When you assess a situation, roll with **CREATIVITY**.
    \n On a 7-9, ask one question.
    \n On a 10+, ask two. Take +1 ongoing when acting on the answers.
    \n- What here can I use to __________?
    \n- Who or what is the biggest threat?
    \n- What should I be on the lookout for?
    \n- What's my best way in / out / through?
    \n- Who or what is in the greatest danger?
    `
  },
  {
    name: 'Guide and Comfort',
    category: 'Basic', 
    subcategory: null, 
    rollsWith: 'harmony',
    details: `When you try to honestly guide and comfort another person, roll with **HARMONY**. On a hit, they choose one:
    \n- They embrace your guidance and comfort. They may clear a condition or 2-fatigue, and you may ask one question. They *must* answer honestly.
    \n- They shut you down. They inflict a condition on you, and you shift their balance in response.
    \n On a 10+, if they embrace your guidance and comfort, you may also shift their balance.
    `
  },
  {
    name: 'Intimidate',
    category: 'Basic',
    subcategory: null,
    rollsWith: 'passion',
    details: `When you intimidate an NPC into backing off or giving in, roll with **PASSION**.
    \n On a hit, they choose one.
    \n On a 10+, you first decide one option they cannot choose.
    \n- They run to escape or get backup.
    \n- They back down but keep watch.
    \n- They give in with a few stipulations.
    \n- They attack you, but off-balance. The GM marks a condition on them.
    `
  },
  {
    name: 'Plead',
    category: 'Basic',
    subcategory: null,
    rollsWith: 'harmony',
    details: `When you plead with an NPC who cares what you think for help, support, or action, roll with **HARMONY**.
    \n On a 7-9, they need something more — evidence that this is the right course, guidance in making the right choices, or resources to aid them — before they act. The GM tells you what they need.
    \n On a 10+, they act now and do their best until the situation changes.
    `
  },
  {
    name: 'Push Your Luck',
    category: 'Basic',
    subcategory: null,
    rollsWith: 'passion',
    details: `When you push your luck in a risky situation, say what you want to do and roll with **PASSION**.
    \n On a hit, you do it, but it costs you to scrape by. The GM tells you what it costs you. On a 10+, your boldness pays off despite the cost. The GM tells you what other lucky opportunity falls in your lap.
    `
  },
  {
    name: 'Rely On Your Skills And Training',
    category: 'Basic',
    subcategory: null,
    rollsWith: 'focus',
    details: `When you rely on your skills and training to overcome an obstacle, gain new insight, or perform a familiar custom, roll with **FOCUS**.
    \n On a hit, you do it.
    \n On a 7-9, you do it imperfectly — the GM tells you how your approach might lead to unexpected consequences. Accept the consequences or mark 1-fatigue.`
  },
  {
    name: 'Trick',
    category: 'Basic',
    subcategory: null,
    rollsWith: 'creativity',
    details: `When you trick an NPC, roll with **CREATIVITY**.
    \n On a hit, they fall for it and do what you want for the moment.
    \n On a 7-9, pick one.
    \n On a 10+, pick two.
    \n- They stumble. Take +1 forward to acting against them.
    \n- They act foolishly. The GM tells what additional opportunity they give you.
    \n- They overcommit. They are deceived for some time.
    `
  },
  {
    name: 'Help',
    category: 'Basic',
    subcategory: null,
    rollsWith: null,
    details: `When you take appropriate action to help a companion, mark 1-fatigue to give them a +1 to their roll (after the roll). 
    \n You cannot help in a combat exchange in this way.
    `
  },
  {
    name: 'Stance Move',
    category: 'Basic',
    subcategory: null,
    rollsWith: null,
    details: `Choosing an approach only declares the basic style someone uses in an exchange — everyone still has to choose specific techniques to use.
    \n NPCs can use a number of techniques equal to their balance rating +1. 
    \n To determine how many techniques a player combatant can use, they make the stance move when resolving approaches: 
    \n Each player rolls with the appropriate stat, based on the approach they chose.
    \n- Defend and maneuver rolls with **FOCUS**.
    \n- Advance and attack rolls with **PASSION**
    \n- Evade and observe rolls with **CREATIVITY** or **HARMONY**, the player's choice.
    `
  },
  {
    name: 'Training',
    category: 'Basic',
    subcategory: 'Advancement',
    rollsWith: null,
    details: `When you spend time with a teacher learning and training in a new technique, roll with modifiers from the following questions:
    \n- Is your balance in line with your center or are you free of conditions? If yes, take +1.
    \n- Do you and your teacher share at least one background? If yes, take +1.
    \n- Does your teacher agree with your reasons for training and learning? If no, take -1.
    \n- Is the technique easy to grasp based on your current training, experience, and skills? If no, take -1.
    \n On a hit, you learn the technique, and your master shifts your balance.
    \n On a 10+, you learn it with ease, and it takes as little time as possible.
    \n On a 7–9, it either takes more time than normal, or you must mark two conditions. 
    \n On a miss, you can’t learn the technique yet because you need another lesson before you can grasp its full use. Your master will tell you what additional task you must undertake to put yourself into the correct state of mind. Do it, and you learn the technique.
    `
  },
];
