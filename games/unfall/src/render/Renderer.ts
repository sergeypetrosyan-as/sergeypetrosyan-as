import { COURIER } from '../sim/Courier';
import type { Billboard, LevelDef, Rect } from '../sim/types';
import { GROUND_Y, type World } from '../sim/World';

export const VIEW_H = 540;

export const COLORS = {
  ink: '#050d12',
  deep: '#0a2029',
  teal: '#123f4a',
  slab: '#10232b',
  amber: '#ffb347',
  amberDim: 'rgba(255, 179, 71, 0.55)',
  coral: '#ff5e3a',
  ice: '#9ff4ff',
  hush: '#f1eee8',
};

function rng(seed: number) {
  let s = seed >>> 0 || 1;
  return () => ((s = (Math.imul(s, 1664525) + 1013904223) >>> 0) / 4294967296);
}

function canvas(w: number, h: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
  const c = document.createElement('canvas');
  c.width = Math.max(1, Math.ceil(w));
  c.height = Math.max(1, Math.ceil(h));
  return [c, c.getContext('2d')!];
}

/** Neon text baked once (glow included) so frames never pay for shadowBlur. */
function neonText(text: string, size: number, color: string, plate = false): HTMLCanvasElement {
  const font = `700 ${size}px "Big Shoulders Display", "Arial Narrow", sans-serif`;
  const [m, mg] = canvas(4, 4);
  mg.font = font;
  const tw = mg.measureText(text).width;
  const pad = size * 0.9;
  const [c, g] = canvas(tw + pad * 2, size + pad * 2);
  if (plate) {
    g.fillStyle = '#071116';
    g.strokeStyle = 'rgba(255,255,255,0.08)';
    g.lineWidth = 2;
    g.beginPath();
    g.rect(pad * 0.55, pad * 0.55, c.width - pad * 1.1, c.height - pad * 1.1);
    g.fill();
    g.stroke();
  }
  g.font = font;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.letterSpacing = `${Math.round(size * 0.08)}px`;
  g.shadowColor = color;
  for (const blur of [size * 0.9, size * 0.35]) {
    g.shadowBlur = blur;
    g.fillStyle = color;
    g.fillText(text, c.width / 2, c.height / 2 + size * 0.04);
  }
  g.shadowBlur = size * 0.12;
  g.fillStyle = '#fff6e6';
  g.fillText(text, c.width / 2, c.height / 2 + size * 0.04);
  void m;
  return c;
}

interface Ash { x: number; y0: number; speed: number; sway: number; clock: number; size: number }

export interface DrawOptions {
  camX: number;
  lens: { x: number; y: number; r: number; held: boolean; active: boolean; fizzling: boolean };
  /** Seconds of displayed clock (runs backward with the lens). */
  clock: number;
  shake: number;
  light: number;
  ending: number; // 0..1 progress of the final unfall
  reducedMotion: boolean;
  showLensPreview: boolean;
}

/**
 * Canvas 2D renderer. The world is drawn once per frame; the lens is a
 * difference-composited disc over it (a photographic negative of the present),
 * and the Hush is a static-noise field left of the front.
 */
export class Renderer {
  readonly ctx: CanvasRenderingContext2D;
  scale = 1;
  viewW = 960;
  /** Vertical offset (world units) that centres the 540-tall world on tall screens. */
  offY = 0;
  private dpr = 1;
  private far!: HTMLCanvasElement;
  private mid!: HTMLCanvasElement;
  private billboards: Array<{ b: Billboard; img: HTMLCanvasElement }> = [];
  private signImgs: HTMLCanvasElement[] = [];
  private noise: HTMLCanvasElement[] = [];
  private noiseFrame = 0;
  private ash: Ash[] = [];
  private vignette: HTMLCanvasElement | null = null;
  private trail = Array.from({ length: 48 }, () => ({ x: 0, y: 0 }));
  private readonly r: Rect = { x: 0, y: 0, w: 0, h: 0 };
  private pose = { x: 0, y: 0, rot: 0, swing: 0 };
  private level: LevelDef | null = null;
  private goalImg: HTMLCanvasElement | null = null;

