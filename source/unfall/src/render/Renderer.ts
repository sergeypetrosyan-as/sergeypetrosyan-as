import { COURIER } from '../sim/Courier';
import type { Billboard, LevelDef, Rect } from '../sim/types';
import { GROUND_Y, type World } from '../sim/World';
import { PALETTE, cactus as drawCactus, disc, hatchClip, mesa, mix as mixHex, rgba, starfield, stampBorder, stampStar } from '../../../../design/19_mystical-western/primitives.mjs';

export const VIEW_H = 540;

/**
 * 19_mystical-western: Vesper is a frontier town at night under a carved moon.
 * Every value comes from the design system's palette and gameplay roles:
 * Ilo (player) is bone moonlight, danger is the brand red, sparks (collectibles)
 * are rose stamped stars and the world is tan / wine / umber.
 */
export const COLORS = {
  ink: PALETTE.ink,
  deep: PALETTE.night,
  teal: PALETTE.saddle,
  slab: PALETTE.umber,
  amber: PALETTE.rose,
  amberDim: rgba(PALETTE.rose, 0.55),
  coral: PALETTE.red,
  ice: PALETTE.bone,
  hush: PALETTE.bone,
};

const SLAB = '"Zilla Slab", Georgia, serif';
const reducedMQ = typeof matchMedia === 'function' ? matchMedia('(prefers-reduced-motion: reduce)') : null;

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

/**
 * Painted sign lettering baked once: slab capitals with a short warm halo (no
 * mystical western bloom). `plate` draws a weathered board with a restrained leather-stamp border.
 */
