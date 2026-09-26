// Catalog data for the character creator/sheet — one flat file for the catalogs
// that don't warrant their own per-item directory (see TRAININGS, TECHNIQUES,
// CONDITIONS, ERAS, ICONS below). Playbook and Background each get one file per
// item instead (see ./playbooks/*.playbook.ts and ./backgrounds/*.background.ts)
// with their own type colocated alongside; everything else shared across the
// creator lives in @/types.
export type {
  Approach,
  CharacterDraft,
  ConditionDef,
  Connection,
  Era,
  IconOption,
  JournalEntry,
  Move,
  MoveCategory,
  Stats,
  Technique,
  TechniqueLevel,
  Training,
} from '@/types';

import type { Approach, CharacterDraft, ConditionDef, Era, IconOption, Stats, Training } from '@/types';

export const STEP_LABELS = ['Setup', 'Playbook', 'Concept', 'Training', 'Balance', 'Techniques', 'Connections', 'Growth'];

export const ERA_HEADER_LABEL: Record<string, string> = {
  'Avatar Roku': 'Roku Era',
  'Avatar Aang': 'Aang Era',
  'Avatar Kyoshi': 'Kyoshi Era',
  'Hundred Year War': 'Hundred Year War Era',
  'Avatar Korra': 'Korra Era',
  'Your own era': 'Custom Era',
};

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

// Resolves a playbook-art R2 object key (see Playbook.bannerImageKey and
// .secondaryImageKey, plus PRINCIPLES_EMBLEM_URL below) to a fetchable URL,
// same pattern as the icons served through /media/icons/:key above.
export function resolvePlaybookMedia(key: string): string {
  return `${process.env.NEXT_PUBLIC_API_URL}/media/playbooks/${key}`;
}

// The yin-yang "fish" emblem behind every playbook's Principles section (see
// PlaybookInfoPanel) — one shared asset, not per-playbook, since every playbook
// uses the same art with different words laid over it.
export const PRINCIPLES_EMBLEM_URL = resolvePlaybookMedia('principles-emblem.png');

// Resolves a one-off content-art R2 object key (under `content/`, e.g. the
// Balance-track koi images below) to a fetchable URL — same
// serve-through-a-Worker pattern as resolvePlaybookMedia, just a different
// bucket prefix for art that isn't playbook- or icon-specific.
export function resolveContentMedia(key: string): string {
  return `${process.env.NEXT_PUBLIC_API_URL}/media/content/${key}`;
}

// The Balance dial is two mirrored pip rows (+3..-3 on top, -3..+3 on the
// bottom) with one koi fish arcing behind each — the black koi over the top
// row, the white koi under the bottom row, together forming the yin-yang
// shape. The sheet hides either slot independently on a 404.
export const BALANCE_TRACK_DARK_FISH_URL = resolveContentMedia('black-koi.png');
export const BALANCE_TRACK_LIGHT_FISH_URL = resolveContentMedia('white-koi.png');

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
  location: '',
  fatigueMarked: 0,
  conditions: [],
  journalEntries: [],
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

// Broken out into one file per training \u2014 see ./techniques/*.technique.ts \u2014
// plus a standalone universal list, same reasoning as PLAYBOOKS/BACKGROUNDS:
// easy to read and edit on its own instead of scrolling one giant array. A
// playbook's own starting technique (see each playbook's `startingTechnique`)
// is shown alongside UNIVERSAL_TECHNIQUES, not listed here, so it isn't
// duplicated for playbooks that happen to share a name.
export { UNIVERSAL_TECHNIQUES, TECHNIQUES } from './techniques';

export const ADVANCEMENTS = [
  'Take a new move from your playbook',
  'Take a new move from another playbook',
  'Raise a stat by +1 (maximum of +2 in any given stat)',
  'Shift your center one step',
  'Unlock your Moment of Balance',
];

// Broken out into one file per background — see ./backgrounds/*.background.ts
// — same reasoning as PLAYBOOKS below: easy to read and edit on its own
// instead of scrolling one giant array.
export { BACKGROUNDS } from './backgrounds';
export type { Background } from './backgrounds/background';

export const STANDARD_GROWTH = [
  'Did you learn something challenging, exciting, or complicated about the world?',
  'Did you stop a dangerous threat or solve a community problem?',
  'Did you guide a companion towards balance or end the session at your center?',
];

export const MAX_FATIGUE = 5;

// Names match the Core Book's five Conditions; effects are placeholder text
// (written fresh for this project, not copied from any source) pending the
// real per-move penalties from the book.
export const CONDITIONS: ConditionDef[] = [
  { name: 'Afraid', effect: 'Take -2 to moves that roll with Focus.' },
  { name: 'Angry', effect: 'Take -2 to moves that roll with Passion.' },
  { name: 'Guilty', effect: 'Take -2 to moves that roll with Harmony.' },
  { name: 'Insecure', effect: 'Take -2 to moves that roll with Creativity.' },
  { name: 'Troubled', effect: 'Take -2 to Balance moves.' },
];

// Broken out into one file per category — see ./moves/*.move.ts — same
// reasoning as PLAYBOOKS/BACKGROUNDS/TECHNIQUES: easy to read and edit on its
// own instead of scrolling one giant array.
export { UNIVERSAL_MOVES } from './moves';

// Broken out into one file per playbook \u2014 see ./playbooks/*.playbook.ts \u2014 so
// each is easy to read and edit on its own instead of scrolling one giant array.
// Playbook (plus Move/Feature, which only ever appear as its fields) is defined
// in ./playbooks/playbook.ts, not here, so a playbook file never needs to reach
// into data.ts for its own type.
export { PLAYBOOKS } from './playbooks';
export type { Playbook, Feature } from './playbooks/playbook';
