// Narrative state model, actions, deduction and endings. Pure, DOM-free.
import type {
  CaseState, Choice, Conclusion, Culprit, EndingId, GameEvent, Hotspot, LocId, Mechanism, Motive, Req, SlotId, Source,
  SourceId, Talk, TalkNode,
} from './types.ts';
import { CHAPTERS, ENDINGS, HOTSPOTS, LOCATIONS, PROOFS, SLOTS, SOURCES, SOURCE_BY_ID, TALKS, WRONG_EPILOGUE } from './data.ts';
import { detect } from './rules.ts';
import type { Contradiction } from './rules.ts';

export const SLOT_IDS: SlotId[] = ['s1', 's2', 's3', 's4', 's5', 's6'];
export const MAX_SUPPORT = 6;

export function newState(): CaseState {
  return {
    v: 1, chapter: 1, loc: 'lobby', log: [], flags: {},
    decisions: { brisk: 'unset', bleed: 'unset', mother: 'unset' },
    talks: {},
    board: { s1: null, s2: null, s3: null, s4: null, s5: null, s6: null },
    links: [],
    conclusion: { culprit: '', mechanism: '', motive: '', support: [] },
    revelations: [], seenContradictions: [], ending: null, turn: 0,
  };
}

export const has = (s: CaseState, id: SourceId): boolean => s.log.includes(id);

export function reqMet(s: CaseState, r?: Req): boolean {
  if (!r) return true;
  if (r.has && !r.has.every((id) => has(s, id))) return false;
  if (r.flags && !r.flags.every((f) => s.flags[f])) return false;
  if (r.notFlags && r.notFlags.some((f) => s.flags[f])) return false;
  if (r.chapterMin !== undefined && s.chapter < r.chapterMin) return false;
  if (r.decision && s.decisions[r.decision.key] !== r.decision.is) return false;
  if (r.anyOf && !r.anyOf.some((x) => reqMet(s, x))) return false;
  return true;
}

export const collected = (s: CaseState): Source[] => s.log.map((id) => SOURCE_BY_ID[id]).filter(Boolean);
export const contradictions = (s: CaseState): Contradiction[] => detect(collected(s), new Set(s.log));

// ---------------------------------------------------------------- after-change processing
function settle(s: CaseState, ev: GameEvent[]): void {
  const cons = contradictions(s);
  for (const c of cons) {
    if (s.seenContradictions.includes(c.id)) continue;
    s.seenContradictions.push(c.id);
    if (!c.resolved) ev.push({ t: 'contradiction', id: c.id, text: c.text });
  }
  const reveal = (id: string): void => {
    if (s.revelations.includes(id)) return;
    s.revelations.push(id);
    s.flags[id] = true;
    ev.push({ t: 'revelation', id });
  };
  if (has(s, 'ev-rig-blackbox')) reveal('rev-restore');
  if (cons.some((c) => (c.a === 'f-voss-annex' || c.b === 'f-voss-annex') && c.verdict === 'refuted' && c.refuted === 'f-voss-annex')) reveal('rev-ghost');
}

function grant(s: CaseState, id: SourceId, ev: GameEvent[]): void {
  if (!SOURCE_BY_ID[id] || has(s, id)) return;
  s.log.push(id);
  ev.push({ t: 'collected', id });
}

// ---------------------------------------------------------------- locations and hotspots
export const locationOpen = (s: CaseState, loc: LocId): boolean => LOCATIONS[loc].unlock <= s.chapter;

export function travelTo(s: CaseState, loc: LocId): GameEvent[] {
  if (!locationOpen(s, loc)) return [{ t: 'locked', text: `${LOCATIONS[loc].name} is not open to you yet.` }];
  s.loc = loc;
  return [];
}

export const hotspotsAt = (s: CaseState, loc: LocId): Hotspot[] =>
  HOTSPOTS.filter((h) => h.loc === loc && s.chapter >= h.chapters[0] && s.chapter <= h.chapters[1]);

export interface HotspotStatus { open: boolean; done: boolean; reason?: string }

