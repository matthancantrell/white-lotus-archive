import type { Playbook } from './playbook';
import iconImg from '../../../../assets/playbooks/bold.jpg';
import backgroundImg from '../../../../assets/playbooks/background/bold.jpg';
import bannerImg from '../../../../assets/playbooks/banner/bold.jpg';

// Shared between the Feature section's bulleted list (below) and
// featureChoices' checklist (see FeatureChoice in ../playbook.ts), so the two
// can't drift apart.
const DRIVES = [
  'Successfully lead your companions in battle.',
  'Give your affection to someone worthy.',
  'Start a real fight with a dangerous master.',
  'Do justice to a friend or mentor’s guidance.',
  'Take down a dangerous threat all on your own.',
  'Openly outperform an authority figure.',
  'Save a friend’s life.',
  'Get a fancy new outfit.',
  'Earn the respect of an adult you admire.',
  'Openly call out a friend’s unworthy actions.',
  'Form a strong relationship with a new master.',
  'Stop a fight with calm words.',
  'Sacrifice your pride or love for a greater good.',
  'Defend an inhabited place from dire threats.',
  'Stand up to someone who doesn’t respect you.',
  'Make a friend live up to a principle they have neglected.',
  'Show mercy or forgiveness to a dangerous person.',
  'Stand up to someone abusing their power.',
  'Tame or befriend a dangerous beast or rare creature.',
  'Pull off a ridiculous stunt.',
];

