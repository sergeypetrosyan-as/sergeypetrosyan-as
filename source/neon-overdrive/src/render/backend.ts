import type { Rival, Track } from '../state/types';

/** Everything a renderer needs for one frame. Both the 3D and the 2D fallback read it. */
export interface Frame {
  track: Track;
  trackIdx: number;
  s: number;
  x: number;
  speedPct: number;
  steer: number;
  vx: number;
  boostAmt: number;
  drifting: boolean;
  boosting: boolean;
  braking: boolean;
  rivals: Rival[];
  time: number;
  dt: number;
  gateOpen: boolean;
  gateText: string;
  threshold: number;
  flash: number;
  /** Shake offset in pixels at the canvas resolution (0 when shake is off). */
  shakeX: number;
  shakeY: number;
  highContrast: boolean;
  reducedFlash: boolean;
  speedLines: boolean;
  reducedMotion: boolean;
  /** Menu attract mode: slow orbiting camera instead of the chase camera. */
  cinematic: boolean;
}

export interface RenderBackend {
  readonly kind: '3d' | '2d';
  render(f: Frame): void;
  sparks(dir: number, count: number): void;
  clearFx(): void;
  /** Match the drawing buffer to the window. `scale` is only used by the 2D renderer. */
  resize(scale: number): void;
  dispose(): void;
}