export function hotspotStatus(s: CaseState, h: Hotspot): HotspotStatus {
  const done = !!h.source && has(s, h.source);
  switch (h.gate) {
    case 'none': return { open: true, done };
    case 'chapter2': return s.chapter >= 2 ? { open: true, done } : { open: false, done, reason: h.lockedText };
    case 'chapter3':
    case 'reader': return s.chapter >= 3 ? { open: true, done } : { open: false, done, reason: h.lockedText };
    case 'booth': {
      if (s.chapter >= 3) return { open: true, done };
      if (s.decisions.brisk === 'friendly' && s.chapter >= 2) return { open: true, done };
      if (s.decisions.brisk === 'friendly') return { open: false, done, reason: 'Brisk gave you the key, but the audit window does not open until tomorrow night.' };
      if (s.decisions.brisk === 'pressured') return { open: false, done, reason: 'Brisk locked the terminal when you pushed him. It opens with the warrant on the third night.' };
      return { open: false, done, reason: h.lockedText };
    }
    case 'safe': {
      if (s.decisions.bleed === 'bleed') return { open: true, done };
      if (s.chapter >= 3) return { open: true, done };
      if (s.decisions.bleed === 'subpoena') return { open: false, done, reason: 'Subpoena filed. The ledger arrives with the warrant on the third night.' };
      return { open: true, done };
    }
  }
}

export function collectHotspot(s: CaseState, hsId: string): GameEvent[] {
  const h = HOTSPOTS.find((x) => x.id === hsId);
  const ev: GameEvent[] = [];
  if (!h || !h.source || h.loc !== s.loc) return ev;
  if (s.chapter < h.chapters[0] || s.chapter > h.chapters[1]) return [{ t: 'locked', text: h.lockedText ?? 'Not available yet.' }];
  const st = hotspotStatus(s, h);
  if (!st.open) return [{ t: 'locked', text: st.reason ?? 'Locked.' }];
  if (h.kind === 'decision') {
    // the safe: in chapter 3 the subpoena has cleared; earlier the player must decide.
    if (s.decisions.bleed === 'unset') {
      if (s.chapter < 3) return [{ t: 'locked', text: 'Decide how to open the safe first.' }];
      s.decisions.bleed = 'subpoena';
    }
  }
  grant(s, h.source, ev);
  settle(s, ev);
  s.turn++;
  return ev;
}

/** Decision D2: at the safe, in chapter 2, either bleed the ICE with an illegal decrypt now or file a subpoena. */
export function decideSafe(s: CaseState, value: 'bleed' | 'subpoena'): GameEvent[] {
  const ev: GameEvent[] = [];
  if (s.loc !== 'office' || s.chapter < 2 || s.decisions.bleed !== 'unset') return [{ t: 'locked', text: 'Nothing to decide here.' }];
  s.decisions.bleed = value;
  if (value === 'bleed') {
    s.flags.bled = true;
    grant(s, 'ev-ledger', ev);
    ev.push({ t: 'note', text: 'The decrypt card burned out in your hand. The ledger is open and so is the risk.' });
  } else {
    ev.push({ t: 'note', text: 'Subpoena filed. The ledger will arrive with the warrant.' });
  }
  settle(s, ev);
  s.turn++;
  return ev;
}

// ---------------------------------------------------------------- dialogue
export function talkStart(s: CaseState, talk: Talk): string {
  for (const st of talk.start) if (reqMet(s, st.req)) return st.node;
  return talk.start[0].node;
}

export function enterNode(s: CaseState, talk: Talk, nodeId: string): GameEvent[] {
  const node = talk.nodes[nodeId];
  const ev: GameEvent[] = [];
  if (!node) return ev;
  const rec = (s.talks[talk.id] ??= { nodes: [], choices: [] });
  if (!rec.nodes.includes(nodeId)) rec.nodes.push(nodeId);
  for (const g of node.grants ?? []) grant(s, g, ev);
  applyEffects(s, node.effects);
  settle(s, ev);
  return ev;
}

function applyEffects(s: CaseState, effects?: { flag?: string; decision?: { key: 'brisk' | 'bleed' | 'mother'; value: string } }[]): void {
  for (const e of effects ?? []) {
    if (e.flag) s.flags[e.flag] = true;
    if (e.decision) (s.decisions as Record<string, string>)[e.decision.key] = e.decision.value;
  }
}

export function visibleChoices(s: CaseState, talk: Talk, node: TalkNode): Choice[] {
  const rec = s.talks[talk.id];
  return node.choices.filter((c) => reqMet(s, c.requires) && !(c.once && rec?.choices.includes(c.id)));
}

