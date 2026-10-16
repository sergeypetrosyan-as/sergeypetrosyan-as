import { hhmm as T } from './types.ts';
import type {
  Chapter, Choice, Claim, Ending, Hotspot, ItemId, Location, Person, PersonId, PlaceId, Scope, Slot, Source,
  SourceId, Talk, TalkId,
} from './types.ts';

// ---------------------------------------------------------------- claim helpers
const at = (who: PersonId, loc: PlaceId, a: string, b: string): Claim => ({ k: 'at', who, loc, from: T(a), to: T(b) });
const holds = (who: PersonId, item: ItemId, a: string, b: string): Claim => ({ k: 'holds', who, item, from: T(a), to: T(b) });
const light = (loc: Scope, a: string, b: string, lit: boolean): Claim => ({ k: 'light', loc, from: T(a), to: T(b), lit });
const ev = (e: 'blackout' | 'restore' | 'death', a: string): Claim => ({ k: 'event', ev: e, at: T(a) });
const ref = (e: 'blackout' | 'restore' | 'death'): Claim => ({ k: 'ref', ev: e });

export const CASE_NAME = 'The Halcyon Burn';
export const CASE_DATE = '3 November 2091';

export const PEOPLE: Record<PersonId, Person> = {
  quill: { id: 'quill', name: 'Mara Quill', role: 'Business partner', blurb: 'Co-owner of Halcyon. Sharp, tired, rich on paper. Wants the Corvane deal.', glyph: 'MQ' },
  brisk: { id: 'brisk', name: 'Teodor Brisk', role: 'Night security chief', blurb: 'Ex-harbour police. Keeps the booth, the keys and a few private arrangements.', glyph: 'TB' },
  voss: { id: 'voss', name: 'Linnea Voss', role: 'Apprentice archivist', blurb: 'Roque\'s apprentice for six years. Precise, soft-spoken, never seen without her lanyard.', glyph: 'LV' },
  pell: { id: 'pell', name: 'Ottoline Pell', role: 'Night cleaner', blurb: 'Sixty-one. Has mopped Halcyon\'s floors since before it had a name.', glyph: 'OP' },
  roque: { id: 'roque', name: 'Dr. Anselm Roque', role: 'Victim', blurb: 'Co-founder and archivist. Found dead in the Cold Vault beside a burned feed rig.', glyph: 'AR' },
};

export const LOCATIONS: Record<string, Location> = {
  lobby: { id: 'lobby', name: 'Halcyon Lobby', floor: 'Ground', blurb: 'Wet marble, a security booth behind glass, and a grid relay panel humming to itself.', unlock: 1 },
  office: { id: 'office', name: 'Roque\'s Office', floor: 'Level 3', blurb: 'A desk older than the building, a memory cradle, a safe that costs more than the desk.', unlock: 1 },
  vault: { id: 'vault', name: 'The Cold Vault', floor: 'Basement B2', blurb: 'Frost on the racks. A burned feed rig. A chalk outline that is not chalk.', unlock: 1 },
  annex: { id: 'annex', name: 'Archive Annex', floor: 'Level 2', blurb: 'Shelves of backlog and one tall window facing the Undertow Street neon.', unlock: 2 },
  dock: { id: 'dock', name: 'Loading Dock', floor: 'Ground, rear', blurb: 'A roll door, a key console, and rain coming in sideways.', unlock: 2 },
  bar: { id: 'bar', name: 'The Sump Lantern', floor: 'Street', blurb: 'A bar built into a drain culvert. Everyone pays in cash and nobody remembers.', unlock: 3 },
};

export const LOC_ORDER = ['lobby', 'office', 'vault', 'annex', 'dock', 'bar'] as const;

const TRAVEL_RAW: Record<string, number> = {
  'lobby-office': 3, 'lobby-vault': 4, 'lobby-annex': 2, 'lobby-dock': 3, 'office-vault': 5, 'office-annex': 3,
  'office-dock': 6, 'annex-vault': 4, 'annex-dock': 4, 'vault-dock': 3,
};
const TRAVEL_PAIRS: Record<string, number> = Object.fromEntries(Object.entries(TRAVEL_RAW).map(([k, v]) => [k.split('-').sort().join('-'), v]));
export function travel(a: PlaceId, b: PlaceId): number {
  if (a === b) return 0;
  const key = [a, b].sort().join('-');
  if (TRAVEL_PAIRS[key] !== undefined) return TRAVEL_PAIRS[key];
  if (a === 'home' || b === 'home') return a === 'bar' || b === 'bar' ? 15 : 25;
  return 12; // bar to any building location
}
export const BUILDING: PlaceId[] = ['lobby', 'office', 'vault', 'annex', 'dock'];
export function scopeHas(scope: Scope, loc: PlaceId): boolean {
  return scope === loc || (scope === 'building' && BUILDING.includes(loc));
}
export function scopesIntersect(a: Scope, b: Scope): boolean {
  if (a === b) return true;
  if (a === 'building') return b !== 'bar' && b !== 'home';
  if (b === 'building') return a !== 'bar' && a !== 'home';
  return false;
}

export const SLOTS: Slot[] = [
  { id: 's1', name: 'The Quarrel', from: T('22:00'), to: T('23:00'), key: false, accept: [] },
  { id: 's2', name: 'Quiet Hours', from: T('23:00'), to: T('23:20'), key: false, accept: [] },
  { id: 's3', name: 'The Vault Argument', from: T('23:20'), to: T('23:38'), key: true, accept: ['f-pell-corridor'] },
  { id: 's4', name: 'Blackout', from: T('23:38'), to: T('23:46'), key: true, accept: ['f-roque-last'] },
  { id: 's5', name: 'The Restore', from: T('23:46'), to: T('23:56'), key: true, accept: ['f-pell-lobby'] },
  { id: 's6', name: 'Discovery', from: T('23:56'), to: T('00:15'), key: true, accept: ['f-brisk-discovery'] },
];

// ---------------------------------------------------------------- sources
const S = (s: Source): Source => s;

