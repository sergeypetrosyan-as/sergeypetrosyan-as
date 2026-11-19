// Visor HUD: Wick's pilot visor readout, drawn on a 2D canvas in screen space.
// Shared by the WebGL renderer (on an overlay canvas) and the Canvas 2D fallback.
import { SYNERGIES, UPGRADES } from '../upgrades/data.ts';
import { reserveCap } from '../upgrades/rules.ts';
import type { World } from '../sim/types.ts';
import type { Settings } from '../storage/save.ts';
import type { Fx } from './fx.ts';
import { grain } from '../../../../design/19_mystical-western/primitives.mjs';
import { C, FONT, rgba } from './theme.ts';

export interface StickView {
  active: boolean;
  bx: number;
  by: number;
  kx: number;
  ky: number;
}

/** Projects a sim position to device-pixel screen coordinates, or null when off-screen/behind. */
export type Projector = (x: number, y: number, h: number) => { x: number; y: number } | null;

/** HUD roles: Wick is moonlight (bone), Essence is the collectible (rose), danger is red, leather is tan. */
export const PAL = {
  obsidian: C.night,
  phosphor: C.bone,
  cyan: C.bone,
  essence: C.rose,
  signal: C.red,
  brass: C.tan,
};

const DISPLAY = FONT.slab;
const MONO = FONT.slab;
const TITLE = FONT.title;
const TAU = Math.PI * 2;
const ORDER: Record<string, number> = { weapon: 0, signature: 1, passive: 2, filler: 3 };
const RACK = UPGRADES.filter((u) => u.kind !== 'filler').sort((a, b) => ORDER[a.kind] - ORDER[b.kind]);

export class Visor {
  private rim: HTMLCanvasElement | null = null;
  private rimW = 0;
  private rimH = 0;

