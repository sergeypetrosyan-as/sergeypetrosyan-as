// Title-screen scenery: an engraved desert skyline drawn once over the 3D attract view.
// Carved moon, a quiet constellation, a low mesa horizon in the lower third, an observatory and at most three cacti.
// Static (no animation), so it needs no reduced-motion handling; redrawn only on resize.
import { cactus, constellation, disc, grain, mesa, observatory, starfield } from '../../../../design/19_mystical-western/primitives.mjs';
import { C } from '../render/theme.ts';

export function drawScenery(canvas: HTMLCanvasElement): void {
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  const W = Math.max(1, window.innerWidth);
  const H = Math.max(1, window.innerHeight);
  if (canvas.width !== Math.floor(W * dpr) || canvas.height !== Math.floor(H * dpr)) {
    canvas.width = Math.floor(W * dpr);
    canvas.height = Math.floor(H * dpr);
  }
  const g = canvas.getContext('2d');
  if (!g) return;
  g.setTransform(dpr, 0, 0, dpr, 0, 0);
  g.clearRect(0, 0, W, H);
  const narrow = W < 760;
  const s = Math.min(W, H);

  // quiet stars in the upper sky (right side, away from the text column on wide screens)
  starfield(g, narrow ? 0 : W * 0.45, 0, narrow ? W : W * 0.55, H * 0.6, { seed: 31, count: narrow ? 40 : 70, color: C.ash, max: 1.5, alpha: 0.4 });

  // carved moon and its constellation
  const mr = s * (narrow ? 0.08 : 0.085);
  const mx = narrow ? W - mr - 22 : W * 0.82;
  const my = narrow ? mr + 26 : H * 0.2;
  disc(g, mx, my, mr, { face: C.bone, ink: C.wine, rim: C.ember, phase: 0.12, shadow: C.night, glow: 0.12 });
  if (!narrow) {
    constellation(
      g,
      [
        [mx - mr * 4.2, my + mr * 0.4],
        [mx - mr * 3.1, my - mr * 0.5],
        [mx - mr * 2.0, my + mr * 0.1],
        [mx - mr * 1.4, my + mr * 1.6],
      ],
      { color: C.quiet, node: C.ash, alpha: 0.85, dash: [2, 5], width: 1, nodeR: 2.2 },
    );
  }

  // the low mesa horizon (back), then a darker near ridge
  const base = H;
  mesa(g, -20, W + 20, base - H * 0.07, { seed: 5, height: H * 0.15, fill: C.mesa, strata: C.ember, bottom: base, plateaus: narrow ? 2 : 3, strataAlpha: 0.3 });
  const ridge = base - H * 0.035;
  mesa(g, -20, W + 20, ridge, { seed: 12, height: H * 0.06, fill: C.umber, strata: C.wine, bottom: base, plateaus: narrow ? 2 : 4, strataAlpha: 0.4 });
  g.fillStyle = C.ink;
  g.fillRect(0, base - H * 0.022, W, H * 0.022);

  // observatory and up to three cacti on the near ridge
  const obsX = narrow ? W * 0.78 : W * 0.88;
  observatory(g, obsX, base - H * 0.022, s * 0.05, { fill: C.ink, slit: C.red, telescopeAngle: -0.8 });
  const ch = s * 0.07;
  cactus(g, narrow ? W * 0.14 : W * 0.56, base - H * 0.02, ch, { fill: C.ink, seed: 2 });
  cactus(g, narrow ? W * 0.32 : W * 0.66, base - H * 0.02, ch * 0.62, { fill: C.ink, seed: 4, arms: [0.5] });
  if (!narrow) cactus(g, W * 0.96, base - H * 0.02, ch * 0.8, { fill: C.ink, seed: 9 });

  // dust over the whole frame
  grain(g, 0, 0, W, H, { seed: 3, density: 0.35, colors: [C.tan, C.ember], alpha: 0.06 });
}