export const SOURCES: Source[] = [
  // ---- hard evidence
  S({ id: 'ev-door-log', kind: 'log', hard: true, title: 'Front-door ledger', subject: 'scene', where: 'Lobby, front door',
    text: 'The ledger beside the front door stamps every badge in and out. Tonight: V. VOSS in 21:58. M. QUILL in 22:10. M. QUILL out 22:38. After that, nothing in or out until the Bureau at 00:41. Halvard: "Quill left through this door at 22:38. Whatever she told someone, she told it after this."',
    claims: [at('quill', 'lobby', '22:10', '22:12'), at('quill', 'lobby', '22:38', '22:40'), at('voss', 'lobby', '21:58', '22:00')] }),
  S({ id: 'ev-power-log', kind: 'log', hard: true, title: 'Grid relay log', subject: 'scene', where: 'Lobby, relay panel',
    text: 'The Undertow substation dropped the whole district at 23:40:00 and restored it at 23:46:00. The relay logged both edges. Everything in Halcyon was dark in between: lights, signs, door strips. The vault alarm runs off the mains and went offline with it. Halvard: "Six minutes of black. Any memory that is lit in those six minutes is lying."',
    claims: [ev('blackout', '23:40'), ev('restore', '23:46'), light('building', '23:40', '23:46', false), { k: 'mute', sound: 'alarm', loc: 'building', from: T('23:40'), to: T('23:46') }] }),
  S({ id: 'ev-rig-burn', kind: 'physical', hard: true, title: 'Burned feed rig', subject: 'scene', where: 'Cold Vault, rig bay',
    text: 'The rig is cooked from the inside out. The burn pattern is a surge, current pushed backward through the jack, not a load the user built himself. A man overloading his own lace burns the lace first. Roque\'s rig burned at the mains side. Halvard: "Someone or something sent too much power to a man who was plugged in."',
    claims: [] }),
  S({ id: 'ev-fuse', kind: 'physical', hard: true, title: 'Surge-protector panel', subject: 'scene', where: 'Cold Vault, protector panel',
    text: 'The protector fuse that should have clamped a spike is a dummy slug of painted ceramic. A fuse-puller left a scratch on the casing. The slug is fresh: no frost in the seat, so it went in within the last hour. This rig was killed before anyone touched it. Halvard: "It was set like a trap. Then somebody waited for the weather."',
    claims: [] }),
  S({ id: 'ev-b2-gap', kind: 'log', hard: true, title: 'B2 camera gap', subject: 'scene', where: 'Cold Vault, camera head',
    text: 'The B2 corridor camera is a continuous recorder. Tonight it has a hole: 23:20 to 23:35, replaced by a looped patch of an empty hallway. The patch was written with security-chief credentials. Whoever did it wanted fifteen minutes of nobody watching B2. Halvard: "Fifteen minutes. That is a favour or a crime. Ask who owns the credentials."',
    claims: [] }),
  S({ id: 'ev-rig-blackbox', kind: 'forensic', hard: true, title: 'Rig black box', subject: 'scene', where: 'Cold Vault, rig bay',
    text: 'The lab recovered the rig\'s black box. It reads the mains edge, not the lights: the restore spike hit at 23:46:00 and the rig logged the lethal cascade 0.4 seconds later. Roque\'s lace went flat at 23:46. Halvard: "He did not die when the lights went out. He died when they came back."',
    claims: [ev('death', '23:46')] }),
  S({ id: 'ev-corvane-wire', kind: 'document', hard: true, title: 'Pending Corvane wire', subject: 'quill', where: 'Office, desk terminal',
    text: 'A staged wire from Corvane Biotech to Mara Quill\'s personal account: 2.4 million, released only when Roque signs the archive transfer. Roque has refused to sign for two weeks. This is a motive with a bow on it. Halvard: "A wire that needs a dead man\'s signature is a reason. It is not a time or a place."',
    claims: [] }),
  S({ id: 'ev-ledger', kind: 'document', hard: true, title: 'Sealed ledger, item 2207', subject: 'voss', where: 'Office, wall safe', tags: ['ledger'],
    text: 'The sealed ledger lists every private sale Roque ever made. Item 2207, 14 October: "L. VOSS, M-9114, the last memory of Ilse Voss, deceased. Sold to Corvane Echo Ward for 90,000. Client not informed." Ilse Voss was Linnea\'s mother. The Echo Ward turns a memory into a companion that talks back. Halvard: "He sold a dead woman\'s last afternoon to a company that rents it out. And he never told the daughter."',
    claims: [] }),
  S({ id: 'ev-annex-sign', kind: 'physical', hard: true, title: 'Neon sign circuit', subject: 'scene', where: 'Annex, window frame',
    text: 'The tall Annex window faces the UNDERTOW neon sign. The sign runs on a grid-tied circuit with no battery. The relay trace on the panel shows it dark from 23:40 to 23:46. Nothing in this room could have been lit by that sign during the blackout. Halvard: "If you remember neon on these shelves between 23:40 and 23:46, you remember something that did not happen."',
    claims: [light('annex', '23:40', '23:46', false)] }),
  S({ id: 'ev-annex-locker', kind: 'physical', hard: true, title: 'Voss\'s tool roll', subject: 'voss', where: 'Annex, tool locker',
    text: 'A signed-out tool roll in Voss\'s name. Every slot is filled but one: the 4 mm fuse-puller. The audit at 22:40 listed it present. It is the right tool for a protector casing. It proves she had access, nothing more. Halvard: "Missing tools prove opportunity. They do not prove an hour."',
    claims: [] }),
  S({ id: 'ev-loop-log', kind: 'log', hard: true, title: 'Camera loop patch', subject: 'brisk', where: 'Lobby booth terminal',
    text: 'The B2 loop patch was written from the dock console, with the physical dock-key inserted, using Teodor Brisk\'s security-chief credentials: 23:20 to 23:35. Halvard: "Brisk was on the dock, not in the booth, and the dock-key was in his hand."',
    claims: [at('brisk', 'dock', '23:20', '23:35'), holds('brisk', 'dock-key', '23:20', '23:35')] }),
  S({ id: 'ev-badge-log', kind: 'log', hard: true, title: 'Vault and dock badge log', subject: 'voss', where: 'Lobby booth terminal',
    text: 'The badge log for the restricted doors. VOSS, L.: Cold Vault door 23:12. VOSS, L.: dock door 23:50, opened with the dock-key from the console (key signed to the console, held 23:49 to 23:51). Halvard: "She said she never left the Annex. The doors say the Annex is the last place she was."',
    claims: [at('voss', 'vault', '23:12', '23:14'), at('voss', 'dock', '23:50', '23:51'), holds('voss', 'dock-key', '23:49', '23:51')] }),
  S({ id: 'ev-dock-cam', kind: 'log', hard: true, title: 'Dock camera archive', subject: 'voss', where: 'Dock, camera box',
    text: 'The dock camera shows a figure in a grey coat, wet to the knees, under a hand-lamp at 23:50: Linnea Voss, lanyard swinging, slipping out through the roll door. The recording runs to 23:53. Halvard: "The Annex is on the second floor. She was on the ground floor, in the rain, three minutes after a man died."',
    claims: [at('voss', 'dock', '23:50', '23:53')] }),
  S({ id: 'ev-quill-receipt', kind: 'document', hard: true, title: 'Sump Lantern receipt', subject: 'quill', where: 'Bar, till',
    text: 'The Sump Lantern runs a paper till. M. QUILL, two whiskies, paid 23:05. A second tab at 00:01. The bartender remembers a woman in a red coat meeting a Corvane broker and leaving angry. Halvard: "Twelve minutes by tram from Halcyon to this stool. She was here at 23:05. Mara Quill is a liar and a seller, not a killer."',
    claims: [at('quill', 'bar', '23:05', '23:06'), at('quill', 'bar', '00:01', '00:02')] }),

  // ---- memory fragments
  S({ id: 'f-quill-office', kind: 'fragment', hard: false, title: 'Quill: the quarrel', subject: 'quill', where: 'Office, memory cradle', ts: T('22:30'), authentic: true,
    text: 'Memory feed, Mara Quill, 22:30, Roque\'s office. Lamp light on a desk. Roque: "You will sign Corvane\'s papers over my dead lace, Mara." Her voice: "Careful what you wish for, Anselm." Smell of old coffee and ozone. The feed ends with the front elevator opening.',
    claims: [at('quill', 'office', '22:15', '22:34'), light('office', '22:30', '22:31', true)] }),
  S({ id: 'f-quill-bar', kind: 'fragment', hard: false, title: 'Quill: the Sump Lantern', subject: 'quill', where: 'Bar, Quill\'s feed', ts: T('23:05'), authentic: true,
    text: 'Memory feed, Mara Quill, 23:05, the Sump Lantern. Amber bottle-glow. A broker slides a slate across the bar: "Corvane\'s last offer." The jukebox plays something with a lot of bass and no melody. Rain on the culvert roof.',
    claims: [at('quill', 'bar', '22:58', '23:20')] }),
  S({ id: 'f-brisk-booth', kind: 'fragment', hard: false, title: 'Brisk: the booth, 23:10', subject: 'brisk', where: 'Lobby, booth recorder', ts: T('23:10'), authentic: true,
    text: 'Memory feed, Teodor Brisk, 23:10, the security booth. Six screens of rain. A cup of tea going cold. The lobby feed shows nobody. He glances at a dock-key hanging on a hook, then at the clock.',
    claims: [at('brisk', 'lobby', '23:05', '23:15'), light('lobby', '23:10', '23:11', true)] }),
  S({ id: 'f-pell-corridor', kind: 'fragment', hard: false, title: 'Pell: B2 corridor, 23:30', subject: 'pell', where: 'Pell\'s feed', ts: T('23:30'), authentic: true,
    text: 'Memory feed, Ottoline Pell, 23:30, the B2 corridor. A mop bucket, a flickering strip light. Behind the vault door two voices: "You sold her, Anselm!" and an older, calmer voice: "I sold a file." Pell turns the bucket and wheels away. A slim woman\'s silhouette crosses the frosted glass: a lanyard, a hand-lamp.',
    claims: [at('pell', 'vault', '23:25', '23:31'), at('voss', 'vault', '23:28', '23:31'), { k: 'heard', sound: 'voices', loc: 'vault', at: T('23:29') }, light('vault', '23:30', '23:31', true)] }),
  S({ id: 'f-voss-annex', kind: 'fragment', hard: false, title: 'Voss: the Annex, 23:41', subject: 'voss', where: 'Annex, Voss\'s feed', ts: T('23:41'), authentic: false,
    text: 'Memory feed, Linnea Voss, 23:41, the Archive Annex. She is shelving backlog under the tall window. Pink-and-blue UNDERTOW neon pours across the spines. She hums. "After the lights surged back I thought the whole building would wake." Smell of dust and paper. The timestamp is crisp. The edges of the frame are perfect.',
    claims: [at('voss', 'annex', '23:30', '23:55'), light('annex', '23:41', '23:42', true), ref('restore')] }),
  S({ id: 'f-roque-last', kind: 'fragment', hard: false, title: 'Roque\'s last feed', subject: 'roque', where: 'Vault, implant reader', ts: T('23:44'), authentic: true,
    text: 'Memory feed, Dr. Anselm Roque, 23:44, the Cold Vault, in the dark. Only a hand-lamp lights the rig. A woman\'s voice: "Say her name." His: "Linnea, what did you do to the protector?" The beam swings and a lanyard glints. "Say her name, Anselm." The lace records until the power returns, and the recording stops.',
    claims: [at('voss', 'vault', '23:40', '23:46'), light('vault', '23:44', '23:45', false), ref('blackout')] }),
  S({ id: 'f-pell-lobby', kind: 'fragment', hard: false, title: 'Pell: the lobby, 23:49', subject: 'pell', where: 'Pell\'s feed', ts: T('23:49'), authentic: true,
    text: 'Memory feed, Ottoline Pell, 23:49, the lobby. The lights have just come back, hard and white. Brisk is beside her, tea in hand. "That surge rattled the whole floor," he says. "Down on B2 they will have heard it." Pell: "We sat in the dark. You never moved." Ten minutes of ordinary waiting.',
    claims: [at('pell', 'lobby', '23:36', '23:50'), at('brisk', 'lobby', '23:38', '23:50'), light('lobby', '23:49', '23:50', true), ref('blackout'), ref('restore')] }),
  S({ id: 'f-brisk-discovery', kind: 'fragment', hard: false, title: 'Brisk: finding Roque', subject: 'brisk', where: 'Brisk\'s feed', ts: T('23:58'), authentic: true,
    text: 'Memory feed, Teodor Brisk, 23:58, the Cold Vault. The strip lights are on. Roque is slumped at the rig, jack still in. Brisk reaches for his throat and finds nothing. He says the time out loud, as if the room needed it: "Two minutes after the surge. Two minutes too late." He keys the alarm.',
    claims: [at('brisk', 'vault', '23:56', '00:05'), light('vault', '23:58', '23:59', true), ref('restore'), ref('death')] }),
  S({ id: 'f-mother', kind: 'fragment', hard: false, title: 'Ilse Voss: last afternoon', subject: 'voss', where: 'Sealed ledger archive', authentic: true,
    text: 'A sealed keepsake: the last afternoon of Ilse Voss. A kitchen. Steam from a kettle. A woman humming an old tide song while she shows her daughter how to fold a paper boat. She has no idea it is her last afternoon. It is eleven minutes long. It cannot be placed on the night\'s timeline.',
    claims: [] }),

  // ---- testimonies
  S({ id: 't-quill-1', kind: 'testimony', hard: false, title: 'Quill: "I went home"', subject: 'quill', where: 'Interview, Quill', retractedBy: 't-quill-2',
    text: 'Quill: "I left around twenty to eleven, went straight home and was through my own door by a quarter to. I never came back. Anselm was alive and furious when I walked out."', claims: [at('quill', 'home', '22:45', '24:00')] }),
  S({ id: 't-quill-2', kind: 'testimony', hard: false, title: 'Quill: "The Sump Lantern"', subject: 'quill', where: 'Interview, Quill',
    text: 'Quill: "Fine. 22:38, out the front, and straight to the Sump Lantern to meet Corvane\'s broker. I was selling my shares, Inspector. That is not murder."', claims: [at('quill', 'bar', '23:00', '24:00')] }),
  S({ id: 't-quill-3', kind: 'testimony', hard: false, title: 'Quill on Voss', subject: 'voss', where: 'Interview, Quill',
    text: 'Quill: "Linnea worshipped him until a month ago. After that he stopped letting her into the ledger room. Ask her what he put in there."', claims: [] }),
  S({ id: 't-brisk-1', kind: 'testimony', hard: false, title: 'Brisk: "Booth all night"', subject: 'brisk', where: 'Interview, Brisk', retractedBy: 't-brisk-3',
    text: 'Brisk: "I was in the booth until the lights died. All night, eyes on the lobby feed, the dock-key never left my belt."', claims: [at('brisk', 'lobby', '22:00', '23:38'), holds('brisk', 'dock-key', '22:00', '23:59')] }),
  S({ id: 't-brisk-2', kind: 'testimony', hard: false, title: 'Brisk: "Alarm at 23:42"', subject: 'brisk', where: 'Interview, Brisk',
    text: 'Brisk: "At 23:42 the vault alarm chirped, then the lights died. I called it in. He was already gone by then."', claims: [{ k: 'heard', sound: 'alarm', loc: 'lobby', at: T('23:42') }, ev('death', '23:42')] }),
  S({ id: 't-brisk-3', kind: 'testimony', hard: false, title: 'Brisk: "The loop was mine"', subject: 'brisk', where: 'Interview, Brisk',
    text: 'Brisk: "I patched the B2 loop from 23:20 to 23:35 from the dock console. A runner with a crate, nothing to do with Roque. I was on the dock. I left the dock-key in the console."', claims: [at('brisk', 'dock', '23:20', '23:35')] }),
  S({ id: 't-pell-1', kind: 'testimony', hard: false, title: 'Pell: the shouting', subject: 'pell', where: 'Interview, Pell',
    text: 'Pell: "I was mopping the B2 corridor from 23:25. Between about 23:28 and 23:31 I heard Miss Voss and the doctor behind the vault door. Then I went up to the lobby."', claims: [at('pell', 'vault', '23:25', '23:31'), at('voss', 'vault', '23:28', '23:31')] }),
  S({ id: 't-pell-2', kind: 'testimony', hard: false, title: 'Pell: the lobby in the dark', subject: 'pell', where: 'Interview, Pell',
    text: 'Pell: "Teodor and I sat in the dark lobby from when I came up until the lights returned and a while after. He never left the lobby. I would have heard his tea slosh."', claims: [at('pell', 'lobby', '23:36', '23:50'), at('brisk', 'lobby', '23:38', '23:50')] }),
  S({ id: 't-voss-1', kind: 'testimony', hard: false, title: 'Voss: "The Annex all night"', subject: 'voss', where: 'Interview, Voss', retractedBy: 't-voss-3',
    text: 'Voss: "I was in the Annex from twenty to eleven until they came for me. Cataloguing the Dredge backlog. Ask the shelves."', claims: [at('voss', 'annex', '22:40', '23:55')] }),
  S({ id: 't-voss-3', kind: 'testimony', hard: false, title: 'Voss: the admission', subject: 'voss', where: 'Interview, Voss',
    text: 'Voss: "I pulled the fuse. I waited for the district to fail and for the mains to come back. I stood by him in the dark and asked him to say her name. He would not. I left by the dock at 23:50."', claims: [at('voss', 'vault', '23:12', '23:47'), at('voss', 'dock', '23:50', '23:52')] }),
];

