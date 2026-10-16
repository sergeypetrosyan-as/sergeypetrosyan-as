import type { World } from '../sim/types.ts';
import type { Settings } from '../storage/save.ts';
import type { Fx } from './fx.ts';
import type { StickView } from './hud.ts';
import type { Preset } from './quality.ts';

/** Common surface of the WebGL renderer and the Canvas 2D fallback. Renderers read sim state and never mutate it. */
export interface GameRenderer {
  readonly kind: '3d' | '2d';
  /** device-pixel ratio of the HUD/input canvas (touch stick coordinates use it) */
  dpr: number;
  resize(): void;
  resetCamera(): void;
  /** called at the start of every run; rebuilds arena-specific GPU resources when the arena changes */
  resetRun(w: World): void;
  draw(w: World | null, fx: Fx, s: Settings, time: number, stick: StickView | null): void;
  /** client (CSS px) coordinates to sim coordinates on the floor plane */
  screenToWorld(cx: number, cy: number): { x: number; y: number } | null;
  setQuality(p: Preset): void;
  dispose(): void;
}
