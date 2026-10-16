// The contract every view renderer (WebGL 3D or the Canvas 2D fallback) fulfils for the game controller.
import type { Dir, GEvent, GState, Level } from '../core/types.ts';

export type Quality = 'low' | 'medium' | 'high';
export type QualitySetting = 'auto' | Quality;

export interface Flags {
  effects: boolean;
  contrast: boolean;
  hintDir: Dir | null;
  target: number | null;
  hover: number | null;
  showPlayer: boolean;
}

export interface ViewRenderer {
  readonly kind: '3d' | '2d';
  facing: Dir;
  resize(): void;
  /** Screen space taken by UI: the room is framed in what remains. */
  setInsets(top: number, bottom: number, left?: number): void;
  /** Jump to a state with no animation (level start, undo, restart). */
  setState(level: Level, state: GState): void;
  setCaption(text: string): void;
  /** Animate from `before` to `after`, driven by the events the rules produced. */
  apply(before: GState, after: GState, events: GEvent[], effects: boolean): void;
  /** A move was refused: shake toward `dir` and flash the refused cell. */
  blockedNudge(dir: Dir): void;
  /** Slow demonstration fold for title and menu screens. */
  attractTick(dt: number, enabled: boolean): void;
  /** Object under the screen point among candidate ids. */
  pick(mx: number, my: number, ids: number[]): number | null;
  frame(dt: number, f: Flags): void;
  /** An interactable was used (lever pull / switch flip animation). Called before apply(). */
  used(obj: number): void;
  /** Nudge the camera orbit (radians); constrained by the renderer. */
  orbit(dyaw: number, dpitch: number): void;
  recenter(): void;
  setQuality(q: QualitySetting): void;
  /** The quality level actually in use (Auto resolves to one of these). */
  readonly activeQuality: Quality | null;
  dispose(): void;
}