export const SOURCE_BY_ID: Record<string, Source> = Object.fromEntries(SOURCES.map((s) => [s.id, s]));

export const PROOFS: { culprit: SourceId[][]; mechanism: SourceId[][]; motive: SourceId[][] } = {
  culprit: [
    ['f-voss-annex', 'ev-power-log', 'ev-badge-log'],
    ['f-voss-annex', 'ev-power-log', 'f-roque-last'],
    ['f-voss-annex', 'ev-annex-sign', 'ev-dock-cam'],
    ['f-voss-annex', 'ev-annex-sign', 'ev-badge-log'],
  ],
  mechanism: [['ev-fuse', 'ev-rig-blackbox'], ['ev-rig-burn', 'ev-rig-blackbox']],
  motive: [['ev-ledger']],
};
export const PROOF_HINTS = {
  culprit: 'Show that the alibi fails and place Voss at the scene: the forged memory, a hard source that kills it, and a source that puts her in the vault or on the dock.',
  mechanism: 'Show how the rig was armed and when it actually fired.',
  motive: 'Show what Roque did that gave someone a reason.',
};

// ---------------------------------------------------------------- hotspots
export const HOTSPOTS: Hotspot[] = [
  { id: 'hs-door-ledger', loc: 'lobby', kind: 'evidence', label: 'Front-door ledger', x: 12, y: 62, chapters: [1, 3], source: 'ev-door-log', gate: 'none' },
  { id: 'hs-relay', loc: 'lobby', kind: 'evidence', label: 'Grid relay panel', x: 84, y: 48, chapters: [1, 3], source: 'ev-power-log', gate: 'none' },
  { id: 'hs-booth-recorder', loc: 'lobby', kind: 'evidence', label: 'Booth recorder', x: 60, y: 58, chapters: [1, 3], source: 'f-brisk-booth', gate: 'none' },
  { id: 'hs-booth-loop', loc: 'lobby', kind: 'evidence', label: 'Booth terminal: camera patches', x: 52, y: 44, chapters: [1, 3], source: 'ev-loop-log', gate: 'booth', lockedText: 'The terminal wants the chief\'s key. Brisk has not offered it.' },
  { id: 'hs-booth-badge', loc: 'lobby', kind: 'evidence', label: 'Booth terminal: door badges', x: 68, y: 44, chapters: [1, 3], source: 'ev-badge-log', gate: 'booth', lockedText: 'The terminal wants the chief\'s key. Brisk has not offered it.' },
  { id: 'npc-brisk', loc: 'lobby', kind: 'talk', label: 'Teodor Brisk', x: 40, y: 56, chapters: [1, 3], talk: 'brisk', gate: 'none' },
  { id: 'npc-pell', loc: 'lobby', kind: 'talk', label: 'Ottoline Pell', x: 28, y: 64, chapters: [1, 3], talk: 'pell', gate: 'none' },

  { id: 'hs-cradle', loc: 'office', kind: 'evidence', label: 'Memory cradle', x: 30, y: 58, chapters: [1, 3], source: 'f-quill-office', gate: 'none' },
  { id: 'hs-wire', loc: 'office', kind: 'evidence', label: 'Desk terminal', x: 55, y: 56, chapters: [1, 3], source: 'ev-corvane-wire', gate: 'none' },
  { id: 'hs-safe', loc: 'office', kind: 'decision', label: 'Wall safe', x: 80, y: 40, chapters: [2, 3], source: 'ev-ledger', gate: 'safe', lockedText: 'The safe is sealed with Corvane-grade ICE. It is not part of tonight\'s inventory yet.' },
  { id: 'hs-photo', loc: 'office', kind: 'lore', label: 'Framed photograph', x: 14, y: 34, chapters: [1, 3], gate: 'none',
    examine: 'A young Roque and a young Quill in front of a cold room with a hand-painted sign: HALCYON, MEMORIES KEPT. Between them a third person has been cropped out with scissors, so neatly that the cut is the only clean edge. Halvard: "Everyone in this building edits something."' },
  { id: 'npc-quill', loc: 'office', kind: 'talk', label: 'Mara Quill', x: 66, y: 62, chapters: [1, 2], talk: 'quill', gate: 'none' },

  { id: 'hs-rig', loc: 'vault', kind: 'evidence', label: 'Burned feed rig', x: 52, y: 58, chapters: [1, 3], source: 'ev-rig-burn', gate: 'none' },
  { id: 'hs-fuse', loc: 'vault', kind: 'evidence', label: 'Protector panel', x: 20, y: 46, chapters: [1, 3], source: 'ev-fuse', gate: 'none' },
  { id: 'hs-b2-cam', loc: 'vault', kind: 'evidence', label: 'Corridor camera', x: 84, y: 24, chapters: [1, 3], source: 'ev-b2-gap', gate: 'none' },
  { id: 'hs-blackbox', loc: 'vault', kind: 'evidence', label: 'Rig black box', x: 66, y: 74, chapters: [2, 3], source: 'ev-rig-blackbox', gate: 'chapter2', lockedText: 'The lab still has the black box. Tomorrow night.' },
  { id: 'hs-roque-reader', loc: 'vault', kind: 'evidence', label: 'Implant reader', x: 36, y: 74, chapters: [1, 3], source: 'f-roque-last', gate: 'reader', lockedText: 'Roque\'s implant is sealed pending the coroner. The lab will have it open on night three.' },
  { id: 'hs-chalk', loc: 'vault', kind: 'lore', label: 'Marked floor', x: 44, y: 84, chapters: [1, 3], gate: 'none',
    examine: 'A faint outline on the frosted floor where Roque lay, with a smear where the jack was pulled. The racks around it are labelled by decade. Someone has stacked their coat on the nearest shelf, then taken it back. Halvard: "A room remembers differently from the people in it."' },

  { id: 'npc-voss', loc: 'annex', kind: 'talk', label: 'Linnea Voss', x: 36, y: 62, chapters: [2, 3], talk: 'voss', gate: 'none' },
  { id: 'hs-annex-sign', loc: 'annex', kind: 'evidence', label: 'Window and neon circuit', x: 72, y: 36, chapters: [2, 3], source: 'ev-annex-sign', gate: 'none' },
  { id: 'hs-locker', loc: 'annex', kind: 'evidence', label: 'Tool locker', x: 14, y: 56, chapters: [2, 3], source: 'ev-annex-locker', gate: 'none' },

  { id: 'hs-dock-cam', loc: 'dock', kind: 'evidence', label: 'Dock camera box', x: 70, y: 30, chapters: [2, 3], source: 'ev-dock-cam', gate: 'booth', lockedText: 'The camera box is keyed to the chief\'s credentials. Brisk has not offered them.' },
  { id: 'hs-dock-console', loc: 'dock', kind: 'lore', label: 'Key console', x: 28, y: 52, chapters: [2, 3], gate: 'none',
    examine: 'A steel console with a single slot for the dock-key. A fresh, wet thumbprint on the housing. The key sits in its slot, but a console log says it was out twice tonight. Halvard: "A key that leaves its slot twice is a story with two characters."' },

  { id: 'npc-quill-bar', loc: 'bar', kind: 'talk', label: 'Mara Quill', x: 34, y: 60, chapters: [3, 3], talk: 'quill', gate: 'none' },
  { id: 'hs-receipt', loc: 'bar', kind: 'evidence', label: 'The paper till', x: 70, y: 52, chapters: [3, 3], source: 'ev-quill-receipt', gate: 'none' },
];

