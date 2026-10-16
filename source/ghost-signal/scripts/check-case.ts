// Pure-logic verification of the GHOST SIGNAL case. Run:
//   node --experimental-strip-types scripts/check-case.ts
// It drives the real engine with player actions; nothing here touches the DOM.
import { CHAPTERS, ENDINGS, HOTSPOTS, PROOFS, SLOTS, SOURCES, SOURCE_BY_ID, TALKS } from '../src/story/data.ts';
import { detect } from '../src/story/rules.ts';
import {
  canCloseDay, check, choose, closeDay, collectHotspot, decideSafe, enterNode, evaluateBoard, hotspotStatus, hotspotsAt, link,
  newState, place, sanitize, setConclusion, slotFor, submit, talkStart, toggleSupport, travelTo, visibleChoices, contradictions,
} from '../src/story/engine.ts';
import type { CaseState, EndingId, GameEvent, TalkId } from '../src/story/types.ts';

let checks = 0;
const failures: string[] = [];
function ok(cond: unknown, msg: string): void {
  checks++;
  if (!cond) failures.push(msg);
}

// ------------------------------------------------------------------ action helpers
function grab(s: CaseState, hsId: string): GameEvent[] {
  const h = HOTSPOTS.find((x) => x.id === hsId);
  if (!h) throw new Error('no hotspot ' + hsId);
  const t = travelTo(s, h.loc);
  if (t.length) return t;
  return collectHotspot(s, hsId);
}
function say(s: CaseState, talkId: TalkId, ...choices: string[]): void {
  const talk = TALKS[talkId];
  const hs = HOTSPOTS.find((h) => h.talk === talkId && s.chapter >= h.chapters[0] && s.chapter <= h.chapters[1]);
  if (!hs) throw new Error(`${talkId} is not available in chapter ${s.chapter}`);
  travelTo(s, hs.loc);
  let node = talkStart(s, talk);
  enterNode(s, talk, node);
  for (const c of choices) {
    const vis = visibleChoices(s, talk, talk.nodes[node]);
    if (!vis.some((v) => v.id === c)) throw new Error(`choice ${c} not visible in ${talkId}/${node} (ch${s.chapter})`);
    const r = choose(s, talk, node, c);
    if (r.next === null) return;
    node = r.next;
  }
}
const FRAGS: Record<string, string> = { s1: 'f-quill-office', s2: 'f-quill-bar', s3: 'f-pell-corridor', s4: 'f-roque-last', s5: 'f-pell-lobby', s6: 'f-brisk-discovery' };
const SUPPORT = ['f-voss-annex', 'ev-power-log', 'ev-badge-log', 'ev-fuse', 'ev-rig-blackbox', 'ev-ledger'];

interface Opts { brisk: 'friendly' | 'pressured'; bleed: 'subpoena' | 'bleed'; pell: 'p-gentle' | 'p-demand' }

function playToChapter3(o: Opts): CaseState {
  const s = newState();
  // Chapter 1
  for (const h of ['hs-door-ledger', 'hs-relay', 'hs-booth-recorder', 'hs-cradle', 'hs-wire', 'hs-rig', 'hs-fuse', 'hs-b2-cam']) grab(s, h);
  say(s, 'quill', 'q-door', 'q-voss', 'q-corvane', 'q-wire', 'q-feed');
  say(s, 'brisk', o.brisk === 'friendly' ? 'b-deal' : 'b-press', 'b-discovery', 'b-pell');
  say(s, 'pell', o.pell);
  ok(canCloseDay(s), `chapter 1 goals complete (${o.brisk}/${o.pell})`);
  closeDay(s);
  // Chapter 2
  grab(s, 'hs-blackbox'); grab(s, 'hs-annex-sign'); grab(s, 'hs-locker');
  say(s, 'voss', 'v-feed', 'v-roque', 'v-power');
  if (o.brisk === 'friendly') { grab(s, 'hs-booth-loop'); grab(s, 'hs-booth-badge'); grab(s, 'hs-dock-cam'); say(s, 'voss', 'v-badge', 'v-cam'); }
  travelTo(s, 'office');
  decideSafe(s, o.bleed);
  if (o.pell === 'p-gentle') say(s, 'pell', 'p-dark');
  ok(canCloseDay(s), 'chapter 2 goals complete');
  closeDay(s);
  // Chapter 3
  grab(s, 'hs-safe'); grab(s, 'hs-roque-reader'); grab(s, 'hs-receipt');
  grab(s, 'hs-booth-loop'); grab(s, 'hs-booth-badge'); grab(s, 'hs-dock-cam');
  if (o.pell === 'p-demand') say(s, 'pell', 'p-dark');
  if (o.brisk === 'friendly') say(s, 'voss', 'v-ledger'); else say(s, 'voss', 'v-badge', 'v-cam', 'v-ledger');
  return s;
}
function fillBoard(s: CaseState): void {
  for (const [slot, frag] of Object.entries(FRAGS)) place(s, slot as 's1', frag);
}
function conclude(s: CaseState, culprit: string, mech: string, motive: string, support = SUPPORT): void {
  setConclusion(s, { culprit: culprit as 'voss', mechanism: mech as 'sabotage-restore', motive: motive as 'stolen-grief' });
  s.conclusion.support = [];
  for (const id of support) toggleSupport(s, id);
}