  private buildRim(W: number, H: number, u: number): HTMLCanvasElement {
    const c = document.createElement('canvas');
    c.width = W;
    c.height = H;
    const g = c.getContext('2d');
    if (!g) return c;
    // Visor rim: the glass darkens toward the corners like a helmet edge.
    const rad = g.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.45, W / 2, H / 2, Math.hypot(W, H) * 0.56);
    rad.addColorStop(0, rgba(C.ink, 0));
    rad.addColorStop(1, rgba(C.ink, 0.62));
    g.fillStyle = rad;
    g.fillRect(0, 0, W, H);
    // A faint reflection along the top of the glass.
    const top = g.createLinearGradient(0, 0, 0, 40 * u);
    top.addColorStop(0, rgba(C.bone, 0.05));
    top.addColorStop(1, rgba(C.bone, 0));
    g.fillStyle = top;
    g.fillRect(0, 0, W, 40 * u);
    // desert dust settled on the glass, heavier toward the edges
    grain(g, 0, 0, W, H, { seed: 19, density: 0.5, colors: [C.tan, C.ember], alpha: 0.07 });
    // One crack, confined to the top-right corner. Seeded so it never changes between frames or runs.
    let seed = 7;
    const rnd = () => {
      seed = (seed * 16807) % 2147483647;
      return seed / 2147483647;
    };
    const ox = W - 26 * u;
    const oy = 92 * u;
    const branch = (x: number, y: number, ang: number, len: number, depth: number) => {
      let px = x;
      let py = y;
      const steps = 6 + Math.floor(rnd() * 4);
      g.beginPath();
      g.moveTo(px, py);
      for (let i = 0; i < steps; i++) {
        ang += (rnd() - 0.5) * 0.7;
        const l = (len / steps) * (0.6 + rnd() * 0.8);
        px += Math.cos(ang) * l;
        py += Math.sin(ang) * l;
        g.lineTo(px, py);
        if (depth > 0 && rnd() < 0.28) branch(px, py, ang + (rnd() < 0.5 ? 0.9 : -0.9), len * 0.4, depth - 1);
      }
      g.stroke();
    };
    g.lineCap = 'round';
    g.lineJoin = 'round';
    for (let pass = 0; pass < 2; pass++) {
      seed = 7;
      g.strokeStyle = pass === 0 ? rgba(C.ink, 0.35) : rgba(C.bone, 0.17);
      g.lineWidth = (pass === 0 ? 2.4 : 1) * Math.max(1, u * 0.9);
      g.save();
      if (pass === 0) g.translate(1.2 * u, 1.2 * u);
      branch(ox, oy, Math.PI * 0.82, 150 * u, 2);
      branch(ox, oy, Math.PI * 1.25, 90 * u, 1);
      branch(ox, oy, Math.PI * 0.55, 70 * u, 1);
      g.restore();
    }
    // impact point
    g.fillStyle = rgba(C.bone, 0.2);
    g.beginPath();
    g.arc(ox, oy, 2.4 * u, 0, TAU);
    g.fill();
    return c;
  }

  draw(
    ctx: CanvasRenderingContext2D,
    W: number,
    H: number,
    dpr: number,
    w: World | null,
    fx: Fx,
    s: Settings,
    time: number,
    stick: StickView | null,
    project: Projector | null,
  ): void {
    const u = Math.max(0.8, Math.min(1.9, Math.min(W, H) / 760));
    if (w) {
      // low hull: the visor edge bleeds brand red
      const p = w.player;
      if (p.hp / p.maxHp < 0.3 && w.state === 'playing') {
        const pulse = s.reducedFlash ? 0.22 : 0.18 + 0.12 * Math.sin(time * 6);
        const g = ctx.createRadialGradient(W / 2, H / 2, Math.min(W, H) * 0.38, W / 2, H / 2, Math.max(W, H) * 0.72);
        g.addColorStop(0, rgba(C.red, 0));
        g.addColorStop(1, rgba(C.red, pulse));
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      }
      if (project && s.numbers) this.drawPops(ctx, fx, u, project);
    }
    if (w) {
      if (!this.rim || this.rimW !== W || this.rimH !== H) {
        this.rim = this.buildRim(W, H, u);
        this.rimW = W;
        this.rimH = H;
      }
      ctx.drawImage(this.rim, 0, 0);
    }
    if (w) this.drawReadout(ctx, W, H, u, w, fx, time);
    if (stick && stick.active) {
      ctx.strokeStyle = rgba(C.tan, 0.45);
      ctx.lineWidth = 2 * dpr;
      ctx.beginPath();
      ctx.arc(stick.bx, stick.by, 56 * dpr, 0, TAU);
      ctx.stroke();
      ctx.fillStyle = rgba(C.bone, 0.45);
      ctx.beginPath();
      ctx.arc(stick.kx, stick.ky, 24 * dpr, 0, TAU);
      ctx.fill();
    }
    if (fx.flash > 0 && !s.reducedFlash) {
      ctx.globalAlpha = Math.min(0.35, fx.flash);
      ctx.fillStyle = fx.flashColor;
      ctx.fillRect(0, 0, W, H);
      ctx.globalAlpha = 1;
    }
  }

  private drawPops(ctx: CanvasRenderingContext2D, fx: Fx, u: number, project: Projector): void {
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineJoin = 'round';
    for (const p of fx.pops) {
      const sp = project(p.x, p.y, 26);
      if (!sp) continue;
      ctx.globalAlpha = Math.min(1, p.life / 0.3);
      ctx.font = `${p.big ? 700 : 600} ${Math.round((p.big ? 16 : 13) * u)}px ${MONO}`;
      ctx.strokeStyle = rgba(C.ink, 0.85);
      ctx.lineWidth = 3 * u;
      ctx.strokeText(p.text, sp.x, sp.y);
      ctx.fillStyle = p.color;
      ctx.fillText(p.text, sp.x, sp.y);
    }
    ctx.globalAlpha = 1;
    ctx.textBaseline = 'alphabetic';
  }

  private text(ctx: CanvasRenderingContext2D, t: string, x: number, y: number, font: string, color: string, align: CanvasTextAlign = 'left'): number {
    ctx.font = font;
    ctx.textAlign = align;
    ctx.fillStyle = rgba(C.ink, 0.75);
    ctx.fillText(t, x + 1, y + 1);
    ctx.fillStyle = color;
    ctx.fillText(t, x, y);
    return ctx.measureText(t).width;
  }

  /** Numbers with tabular figures: every digit sits in a cell as wide as the widest digit, so timers never jitter. */
  private nums(ctx: CanvasRenderingContext2D, t: string, x: number, y: number, font: string, color: string, align: CanvasTextAlign = 'left'): number {
    ctx.font = font;
    const cell = Math.max(...'0123456789'.split('').map((d) => ctx.measureText(d).width));
    const widths = [...t].map((ch) => (ch >= '0' && ch <= '9' ? cell : ctx.measureText(ch).width));
    const total = widths.reduce((a, b) => a + b, 0);
    let cx = align === 'center' ? x - total / 2 : align === 'right' ? x - total : x;
    ctx.textAlign = 'center';
    [...t].forEach((ch, i) => {
      const mid = cx + widths[i] / 2;
      ctx.fillStyle = rgba(C.ink, 0.75);
      ctx.fillText(ch, mid + 1, y + 1);
      ctx.fillStyle = color;
      ctx.fillText(ch, mid, y);
      cx += widths[i];
    });
    return total;
  }

  /** Segmented bar on visor glass. */
  private bar(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, frac: number, color: string, segs: number, u: number): void {
    const f = Math.max(0, Math.min(1, frac));
    ctx.fillStyle = rgba(C.umber, 0.8);
    ctx.fillRect(x, y, w, h);
    ctx.fillStyle = color;
    ctx.fillRect(x, y, f * w, h);
    // a brighter leading edge so the level reads at a glance
    if (f > 0 && f < 1) {
      ctx.fillStyle = rgba(C.white, 0.75);
      ctx.fillRect(x + f * w - Math.max(1, u), y, Math.max(1, u), h);
    }
    ctx.fillStyle = rgba(C.night, 0.8);
    const gap = Math.max(1, Math.round(u * 1.4));
    for (let i = 1; i < segs; i++) ctx.fillRect(Math.round(x + (w * i) / segs), y, gap, h);
    ctx.strokeStyle = rgba(C.ember, 0.75);
    ctx.lineWidth = 1;
    ctx.strokeRect(Math.round(x) - 0.5, Math.round(y) - 0.5, Math.round(w) + 1, Math.round(h) + 1);
  }

  private keycap(ctx: CanvasRenderingContext2D, key: string, label: string, x: number, y: number, u: number, on: boolean): number {
    const s = 17 * u;
    ctx.strokeStyle = on ? rgba(C.tan, 0.85) : rgba(C.ember, 0.6);
    ctx.lineWidth = 1;
    ctx.fillStyle = rgba(C.umber, 0.8);
    ctx.fillRect(x, y - s + 3 * u, s, s);
    ctx.strokeRect(Math.round(x) + 0.5, Math.round(y - s + 3 * u) + 0.5, Math.round(s), Math.round(s));
    this.text(ctx, key, x + s / 2, y - 1 * u, `700 ${Math.round(12 * u)}px ${DISPLAY}`, on ? PAL.phosphor : rgba(C.bone, 0.45), 'center');
    const lw = this.text(ctx, label, x + s + 6 * u, y - 1 * u, `600 ${Math.round(13 * u)}px ${DISPLAY}`, on ? PAL.phosphor : rgba(C.bone, 0.45));
    return s + 6 * u + lw + 16 * u;
  }

  private drawReadout(ctx: CanvasRenderingContext2D, W: number, H: number, u: number, w: World, fx: Fx, time: number): void {
    const p = w.player;
    const pad = Math.round(18 * u);
    const labelW = 62 * u;
    const bw = Math.min(220 * u, W * 0.3);
    const bx = pad + labelW;
    const sans12 = `600 ${Math.round(13 * u)}px ${DISPLAY}`;
    const mono = (px: number) => `600 ${Math.round(px * u)}px ${MONO}`;
    const dimP = rgba(C.bone, 0.62);

    // glass plate behind the left cluster
    const plateH = (w.levels.siphon > 0 ? (w.levels.detonation > 0 || w.levels.bulwark > 0 ? 104 : 80) : 58) * u;
    const plate = ctx.createLinearGradient(0, 0, bx + bw + 120 * u, 0);
    plate.addColorStop(0, rgba(C.umber, 0.6));
    plate.addColorStop(1, rgba(C.umber, 0));
    ctx.fillStyle = plate;
    ctx.fillRect(0, 0, bx + bw + 120 * u, pad + plateH);
    // stamped corner: a double rule and a diamond
    ctx.strokeStyle = rgba(C.ember, 0.9);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(pad - 8 * u, pad + 16 * u);
    ctx.lineTo(pad - 8 * u, pad - 6 * u);
    ctx.lineTo(pad + 14 * u, pad - 6 * u);
    ctx.moveTo(pad - 11 * u, pad + 16 * u);
    ctx.lineTo(pad - 11 * u, pad - 9 * u);
    ctx.lineTo(pad + 14 * u, pad - 9 * u);
    ctx.stroke();
    ctx.fillStyle = C.ember;
    ctx.beginPath();
    ctx.moveTo(pad - 8 * u, pad - 6 * u - 3.5 * u);
    ctx.lineTo(pad - 8 * u + 3.5 * u, pad - 6 * u);
    ctx.lineTo(pad - 8 * u, pad - 6 * u + 3.5 * u);
    ctx.lineTo(pad - 8 * u - 3.5 * u, pad - 6 * u);
    ctx.fill();

    // Hull
    let y = pad + 10 * u;
    const low = p.hp / p.maxHp < 0.3;
    this.text(ctx, 'Hull', pad, y + 1 * u, sans12, low ? PAL.signal : PAL.phosphor);
    this.bar(ctx, bx, y - 9 * u, bw, 10 * u, p.hp / p.maxHp, low ? PAL.signal : PAL.phosphor, Math.max(4, Math.round(p.maxHp / 20)), u);
    let vx = bx + bw + 8 * u;
    vx += this.nums(ctx, String(Math.ceil(p.hp)), vx, y + 1 * u, mono(15), low ? PAL.signal : PAL.phosphor);
    this.nums(ctx, `/${p.maxHp}`, vx + 2 * u, y + 1 * u, mono(12), dimP);

    // Essence / level
    y += 22 * u;
    this.text(ctx, 'Essence', pad, y + 1 * u, sans12, PAL.essence);
    this.bar(ctx, bx, y - 7 * u, bw, 6 * u, p.xp / p.xpNext, PAL.essence, 10, u);
    this.nums(ctx, `Lv ${p.level}`, bx + bw + 8 * u, y + 1 * u, `700 ${Math.round(14 * u)}px ${DISPLAY}`, PAL.essence);

    // Reserve
    if (w.levels.siphon > 0) {
      y += 22 * u;
      const cap = reserveCap(w.levels);
      const state = w.levels.bulwark > 0 ? (p.fieldOn ? 'Field up' : p.hold ? 'Holding' : 'Charging') : 'Reserve';
      const col = p.fieldOn ? PAL.cyan : p.hold ? PAL.brass : C.saddle;
      this.text(ctx, state, pad, y + 1 * u, sans12, col);
      this.bar(ctx, bx, y - 8 * u, bw, 8 * u, p.reserve / cap, col, 15, u);
      if (w.levels.bulwark > 0) {
        // the 15 % threshold where the field raises on its own
        ctx.fillStyle = rgba(C.bone, 0.7);
        ctx.fillRect(bx + bw * 0.15, y - 11 * u, Math.max(1, u), 14 * u);
      }
      let rx = bx + bw + 8 * u;
      rx += this.nums(ctx, String(Math.floor(p.reserve)), rx, y + 1 * u, mono(14), col);
      this.nums(ctx, `/${cap}`, rx + 2 * u, y + 1 * u, mono(12), dimP);
      if (w.levels.bulwark > 0) {
        y += 25 * u;
        let kx = pad;
        if (w.levels.detonation > 0) {
          const ready = p.detCd <= 0 && p.reserve + p.fieldSpent >= 8;
          kx += this.keycap(ctx, 'E', p.detCd > 0 ? 'Release cooling' : 'Release', kx, y, u, ready);
        }
        this.keycap(ctx, 'Q', p.hold ? 'Stop holding' : 'Hold', kx, y, u, true);
      }
    }

    // Timer and wave, top centre
    const t = Math.floor(w.time);
    const mm = String(Math.floor(t / 60)).padStart(2, '0');
    const ss = String(t % 60).padStart(2, '0');
    // on narrow (phone portrait) screens the timer drops below the left cluster so the two never overlap
    const top = W / u < 700 ? pad + plateH + 8 * u : pad;
    this.nums(ctx, `${mm}:${ss}`, W / 2, top + 22 * u, `700 ${Math.round(30 * u)}px ${DISPLAY}`, PAL.phosphor, 'center');
    this.nums(ctx, `Wave ${w.wave}`, W / 2, top + 42 * u, sans12, C.tan, 'center');

    // Boss bar
    for (const e of w.enemies.list) {
      if (!e.alive || e.kind !== 'warden') continue;
      const bwid = Math.min(520 * u, W * 0.62);
      const x0 = W / 2 - bwid / 2;
      const y0 = top + 70 * u;
      const name = e.tier === 4 ? 'Final Warden' : `Core Warden, tier ${e.tier}`;
      this.text(ctx, name, x0, y0 - 6 * u, `600 ${Math.round(13 * u)}px ${DISPLAY}`, e.phase ? PAL.signal : PAL.phosphor);
      if (e.phase) this.text(ctx, 'Armour open', x0 + bwid, y0 - 6 * u, sans12, PAL.signal, 'right');
      this.bar(ctx, x0, y0, bwid, 8 * u, e.hp / e.maxHp, e.phase ? PAL.signal : PAL.phosphor, 20, u);
      ctx.fillStyle = PAL.phosphor;
      ctx.fillRect(x0 + bwid * 0.5 - u * 0.5, y0 - 4 * u, Math.max(1, u), 16 * u);
      break;
    }

    // Kills and chain, top right
    const lw = this.text(ctx, 'kills', W - pad, pad + 20 * u, `600 ${Math.round(13 * u)}px ${DISPLAY}`, dimP, 'right');
    this.nums(ctx, String(w.kills), W - pad - lw - 6 * u, pad + 20 * u, mono(24), PAL.phosphor, 'right');
    if (w.chain >= 5) {
      this.text(ctx, `Chain ×${w.chain}`, W - pad, pad + 42 * u, `600 ${Math.round(14 * u)}px ${DISPLAY}`, PAL.brass, 'right');
    }

    // Module rack, bottom left
    const chip = Math.round(28 * u);
    let cx = pad;
    let cy = H - pad - chip - 6 * u;
    for (const up of RACK) {
      const l = w.levels[up.id];
      if (l <= 0) continue;
      ctx.fillStyle = rgba(C.umber, 0.82);
      ctx.fillRect(cx, cy, chip, chip);
      ctx.strokeStyle = up.color;
      ctx.globalAlpha = 0.7;
      ctx.lineWidth = 1;
      ctx.strokeRect(cx + 0.5, cy + 0.5, chip - 1, chip - 1);
      ctx.globalAlpha = 1;
      this.text(ctx, up.icon, cx + chip / 2, cy + chip * 0.7, `700 ${Math.round(15 * u)}px ${DISPLAY}`, up.color, 'center');
      // level ticks under the slot
      const n = up.maxLevel;
      const tw = (chip - (n - 1) * 2 * u) / n;
      for (let i = 0; i < n; i++) {
        ctx.fillStyle = i < l ? up.color : rgba(C.bone, 0.18);
        ctx.fillRect(cx + i * (tw + 2 * u), cy + chip + 3 * u, tw, 2.5 * u);
      }
      cx += chip + 6 * u;
      if (cx > W * 0.45) {
        cx = pad;
        cy -= chip + 12 * u;
      }
    }

    // Synergies, bottom centre: separate brass labels
    const act = SYNERGIES.filter((sy) => sy.needs.every((n) => w.levels[n] > 0));
    if (act.length) {
      ctx.font = sans12;
      const gap = 8 * u;
      const padX = 8 * u;
      const widths = act.map((a) => ctx.measureText(a.name).width + padX * 2);
      const total = widths.reduce((a, b) => a + b, 0) + gap * (act.length - 1);
      let sx = Math.max(W * 0.5 - total / 2, W * 0.48);
      if (sx + total > W - pad) sx = W - pad - total;
      const sy = H - pad - 4 * u;
      act.forEach((a, i) => {
        ctx.fillStyle = rgba(C.umber, 0.82);
        ctx.fillRect(sx, sy - 16 * u, widths[i], 22 * u);
        ctx.strokeStyle = rgba(C.ember, 0.95);
        ctx.strokeRect(Math.round(sx) + 0.5, Math.round(sy - 16 * u) + 0.5, Math.round(widths[i]), Math.round(22 * u));
        this.text(ctx, a.name, sx + padX, sy, sans12, PAL.brass);
        sx += widths[i] + gap;
      });
    }

    // Banner
    if (fx.bannerLife > 0 && fx.banner) {
      const a = Math.min(1, fx.bannerLife / 0.5);
      ctx.globalAlpha = a;
      const by = H * 0.3;
      const bwid = this.text(ctx, fx.banner, W / 2, by, `400 ${Math.round(32 * u)}px ${TITLE}`, fx.bannerColor, 'center');
      ctx.fillStyle = fx.bannerColor;
      ctx.globalAlpha = a * 0.6;
      ctx.fillRect(W / 2 - bwid / 2, by + 10 * u, bwid, Math.max(1, u));
      ctx.globalAlpha = 1;
    }
    void time;
  }
}
