import { basic } from './basic.move';
import { balance } from './balance.move';

// One file per category (see ./*.move.ts) so each is easy to read and edit on
// its own — same pattern as ./techniques/*.technique.ts. Playbook and Playbook
// Feature moves aren't here: they live on each playbook itself (see
// Playbook.moves / Playbook.featureMoves in ../playbooks/playbook.ts).
// Pro-Bending and Vehicle have no catalog yet — add ./pro-bending.move.ts and
// ./vehicle.move.ts here once there's real content for them.
export const UNIVERSAL_MOVES = [...basic, ...balance];
