import type { Playbook } from './playbook';
import iconImg from './../../../../assets/playbooks/foundling.jpg';
import backgroundImg from '../../../../assets/playbooks/background/avatarlegends-bg.jpg';
import bannerImg from '../../../../assets/playbooks/banner/foundling.jpg';

const WISDOMQUESTIONS = [
  "Is your Unity greater than zero?",
  "Have you studied this technique before?",
  "Has someone used this technique against you in real battle?"
];

const BONDS = [
  "They accept you and cease hostility / antagonism.",
  "They grow to like you (if they already accept you). They agree to help you with a problem.",
  "They reveal their background. You learn their principle.",
  "They offer solace. You clear a condition.",
  "They reveal a vulnerability. You become Prepared to deal with them."
];

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
    "The Foundling's two principles, Unity and Heritage, reflect their struggle to define themselves while finding a place to belong.",
    "The Foundling's Unity principle represents their desire to combine their heritages, to find the connections and similarities that bring their two home cultures into one identity. Leaning toward this principle means the Foundling is coming to see themselves as something new, a truly innovative combination of two ways of being.",
    "The Foundling's Heritage principle represents the Foundling's interest in and devotion to their heritage. Commitment to either background is represented by Heritage — the principle represents how the Foundling is embracing the unique and specific aspects of one of their cultures, no matter which culture they embrace. But identifying with either heritage too strongly tends to preclude identifying easily with the other — raising Heritage usually means picking one of the two identities to focus on. Finding a way to mesh two disparate identities together is much more about Unity, while being interested in and proud of either tradition individually is about Heritage.",
    "The Foundling's Moment of Balance allows them to embrace each of their identities in full, uniting them without diminishing either. In that moment, the Foundling sees how all things connect, and their two aspects can retain their own special identities but act in perfect concert with the other. The Foundling sees that the divisions are false — everything is connected, and they can be proud of all their facets. And with that new understanding, they combine their trainings from both heritages to perform astonishing feats."
  ],
  stats: { creativity: 1, focus: -1, harmony: 1, passion: 1 },
  demeanorOptions: ['Caring', 'Dedicated', 'Friendly', 'Modest', 'Respectful', 'Shy'],
  moves: [
    { name: 'Empty Your Mind', category: 'Playbook', subcategory: 'The Foundling', rollsWith: 'null', details: 'You flow and adapt, formless and shapeless. During an exhange, after you roll the stance move, you can mark 1-fatigue to select a basic technique from a different approach than the one youu chose. (You must still pay all other costs of that technique.)' },
    { name: 'Building Bridges', category: 'Playbook', subcategory: 'The Foundling', rollsWith: 'harmony', details: "When you try to calm an immediate conflict between 2 NPCs, remind them what they have in common and roll with Harmony. On hit, they come to terms for now. They won't pursue their conflict until an outside influence reignites it or at least a day passes. On a 10+you have an opportunity for them to put aside their conflict for good. The GM will tell you what you must do. On a miss, you inadvertently highlight their differences and fan the conflict. You cannot use this move on them again." },
    { name: 'Martial Sensitive', category: 'Playbook', subcategory: 'The Foundling', rollsWith: 'harmony', details: "You are good at reading people's intentions and gestures in the heat of battle. When you 'defend and manuever' against a foe whose principle you know, mark fatigue to roll with Harmony instead of Focus." },
    { name: 'Trusty Talisman', category: 'Playbook', subcategory: 'The Foundling', rollsWith: 'harmony', details: "You have a specific item which you believe is crucial to your training and abilities. You can roll with Harmony instead of Focus when you use the item to 'rely on your skills and training'. If you miss, the item is damaged and needs repairs. If the item is damaged again before repaired, it is destroyed. You are impaired without it until someone helps you overcome the loss. Choose a new move to replace this one when you finally move on." },
    { name: 'Things in Common', category: 'Playbook', subcategory: 'The Foundling', rollsWith: null, details: "When you 'guide and comfort' someone who shares a training or a background with you by talking about what you have in common, on a hit, you become Inspired. If they embrace your guidance and comfort, they become Inspired as well." },
  ],
  movesAdvice: [
    "No advice just yet! Check back later!"
  ],
  // Double Heritage: two trainings and two Mastered techniques at creation.
  startingTrainingCount: 2,
  startingMasteredCount: 2,
  feature: {
    name: 'Double Heritage',
    effect: [
      { text: "You are a child of two cultures. At character creation, choose two trainings and two backgrounds that represent your two heritages. You also start play with two mastered techniques instead of just one." },
      { heading: "Wisdom From Many Places", text: "You can study with a master to learn techniques from any training and adapt them to your own. When you start learning a technique from a training you don't have with a willing teacher, roll. Take +1 for each time you answer yes to the questions below. On a hit, you learn the technique and shift your balance towards Unity. On a 7-9, learning was trying. Mark a condition and write its name by the technique. You cannot use the technique if you have that condition marked. When this technique is mastered, erase the condition's name. On a miss, you struggle to incorporate the lesson and must find a new master.", list: WISDOMQUESTIONS },
      { heading: "Cultural Bonds", text: "When you try to connect to an NPC with a shared culture, roll with Heritage. On hit, they see you. Shift your balance towards Heritage. On a 7-9, choose one from below. On 10+, choose two. On miss, you mix up your heritages in a terrible way, making the NPC mock you or get offended. Mark a condition and shift your balance away from Heritage.", list: BONDS }
    ],
  },
  featureMoves: [],
  featureChoices: [],
  startingTechnique: { 
    name: 'Feel The Flow', 
    approach: 'evade', 
    details: "You take pause to feel the flow of battle and study the way your opposition fights. You become 'Favored'. If they share a training with you, learn their principle. If you know their principle, clear 1-fatigue (even if they do not share the same training)." 
  },
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