// ---------------------------------------------------------------- dialogue
const leave: Choice = { id: 'leave', text: 'That is enough for now.', tone: 'leave', next: null };

const quillHub: Choice[] = [
  { id: 'q-corvane', text: 'Ask about the Corvane acquisition.', tone: 'ask', next: 'corvane', once: true },
  { id: 'q-voss', text: 'Ask about Linnea Voss.', tone: 'ask', next: 'voss', once: true },
  { id: 'q-door', text: 'Present the door ledger. "You were still in the lobby at 22:38. You cannot be home by 22:45."', tone: 'present', next: 'confess', requires: { has: ['ev-door-log'] }, effects: [{ flag: 'quillAdmitted' }], once: true },
  { id: 'q-wire', text: 'Present the pending Corvane wire.', tone: 'present', next: 'wire', requires: { has: ['ev-corvane-wire'] }, once: true },
  { id: 'q-feed', text: 'Ask for her feed from the Sump Lantern.', tone: 'ask', next: 'feed', requires: { has: ['t-quill-2'] }, once: true },
  leave,
];
const briskHub: Choice[] = [
  { id: 'b-press', text: 'Press him on the B2 camera gap. Lean on his badge. (pressure)', tone: 'pressure', next: 'pressed', requires: { has: ['ev-b2-gap'], decision: { key: 'brisk', is: 'unset' } }, effects: [{ decision: { key: 'brisk', value: 'pressured' } }] },
  { id: 'b-deal', text: 'Offer a deal: the side job stays off the record if he is straight. (rapport)', tone: 'rapport', next: 'dealt', requires: { has: ['ev-b2-gap'], decision: { key: 'brisk', is: 'unset' } }, effects: [{ decision: { key: 'brisk', value: 'friendly' } }] },
  { id: 'b-discovery', text: 'Ask for his feed of finding the body.', tone: 'ask', next: 'discovery', once: true },
  { id: 'b-pell', text: 'Ask about Ottoline Pell.', tone: 'ask', next: 'pell', once: true },
  leave,
];
const pellHub: Choice[] = [
  { id: 'p-gentle', text: 'Ask kindly if she would share her feed of the corridor. (rapport)', tone: 'rapport', next: 'gift', requires: { notFlags: ['pellTrust', 'pellPressed'] }, effects: [{ flag: 'pellTrust' }] },
  { id: 'p-demand', text: 'Tell her to hand over the feed or be charged with obstruction. (pressure)', tone: 'pressure', next: 'cold', requires: { notFlags: ['pellTrust', 'pellPressed'] }, effects: [{ flag: 'pellPressed' }] },
  { id: 'p-dark', text: 'Ask what she saw in the lobby in the dark.', tone: 'ask', next: 'dark', requires: { anyOf: [{ chapterMin: 2, flags: ['pellTrust'] }, { chapterMin: 3 }] }, once: true },
  leave,
];
const vossHub: Choice[] = [
  { id: 'v-feed', text: 'Ask for her feed of that hour.', tone: 'ask', next: 'feed', once: true },
  { id: 'v-roque', text: 'Ask about Dr. Roque.', tone: 'ask', next: 'roque', once: true },
  { id: 'v-power', text: 'Present the grid log against her feed.', tone: 'present', next: 'power', requires: { has: ['ev-power-log', 'f-voss-annex'] }, effects: [{ flag: 'vossShaken' }], once: true },
  { id: 'v-badge', text: 'Present the vault and dock badge log.', tone: 'present', next: 'badge', requires: { has: ['ev-badge-log'] }, effects: [{ flag: 'vossShaken' }], once: true },
  { id: 'v-cam', text: 'Present the dock camera archive.', tone: 'present', next: 'cam', requires: { has: ['ev-dock-cam'] }, effects: [{ flag: 'vossShaken' }], once: true },
  { id: 'v-ledger', text: 'Present ledger item 2207 about Ilse Voss.', tone: 'present', next: 'admit', requires: { has: ['ev-ledger'], flags: ['vossShaken'] }, effects: [{ flag: 'vossAdmitted' }], once: true },
  leave,
];

