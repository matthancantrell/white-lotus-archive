import type { Technique } from '@/types';

// Available to every character regardless of training. A playbook's own
// starting technique (see each playbook's `startingTechnique`) is shown
// alongside these, not listed here, so it isn't duplicated for playbooks
// that happen to share a name.
// Core Book (Appendix A) technique list — verified against Demiplane Nexus
// with Source filtered to Core Book.
export const universal: Technique[] = [
  { name: 'Attack Weakness', training: ['Universal'], approach: 'attack', rare: false, legendary: false, details: 'Strike an enemy at a weak point where they’ve already been injured.' },
  { name: 'Bolster or Hinder', training: ['Universal'], approach: 'evade', rare: false, legendary: false, details: 'Aid or impede a nearby character, inflicting an appropriate status.' },
  { name: 'Break', training: ['Universal'], approach: 'evade', rare: false, legendary: false, details: 'Target a foe’s vulnerable equipment; render it useless or broken—possibly inflicting or overcoming a fictionally appropriate status.' },
  { name: 'Charge', training: ['Universal'], approach: 'attack', rare: false, legendary: false, details: 'Advance straight at an enemy to strike them full force. Mark 1-fatigue to close the distance and engage with an enemy you aren’t currently engaged with, inflicting one condition or a 2-fatigue (their choice).' },
  { name: 'Commit', training: ['Universal'], approach: 'evade', rare: false, legendary: false, details: 'Recenter yourself amidst the fray.' },
  { name: 'Disorient', training: ['Universal'], approach: 'attack', rare: false, legendary: false, details: 'Pummel an engaged foe with quick blows.' },
  { name: 'Divert', training: ['Universal'], approach: 'defend', rare: false, legendary: false, details: 'Step into the way of blows intended for allies; when any ally within reach suffers a blow this exchange, you can suffer it for them.' },
  { name: 'Duck and Twist', training: ['Universal'], approach: 'evade', rare: false, legendary: false, details: 'Rely on your fast movement to help you out of the worst of harm’s way.' },
  { name: 'Forceful Blow', training: ['Universal'], approach: 'attack', rare: false, legendary: false, details: 'Swing at an enemy with all your might, sending them flying.' },
  { name: 'Furious Assault', training: ['Universal'], approach: 'attack', rare: true, legendary: false, details: 'Become Impaired due to your overwhelming passion, shift your balance away from center, and inflict conditions equal to your Passion on an enemy; NPCs instead inflict conditions equal to their current balance.' },
  { name: 'Overpower', training: ['Universal'], approach: 'attack', rare: false, legendary: false, details: 'Throw a punch with all your weight behind it; mark 3-fatigue to inflict Stunned on an engaged foe.' },
  { name: 'Pinpoint Aim', training: ['Universal'], approach: 'defend', rare: false, legendary: false, details: 'Take the time you need to line up a perfect shot; become Prepared.' },
  { name: 'Pounce', training: ['Universal'], approach: 'attack', rare: true, legendary: false, details: 'Press the advantage against an enemy who is off-balance.' },
  { name: 'Pressure', training: ['Universal'], approach: 'attack', rare: false, legendary: false, details: 'Impress or intimidate a foe.' },
  { name: 'Protect', training: ['Universal'], approach: 'defend', rare: false, legendary: false, details: 'Protect an ally within reach.' },
  { name: 'Rapid Assessment', training: ['Universal'], approach: 'evade', rare: false, legendary: false, details: 'Quickly take in your situation far faster than normal.' },
  { name: 'Ready', training: ['Universal'], approach: 'defend', rare: false, legendary: false, details: 'Mark 1-fatigue to ready yourself or your environment, assigning or clearing a fictionally appropriate status of nearby characters or yourself.' },
  { name: 'Retaliate', training: ['Universal'], approach: 'defend', rare: false, legendary: false, details: 'Steel yourself for their blows. Each time a foe inflicts fatigue, a condition, or shifts your balance in this exchange, inflict 1-fatigue on that foe.' },
  { name: 'Seek Vulnerabilities', training: ['Universal'], approach: 'evade', rare: false, legendary: false, details: 'Examine your foe for weak points.' },
  { name: 'Seize a Position', training: ['Universal'], approach: 'defend', rare: false, legendary: false, details: 'Move to a new location.' },
  { name: 'Sense Environment', training: ['Universal'], approach: 'evade', rare: false, legendary: false, details: 'Look for opportunities to usefully reshape your environment.' },
  { name: 'Slide Around The Blow', training: ['Universal'], approach: 'evade', rare: false, legendary: false, details: 'You move perfectly, slipping past strikes and demanding an opponent’s attention.' },
  { name: 'Smash', training: ['Universal'], approach: 'attack', rare: false, legendary: false, details: 'Mark 1-fatigue to destroy or destabilize something in the environment—possibly inflicting or overcoming a fictionally appropriate positive or negative status.' },
  { name: 'Stand Strong', training: ['Universal'], approach: 'defend', rare: false, legendary: false, details: 'Plant your feet and prepare yourself for incoming blows.' },
  { name: 'Steady Stance', training: ['Universal'], approach: 'defend', rare: false, legendary: false, details: 'Assume a strong, steady stance; any foes engaged with you who chose to advance and attack this exchange must mark 1-fatigue.' },
  { name: 'Strike', training: ['Universal'], approach: 'attack', rare: false, legendary: false, details: 'Strike a foe in reach, forcing them to mark 2-fatigue, mark a condition, or shift their balance away from center, their choice.' },
  { name: 'Suck It Up', training: ['Universal'], approach: 'defend', rare: false, legendary: false, details: 'Focus and absorb a blow, readying yourself to act immediately after.' },
  { name: 'Sweep the Leg', training: ['Universal'], approach: 'attack', rare: false, legendary: false, details: 'You attack where an enemy is weakest or most off-balance; if your foe has a total of 3 or more fatigue and conditions marked, inflict 2-fatigue.' },
  { name: 'Tag Team', training: ['Universal'], approach: 'defend', rare: false, legendary: false, details: 'Work with an ally against the same foe; choose an engaged foe and an ally—double any fatigue, conditions, or balance shifts that ally inflicts upon that foe.' },
  { name: 'Take Cover', training: ['Universal'], approach: 'defend', rare: false, legendary: false, details: 'Swerve and maneuver into cover.' },
  { name: 'Test Balance', training: ['Universal'], approach: 'evade', rare: false, legendary: false, details: 'Mark 1-fatigue to challenge an engaged foe’s balance.' },
  { name: 'Wall of Perfection', training: ['Universal'], approach: 'defend', rare: false, legendary: false, details: 'Create a perfect wall of defense around yourself and any allies directly next to you.' },
];