// ------------------------------------------------------------------ 1 data integrity
{
  const ids = new Set<string>();
  for (const x of SOURCES) { ok(!ids.has(x.id), `duplicate source id ${x.id}`); ids.add(x.id); }
  for (const x of SOURCES) {
    for (const c of x.claims) {
      if ('from' in c) ok(c.from <= c.to, `${x.id}: claim interval inverted`);
    }
    if (x.retractedBy) ok(!!SOURCE_BY_ID[x.retractedBy] && SOURCE_BY_ID[x.retractedBy].kind === 'testimony', `${x.id}: bad retractedBy`);
    if (x.kind === 'fragment' && x.id !== 'f-mother') ok(x.ts !== undefined && slotFor(x) !== null, `${x.id}: fragment timestamp not inside a slot window`);
    ok(x.hard === (x.kind !== 'fragment' && x.kind !== 'testimony'), `${x.id}: hard flag matches kind`);
  }
  for (const sl of SLOTS) for (const f of sl.accept) ok(SOURCE_BY_ID[f] && slotFor(SOURCE_BY_ID[f]) === sl.id, `slot ${sl.id} accepts ${f} outside its window`);
  // obtainability
  const obtainable = new Set<string>(['f-mother']);
  for (const h of HOTSPOTS) {
    if (h.source) { ok(!!SOURCE_BY_ID[h.source], `hotspot ${h.id} source exists`); obtainable.add(h.source); }
    if (h.talk) ok(!!TALKS[h.talk], `hotspot ${h.id} talk exists`);
    if (h.kind === 'lore') ok(!!h.examine, `lore ${h.id} has text`);
  }
  for (const t of Object.values(TALKS)) {
    ok(!!t.nodes[t.start[0].node], `talk ${t.id} start exists`);
    for (const n of Object.values(t.nodes)) {
      for (const g of n.grants ?? []) { ok(!!SOURCE_BY_ID[g], `node ${n.id} grant ${g}`); obtainable.add(g); }
      for (const c of n.choices) {
        if (c.next) ok(!!t.nodes[c.next], `${t.id}/${n.id}/${c.id} next exists`);
        for (const g of c.grants ?? []) obtainable.add(g);
      }
    }
  }
  for (const x of SOURCES) ok(obtainable.has(x.id), `source ${x.id} is obtainable by some action`);
  for (const ch of CHAPTERS) for (const g of ch.goals) for (const id of g.req.has ?? []) ok(!!SOURCE_BY_ID[id], `goal ${g.id} references ${id}`);
  for (const k of ['culprit', 'mechanism', 'motive'] as const) for (const set of PROOFS[k]) for (const id of set) ok(!!SOURCE_BY_ID[id], `proof ${k} references ${id}`);
  ok(ENDINGS.length >= 3 && ENDINGS.filter((e) => e.canonical).length === 1, 'one canonical ending among at least 3');
  ok(CHAPTERS.length === 3, 'three chapters');
}