export function choose(s: CaseState, talk: Talk, nodeId: string, choiceId: string): { events: GameEvent[]; next: string | null } {
  const node = talk.nodes[nodeId];
  const choice = node?.choices.find((c) => c.id === choiceId);
  if (!node || !choice || !visibleChoices(s, talk, node).includes(choice)) return { events: [], next: nodeId };
  const rec = (s.talks[talk.id] ??= { nodes: [], choices: [] });
  rec.choices.push(choice.id);
  applyEffects(s, choice.effects);
  const ev: GameEvent[] = [];
  for (const g of choice.grants ?? []) grant(s, g, ev);
  s.turn++;
  if (choice.next) ev.push(...enterNode(s, talk, choice.next));
  else settle(s, ev);
  return { events: ev, next: choice.next };
}

// ---------------------------------------------------------------- chapters
export function chapterGoals(s: CaseState): { id: string; text: string; done: boolean }[] {
  const ch = CHAPTERS[s.chapter - 1];
  return ch.goals.map((g) => ({ id: g.id, text: g.text, done: reqMet(s, g.req) }));
}
export const canCloseDay = (s: CaseState): boolean => s.chapter < 3 && chapterGoals(s).every((g) => g.done);

export function closeDay(s: CaseState): GameEvent[] {
  if (!canCloseDay(s)) return [{ t: 'locked', text: 'The night is not finished. Check the goals.' }];
  s.chapter = (s.chapter + 1) as 2 | 3;
  s.turn++;
  return [{ t: 'chapter', n: s.chapter }];
}

// ---------------------------------------------------------------- reconstruction board
export function slotFor(frag: Source): SlotId | null {
  if (frag.ts === undefined) return null;
  const sl = SLOTS.find((x) => frag.ts! >= x.from && frag.ts! < x.to);
  return sl ? sl.id : null;
}

export function place(s: CaseState, slot: SlotId, fragId: SourceId | null): GameEvent[] {
  const ev: GameEvent[] = [];
  if (fragId === null) { s.board[slot] = null; return ev; }
  const f = SOURCE_BY_ID[fragId];
  if (!f || f.kind !== 'fragment' || !has(s, fragId)) return [{ t: 'locked', text: 'You do not hold that fragment.' }];
  if (slotFor(f) !== slot) return [{ t: 'locked', text: 'The fragment\'s timestamp is outside this slot\'s window.' }];
  s.board[slot] = fragId;
  s.turn++;
  return ev;
}

export interface SlotView { id: SlotId; frag: SourceId | null; status: 'empty' | 'ok' | 'conflict' | 'unverified'; conflicts: string[] }
export interface BoardView { slots: SlotView[]; contradictions: Contradiction[]; keyFilled: boolean; keyAccepted: boolean; valid: boolean }

export function evaluateBoard(s: CaseState): BoardView {
  const placed = SLOT_IDS.map((id) => s.board[id]).filter((x): x is SourceId => !!x).map((id) => SOURCE_BY_ID[id]);
  const hard = collected(s).filter((x) => x.hard);
  const all = detect([...placed, ...hard], new Set(s.log));
  const placedIds = new Set(placed.map((p) => p.id));
  const active = all.filter((c) => !c.resolved && (placedIds.has(c.a) || placedIds.has(c.b)));
  let keyFilled = true;
  let keyAccepted = true;
  const slots: SlotView[] = SLOTS.map((sl) => {
    const frag = s.board[sl.id];
    const mine = frag ? active.filter((c) => c.a === frag || c.b === frag).map((c) => c.id) : [];
    if (sl.key && !frag) keyFilled = false;
    if (sl.key && frag && !sl.accept.includes(frag)) keyAccepted = false;
    let status: SlotView['status'] = 'empty';
    if (frag) status = mine.length ? 'conflict' : sl.key && !sl.accept.includes(frag) ? 'unverified' : 'ok';
    return { id: sl.id, frag, status, conflicts: mine };
  });
  return { slots, contradictions: active, keyFilled, keyAccepted, valid: keyFilled && keyAccepted && active.length === 0 };
}

