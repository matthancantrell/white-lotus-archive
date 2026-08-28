import type { StaticImageData } from 'next/image';

export interface Move { name: string; effect: string; }
export interface Feature { name: string; effect: string; }
export interface Stats { creativity: number; focus: number; harmony: number; passion: number; }

export interface Playbook {
  id: string;
  name: string;
  tagline: string;
  principles: [string, string];
  stats: Stats;
  moves: Move[];
  feature: Feature;
  growth: string;
  // Icon/background/banner art (plus an icon accent color), imported and
  // owned directly by each playbook's own file (see ./playbooks/*.playbook.ts)
  // — so adding, removing, or reordering entries in PLAYBOOKS can't shift
  // anyone else's visuals, and each playbook's own file is the one place to
  // look to change its art. The three image fields are deliberately
  // independent — a playbook's card icon, its card background, and its
  // detail-panel banner (StepPlaybook) aren't meant to be the same picture.
  iconColor: string;
  iconImage: StaticImageData;
  backgroundImage: StaticImageData;
  bannerFile: StaticImageData;
}

export interface Era { name: string; tag: string; accent: string; overview: string; avatarStatus: string; events: string; tone: string; tension: string; }
export interface Technique { name: string; effect: string; }
export interface Connection { name: string; note: string; }

export interface CharacterDraft {
  step: number;
  eraName: string | null;
  playbookId: string | null;
  trainingName: string | null;
  fightingStyle: string;
  statBonus: keyof Stats | null;
  balanceShift: number;
  selectedMoves: string[];
  selectedTechnique: string | null;
  name: string;
  portraitId: string | null;
  scopeText: string;
  groupFocusesText: string;
  look: string;
  background: string | null;
  demeanor: string | null;
  connections: Connection[];
  characterId?: string;
  status?: 'draft' | 'complete';
}

export const STEP_LABELS = ['Setup', 'Playbook', 'Training', 'Stats', 'Balance', 'Moves', 'Techniques', 'Identity', 'Connections', 'Growth'];

export const ERA_HEADER_LABEL: Record<string, string> = {
  'Avatar Roku': 'Roku Era',
  'Avatar Aang': 'Aang Era',
  'Avatar Kyoshi': 'Kyoshi Era',
  'Hundred Year War': 'Hundred Year War Era',
  'Avatar Korra': 'Korra Era',
  'Your own era': 'Custom Era',
};

export const PORTRAIT_COLORS = ['#3a6ea5', '#4a7c3a', '#b3492e', '#d9c98a', '#8a5ca8', '#5c8a8a', '#c98a4c', '#6f8a5c', '#a54e6e', '#4c7ac9', '#8a7c3a', '#3a9e8f', '#9e5c3a', '#5c6f9e', '#7c9e3a', '#9e3a6f', '#4c9e6f', '#9e6f4c', '#6f4c9e', '#3a5c9e', '#9e3a3a', '#3a9e3a', '#9e9e3a'];
export const PORTRAITS = PORTRAIT_COLORS.map((c, i) => ({ id: `p${i + 1}`, bg: `linear-gradient(155deg,${c},#1a3238)` }));

export const TOTAL_STEPS = STEP_LABELS.length;

export const INITIAL_DRAFT: CharacterDraft = {
  step: 1,
  eraName: null,
  playbookId: null,
  trainingName: null,
  fightingStyle: '',
  statBonus: null,
  balanceShift: 0,
  selectedMoves: [],
  selectedTechnique: null,
  name: '',
  portraitId: null,
  scopeText: '',
  groupFocusesText: '',
  look: '',
  background: null,
  demeanor: null,
  connections: [{ name: '', note: '' }],
};