// ------------------------------------------------------------------ 2 rule engine facts
{
  const hard = SOURCES.filter((x) => x.hard);
  ok(detect(hard, new Set(hard.map((x) => x.id))).length === 0, 'no contradictions among hard sources');
  const truthful = SOURCES.filter((x) => x.hard || (x.kind === 'fragment' && x.authentic) || ['t-quill-2', 't-quill-3', 't-brisk-3', 't-pell-1', 't-pell-2', 't-voss-3'].includes(x.id));
  const bad = detect(truthful, new Set(truthful.map((x) => x.id)));
  ok(bad.length === 0, `canonical truth set has no contradictions (found: ${bad.map((b) => b.id).join(', ')})`);

  const all = detect(SOURCES, new Set(SOURCES.map((x) => x.id)));
  const has = (rule: string, a: string, b: string): boolean => all.some((c) => c.rule === rule && ((c.a === a && c.b === b) || (c.a === b && c.b === a)));
  const expect: [string, string, string][] = [
    ['R2', 't-quill-1', 'ev-door-log'], ['R1', 't-brisk-1', 'ev-loop-log'], ['R7', 't-brisk-1', 'ev-badge-log'],
    ['R4', 't-brisk-2', 'ev-rig-blackbox'], ['R5', 't-brisk-2', 'ev-power-log'],
    ['R3', 'f-voss-annex', 'ev-power-log'], ['R3', 'f-voss-annex', 'ev-annex-sign'], ['R6', 'f-voss-annex', 'ev-power-log'],
    ['R1', 'f-voss-annex', 'ev-badge-log'], ['R1', 'f-voss-annex', 'ev-dock-cam'], ['R1', 'f-voss-annex', 'f-roque-last'],
    ['R1', 'f-voss-annex', 'f-pell-corridor'], ['R1', 't-voss-1', 'ev-badge-log'], ['R1', 't-voss-1', 'ev-dock-cam'],
  ];
  for (const [r, a, b] of expect) ok(has(r, a, b), `expected ${r} between ${a} and ${b}`);
  const forged = all.filter((c) => c.verdict === 'refuted' && c.refuted === 'f-voss-annex');
  ok(forged.length >= 3, 'forged fragment refuted by at least three hard sources');
  ok(!SOURCES.some((x) => x.authentic && all.some((c) => c.verdict === 'refuted' && c.refuted === x.id)), 'no authentic fragment is ever refuted by a hard source');
  ok(all.filter((c) => c.verdict === 'disputed').every((c) => SOURCE_BY_ID[c.a].kind !== 'log'), 'disputed pairs are soft/soft');
  // retraction resolves
  const withRetract = detect([SOURCE_BY_ID['t-quill-1'], SOURCE_BY_ID['ev-door-log'], SOURCE_BY_ID['t-quill-2']], new Set(['t-quill-1', 'ev-door-log', 't-quill-2']));
  ok(withRetract.length > 0 && withRetract.every((c) => c.resolved), 'a retracted lie is marked resolved');
  const noRetract = detect([SOURCE_BY_ID['t-quill-1'], SOURCE_BY_ID['ev-door-log']], new Set(['t-quill-1', 'ev-door-log']));
  ok(noRetract.some((c) => !c.resolved), 'an unretracted lie stays active');
}

// ------------------------------------------------------------------ 3 gating and invariants at the start
{
  const s = newState();
  ok(collectHotspot(s, 'hs-booth-loop').some((e) => e.t === 'locked') && !s.log.includes('ev-loop-log'), 'booth terminal locked before the deal');
  ok(grab(s, 'hs-blackbox').length > 0 && !s.log.includes('ev-rig-blackbox'), 'black box not collectable on night one');
  const here = s.loc;
  ok(travelTo(s, 'annex').some((e) => e.t === 'locked') && s.loc === here, 'annex closed on night one');
  ok(hotspotsAt(s, 'office').every((h) => h.id !== 'hs-safe'), 'safe not listed on night one');
  ok(!canCloseDay(s), 'cannot close day one empty-handed');
  ok(closeDay(s).some((e) => e.t === 'locked') && s.chapter === 1, 'close day refused');
  ok(submit(s).some((e) => e.t === 'locked'), 'no conclusion on night one');
  const rt = sanitize(JSON.parse(JSON.stringify(s)));
  ok(rt !== null && JSON.stringify(rt) === JSON.stringify(s), 'save roundtrip preserves a fresh state');
  ok(sanitize({ v: 2 }) === null && sanitize('junk') === null && sanitize(null) === null, 'corrupted saves rejected');
}