// ---------------------------------------------------------------- case board links
export function link(s: CaseState, a: SourceId, b: SourceId): GameEvent[] {
  if (a === b || !has(s, a) || !has(s, b)) return [];
  const pair: [SourceId, SourceId] = a < b ? [a, b] : [b, a];
  if (s.links.some((l) => l[0] === pair[0] && l[1] === pair[1])) return [{ t: 'note', text: 'Already linked.' }];
  s.links.push(pair);
  s.turn++;
  const hit = linkConfirmed(s, pair);
  return [{ t: 'note', text: hit ? 'Link confirmed: these two sources contradict each other.' : 'Linked. No rule contradicts these two directly.' }];
}
export function unlink(s: CaseState, a: SourceId, b: SourceId): void {
  s.links = s.links.filter((l) => !(l[0] === a && l[1] === b) && !(l[0] === b && l[1] === a));
}
export function linkConfirmed(s: CaseState, pair: [SourceId, SourceId]): Contradiction | undefined {
  return contradictions(s).find((c) => (c.a === pair[0] && c.b === pair[1]) || (c.a === pair[1] && c.b === pair[0]));
}

// ---------------------------------------------------------------- conclusion and endings
export function setConclusion(s: CaseState, patch: Partial<Pick<Conclusion, 'culprit' | 'mechanism' | 'motive'>>): void {
  Object.assign(s.conclusion, patch);
}
export function toggleSupport(s: CaseState, id: SourceId): boolean {
  const sup = s.conclusion.support;
  const i = sup.indexOf(id);
  if (i >= 0) { sup.splice(i, 1); return true; }
  if (!has(s, id) || sup.length >= MAX_SUPPORT) return false;
  sup.push(id);
  return true;
}

const provenBy = (sets: SourceId[][], support: SourceId[]): boolean => sets.some((set) => set.every((id) => support.includes(id)));

export interface CheckResult {
  complete: boolean;
  answers: { culprit: boolean; mechanism: boolean; motive: boolean };
  proof: { culprit: boolean; mechanism: boolean; motive: boolean };
  supported: { culprit: boolean; mechanism: boolean; motive: boolean };
  board: BoardView;
  lawful: boolean;
  ending: EndingId | null;
}

export function check(s: CaseState): CheckResult {
  const c = s.conclusion;
  const answers = { culprit: c.culprit === 'voss', mechanism: c.mechanism === 'sabotage-restore', motive: c.motive === 'stolen-grief' };
  const proof = {
    culprit: provenBy(PROOFS.culprit, c.support),
    mechanism: provenBy(PROOFS.mechanism, c.support),
    motive: provenBy(PROOFS.motive, c.support),
  };
  const supported = { culprit: answers.culprit && proof.culprit, mechanism: answers.mechanism && proof.mechanism, motive: answers.motive && proof.motive };
  const board = evaluateBoard(s);
  const lawful = s.decisions.bleed !== 'bleed';
  return { complete: !!c.culprit && !!c.mechanism && !!c.motive, answers, proof, supported, board, lawful, ending: endingFor(s, { answers, supported, board, lawful }) };
}

function endingFor(s: CaseState, r?: { answers: CheckResult['answers']; supported: CheckResult['supported']; board: BoardView; lawful: boolean }): EndingId | null {
  const cu: Culprit = s.conclusion.culprit;
  if (!cu) return null;
  if (cu === 'none') return 'quiet-closure';
  if (cu !== 'voss') return 'wrong-hand';
  const c = r ?? (() => {
    const k = check(s);
    return k;
  })();
  const ok = c.supported.culprit && c.supported.mechanism && c.supported.motive && c.board.valid;
  if (!ok) return 'ghost-remains';
  return c.lawful ? 'clean-signal' : 'burned-evidence';
}

export function submit(s: CaseState, mother?: 'return' | 'seal' | 'release'): GameEvent[] {
  if (s.chapter < 3) return [{ t: 'locked', text: 'The Magistrate will not hear a Conclusion before the third night.' }];
  if (s.ending) return [];
  if (!s.conclusion.culprit) return [{ t: 'locked', text: 'Name a culprit, or the Magistrate has nothing to hear.' }];
  if (mother && has(s, 'ev-ledger') && s.conclusion.culprit === 'voss') {
    s.decisions.mother = mother;
    grant(s, 'f-mother', []);
  }
  s.ending = endingFor(s);
  s.turn++;
  return s.ending ? [{ t: 'ending', id: s.ending }] : [];
}

