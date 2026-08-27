export interface Move { name: string; effect: string; }
export interface Feature { name: string; effect: string; }
export interface Stats { creativity: number; focus: number; harmony: number; passion: number; }

export interface Playbook {
  id: string;
  name: string;
  tagline: string;
  principles: [string, string];
  stats: Stats;
  moves: Move[];
  feature: Feature;
  growth: string;
}

export interface Era { name: string; tag: string; accent: string; }
export interface Technique { name: string; effect: string; }
export interface Connection { name: string; note: string; }

export interface CharacterDraft {
  step: number;
  eraName: string | null;
  playbookId: string | null;
  trainingName: string | null;
  fightingStyle: string;
  statBonus: keyof Stats | null;
  balanceShift: number;
  selectedMoves: string[];
  selectedTechnique: string | null;
  name: string;
  hometown: string;
  look: string;
  background: string | null;
  demeanor: string | null;
  connections: Connection[];
}

export const STEP_LABELS = ['Era', 'Playbook', 'Training', 'Stats', 'Balance', 'Moves', 'Techniques', 'Identity', 'Connections', 'Growth'];
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
  selectedTechnique: null,
  name: '',
  hometown: '',
  look: '',
  background: null,
  demeanor: null,
  connections: [{ name: '', note: '' }],
};

export const ERAS: Era[] = [
  { name: 'Avatar Roku', tag: 'Fire Nation dawn', accent: 'text-[#e8927a]' },
  { name: 'Avatar Aang', tag: 'Hundred Year War\u2019s end', accent: 'text-[#9ec4e8]' },
  { name: 'Avatar Kyoshi', tag: 'Age of the Daofei', accent: 'text-[#a3c98a]' },
  { name: 'Hundred Year War', tag: 'A world at war', accent: 'text-[#d97a5c]' },
  { name: 'Avatar Korra', tag: 'Age of industry', accent: 'text-[#9ec4e8]' },
  { name: 'Your own era', tag: 'Build a custom setting', accent: 'text-gold' },
];

export const TRAININGS = ['Airbending', 'Waterbending', 'Earthbending', 'Firebending', 'Weapons', 'Technology', 'Hand-to-Hand'];

export const TECHNIQUES: Record<string, Technique[]> = {
  Airbending: [
    { name: 'Evasive Current', effect: 'Slip past an incoming attack by riding a cushion of air.' },
    { name: 'Updraft', effect: 'Launch yourself or an ally upward out of danger.' },
    { name: 'Air Shield', effect: 'Spin a defensive barrier of air around yourself.' },
    { name: 'Gale Push', effect: 'Knock an opponent back with a burst of wind.' },
  ],
  Waterbending: [
    { name: 'Wave Crash', effect: 'Pull water into a wave that sweeps opponents off their feet.' },
    { name: 'Healing Flow', effect: 'Use bent water to soothe fatigue or a minor injury.' },
    { name: 'Ice Lock', effect: 'Freeze water around a target\u2019s limbs to immobilize them.' },
    { name: 'Redirect', effect: 'Catch and redirect an incoming attack using water\u2019s flow.' },
  ],
  Earthbending: [
    { name: 'Stone Wall', effect: 'Raise a wall of earth for cover in an instant.' },
    { name: 'Seismic Sense', effect: 'Read the ground to sense movement and hidden threats.' },
    { name: 'Rock Slide', effect: 'Send a wave of rubble at your opponents.' },
    { name: 'Pillar Launch', effect: 'Propel yourself upward on a column of stone.' },
  ],
  Firebending: [
    { name: 'Flame Whip', effect: 'Lash out with a controlled arc of fire at range.' },
    { name: 'Breath of Fire', effect: 'Exhale a burst of flame to clear space around you.' },
    { name: 'Redirect the Spark', effect: 'Absorb and reroute an incoming bolt of lightning or fire.' },
    { name: 'Smoke Screen', effect: 'Cloud the area to cover an escape or approach.' },
  ],
  Weapons: [
    { name: 'Precise Strike', effect: 'Land a controlled hit that finds the gap in a guard.' },
    { name: 'Disarm', effect: 'Twist an opponent\u2019s weapon from their grip.' },
    { name: 'Parry and Riposte', effect: 'Turn a blocked attack into your own opening.' },
    { name: 'Thrown Weapon', effect: 'Hit a distant target with a thrown blade or projectile.' },
  ],
  Technology: [
    { name: 'Field Rig', effect: 'Jury-rig a device on the spot from whatever\u2019s on hand.' },
    { name: 'Overcharge', effect: 'Push a mechanism past its limits for one big effect.' },
    { name: 'Remote Trigger', effect: 'Set up a device to activate later, from a distance.' },
    { name: 'Quick Repair', effect: 'Patch damaged gear well enough to keep going.' },
  ],
  'Hand-to-Hand': [
    { name: 'Pressure Point', effect: 'Strike a nerve cluster to numb a limb or block a bender\u2019s chi.' },
    { name: 'Throw', effect: 'Use an opponent\u2019s own momentum to put them on the ground.' },
    { name: 'Iron Guard', effect: 'Hold a defensive stance that\u2019s nearly impossible to break.' },
    { name: 'Counter Grab', effect: 'Turn a grapple attempt back on your attacker.' },
  ],
};