// ------------------------------------------------------------------ 4 canonical playthrough
const canon = playToChapter3({ brisk: 'friendly', bleed: 'subpoena', pell: 'p-gentle' });
{
  const s = canon;
  ok(s.chapter === 3, 'reached chapter 3');
  ok(s.revelations.includes('rev-restore') && s.revelations.includes('rev-ghost'), 'both mid-case revelations fired');
  ok(s.decisions.brisk === 'friendly' && s.flags.boothKey, 'friendly decision sets the booth key flag');
  ok(s.decisions.bleed === 'subpoena' && !s.flags.bled, 'lawful ledger');
  ok(['ev-ledger', 'f-roque-last', 'ev-quill-receipt', 'ev-dock-cam', 'ev-badge-log'].every((id) => s.log.includes(id)), 'chapter 3 evidence collected');
  fillBoard(s);
  const b = evaluateBoard(s);
  ok(b.valid && b.contradictions.length === 0, 'canonical board valid with zero active contradictions');
  // consistency: nobody holds a fragment that was refuted by hard evidence on the board
  place(s, 's4', 'f-voss-annex');
  ok(!evaluateBoard(s).valid && evaluateBoard(s).slots[3].status === 'conflict', 'forged fragment on the board conflicts');
  place(s, 's4', 'f-roque-last');
  ok(place(s, 's1', 'f-voss-annex').some((e) => e.t === 'locked') && s.board.s1 === 'f-quill-office', 'fragment cannot go outside its window');
  ok(link(s, 'f-voss-annex', 'ev-power-log').some((e) => e.t === 'note' && /confirmed/.test(e.text)), 'linking a contradicting pair is confirmed');
  ok(link(s, 'ev-door-log', 'ev-fuse').some((e) => e.t === 'note' && /No rule/.test(e.text)), 'linking an unrelated pair is neutral');
  // each alternative culprit proof set alone suffices
  for (const set of PROOFS.culprit) {
    const t = JSON.parse(JSON.stringify(s)) as CaseState;
    conclude(t, 'voss', 'sabotage-restore', 'stolen-grief', [...set, 'ev-fuse', 'ev-rig-blackbox', 'ev-ledger'].slice(0, 6));
    const r = check(t);
    ok(r.ending === 'clean-signal', `culprit proof set ${set.join('+')} yields clean-signal (got ${r.ending})`);
  }
  for (const set of PROOFS.mechanism) {
    const t = JSON.parse(JSON.stringify(s)) as CaseState;
    conclude(t, 'voss', 'sabotage-restore', 'stolen-grief', ['f-voss-annex', 'ev-power-log', 'ev-badge-log', ...set, 'ev-ledger'].slice(0, 6));
    ok(check(t).ending === 'clean-signal', `mechanism proof set ${set.join('+')} yields clean-signal`);
  }
  const states = new Set<EndingId>();
  // red herrings are not valid conclusions, even with perfect support and board
  for (const culprit of ['quill', 'brisk', 'pell']) {
    const t = JSON.parse(JSON.stringify(s)) as CaseState;
    conclude(t, culprit, 'sabotage-restore', 'stolen-grief');
    const r = check(t);
    ok(!r.supported.culprit && r.ending === 'wrong-hand', `red herring ${culprit} is not a valid conclusion`);
    states.add(r.ending as EndingId);
  }
  { const t = JSON.parse(JSON.stringify(s)) as CaseState; conclude(t, 'none', 'self-overload', 'despair'); ok(check(t).ending === 'quiet-closure' && !check(t).supported.mechanism, 'suicide ruling is not valid'); }
  for (const mech of ['self-overload', 'blackout-strike']) { const t = JSON.parse(JSON.stringify(s)) as CaseState; conclude(t, 'voss', mech, 'stolen-grief'); ok(check(t).ending === 'ghost-remains', `wrong mechanism ${mech} fails`); }
  for (const mo of ['inheritance-money', 'cover-smuggling', 'despair']) { const t = JSON.parse(JSON.stringify(s)) as CaseState; conclude(t, 'voss', 'sabotage-restore', mo); ok(check(t).ending === 'ghost-remains', `wrong motive ${mo} fails`); }
  { const t = JSON.parse(JSON.stringify(s)) as CaseState; conclude(t, 'voss', 'sabotage-restore', 'stolen-grief', ['ev-fuse', 'ev-rig-blackbox', 'ev-ledger']); ok(check(t).ending === 'ghost-remains', 'missing culprit proof fails'); }
  { const t = JSON.parse(JSON.stringify(s)) as CaseState; conclude(t, 'voss', 'sabotage-restore', 'stolen-grief'); place(t, 's4', 'f-voss-annex'); ok(check(t).ending === 'ghost-remains', 'forged fragment on the board fails'); }
  { const t = JSON.parse(JSON.stringify(s)) as CaseState; conclude(t, 'voss', 'sabotage-restore', 'stolen-grief'); place(t, 's6', null); ok(check(t).ending === 'ghost-remains', 'an empty key slot fails'); }
  // canonical submit
  conclude(s, 'voss', 'sabotage-restore', 'stolen-grief');
  const ev = submit(s, 'return');
  ok(ev.some((e) => e.t === 'ending' && e.id === 'clean-signal') && s.ending === 'clean-signal', 'canonical ending reached: clean-signal');
}

