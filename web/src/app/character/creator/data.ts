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
  // Four history questions answered in the Concept step, specific to this playbook.
  history: string[];
  // Auto-granted at Mastered when this playbook is confirmed (see StepTechniques), and
  // the passage shown in Growth's "Moment of Balance" tab once unlocked.
  // PLACEHOLDER — replace with the Core Book (Appendix A) text for this playbook.
  startingTechnique: { name: string; approach: Approach; effect: string };
  momentOfBalance: string;
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
export interface Training { name: string; desc: string; }
// The three approaches a technique can take — shown as a label, e.g. "Waterbending · Defend & Maneuver".
export type Approach = 'attack' | 'defend' | 'evade';
export interface Technique { name: string; training: string; approach: Approach; effect: string; rare?: boolean; groupOnly?: boolean; }
export type TechniqueLevel = 'L' | 'P' | 'M';
export interface Connection { name: string; note: string; }
export interface Background { name: string; desc: string; detail: string; knows: string; }

export interface CharacterDraft {
  step: number;
  eraName: string | null;
  playbookId: string | null;
  trainingName: string | null;
  fightingStyle: string;
  statBonus: keyof Stats | null;
  balanceShift: number;
  selectedMoves: string[];
  // Keyed by technique name; a technique with no entry hasn't been picked at all.
  techniqueLevels: Record<string, TechniqueLevel>;
  name: string;
  // A key into ICONS below, not a URL — see IconOption for why.
  iconId: string | null;
  scopeText: string;
  groupFocusesText: string;
  hometown: string;
  look: string;
  backgrounds: string[];
  demeanor: string;
  history: string[];
  connections: Connection[];
  // Set once saved via StepGrowth's "Save character to my archive"; unset means
  // this draft only exists in the current session and hasn't reached the DB yet.
  characterId?: string;
}

export const STEP_LABELS = ['Setup', 'Playbook', 'Concept', 'Training', 'Balance', 'Techniques', 'Connections', 'Growth'];

export const ERA_HEADER_LABEL: Record<string, string> = {
  'Avatar Roku': 'Roku Era',
  'Avatar Aang': 'Aang Era',
  'Avatar Kyoshi': 'Kyoshi Era',
  'Hundred Year War': 'Hundred Year War Era',
  'Avatar Korra': 'Korra Era',
  'Your own era': 'Custom Era',
};

export interface IconOption { id: string; url: string; }
// `id` doubles as the R2 object key under `icons/`, extension included (e.g.
// "aang-1.png") — served only through api/src/routes/media.ts, never a raw
// bucket URL. See api/schema/0001_characters.sql for why characters store
// this id rather than a URL.
// Some of these ("the-<playbook>-1.jpg") are also meant to become that
// playbook's card icon (Playbook.iconImage in ./playbooks/*.playbook.ts) —
// not wired up yet, deliberately held off for now.
const ICON_IDS: string[] = [
  'pro-bender-1.jpg',
  'pro-bender-2.jpg',
  'the-adamant-1.jpg',
  'the-adamant-2.jpg',
  'the-bold-1.jpg',
  'the-bold-2.jpg',
  'the-destined-1.jpg',
  'the-destined-2.jpg',
  'the-elder-1.jpg',
  'the-elder-2.jpg',
  'the-foundling-1.jpg',
  'the-foundling-2.jpg',
  'the-guardian-1.jpg',
  'the-guardian-2.jpg',
  'the-hammer-1.jpg',
  'the-hammer-2.jpg',
  'the-icon-1.jpg',
  'the-icon-2.jpg',
  'the-idealist-1.jpg',
  'the-idealist-2.jpg',
  'the-pillar-1.jpg',
  'the-pillar-2.jpg',
  'the-prodigy-1.jpg',
  'the-prodigy-2.jpg',
  'the-razor-1.jpg',
  'the-razor-2.jpg',
  'the-rogue-1.jpg',
  'the-rogue-2.jpg',
  'the-successor-1.jpg',
  'the-successor-2.jpg',
  'cabbage-man.jpg',
];
export const ICONS: IconOption[] = ICON_IDS.map((id) => ({
  id,
  url: `${process.env.NEXT_PUBLIC_API_URL}/media/icons/${id}`,
}));
export function resolveIcon(id: string | null): IconOption | null {
  return id ? ICONS.find((i) => i.id === id) ?? null : null;
}

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
  techniqueLevels: {},
  name: '',
  iconId: null,
  scopeText: '',
  groupFocusesText: '',
  hometown: '',
  look: '',
  backgrounds: [],
  demeanor: '',
  history: [],
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

export const TRAININGS: Training[] = [
  { name: 'Waterbending', desc: 'Flowing, adaptive, and defensive \u2014 redirecting force, healing, and ice.' },
  { name: 'Earthbending', desc: 'Grounded and patient, waiting for the moment to strike with overwhelming weight.' },
  { name: 'Firebending', desc: 'Aggressive and direct, fueled by breath and drive; reach and raw power.' },
  { name: 'Airbending', desc: 'Evasive and free, turning aside attacks and controlling space without harm.' },
  { name: 'Weapons', desc: 'Any martial discipline \u2014 blades, staves, thrown weapons, chi-blocking, bare hands.' },
  { name: 'Technology', desc: 'Gadgets, machines, and clever engineering standing in for bending.' },
];