export const ERAS: Era[] = [
  { name: 'Avatar Roku', tag: 'Fire Nation dawn', accent: 'text-[#e8927a]',
    overview: 'Roughly a hundred years before the war that will one day bear its name. The four nations trade, travel, and intermarry freely across borders that still feel more like neighborly lines than fronts. The Fire Nation is the most technologically advanced of the four, and its people take pride in that as a mark of progress and generosity rather than superiority \u2014 for now. Firelord Sozin sits the throne as a young, ambitious ruler with genuine affection for his oldest friend.',
    avatarStatus: 'Roku, a Fire Nation native, is the reigning Avatar, well into adulthood and firmly established as the world\u2019s spiritual authority. He is respected by every nation, including his own, and is one of the few people alive who can speak to Sozin as an equal rather than a subject.',
    events: 'This is the last stretch of true peace before everything changes. Sozin will soon reveal his vision of sharing the Fire Nation\u2019s prosperity with the world \u2014 by force, if the other nations refuse it. Roku\u2019s response to that vision, and his failure to stop what comes next, is the hinge the entire following century swings on. A story set here can play in the years, months, or final days before that hinge turns, watching trust curdle into betrayal in real time.',
    tone: 'Quiet tension under a peaceful surface \u2014 old friendships, national pride, and the first cracks of an ambition that hasn\u2019t yet turned to conquest.',
    tension: 'Loyalty to nation versus loyalty to friends, as the Fire Nation\u2019s isolationist ambitions start to harden into something darker.' },
  { name: 'Avatar Aang', tag: 'Hundred Year War\u2019s end', accent: 'text-[#9ec4e8]',
    overview: 'The war\u2019s hundredth and final year. The Fire Nation controls or threatens nearly every corner of the globe: the Air Nomads were wiped out generations ago, the Northern Water Tribe survived a siege at terrible cost, the Southern Water Tribe is a shadow of its former self, and vast stretches of the Earth Kingdom live under occupation. Ba Sing Se, the last great holdout, has just fallen.',
    avatarStatus: 'Aang, the last Airbender, vanished into the ice a century ago as a child and has only just been found and revived. He is undertrained, still mastering the basics of three of the four elements, and carrying the immense guilt of having been absent for everything that happened in his absence.',
    events: 'Sozin\u2019s Comet is roughly a season away \u2014 a celestial event that will supercharge every firebender\u2019s power and hand Firelord Ozai the means to finish the war permanently. Everything in this window of time drives toward that deadline: gathering allies, mastering bending, and finding a way to end a war whose architect is about to become nearly unstoppable.',
    tone: 'Urgent and hopeful \u2014 a ragtag found family racing against a ticking clock to end a war before it\u2019s too late.',
    tension: 'The weight of restoring balance to a broken world, and whether that balance can be won without becoming the very thing you\u2019re fighting.' },
  { name: 'Avatar Kyoshi', tag: 'Age of the Daofei', accent: 'text-[#a3c98a]',
    overview: 'Roughly three hundred years before Aang, in an Earth Kingdom so vast that the crown in Ba Sing Se governs it in name more than in practice. Whole provinces are run in practice by the Daofei \u2014 organized outlaw societies with their own codes, hierarchies, and territories \u2014 while local governors either cooperate with them or fall to them.',
    avatarStatus: 'For the first years of this period there is no Avatar at all: the previous Avatar, Kuruk, died young, and his successor Kyoshi grows up not even knowing she holds the role until she is a young woman \u2014 leaving a dangerous gap in the world\u2019s balance right as this era begins.',
    events: 'Without an Avatar to check them, ambitious daofei leaders and corrupt officials alike expand their reach. When Kyoshi does come into her power, her uncompromising sense of justice reshapes the region\u2019s balance of power for a generation, but the years before that reckoning are defined by the vacuum she eventually fills.',
    tone: 'Gritty and lawless \u2014 a frontier where justice is personal and reputation is currency.',
    tension: 'Order versus freedom, as bandits, lawkeepers, and everyone caught between them define what justice means where the government can\u2019t reach.' },
  { name: 'Hundred Year War', tag: 'A world at war', accent: 'text-[#d97a5c]',
    overview: 'Any point across the century of Fire Nation expansion, set apart from the specific events of Aang\u2019s journey \u2014 an occupied Earth Kingdom village decades into subjugation, a Water Tribe outpost bracing for raids, or a Fire Nation colony town built on land that was never its own.',
    avatarStatus: 'For all but the final year of this century, the Avatar is missing entirely \u2014 frozen in an iceberg and presumed dead. The world has had to learn to survive an unchecked Fire Nation without any hope that balance is coming to save it.',
    events: 'Every chapter here plays out under that same shadow: the Air Nomad genocide that opened the war, the fall of the Northern Air Temple, the long slow erosion of Earth Kingdom territory, and the everyday grind of occupation, rationing, and resistance that most people actually lived through while waiting for a hero who might never come.',
    tone: 'Somber and defiant \u2014 stories of survival, resistance, and the cost of a war that has already lasted generations.',
    tension: 'Survival versus resistance \u2014 how much you risk to fight back when simply enduring is already a victory.' },
  { name: 'Avatar Korra', tag: 'Age of industry', accent: 'text-[#9ec4e8]',
    overview: 'About seventy years after the war\u2019s end. Republic City, founded by Aang and Fire Lord Zuko as a shared home for all nations, has grown into a sprawling industrial metropolis of satomobiles, radio towers, and spirit-vine-powered energy \u2014 alongside deep inequality between its bending elite and nonbending underclass.',
    avatarStatus: 'Korra, a Southern Water Tribe native, is the current Avatar \u2014 already a confident, fully realized bender in most respects when this era opens, in sharp contrast to Aang\u2019s uncertain beginnings. Her struggles are less about learning to bend and more about learning to lead in a world that no longer looks to the Avatar as automatically as it once did.',
    events: 'This era is defined by upheavals the Avatar can\u2019t simply outmuscle: an anti-bending revolution, a civil war within the Water Tribes, an industrialist attempting to close the human world off from the Spirit World entirely, and the eventual, permanent opening of new spirit portals that reshape the physical world itself. Each crisis leaves the world visibly, structurally different afterward.',
    tone: 'Fast-paced and modern \u2014 political upheaval, radio broadcasts, and a spirit world newly pressing back into the physical one.',
    tension: 'Progress versus tradition, as industrialization, revolution, and old bending orders collide in a rapidly changing world.' },
  { name: 'Your own era', tag: 'Build a custom setting', accent: 'text-gold',
    overview: 'Not tied to a canon era? Build a timeframe and backdrop of your own with your group \u2014 anywhere on the Avatar world\u2019s timeline, or somewhere entirely off of it.',
    avatarStatus: 'Decide together whether an Avatar exists in your setting, who they are, and how present or absent they are from your story\u2019s events.',
    events: 'Work out the defining history of your setting as a table: what happened before your story starts, and what consequences of those events your characters are still living with.',
    tone: 'Whatever your table wants it to be \u2014 discuss it together before your first session.',
    tension: 'Decide with your GM what technology level, state of bending, and central conflicts will define your saga.' },
];

