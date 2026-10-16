// Keyboard mapping. Uses event.code so layouts do not matter.
import type { Dir, FoldKind } from '../core/types.ts';

export type Command =
  | { c: 'move'; dir: Dir }
  | { c: 'fold'; kind: FoldKind }
  | { c: 'interact' }
  | { c: 'undo' }
  | { c: 'restart' }
  | { c: 'hint' }
  | { c: 'menu' }
  | { c: 'mute' }
  | { c: 'orbit'; d: number }
  | { c: 'recenter' };

const MAP: Record<string, Command> = {
  ArrowUp: { c: 'move', dir: 'away' },
  KeyW: { c: 'move', dir: 'away' },
  ArrowDown: { c: 'move', dir: 'toward' },
  KeyS: { c: 'move', dir: 'toward' },
  ArrowLeft: { c: 'move', dir: 'left' },
  KeyA: { c: 'move', dir: 'left' },
  ArrowRight: { c: 'move', dir: 'right' },
  KeyD: { c: 'move', dir: 'right' },
  Space: { c: 'interact' },
  KeyE: { c: 'interact' },
  KeyQ: { c: 'fold', kind: 'rollL' },
  KeyF: { c: 'fold', kind: 'rollR' },
  KeyX: { c: 'fold', kind: 'pitchA' },
  KeyV: { c: 'fold', kind: 'pitchB' },
  KeyZ: { c: 'undo' },
  Backspace: { c: 'restart' },
  KeyR: { c: 'restart' },
  KeyH: { c: 'hint' },
  Escape: { c: 'menu' },
  KeyP: { c: 'menu' },
  KeyM: { c: 'mute' },
  BracketLeft: { c: 'orbit', d: -1 },
  BracketRight: { c: 'orbit', d: 1 },
  KeyC: { c: 'recenter' },
};

export function commandFor(e: KeyboardEvent): Command | null {
  if (e.ctrlKey || e.metaKey || e.altKey) return null;
  return MAP[e.code] ?? null;
}
