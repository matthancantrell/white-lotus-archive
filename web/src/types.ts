// Shared types with no per-item directory of their own — the character
// creator's catalog data lives in app/character/creator/data.ts (and, for
// Playbook and Background specifically, one file per item under
// creator/playbooks/ and creator/backgrounds/, which define and export their
// own types directly so those files don't need to reach into data.ts).

export interface Stats { creativity: number; focus: number; harmony: number; passion: number; }

export interface Era { name: string; tag: string; accent: string; overview: string; avatarStatus: string; events: string; tone: string; tension: string; }
export interface Training { name: string; desc: string; }
// The three approaches a technique can take — shown as a label, e.g. "Waterbending · Defend & Maneuver".
export type Approach = 'attack' | 'defend' | 'evade';
// Only two tiers — no "Practiced". How well a character knows a given
// technique is purely per-character (see CharacterDraft.techniqueLevels below)
// — a technique itself has no intrinsic mastery tier.
export type TechniqueLevel = 'L' | 'M';
// `training` is an array because some techniques are a sub-style of a broader
// training (e.g. Bloodbending, Metalbending) and carry both — ['Waterbending',
// 'Bloodbending'] — so the technique is found under either tag. Ordinary
// techniques just have their one training.
export interface Technique { name: string; training: string[]; approach: Approach; details: string; }
export interface Connection { name: string; note: string; }
// One shared shape for every kind of move in the game — basic/balance moves
// everyone gets, a playbook's own selectable moves, moves auto-granted by a
// playbook's feature, pro-bending moves, and vehicle moves.
export type MoveCategory = 'Balance' | 'Basic' | 'Playbook' | 'Playbook Feature' | 'Pro-Bending' | 'Vehicle';
export interface Move {
  name: string;
  category: MoveCategory;
  // Large, book-specific list — kept open (rather than a literal union) until
  // the full subcategory list is in.
  subcategory: string | null;
  // What the move rolls against: one of the four Stats, or a principle. Kept
  // as an open string (rather than `keyof Stats | ...`) until the full list of
  // rollable principles is in; null covers moves with no roll at all (e.g.
  // Help, Stance Move) or that resolve some other way (e.g. category 'Balance').
  rollsWith: string | null;
  details: string;
}
// A short-lived condition a character can be marked with, clearing at the end
// of a session (or per GM ruling) — shown as a checklist in the sheet's main
// panel. `effect` names which moves take the penalty while it's marked.
export interface ConditionDef { name: string; effect: string; }
export interface JournalEntry { id: string; title: string; body: string; createdAt: string; }

export interface IconOption { id: string; url: string; }
// `id` doubles as the R2 object key under `icons/`, extension included (e.g.
// "aang-1.png") — served only through api/src/routes/media.ts, never a raw
// bucket URL. See api/schema/0001_characters.sql for why characters store
// this id rather than a URL.

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
  // A key into ICONS (creator/data.ts), not a URL — see IconOption for why.
  iconId: string | null;
  scopeText: string;
  groupFocusesText: string;
  hometown: string;
  look: string;
  backgrounds: string[];
  demeanor: string;
  history: string[];
  connections: Connection[];
  // Where the character currently is, campaign-wise — shown alongside scopeText
  // and groupFocusesText in the sheet's Campaign Details section.
  location: string;
  // How many of MAX_FATIGUE boxes are currently marked — cleared independently
  // of conditions via the sheet's own Reset controls.
  fatigueMarked: number;
  // Names of currently-marked entries from CONDITIONS (creator/data.ts).
  conditions: string[];
  // Free-form session log, newest-first — added to from the sheet's Journal tab.
  journalEntries: JournalEntry[];
  // Set once saved via StepGrowth's "Save character to my archive"; unset means
  // this draft only exists in the current session and hasn't reached the DB yet.
  characterId?: string;
}
