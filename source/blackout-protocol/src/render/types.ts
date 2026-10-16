import type { World } from '../sim/types.ts';

export interface RenderOpts {
  cb: boolean;
  cones: boolean;
  reduce: boolean;
  /** Menu backdrop: slow drift, no player focus. */
  menu?: boolean;
  /** Tactical zoom-out held. */
  zoom?: boolean;
}

/** Shared surface of the 3D renderer and the Canvas 2D fallback. */
export interface GameRenderer {
  readonly kind: '3d' | '2d';
  resize(): void;
  resetCamera(): void;
  kick(): void;
  draw(w: World, o: RenderOpts, dt: number): void;
  dispose(): void;
}