  constructor(readonly canvasEl: HTMLCanvasElement) {
    this.ctx = canvasEl.getContext('2d', { alpha: false })!;
    for (let k = 0; k < 4; k++) {
      const [c, g] = canvas(160, 160);
      const img = g.createImageData(160, 160);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() < 0.5 ? 235 + Math.random() * 20 : 120 + Math.random() * 90;
        img.data[i] = v; img.data[i + 1] = v * 0.99; img.data[i + 2] = v * 0.96; img.data[i + 3] = 255;
      }
      g.putImageData(img, 0, 0);
      this.noise.push(c);
    }
    const rnd = rng(7);
    for (let i = 0; i < 110; i++) {
      this.ash.push({ x: rnd() * 2000, y0: rnd() * VIEW_H, speed: 10 + rnd() * 22, sway: rnd() * 6, clock: rnd() * 100, size: 1 + rnd() * 1.6 });
    }
    this.resize();
  }

  resize(): void {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth, h = window.innerHeight;
    this.canvasEl.width = Math.round(w * this.dpr);
    this.canvasEl.height = Math.round(h * this.dpr);
    // Fit the tighter axis: landscape fits height; portrait phones keep ~560 units of road visible.
    this.scale = Math.min((h * this.dpr) / VIEW_H, (w * this.dpr) / 560);
    this.viewW = (w * this.dpr) / this.scale;
    this.offY = ((h * this.dpr) / this.scale - VIEW_H) / 2;
    this.vignette = null;
  }

  /** CSS pixel → world coordinates for a given camera. */
  toWorld(px: number, py: number, camX: number): { x: number; y: number } {
    return { x: camX + (px * this.dpr) / this.scale, y: (py * this.dpr) / this.scale - this.offY };
  }

  setLevel(def: LevelDef): void {
    this.level = def;
    this.far = this.skyline(def.seed, 2400, 0.55, 140, 330, '#0a1c24', 0.05);
    this.mid = this.skyline(def.seed * 7 + 3, 2400, 0.8, 90, 240, '#071419', 0.13);
    this.billboards = (def.billboards ?? []).map((b) => ({
      b,
      img: neonText(b.text, b.size ?? 28, b.color === 'coral' ? COLORS.coral : b.color === 'ice' ? COLORS.ice : COLORS.amber),
    }));
    this.signImgs = (def.signs ?? []).map((s) => neonText(s.text, Math.min(s.h * 0.62, 30), COLORS.coral, true));
    this.goalImg = neonText(def.final ? 'LIGHTHOUSE' : 'ONWARD', def.final ? 26 : 18, COLORS.amber);
  }

  private skyline(seed: number, width: number, density: number, minH: number, maxH: number, color: string, windowRate: number): HTMLCanvasElement {
    const [c, g] = canvas(width, VIEW_H);
    const rnd = rng(seed);
    let x = 0;
    while (x < width) {
      const w = 40 + rnd() * 90;
      const h = minH + rnd() * (maxH - minH) * density;
      const top = GROUND_Y + 10 - h;
      g.fillStyle = color;
      g.fillRect(x, top, w, VIEW_H - top);
      if (rnd() < 0.3) g.fillRect(x + w * 0.45, top - 26, 3, 26);
      for (let wy = top + 12; wy < GROUND_Y; wy += 13) {
        for (let wx = x + 6; wx < x + w - 8; wx += 11) {
          if (rnd() < windowRate) {
            g.fillStyle = rnd() < 0.85 ? 'rgba(255,179,71,0.55)' : 'rgba(255,94,58,0.6)';
            g.fillRect(wx, wy, 4, 6);
          }
        }
      }
      if (rnd() < 0.12) {
        g.fillStyle = 'rgba(255,94,58,0.5)';
        g.fillRect(x + 4, top + 20, 2, h * 0.5);
      }
      x += w + rnd() * 18;
    }
    return c;
  }

  draw(world: World, o: DrawOptions, dt: number): void {
    const g = this.ctx;
    const S = this.scale;
    const W = this.viewW;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.globalCompositeOperation = 'source-over';
    g.globalAlpha = 1;

    // Sky
    const sky = g.createLinearGradient(0, 0, 0, this.canvasEl.height);
    const dawn = o.ending;
    sky.addColorStop(0, mix('#03080b', '#1b2a3a', dawn));
    sky.addColorStop(0.62, mix('#0b2630', '#ffb38a', dawn * 0.8));
    sky.addColorStop(0.78, mix('#173a3f', '#ffd9a0', dawn));
    sky.addColorStop(1, '#03080b');
    g.fillStyle = sky;
    g.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);

    const shakeX = o.reducedMotion ? 0 : (Math.random() - 0.5) * o.shake * 6;
    const shakeY = o.reducedMotion ? 0 : (Math.random() - 0.5) * o.shake * 6;
    g.setTransform(S, 0, 0, S, shakeX * S, (shakeY + this.offY) * S);

    this.drawClock(g, W, o.clock);
    this.parallax(g, this.far, o.camX * 0.18, W);
    this.parallax(g, this.mid, o.camX * 0.42, W);

    g.translate(-o.camX, 0);
    this.drawBillboards(g, o.camX, W);
    this.drawGoal(g, world);
    this.drawElevators(g, world);
    this.drawTiles(g, world, o.camX, W);
    this.drawSigns(g, world);
    this.drawCrushers(g, world);
    this.drawSparks(g, world);
    this.drawCourier(g, world, o.light);
    this.drawAsh(g, dt, o, world);
    g.translate(o.camX, 0);

    this.drawHush(g, world, o.camX, W);
    this.drawLens(g, o, W);
    if (dawn > 0) {
      g.globalCompositeOperation = 'lighter';
      g.fillStyle = `rgba(255, 190, 120, ${0.18 * dawn * (0.4 + o.light / 100)})`;
      g.fillRect(0, 0, W, VIEW_H);
      g.globalCompositeOperation = 'source-over';
    }
    g.setTransform(1, 0, 0, 1, 0, 0);
    this.drawVignette(g);
  }

  private parallax(g: CanvasRenderingContext2D, img: HTMLCanvasElement, offset: number, W: number): void {
    const w = img.width;
    let x = -((offset % w) + w) % w;
    while (x < W) {
      g.drawImage(img, x, 0);
      x += w;
    }
  }

  private drawClock(g: CanvasRenderingContext2D, W: number, clock: number): void {
    const cx = W * 0.8, cy = 118, R = 64;
    g.save();
    g.strokeStyle = 'rgba(255, 179, 71, 0.22)';
    g.lineWidth = 1.5;
    g.beginPath();
    g.arc(cx, cy, R, 0, Math.PI * 2);
    g.stroke();
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      g.beginPath();
      g.moveTo(cx + Math.cos(a) * (R - 8), cy + Math.sin(a) * (R - 8));
      g.lineTo(cx + Math.cos(a) * (R - 2), cy + Math.sin(a) * (R - 2));
      g.stroke();
    }
    // 23:5x and creeping toward midnight.
    const minute = (55 + clock / 12) % 60;
    const ma = (minute / 60) * Math.PI * 2 - Math.PI / 2;
    const ha = ((11 + minute / 60) / 12) * Math.PI * 2 - Math.PI / 2;
    g.strokeStyle = 'rgba(255, 179, 71, 0.45)';
    g.lineWidth = 2.5;
    g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(ha) * R * 0.5, cy + Math.sin(ha) * R * 0.5); g.stroke();
    g.lineWidth = 1.5;
    g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(ma) * R * 0.82, cy + Math.sin(ma) * R * 0.82); g.stroke();
    g.restore();
  }

  private drawBillboards(g: CanvasRenderingContext2D, camX: number, W: number): void {
    for (const { b, img } of this.billboards) {
      const w = img.width, h = img.height;
      if (b.x + w / 2 < camX - 50 || b.x - w / 2 > camX + W + 50) continue;
      g.fillStyle = '#0b1a20';
      g.fillRect(b.x - 2, b.y + h * 0.25, 4, GROUND_Y - b.y);
      g.drawImage(img, b.x - w / 2, b.y - h / 2);
    }
  }

  private drawGoal(g: CanvasRenderingContext2D, world: World): void {
    const def = world.def;
    const x = def.goal;
    const ground = world.surface(x - 30, 0, 999, 999) ?? GROUND_Y;
    if (def.final) {
      // Lighthouse: tall tower with a sweeping beam.
      g.fillStyle = '#0c1a20';
      g.beginPath();
      g.moveTo(x + 10, ground);
      g.lineTo(x + 26, ground - 250);
      g.lineTo(x + 64, ground - 250);
      g.lineTo(x + 80, ground);
      g.fill();
      g.fillStyle = COLORS.amber;
      g.fillRect(x + 30, ground - 270, 30, 20);
      const a = (performance.now() / 1000) % (Math.PI * 2);
      g.save();
      g.globalCompositeOperation = 'lighter';
      const beam = g.createLinearGradient(x + 45, ground - 260, x + 45 + Math.cos(a) * 420, ground - 260);
      beam.addColorStop(0, 'rgba(255,200,120,0.35)');
      beam.addColorStop(1, 'rgba(255,200,120,0)');
      g.fillStyle = beam;
      g.beginPath();
      g.moveTo(x + 45, ground - 260);
      g.lineTo(x + 45 + Math.cos(a) * 420, ground - 300);
      g.lineTo(x + 45 + Math.cos(a) * 420, ground - 220);
      g.fill();
      g.restore();
    } else {
      g.fillStyle = 'rgba(255, 179, 71, 0.08)';
      g.fillRect(x - 4, ground - 70, 40, 70);
      g.strokeStyle = COLORS.amber;
      g.lineWidth = 2;
      g.strokeRect(x - 4, ground - 70, 40, 70);
    }
    if (this.goalImg) g.drawImage(this.goalImg, x + (def.final ? 45 : 16) - this.goalImg.width / 2, ground - (def.final ? 300 : 96));
  }

  private drawTiles(g: CanvasRenderingContext2D, world: World, camX: number, W: number): void {
    for (const t of world.tiles) {
      const r = t.rect;
      if (r.x + r.w < camX - 40 || r.x > camX + W + 40) continue;
      if (!t.collapsible) {
        // Street: lit kerb, a lighter pavement band, then masonry strata fading down.
        const grad = g.createLinearGradient(0, r.y, 0, r.y + 200);
        grad.addColorStop(0, '#1d3a42');
        grad.addColorStop(0.12, '#15303a');
        grad.addColorStop(1, '#08161c');
        g.fillStyle = grad;
        g.fillRect(r.x, r.y, r.w, r.h);
        g.fillStyle = 'rgba(0, 0, 0, 0.22)';
        for (let sy = r.y + 26; sy < r.y + r.h; sy += 22) g.fillRect(r.x, sy, r.w, 2);
        g.fillStyle = 'rgba(255, 179, 71, 0.16)';
        g.fillRect(r.x, r.y + 2, r.w, 6);
        g.fillStyle = COLORS.amber;
        g.fillRect(r.x, r.y, r.w, 2);
        // Edges facing a drop glow faintly so gaps read at a glance.
        g.fillStyle = 'rgba(255, 94, 58, 0.5)';
        g.fillRect(r.x, r.y, 2, 40);
        g.fillRect(r.x + r.w - 2, r.y, 2, 40);
        continue;
      }
      const drop = t.dropY;
      if (drop > 700) continue;
      const shake = t.shaking;
      const jx = shake ? (Math.random() - 0.5) * 3 * shake : 0;
      g.save();
      g.translate(r.x + r.w / 2 + jx, r.y + r.h / 2 + drop);
      g.rotate(t.rotation);
      g.globalAlpha = Math.max(0, 1 - drop / 600);
      g.fillStyle = '#1b3740';
      g.fillRect(-r.w / 2 + 1, -r.h / 2, r.w - 2, r.h);
      g.fillStyle = shake ? COLORS.coral : COLORS.amber;
      g.fillRect(-r.w / 2 + 1, -r.h / 2, r.w - 2, 2);
      if (shake || drop > 0) {
        g.strokeStyle = 'rgba(255, 94, 58, 0.7)';
        g.lineWidth = 1;
        g.beginPath();
        g.moveTo(-r.w / 2 + 6, -r.h / 2 + 2);
        g.lineTo(-2, r.h / 2 - 4);
        g.lineTo(r.w / 2 - 8, -r.h / 2 + 6);
        g.stroke();
      }
      g.restore();
    }
  }

  private drawSigns(g: CanvasRenderingContext2D, world: World): void {
    world.signs.forEach((s, i) => {
      const p = this.pose;
      s.pose(p);
      const img = this.signImgs[i];
      if (s.progress === 0) {
        // Chains to the sky.
        g.strokeStyle = 'rgba(160, 180, 185, 0.45)';
        g.lineWidth = 1.2;
        for (const side of [-1, 1]) {
          g.beginPath();
          g.moveTo(p.x + side * s.def.w * 0.35, p.y - s.def.h / 2);
          g.lineTo(p.x + side * s.def.w * 0.3, 0);
          g.stroke();
        }
      }
      g.save();
      g.translate(p.x, p.y);
      g.rotate(p.rot + p.swing);
      g.drawImage(img, -s.def.w / 2 - 6, -s.def.h / 2 - 6, s.def.w + 12, s.def.h + 12);
      g.restore();
    });
  }

  private drawCrushers(g: CanvasRenderingContext2D, world: World): void {
    for (const k of world.crushers) {
      const r = k.rect(this.r);
      g.fillStyle = '#0b161b';
      g.fillRect(r.x - 6, k.def.top - 200, 4, k.def.bottom - k.def.top + 200);
      g.fillRect(r.x + r.w + 2, k.def.top - 200, 4, k.def.bottom - k.def.top + 200);
      g.fillStyle = '#13242b';
      g.fillRect(r.x, r.y - 200, r.w, r.h + 200);
      // hazard face
      g.save();
      g.beginPath();
      g.rect(r.x, r.y + r.h - 12, r.w, 12);
      g.clip();
      g.fillStyle = COLORS.amber;
      g.fillRect(r.x, r.y + r.h - 12, r.w, 12);
      g.fillStyle = '#13242b';
      for (let sx = r.x - 12; sx < r.x + r.w; sx += 12) {
        g.beginPath();
        g.moveTo(sx, r.y + r.h);
        g.lineTo(sx + 6, r.y + r.h - 12);
        g.lineTo(sx + 12, r.y + r.h - 12);
        g.lineTo(sx + 6, r.y + r.h);
        g.fill();
      }
      g.restore();
      if (k.dangerous) {
        g.fillStyle = 'rgba(255, 94, 58, 0.25)';
        g.fillRect(r.x - 10, r.y + r.h, r.w + 20, 6);
      }
    }
  }

  private drawElevators(g: CanvasRenderingContext2D, world: World): void {
    for (const e of world.elevators) {
      const r = e.rect(this.r);
      g.strokeStyle = 'rgba(160, 180, 185, 0.35)';
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(r.x + 6, 0); g.lineTo(r.x + 6, r.y);
      g.moveTo(r.x + r.w - 6, 0); g.lineTo(r.x + r.w - 6, r.y);
      g.stroke();
      g.fillStyle = COLORS.slab;
      g.fillRect(r.x, r.y, r.w, r.h);
      g.fillStyle = COLORS.amber;
      g.fillRect(r.x, r.y, r.w, 2);
      g.fillStyle = 'rgba(255,179,71,0.18)';
      g.fillRect(r.x + 4, r.y + r.h, r.w - 8, 3);
    }
  }

  private drawSparks(g: CanvasRenderingContext2D, world: World): void {
    const t = world.time;
    for (const s of world.sparks) {
      if (s.taken) continue;
      const pulse = 0.6 + 0.4 * Math.sin(t * 4 + s.x);
      g.save();
      g.translate(s.x, s.y + Math.sin(t * 2 + s.x) * 3);
      g.globalCompositeOperation = 'lighter';
      const glow = g.createRadialGradient(0, 0, 0, 0, 0, 16);
      glow.addColorStop(0, `rgba(255, 200, 110, ${0.55 * pulse})`);
      glow.addColorStop(1, 'rgba(255, 200, 110, 0)');
      g.fillStyle = glow;
      g.fillRect(-16, -16, 32, 32);
      g.rotate(Math.PI / 4);
      g.fillStyle = '#ffe2b0';
      g.fillRect(-3, -3, 6, 6);
      g.restore();
    }
  }

  private drawCourier(g: CanvasRenderingContext2D, world: World, light: number): void {
    const c = world.courier;
    const x = c.x, y = c.y;
    // Scarf of light: her recorded past, newest first.
    const n = c.trail(this.trail.length, this.trail);
    if (n > 2) {
      g.save();
      g.lineCap = 'round';
      for (let i = 1; i < n; i += 1) {
        const a = this.trail[i - 1], b = this.trail[i];
        const k = 1 - i / n;
        g.strokeStyle = c.rewinding ? `rgba(159, 244, 255, ${0.7 * k})` : `rgba(255, 94, 58, ${0.65 * k})`;
        g.lineWidth = 3.2 * k + 0.5;
        g.beginPath();
        g.moveTo(a.x - 4, a.y - 20 + Math.sin(i * 0.5 + world.time * 6) * 1.2);
        g.lineTo(b.x - 4, b.y - 20 + Math.sin((i + 1) * 0.5 + world.time * 6) * 1.2);
        g.stroke();
      }
      g.restore();
    }

    if (c.dead) {
      // Coming apart: shards drift and fade until rescued or gone.
      const t = c.deadTime;
      g.fillStyle = `rgba(255, 179, 71, ${Math.max(0, 1 - t / 2.2)})`;
      for (let i = 0; i < 9; i++) {
        const a = i * 0.7;
        g.fillRect(x - 4 + Math.cos(a) * t * 22, y - 18 + Math.sin(a) * t * 16 - t * t * 8, 3, 3);
      }
      return;
    }

    // Lantern glow — dims with the light that's left.
    const glowR = 26 + 46 * (light / 100);
    g.save();
    g.globalCompositeOperation = 'lighter';
    const lg = g.createRadialGradient(x + 9, y - 13, 0, x + 9, y - 13, glowR);
    lg.addColorStop(0, `rgba(255, 190, 110, ${0.18 + 0.4 * (light / 100)})`);
    lg.addColorStop(1, 'rgba(255, 190, 110, 0)');
    g.fillStyle = lg;
    g.fillRect(x + 9 - glowR, y - 13 - glowR, glowR * 2, glowR * 2);
    g.restore();

    g.save();
    g.translate(x, y);
    g.scale(1.2, 1.2);
    g.translate(-x, -y);
    const sw = Math.sin(c.walk) * (c.waiting || !c.grounded ? 0 : 1);
    g.strokeStyle = '#d8e6e8';
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(x - 2, y - 9); g.lineTo(x - 2 + sw * 4, y);
    g.moveTo(x + 2, y - 9); g.lineTo(x + 2 - sw * 4, y);
    g.stroke();
    // Body + head
    g.fillStyle = '#0d1a1f';
    g.beginPath();
    g.roundRect(x - 6, y - 23, 12, 15, 4);
    g.fill();
    g.beginPath();
    g.arc(x, y - 26, 5.5, 0, Math.PI * 2);
    g.fill();
    g.strokeStyle = 'rgba(255, 179, 71, 0.8)';
    g.lineWidth = 1;
    g.beginPath();
    g.roundRect(x - 6, y - 23, 12, 15, 4);
    g.stroke();
    // Visor
    g.fillStyle = c.rewinding ? COLORS.coral : COLORS.ice;
    g.fillRect(x + 1, y - 28, 5, 2);
    // Lantern
    g.fillStyle = `rgba(255, 220, 160, ${0.35 + 0.65 * (light / 100)})`;
    g.fillRect(x + 7, y - 16, 5, 6);
    g.strokeStyle = '#0d1a1f';
    g.beginPath();
    g.moveTo(x + 4, y - 18); g.lineTo(x + 9.5, y - 16);
    g.stroke();

    g.restore();
    if (c.waiting && !c.won) {
      const a = 0.5 + 0.5 * Math.sin(world.time * 5);
      g.fillStyle = `rgba(159, 244, 255, ${0.5 + 0.5 * a})`;
      g.font = '700 12px "Big Shoulders Display", sans-serif';
      g.textAlign = 'center';
      g.fillText('…', x, y - 38);
    }
    void COURIER;
  }

  private drawAsh(g: CanvasRenderingContext2D, dt: number, o: DrawOptions, world: World): void {
    if (o.reducedMotion) return;
    const camX = o.camX;
    const W = this.viewW;
    const l = o.lens;
    g.fillStyle = 'rgba(220, 210, 200, 0.35)';
    for (const p of this.ash) {
      const wx = camX + (((p.x - camX * 0.9) % W) + W) % W;
      const y = ((p.y0 + p.clock * p.speed) % VIEW_H + VIEW_H) % VIEW_H;
      const inLens = l.active && (wx - (camX + l.x)) ** 2 + (y - l.y) ** 2 < l.r * l.r;
      p.clock += inLens ? -dt * 1.6 : dt;
      g.fillRect(wx + Math.sin(p.clock + p.sway) * p.sway, y, p.size, p.size);
    }
    void world;
  }

  private drawHush(g: CanvasRenderingContext2D, world: World, camX: number, W: number): void {
    if (!world.front) return;
    const sx = world.front.x - camX;
    if (sx <= -10) return;
    const w = Math.min(W, sx);
    this.noiseFrame = (this.noiseFrame + 1) % (this.noise.length * 3);
    const img = this.noise[Math.floor(this.noiseFrame / 3)];
    const pat = g.createPattern(img, 'repeat')!;
    g.save();
    g.globalAlpha = 0.94;
    g.fillStyle = pat;
    g.translate(Math.random() * 40, Math.random() * 40);
    g.fillRect(-40, -40, w + 40, VIEW_H + 80);
    g.restore();
    // Ragged dissolving edge.
    g.fillStyle = COLORS.hush;
    for (let y = 0; y < VIEW_H; y += 9) {
      const jag = (Math.sin(y * 0.37 + world.time * 9) + Math.sin(y * 0.11 - world.time * 4)) * 7 + Math.random() * 6;
      g.globalAlpha = 0.5 + Math.random() * 0.4;
      g.fillRect(sx - 2, y, Math.max(0, jag + 6), 7);
    }
    g.globalAlpha = 1;
  }

  private drawLens(g: CanvasRenderingContext2D, o: DrawOptions, W: number): void {
    const l = o.lens;
    void W;
    if (l.active) {
      g.save();
      g.beginPath();
      g.arc(l.x, l.y, l.r, 0, Math.PI * 2);
      g.clip();
      // Photographic negative of the present.
      g.globalCompositeOperation = 'difference';
      g.fillStyle = '#a9eef7';
      g.fillRect(l.x - l.r, l.y - l.r, l.r * 2, l.r * 2);
      g.globalCompositeOperation = 'source-over';
      g.fillStyle = 'rgba(8, 40, 52, 0.3)';
      g.fillRect(l.x - l.r, l.y - l.r, l.r * 2, l.r * 2);
      g.strokeStyle = 'rgba(5, 13, 18, 0.25)';
      g.lineWidth = 1;
      for (let rr = 18; rr < l.r; rr += 18) {
        g.beginPath();
        g.arc(l.x, l.y, rr, 0, Math.PI * 2);
        g.stroke();
      }
      g.restore();
    }
    if (l.active || l.held || o.showLensPreview) {
      const t = performance.now() / 1000;
      const spin = l.active ? -t * 2.4 : 0;
      g.save();
      g.translate(l.x, l.y);
      g.strokeStyle = l.fizzling ? COLORS.coral : l.active ? COLORS.ice : 'rgba(159, 244, 255, 0.45)';
      g.lineWidth = l.active ? 2 : 1.2;
      if (!l.active) g.setLineDash([4, 6]);
      g.beginPath();
      g.arc(0, 0, l.r, 0, Math.PI * 2);
      g.stroke();
      g.setLineDash([]);
      // Ticks orbiting counter-clockwise while time runs back.
      for (let i = 0; i < 24; i++) {
        const a = spin + (i / 24) * Math.PI * 2;
        const len = i % 6 === 0 ? 8 : 4;
        g.beginPath();
        g.moveTo(Math.cos(a) * (l.r + 3), Math.sin(a) * (l.r + 3));
        g.lineTo(Math.cos(a) * (l.r + 3 + len), Math.sin(a) * (l.r + 3 + len));
        g.stroke();
      }
      g.restore();
    }
  }

  private drawVignette(g: CanvasRenderingContext2D): void {
    const w = this.canvasEl.width, h = this.canvasEl.height;
    if (!this.vignette) {
      const [c, vg] = canvas(w, h);
      const grad = vg.createRadialGradient(w / 2, h * 0.55, h * 0.25, w / 2, h * 0.55, Math.max(w, h) * 0.75);
      grad.addColorStop(0, 'rgba(0,0,0,0)');
      grad.addColorStop(1, 'rgba(0,0,0,0.6)');
      vg.fillStyle = grad;
      vg.fillRect(0, 0, w, h);
      this.vignette = c;
    }
    g.drawImage(this.vignette, 0, 0);
  }

  get currentLevel(): LevelDef | null {
    return this.level;
  }
}

function mix(a: string, b: string, t: number): string {
  const pa = parseInt(a.slice(1), 16), pb = parseInt(b.slice(1), 16);
  const k = Math.max(0, Math.min(1, t));
  const ch = (s: number) => Math.round(((pa >> s) & 255) * (1 - k) + ((pb >> s) & 255) * k);
  return `rgb(${ch(16)}, ${ch(8)}, ${ch(0)})`;
}
