// Procedural canvas textures. Generated once; no image files.
import * as THREE from 'three';

function canvas(w: number, h = w): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  const g = c.getContext('2d');
  if (!g) throw new Error('Canvas 2D is not available for texture generation.');
  return [c, g];
}

function tex(c: HTMLCanvasElement, srgb = true): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(c);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.needsUpdate = true;
  return t;
}

/** Soft radial falloff, white. Used for light splats, contact shadows and glows. */
export function radialTexture(): THREE.CanvasTexture {
  const [c, g] = canvas(128);
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.18, 'rgba(255,255,255,0.65)');
  grad.addColorStop(0.5, 'rgba(255,255,255,0.18)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  return tex(c, false);
}

/** Thin bright annulus at the edge of the quad. */
export function ringTexture(dashed = false): THREE.CanvasTexture {
  const S = 256;
  const [c, g] = canvas(S);
  const r = S / 2;
  const grad = g.createRadialGradient(r, r, r * 0.72, r, r, r);
  grad.addColorStop(0, 'rgba(255,255,255,0)');
  grad.addColorStop(0.72, 'rgba(255,255,255,0.15)');
  grad.addColorStop(0.9, 'rgba(255,255,255,1)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, S, S);
  if (dashed) {
    g.globalCompositeOperation = 'destination-out';
    g.translate(r, r);
    const n = 36;
    for (let i = 0; i < n; i++) {
      g.rotate((Math.PI * 2) / n);
      g.fillRect(0, -4, r, 8);
    }
  }
  return tex(c, false);
}

/** A soft horizontal ribbon: bright core along U, falls off across V. */
export function lineTexture(): THREE.CanvasTexture {
  const [c, g] = canvas(16, 64);
  const grad = g.createLinearGradient(0, 0, 0, 64);
  grad.addColorStop(0, 'rgba(255,255,255,0)');
  grad.addColorStop(0.35, 'rgba(255,255,255,0.35)');
  grad.addColorStop(0.5, 'rgba(255,255,255,1)');
  grad.addColorStop(0.65, 'rgba(255,255,255,0.35)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 16, 64);
  return tex(c, false);
}

/** Chevrons pointing along +U, for dash lanes. */
export function chevronTexture(): THREE.CanvasTexture {
  const [c, g] = canvas(256, 64);
  g.fillStyle = 'rgba(255,255,255,0.22)';
  g.fillRect(0, 4, 256, 56);
  g.fillStyle = 'rgba(255,255,255,1)';
  for (let i = 0; i < 4; i++) {
    const x = i * 64 + 14;
    g.beginPath();
    g.moveTo(x, 8);
    g.lineTo(x + 26, 32);
    g.lineTo(x, 56);
    g.lineTo(x + 12, 56);
    g.lineTo(x + 38, 32);
    g.lineTo(x + 12, 8);
    g.closePath();
    g.fill();
  }
  g.fillRect(0, 0, 256, 4);
  g.fillRect(0, 60, 256, 4);
  const t = tex(c, false);
  t.wrapS = THREE.RepeatWrapping;
  return t;
}

function noise(g: CanvasRenderingContext2D, S: number, amount: number, seed: number): void {
  const img = g.getImageData(0, 0, S, S);
  let s = seed;
  for (let i = 0; i < img.data.length; i += 4) {
    s = (s * 16807) % 2147483647;
    const n = ((s / 2147483647) - 0.5) * amount;
    img.data[i] = Math.max(0, Math.min(255, img.data[i] + n));
    img.data[i + 1] = Math.max(0, Math.min(255, img.data[i + 1] + n));
    img.data[i + 2] = Math.max(0, Math.min(255, img.data[i + 2] + n));
  }
  g.putImageData(img, 0, 0);
}

/** Blotchy low-frequency variation (wet patches) via layered soft circles. */
function blotches(g: CanvasRenderingContext2D, S: number, color: string, count: number, seed: number): void {
  let s = seed;
  const r = () => {
    s = (s * 48271) % 2147483647;
    return s / 2147483647;
  };
  for (let i = 0; i < count; i++) {
    const x = r() * S;
    const y = r() * S;
    const rad = S * (0.05 + r() * 0.18);
    for (const ox of [-S, 0, S])
      for (const oy of [-S, 0, S]) {
        const grad = g.createRadialGradient(x + ox, y + oy, 0, x + ox, y + oy, rad);
        grad.addColorStop(0, color);
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        g.fillStyle = grad;
        g.fillRect(x + ox - rad, y + oy - rad, rad * 2, rad * 2);
      }
  }
}

export interface FloorMaps {
  map: THREE.CanvasTexture;
  rough: THREE.CanvasTexture;
  /** world units covered by one texture tile */
  tile: number;
}

/**
 * Obsidian floor tile: 4x4 grid cells of 80 units (one tile = 320 units). The grid is etched:
 * lines are a touch lighter in albedo and much rougher, so reflections break up along them.
 */
export function floorMaps(tint: string, line: string): FloorMaps {
  const S = 1024;
  const cell = S / 4;
  const [c, g] = canvas(S);
  g.fillStyle = tint;
  g.fillRect(0, 0, S, S);
  blotches(g, S, 'rgba(40,46,70,0.10)', 14, 11);
  noise(g, S, 10, 5);
  g.strokeStyle = line;
  g.lineWidth = 2;
  for (let i = 0; i <= 4; i++) {
    g.beginPath();
    g.moveTo(i * cell, 0);
    g.lineTo(i * cell, S);
    g.moveTo(0, i * cell);
    g.lineTo(S, i * cell);
    g.stroke();
  }
  // small cross marks at cell centres, like survey etching
  g.lineWidth = 1.5;
  for (let i = 0; i < 4; i++)
    for (let j = 0; j < 4; j++) {
      const x = i * cell + cell / 2;
      const y = j * cell + cell / 2;
      g.beginPath();
      g.moveTo(x - 6, y);
      g.lineTo(x + 6, y);
      g.moveTo(x, y - 6);
      g.lineTo(x, y + 6);
      g.stroke();
    }

  const [rc, rg] = canvas(S);
  // roughness lives in the green channel: dark = glossy
  rg.fillStyle = 'rgb(108,108,108)';
  rg.fillRect(0, 0, S, S);
  blotches(rg, S, 'rgba(150,150,150,0.35)', 18, 23);
  blotches(rg, S, 'rgba(0,0,0,0.45)', 10, 31);
  noise(rg, S, 26, 9);
  rg.strokeStyle = 'rgb(210,210,210)';
  rg.lineWidth = 5;
  for (let i = 0; i <= 4; i++) {
    rg.beginPath();
    rg.moveTo(i * cell, 0);
    rg.lineTo(i * cell, S);
    rg.moveTo(0, i * cell);
    rg.lineTo(S, i * cell);
    rg.stroke();
  }
  const map = tex(c, true);
  const rough = tex(rc, false);
  for (const t of [map, rough]) {
    t.wrapS = t.wrapT = THREE.RepeatWrapping;
  }
  return { map, rough, tile: 320 };
}

/** Marquee strip texture for the dead arcade cabinets in the skyline. */
export function marqueeTexture(): THREE.CanvasTexture {
  const [c, g] = canvas(64, 256);
  g.fillStyle = '#000';
  g.fillRect(0, 0, 64, 256);
  let s = 3;
  const r = () => {
    s = (s * 16807) % 2147483647;
    return s / 2147483647;
  };
  for (let y = 6; y < 250; y += 10) {
    if (r() < 0.45) continue;
    const a = 0.25 + r() * 0.75;
    g.fillStyle = `rgba(255,255,255,${a})`;
    g.fillRect(8, y, 48, 4);
  }
  return tex(c, false);
}
