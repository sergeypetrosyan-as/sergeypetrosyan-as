// Verifies every level is solvable (BFS over the full game state) plus a few rule unit checks.
// Run: node --experimental-strip-types scripts/check-levels.ts
import { LEVELS } from '../src/levels/levels.ts';
import { solve } from '../src/core/solver.ts';
import { applyAction, cloneState, initialState, interactables, stateKey } from '../src/core/rules.ts';
import { FOLD_KINDS, FOLD_TABLE, MATS } from '../src/core/rotations.ts';
import { actionLetter } from '../src/core/describe.ts';
import { compileLevel } from '../src/levels/compile.ts';
import type { Action } from '../src/core/types.ts';

let failures = 0;
const fail = (msg: string): void => {
  failures++;
  console.log('  FAIL: ' + msg);
};

console.log('Rule checks');
if (MATS.length !== 24) fail(`expected 24 orientations, got ${MATS.length}`);
else console.log('  24 orientations generated');
for (const k of FOLD_KINDS) {
  let o = 0;
  for (let i = 0; i < 4; i++) o = FOLD_TABLE[k][o];
  if (o !== 0) fail(`four ${k} folds do not return to identity`);
}
console.log('  four-fold identity holds for all fold kinds');

console.log('\nLevels');
for (const level of LEVELS) {
  const sol = solve(level);
  const shardSol = level.nShards > 0 ? solve(level, { wantShards: true }) : null;
  const noFold = solve(level, { noFolds: true });
  const par = sol.actions ? sol.actions.length : -1;
  console.log(
    `${level.id} ${level.name.padEnd(22)} rooms=${level.rooms.length} crystals=${level.nCrystals} shards=${level.nShards} par=${par} states=${sol.explored}`,
  );
  if (!sol.actions) {
    fail(`${level.id} is NOT solvable (explored ${sol.explored}, capped=${sol.capped})`);
    continue;
  }
  const folds = sol.actions.filter((a: Action) => a.t === 'fold' || (a.t === 'use' && level.objs[a.obj].kind === 'lever')).length;
  console.log(`  solution (${folds} folds): ${sol.actions.map((a: Action) => actionLetter(level, a)).join(' ')}`);
  if (noFold.actions) console.log(`  note: solvable without any fold in ${noFold.actions.length} actions`);
  if (shardSol) {
    if (!shardSol.actions) fail(`${level.id} secret shard cannot be collected`);
    else console.log(`  with shard (${shardSol.actions.length}): ${shardSol.actions.map((a: Action) => actionLetter(level, a)).join(' ')}`);
  }
  // Replay the solution through the rules to confirm it ends in completion.
  let s = initialState(level);
  let done = false;
  for (const a of sol.actions) {
    const r = applyAction(level, s, a);
    if (!r.ok) {
      fail(`${level.id} replay rejected action`);
      break;
    }
    s = r.state;
    if (r.events.some((e) => e.k === 'complete')) done = true;
  }
  if (!done) fail(`${level.id} replay did not complete`);
}

console.log('\nBehaviour checks');
{
  const l1 = LEVELS[0];
  const s0 = initialState(l1);
  const s1 = cloneState(s0);
  const before = stateKey(s0);
  const r = applyAction(l1, s1, { t: 'move', dir: 'left' });
  if (stateKey(s1) !== before) fail('applyAction mutated its input');
  if (r.ok) fail('walking into a wall should be refused');
  else console.log('  walls refuse movement; input state is never mutated');
  if (interactables(l1, s0).length !== 0) fail('level 1-1 should have no interactables');
}

{
  const mk = (rooms: { free: ('rollL' | 'rollR' | 'pitchA' | 'pitchB')[]; layers: string[][] }[], links: Record<string, string> = {}) =>
    compileLevel({ id: 't', chapter: 0, name: 't', objective: '', intro: '', hints: [], links, rooms: rooms.map((r, i) => ({ name: 'r' + i, ...r })) }, 0);
  const expectFail = (label: string, level: ReturnType<typeof mk>, st: ReturnType<typeof initialState>, a: Action, reason: string): void => {
    const r = applyAction(level, st, a);
    if (r.ok || r.reason !== reason) fail(label + ' expected refusal ' + reason + ', got ' + JSON.stringify(r.ok ? 'ok' : r.reason));
    else console.log('  ' + label + ': refused (' + reason + ')');
  };
  const locked = LEVELS[0];
  expectFail('fold not allowed in this room', locked, initialState(locked), { t: 'fold', kind: 'pitchA' }, 'locked');
  const open = mk([{ free: ['rollL'], layers: [['.....', '.@E..', '#####']] }]);
  expectFail('fold with no floor to fall to', open, initialState(open), { t: 'fold', kind: 'rollL' }, 'nofloor');
  const door = mk(
    [{ free: [], layers: [['#####', '#@..#', '#####'], ['#####', '#SD.#', '#####'], ['#####', '#.E.#', '#####']] }],
    { D: 'S' },
  );
  let st = initialState(door);
  for (const a of [{ t: 'use', obj: 0 }, { t: 'move', dir: 'right' }, { t: 'move', dir: 'away' }] as Action[]) {
    const r = applyAction(door, st, a);
    if (!r.ok) fail('door setup failed: ' + r.reason);
    else st = r.state;
  }
  expectFail('closing a door on the player', door, st, { t: 'use', obj: 0 }, 'doorway');
  const portal = mk([
    { free: [], layers: [['#####', '#@a.#', '#####']] },
    { free: ['rollL'], layers: [['.....', '.Ea..', '#####']] },
  ]);
  const s0 = initialState(portal);
  s0.ori[1] = 1;
  const rolled = applyAction(portal, s0, { t: 'move', dir: 'right' });
  if (rolled.ok) fail('portal into a floorless room should be refused');
  else if (rolled.reason !== 'farside') fail('portal refusal reason was ' + rolled.reason);
  else console.log('  portal into a room with no floor: refused (farside)');
  const ok = applyAction(portal, initialState(portal), { t: 'move', dir: 'right' });
  if (!ok.ok || ok.state.room !== 1) fail('portal should carry the player to room 1 when it has a floor');
  else console.log('  portal carries the player to the matching cell of the other room');
}

console.log(failures === 0 ? '\nALL LEVELS SOLVABLE, ALL CHECKS PASSED' : `\n${failures} FAILURE(S)`);
process.exit(failures === 0 ? 0 : 1);
