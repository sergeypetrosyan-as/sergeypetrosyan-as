import * as THREE from 'three';
import { PALETTE as MW, cactus, disc, grain, mesa, rgba, starfield, stampStar } from '../../../../design/19_mystical-western/primitives.mjs';

/**
 * 19_mystical-western backdrops for the 3D scenes, drawn once on a canvas with
 * the shared design-system primitives: a carved moon, a low engraved mesa
 * horizon with sparse saguaros, and a stamped star for collectibles.
 */
export { MW };

const cache = new Map<string, THREE.Texture>();

function tex(key: string, w: number, h: number, draw: (g: CanvasRenderingContext2D) => void, wrap = false): THREE.Texture {
  const hit = cache.get(key);
  if (hit) return hit;
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  draw(c.getContext('2d')!);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  if (wrap) {
    t.wrapS = THREE.RepeatWrapping;
    t.repeat.set(2, 1);
  }
  t.anisotropy = 4;
  cache.set(key, t);
  return t;
}

/** The carved moon: bone face, engraved hatching, ember rings, a waxing shadow. */
export function moonTexture(): THREE.Texture {
  return tex('moon', 512, 512, (g) => {
    // Halo kept inside the canvas so the sprite has no visible square edge.
    const halo = g.createRadialGradient(256, 256, 140, 256, 256, 254);
    halo.addColorStop(0, rgba(MW.bone, 0.16));
    halo.addColorStop(1, rgba(MW.bone, 0));
    g.fillStyle = halo;
    g.fillRect(0, 0, 512, 512);
    disc(g, 256, 256, 150, { face: MW.bone, ink: MW.wine, rim: MW.saddle, rings: 3, glow: 0, phase: 0.1, shadow: MW.night });
  });
}

/**
 * A 360° mesa horizon strip (transparent sky above). Two engraved ridges and at
 * most a few saguaros around the whole ring, so no more than three share a frame.
 */
export function mesaTexture(seed: number): THREE.Texture {
  const W = 4096, H = 256;
  return tex(`mesa:${seed}`, W, H, (g) => {
    mesa(g, -40, W + 40, H - 60, { seed, height: 150, fill: MW.mesa, strata: MW.ember, bottom: H, plateaus: 7, strataAlpha: 0.22 });
    mesa(g, -40, W + 40, H - 18, { seed: seed + 9, height: 80, fill: MW.umber, strata: MW.mesa, bottom: H, plateaus: 11, strataAlpha: 0.7 });
    for (const [x, h] of [[W * 0.13, 46], [W * 0.47, 38], [W * 0.81, 52]] as const) cactus(g, x, H - 6, h, { fill: MW.night, seed: (x | 0) + seed });
    grain(g, 0, 0, W, H, { seed: seed + 3, density: 0.5, colors: [MW.tan, MW.ember], alpha: 0.12 });
  }, true);
}

/** Bright stamped five-point star (collectible halo). */
export function starTexture(): THREE.Texture {
  return tex('stampStar', 128, 128, (g) => {
    stampStar(g, 64, 66, 52, { fill: '#FFFFFF', edge: '#FFFFFF' });
  });
}

/** Quiet engraved star field on a transparent ground, for the garage sky. */
export function starsTexture(): THREE.Texture {
  return tex('stars', 1024, 256, (g) => {
    starfield(g, 0, 0, 1024, 256, { seed: 23, count: 120, color: MW.tan, max: 1.5, alpha: 0.5 });
  }, true);
}

/** Dusty glow for halos: warm, soft-edged, no hard neon core. */
export function haloColor(alpha: number): string {
  return rgba(MW.rose, alpha);
}

export function disposeFrontier(): void {
  cache.forEach((t) => t.dispose());
  cache.clear();
}
