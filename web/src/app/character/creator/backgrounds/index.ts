import { military } from './military.background';
import { monastic } from './monastic.background';
import { outlaw } from './outlaw.background';
import { privileged } from './privileged.background';
import { urban } from './urban.background';
import { wilderness } from './wilderness.background';

// One file per background (see ./*.background.ts) so each is easy to read and
// edit on its own — same pattern as ./playbooks/*.playbook.ts. Order here is
// display order in the Concept step's background list.
export const BACKGROUNDS = [
  military,
  monastic,
  outlaw,
  privileged,
  urban,
  wilderness,
];