export const APPROACH_LABEL: Record<Approach, string> = { defend: 'Defend & Maneuver', attack: 'Advance & Attack', evade: 'Evade & Observe' };

// Available to every character regardless of training. A playbook's own starting
// technique (see each playbook's `startingTechnique`) is shown alongside these, not
// listed here, so it isn't duplicated for playbooks that happen to share a name.
// PLACEHOLDER catalog \u2014 replace with the Core Book (Appendix A) technique list.
export const UNIVERSAL_TECHNIQUES: Technique[] = [
  { name: 'Pinpoint Aim', training: 'Universal', approach: 'attack', effect: 'Wait for the perfect moment; mark 1-fatigue to become Prepared and use an advance & attack technique.' },
  { name: 'Ready Stance', training: 'Universal', approach: 'defend', effect: 'Set your feet and read the fight; you become Prepared and shrug off the next attempt to knock you down.' },
  { name: 'Feint', training: 'Universal', approach: 'evade', effect: 'Sell a false opening; a foe commits and is Impaired against your next action.' },
  { name: 'Press the Advantage', training: 'Universal', approach: 'attack', effect: 'Against an Impaired or Stunned foe, inflict 1 extra fatigue.' },
  { name: 'Retreat', training: 'Universal', approach: 'evade', effect: 'Break contact cleanly; leave the exchange and take no consequences from foes you were engaged with.' },
  { name: 'Group Up', training: 'Universal', approach: 'defend', groupOnly: true, effect: 'You and every adjacent ally become Prepared together.' },
];

// PLACEHOLDER catalog \u2014 replace with the Core Book (Appendix A) technique list.
export const TECHNIQUES: Technique[] = [
  { name: 'Water Whip', training: 'Waterbending', approach: 'attack', effect: 'Lash a foe with a tendril of water; they mark 1-fatigue and are knocked off-balance.' },
  { name: 'Flow as Water', training: 'Waterbending', approach: 'defend', effect: 'Mark 1-fatigue to shift to a new position and impair a foe you slip past.' },
  { name: 'Ice Prison', training: 'Waterbending', approach: 'attack', effect: 'Freeze a foe in place; they are Trapped until they break free.' },
  { name: 'Healing Waters', training: 'Waterbending', approach: 'evade', rare: true, effect: 'Soothe a wound; you or an ally clears 1-fatigue.' },
  { name: 'Bloodbending', training: 'Waterbending', approach: 'attack', rare: true, effect: 'Under a full moon, seize control of a foe\u2019s body for one exchange. Forbidden nearly everywhere.' },
  { name: 'Stone Wall', training: 'Earthbending', approach: 'defend', effect: 'Raise a barrier of earth; you and an adjacent ally are Prepared against the next attack.' },
  { name: 'Seismic Sense', training: 'Earthbending', approach: 'evade', effect: 'Read the ground; learn a foe\u2019s position and next intention even if you cannot see them.' },
  { name: 'Rock Slide', training: 'Earthbending', approach: 'attack', effect: 'Send a wave of rubble at foes in a line; each marks 1-fatigue or is knocked down.' },
  { name: 'Metalbending', training: 'Earthbending', approach: 'attack', rare: true, effect: 'Bend refined metal as if it were earth; bypass metal armor or bind a foe in their own gear.' },
  { name: 'Lavabending', training: 'Earthbending', approach: 'attack', rare: true, effect: 'Melt stone into lava; create an impassable hazard or force a foe to mark 2-fatigue.' },
  { name: 'Flame Whip', training: 'Firebending', approach: 'attack', effect: 'Strike a foe at range with a controlled arc of fire.' },
  { name: 'Breath of Fire', training: 'Firebending', approach: 'defend', effect: 'Exhale a burst of flame to clear space; foes engaged with you must mark 1-fatigue or back off.' },
  { name: 'Jet Stepping', training: 'Firebending', approach: 'evade', effect: 'Propel yourself with bursts of flame to reposition anywhere in the scene.' },
  { name: 'Lightning Generation', training: 'Firebending', approach: 'attack', rare: true, effect: 'Separate the energies and release lightning; a foe marks 3-fatigue or is taken out.' },
  { name: 'Lightning Redirection', training: 'Firebending', approach: 'defend', rare: true, effect: 'Catch lightning through your body and release it elsewhere, unharmed.' },
  { name: 'Air Scooter', training: 'Airbending', approach: 'evade', effect: 'Ride a sphere of air to move quickly across any terrain.' },
  { name: 'Air Shield', training: 'Airbending', approach: 'defend', effect: 'Spin a barrier of wind; the next attack against you is deflected.' },
  { name: 'Gale Push', training: 'Airbending', approach: 'attack', effect: 'Knock a foe back with a burst of wind, moving them where you choose.' },
  { name: 'Flight', training: 'Airbending', approach: 'evade', rare: true, effect: 'Untethered flight without a glider; only for those who have let go of earthly attachment.' },
  { name: 'Precise Strike', training: 'Weapons', approach: 'attack', effect: 'Land a hit that finds the gap in a guard; the foe marks 1-fatigue and a condition.' },
  { name: 'Disarm', training: 'Weapons', approach: 'attack', effect: 'Twist a foe\u2019s weapon from their grip; they are Impaired until they recover it.' },
  { name: 'Parry and Riposte', training: 'Weapons', approach: 'defend', effect: 'Turn a blocked attack into your own opening; take +1 forward.' },
  { name: 'Chi Blocking', training: 'Weapons', approach: 'attack', rare: true, effect: 'Strike a bender\u2019s pressure points; they cannot bend for the rest of the exchange.' },
  { name: 'Pincer Movement', training: 'Weapons', approach: 'defend', groupOnly: true, effect: 'You and an ally flank a foe together; both take +1 forward against them.' },
  { name: 'Field Rig', training: 'Technology', approach: 'evade', effect: 'Jury-rig a device from whatever is on hand to solve a problem this exchange.' },
  { name: 'Smoke Bomb', training: 'Technology', approach: 'defend', effect: 'Fill the area with smoke; foes are Impaired trying to target you or an ally.' },
  { name: 'Electrified Glove', training: 'Technology', approach: 'attack', effect: 'Deliver a stunning shock; the foe is Stunned and marks 1-fatigue.' },
  { name: 'Mecha Tank', training: 'Technology', approach: 'attack', rare: true, groupOnly: true, effect: 'Pilot a mechanized suit; while inside, ignore the first 2-fatigue each exchange.' },
];