export const TALKS: Record<TalkId, Talk> = {
  quill: {
    id: 'quill', who: 'quill', title: 'Mara Quill',
    start: [{ node: 'open' }],
    nodes: {
      open: { id: 'open', say: 'Inspector. Anselm and I built this place out of a rented cold room. I left around twenty to eleven, went straight home and was through my own door by a quarter to. He was alive and furious when I walked out. That is my whole statement.', grants: ['t-quill-1'], choices: quillHub },
      corvane: { id: 'corvane', say: 'Corvane wants the archive for their companion line. They pay what grief is worth, which is a great deal. Anselm said no because it was sentimental. I said yes because I do arithmetic.', choices: quillHub },
      voss: { id: 'voss', say: 'Linnea worshipped him until a month ago. After that he stopped letting her into the ledger room. Ask her what he put in there.', grants: ['t-quill-3'], choices: quillHub },
      confess: { id: 'confess', say: 'You have been reading doors. Fine. 22:38, out the front, straight to the Sump Lantern to meet Corvane\'s broker. I was selling my shares, Inspector. That is not murder.', grants: ['t-quill-2'], choices: quillHub },
      wire: { id: 'wire', say: 'Conditional on his signature. It is a reason, not a knife. If I wanted him dead I would have waited for the wire to clear.', choices: quillHub },
      feed: { id: 'feed', say: 'Take it. It is a drink, a broker and a very bad song. Check the clock on it. I was nowhere near that vault.', grants: ['f-quill-bar'], choices: quillHub },
    },
  },
  brisk: {
    id: 'brisk', who: 'brisk', title: 'Teodor Brisk',
    start: [{ node: 'open' }],
    nodes: {
      open: { id: 'open', say: 'Brisk, night security. I was in the booth all night, eyes on the lobby feed, the dock-key never left my belt. At 23:42 the vault alarm chirped, then the lights died, and I called it in. Roque was already gone by then.', grants: ['t-brisk-1', 't-brisk-2'], choices: briskHub },
      pressed: { id: 'pressed', say: 'Lawyers exist for people like you. Fine. I patched the loop from 23:20 to 23:35 at the dock console. A runner with a crate, nothing to do with Roque. That is all you get. The terminal stays locked until you bring paper.', grants: ['t-brisk-3'], choices: briskHub },
      dealt: { id: 'dealt', say: '...All right. The loop was mine. 23:20 to 23:35, the dock console, a runner with a crate. I left the dock-key in the console and I have been sick about it since. The booth terminal key is yours. Take the logs.', grants: ['t-brisk-3'], effects: [{ flag: 'boothKey' }], choices: briskHub },
      discovery: { id: 'discovery', say: 'I will give you the feed. I do not want to watch it again. Two minutes after the surge, I found him. Two minutes too late.', grants: ['f-brisk-discovery'], choices: briskHub },
      pell: { id: 'pell', say: 'Pell? She came up from B2 around half past, shaking, and sat in the dark with me until the lights returned. She never left my sight.', choices: briskHub },
    },
  },
  pell: {
    id: 'pell', who: 'pell', title: 'Ottoline Pell',
    start: [{ node: 'open' }],
    nodes: {
      open: { id: 'open', say: 'Ottoline Pell. Nights, B2 and the lobby. I was mopping the corridor from 23:25. Between half past and a minute after I heard the doctor and Miss Voss going at it behind the vault door. Then I went up to the lobby and sat with Teodor.', grants: ['t-pell-1'], choices: pellHub },
      gift: { id: 'gift', say: 'You ask like someone who has been told no for a living. Here, take it. I have nothing to hide but a bad knee. Come back, later, and I will tell you about the dark.', grants: ['f-pell-corridor'], choices: pellHub },
      cold: { id: 'cold', say: 'Obstruction. Of a mop. Take your feed, Inspector. Do not expect me to remember anything else until someone has manners, or someone makes me.', grants: ['f-pell-corridor'], choices: pellHub },
      dark: { id: 'dark', say: 'The dark was long. The lights came back like a slap. Teodor never left that lobby, and I will say so in any court. Here is that stretch of my feed.', grants: ['t-pell-2', 'f-pell-lobby'], choices: pellHub },
    },
  },
  voss: {
    id: 'voss', who: 'voss', title: 'Linnea Voss',
    start: [{ node: 'open' }],
    nodes: {
      open: { id: 'open', say: 'Inspector. I was in the Annex from twenty to eleven until they came for me. Cataloguing the Dredge backlog. Ask the shelves.', grants: ['t-voss-1'], choices: vossHub },
      feed: { id: 'feed', say: 'Of course. It is clean; I do not edit my own. You will see the whole hour, window and all.', grants: ['f-voss-annex'], choices: vossHub },
      roque: { id: 'roque', say: 'He taught me to read a timestamp. He taught me everything except how to keep a promise. I loved him the way you love a lighthouse, then I found out lighthouses are a business.', choices: vossHub },
      power: { id: 'power', say: 'A power cut does not touch a memory. Your log is wrong, or my lace ran on its own cell. Do not mistake a clock for a fact.', choices: vossHub },
      badge: { id: 'badge', say: 'Badges get cloned. Ask security who clones them.', choices: vossHub },
      cam: { id: 'cam', say: 'Anyone can wear a grey coat.', choices: vossHub },
      admit: { id: 'admit', say: 'Item 2207. My mother\'s last afternoon, in a spreadsheet. Fine. I pulled the fuse. I waited for the district to fail and for the mains to come back. I stood by him in the dark and asked him to say her name. He would not. I left by the dock at 23:50. Take it. I want her afternoon back more than I want a lawyer.', grants: ['t-voss-3'], choices: [leave] },
    },
  },
};

