import type { Playbook } from './playbook';
import iconImg from '../../../../assets/playbooks/idealist.jpg';
import backgroundImg from '../../../../assets/playbooks/background/idealist.jpg';
import bannerImg from '../../../../assets/playbooks/banner/idealist.jpg';

// Shared between the Feature section's bulleted list (below) and
// featureChoices' checklist (see FeatureChoice in ../playbook.ts), so the two
// can't drift apart.
const IDEALS = [
  'Always speak the truth.',
  'Always stand up to bullies.',
  'Always keep your promises.',
  'Never strike the first blow.',
  'Never deny a request for help.',
  'Never leave a friend behind.',
];

// Verified against Demiplane Nexus's full Playbook page (Core Book).
export const idealist: Playbook = {
  id: 'idealist',
  iconColor: '#5c8a8a',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  // PLACEHOLDER keys — upload the matching objects to the MEDIA bucket under
  // `playbooks/` for these to resolve (see resolvePlaybookMedia in ../data).
  bannerImageKey: 'idealist.jpg',
  secondaryImageKey: 'idealist-secondary.jpg',
  name: 'The Idealist',
  tagline: 'A survivor of some terrible harm, now struggling to maintain hope and a belief in the good of the world and others.',
  description: [
    'The Idealist has a past, full of suffering and tragedy, that strengthened their beliefs. Play the Idealist if you want to awaken the hope in everyone around you.',
    'Noble, pained, kind, committed. The Idealist has suffered some tragedy in their past, something terrible that left them with pain and anger…but also, with hope. Even in the face of tragedy, they felt and pursued a belief that people could be great, that the world could be better. The Idealist pursues that belief, taking action to help people, connect them, and solve problems.',
    'The Idealist still has an edge to them, however, and a capacity for unforgiveness. After all, something terrible happened to them, and it can be hard not to crave vengeance against those responsible. At their best, the Idealist can turn that drive into a push to change the world for the better. At their worst, it can drive the Idealist to extreme, dangerous action.',
  ],
  principles: ['Forgiveness', 'Action'],
  principlesDescription: 'The Idealist’s two principles of Forgiveness and Action represent these two poles. Their Forgiveness principle is all about their desire and ability to forgive, to move on past transgressions and offenses through empathy, understanding, and emotional catharsis. Their Action principle drives them to take action, to do things and change the world directly — sometimes expressed as vengeance, other times as directly making things better, destroying dangers, protecting the innocent, and making real, immediate change.',
  stats: { creativity: 0, focus: -1, harmony: 1, passion: 1 },
  demeanorOptions: ['Lonely', 'Compassionate', 'Joyful', 'Grieving', 'Earnest', 'Resolute'],
  moves: [
    { name: 'The Strength of Your Heart', category: 'Playbook', subcategory: 'The Idealist', rollsWith: null, details: 'When you use Seize a Position, foes must mark 2-fatigue to block your movement.' },
    { name: 'Whatever I Can', category: 'Playbook', subcategory: 'The Idealist', rollsWith: 'harmony', details: 'When you spend time talking to the locals about their problems, roll with Harmony. On a hit, you hear about the most significant and serious problem at hand; the GM will tell you who it affects and what is the cause. On a 10+, you can ask a follow up question about the problem or cause; you take +1 ongoing when you act on the answer. On a miss, you wind up creating a whole new problem with your questions and ideas.' },
    { name: 'Your Rules Stink', category: 'Playbook', subcategory: 'The Idealist', rollsWith: 'passion', details: 'When you stand up to an adult by telling them their rules are stupid, roll with Passion. On a hit, they are surprised by your argument; they must shift their balance or offer you a way forward, past the rules. On a 10+, both. On a miss, your efforts to move them only reveal how strongly they believe in the system—mark a condition as their resistance leaves you reeling.' },
    { name: 'It Doesn’t Belong to You!', category: 'Playbook', subcategory: 'The Idealist', rollsWith: 'harmony', details: 'When you secretly pocket something owned by someone undeserving, roll with Harmony. On a hit, you swipe something from them (your choice) without them noticing you took it. On a 7–9, the thing you took isn’t exactly what you thought it was; the GM will tell you how. On a miss, you grab the goods, but they notice—and pursue—as soon as you exit the scene.' },
    { name: 'Can’t Knock Me Down', category: 'Playbook', subcategory: 'The Idealist', rollsWith: 'harmony', details: 'When you are engaged in combat with superior opposition and openly refuse to back down or flee, roll with Harmony for the rest of the battle whenever you defend and maneuver; you cannot choose to escape the scene by using Seize a Position for the rest of the fight.' },
  ],
  movesAdvice: [
    'For The Strength of Your Heart, foes must mark 1-fatigue beyond the normal amount to block your movement.',
    'For Whatever I Can, you gain a better sense of the overall problem by talking to the locals who open up to you a bit — the problem you hear about genuinely is the most significant and serious problem, even if the people you’re talking to don’t quite frame it that way.',
    'For Your Rules Stink, you do have to stand up to an adult, specifically, even if you too are a young adult. If they offer you a way forward, past the rules, they remove an obstacle in your path or otherwise retreat.',
    'For It Doesn’t Belong to You!, be sure to ask for any interesting things around you when you think you’ve found a good target—someone undeserving of those things.',
    'For Can’t Knock Me Down, you trigger the change when you make clear, to everyone watching, how you won’t back down in the face of this obviously superior opposition. Once triggered, you cannot choose to escape the scene by using Seize a Position — you’re in it until someone loses their balance or is taken out, or until your opposition flees.',
  ],
  feature: {
    name: 'Never Turn My Back',
    effect: [
      { text: 'You’ve seen sadness and grief. You’re no stranger to loss and pain. But you know the world can be a better place. And nothing happens without good people fighting for what’s right…' },
      { text: 'You have a code—choose three ideals from the list to define it:', list: IDEALS },
      { text: 'When you live up to your ideals at a significant cost, someone who witnessed (or hears about) your sacrifice approaches you to affirm their allegiance to your group’s purpose; write their name down on the list of allies below.' },
      { text: 'Allies: you can always plead with these allies—they always care what you think; they always open up to you if you guide and comfort them; and you can call on them to live up to their principles as if you had rolled a 10+ by erasing their name from your list of allies.' },
    ],
  },
  featureMoves: [],
  featureChoices: [{ kind: 'select', key: 'ideals', label: 'Ideals', count: 3, options: IDEALS }],
  startingTechnique: { name: 'Disorient', approach: 'attack', details: 'Pummel an engaged foe with quick blows; mark 1-fatigue to shift their balance away from center.' },
  growth: 'Did you improve the lives of a community of average citizens or help an ordinary person with their problems?',
  growthDescription: 'The Idealist’s growth question points them always toward helping people, wherever they go. Be it a whole community of average citizens or an ordinary person, the Idealist grows when they aid the innocent, the less powerful, or the needy.',
  history: [
    'What tragedy befell you at a young age?',
    'Who do you hold most responsible for the tragedy? Why?',
    'Who helped you through your grief? What did they teach you?',
    'What symbol, heirloom, or mark do you carry to remind you of what you lost?',
    'Why are you committed to this group or purpose?',
  ],
  connectionPrompts: [
    'I recognize some of the pain I have felt inside of ___; I’m going to try to help them.',
    '___ frustrates me so much when they act without thinking about the consequences!',
  ],
  momentOfBalance: 'The pain of the world can be overwhelming, but balance brings peace. You bring everything around you to a stop—villains, arguments, disaster—and set the world right. Tell the GM how your compassionate actions end a conflict utterly and completely.',
};