function mysticalWesternText(text: string, size: number, color: string, plate = false): HTMLCanvasElement {
  const font = `700 ${size}px ${SLAB}`;
  const [, mg] = canvas(4, 4);
  mg.font = font;
  const spacing = Math.round(size * 0.08);
  const tw = mg.measureText(text).width + spacing * text.length;
  const pad = size * 0.9;
  const [c, g] = canvas(tw + pad * 2, size + pad * 2);
  if (plate) {
    const x = pad * 0.55, y = pad * 0.55, w = c.width - pad * 1.1, h = c.height - pad * 1.1;
    g.fillStyle = PALETTE.umber;
    g.fillRect(x, y, w, h);
    hatchClip(g, (q) => q.rect(x, y, w, h), { angle: 0, gap: 5, color: PALETTE.mesa, width: 1, alpha: 0.9, bounds: [x, y, w, h] });
    stampBorder(g, x, y, w, h, { color: PALETTE.ember, stitch: PALETTE.tan, radius: 3, inset: 4, corner: 2.5, stitchAlpha: 0.45 });
  }
  g.font = font;
  g.textAlign = 'center';
  g.textBaseline = 'middle';
  g.letterSpacing = `${spacing}px`;
  const ty = c.height / 2 + size * 0.04;
  g.shadowColor = rgba(color, 0.5);
  g.shadowBlur = size * 0.4;
  g.fillStyle = color;
  g.fillText(text, c.width / 2, ty);
  g.shadowBlur = 0;
  g.fillText(text, c.width / 2, ty);
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
 * difference-composited disc over it (a photographic negative of the present)
 * framed by an engraved moon-ring, and the Hush is a pale static field left of the front.
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
  private stars: HTMLCanvasElement | null = null;
  private moon: HTMLCanvasElement | null = null;
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
    // The Hush: pale bone/tan static, like a page being scraped blank.
    for (let k = 0; k < 4; k++) {
      const [c, g] = canvas(160, 160);
      const img = g.createImageData(160, 160);
      for (let i = 0; i < img.data.length; i += 4) {
        const v = Math.random() < 0.5 ? 228 + Math.random() * 13 : 150 + Math.random() * 70;
        img.data[i] = v; img.data[i + 1] = v * 0.975; img.data[i + 2] = v * 0.955; img.data[i + 3] = 255;
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
    this.stars = null;
  }

  /** CSS pixel → world coordinates for a given camera. */
  toWorld(px: number, py: number, camX: number): { x: number; y: number } {
    return { x: camX + (px * this.dpr) / this.scale, y: (py * this.dpr) / this.scale - this.offY };
  }

  setLevel(def: LevelDef): void {
    this.level = def;
    this.far = this.mesaLayer(def.seed);
    this.mid = this.town(def.seed * 7 + 3, 2400);
    const tone = (c: Billboard['color']) => (c === 'coral' ? COLORS.coral : c === 'ice' ? COLORS.ice : COLORS.amber);
    this.billboards = (def.billboards ?? []).map((b) => ({ b, img: mysticalWesternText(b.text, b.size ?? 28, tone(b.color)) }));
    this.signImgs = (def.signs ?? []).map((s) => mysticalWesternText(s.text, Math.min(s.h * 0.62, 30), PALETTE.blush, true));
    this.goalImg = mysticalWesternText(def.final ? 'LIGHTHOUSE' : 'ONWARD', def.final ? 26 : 18, COLORS.amber);
  }

  /** Far layer: a low engraved mesa horizon with one or two saguaros for scale. */
  private mesaLayer(seed: number): HTMLCanvasElement {
    const width = 2400;
    const [c, g] = canvas(width, VIEW_H);
    const base = GROUND_Y + 10;
    mesa(g, 0, width, base - 70, { seed, height: 120, fill: PALETTE.mesa, strata: PALETTE.ember, bottom: VIEW_H, plateaus: 4, strataAlpha: 0.1 });
    mesa(g, -60, width + 60, base - 20, { seed: seed + 5, height: 70, fill: PALETTE.umber, strata: PALETTE.mesa, bottom: VIEW_H, plateaus: 6, strataAlpha: 0.6 });
    // Make the strip tile seamlessly: blend the last 80 px into the first.
    const edge = g.getImageData(0, 0, 80, VIEW_H);
    const [tmp, tg] = canvas(80, VIEW_H);
    tg.putImageData(edge, 0, 0);
    const fade = g.createLinearGradient(width - 80, 0, width, 0);
    fade.addColorStop(0, 'rgba(0,0,0,0)');
    fade.addColorStop(1, 'rgba(0,0,0,1)');
    g.save();
    g.globalCompositeOperation = 'destination-out';
    g.fillStyle = fade;
    g.fillRect(width - 80, 0, 80, VIEW_H);
    g.globalCompositeOperation = 'destination-over';
    g.drawImage(tmp, width - 80, 0);
    g.restore();
    return c;
  }

  /** Mid layer: false-front frontier buildings, a water tower, lamp-lit windows. */
  private town(seed: number, width: number): HTMLCanvasElement {
    const [c, g] = canvas(width, VIEW_H);
    const rnd = rng(seed);
    let x = 0;
    let cacti = 0;
    while (x < width - 140) {
      const w = 50 + rnd() * 90;
      const h = 70 + rnd() * 120;
      const top = GROUND_Y + 10 - h;
      g.fillStyle = PALETTE.night;
      // false front with a stepped parapet
      g.beginPath();
      g.moveTo(x, VIEW_H);
      g.lineTo(x, top + 10);
      g.lineTo(x + w * 0.18, top + 10);
      g.lineTo(x + w * 0.18, top);
      g.lineTo(x + w * 0.82, top);
      g.lineTo(x + w * 0.82, top + 10);
      g.lineTo(x + w, top + 10);
      g.lineTo(x + w, VIEW_H);
      g.closePath();
      g.fill();
      // engraved clapboard lines
      g.strokeStyle = rgba(PALETTE.mesa, 0.55);
      g.lineWidth = 1;
      g.beginPath();
      for (let ly = top + 16; ly < GROUND_Y + 10; ly += 7) { g.moveTo(x + 2, ly); g.lineTo(x + w - 2, ly); }
      g.stroke();
      g.strokeStyle = rgba(PALETTE.ember, 0.45);
      g.strokeRect(x + 0.5, top + 10.5, w - 1, h);
      if (rnd() < 0.25) {
        // water tower on stilts
        const tx = x + w * 0.5;
        g.fillStyle = PALETTE.night;
        g.fillRect(tx - 12, top - 34, 24, 20);
        g.fillRect(tx - 10, top - 14, 2, 14);
        g.fillRect(tx + 8, top - 14, 2, 14);
        g.beginPath(); g.moveTo(tx - 14, top - 34); g.lineTo(tx, top - 44); g.lineTo(tx + 14, top - 34); g.fill();
      }
      for (let wy = top + 22; wy < GROUND_Y - 6; wy += 26) {
        for (let wx = x + 10; wx < x + w - 16; wx += 20) {
          const r = rnd();
          if (r < 0.14) {
            g.fillStyle = r < 0.12 ? rgba(PALETTE.rose, 0.55) : rgba(PALETTE.red, 0.55);
            g.fillRect(wx, wy, 6, 9);
          }
        }
      }
      x += w + 6 + rnd() * 30;
      if (cacti < 2 && rnd() < 0.18) {
        drawCactus(g, x + 18, GROUND_Y + 10, 34 + rnd() * 18, { fill: PALETTE.night, seed: (seed + cacti) | 0 });
        cacti++;
        x += 40;
      }
    }
    return c;
  }

  private buildStars(): HTMLCanvasElement {
    const w = Math.max(960, Math.ceil(this.viewW)), h = VIEW_H;
    const [c, g] = canvas(w, h);
    starfield(g, 0, 0, w, h * 0.75, { seed: 19, count: Math.round(w / 9), color: PALETTE.tan, max: 1.4, alpha: 0.4 });
    return c;
  }

  private buildMoon(): HTMLCanvasElement {
    const R = 64;
    const [c, g] = canvas(R * 5, R * 5);
    disc(g, R * 2.5, R * 2.5, R, { face: PALETTE.bone, ink: PALETTE.wine, rim: PALETTE.saddle, rings: 2, glow: 0.12, phase: 0.12, shadow: PALETTE.night });
    return c;
  }

  draw(world: World, o: DrawOptions, dt: number): void {
    const g = this.ctx;
    const S = this.scale;
    const W = this.viewW;
    const reduced = o.reducedMotion || !!reducedMQ?.matches;
    g.setTransform(1, 0, 0, 1, 0, 0);
    g.globalCompositeOperation = 'source-over';
    g.globalAlpha = 1;

    // Sky: night zenith → dusk at the horizon; the ending warms it toward a rose dawn.
    const sky = g.createLinearGradient(0, 0, 0, this.canvasEl.height);
    const dawn = o.ending;
    sky.addColorStop(0, mix(PALETTE.ink, PALETTE.wine, dawn));
    sky.addColorStop(0.35, mix(PALETTE.night, PALETTE.ember, dawn * 0.7));
    sky.addColorStop(0.68, mix(PALETTE.dusk, PALETTE.rose, dawn * 0.8));
    sky.addColorStop(0.8, mix(PALETTE.mesa, PALETTE.blush, dawn));
    sky.addColorStop(1, PALETTE.ink);
    g.fillStyle = sky;
    g.fillRect(0, 0, this.canvasEl.width, this.canvasEl.height);

    const shakeX = reduced ? 0 : (Math.random() - 0.5) * o.shake * 6;
    const shakeY = reduced ? 0 : (Math.random() - 0.5) * o.shake * 6;
    g.setTransform(S, 0, 0, S, shakeX * S, (shakeY + this.offY) * S);

    if (!this.stars) this.stars = this.buildStars();
    g.globalAlpha = 1 - dawn * 0.8;
    this.parallax(g, this.stars, o.camX * 0.04, W);
    g.globalAlpha = 1;
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
    this.drawAsh(g, dt, { ...o, reducedMotion: reduced }, world);
    g.translate(o.camX, 0);

    this.drawHush(g, world, o.camX, W);
    this.drawLens(g, o, W);
    if (dawn > 0) {
      g.globalCompositeOperation = 'lighter';
      g.fillStyle = rgba(PALETTE.rose, 0.16 * dawn * (0.4 + o.light / 100));
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

  /** The town clock is the carved moon: engraved hour ticks and hands on its face. */
  private drawClock(g: CanvasRenderingContext2D, W: number, clock: number): void {
    const cx = W * 0.8, cy = 118, R = 64;
    if (!this.moon) this.moon = this.buildMoon();
    g.drawImage(this.moon, cx - this.moon.width / 2, cy - this.moon.height / 2);
    g.save();
    g.strokeStyle = rgba(PALETTE.wine, 0.6);
    g.lineWidth = 1.5;
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      const inner = i % 3 === 0 ? R - 16 : R - 12;
      g.beginPath();
      g.moveTo(cx + Math.cos(a) * inner, cy + Math.sin(a) * inner);
      g.lineTo(cx + Math.cos(a) * (R - 6), cy + Math.sin(a) * (R - 6));
      g.stroke();
    }
    // 23:5x and creeping toward midnight.
    const minute = (55 + clock / 12) % 60;
    const ma = (minute / 60) * Math.PI * 2 - Math.PI / 2;
    const ha = ((11 + minute / 60) / 12) * Math.PI * 2 - Math.PI / 2;
    g.strokeStyle = rgba(PALETTE.wine, 0.85);
    g.lineCap = 'round';
    g.lineWidth = 3;
    g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(ha) * R * 0.45, cy + Math.sin(ha) * R * 0.45); g.stroke();
    g.lineWidth = 1.8;
    g.beginPath(); g.moveTo(cx, cy); g.lineTo(cx + Math.cos(ma) * R * 0.72, cy + Math.sin(ma) * R * 0.72); g.stroke();
    g.fillStyle = PALETTE.wine;
    g.beginPath(); g.arc(cx, cy, 3, 0, Math.PI * 2); g.fill();
    g.restore();
  }

  private drawBillboards(g: CanvasRenderingContext2D, camX: number, W: number): void {
    for (const { b, img } of this.billboards) {
      const w = img.width, h = img.height;
      if (b.x + w / 2 < camX - 50 || b.x - w / 2 > camX + W + 50) continue;
      g.fillStyle = PALETTE.umber;
      g.fillRect(b.x - 3, b.y + h * 0.25, 6, GROUND_Y - b.y);
      g.drawImage(img, b.x - w / 2, b.y - h / 2);
    }
  }

  private drawGoal(g: CanvasRenderingContext2D, world: World): void {
    const def = world.def;
    const x = def.goal;
    const ground = world.surface(x - 30, 0, 999, 999) ?? GROUND_Y;
    if (def.final) {
      // Lighthouse: tall engraved tower with a sweeping beam.
      const path = (q: CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D) => {
        q.moveTo(x + 10, ground);
        q.lineTo(x + 26, ground - 250);
        q.lineTo(x + 64, ground - 250);
        q.lineTo(x + 80, ground);
        q.closePath();
      };
      g.fillStyle = PALETTE.umber;
      g.beginPath();
      path(g);
      g.fill();
      hatchClip(g, path, { angle: 0, gap: 18, color: PALETTE.ember, width: 2, alpha: 0.5, bounds: [x + 10, ground - 250, 70, 250] });
      g.strokeStyle = PALETTE.ember;
      g.lineWidth = 1.5;
      g.beginPath();
      path(g);
      g.stroke();
      g.fillStyle = COLORS.amber;
      g.fillRect(x + 30, ground - 270, 30, 20);
      const a = (performance.now() / 1000) % (Math.PI * 2);
      g.save();
      g.globalCompositeOperation = 'lighter';
      const beam = g.createLinearGradient(x + 45, ground - 260, x + 45 + Math.cos(a) * 420, ground - 260);
      beam.addColorStop(0, rgba(PALETTE.blush, 0.32));
      beam.addColorStop(1, rgba(PALETTE.blush, 0));
      g.fillStyle = beam;
      g.beginPath();
      g.moveTo(x + 45, ground - 260);
      g.lineTo(x + 45 + Math.cos(a) * 420, ground - 300);
      g.lineTo(x + 45 + Math.cos(a) * 420, ground - 220);
      g.fill();
      g.restore();
    } else {
      // A frontier gateway: two posts and a crossbeam.
      g.fillStyle = rgba(PALETTE.rose, 0.08);
      g.fillRect(x - 4, ground - 70, 40, 70);
      g.fillStyle = PALETTE.saddle;
      g.fillRect(x - 6, ground - 76, 5, 76);
      g.fillRect(x + 33, ground - 76, 5, 76);
      g.fillRect(x - 10, ground - 78, 52, 5);
      g.fillStyle = COLORS.amber;
      g.fillRect(x - 10, ground - 78, 52, 1.5);
    }
    if (this.goalImg) g.drawImage(this.goalImg, x + (def.final ? 45 : 16) - this.goalImg.width / 2, ground - (def.final ? 300 : 96));
  }

  private drawTiles(g: CanvasRenderingContext2D, world: World, camX: number, W: number): void {
    for (const t of world.tiles) {
      const r = t.rect;
      if (r.x + r.w < camX - 40 || r.x > camX + W + 40) continue;
      if (!t.collapsible) {
        // Street: a boardwalk edge over packed earth with engraved strata.
        const grad = g.createLinearGradient(0, r.y, 0, r.y + 200);
        grad.addColorStop(0, PALETTE.mesa);
        grad.addColorStop(0.12, PALETTE.umber);
        grad.addColorStop(1, PALETTE.night);
        g.fillStyle = grad;
        g.fillRect(r.x, r.y, r.w, r.h);
        g.fillStyle = rgba(PALETTE.ember, 0.28);
        for (let sy = r.y + 26; sy < r.y + r.h; sy += 22) g.fillRect(r.x, sy, r.w, 1);
        g.fillStyle = rgba(PALETTE.tan, 0.14);
        g.fillRect(r.x, r.y + 2, r.w, 6);
        g.fillStyle = PALETTE.tan;
        g.fillRect(r.x, r.y, r.w, 2);
        // Edges facing a drop are marked in ember so gaps read at a glance.
        g.fillStyle = rgba(PALETTE.red, 0.55);
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
      // A plank: umber boards with grain lines.
      g.fillStyle = PALETTE.umber;
      g.fillRect(-r.w / 2 + 1, -r.h / 2, r.w - 2, r.h);
      g.fillStyle = rgba(PALETTE.mesa, 0.9);
      for (let bx = -r.w / 2 + 14; bx < r.w / 2 - 4; bx += 16) g.fillRect(bx, -r.h / 2 + 2, 1, r.h - 2);
      g.fillStyle = shake ? COLORS.coral : PALETTE.tan;
      g.fillRect(-r.w / 2 + 1, -r.h / 2, r.w - 2, 2);
      if (shake || drop > 0) {
        g.strokeStyle = rgba(PALETTE.red, 0.75);
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
        g.strokeStyle = rgba(PALETTE.tan, 0.45);
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
      g.fillStyle = PALETTE.night;
      g.fillRect(r.x - 6, k.def.top - 200, 4, k.def.bottom - k.def.top + 200);
      g.fillRect(r.x + r.w + 2, k.def.top - 200, 4, k.def.bottom - k.def.top + 200);
      g.fillStyle = PALETTE.umber;
      g.fillRect(r.x, r.y - 200, r.w, r.h + 200);
      g.fillStyle = rgba(PALETTE.ember, 0.35);
      for (let bx = r.x + 6; bx < r.x + r.w - 2; bx += 12) g.fillRect(bx, r.y - 200, 1, r.h + 188);
      // hazard face: brand red and night chevrons
      g.save();
      g.beginPath();
      g.rect(r.x, r.y + r.h - 12, r.w, 12);
      g.clip();
      g.fillStyle = COLORS.coral;
      g.fillRect(r.x, r.y + r.h - 12, r.w, 12);
      g.fillStyle = PALETTE.night;
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
        g.fillStyle = rgba(PALETTE.red, 0.3);
        g.fillRect(r.x - 10, r.y + r.h, r.w + 20, 6);
      }
    }
  }

  private drawElevators(g: CanvasRenderingContext2D, world: World): void {
    for (const e of world.elevators) {
      const r = e.rect(this.r);
      g.strokeStyle = rgba(PALETTE.tan, 0.35);
      g.lineWidth = 1;
      g.beginPath();
      g.moveTo(r.x + 6, 0); g.lineTo(r.x + 6, r.y);
      g.moveTo(r.x + r.w - 6, 0); g.lineTo(r.x + r.w - 6, r.y);
      g.stroke();
      g.fillStyle = COLORS.slab;
      g.fillRect(r.x, r.y, r.w, r.h);
      g.fillStyle = PALETTE.tan;
      g.fillRect(r.x, r.y, r.w, 2);
      g.fillStyle = rgba(PALETTE.rose, 0.2);
      g.fillRect(r.x + 4, r.y + r.h, r.w - 8, 3);
    }
  }

  /** Sparks are collectibles: bright rose stamped stars with a small warm halo. */
  private drawSparks(g: CanvasRenderingContext2D, world: World): void {
    const t = world.time;
    for (const s of world.sparks) {
      if (s.taken) continue;
      const pulse = 0.6 + 0.4 * Math.sin(t * 4 + s.x);
      g.save();
      g.translate(s.x, s.y + Math.sin(t * 2 + s.x) * 3);
      g.globalCompositeOperation = 'lighter';
      const glow = g.createRadialGradient(0, 0, 0, 0, 0, 16);
      glow.addColorStop(0, rgba(PALETTE.rose, 0.5 * pulse));
      glow.addColorStop(1, rgba(PALETTE.rose, 0));
      g.fillStyle = glow;
      g.fillRect(-16, -16, 32, 32);
      g.globalCompositeOperation = 'source-over';
      stampStar(g, 0, 0, 6.5, { fill: PALETTE.rose, edge: PALETTE.bone, rot: -Math.PI / 2 + Math.sin(t + s.x) * 0.2 });
      g.restore();
    }
  }

  private drawCourier(g: CanvasRenderingContext2D, world: World, light: number): void {
    const c = world.courier;
    const x = c.x, y = c.y;
    // Scarf of light: her recorded past, newest first. Rose by day, moonlight while rewinding.
    const n = c.trail(this.trail.length, this.trail);
    if (n > 2) {
      g.save();
      g.lineCap = 'round';
      for (let i = 1; i < n; i += 1) {
        const a = this.trail[i - 1], b = this.trail[i];
        const k = 1 - i / n;
        g.strokeStyle = c.rewinding ? rgba(PALETTE.bone, 0.7 * k) : rgba(PALETTE.rose, 0.65 * k);
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
      g.fillStyle = rgba(PALETTE.blush, Math.max(0, 1 - t / 2.2));
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
    lg.addColorStop(0, rgba(PALETTE.blush, 0.14 + 0.32 * (light / 100)));
    lg.addColorStop(1, rgba(PALETTE.rose, 0));
    g.fillStyle = lg;
    g.fillRect(x + 9 - glowR, y - 13 - glowR, glowR * 2, glowR * 2);
    g.restore();

    g.save();
    g.translate(x, y);
    g.scale(1.2, 1.2);
    g.translate(-x, -y);
    const sw = Math.sin(c.walk) * (c.waiting || !c.grounded ? 0 : 1);
    g.strokeStyle = PALETTE.bone;
    g.lineWidth = 2;
    g.beginPath();
    g.moveTo(x - 2, y - 9); g.lineTo(x - 2 + sw * 4, y);
    g.moveTo(x + 2, y - 9); g.lineTo(x + 2 - sw * 4, y);
    g.stroke();
    // Poncho + head in moonlight bone, outlined in wine.
    g.fillStyle = PALETTE.bone;
    g.strokeStyle = PALETTE.wine;
    g.lineWidth = 1;
    g.beginPath();
    g.moveTo(x - 7, y - 8);
    g.lineTo(x - 4, y - 22);
    g.lineTo(x + 4, y - 22);
    g.lineTo(x + 7, y - 8);
    g.closePath();
    g.fill();
    g.stroke();
    g.beginPath();
    g.arc(x, y - 26, 5, 0, Math.PI * 2);
    g.fill();
    // Hat: a wide brim and a low crown in wine; the band flips red while time runs back.
    g.fillStyle = PALETTE.wine;
    g.fillRect(x - 8, y - 29.5, 16, 2);
    g.beginPath();
    g.roundRect(x - 4, y - 34, 8, 5, 2);
    g.fill();
    g.fillStyle = c.rewinding ? COLORS.coral : PALETTE.saddle;
    g.fillRect(x - 4, y - 30.5, 8, 1.2);
    // Lantern
    g.fillStyle = rgba(PALETTE.blush, 0.35 + 0.65 * (light / 100));
    g.fillRect(x + 7, y - 16, 5, 6);
    g.strokeStyle = PALETTE.wine;
    g.beginPath();
    g.moveTo(x + 4, y - 18); g.lineTo(x + 9.5, y - 16);
    g.stroke();

    g.restore();
    if (c.waiting && !c.won) {
      const a = 0.5 + 0.5 * Math.sin(world.time * 5);
      g.fillStyle = rgba(PALETTE.bone, 0.5 + 0.5 * a);
      g.font = `700 13px ${SLAB}`;
      g.textAlign = 'center';
      g.fillText('…', x, y - 42);
    }
    void COURIER;
  }

  /** Drifting desert dust (decorative; off under reduced motion). */
  private drawAsh(g: CanvasRenderingContext2D, dt: number, o: DrawOptions, world: World): void {
    if (o.reducedMotion) return;
    const camX = o.camX;
    const W = this.viewW;
    const l = o.lens;
    g.fillStyle = rgba(PALETTE.tan, 0.32);
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

  /** The time lens: a negative of the present inside an engraved moon-ring. */
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
      g.fillStyle = PALETTE.bone;
      g.fillRect(l.x - l.r, l.y - l.r, l.r * 2, l.r * 2);
      // Strip the inverted hue (it would read cyan) and re-ink it as an engraved sepia plate.
      g.globalCompositeOperation = 'color';
      g.fillStyle = PALETTE.saddle;
      g.fillRect(l.x - l.r, l.y - l.r, l.r * 2, l.r * 2);
      g.globalCompositeOperation = 'source-over';
      g.fillStyle = rgba(PALETTE.wine, 0.16);
      g.fillRect(l.x - l.r, l.y - l.r, l.r * 2, l.r * 2);
      // Engraved crescent hatching on the lower-left, like the carved moon.
      g.strokeStyle = rgba(PALETTE.wine, 0.28);
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
      const col = l.fizzling ? COLORS.coral : l.active ? PALETTE.bone : rgba(PALETTE.bone, 0.5);
      g.save();
      g.translate(l.x, l.y);
      g.strokeStyle = col;
      g.lineWidth = l.active ? 2.2 : 1.2;
      if (!l.active) g.setLineDash([4, 6]);
      g.beginPath();
      g.arc(0, 0, l.r, 0, Math.PI * 2);
      g.stroke();
      g.setLineDash([]);
      if (l.active) {
        // Second carved rim, like the moon's engraved rings.
        g.lineWidth = 1;
        g.globalAlpha = 0.55;
        g.beginPath();
        g.arc(0, 0, l.r - 5, 0, Math.PI * 2);
        g.stroke();
        g.globalAlpha = 1;
      }
      // Ticks orbiting counter-clockwise while time runs back; every sixth is a diamond.
      g.lineWidth = l.active ? 1.6 : 1.2;
      for (let i = 0; i < 24; i++) {
        const a = spin + (i / 24) * Math.PI * 2;
        const ca = Math.cos(a), sa = Math.sin(a);
        if (i % 6 === 0) {
          const d = l.r + 9;
          g.fillStyle = col;
          g.beginPath();
          g.moveTo(ca * (d - 5), sa * (d - 5));
          g.lineTo(ca * d - sa * 3, sa * d + ca * 3);
          g.lineTo(ca * (d + 5), sa * (d + 5));
          g.lineTo(ca * d + sa * 3, sa * d - ca * 3);
          g.closePath();
          g.fill();
          continue;
        }
        g.beginPath();
        g.moveTo(ca * (l.r + 3), sa * (l.r + 3));
        g.lineTo(ca * (l.r + 7), sa * (l.r + 7));
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
      grad.addColorStop(0, rgba(PALETTE.ink, 0));
      grad.addColorStop(1, rgba(PALETTE.ink, 0.6));
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
  return mixHex(a, b, Math.max(0, Math.min(1, t)));
}
