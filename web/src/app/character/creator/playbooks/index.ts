import type { Playbook } from '../data';
import { adamant } from './adamant.playbook';
import { bold } from './bold.playbook';
import { guardian } from './guardian.playbook';
import { hammer } from './hammer.playbook';
import { icon } from './icon.playbook';
import { idealist } from './idealist.playbook';
import { pillar } from './pillar.playbook';
import { prodigy } from './prodigy.playbook';
import { rogue } from './rogue.playbook';
import { successor } from './successor.playbook';
import { destined } from './destined.playbook';
import { elder } from './elder.playbook';

// One file per playbook (see ./*.playbook.ts) so each is easy to read and
// edit on its own. Order here is display order in the playbook list.
export const PLAYBOOKS: Playbook[] = [
  adamant,
  bold,
  guardian,
  hammer,
  icon,
  idealist,
  pillar,
  prodigy,
  rogue,
  successor,
  destined,
  elder,
];