// Verified against Demiplane Nexus's full Playbook page (Core Book).
export const bold: Playbook = {
  id: 'bold',
  iconColor: '#4a7c3a',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  // PLACEHOLDER keys — upload the matching objects to the MEDIA bucket under
  // `playbooks/` for these to resolve (see resolvePlaybookMedia in ../data).
  bannerImageKey: 'bold.jpg',
  secondaryImageKey: 'bold-secondary.jpg',
  name: 'The Bold',
  tagline: 'A charming adventurer who knows they’re greater than others assume, striving to show their worth.',
  description: [
    'The Bold fights to live up to their self-image and earn others’ trust and confidence. Play the Bold if you want to build your reputation and leadership skills.',
    'Self-doubting, boastful, clever, curious. The Bold is sure that they have it in them to be someone great—a great warrior, an exceptional artist, a master bender—even if they aren’t really there yet, even if others make sure that the Bold knows they aren’t there yet. They will be, someday. They just need to work up to it, okay? They’re working up to it!',
    'The Bold is trying to prove themselves. They may present to the world a confident, capable face, may even boast about their excellence—but that’s nearly always a facade, an attempt to sell themselves on their own skills as much as to convince anyone else. But at the same time, the Bold isn’t all talk—they are committed to making the world better, and especially for their friends, their family, and the people they care about.',
  ],
  principles: ['Loyalty', 'Confidence'],
  principlesDescription: 'The Bold struggles between the principles of Loyalty and Confidence. Their Loyalty principle emphasizes how much they are committed to others, putting the needs of their friends and companions far ahead of their own goals and feelings. Their Confidence principle emphasizes their belief in themselves, their own abilities, and their own status — a confident Bold takes action decisively, demands the respect due them, and makes their own decisions independently of others.',
  stats: { creativity: 1, focus: 1, harmony: 0, passion: -1 },
  demeanorOptions: ['Impatient', 'Sensitive', 'Affable', 'Enthusiastic', 'Talkative', 'Impetuous'],
  moves: [
    { name: 'Straight Shooter', category: 'Playbook', subcategory: 'The Bold', rollsWith: 'focus', details: 'When you tell an NPC the blunt, honest truth about what you really think of them and their plans, roll with Focus. On a hit, they’ll look upon your honesty favorably; they’ll answer a non-compromising question honestly and grant you a simple favor. On a 7–9, they also give you an honest assessment of how they see you; mark a condition. On a miss, you’re a bit too honest—they’re either furious or genuinely hurt.' },
    { name: 'You Missed Something', category: 'Playbook', subcategory: 'The Bold', rollsWith: 'focus', details: 'When you evaluate a friendly NPC’s plan to get something done, roll with Focus. On a hit, the GM tells you how you can drastically improve the chances of success; get it done, and they’re sure to come through on top. On a 7–9, the problems inherent in the plan are fairly serious; the NPC will be resistant to making the necessary changes. On a miss, something about the plan throws you for a loop; the GM tells you what obvious danger the NPC is ignoring…or what they’re hiding about their intent.' },
    { name: 'Here’s the Plan', category: 'Playbook', subcategory: 'The Bold', rollsWith: 'creativity', details: 'When you commit to a plan you’ve proposed to the group, roll with Creativity; take a -1 for each of your companions who isn’t on board. On a 10+, hold 2. On a 7–9, hold 1. You can spend your hold 1-for-1 while the plan is being carried out to overcome or evade an obstacle, create an advantage, or neutralize a danger; if any of your companions abandon you while the plan is underway, you must mark a condition. On a miss, hold 1, but your plan goes awry when you encounter surprising opposition.' },
    { name: 'Best Friend', category: 'Playbook', subcategory: 'The Bold', rollsWith: 'creativity', details: 'Your best friend is small, fuzzy, and dependable. Unlike all your other relationships, this one is simple and true. Whenever your pal could help you push your luck, mark fatigue to roll with Creativity instead of Passion. If your pet ever gets hurt, mark a condition.' },
    { name: 'Not Done Yet!', category: 'Playbook', subcategory: 'The Bold', rollsWith: null, details: 'Once per session, when you are taken out, shift your balance towards center to stay up for one more combat exchange. After that exchange ends, you become helpless, unconscious, or otherwise incapable of continuing on, and are taken out as normal.' },
  ],
  movesAdvice: [
    'For Best Friend, remember to name and describe your animal companion! They should be small—Pabu and Momo, not Naga or Appa. Your pet can help you push your luck whenever it makes sense; as long as you’re willing to pay the cost, they’ll be pretty handy much of the time! Just remember, if they help you they’re likely endangering themselves and might get hurt.',
    'For Here’s the Plan, “committing to a plan you’ve proposed to the group” means that plan is the one the group uses — you aren’t open to changing plans anymore. The hold generated by this move allows you to overcome or evade an obstacle, create an advantage, or neutralize a danger while you execute the plan; if a companion ditches your plan while you’re enacting it, you must mark a condition.',
    'For Not Done Yet!, remember that being taken out specifically refers to having all of your conditions marked and needing to mark another — it won’t help you if your balance tips over the edge, for example.',
    'For You Missed Something, whatever you perceive to improve the NPC’s plan is true, even if they don’t like what you have to say or it’s particularly difficult to accomplish.',
    'For Straight Shooter, just because they “look upon your honesty favorably,” they don’t have to actually like you — they just see your being honest as a kind of respectable action. Whatever they give you can’t cost them too much.',
  ],
  feature: {
    name: 'Legacy of Excellence',
    effect: [
      { text: 'You have dedicated yourself to accomplishing great, exciting deeds and becoming worthy of the trust others place in you. Choose four drives to mark at the start of play. When you fulfill a marked drive, strike it out, and mark growth or clear a condition. When your four marked drives are all struck out, choose and mark four new drives. When all drives are struck out, change playbooks or accept a position of great responsibility and retire from a life of adventure.' },
      { heading: 'Drives', text: '', list: DRIVES },
      { text: 'You and the GM should agree when you have fulfilled a drive, but ultimately the decision is more yours than the GM’s. Remember you can’t pick more drives until you’ve accomplished the initial four you chose. If you run out of drives, that’s a good sign it’s about time for you to switch playbooks!' },
    ],
  },
  featureMoves: [],
  featureChoices: [{ kind: 'select', key: 'drives', label: 'Drives', count: 4, options: DRIVES }],
  startingTechnique: { name: 'Tag Team', approach: 'defend', details: 'Work with an ally against the same foe; choose an engaged foe and an ally—double any fatigue, conditions, or balance shifts that ally inflicts upon that foe.' },
  growth: 'Did you express vulnerability by admitting you were wrong or that you should have listened to someone you ignored?',
  growthDescription: 'The Bold’s growth question focuses on the idea of learning by humbling themselves, admitting they were wrong and seeking help from others. They can still ultimately become more confident thanks to this help, but they have to humble themselves to seek aid first!',
  history: [
    'Why do you feel the need to prove yourself so badly?',
    'Who epitomizes the kind of big, bold figure you hope to be?',
    'Whose approval do you think you will never attain?',
    'What token or symbol do you wear to prove you are serious?',
    'Why are you committed to this group or purpose?',
  ],
  connectionPrompts: [
    '___ scoffs at me and my plans; one day I’ll show them what I can do.',
    '___ has a pretty good head on their shoulders; they’re a great sounding board for my ideas.',
  ],
  momentOfBalance: 'The greatest heroes of your age may have overwhelming confidence, but balance isn’t about pursuing greatness for the sake of greatness. You find a way to stand with your companions like no one else ever could. Tell the GM how you strike down an impossibly strong enemy or obstacle to protect your friends from harm as the best version of yourself.',
};
