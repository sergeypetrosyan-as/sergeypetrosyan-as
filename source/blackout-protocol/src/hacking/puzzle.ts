import type { Puzzle } from '../sim/types.ts';
import { nextRand } from '../sim/rng.ts';

export const DIR_NAMES = ['UP', 'RIGHT', 'DOWN', 'LEFT'] as const;

/** Sequence-memory puzzle: watch the pattern, then repeat it before the timer runs out. */
export function newPuzzle(state: { rng: number }, terminal: number, len: number, limitOverride?: number): Puzzle {
  const seq: number[] = [];
  for (let i = 0; i < len; i++) seq.push(Math.floor(nextRand(state) * 4));
  const showTotal = 1.4 + 0.5 * len;
  const limit = limitOverride ?? 5 + 1.3 * len;
  return { terminal, seq, input: [], phase: 'show', showT: showTotal, showTotal, timeLeft: limit, limit, endT: 0 };
}

export function updatePuzzle(p: Puzzle, dt: number): void {
  if (p.phase === 'show') {
    p.showT -= dt;
    if (p.showT <= 0) p.phase = 'input';
  } else if (p.phase === 'input') {
    p.timeLeft -= dt;
    if (p.timeLeft <= 0) { p.timeLeft = 0; p.phase = 'fail'; p.endT = 0.9; }
  } else {
    p.endT -= dt;
  }
}

export type PuzzleResult = 'none' | 'progress' | 'ok' | 'fail';

export function puzzleInput(p: Puzzle, dir: number): PuzzleResult {
  if (p.phase !== 'input' || dir < 0 || dir > 3) return 'none';
  const idx = p.input.length;
  if (p.seq[idx] !== dir) { p.phase = 'fail'; p.endT = 0.9; return 'fail'; }
  p.input.push(dir);
  if (p.input.length >= p.seq.length) { p.phase = 'ok'; p.endT = 0.7; return 'ok'; }
  return 'progress';
}
