import type { StaticImageData } from 'next/image';
import type { Approach, Move, Stats } from '@/types';

// `effect` is a set of paragraphs, not one block — see the Feature section of
// PlaybookInfoPanel, which renders each entry as its own <p>. Some paragraphs
// are their own named sub-rule within the feature (e.g. The Icon's "Live Up to
// Your Role" alongside "Break Tradition") and carry a `heading`, rendered as
// its own sub-header above the paragraph; plain paragraphs just omit it.
// `list`, when present, renders as its own bulleted list below `text` — for
// paragraphs whose source material is actually a list of options (e.g. The
// Bold's Drives), not a run-on sentence of semicolon-joined items.
export interface FeatureParagraph { heading?: string; text: string; list?: string[]; }
export interface Feature { name: string; effect: FeatureParagraph[]; }

// A choice the feature itself asks the player to make, surfaced as its own
// "Feature" tab in StepPlaybook (see CharacterDraft.featureChoices, keyed by
// `key`). Two kinds, matching how the source material actually presents them:
// - 'select': an exact, closed catalog to pick `count` from (e.g. The Bold's
//   20 Drives, pick 4; The Icon's Responsibilities/Prohibitions; The
//   Successor's Domains/Secondary Domain/Lineage Resources) — rendered as a
//   checklist. `excludeChoiceKeys`, when present, names sibling choices whose
//   already-picked values are off-limits here too — The Successor's Domains
//   and Secondary Domain draw from the identical 12-option list and can't
//   repeat a pick between them.
// - 'freeform': a single name with no catalog to choose from (e.g. The
//   Adamant's Lodestar) — rendered as `count` text field(s).
export type FeatureChoice =
  | { kind: 'select'; key: string; label: string; count: number; options: string[]; excludeChoiceKeys?: string[] }
  | { kind: 'freeform'; key: string; label: string; count: number; prompt: string; examples?: string[] };

// The playbook's full information-panel content, in the same order it's rendered
// (see PlaybookInfoPanel) — banner/tagline/description/principles/stats/demeanor
// options/history/connections/moment of balance/feature/moves/moves advice/
// (secondary image)/playbook technique/growth question. Every playbook supplies
// every field so the panel's layout stays identical across playbooks; only the
// words (and art) differ.
export interface Playbook {
  id: string;
  name: string;
  tagline: string;
  // A longer flavor passage shown under the tagline, one paragraph per entry —
  // what this playbook is about, beyond the one-line hook.
  description: string[];
  principles: [string, string];
  // Flavor text shown under the Principles emblem, explaining what it means to
  // live by these two principles. Distinct from `description` above.
  principlesDescription: string[];
  stats: Stats;
  // Suggested demeanors offered as inspiration for the free-text demeanor a player
  // fills in during the Concept step (see CharacterDraft.demeanor).
  demeanorOptions: string[];
  // Four history questions answered in the Concept step, specific to this playbook.
  history: string[];
  // Suggested connection prompts offered as inspiration for the free-text
  // connections a player fills in during the Connections step (see
  // CharacterDraft.connections). A run of 3+ underscores (e.g. "___") marks a
  // fill-in-the-blank spot and is rendered as a blank line, not literal text —
  // see renderBlanks in PlaybookInfoPanel.
  connectionPrompts: string[];
  // The passage shown in Growth's "Moment of Balance" tab once unlocked.
  momentOfBalance: string;
  feature: Feature;
  // Choices the feature asks the player to make (see FeatureChoice above) —
  // surfaced as their own "Feature" tab in StepPlaybook. Empty for playbooks
  // whose feature needs no player input beyond naming a lodestar/ward/adversary
  // (handled separately, closer to featureMoves than a list-choice).
  featureChoices: FeatureChoice[];
  // Moves auto-granted by `feature` regardless of the moves picked below —
  // category 'Playbook Feature'. Empty for playbooks whose feature is purely
  // descriptive and grants no move of its own.
  featureMoves: Move[];
  // The playbook's own selectable moves (category 'Playbook') — pick 2 in the
  // Playbook step (see CharacterDraft.selectedMoves).
  moves: Move[];
  // General guidance on choosing among this playbook's moves, one paragraph per entry.
  movesAdvice: string[];
  // Auto-granted at Mastered (see CharacterDraft.techniqueLevels) when this
  // playbook is confirmed — always training: ['Universal'] once turned into a
  // full Technique (see StepTechniques' universalPool), so it isn't stored here.
  // PLACEHOLDER — replace with the Core Book (Appendix A) text for this playbook.
  startingTechnique: { name: string; approach: Approach; details: string };
  growth: string;
  // Flavor text shown under the growth question, explaining what it's getting at.
  growthDescription: string;
  // Icon/background/banner art (plus an icon accent color), imported and
  // owned directly by each playbook's own file (see ./*.playbook.ts)
  // — so adding, removing, or reordering entries in PLAYBOOKS can't shift
  // anyone else's visuals, and each playbook's own file is the one place to
  // look to change its art. The three local image fields are deliberately
  // independent — a playbook's card icon, its card background, and its
  // detail-panel banner (StepPlaybook) aren't meant to be the same picture.
  iconColor: string;
  iconImage: StaticImageData;
  backgroundImage: StaticImageData;
  // Bundled fallback for the banner — see PlaybookBanner, which tries
  // `bannerImageKey` from the media bucket first and falls back to this local
  // file if that request 404s (e.g. before the bucket object is uploaded).
  bannerFile: StaticImageData;
  // R2 object key (under `playbooks/`) for the banner — see resolvePlaybookMedia
  // (creator/data.ts).
  bannerImageKey: string;
  // R2 object key (under `playbooks/`) for the image shown between Moves Advice
  // and Playbook Technique. No local fallback — this art doesn't exist yet, so
  // PlaybookInfoPanel just hides the slot until the bucket object is uploaded.
  secondaryImageKey: string;
}
