import * as THREE from 'three';

/**
 * Procedural canvas textures (no external assets). Each generator is cached
 * and every texture is registered for disposal when the renderer shuts down.
 */
const cache = new Map<string, THREE.Texture>();

function canvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = w;
  c.height = h;
  return [c, c.getContext('2d')!];
}

function finish(key: string, c: HTMLCanvasElement, repeat = true, color = true): THREE.CanvasTexture {
  const t = new THREE.CanvasTexture(c);
  if (repeat) t.wrapS = t.wrapT = THREE.RepeatWrapping;
  if (color) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 4;
  cache.set(key, t);
  return t;
}

/** Deterministic noise so textures look the same every load. */
function rand(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

function grime(g: CanvasRenderingContext2D, w: number, h: number, n: number, alpha: number, seed: number): void {
  const r = rand(seed);
  for (let i = 0; i < n; i++) {
    g.fillStyle = `rgba(0,0,0,${alpha * r()})`;
    const s = 1 + r() * 6;
    g.fillRect(r() * w, r() * h, s, s * (0.5 + r()));
  }
}

/** Floor panels: 4 m tiles with glowing seams; mapped at 1 repeat per 8 m. */
export function floorTexture(tint: string, glow: string): THREE.Texture {
  const key = `floor:${tint}:${glow}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const [c, g] = canvas(512, 512);
  g.fillStyle = tint;
  g.fillRect(0, 0, 512, 512);
  const r = rand(11);
  for (let y = 0; y < 2; y++) {
    for (let x = 0; x < 2; x++) {
      const v = 0.9 + r() * 0.2;
      g.fillStyle = `rgba(${Math.floor(30 * v)},${Math.floor(38 * v)},${Math.floor(52 * v)},0.35)`;
      g.fillRect(x * 256 + 6, y * 256 + 6, 244, 244);
      // Plate detail: bolts and a recessed strip.
      g.fillStyle = 'rgba(0,0,0,0.35)';
      g.fillRect(x * 256 + 30, y * 256 + 120, 196, 14);
      g.fillStyle = 'rgba(255,255,255,0.05)';
      for (const [bx, by] of [[18, 18], [238, 18], [18, 238], [238, 238]]) g.fillRect(x * 256 + bx - 3, y * 256 + by - 3, 6, 6);
    }
  }
  grime(g, 512, 512, 900, 0.18, 5);
  g.strokeStyle = glow;
  g.lineWidth = 3;
  g.globalAlpha = 0.55;
  g.strokeRect(1.5, 1.5, 509, 509);
  g.beginPath();
  g.moveTo(256, 0); g.lineTo(256, 512); g.moveTo(0, 256); g.lineTo(512, 256);
  g.stroke();
  g.globalAlpha = 1;
  return finish(key, c);
}

/** Emissive mask matching floorTexture seams. */
export function floorGlowTexture(): THREE.Texture {
  const key = 'floorGlow';
  const hit = cache.get(key);
  if (hit) return hit;
  const [c, g] = canvas(512, 512);
  g.fillStyle = '#000';
  g.fillRect(0, 0, 512, 512);
  g.strokeStyle = '#fff';
  g.lineWidth = 3;
  g.strokeRect(1.5, 1.5, 509, 509);
  g.globalAlpha = 0.6;
  g.beginPath();
  g.moveTo(256, 0); g.lineTo(256, 512); g.moveTo(0, 256); g.lineTo(512, 256);
  g.stroke();
  return finish(key, c);
}

/** Generic panelled metal (walls, platforms) with horizontal seams. */
export function panelTexture(base: string, seam: string, seed: number): THREE.Texture {
  const key = `panel:${base}:${seam}:${seed}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const [c, g] = canvas(256, 256);
  g.fillStyle = base;
  g.fillRect(0, 0, 256, 256);
  const r = rand(seed);
  for (let i = 0; i < 4; i++) {
    const y = i * 64;
    g.fillStyle = `rgba(255,255,255,${0.02 + r() * 0.04})`;
    g.fillRect(0, y + 4, 256, 56);
    g.fillStyle = seam;
    g.fillRect(0, y, 256, 3);
    for (let k = 0; k < 3; k++) {
      g.fillStyle = 'rgba(0,0,0,0.28)';
      g.fillRect(r() * 220, y + 12 + r() * 30, 20 + r() * 30, 3);
    }
  }
  g.fillStyle = seam;
  g.fillRect(0, 0, 3, 256);
  g.fillRect(128, 0, 2, 256);
  grime(g, 256, 256, 500, 0.2, seed + 3);
  return finish(key, c);
}

/** Corrugated shipping-container siding. */
export function containerTexture(color: string): THREE.Texture {
  const key = `container:${color}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const [c, g] = canvas(256, 128);
  g.fillStyle = color;
  g.fillRect(0, 0, 256, 128);
  for (let x = 0; x < 256; x += 8) {
    const grad = g.createLinearGradient(x, 0, x + 8, 0);
    grad.addColorStop(0, 'rgba(0,0,0,0.35)');
    grad.addColorStop(0.5, 'rgba(255,255,255,0.12)');
    grad.addColorStop(1, 'rgba(0,0,0,0.35)');
    g.fillStyle = grad;
    g.fillRect(x, 0, 8, 128);
  }
  g.fillStyle = 'rgba(0,0,0,0.45)';
  g.fillRect(0, 0, 256, 6);
  g.fillRect(0, 122, 256, 6);
  grime(g, 256, 128, 400, 0.3, color.length * 7);
  g.fillStyle = 'rgba(255,255,255,0.18)';
  g.font = 'bold 14px monospace';
  g.fillText('NTX ' + (1000 + color.charCodeAt(2) * 13), 14, 24);
  return finish(key, c);
}

/** Tank tread links; scrolled along V by the track view. */
export function trackTexture(): THREE.Texture {
  const key = 'track';
  const hit = cache.get(key);
  if (hit) return hit;
  const [c, g] = canvas(64, 128);
  g.fillStyle = '#121419';
  g.fillRect(0, 0, 64, 128);
  for (let y = 0; y < 128; y += 16) {
    g.fillStyle = '#2a2e38';
    g.fillRect(2, y + 2, 60, 9);
    g.fillStyle = '#3c4250';
    g.fillRect(6, y + 4, 52, 3);
    g.fillStyle = '#07080b';
    g.fillRect(0, y + 12, 64, 4);
  }
  return finish(key, c);
}

/** Soft radial dot for sprites and glows. */
export function glowTexture(): THREE.Texture {
  const key = 'glow';
  const hit = cache.get(key);
  if (hit) return hit;
  const [c, g] = canvas(64, 64);
  const grad = g.createRadialGradient(32, 32, 0, 32, 32, 32);
  grad.addColorStop(0, 'rgba(255,255,255,1)');
  grad.addColorStop(0.25, 'rgba(255,255,255,0.7)');
  grad.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 64, 64);
  return finish(key, c, false);
}

/** Scorch mark decal. */
export function scorchTexture(): THREE.Texture {
  const key = 'scorch';
  const hit = cache.get(key);
  if (hit) return hit;
  const [c, g] = canvas(128, 128);
  const r = rand(77);
  const grad = g.createRadialGradient(64, 64, 4, 64, 64, 62);
  grad.addColorStop(0, 'rgba(0,0,0,0.9)');
  grad.addColorStop(0.55, 'rgba(10,8,6,0.55)');
  grad.addColorStop(1, 'rgba(0,0,0,0)');
  g.fillStyle = grad;
  g.fillRect(0, 0, 128, 128);
  for (let i = 0; i < 40; i++) {
    g.fillStyle = `rgba(0,0,0,${0.2 * r()})`;
    const a = r() * Math.PI * 2;
    const d = 20 + r() * 40;
    g.beginPath();
    g.arc(64 + Math.cos(a) * d, 64 + Math.sin(a) * d, 2 + r() * 6, 0, Math.PI * 2);
    g.fill();
  }
  return finish(key, c, false);
}

/** Neon sign text. */
export function signTexture(text: string, color: string): THREE.Texture {
  const key = `sign:${text}:${color}`;
  const hit = cache.get(key);
  if (hit) return hit;
  const [c, g] = canvas(512, 96);
  g.fillStyle = 'rgba(4,6,12,0.92)';
  g.fillRect(0, 0, 512, 96);
  g.strokeStyle = color;
  g.lineWidth = 4;
  g.strokeRect(6, 6, 500, 84);
  g.font = '700 54px "Chakra Petch", "Segoe UI", sans-serif';
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.shadowColor = color;
  g.shadowBlur = 18;
  g.fillStyle = color;
  g.fillText(text, 256, 50);
  g.shadowBlur = 0;
  g.fillStyle = '#ffffff';
  g.globalAlpha = 0.85;
  g.fillText(text, 256, 50);
  return finish(key, c, false);
}

/** Hazard chevrons for ramp edges and spawn pads. */
export function hazardTexture(): THREE.Texture {
  const key = 'hazard';
  const hit = cache.get(key);
  if (hit) return hit;
  const [c, g] = canvas(128, 32);
  g.fillStyle = '#16181f';
  g.fillRect(0, 0, 128, 32);
  g.fillStyle = '#ffb02e';
  for (let x = -32; x < 160; x += 32) {
    g.beginPath();
    g.moveTo(x, 32); g.lineTo(x + 16, 32); g.lineTo(x + 32, 0); g.lineTo(x + 16, 0);
    g.closePath();
    g.fill();
  }
  return finish(key, c);
}

export function disposeTextures(): void {
  cache.forEach((t) => t.dispose());
  cache.clear();
}
