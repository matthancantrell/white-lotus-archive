import { universal } from './universal.technique';
import { waterbending } from './waterbending.technique';
import { earthbending } from './earthbending.technique';
import { firebending } from './firebending.technique';
import { airbending } from './airbending.technique';
import { weapons } from './weapons.technique';
import { technology } from './technology.technique';

// Universal techniques are their own list (see ./universal.technique.ts);
// everything else is one file per training (see ./*.technique.ts, named after
// the TRAININGS entry they belong to) collected here into the flat TECHNIQUES
// list every training pool filters against — same reasoning as
// PLAYBOOKS/BACKGROUNDS: each training's techniques are easy to read and edit
// on their own instead of scrolling one giant array.
export const UNIVERSAL_TECHNIQUES = universal;
export const TECHNIQUES = [
  ...waterbending,
  ...earthbending,
  ...firebending,
  ...airbending,
  ...weapons,
  ...technology,
];