// ---------------------------------------------------------------- chapters
const decided: { anyOf: { decision: { key: 'brisk'; is: string } }[] } = { anyOf: [{ decision: { key: 'brisk', is: 'friendly' } }, { decision: { key: 'brisk', is: 'pressured' } }] };

export const CHAPTERS: Chapter[] = [
  {
    n: 1, title: 'Dead Air',
    brief: '3 November 2091, 00:41. Rain. The Halcyon Memory Exchange has a dead co-founder in its basement, a lawyer on every landing and a buyer waiting on Friday. The Exchange wants it called self-inflicted. You want it called correctly. Start with the room, the grid and the people who were in the building. Timestamps first.',
    close: 'The first night closes with more questions than doors. Three people lied to you in the first hour, which is about average for Kestrel Bay. The lab promises the rig\'s black box by tomorrow night.',
    goals: [
      { id: 'g1-door', text: 'Read the front-door ledger', req: { has: ['ev-door-log'] } },
      { id: 'g1-power', text: 'Read the grid relay log', req: { has: ['ev-power-log'] } },
      { id: 'g1-rig', text: 'Examine the burned rig', req: { has: ['ev-rig-burn'] } },
      { id: 'g1-fuse', text: 'Examine the surge-protector panel', req: { has: ['ev-fuse'] } },
      { id: 'g1-cam', text: 'Find the B2 camera gap', req: { has: ['ev-b2-gap'] } },
      { id: 'g1-quill', text: 'Take Mara Quill\'s statement', req: { has: ['t-quill-1'] } },
      { id: 'g1-brisk', text: 'Take Teodor Brisk\'s statement', req: { has: ['t-brisk-1'] } },
      { id: 'g1-decide', text: 'Decide how to handle Brisk about the camera gap', req: decided },
    ],
  },
  {
    n: 2, title: 'Ghost Signal',
    brief: 'The black box is back from the lab. The Annex and the dock are open to you. Something about the evening is still not right: the people who say they were somewhere are saying it too smoothly. Find the memory that is too good to be true.',
    close: 'The reconstruction is no longer a theory. You know which memory is lying. What you need now is the reason, and a timeline that survives a magistrate.',
    goals: [
      { id: 'g2-box', text: 'Read the rig black box', req: { has: ['ev-rig-blackbox'] } },
      { id: 'g2-sign', text: 'Check the neon sign circuit in the Annex', req: { has: ['ev-annex-sign'] } },
      { id: 'g2-voss', text: 'Interview Linnea Voss', req: { has: ['t-voss-1'] } },
      { id: 'g2-feed', text: 'Obtain Voss\'s feed of the Annex', req: { has: ['f-voss-annex'] } },
      { id: 'g2-ghost', text: 'Expose the ghost signal', req: { flags: ['rev-ghost'] } },
    ],
  },
  {
    n: 3, title: 'The Reconstruction',
    brief: 'The lab has opened Roque\'s implant. A warrant has cleared the booth terminal and the safe. The Sump Lantern is open to you. Fill the timeline slot by slot, then file a Conclusion the Magistrate cannot take apart.',
    close: '',
    goals: [],
  },
];