export function epilogue(s: CaseState): string[] {
  const out: string[] = [];
  const cu = s.conclusion.culprit;
  if (s.ending === 'wrong-hand' && (cu === 'quill' || cu === 'brisk' || cu === 'pell')) out.push(WRONG_EPILOGUE[cu]);
  if (s.decisions.brisk === 'friendly') out.push('You kept your word to Teodor Brisk. The runner\'s crate was never mentioned, and the dock-key hangs on a new lanyard.');
  if (s.decisions.brisk === 'pressured') out.push('Brisk faces a charge for the camera loop. You took what you needed and left him the bill.');
  if (s.flags.bled) out.push('The fixer\'s decrypt card sits in a drawer you no longer open.');
  if (s.flags.pellTrust) out.push('Ottoline Pell kept your number, and sends a thermos on cold nights.');
  if (s.decisions.mother === 'return') out.push('You gave Ilse Voss\'s last afternoon back to her daughter. The Bureau noted the irregularity and filed it under mercy.');
  if (s.decisions.mother === 'seal') out.push('Ilse Voss\'s last afternoon sits in the evidence vault under a case number. It was the right procedure. It was not kind.');
  if (s.decisions.mother === 'release') out.push('The memory went public by morning. A city that sells memories wept at the one that was stolen, and Corvane\'s share price fell eleven points.');
  return out;
}

export const endingData = (id: EndingId) => ENDINGS.find((e) => e.id === id)!;

// ---------------------------------------------------------------- save sanitising
export function sanitize(raw: unknown): CaseState | null {
  try {
    if (!raw || typeof raw !== 'object') return null;
    const r = raw as Partial<CaseState>;
    if (r.v !== 1) return null;
    const s = newState();
    if (r.chapter === 1 || r.chapter === 2 || r.chapter === 3) s.chapter = r.chapter;
    if (typeof r.loc === 'string' && r.loc in LOCATIONS && LOCATIONS[r.loc].unlock <= s.chapter) s.loc = r.loc as LocId;
    if (Array.isArray(r.log)) s.log = [...new Set(r.log.filter((x): x is string => typeof x === 'string' && !!SOURCE_BY_ID[x]))];
    if (r.flags && typeof r.flags === 'object') for (const [k, v] of Object.entries(r.flags)) if (v === true) s.flags[k] = true;
    const d = r.decisions;
    if (d) {
      if (d.brisk === 'friendly' || d.brisk === 'pressured') s.decisions.brisk = d.brisk;
      if (d.bleed === 'bleed' || d.bleed === 'subpoena') s.decisions.bleed = d.bleed;
      if (d.mother === 'return' || d.mother === 'seal' || d.mother === 'release') s.decisions.mother = d.mother;
    }
    if (r.talks && typeof r.talks === 'object') {
      for (const [k, v] of Object.entries(r.talks)) {
        if (k in TALKS && v && Array.isArray(v.nodes) && Array.isArray(v.choices)) {
          s.talks[k] = { nodes: v.nodes.filter((x) => typeof x === 'string'), choices: v.choices.filter((x) => typeof x === 'string') };
        }
      }
    }
    if (r.board && typeof r.board === 'object') {
      for (const id of SLOT_IDS) {
        const f = (r.board as Record<string, unknown>)[id];
        if (typeof f === 'string' && s.log.includes(f)) s.board[id] = f;
      }
    }
    if (Array.isArray(r.links)) {
      for (const l of r.links) if (Array.isArray(l) && l.length === 2 && s.log.includes(l[0]) && s.log.includes(l[1])) s.links.push([l[0], l[1]]);
    }
    const c = r.conclusion;
    if (c) {
      if (['quill', 'brisk', 'voss', 'pell', 'none'].includes(c.culprit)) s.conclusion.culprit = c.culprit;
      if (['self-overload', 'sabotage-restore', 'blackout-strike'].includes(c.mechanism)) s.conclusion.mechanism = c.mechanism as Mechanism;
      if (['inheritance-money', 'cover-smuggling', 'stolen-grief', 'despair'].includes(c.motive)) s.conclusion.motive = c.motive as Motive;
      if (Array.isArray(c.support)) s.conclusion.support = c.support.filter((x) => s.log.includes(x)).slice(0, MAX_SUPPORT);
    }
    if (Array.isArray(r.revelations)) s.revelations = r.revelations.filter((x) => typeof x === 'string');
    if (Array.isArray(r.seenContradictions)) s.seenContradictions = r.seenContradictions.filter((x) => typeof x === 'string');
    if (r.ending && ENDINGS.some((e) => e.id === r.ending)) s.ending = r.ending;
    if (typeof r.turn === 'number') s.turn = r.turn;
    return s;
  } catch {
    return null;
  }
}

export const allSourceIds = SOURCES.map((x) => x.id);
