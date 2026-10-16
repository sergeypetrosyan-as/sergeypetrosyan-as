// Breadth-first search over the full game state. Used by the level check, hints and soft-lock detection.
import type { Action, GState, Level } from './types.ts';
import { applyAction, candidateActions, initialState, stateKey } from './rules.ts';

export interface SolveOptions {
  from?: GState;
  cap?: number;
  wantShards?: boolean;
  noFolds?: boolean;
}

export interface SolveResult {
  actions: Action[] | null;
  explored: number;
  capped: boolean;
}

export function solve(level: Level, opts: SolveOptions = {}): SolveResult {
  const start = opts.from ?? initialState(level);
  const cap = opts.cap ?? 400000;
  const seen = new Map<string, number>(); // key -> parent index
  const nodes: { s: GState; parent: number; a: Action | null }[] = [{ s: start, parent: -1, a: null }];
  seen.set(stateKey(start), 0);
  for (let i = 0; i < nodes.length; i++) {
    if (nodes.length > cap) return { actions: null, explored: nodes.length, capped: true };
    const cur = nodes[i].s;
    for (const a of candidateActions(level, cur)) {
      if (opts.noFolds && (a.t === 'fold' || (a.t === 'use' && level.objs[a.obj].kind === 'lever'))) continue;
      const r = applyAction(level, cur, a);
      if (!r.ok) continue;
      const key = stateKey(r.state);
      const done = r.events.some((e) => e.k === 'complete') && (!opts.wantShards || (r.state.got & level.shardMask) === level.shardMask);
      if (done) {
        const path: Action[] = [a];
        for (let n = i; nodes[n].parent >= 0; n = nodes[n].parent) path.push(nodes[n].a as Action);
        path.reverse();
        return { actions: path, explored: nodes.length, capped: false };
      }
      if (seen.has(key)) continue;
      seen.set(key, nodes.length);
      nodes.push({ s: r.state, parent: i, a });
    }
  }
  return { actions: null, explored: nodes.length, capped: false };
}

export function initialSolve(level: Level, opts: SolveOptions = {}): SolveResult {
  return solve(level, { ...opts, from: initialState(level) });
}
