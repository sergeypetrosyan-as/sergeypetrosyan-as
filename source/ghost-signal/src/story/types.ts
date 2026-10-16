// Pure story types. No DOM access anywhere under src/story.

export type PersonId = 'quill' | 'brisk' | 'voss' | 'pell' | 'roque';
export type LocId = 'lobby' | 'office' | 'vault' | 'annex' | 'dock' | 'bar';
export type PlaceId = LocId | 'home';
export type Scope = PlaceId | 'building';
export type EventId = 'blackout' | 'restore' | 'death';
export type SoundId = 'alarm' | 'voices';
export type ItemId = 'dock-key';
export type SlotId = 's1' | 's2' | 's3' | 's4' | 's5' | 's6';
export type SourceId = string;
export type TalkId = 'quill' | 'brisk' | 'pell' | 'voss';

export type Claim =
  | { k: 'at'; who: PersonId; loc: PlaceId; from: number; to: number }
  | { k: 'holds'; who: PersonId; item: ItemId; from: number; to: number }
  | { k: 'light'; loc: Scope; from: number; to: number; lit: boolean }
  | { k: 'heard'; sound: SoundId; loc: PlaceId; at: number }
  | { k: 'mute'; sound: SoundId; loc: Scope; from: number; to: number }
  | { k: 'event'; ev: EventId; at: number }
  | { k: 'ref'; ev: EventId };

export type SourceKind = 'log' | 'physical' | 'forensic' | 'document' | 'fragment' | 'testimony';

export interface Source {
  id: SourceId;
  kind: SourceKind;
  hard: boolean;
  title: string;
  /** who the source concerns / belongs to, used to group cards on the board */
  subject: PersonId | 'scene';
  where: string;
  text: string;
  claims: Claim[];
  /** fragments only: minute of the recording and whether it can be placed on the timeline */
  ts?: number;
  authentic?: boolean;
  /** testimonies: heard statements that retract this one */
  retractedBy?: SourceId;
  /** evidence that is obtained through a decision and can be tainted */
  tags?: string[];
}

export interface Person { id: PersonId; name: string; role: string; blurb: string; glyph: string }
export interface Location { id: LocId; name: string; floor: string; blurb: string; unlock: number }

export interface Slot { id: SlotId; name: string; from: number; to: number; key: boolean; accept: SourceId[] }

export type Gate = 'booth' | 'chapter2' | 'chapter3' | 'safe' | 'reader' | 'none';

export interface Hotspot {
  id: string;
  loc: LocId;
  kind: 'evidence' | 'talk' | 'lore' | 'decision';
  label: string;
  x: number; y: number;
  chapters: [number, number];
  source?: SourceId;
  talk?: TalkId;
  examine?: string;
  gate: Gate;
  lockedText?: string;
}

export interface Req {
  has?: SourceId[];
  flags?: string[];
  notFlags?: string[];
  chapterMin?: number;
  decision?: { key: 'brisk' | 'bleed' | 'mother'; is: string };
  anyOf?: Req[];
}
export interface Effect { flag?: string; decision?: { key: 'brisk' | 'bleed' | 'mother'; value: string } }
export interface Choice {
  id: string;
  text: string;
  tone: 'ask' | 'pressure' | 'rapport' | 'present' | 'leave';
  next: string | null;
  requires?: Req;
  effects?: Effect[];
  grants?: SourceId[];
  once?: boolean;
}
export interface TalkNode { id: string; say: string; grants?: SourceId[]; effects?: Effect[]; choices: Choice[] }
export interface Talk { id: TalkId; who: PersonId; title: string; start: { req?: Req; node: string }[]; nodes: Record<string, TalkNode> }

export interface Goal { id: string; text: string; req: Req }
export interface Chapter { n: 1 | 2 | 3; title: string; brief: string; close: string; goals: Goal[] }

export type EndingId = 'clean-signal' | 'burned-evidence' | 'ghost-remains' | 'wrong-hand' | 'quiet-closure';
export interface Ending { id: EndingId; title: string; canonical: boolean; summary: string; body: string[] }

export type Culprit = 'quill' | 'brisk' | 'voss' | 'pell' | 'none' | '';
export type Mechanism = 'self-overload' | 'sabotage-restore' | 'blackout-strike' | '';
export type Motive = 'inheritance-money' | 'cover-smuggling' | 'stolen-grief' | 'despair' | '';

export interface Conclusion { culprit: Culprit; mechanism: Mechanism; motive: Motive; support: SourceId[] }

export interface CaseState {
  v: 1;
  chapter: 1 | 2 | 3;
  loc: LocId;
  log: SourceId[];
  flags: Record<string, boolean>;
  decisions: { brisk: 'unset' | 'friendly' | 'pressured'; bleed: 'unset' | 'subpoena' | 'bleed'; mother: 'unset' | 'return' | 'seal' | 'release' };
  talks: Record<string, { nodes: string[]; choices: string[] }>;
  board: Record<SlotId, SourceId | null>;
  links: [SourceId, SourceId][];
  conclusion: Conclusion;
  revelations: string[];
  seenContradictions: string[];
  ending: EndingId | null;
  turn: number;
}

export type GameEvent =
  | { t: 'collected'; id: SourceId }
  | { t: 'contradiction'; id: string; text: string }
  | { t: 'revelation'; id: string }
  | { t: 'chapter'; n: number }
  | { t: 'ending'; id: EndingId }
  | { t: 'locked'; text: string }
  | { t: 'note'; text: string };

export const hhmm = (s: string): number => {
  const [h, m] = s.split(':').map(Number);
  return h * 60 + m + (h < 6 ? 1440 : 0);
};
export const fmt = (m: number): string => {
  const x = ((m % 1440) + 1440) % 1440;
  return String(Math.floor(x / 60)).padStart(2, '0') + ':' + String(x % 60).padStart(2, '0');
};
