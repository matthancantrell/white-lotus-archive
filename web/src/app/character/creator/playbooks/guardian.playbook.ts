import type { Playbook } from './playbook';
import iconImg from '../../../../assets/playbooks/guardian.jpg';
import backgroundImg from '../../../../assets/playbooks/background/guardian.jpg';
import bannerImg from '../../../../assets/playbooks/banner/guardian.jpg';

// Verified against Demiplane Nexus's full Playbook page (Core Book).
export const guardian: Playbook = {
  id: 'guardian',
  iconColor: '#b3492e',
  iconImage: iconImg,
  backgroundImage: backgroundImg,
  bannerFile: bannerImg,
  // PLACEHOLDER keys — upload the matching objects to the MEDIA bucket under
  // `playbooks/` for these to resolve (see resolvePlaybookMedia in ../data).
  bannerImageKey: 'guardian.jpg',
  secondaryImageKey: 'guardian-secondary.jpg',
  name: 'The Guardian',
  tagline: 'A protector and defender, devoted to others…perhaps to their own detriment; they have adopted one of their companions as their ward.',
  description: [
    'The Guardian defends someone close to them, steadfast and watchful. Play the Guardian if you want to be the first to see danger coming and the last line of defense.',
    'Tough, cynical, protective, devoted. The Guardian is a protector of one other person—their ward—utterly determined to keep them safe and sound against all threats and dangers. Whether or not that person wants protection is not always as important to the Guardian as it should be!',
    'The Guardian knows how dangerous the world can be and is determined to keep someone else safe from that danger. It’s an altruistic impulse and a selfish one at the same time—they want to help someone, protect them…but that desire comes from feeling no one else is trustworthy except the Guardian.',
  ],
  principles: ['Self-Reliance', 'Trust'],
  principlesDescription: 'The Guardian’s struggle is between the principles of Self-Reliance and Trust. Their Self-Reliance principle is all about a mistrust of others and the world — very capable and confident, but also likely cynical, doubting others and liable to handle any problem by themselves. Their Trust principle is about putting faith in others, letting them handle problems without the Guardian’s presence or aid — knowing their companions have their back, but liable to trust to the point of complacency, missing important details a more Self-Reliant Guardian would pick up on.',
  stats: { creativity: -1, focus: 1, harmony: 0, passion: 1 },
  demeanorOptions: ['Harsh', 'Serious', 'Polite', 'Quiet', 'Suspicious', 'Cautious'],
  moves: [
    { name: 'Suspicious Mind', category: 'Playbook', subcategory: 'The Guardian', rollsWith: 'focus', details: 'When you watch a person carefully to figure them out, roll with Focus. On a 7–9, hold 1. On a 10+, hold 2. Spend your hold, 1-for-1, to ask their player questions while you observe or interact with them; they must answer honestly: Are you telling the truth? What are you truly feeling? What do you really want right now? What are you worried about? What are you about to do?' },
    { name: 'Badge of Authority', category: 'Playbook', subcategory: 'The Guardian', rollsWith: 'passion', details: 'You have some badge or symbol of authority from your background, something that makes you someone to be listened to, if not well-liked or entirely respected. When you give an NPC an order based on that authority and their recognition of it, roll with Passion. On a hit, they do what you say. On a 7–9, they choose 1: they do it, but in lackluster fashion; they say they need something first to be able to do it; they do it, but they’re going to talk to your superiors. On a miss, the authority of your badge doesn’t sway them; they do as they please and you take -1 forward against them.' },
    { name: 'Catch a Liar', category: 'Playbook', subcategory: 'The Guardian', rollsWith: null, details: 'When you are suspicious of someone, write their name here. You cannot write another until you have made them admit their guilt and misdeeds in front of an audience, or until you no longer seek to uncover their secrets. When you expose that person’s lies or wrong-doing, clear all your fatigue and up to two conditions. When you try to intimidate them into admitting their real crimes by using actual evidence, you can eliminate one additional option from the list on any hit before they choose.' },
    { name: 'Furrowed Brow', category: 'Playbook', subcategory: 'The Guardian', rollsWith: null, details: 'Take +1 Focus (max +3).' },
    { name: 'Martyr Complex', category: 'Playbook', subcategory: 'The Guardian', rollsWith: null, details: 'When you have a total of 8 between conditions marked, highest principle, and fatigue marked, take +1 ongoing to all moves.' },
  ],
  movesAdvice: [
    'For Suspicious Mind, you get hold, which you can spend to ask questions from the list throughout your interaction or observation — but once you stop talking to them or watching them, for example if the scene changes, you lose your remaining unspent hold.',
    'For Badge of Authority, make sure to pick what your badge is physically and who recognizes it — you can only trigger this move if they recognize your authority; someone who doesn’t care about your criminal blue rose won’t listen to your orders! On a 7–9, they still follow your command on all options, but it always comes with a complication.',
    'For Catch a Liar, if the line is blank, you can always write in a name as soon as you decide you’re suspicious of them. “Exposing that person’s lies or wrong-doing” means providing evidence to a third party — it doesn’t guarantee they’ll admit their guilt, which is where intimidating them with real evidence can come in handy.',
    'For Martyr Complex, remember you take a +1 ongoing to everything — but you must have a total of eight between your highest principle, marked conditions, and marked fatigue. To really take advantage of this move, you’ve got to live on the edge of catastrophe!',
  ],
  feature: {
    name: 'Protector’s Burden',
    effect: [
      { text: 'You take it upon yourself to protect the people around you in general, but you have someone in particular you keep safe. Name your ward (choose a PC to start).' },
      { text: 'When they mark a condition in front of you, mark fatigue or a condition. Your ward can always call on you to live up to your principle—without shifting their balance away from center—and they take +1 to do it.' },
      { text: 'At the beginning of each session, roll, taking +1 for each yes: Do you believe your ward listens to you more often than not? Have you recently protected them or helped them with a problem? Is there an immediate threat to your ward that you are aware of? On a 7–9, hold 1. On a 10+, hold 2. At any time, spend the hold to take a 10+ without rolling on any move to defend or protect them, track them down even if they are hidden or avoiding you, or figure out what they’re up to without them knowing.' },
      { text: 'On a miss, hold 1, but you’re drifting apart on different paths — by the end of the session, you must choose to recommit to guarding your ward (shift your balance twice toward Self-Reliance) or trust them enough to let them go (shift your balance twice toward Trust and switch your ward to a new person). You may also switch your ward if they leave play or are no longer present for some reason.' },
    ],
  },
  featureMoves: [],
  featureChoices: [{ kind: 'freeform', key: 'ward', label: 'Ward', count: 1, prompt: 'Name your ward (choose a PC to start).' }],
  startingTechnique: { name: 'Divert', approach: 'defend', details: 'Step into the way of blows intended for allies; when any ally within reach suffers a blow this exchange, you can suffer it for them. If you also use Retaliate this exchange, deal an additional 1-fatigue each time.' },
  growth: 'Did you pursue a desire or goal of your own, outside of protecting others?',
  growthDescription: 'The Guardian’s growth question is about edging toward a place of self-development, self-awareness—not just self-reliance, but a belief that takes the Guardian past only protecting people and toward making decisions for themselves.',
  history: [
    'What pushed you to assume responsibility for the people you care about?',
    'Whom have you protected for so long…but maybe doesn’t need you anymore?',
    'Who used to be in your circle of trust before they betrayed you?',
    'What tattered garment or adornment reminds you of those you protect…or failed to protect?',
    'Why are you committed to this group or purpose?',
  ],
  connectionPrompts: [
    '___ is my ward—they need me to have their back, end of story.',
    '___ looks like they’re more than capable without my help; I’m glad some of us can take care of ourselves.',
  ],
  momentOfBalance: 'You’ve sworn to protect the people you care about, but balance is about finding your own place in the world as well. You know what you’re capable of accomplishing, and you step up to show the world your unique strength. Tell the GM how you put your own life on the line to defeat a villain or danger that seems unstoppable.',
};
