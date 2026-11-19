// Canvas 2D fallback renderer, used when WebGL cannot start. Reads sim state, never mutates it.
import { ENEMY_DEFS } from '../sim/enemies.ts';
import { ARENA_HALF, ARENA_RADIUS } from '../sim/entities.ts';
import type { Enemy, World } from '../sim/types.ts';
import type { Settings } from '../storage/save.ts';
import type { Fx } from './fx.ts';
import { Visor, type StickView } from './hud.ts';
import type { Preset } from './quality.ts';
import type { GameRenderer } from './types.ts';
import { constellation, stampStar, starGlyph } from '../../../../design/19_mystical-western/primitives.mjs';
import { C, FONT, rgba } from './theme.ts';

const TAU = Math.PI * 2;

export class Renderer implements GameRenderer {
  readonly kind = '2d' as const;
  private visor = new Visor();
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  W = 0;
  H = 0;
  S = 1;
  dpr = 1;
  camX = 0;
  camY = 0;
  private glows = new Map<string, HTMLCanvasElement>();
  private snap = true;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const c = canvas.getContext('2d', { alpha: false });
    if (!c) throw new Error('Canvas 2D is not available in this browser.');
    this.ctx = c;
    this.resize();
  }

  resize(): void {
    this.dpr = Math.min(2, window.devicePixelRatio || 1);
    const w = Math.max(1, Math.floor(window.innerWidth * this.dpr));
    const h = Math.max(1, Math.floor(window.innerHeight * this.dpr));
    if (this.canvas.width !== w || this.canvas.height !== h) {
      this.canvas.width = w;
      this.canvas.height = h;
    }
    this.W = w;
    this.H = h;
    this.S = Math.min(h / 720, w / 560);
  }

  resetCamera(): void {
    this.snap = true;
  }

  private glow(color: string): HTMLCanvasElement {
    let g = this.glows.get(color);
    if (!g) {
      g = document.createElement('canvas');
      g.width = g.height = 64;
      const c = g.getContext('2d');
      if (c) {
        const grad = c.createRadialGradient(32, 32, 0, 32, 32, 32);
        grad.addColorStop(0, color);
        grad.addColorStop(0.35, color + '66');
        grad.addColorStop(1, color + '00');
        c.fillStyle = grad;
        c.fillRect(0, 0, 64, 64);
      }
      this.glows.set(color, g);
    }
    return g;
  }

  private drawGlow(x: number, y: number, r: number, color: string, alpha = 1): void {
    const ctx = this.ctx;
    ctx.globalAlpha = alpha;
    ctx.drawImage(this.glow(color), x - r, y - r, r * 2, r * 2);
  }

  draw(w: World | null, fx: Fx, s: Settings, time: number, stick: StickView | null): void {
    const ctx = this.ctx;
    const { W, H } = this;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = C.night;
    ctx.fillRect(0, 0, W, H);

    let sx = 0;
    let sy = 0;
    if (w) {
      if (this.snap) {
        this.camX = w.player.x;
        this.camY = w.player.y;
        this.snap = false;
      } else {
        this.camX += (w.player.x - this.camX) * 0.12;
        this.camY += (w.player.y - this.camY) * 0.12;
      }
      if (s.shake && fx.trauma > 0) {
        const a = fx.trauma * fx.trauma * 12 * this.dpr;
        sx = (Math.random() * 2 - 1) * a;
        sy = (Math.random() * 2 - 1) * a;
      }
    } else {
      this.camX = Math.sin(time * 0.15) * 300;
      this.camY = Math.cos(time * 0.11) * 300;
    }
    const arena = w ? w.arena : 'hollow';
    ctx.setTransform(this.S, 0, 0, this.S, W / 2 - this.camX * this.S + sx, H / 2 - this.camY * this.S + sy);
    const vw = W / this.S;
    const vh = H / this.S;
    const left = this.camX - vw / 2 - 40;
    const right = this.camX + vw / 2 + 40;
    const top = this.camY - vh / 2 - 40;
    const bottom = this.camY + vh / 2 + 40;

    this.drawFloor(arena, left, right, top, bottom, time);
    if (w) {
      this.drawHazards(w, s, time);
      this.drawPickups(w, time, left, right, top, bottom);
      this.drawEnemies(w, s, time, left, right, top, bottom);
      this.drawBullets(w, s, left, right, top, bottom);
      this.drawPlayerStuff(w, time);
    } else {
      this.drawAttract(time);
    }
    this.drawFx(fx, left, right, top, bottom, s);

    // HUD in screen space
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    this.visor.draw(ctx, W, H, this.dpr, w, fx, s, time, stick, null);
  }

  private drawFloor(arena: string, l: number, r: number, t: number, b: number, time: number): void {
    const ctx = this.ctx;
    const accent = arena === 'foundry' ? C.ember : C.tan;
    ctx.fillStyle = arena === 'foundry' ? C.umber : C.night;
    if (arena === 'foundry') {
      ctx.beginPath();
      ctx.arc(0, 0, ARENA_RADIUS, 0, TAU);
      ctx.fill();
    } else ctx.fillRect(-ARENA_HALF, -ARENA_HALF, ARENA_HALF * 2, ARENA_HALF * 2);
    ctx.lineWidth = 1;
    ctx.strokeStyle = arena === 'foundry' ? rgba(C.ember, 0.18) : rgba(C.tan, 0.09);
    ctx.beginPath();
    const g = 80;
    for (let x = Math.floor(l / g) * g; x < r; x += g) {
      ctx.moveTo(x, t);
      ctx.lineTo(x, b);
    }
    for (let y = Math.floor(t / g) * g; y < b; y += g) {
      ctx.moveTo(l, y);
      ctx.lineTo(r, y);
    }
    ctx.stroke();
    // star chart: quiet stars and one constellation per 320-unit cell, seeded by the cell
    const cs = 320;
    for (let cx = Math.floor(l / cs) * cs; cx < r; cx += cs)
      for (let cy = Math.floor(t / cs) * cs; cy < b; cy += cs) {
        let h = (Math.imul(cx | 0, 73856093) ^ Math.imul(cy | 0, 19349663)) >>> 0;
        const rnd = () => ((h = (Math.imul(h ^ (h >>> 15), 2246822507) + 0x6d2b79f5) >>> 0) / 4294967296);
        for (let i = 0; i < 10; i++) starGlyph(ctx, cx + rnd() * cs, cy + rnd() * cs, 1.5 + rnd() * 2.5, C.ash, 0.25 + rnd() * 0.2);
        const pts: Array<[number, number]> = [];
        let px = cx + 30 + rnd() * 60;
        let py = cy + 60 + rnd() * 200;
        for (let i = 0; i < 4; i++) {
          pts.push([px, py]);
          px += 40 + rnd() * 30;
          py += (rnd() - 0.5) * 80;
        }
        constellation(ctx, pts, { color: arena === 'foundry' ? C.ember : C.quiet, node: C.ash, alpha: 0.6, dash: [3, 5], width: 1, nodeR: 1.8 });
      }
    // wall
    ctx.save();
    ctx.beginPath();
    ctx.rect(l - 400, t - 400, r - l + 800, b - t + 800);
    if (arena === 'foundry') ctx.arc(0, 0, ARENA_RADIUS, 0, TAU, true);
    else ctx.rect(-ARENA_HALF, -ARENA_HALF, ARENA_HALF * 2, ARENA_HALF * 2);
    ctx.clip('evenodd');
    ctx.fillStyle = C.ink;
    ctx.fillRect(l - 400, t - 400, r - l + 800, b - t + 800);
    ctx.restore();
    ctx.strokeStyle = accent;
    ctx.globalAlpha = 0.55 + Math.sin(time * 2) * 0.1;
    ctx.lineWidth = 4;
    if (arena === 'foundry') {
      ctx.beginPath();
      ctx.arc(0, 0, ARENA_RADIUS, 0, TAU);
      ctx.stroke();
    } else ctx.strokeRect(-ARENA_HALF, -ARENA_HALF, ARENA_HALF * 2, ARENA_HALF * 2);
    ctx.globalAlpha = 1;
  }

  private drawAttract(time: number): void {
    const ctx = this.ctx;
    ctx.globalCompositeOperation = 'lighter';
    const cols = [C.bone, C.ember, C.tan, C.wine, C.saddle];
    for (let i = 0; i < 14; i++) {
      const a = time * (0.1 + i * 0.013) + i * 1.7;
      const d = 160 + i * 40;
      this.drawGlow(this.camX + Math.cos(a) * d, this.camY + Math.sin(a * 1.2) * d * 0.7, 30 + (i % 4) * 14, cols[i % cols.length], 0.35);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
  }

  private drawHazards(w: World, s: Settings, time: number): void {
    const ctx = this.ctx;
    for (const h of w.hazards.list) {
      if (h.kind === 'pool') {
        if (h.t < h.tele) {
          const k = h.t / h.tele;
          ctx.strokeStyle = C.red;
          ctx.lineWidth = 3;
          ctx.setLineDash([8, 8]);
          ctx.globalAlpha = 0.4 + 0.5 * Math.sin(time * 18);
          ctx.beginPath();
          ctx.arc(h.x, h.y, 44, 0, TAU);
          ctx.stroke();
          ctx.setLineDash([]);
          ctx.globalAlpha = 0.25 * k;
          ctx.fillStyle = C.wine;
          ctx.fill();
        } else {
          const g = ctx.createRadialGradient(h.x, h.y, 0, h.x, h.y, h.r);
          g.addColorStop(0, rgba(C.night, 0.85));
          g.addColorStop(0.8, rgba(C.wine, 0.5));
          g.addColorStop(1, rgba(C.ember, 0.85));
          ctx.globalAlpha = 1;
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(h.x, h.y, h.r, 0, TAU);
          ctx.fill();
          ctx.strokeStyle = C.red;
          ctx.lineWidth = 3;
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      } else {
        const active = h.t >= h.tele;
        ctx.lineCap = 'butt';
        if (!active) {
          const a = 0.18 + 0.25 * (0.5 + 0.5 * Math.sin(time * 22));
          ctx.globalAlpha = a;
          ctx.strokeStyle = C.wine;
          ctx.lineWidth = h.width;
          ctx.beginPath();
          ctx.moveTo(h.x, h.y);
          ctx.lineTo(h.x2, h.y2);
          ctx.stroke();
          ctx.globalAlpha = 0.9;
          ctx.setLineDash([22, 22]);
          ctx.lineWidth = 3;
          ctx.strokeStyle = C.red;
          ctx.beginPath();
          ctx.moveTo(h.x, h.y);
          ctx.lineTo(h.x2, h.y2);
          ctx.stroke();
          ctx.setLineDash([]);
        } else {
          ctx.globalAlpha = 1;
          ctx.strokeStyle = C.blush;
          ctx.lineWidth = h.width;
          ctx.beginPath();
          ctx.moveTo(h.x, h.y);
          ctx.lineTo(h.x2, h.y2);
          ctx.stroke();
          ctx.strokeStyle = C.red;
          ctx.lineWidth = h.width * 1.6;
          ctx.globalAlpha = 0.35;
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
    }
    void s;
  }

  private drawPickups(w: World, time: number, l: number, r: number, t: number, b: number): void {
    const ctx = this.ctx;
    ctx.globalCompositeOperation = 'lighter';
    for (const o of w.pickups.list) {
      if (o.x < l || o.x > r || o.y < t || o.y > b) continue;
      if (o.kind === 'mote') this.drawGlow(o.x, o.y, 9, C.rose, 0.5);
      else if (o.kind === 'shard') this.drawGlow(o.x, o.y, 13, C.rose, 0.6);
      else this.drawGlow(o.x, o.y, 28 + Math.sin(time * 6) * 4, C.rose, 0.5);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    for (const o of w.pickups.list) {
      if (o.x < l || o.x > r || o.y < t || o.y > b) continue;
      if (o.kind === 'mote') {
        stampStar(ctx, o.x, o.y, 5, { fill: C.rose, edge: C.blush });
      } else if (o.kind === 'shard') {
        stampStar(ctx, o.x, o.y, 9, { fill: C.rose, edge: C.bone, rot: -Math.PI / 2 + Math.sin(time * 2) * 0.3 });
      } else {
        ctx.fillStyle = C.saddle;
        ctx.strokeStyle = C.umber;
        ctx.lineWidth = 3;
        ctx.fillRect(o.x - 12, o.y - 9, 24, 18);
        ctx.strokeRect(o.x - 12, o.y - 9, 24, 18);
        stampStar(ctx, o.x, o.y, 5, { fill: C.rose, edge: C.bone });
      }
    }
  }

  private poly(x: number, y: number, r: number, n: number, rot: number, fill: string | null, stroke: string | null, lw: number): void {
    const ctx = this.ctx;
    ctx.beginPath();
    for (let i = 0; i < n; i++) {
      const a = rot + (i / n) * TAU;
      const px = x + Math.cos(a) * r;
      const py = y + Math.sin(a) * r;
      if (i === 0) ctx.moveTo(px, py);
      else ctx.lineTo(px, py);
    }
    ctx.closePath();
    if (fill) {
      ctx.fillStyle = fill;
      ctx.fill();
    }
    if (stroke) {
      ctx.lineWidth = lw;
      ctx.strokeStyle = stroke;
      ctx.stroke();
    }
  }

  private drawEnemies(w: World, s: Settings, time: number, l: number, r: number, t: number, b: number): void {
    const ctx = this.ctx;
    const p = w.player;
    // telegraphs first so bodies sit on top
    for (const e of w.enemies.list) {
      if (!e.alive || e.x < l - 200 || e.x > r + 200 || e.y < t - 200 || e.y > b + 200) continue;
      this.drawTelegraph(e, time);
    }
    for (const e of w.enemies.list) {
      if (!e.alive || e.x < l || e.x > r || e.y < t || e.y > b) continue;
      const def = ENEMY_DEFS[e.kind];
      const col = e.flash > 0 ? C.white : def.color;
      const face = Math.atan2(p.y - e.y, p.x - e.x);
      let x = e.x;
      let y = e.y;
      if (e.kind === 'rammer' && e.state === 1) {
        x += Math.sin(time * 90) * 2.5;
        y += Math.cos(time * 80) * 2.5;
      }
      ctx.lineWidth = 2.5;
      ctx.lineJoin = 'round';
      const fillA = e.flash > 0 ? C.white : def.color + '44';
      switch (e.kind) {
        case 'swarm':
        case 'splitlet':
          this.poly(x, y, e.r * 1.15, 3, face, fillA, col, 2.5);
          break;
        case 'spitter':
          this.poly(x, y, e.r * 1.2, 4, face, fillA, col, 2.5);
          ctx.fillStyle = e.state === 1 && Math.floor(time * 24) % 2 === 0 ? C.white : col;
          ctx.beginPath();
          ctx.arc(x, y, 3.5, 0, TAU);
          ctx.fill();
          break;
        case 'rammer':
          this.poly(x, y, e.r * 1.25, 4, face + Math.PI / 4, fillA, col, 3);
          ctx.fillStyle = col;
          ctx.beginPath();
          ctx.moveTo(x + Math.cos(face) * (e.r + 9), y + Math.sin(face) * (e.r + 9));
          ctx.lineTo(x + Math.cos(face + 2.5) * e.r * 0.6, y + Math.sin(face + 2.5) * e.r * 0.6);
          ctx.lineTo(x + Math.cos(face - 2.5) * e.r * 0.6, y + Math.sin(face - 2.5) * e.r * 0.6);
          ctx.closePath();
          ctx.fill();
          break;
        case 'cleaver':
          ctx.fillStyle = fillA;
          ctx.strokeStyle = col;
          ctx.lineWidth = 5;
          ctx.beginPath();
          ctx.arc(x, y, e.r - 2, 0, TAU);
          ctx.fill();
          ctx.stroke();
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.moveTo(x - 5, y - e.r + 3);
          ctx.lineTo(x + 3, y - 2);
          ctx.lineTo(x - 3, y + 4);
          ctx.lineTo(x + 5, y + e.r - 3);
          ctx.stroke();
          break;
        case 'aegis':
          ctx.fillStyle = fillA;
          ctx.strokeStyle = col;
          ctx.lineWidth = 2.5;
          ctx.beginPath();
          ctx.arc(x, y, e.r, 0, TAU);
          ctx.fill();
          ctx.stroke();
          ctx.strokeStyle = e.flash > 0 ? C.white : C.tan;
          ctx.lineWidth = 6;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.arc(x, y, e.r + 9, e.shield - 0.87, e.shield + 0.87);
          ctx.stroke();
          ctx.lineCap = 'butt';
          break;
        case 'caster':
          this.poly(x, y, e.r * 1.35, 12, time * 0.8, null, col, 2.5);
          ctx.fillStyle = fillA;
          ctx.beginPath();
          ctx.arc(x, y, e.r * 0.7, 0, TAU);
          ctx.fill();
          ctx.fillStyle = e.state === 1 ? C.white : col;
          ctx.beginPath();
          ctx.arc(x, y, 3.5, 0, TAU);
          ctx.fill();
          break;
        case 'warden': {
          ctx.globalCompositeOperation = 'lighter';
          this.drawGlow(x, y, e.r * 2.6, e.phase ? C.red : C.ember, 0.45 + (e.state === 1 ? 0.35 * Math.sin(time * 30) : 0));
          ctx.globalAlpha = 1;
          ctx.globalCompositeOperation = 'source-over';
          this.poly(x, y, e.r, 8, time * 0.4, e.flash > 0 ? C.white : rgba(C.umber, 0.92), e.phase ? C.red : C.saddle, 4);
          this.poly(x, y, e.r * 0.55, 8, -time * 0.8, null, e.phase ? C.red : C.blush, 3);
          for (let i = 0; i < 8; i++) {
            const a = time * (e.phase ? 1.8 : 1) + (i / 8) * TAU;
            ctx.fillStyle = e.phase ? C.red : C.blush;
            ctx.beginPath();
            ctx.arc(x + Math.cos(a) * (e.r + 16), y + Math.sin(a) * (e.r + 16), 5, 0, TAU);
            ctx.fill();
          }
          ctx.fillStyle = e.phase ? C.red : C.blush;
          ctx.beginPath();
          ctx.arc(x, y, 8, 0, TAU);
          ctx.fill();
          break;
        }
      }
      if (e.elite) {
        ctx.strokeStyle = C.blush;
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.arc(x, y, e.r + 6, 0, TAU);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
    void s;
  }

  private drawTelegraph(e: Enemy, time: number): void {
    const ctx = this.ctx;
    const blink = 0.45 + 0.4 * Math.sin(time * 40);
    if (e.kind === 'spitter' && e.state === 1) {
      const k = 1 - e.timer / 0.7;
      ctx.strokeStyle = C.red;
      ctx.globalAlpha = 0.25 + 0.6 * k;
      ctx.lineWidth = 2 + 4 * k;
      ctx.beginPath();
      ctx.moveTo(e.x, e.y);
      ctx.lineTo(e.x + Math.cos(e.ang) * 520, e.y + Math.sin(e.ang) * 520);
      ctx.stroke();
      ctx.globalAlpha = 1;
    } else if (e.kind === 'rammer' && e.state === 1) {
      ctx.fillStyle = C.blush;
      ctx.globalAlpha = 0.14 + 0.18 * blink;
      const len = 480 * 0.55 + 40;
      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.rotate(e.ang);
      ctx.fillRect(0, -e.r, len, e.r * 2);
      ctx.restore();
      ctx.globalAlpha = 1;
    } else if (e.kind === 'caster' && e.state === 1) {
      ctx.strokeStyle = C.red;
      ctx.globalAlpha = 0.7;
      ctx.lineWidth = 2;
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.arc(e.tx, e.ty, 44, 0, TAU);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.globalAlpha = 1;
    } else if (e.kind === 'warden' && e.state === 1) {
      ctx.strokeStyle = C.red;
      ctx.globalAlpha = 0.5 + 0.4 * Math.sin(time * 28);
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(e.x, e.y, e.r + 30 + (1 - e.timer / 0.8) * 30, 0, TAU);
      ctx.stroke();
      if (e.tx === 3) {
        ctx.lineWidth = 36;
        ctx.globalAlpha = 0.25;
        ctx.beginPath();
        ctx.moveTo(e.x, e.y);
        ctx.lineTo(e.x + Math.cos(e.ang) * 330, e.y + Math.sin(e.ang) * 330);
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
  }

  private drawBullets(w: World, s: Settings, l: number, r: number, t: number, b: number): void {
    const ctx = this.ctx;
    ctx.globalCompositeOperation = 'lighter';
    for (const bl of w.bullets.list) {
      if (bl.x < l || bl.x > r || bl.y < t || bl.y > b) continue;
      if (bl.friendly) {
        this.drawGlow(bl.x, bl.y, bl.kind === 1 ? 16 : 12, bl.kind === 1 ? C.tan : bl.kind === 2 ? C.white : C.bone, 0.6);
      } else this.drawGlow(bl.x, bl.y, bl.r * 3.4, bl.kind === 1 ? C.blush : C.red, 0.7);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    for (const bl of w.bullets.list) {
      if (bl.x < l || bl.x > r || bl.y < t || bl.y > b) continue;
      if (bl.friendly) {
        ctx.strokeStyle = bl.kind === 1 ? C.tan : C.bone;
        ctx.lineWidth = bl.kind === 1 ? 4 : 3;
        ctx.lineCap = 'round';
        const sp = Math.hypot(bl.vx, bl.vy) || 1;
        ctx.beginPath();
        ctx.moveTo(bl.x - (bl.vx / sp) * 9, bl.y - (bl.vy / sp) * 9);
        ctx.lineTo(bl.x, bl.y);
        ctx.stroke();
        ctx.lineCap = 'butt';
      } else {
        if (s.outline) {
          ctx.fillStyle = C.ink;
          ctx.beginPath();
          ctx.arc(bl.x, bl.y, bl.r + 3, 0, TAU);
          ctx.fill();
        }
        ctx.fillStyle = bl.kind === 1 ? C.blush : C.red;
        ctx.beginPath();
        ctx.arc(bl.x, bl.y, bl.r, 0, TAU);
        ctx.fill();
        ctx.fillStyle = C.bone;
        ctx.beginPath();
        ctx.arc(bl.x, bl.y, bl.r * 0.45, 0, TAU);
        ctx.fill();
      }
    }
  }

  private drawPlayerStuff(w: World, time: number): void {
    const ctx = this.ctx;
    const p = w.player;
    const lv = w.levels;
    if (w.state === 'dead' && w.deathTimer > 0.05) return;
    // field
    if (lv.siphon > 0 && lv.bulwark > 0) {
      if (p.fieldOn) {
        const R = p.fieldR;
        const g = ctx.createRadialGradient(p.x, p.y, R * 0.4, p.x, p.y, R);
        g.addColorStop(0, rgba(C.bone, 0.02));
        g.addColorStop(1, rgba(C.bone, 0.2));
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(p.x, p.y, R, 0, TAU);
        ctx.fill();
        ctx.strokeStyle = C.bone;
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.arc(p.x, p.y, R, 0, TAU);
        ctx.stroke();
        ctx.setLineDash([10, 14]);
        ctx.lineWidth = 2;
        ctx.strokeStyle = C.tan;
        ctx.lineDashOffset = -time * 40;
        ctx.beginPath();
        ctx.arc(p.x, p.y, R - 8, 0, TAU);
        ctx.stroke();
        ctx.setLineDash([]);
      } else if (p.hold) {
        ctx.strokeStyle = C.tan;
        ctx.lineWidth = 2;
        ctx.setLineDash([4, 6]);
        ctx.beginPath();
        ctx.arc(p.x, p.y, 26 + p.reserve * 0.1, 0, TAU);
        ctx.stroke();
        ctx.setLineDash([]);
      }
    }
    // blades
    if (lv.orbit > 0) {
      const bladed = p.fieldOn && lv.bulwark > 0 && lv.siphon > 0;
      const rad = bladed ? p.fieldR + 10 : 64;
      const n = lv.orbit + 1;
      for (let i = 0; i < n; i++) {
        const a = p.orbitAngle + (i / n) * TAU;
        const bx = p.x + Math.cos(a) * rad;
        const by = p.y + Math.sin(a) * rad;
        ctx.save();
        ctx.translate(bx, by);
        ctx.rotate(a + Math.PI / 2);
        ctx.fillStyle = C.bone;
        ctx.strokeStyle = C.tan;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(0, -11);
        ctx.lineTo(5, 0);
        ctx.lineTo(0, 9);
        ctx.lineTo(-5, 0);
        ctx.closePath();
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }
    }
    // player ship
    const blink = p.iframes > 0 && Math.floor(time * 18) % 2 === 0;
    ctx.globalCompositeOperation = 'lighter';
    this.drawGlow(p.x, p.y, 34, p.flash > 0 ? C.red : C.bone, 0.45);
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    if (!blink) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.facing);
      ctx.fillStyle = C.bone;
      ctx.strokeStyle = C.tan;
      ctx.lineWidth = 3;
      ctx.lineJoin = 'round';
      ctx.beginPath();
      ctx.moveTo(15, 0);
      ctx.lineTo(-11, 11);
      ctx.lineTo(-5, 0);
      ctx.lineTo(-11, -11);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.fillStyle = C.wine;
      ctx.beginPath();
      ctx.arc(-1, 0, 3, 0, TAU);
      ctx.fill();
      ctx.restore();
    }
  }

  private drawFx(fx: Fx, l: number, r: number, t: number, b: number, s: Settings): void {
    const ctx = this.ctx;
    ctx.globalCompositeOperation = 'lighter';
    for (const ring of fx.rings) {
      ctx.globalAlpha = Math.max(0, ring.life / ring.max) * (s.reducedFlash ? 0.5 : 1);
      ctx.strokeStyle = ring.color;
      ctx.lineWidth = ring.w;
      ctx.beginPath();
      ctx.arc(ring.x, ring.y, ring.r, 0, TAU);
      ctx.stroke();
    }
    for (const bm of fx.beams) {
      ctx.globalAlpha = Math.max(0, bm.life / bm.max);
      ctx.strokeStyle = bm.color;
      ctx.lineWidth = bm.w;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.beginPath();
      for (let i = 0; i < bm.pts.length; i += 2) {
        if (i === 0) ctx.moveTo(bm.pts[0], bm.pts[1]);
        else ctx.lineTo(bm.pts[i], bm.pts[i + 1]);
      }
      ctx.stroke();
      ctx.lineCap = 'butt';
    }
    for (const p of fx.particles) {
      if (!p.alive || p.x < l || p.x > r || p.y < t || p.y > b) continue;
      ctx.globalAlpha = Math.max(0, p.life / p.max);
      ctx.fillStyle = p.color;
      ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
    }
    ctx.globalAlpha = 1;
    ctx.globalCompositeOperation = 'source-over';
    ctx.textAlign = 'center';
    for (const p of fx.pops) {
      ctx.globalAlpha = Math.min(1, p.life / 0.3);
      ctx.font = p.big ? `700 16px ${FONT.slab}` : `600 13px ${FONT.slab}`;
      ctx.fillStyle = C.ink;
      ctx.fillText(p.text, p.x + 1, p.y + 1);
      ctx.fillStyle = p.color;
      ctx.fillText(p.text, p.x, p.y);
    }
    ctx.globalAlpha = 1;
  }

  screenToWorld(cx: number, cy: number): { x: number; y: number } {
    return { x: this.camX + (cx * this.dpr - this.W / 2) / this.S, y: this.camY + (cy * this.dpr - this.H / 2) / this.S };
  }

  resetRun(_w: World): void {
    this.snap = true;
  }

  setQuality(_p: Preset): void {
    /* the flat fallback has a single quality level */
  }

  dispose(): void {
    this.glows.clear();
  }
}