export const TRAININGS = ['Airbending', 'Waterbending', 'Earthbending', 'Firebending', 'Weapons', 'Technology', 'Hand-to-Hand'];

export const TECHNIQUES: Record<string, Technique[]> = {
  Airbending: [
    { name: 'Evasive Current', effect: 'Slip past an incoming attack by riding a cushion of air.' },
    { name: 'Updraft', effect: 'Launch yourself or an ally upward out of danger.' },
    { name: 'Air Shield', effect: 'Spin a defensive barrier of air around yourself.' },
    { name: 'Gale Push', effect: 'Knock an opponent back with a burst of wind.' },
  ],
  Waterbending: [
    { name: 'Wave Crash', effect: 'Pull water into a wave that sweeps opponents off their feet.' },
    { name: 'Healing Flow', effect: 'Use bent water to soothe fatigue or a minor injury.' },
    { name: 'Ice Lock', effect: 'Freeze water around a target\u2019s limbs to immobilize them.' },
    { name: 'Redirect', effect: 'Catch and redirect an incoming attack using water\u2019s flow.' },
  ],
  Earthbending: [
    { name: 'Stone Wall', effect: 'Raise a wall of earth for cover in an instant.' },
    { name: 'Seismic Sense', effect: 'Read the ground to sense movement and hidden threats.' },
    { name: 'Rock Slide', effect: 'Send a wave of rubble at your opponents.' },
    { name: 'Pillar Launch', effect: 'Propel yourself upward on a column of stone.' },
  ],
  Firebending: [
    { name: 'Flame Whip', effect: 'Lash out with a controlled arc of fire at range.' },
    { name: 'Breath of Fire', effect: 'Exhale a burst of flame to clear space around you.' },
    { name: 'Redirect the Spark', effect: 'Absorb and reroute an incoming bolt of lightning or fire.' },
    { name: 'Smoke Screen', effect: 'Cloud the area to cover an escape or approach.' },
  ],
  Weapons: [
    { name: 'Precise Strike', effect: 'Land a controlled hit that finds the gap in a guard.' },
    { name: 'Disarm', effect: 'Twist an opponent\u2019s weapon from their grip.' },
    { name: 'Parry and Riposte', effect: 'Turn a blocked attack into your own opening.' },
    { name: 'Thrown Weapon', effect: 'Hit a distant target with a thrown blade or projectile.' },
  ],
  Technology: [
    { name: 'Field Rig', effect: 'Jury-rig a device on the spot from whatever\u2019s on hand.' },
    { name: 'Overcharge', effect: 'Push a mechanism past its limits for one big effect.' },
    { name: 'Remote Trigger', effect: 'Set up a device to activate later, from a distance.' },
    { name: 'Quick Repair', effect: 'Patch damaged gear well enough to keep going.' },
  ],
  'Hand-to-Hand': [
    { name: 'Pressure Point', effect: 'Strike a nerve cluster to numb a limb or block a bender\u2019s chi.' },
    { name: 'Throw', effect: 'Use an opponent\u2019s own momentum to put them on the ground.' },
    { name: 'Iron Guard', effect: 'Hold a defensive stance that\u2019s nearly impossible to break.' },
    { name: 'Counter Grab', effect: 'Turn a grapple attempt back on your attacker.' },
  ],
};

export const BACKGROUNDS = ['Military', 'Outlaw', 'Monastic', 'Privileged', 'Urban', 'Wilderness'];
export const DEMEANORS = ['Eager', 'Uncertain', 'Solemn', 'Jocular', 'Haunted', 'Watchful'];

export const STANDARD_GROWTH = [
  'Did you learn something new about the world, a person, or yourself today?',
  'Did you fail to live up to your own standards, and did you notice?',
  'Did you help someone else grow, even in a small way?',
];

// Broken out into one file per playbook \u2014 see ./playbooks/*.playbook.ts \u2014 so
// each is easy to read and edit on its own instead of scrolling one giant array.
export { PLAYBOOKS } from './playbooks';