// ---------------------------------------------------------------- endings
export const ENDINGS: Ending[] = [
  { id: 'clean-signal', title: 'CLEAN SIGNAL', canonical: true, summary: 'The timeline holds. The ghost is named. The ledger is lawful.',
    body: [
      'The Magistrate reads your reconstruction slot by slot. Every fragment holds. The only one that does not, Linnea Voss\'s Annex memory, is shown for what it is: a neon sign that never shone and a power surge remembered before it happened.',
      'Voss does not argue with the arithmetic. "He sold her last afternoon," she says, "and kept the receipt."',
      'Corvane\'s acquisition stalls under review. Halcyon\'s archive stays where it is. Roque\'s death is entered as homicide by sabotage, and the city files one more case under the quiet law that timestamps outlive the people who edit them.',
      'On the wet steps of the Bureau you check the time, because that is what you do. 06:12. It is only a time. For once, that is enough.',
    ] },
  { id: 'burned-evidence', title: 'BURNED EVIDENCE', canonical: false, summary: 'Right about every minute. Wrong about how you learned them.',
    body: [
      'You named Voss and you were right about the fuse, the dark, the surge and the grief. The defence, however, has read your file. The ledger came out of a black-market decrypt card, and the court throws out item 2207.',
      'Without the motive and without the one document that makes the fuse a choice, the Magistrate sees a woman who stood in a dark room with a man who died of a power cut. Voss walks.',
      'You know. The record says you cannot. On the steps outside you read the time off your wrist and for the first time it feels like a verdict against you.',
    ] },
  { id: 'ghost-remains', title: 'THE GHOST REMAINS', canonical: false, summary: 'You named her; the case could not carry it.',
    body: [
      'You named Linnea Voss, but the Conclusion could not stand: a wrong mechanism, a missing proof, or a timeline that argued with itself. Her counsel calls the forged memory "a tired witness\'s recollection". Charges are dropped by lunch.',
      'The ghost signal does not go away. It goes quiet and waits in someone else\'s archive, still lit by a neon sign that was dead.',
    ] },
  { id: 'wrong-hand', title: 'WRONG HAND', canonical: false, summary: 'Someone is charged. It is the wrong someone.',
    body: [
      'The Magistrate accepts your timeline because nobody can contradict it fast enough. Someone is charged.',
      'Somewhere in the second row of the public gallery, a woman with a lanyard listens with perfect attention.',
    ] },
  { id: 'quiet-closure', title: 'QUIET CLOSURE', canonical: false, summary: 'Self-inflicted. Case closed by Friday.',
    body: [
      'Self-inflicted. The word is easy to file, and the Exchange is grateful. Corvane\'s acquisition closes on Friday.',
      'In the Cold Vault, the dummy fuse is bagged as miscellaneous. Nobody reads the black box. The rain keeps coming. You stay awake anyway, counting minutes you were not asked to count.',
    ] },
];