export const ADVANCEMENTS = [
  'Take a new move from your playbook',
  'Take a new move from another playbook',
  'Raise a stat by +1 (maximum of +2 in any given stat)',
  'Shift your center one step',
  'Unlock your Moment of Balance',
];

export const BACKGROUNDS: Background[] = [
  { name: 'Military', desc: 'Raised in or around an army, navy, or city guard.',
    detail: 'Discipline, rank, and orders shaped you. You may have served yourself, followed a parent from post to post, or grown up in a garrison town where soldiers outnumbered farmers. You know how a chain of command works and how it breaks.',
    knows: 'Drills and formations, military history, how to read a uniform, who commands where, and what a soldier will and won’t do for a cause.' },
  { name: 'Monastic', desc: 'Grew up in a temple or spiritual community.',
    detail: 'Your days were ordered by study, ritual, and practice. Whether an Air Temple, a Fire Sage sanctuary, or a remote mountain retreat, the community taught you patience, tradition, and a way of seeing the spirit world behind the physical one.',
    knows: 'Scripture and philosophy, meditation, spirit lore, ceremonies of the four nations, and the quiet politics of religious orders.' },
  { name: 'Outlaw', desc: 'Lived outside the law.',
    detail: 'You came up among bandits, smugglers, daofei, or a criminal family. Rules were things other people followed. You learned early that loyalty is earned in a pinch and that the law protects those who already have something.',
    knows: 'Fences and safehouses, how to spot a mark or a tail, underworld codes and oaths, and which officials can be bought.' },
  { name: 'Privileged', desc: 'Born to wealth, nobility, or influence.',
    detail: 'Doors opened before you knocked. You grew up with tutors, servants, and expectations — and perhaps a nagging sense that none of it was earned. You know how power moves in drawing rooms and courts.',
    knows: 'Etiquette and court protocol, noble houses and their feuds, high culture, trade and finance, and how to make a request sound like a favor.' },
  { name: 'Urban', desc: 'A child of the city.',
    detail: 'Crowds, markets, politics, and hustle raised you. Ba Sing Se, Republic City, or a Fire Nation port — you know a city is a hundred neighborhoods, each with its own rules, and you know how to move between them.',
    knows: 'Street layouts and shortcuts, local gossip and rumor, guilds and gangs, how bureaucracy actually works, and where to find anything for a price.' },
  { name: 'Wilderness', desc: 'Raised far from towns.',
    detail: 'Forests, mountains, tundra, or the open sea shaped you more than any teacher. You learned to read weather, track animals, and rely on yourself. Crowds still feel stranger to you than a week alone in the wild.',
    knows: 'Survival and navigation, animals and plants, spirits of wild places, weather signs, and the small settlements most maps forget.' },
];

export const STANDARD_GROWTH = [
  'Did you learn something challenging, exciting, or complicated about the world?',
  'Did you stop a dangerous threat or solve a community problem?',
  'Did you guide a companion towards balance or end the session at your center?',
];

// Broken out into one file per playbook \u2014 see ./playbooks/*.playbook.ts \u2014 so
// each is easy to read and edit on its own instead of scrolling one giant array.
export { PLAYBOOKS } from './playbooks';
