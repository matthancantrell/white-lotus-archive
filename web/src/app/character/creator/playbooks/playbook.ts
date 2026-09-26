import type { StaticImageData } from 'next/image';
import type { Approach, Move, Stats } from '@/types';

// `effect` is a set of paragraphs, not one block — see the Feature section of
// PlaybookInfoPanel, which renders each entry as its own <p>.
export interface Feature { name: string; effect: string[]; }

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
  principlesDescription: string;
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