export const WRONG_EPILOGUE: Record<'quill' | 'brisk' | 'pell', string> = {
  quill: 'Mara Quill is charged on the strength of one lie and a wire. The receipt from the Sump Lantern arrives a week too late to matter to the headlines.',
  brisk: 'Teodor Brisk is charged. The camera loop is the only thing anyone remembers about him, and it is enough.',
  pell: 'Ottoline Pell, sixty-one, is charged because she was nearest. She has never been in a courtroom, and she says so, politely, to the end.',
};

export const INTRO_LINES = [
  'KESTREL BAY, 3 NOVEMBER 2091.',
  'The city keeps what you remember. For a price, it also keeps what you wish you had.',
  'Inspector Noor Halvard of the Bureau of Recorded Events has a dead archivist, a burned rig and a pile of memories that disagree with each other.',
  'Timestamps first. Feelings are cheaper.',
];

export const REVELATIONS: Record<string, { title: string; lines: string[] }> = {
  'rev-restore': {
    title: 'HE DID NOT DIE IN THE DARK',
    lines: [
      'The black box reads the mains, not the lights. The restore spike hit at 23:46:00, and Anselm Roque died 0.4 seconds later.',
      'Every statement built on 23:42 is aimed at the wrong minute. Someone who wanted a man dead at the moment the power came back needed to stand in the right place and to have prepared the rig beforehand.',
    ],
  },
  'rev-ghost': {
    title: 'THE GHOST SIGNAL',
    lines: [
      'Linnea Voss\'s Annex memory is lit by a sign that was dead, and it remembers a surge that had not yet happened.',
      'It is not a memory. It is a forgery. Somebody built her an alibi, and in this building only one person needed one that badly.',
    ],
  },
};