// ------------------------------------------------------------------ 5 every ending reachable by player actions
const reached = new Map<EndingId, string>();
function finish(label: string, o: Opts, culprit: string, mech: string, motive: string, mutate?: (s: CaseState) => void): void {
  const s = playToChapter3(o);
  fillBoard(s);
  mutate?.(s);
  conclude(s, culprit, mech, motive);
  submit(s, 'seal');
  if (s.ending && !reached.has(s.ending)) reached.set(s.ending, label);
}
finish('friendly/lawful, correct', { brisk: 'friendly', bleed: 'subpoena', pell: 'p-gentle' }, 'voss', 'sabotage-restore', 'stolen-grief');
finish('pressured Brisk, demanded Pell, lawful, correct', { brisk: 'pressured', bleed: 'subpoena', pell: 'p-demand' }, 'voss', 'sabotage-restore', 'stolen-grief');
finish('bled ledger, correct', { brisk: 'friendly', bleed: 'bleed', pell: 'p-gentle' }, 'voss', 'sabotage-restore', 'stolen-grief');
finish('wrong mechanism', { brisk: 'friendly', bleed: 'subpoena', pell: 'p-gentle' }, 'voss', 'blackout-strike', 'stolen-grief');
finish('accuse Quill', { brisk: 'friendly', bleed: 'subpoena', pell: 'p-gentle' }, 'quill', 'sabotage-restore', 'inheritance-money');
finish('suicide ruling', { brisk: 'friendly', bleed: 'subpoena', pell: 'p-gentle' }, 'none', 'self-overload', 'despair');
const ids: EndingId[] = ['clean-signal', 'burned-evidence', 'ghost-remains', 'wrong-hand', 'quiet-closure'];
for (const id of ids) ok(reached.has(id), `ending ${id} reachable`);
ok(ENDINGS.every((e) => reached.has(e.id)), 'every authored ending is reachable');
ok((reached.get('clean-signal') ?? '').startsWith('friendly'), 'canonical ending reached on the friendly lawful route');
{
  // the pressured route is lawful and also yields the canonical ending (alternate discovery path)
  const s = playToChapter3({ brisk: 'pressured', bleed: 'subpoena', pell: 'p-demand' });
  ok(hotspotStatus(s, HOTSPOTS.find((h) => h.id === 'hs-booth-badge')!).open, 'warrant opens the terminal on night three');
  ok(s.log.includes('t-pell-2'), 'Pell talks on night three even if pressured');
}
{
  // pressured Brisk: terminal stays locked on night two
  const s = newState();
  for (const h of ['hs-door-ledger', 'hs-relay', 'hs-rig', 'hs-fuse', 'hs-b2-cam']) grab(s, h);
  say(s, 'quill'); say(s, 'brisk', 'b-press');
  ok(s.decisions.brisk === 'pressured', 'pressure decision recorded');
  ok(!hotspotStatus(s, HOTSPOTS.find((h) => h.id === 'hs-booth-loop')!).open, 'pressured Brisk keeps the terminal locked before the warrant');
  const before = contradictions(s).length;
  ok(before > 0, 'contradictions already surfacing on night one');
}

// ------------------------------------------------------------------ 6 state consistency after every route
{
  for (const [label, o] of [['canon', canon]] as const) {
    ok(o.ending !== null, `${label}: ended`);
  }
  const s = playToChapter3({ brisk: 'friendly', bleed: 'bleed', pell: 'p-gentle' });
  ok(s.flags.bled && s.decisions.bleed === 'bleed' && s.log.includes('ev-ledger'), 'bleed decision and ledger agree');
  const s2 = playToChapter3({ brisk: 'pressured', bleed: 'subpoena', pell: 'p-demand' });
  ok(s2.decisions.brisk === 'pressured' && !s2.flags.boothKey, 'pressure leaves no key flag');
  ok(!s2.flags.pellTrust && s2.flags.pellPressed, 'Pell pressure flag set');
  // every collected source has a legitimate collection path (hotspot or talk grant): replay logic already enforced it; verify no stray ids
  ok(s.log.every((id) => !!SOURCE_BY_ID[id]), 'log only contains known sources');
  ok(new Set(s.log).size === s.log.length, 'log has no duplicates');
}

if (failures.length) {
  console.log(`FAILED ${failures.length} of ${checks} checks`);
  for (const f of failures) console.log(' - ' + f);
  throw new Error('check-case failed');
}
console.log(`OK: ${checks} checks passed`);
console.log('Endings reached: ' + [...reached.entries()].map(([k, v]) => `${k} (${v})`).join('; '));
