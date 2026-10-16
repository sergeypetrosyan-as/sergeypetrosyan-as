// Human-readable names for actions (hints, solver logs). Pure.
import type { Action, FoldKind, Level } from './types.ts';

const FOLD_LETTER: Record<FoldKind, string> = { rollL: 'Q', rollR: 'F', pitchA: 'X', pitchB: 'V' };

export function actionLetter(level: Level, a: Action): string {
  if (a.t === 'move') return a.dir === 'right' ? 'R' : a.dir === 'left' ? 'L' : a.dir === 'away' ? 'A' : 'T';
  if (a.t === 'fold') return FOLD_LETTER[a.kind];
  const o = level.objs[a.obj];
  return o.kind === 'lever' ? 'E[lever]' : 'E[switch]';
}

export const FOLD_NAME: Record<FoldKind, string> = {
  rollL: 'roll the room so the left wall becomes the floor',
  rollR: 'roll the room so the right wall becomes the floor',
  pitchA: 'pitch the room so the near wall becomes the floor',
  pitchB: 'pitch the room so the far wall becomes the floor',
};

export function describeAction(level: Level, a: Action): { text: string; key: string } {
  if (a.t === 'move') {
    const t = { right: 'Step right', left: 'Step left', away: 'Step away from you', toward: 'Step toward you' }[a.dir];
    const k = { right: 'D / Right', left: 'A / Left', away: 'W / Up', toward: 'S / Down' }[a.dir];
    return { text: t, key: k };
  }
  if (a.t === 'fold') {
    const k = { rollL: 'Q', rollR: 'F', pitchA: 'X', pitchB: 'V' }[a.kind];
    return { text: `Fold: ${FOLD_NAME[a.kind]}`, key: k };
  }
  const o = level.objs[a.obj];
  return o.kind === 'lever' ? { text: 'Pull the fold lever', key: 'E / Space' } : { text: 'Flip the switch', key: 'E / Space' };
}