export const BACKGROUNDS = ['Military', 'Outlaw', 'Monastic', 'Privileged', 'Urban', 'Wilderness'];
export const DEMEANORS = ['Eager', 'Uncertain', 'Solemn', 'Jocular', 'Haunted', 'Watchful'];

export const STANDARD_GROWTH = [
  'Did you learn something new about the world, a person, or yourself today?',
  'Did you fail to live up to your own standards, and did you notice?',
  'Did you help someone else grow, even in a small way?',
];

export const PLAYBOOKS: Playbook[] = [
  { id: 'adamant', name: 'The Adamant', tagline: 'Fixes what\u2019s broken by any means necessary, even at cost to themselves and others.', principles: ['Restraint', 'Results'], stats: { creativity: 0, focus: 1, harmony: -1, passion: 1 },
    moves: [
      { name: 'No Half Measures', effect: 'When you push a plan through over others\u2019 objections, roll with Focus; on a hit it works, but mark a condition on a 7-9.' },
      { name: 'Cutting Remark', effect: 'When you tell someone an uncomfortable truth to spur them into action, roll with Passion.' },
      { name: 'Contingency', effect: 'You always have a backup plan ready; once per session, retroactively declare you set one up.' },
      { name: 'Iron Will', effect: 'Clear a condition whenever you double down on a decision instead of reconsidering it.' },
      { name: 'Lodestar', effect: 'Name another PC as your Lodestar; they can shift your balance without you contesting it.' },
    ],
    feature: { name: 'By Any Means', effect: 'Once per session, ignore the consequences of a harsh method to get a result \u2014 the fiction remembers it, though.' },
    growth: 'Did you get results at someone else\u2019s expense today?' },
  { id: 'bold', name: 'The Bold', tagline: 'Charges in first, talks a big game, and backs it up more often than not.', principles: ['Confidence', 'Loyalty'], stats: { creativity: 1, focus: -1, harmony: 0, passion: 1 },
    moves: [
      { name: 'Big Talk', effect: 'When you boast about what you\u2019re about to do, roll with Passion; a hit means the room believes you.' },
      { name: 'Reckless Charge', effect: 'When you throw yourself into danger to protect someone, roll with Creativity.' },
      { name: 'Crack the Plan', effect: 'When you improvise past a failed plan, roll with Creativity to find the opening.' },
      { name: 'Rally', effect: 'Once per session, give an ally advantage on their next roll by talking up their odds.' },
      { name: 'Never Back Down', effect: 'Clear a condition whenever you refuse to retreat from a fight you started.' },
    ],
    feature: { name: 'All In', effect: 'When the odds are worst, take +1 to your next roll for committing fully to the moment.' },
    growth: 'Did your confidence talk the group into a plan today?' },
  { id: 'guardian', name: 'The Guardian', tagline: 'Sworn to protect someone specific, sometimes at the cost of their own goals.', principles: ['Duty', 'Freedom'], stats: { creativity: -1, focus: 1, harmony: 1, passion: 0 },
    moves: [
      { name: 'Shield', effect: 'When you place yourself between your charge and harm, roll with Focus.' },
      { name: 'Ever Vigilant', effect: 'You always notice a threat to your charge before anyone else at the table does.' },
      { name: 'Steady Hand', effect: 'When you calm your charge in a tense moment, roll with Harmony.' },
      { name: 'Draw Their Eye', effect: 'Once per exchange, redirect an attacker\u2019s focus onto yourself.' },
      { name: 'Off Duty', effect: 'Clear a condition when you take real time for yourself, away from your charge.' },
    ],
    feature: { name: 'Sworn Oath', effect: 'Name who you\u2019ve sworn to protect; your balance shifts whenever that bond is tested.' },
    growth: 'Did protecting your charge cost you something you wanted?' },
  { id: 'hammer', name: 'The Hammer', tagline: 'Believes every problem has a direct solution and volunteers to deliver it.', principles: ['Aggression', 'Diplomacy'], stats: { creativity: 0, focus: 0, harmony: -1, passion: 2 },
    moves: [
      { name: 'Overwhelming Force', effect: 'When you go all-out in a fight, roll with Passion for extra effect on a hit.' },
      { name: 'No Diplomacy Needed', effect: 'When you settle a dispute by force instead of words, roll with Focus.' },
      { name: 'Break Through', effect: 'When you smash through an obstacle rather than go around it, roll with Passion.' },
      { name: 'Cool Down', effect: 'Once per session, an ally can talk you down before you escalate further.' },
      { name: 'Point Taken', effect: 'Clear a condition when you accept that force wasn\u2019t the answer this time.' },
    ],
    feature: { name: 'First to the Fight', effect: 'You act first when a fight breaks out, before initiative is otherwise decided.' },
    growth: 'Did you solve a problem with force today?' },
  { id: 'icon', name: 'The Icon', tagline: 'Carries a title or legacy they never asked for, and longs to just be themselves.', principles: ['Duty', 'Freedom'], stats: { creativity: 1, focus: 0, harmony: 0, passion: -1 },
    moves: [
      { name: 'The Weight of the Role', effect: 'When you invoke your title to open doors, roll with Harmony.' },
      { name: 'Slip Away', effect: 'When you shed your public persona to move unseen, roll with Creativity.' },
      { name: 'Rally the Room', effect: 'When you inspire a crowd with who you represent, roll with Passion.' },
      { name: 'Just for a Moment', effect: 'Once per session, clear a condition by doing something purely for yourself.' },
      { name: 'Inherited Trust', effect: 'People you\u2019ve never met extend you goodwill on your family or office\u2019s reputation.' },
    ],
    feature: { name: 'Small Freedoms', effect: 'You mark growth whenever you find joy in an ordinary, unburdened moment \u2014 no growth question needed.' },
    growth: 'Did your role and your own wishes pull you in different directions today?' },
  { id: 'idealist', name: 'The Idealist', tagline: 'Sees the good in everyone, sometimes to their own detriment.', principles: ['Hope', 'Pragmatism'], stats: { creativity: 0, focus: -1, harmony: 2, passion: 0 },
    moves: [
      { name: 'See the Good', effect: 'When you look for the best in someone others have written off, roll with Harmony.' },
      { name: 'Never Turn My Back', effect: 'When you give a second chance to someone who\u2019s wronged you, roll with Harmony.' },
      { name: 'Rousing Belief', effect: 'When you convince someone that change is possible, roll with Passion.' },
      { name: 'Hard Truths', effect: 'Once per session, an ally can force you to face evidence your idealism is misplaced.' },
      { name: 'Faith Rewarded', effect: 'Clear a condition when your belief in someone pays off.' },
    ],
    feature: { name: 'Benefit of the Doubt', effect: 'The first time you extend trust to an antagonist each session, mark growth.' },
    growth: 'Did your faith in someone get tested today?' },
  { id: 'pillar', name: 'The Pillar', tagline: 'Leads the group tactically, torn between commanding and supporting.', principles: ['Leadership', 'Support'], stats: { creativity: 0, focus: 2, harmony: 0, passion: -1 },
    moves: [
      { name: 'Tactical Read', effect: 'When you size up a situation before acting, roll with Focus.' },
      { name: 'Take Point', effect: 'When you take charge of a plan under pressure, roll with Focus.' },
      { name: 'Step Back', effect: 'When you let someone else lead instead of taking over, roll with Harmony.' },
      { name: 'Coordinated Strike', effect: 'Once per exchange, direct an ally\u2019s action for a bonus if they follow it.' },
      { name: 'Weight of Command', effect: 'Clear a condition when a plan you called succeeds.' },
    ],
    feature: { name: 'Command Presence', effect: 'Allies who follow your called plan take +1 to the roll.' },
    growth: 'Did you have to choose between leading and supporting today?' },
  { id: 'prodigy', name: 'The Prodigy', tagline: 'Naturally gifted and constantly compared to someone they can\u2019t live up to.', principles: ['Ambition', 'Contentment'], stats: { creativity: 1, focus: 1, harmony: 0, passion: -1 },
    moves: [
      { name: 'Natural Talent', effect: 'When you attempt something you\u2019ve never trained for, roll with Creativity.' },
      { name: 'Chasing the Standard', effect: 'When you push yourself past your limits to match a rival or mentor, roll with Focus.' },
      { name: 'Effortless', effect: 'Once per session, succeed automatically at a feat within your training, no roll needed.' },
      { name: 'Cracks Show', effect: 'When the pressure to be the best overwhelms you, mark a condition to gain +1 forward.' },
      { name: 'Quiet Confidence', effect: 'Clear a condition when you succeed without needing anyone to notice.' },
    ],
    feature: { name: 'Prodigious', effect: 'Choose one extra technique at character creation beyond the usual number.' },
    growth: 'Did living up to expectations weigh on you today?' },
  { id: 'rogue', name: 'The Rogue', tagline: 'Answers to no one, trusts no one, and is slowly learning that might have to change.', principles: ['Self-Reliance', 'Trust'], stats: { creativity: 1, focus: 0, harmony: -1, passion: 1 },
    moves: [
      { name: 'Solo Job', effect: 'When you handle something alone rather than ask for help, roll with Creativity.' },
      { name: 'Leap of Trust', effect: 'When you rely on the party instead of going it alone, roll with Harmony.' },
      { name: 'Slip the Net', effect: 'When you talk or sneak your way out of trouble, roll with Creativity.' },
      { name: 'No Strings', effect: 'Once per session, walk away from an obligation with no mechanical consequence.' },
      { name: 'Found Family', effect: 'Clear a condition the first time you let the party in on something personal.' },
    ],
    feature: { name: 'Always an Out', effect: 'You always know a way out of the room you\u2019re in, however unlikely.' },
    growth: 'Did you choose to rely on someone else today?' },
  { id: 'successor', name: 'The Successor', tagline: 'Next in line for a role or legacy, and unsure whether they want it.', principles: ['Duty', 'Individuality'], stats: { creativity: 0, focus: 1, harmony: 1, passion: -1 },
    moves: [
      { name: 'Inherited Skill', effect: 'When you draw on training passed down to you, roll with Focus.' },
      { name: 'My Own Path', effect: 'When you break from tradition to do things your way, roll with Creativity.' },
      { name: 'Voice of the Legacy', effect: 'When you invoke your predecessor\u2019s name or reputation, roll with Harmony.' },
      { name: 'Question Everything', effect: 'Once per session, gain insight by challenging an assumption everyone else takes for granted.' },
      { name: 'Steady the Line', effect: 'Clear a condition when you honor the legacy in a way that still feels like you.' },
    ],
    feature: { name: 'The Weight of What\u2019s Next', effect: 'Once per session, ask the GM what your predecessor would have done in this exact moment.' },
    growth: 'Did the pull between legacy and your own path come up today?' },
  { id: 'destined', name: 'The Destined', tagline: 'Touched by something spiritual and otherworldly they don\u2019t fully understand yet.', principles: ['Control', 'Connection'], stats: { creativity: 1, focus: 0, harmony: 0, passion: 0 },
    moves: [
      { name: 'Reach Beyond', effect: 'When you open yourself to your destiny sign\u2019s influence, roll with Harmony.' },
      { name: 'Hold the Line', effect: 'When you suppress the pull of your destiny to stay in control, roll with Focus.' },
      { name: 'Uncanny Insight', effect: 'Once per session, receive a cryptic but true hint from the GM about what\u2019s coming.' },
      { name: 'Marked', effect: 'Your destiny sign is visible to those who know to look; roll with Passion to use it to unsettle someone.' },
      { name: 'Anchor', effect: 'Clear a condition when a companion helps ground you against your destiny\u2019s pull.' },
    ],
    feature: { name: 'Destiny Sign', effect: 'Choose one destiny sign at creation; it grants a special ability tied to your fate.' },
    growth: 'Did your destiny pull you somewhere you didn\u2019t choose to go?' },
  { id: 'elder', name: 'The Elder', tagline: 'Lived longer than the others, mastered their training many times over.', principles: ['Determination', 'Patience'], stats: { creativity: 0, focus: 1, harmony: 1, passion: -1 },
    moves: [
      { name: 'Decades of Practice', effect: 'When you draw on a lifetime of experience, roll with Focus.' },
      { name: 'Patient Teacher', effect: 'When you guide a companion through a technique, roll with Harmony; on a hit they gain a temporary bonus.' },
      { name: 'Seen It Before', effect: 'Once per session, recognize a tactic or trap because you\u2019ve encountered it before.' },
      { name: 'One More Fight', effect: 'When your body pushes past what it should be capable of, roll with Focus.' },
      { name: 'Let It Go', effect: 'Clear a condition when you choose patience over pushing an old grudge.' },
    ],
    feature: { name: 'Mastered Techniques', effect: 'Start with four mastered techniques instead of one, chosen freely from your training.' },
    growth: 'Did your age and experience change how you handled something today?' },
];
