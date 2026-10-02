import type { Playbook } from './playbook';
import { adamant } from './adamant.playbook';
import { bold } from './bold.playbook';
import { guardian } from './guardian.playbook';
import { hammer } from './hammer.playbook';
import { icon } from './icon.playbook';
import { idealist } from './idealist.playbook';
import { successor } from './successor.playbook';
import { foundling } from './foundling.playbook';
// Destined and Elder aren't Core Book playbooks (confirmed against the real
// book's playbook list — Core Book only has the 10 below). Commented out,
// not deleted, until we know what they should actually be sourced from.
// import { destined } from './destined.playbook';
// import { elder } from './elder.playbook';
// Pillar, Prodigy, and Rogue are real Core Book playbooks, but most of their
// content is still PLACEHOLDER text (only principles are corrected/real) —
// blocked on Demiplane account access or the physical book (see each file's
// own comments). Commented out here so placeholder text can't ship live;
// re-enable once each is filled in with verified content.
// import { pillar } from './pillar.playbook';
// import { prodigy } from './prodigy.playbook';
// import { rogue } from './rogue.playbook';

// One file per playbook (see ./*.playbook.ts) so each is easy to read and
// edit on its own. Order here is display order in the playbook list.
export const PLAYBOOKS: Playbook[] = [
  adamant,
  bold,
  guardian,
  hammer,
  icon,
  idealist,
  successor,
  foundling,
  // destined,
  // elder,
  // pillar,
  // prodigy,
  // rogue,
];
