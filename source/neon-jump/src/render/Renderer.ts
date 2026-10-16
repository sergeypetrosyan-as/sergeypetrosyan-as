import { COLORS, PLAYER_H, THEMES, TILE, VIEW_H, type Theme } from '../game/Config';
import type { Boss } from '../entities/Boss';
import { TIMED_PERIOD, type Platform } from '../entities/Platforms';
import { Level, T } from '../world/Level';
import type { World } from '../world/World';
import { LAYER_H, LAYER_W, backdrop } from './Backgrounds';
import { SpriteBank, drawText, textWidth, type Sprite } from './Sprites';

const SIGNS = [
  ['VOLT CAFE', 'OPEN 24/7', 'NOODLES', 'ARCADE', 'NEON', 'RIDE ON'],
  ['SHIFT 9', 'DANGER', 'OHM CO.', 'NO SLEEP', 'LINE 4'],
  ['ERR0R', 'NULL', '404', 'WHO?', 'REWIND'],
];

/**
 * Two stacked low-resolution canvases: `pix` holds crisp pixel art, `glow` holds light,
 * blurred and screen-blended by CSS so neon bleeds smoothly over the pixels.
 */
export class Renderer {
  readonly ctx: CanvasRenderingContext2D;
  readonly g: CanvasRenderingContext2D;
  readonly sprites = new SpriteBank();
  scale = 1;
  w = 480;
  h = VIEW_H;
  reducedMotion = false;
  private baked: { level: Level; tiles: HTMLCanvasElement; edges: HTMLCanvasElement } | null = null;
  private signs = new Map<string, HTMLCanvasElement>();
  private trail: Array<{ x: number; y: number; f: number }> = [];
  private readonly motes = Array.from({ length: 46 }, () => ({ x: Math.random() * 640, y: Math.random() * 420, s: Math.random(), c: Math.floor(Math.random() * 4) }));

  constructor(readonly pix: HTMLCanvasElement, readonly glow: HTMLCanvasElement) {
    this.ctx = pix.getContext('2d', { alpha: false })!;
    this.g = glow.getContext('2d')!;
    this.resize();
  }

  resize(): void {
    const ww = window.innerWidth;
    const wh = window.innerHeight;
    // Whole-number scaling keeps pixels square; small screens fall back to an exact fit.
    this.scale = wh >= 520 ? Math.max(1, Math.min(Math.round(wh / VIEW_H), Math.floor(ww / 400) || 1)) : Math.max(1, wh / 240);
    this.w = Math.ceil(ww / this.scale);
    this.h = Math.ceil(wh / this.scale);
    for (const c of [this.pix, this.glow]) {
      c.width = this.w;
      c.height = this.h;
      c.style.width = `${this.w * this.scale}px`;
      c.style.height = `${this.h * this.scale}px`;
    }
    this.glow.style.filter = `blur(${(this.scale * 2.2).toFixed(1)}px)`;
    this.ctx.imageSmoothingEnabled = false;
    this.g.imageSmoothingEnabled = false;
  }

  // ------------------------------------------------------------------ level bake

  private bake(level: Level): void {
    const theme = THEMES[level.def.world];
    const tiles = document.createElement('canvas');
    const edges = document.createElement('canvas');
    tiles.width = edges.width = level.pxW;
    tiles.height = edges.height = level.pxH;
    const c = tiles.getContext('2d')!;
    const e = edges.getContext('2d')!;
    for (let ty = 0; ty < level.h; ty++) {
      for (let tx = 0; tx < level.w; tx++) {
        const t = level.at(tx, ty);
        if (t === T.Ground || t === T.Block || t === T.OneWay || t === T.Spike) this.drawTile(c, e, level, theme, t, tx, ty, tx * TILE, ty * TILE);
      }
    }
    this.baked = { level, tiles, edges };
  }

  private solidish(level: Level, tx: number, ty: number): boolean {
    const t = level.at(tx, ty);
    return t === T.Ground || t === T.Block || t === T.Fake || t === T.Electric || t === T.ConvL || t === T.ConvR;
  }

  /** Draws one terrain tile. `e` receives its light (edges) for the glow layer. */
  private drawTile(c: CanvasRenderingContext2D, e: CanvasRenderingContext2D | null, level: Level, th: Theme, t: T, tx: number, ty: number, x: number, y: number): void {
    const world = level.def.world;
    const open = (dx: number, dy: number) => !this.solidish(level, tx + dx, ty + dy);
    if (t === T.Ground) {
      c.fillStyle = th.ground;
      c.fillRect(x, y, TILE, TILE);
      c.fillStyle = th.groundDark;
      if (world === 0) {
        // Brickwork.
        const off = ty % 2 ? 4 : 12;
        c.fillRect(x, y + 7, TILE, 1);
        c.fillRect(x, y + 15, TILE, 1);
        c.fillRect(x + off, y, 1, 7);
        c.fillRect(x + ((off + 8) % 16), y + 8, 1, 7);
      } else if (world === 1) {
        // Riveted plates.
        c.fillRect(x, y + 15, TILE, 1);
        c.fillRect(x + 15, y, 1, TILE);
        c.fillStyle = '#5a4a5e';
        c.fillRect(x + 2, y + 2, 1, 1);
        c.fillRect(x + 12, y + 2, 1, 1);
        c.fillRect(x + 2, y + 12, 1, 1);
        c.fillRect(x + 12, y + 12, 1, 1);
      } else {
        // Crystal facets.
        const h = (tx * 73856093) ^ (ty * 19349663);
        c.fillRect(x + (h & 7), y + ((h >> 3) & 7) + 4, 6, 1);
        c.fillRect(x + ((h >> 6) & 7) + 4, y + ((h >> 9) & 7), 1, 5);
      }
      if (open(0, -1)) {
        c.fillStyle = th.groundEdge;
        c.fillRect(x, y, TILE, 1);
        c.globalAlpha = 0.45;
        c.fillRect(x, y + 1, TILE, 2);
        c.globalAlpha = 1;
        if (e) {
          e.fillStyle = th.groundEdge;
          e.fillRect(x, y, TILE, 2);
        }
      }
      c.fillStyle = th.groundEdge;
      c.globalAlpha = 0.35;
      if (open(-1, 0)) c.fillRect(x, y, 1, TILE);
      if (open(1, 0)) c.fillRect(x + 15, y, 1, TILE);
      c.globalAlpha = 1;
      if (open(0, 1)) {
        c.fillStyle = th.groundDark;
        c.fillRect(x, y + 15, TILE, 1);
      }
    } else if (t === T.Block) {
      c.fillStyle = th.block;
      c.fillRect(x, y, TILE, TILE);
      c.fillStyle = th.blockEdge;
      c.globalAlpha = 0.85;
      c.fillRect(x, y, TILE, 1);
      c.fillRect(x, y, 1, TILE);
      c.globalAlpha = 0.45;
      c.fillRect(x, y + 15, TILE, 1);
      c.fillRect(x + 15, y, 1, TILE);
      c.globalAlpha = 0.3;
      if (world === 0) c.fillRect(x + 5, y + 5, 6, 6);
      else if (world === 1) {
        for (let i = 2; i < 14; i++) {
          c.fillRect(x + i, y + i, 1, 1);
          c.fillRect(x + 15 - i, y + i, 1, 1);
        }
      } else {
        c.fillRect(x + 2, y + 2, 6, 6);
        c.fillRect(x + 8, y + 8, 6, 6);
      }
      c.globalAlpha = 1;
      if (e && open(0, -1)) {
        e.fillStyle = th.blockEdge;
        e.fillRect(x, y, TILE, 1);
      }
    } else if (t === T.OneWay) {
      c.fillStyle = th.rail;
      c.fillRect(x, y, TILE, 1);
      c.fillStyle = th.ground;
      c.fillRect(x, y + 1, TILE, 3);
      c.fillStyle = th.groundDark;
      c.fillRect(x + 3, y + 4, 2, 3);
      c.fillRect(x + 11, y + 4, 2, 3);
      if (e) {
        e.fillStyle = th.rail;
        e.fillRect(x, y, TILE, 1);
      }
    } else if (t === T.Spike) {
      c.fillStyle = COLORS.danger;
      for (let i = 0; i < 4; i++) {
        c.beginPath();
        c.moveTo(x + i * 4, y + 16);
        c.lineTo(x + i * 4 + 2, y + 8);
        c.lineTo(x + i * 4 + 4, y + 16);
        c.fill();
      }
    }
  }

  // ------------------------------------------------------------------ frame

  render(world: World, now: number): void {
    const lv = world.level;
    if (!this.baked || this.baked.level !== lv) this.bake(lv);
    const th = THEMES[lv.def.world];
    const ctx = this.ctx;
    const g = this.g;
    const cam = world.camera;
    cam.w = this.w;
    cam.h = this.h;
    let sx = 0;
    let sy = 0;
    if (world.shake > 0 && !this.reducedMotion) {
      sx = (Math.random() - 0.5) * world.shake * 2;
      sy = (Math.random() - 0.5) * world.shake * 2;
    }
    const cx = Math.round(cam.x + sx);
    const cy = Math.round(cam.y + sy);

    this.drawBackdrop(world, cx, cy, now);
    g.globalCompositeOperation = 'source-over';
    g.clearRect(0, 0, this.w, this.h);
    g.globalCompositeOperation = 'lighter';

    ctx.save();
    ctx.translate(-cx, -cy);
    g.save();
    g.translate(-cx, -cy);

    this.drawDecor(world, th, now);
    // Static terrain: one blit per layer.
    const bx = Math.max(0, cx);
    const by = Math.max(0, cy);
    const bw = Math.min(lv.pxW - bx, this.w);
    const bh = Math.min(lv.pxH - by, this.h);
    if (bw > 0 && bh > 0) {
      ctx.drawImage(this.baked!.tiles, bx, by, bw, bh, bx, by, bw, bh);
      g.globalAlpha = 0.75;
      g.drawImage(this.baked!.edges, bx, by, bw, bh, bx, by, bw, bh);
      g.globalAlpha = 1;
    }
    this.drawDynamicTiles(world, th, cx, now);
    this.drawProps(world, th, now);
    for (const p of world.platforms) this.drawPlatform(p, world, th);
    this.drawPickups(world, now);
    this.drawEnemies(world);
    if (world.boss) this.drawBoss(world.boss, now);
    this.drawPlayer(world, now);
    this.drawHazards(world, th, now);
    this.drawProjectiles(world);
    this.drawPit(world, th, cx, now);
    this.drawParticles(world);

    ctx.restore();
    g.restore();
    this.drawMotes(th, cx, cy, now);
  }

  private drawBackdrop(world: World, cx: number, cy: number, now: number): void {
    const ctx = this.ctx;
    const bd = backdrop(world.level.def.world);
    const th = bd.theme;
    const grad = ctx.createLinearGradient(0, 0, 0, this.h);
    grad.addColorStop(0, th.skyTop);
    grad.addColorStop(1, th.skyBottom);
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, this.w, this.h);
    // How far the camera sits above the floor view; layers sink as you climb.
    const rise = Math.max(0, world.level.pxH - this.h - cy);
    const sxOff = -((cx * 0.02) % LAYER_W);
    for (let x = sxOff - LAYER_W; x < this.w; x += LAYER_W) ctx.drawImage(bd.stars, Math.round(x), Math.round(rise * 0.02));
    // A big low sun (city) / furnace glow (factory) / void eye (glitch), barely moving.
    const sunX = this.w * 0.68 - cx * 0.015;
    const sunY = this.h - 70 + rise * 0.05;
    const r = 46;
    const sg = ctx.createLinearGradient(0, sunY - r, 0, sunY + r);
    const sunCols = [['#ffe066', '#ff3bd4'], ['#ffb347', '#ff3355'], ['#7dff5c', '#32f6ff']][world.level.def.world];
    sg.addColorStop(0, sunCols[0]);
    sg.addColorStop(1, sunCols[1]);
    ctx.fillStyle = sg;
    ctx.globalAlpha = 0.85;
    ctx.beginPath();
    ctx.arc(Math.round(sunX), Math.round(sunY), r, Math.PI, 0);
    ctx.fill();
    ctx.globalAlpha = 1;
    ctx.fillStyle = th.skyBottom;
    for (let i = 0; i < 6; i++) ctx.fillRect(Math.round(sunX - r), Math.round(sunY - 30 + i * 6 + i * i * 0.4), r * 2, 1 + Math.floor(i / 2));
    this.g.fillStyle = sunCols[1];
    this.g.globalAlpha = 0.18;
    this.g.fillRect(Math.round(sunX - r * 1.3), Math.round(sunY - r * 1.2), r * 2.6, r * 1.3);
    this.g.globalAlpha = 1;
    for (const layer of bd.layers) {
      const drift = this.reducedMotion ? 0 : now * layer.drift;
      const off = -(((cx * layer.fx + drift) % LAYER_W) + LAYER_W) % LAYER_W;
      const y = Math.round(this.h - LAYER_H + rise * layer.fy + 24);
      for (let x = off; x < this.w; x += LAYER_W) ctx.drawImage(layer.canvas, Math.round(x), y);
    }
    // Haze where the skyline meets the street.
    const haze = ctx.createLinearGradient(0, this.h - 90 + rise * 0.3, 0, this.h);
    haze.addColorStop(0, 'rgba(0,0,0,0)');
    haze.addColorStop(1, th.fog + '33');
    ctx.fillStyle = haze;
    ctx.fillRect(0, 0, this.w, this.h);
  }

  private sign(text: string, color: string): HTMLCanvasElement {
    const key = text + color;
    let c = this.signs.get(key);
    if (!c) {
      c = document.createElement('canvas');
      c.width = textWidth(text) + 6;
      c.height = 11;
      const x = c.getContext('2d')!;
      x.fillStyle = '#0a0b1ecc';
      x.fillRect(0, 0, c.width, c.height);
      x.fillStyle = color;
      x.fillRect(0, 0, c.width, 1);
      x.fillRect(0, c.height - 1, c.width, 1);
      x.fillRect(0, 0, 1, c.height);
      x.fillRect(c.width - 1, 0, 1, c.height);
      drawText(x, text, 3, 3, color);
      this.signs.set(key, c);
    }
    return c;
  }

  private drawDecor(world: World, th: Theme, now: number): void {
    const ctx = this.ctx;
    const g = this.g;
    for (const d of world.decor) {
      if (d.ch === 'l') {
        ctx.fillStyle = th.groundDark;
        ctx.fillRect(d.x + 7, d.y - 18, 2, 34);
        ctx.fillRect(d.x + 4, d.y - 19, 8, 2);
        ctx.fillStyle = th.accent;
        ctx.fillRect(d.x + 3, d.y - 17, 4, 1);
        g.fillStyle = th.accent;
        g.globalAlpha = 0.5;
        g.fillRect(d.x - 2, d.y - 18, 14, 6);
        g.globalAlpha = 1;
      } else {
        const list = SIGNS[world.level.def.world];
        const text = list[(d.n + d.x) % list.length];
        const color = th.window[d.n % th.window.length];
        const s = this.sign(text, color);
        const flicker = (Math.sin(now * 13 + d.x) > 0.96 && !this.reducedMotion) ? 0.4 : 1;
        const x = d.x + 8 - Math.round(s.width / 2);
        const y = d.y - 26;
        ctx.globalAlpha = flicker;
        ctx.drawImage(s, x, y);
        ctx.globalAlpha = 1;
        ctx.fillStyle = th.groundDark;
        ctx.fillRect(d.x + 7, y + 11, 1, 31);
        g.globalAlpha = 0.6 * flicker;
        g.drawImage(s, x, y);
        g.globalAlpha = 1;
      }
    }
  }

  private drawDynamicTiles(world: World, th: Theme, cx: number, now: number): void {
    const lv = world.level;
    const ctx = this.ctx;
    const g = this.g;
    const minX = Math.floor(cx / TILE) - 1;
    const maxX = Math.ceil((cx + this.w) / TILE) + 1;
    for (const i of lv.dynamicTiles) {
      const tx = i % lv.w;
      if (tx < minX || tx > maxX) continue;
      const ty = Math.floor(i / lv.w);
      const x = tx * TILE;
      const y = ty * TILE;
      const t = lv.tiles[i] as T;
      switch (t) {
        case T.Prize: {
          const bob = Math.sin(now * 4 + tx) > 0.6 ? 1 : 0;
          ctx.fillStyle = '#3a2208';
          ctx.fillRect(x, y, TILE, TILE);
          ctx.fillStyle = COLORS.volt;
          ctx.fillRect(x, y, TILE, 1);
          ctx.fillRect(x, y, 1, TILE);
          ctx.fillRect(x + 15, y, 1, TILE);
          ctx.fillRect(x, y + 15, TILE, 1);
          ctx.fillRect(x + 1, y + 1, 1, 1);
          ctx.fillRect(x + 14, y + 1, 1, 1);
          ctx.fillRect(x + 1, y + 14, 1, 1);
          ctx.fillRect(x + 14, y + 14, 1, 1);
          drawText(ctx, '?', x + 5 + 1, y + 5 - bob, COLORS.voltCore, 1);
          drawText(ctx, '?', x + 5, y + 5 - bob, COLORS.volt, 1);
          g.fillStyle = COLORS.volt;
          g.globalAlpha = 0.5 + 0.2 * Math.sin(now * 4 + tx);
          g.fillRect(x + 2, y + 2, 12, 12);
          g.globalAlpha = 1;
          break;
        }
        case T.Used:
          ctx.fillStyle = '#1a1424';
          ctx.fillRect(x, y, TILE, TILE);
          ctx.fillStyle = '#4a3a5a';
          ctx.fillRect(x, y, TILE, 1);
          ctx.fillRect(x, y, 1, TILE);
          ctx.fillRect(x + 15, y, 1, TILE);
          ctx.fillRect(x, y + 15, TILE, 1);
          break;
        case T.ConvL:
        case T.ConvR: {
          ctx.fillStyle = th.ground;
          ctx.fillRect(x, y, TILE, TILE);
          ctx.fillStyle = '#111';
          ctx.fillRect(x, y, TILE, 4);
          const dir = t === T.ConvR ? 1 : -1;
          const off = ((now * 62 * dir) % 8 + 8) % 8;
          ctx.fillStyle = th.groundEdge;
          for (let k = -8; k < 16; k += 8) {
            const ax = x + k + off;
            if (ax < x - 2 || ax > x + 14) continue;
            const tip = dir > 0 ? 2 : 0;
            ctx.fillRect(Math.max(x, ax + tip), y + 1, 1, 1);
            ctx.fillRect(Math.max(x, ax + 1), y + 2, 1, 1);
            ctx.fillRect(Math.max(x, ax + 2 - tip), y + 3, 1, 1);
          }
          g.fillStyle = th.groundEdge;
          g.globalAlpha = 0.5;
          g.fillRect(x, y, TILE, 2);
          g.globalAlpha = 1;
          break;
        }
        case T.Electric: {
          const stage = world.electricStage(tx);
          ctx.fillStyle = '#1c2236';
          ctx.fillRect(x, y, TILE, TILE);
          ctx.fillStyle = '#3a4466';
          ctx.fillRect(x, y + 4, TILE, 1);
          ctx.fillRect(x, y + 10, TILE, 1);
          const col = stage === 'live' ? '#d8feff' : stage === 'warn' ? '#32f6ff' : '#2a6a80';
          ctx.fillStyle = col;
          ctx.fillRect(x, y, TILE, 2);
          if (stage !== 'off') {
            const n = stage === 'live' ? 4 : 1;
            for (let k = 0; k < n; k++) {
              const bx = x + ((Math.floor(now * 30) * 7 + k * 5 + tx * 3) % 15);
              ctx.fillRect(bx, y - 1 - (k % 3), 1, 2 + (k % 3));
            }
          }
          g.fillStyle = '#32f6ff';
          g.globalAlpha = stage === 'live' ? 1 : stage === 'warn' ? 0.35 + 0.3 * Math.sin(now * 40) : 0.1;
          g.fillRect(x, y - (stage === 'live' ? 6 : 1), TILE, stage === 'live' ? 8 : 3);
          g.globalAlpha = 1;
          break;
        }
        case T.Fake: {
          const group = lv.fakeGroup.get(i)!;
          const at = world.revealed.get(group);
          const alpha = at === undefined ? 1 : Math.max(0.22, 1 - (world.time - at) * 2);
          ctx.globalAlpha = alpha;
          const ground = [[-1, 0], [1, 0], [0, -1], [0, 1]].some(([dx, dy]) => lv.at(tx + dx, ty + dy) === T.Ground);
          this.drawTile(ctx, null, lv, th, ground ? T.Ground : T.Block, tx, ty, x, y);
          ctx.globalAlpha = 1;
          break;
        }
        case T.Door: {
          if (!world.doorClosed) break;
          ctx.fillStyle = '#1d1440';
          ctx.fillRect(x + 4, y, 8, TILE);
          ctx.fillStyle = '#c85cff';
          const shift = Math.floor(now * 20) % 4;
          for (let k = 0; k < TILE; k += 4) ctx.fillRect(x + 4 + ((k / 4 + shift) % 2) * 6, y + k, 2, 2);
          g.fillStyle = '#c85cff';
          g.globalAlpha = 0.6;
          g.fillRect(x + 3, y, 10, TILE);
          g.globalAlpha = 1;
          break;
        }
      }
    }
  }

  private drawProps(world: World, th: Theme, now: number): void {
    const ctx = this.ctx;
    const g = this.g;
    const P = this.sprites.props;
    for (const cp of world.checkpoints) {
      const baseY = cp.y + cp.h;
      ctx.fillStyle = '#3a3f7a';
      ctx.fillRect(cp.x + 7, cp.y + 4, 2, cp.h - 4);
      ctx.fillRect(cp.x + 4, baseY - 2, 8, 2);
      const col = cp.active ? '#7dff5c' : '#ff3355';
      ctx.fillStyle = col;
      ctx.fillRect(cp.x + 5, cp.y, 6, 5);
      if (cp.active) {
        const wave = Math.floor(now * 6) % 2;
        ctx.fillRect(cp.x + 9, cp.y + 6, 7, 4);
        ctx.fillRect(cp.x + 16, cp.y + 7 + wave, 2, 3);
      }
      g.fillStyle = col;
      g.globalAlpha = cp.active ? 0.9 : 0.45;
      g.fillRect(cp.x + 2, cp.y - 3, 12, 11);
      g.globalAlpha = 1;
    }
    for (const s of world.springs) {
      const k = 1 - s.squash * 0.45;
      ctx.drawImage(P.spring, s.x, s.y + s.h * (1 - k), s.w, s.h * k);
      g.fillStyle = '#32f6ff';
      g.globalAlpha = 0.5;
      g.fillRect(s.x, s.y + s.h * (1 - k), s.w, 2);
      g.globalAlpha = 1;
    }
    world.terminals.forEach((t, i) => {
      ctx.drawImage(P.terminal, t.x, t.y + TILE - 14);
      g.fillStyle = '#7dff5c';
      g.globalAlpha = t.read ? 0.35 : 0.6 + 0.3 * Math.sin(now * 5);
      g.fillRect(t.x + 3, t.y + 3, 10, 6);
      g.globalAlpha = 1;
      if (world.nearTerminal === i || !t.read) {
        const bob = Math.round(Math.sin(now * 5) * 1.5);
        const label = world.nearTerminal === i ? 'E' : '!';
        ctx.fillStyle = '#0a0b1e';
        ctx.fillRect(t.x + 4, t.y - 12 + bob, 9, 9);
        ctx.fillStyle = '#7dff5c';
        ctx.fillRect(t.x + 4, t.y - 12 + bob, 9, 1);
        ctx.fillRect(t.x + 4, t.y - 4 + bob, 9, 1);
        drawText(ctx, label, t.x + 7, t.y - 10 + bob, '#7dff5c');
      }
    });
    if (world.gate) {
      const { x, y } = world.gate;
      const won = world.finished;
      ctx.fillStyle = '#0a0b1e';
      ctx.fillRect(x - 4, y - 4, 4, 52);
      ctx.fillRect(x + 16, y - 4, 4, 52);
      ctx.fillRect(x - 4, y - 6, 24, 4);
      ctx.fillStyle = th.groundEdge;
      ctx.fillRect(x - 3, y - 3, 2, 51);
      ctx.fillRect(x + 17, y - 3, 2, 51);
      ctx.fillStyle = COLORS.shard;
      ctx.fillRect(x - 4, y - 6, 24, 1);
      // Swirling portal.
      for (let k = 0; k < 12; k++) {
        const a = now * (won ? 9 : 3) + k * 0.52;
        const px = x + 8 + Math.cos(a) * 6;
        const py = y + 24 + Math.sin(a * 1.3) * 20;
        ctx.fillStyle = k % 2 ? '#32f6ff' : '#ff3bd4';
        ctx.fillRect(Math.round(px), Math.round(py), 1, 2);
      }
      g.fillStyle = '#ff3bd4';
      g.globalAlpha = won ? 1 : 0.55;
      g.fillRect(x - 2, y - 2, 20, 50);
      g.fillStyle = '#32f6ff';
      g.fillRect(x + 3, y + 4, 10, 40);
      g.globalAlpha = 1;
      // The fragment hovers in the gate until claimed.
      if (!won) {
        const bob = Math.sin(now * 3) * 2;
        ctx.drawImage(P.overdrive, x + 2, Math.round(y - 20 + bob));
      }
    }
  }

  private drawPlatform(p: Platform, world: World, th: Theme): void {
    const ctx = this.ctx;
    const g = this.g;
    const x = Math.round(p.x);
    const y = Math.round(p.y);
    switch (p.kind) {
      case 'slide':
      case 'lift':
        ctx.fillStyle = th.groundDark;
        ctx.fillRect(x, y, p.w, p.h);
        ctx.fillStyle = th.rail;
        ctx.fillRect(x, y, p.w, 1);
        ctx.fillStyle = th.accent;
        for (let k = 3; k < p.w - 2; k += 6) ctx.fillRect(x + k, y + 4, 2, 2);
        g.fillStyle = th.rail;
        g.globalAlpha = 0.8;
        g.fillRect(x, y, p.w, 2);
        g.globalAlpha = 0.35;
        g.fillRect(x + 4, y + p.h, p.w - 8, 4);
        g.globalAlpha = 1;
        break;
      case 'crumble': {
        if (p.state === 'gone') break;
        const shake = p.state === 'shake' && !this.reducedMotion ? Math.round(Math.sin(p.t * 80)) : 0;
        ctx.globalAlpha = p.state === 'fall' ? Math.max(0, 1 - p.t) : 1;
        ctx.fillStyle = '#4a3428';
        ctx.fillRect(x + shake, y, TILE, TILE);
        ctx.fillStyle = '#ffb347';
        ctx.fillRect(x + shake, y, TILE, 1);
        ctx.fillStyle = '#2a1a14';
        ctx.fillRect(x + shake + 4, y + 2, 1, 6);
        ctx.fillRect(x + shake + 5, y + 7, 5, 1);
        ctx.fillRect(x + shake + 10, y + 8, 1, 6);
        ctx.globalAlpha = 1;
        break;
      }
      case 'glitch': {
        if (p.state === 'gone') {
          ctx.fillStyle = '#c85cff';
          ctx.globalAlpha = 0.25;
          for (let k = 0; k < TILE; k += 3) {
            ctx.fillRect(x + k, y, 1, 1);
            ctx.fillRect(x + k, y + 15, 1, 1);
          }
          ctx.globalAlpha = 1;
          break;
        }
        const jitter = p.state === 'shake' ? (Math.floor(p.t * 30) % 2 ? 2 : -2) : 0;
        ctx.fillStyle = '#1d1440';
        ctx.fillRect(x, y, TILE, TILE);
        ctx.fillStyle = '#c85cff';
        ctx.fillRect(x + jitter, y, TILE, 1);
        ctx.fillRect(x, y + 15, TILE, 1);
        ctx.fillStyle = '#7dff5c';
        ctx.fillRect(x + 3 - jitter, y + 5, 10, 1);
        ctx.fillRect(x + 3 + jitter, y + 9, 6, 1);
        g.fillStyle = '#c85cff';
        g.globalAlpha = p.state === 'shake' ? 0.9 : 0.4;
        g.fillRect(x, y, TILE, 2);
        g.globalAlpha = 1;
        break;
      }
      case 'timedA':
      case 'timedB': {
        const col = p.kind === 'timedA' ? '#32f6ff' : '#ff3bd4';
        const left = TIMED_PERIOD - (world.time % TIMED_PERIOD);
        if (p.solid) {
          const blink = left < 0.5 && Math.floor(left * 12) % 2 === 0;
          ctx.fillStyle = blink ? '#0a0b1e' : col + '55';
          ctx.fillRect(x, y, TILE, TILE);
          ctx.fillStyle = col;
          ctx.fillRect(x, y, TILE, 1);
          ctx.fillRect(x, y + 15, TILE, 1);
          ctx.fillRect(x, y, 1, TILE);
          ctx.fillRect(x + 15, y, 1, TILE);
          ctx.fillRect(x + 6, y + 6, 4, 4);
          g.fillStyle = col;
          g.globalAlpha = 0.55;
          g.fillRect(x, y, TILE, TILE);
          g.globalAlpha = 1;
        } else {
          ctx.fillStyle = col;
          ctx.globalAlpha = 0.45;
          for (let k = 0; k < TILE; k += 4) {
            ctx.fillRect(x + k, y, 2, 1);
            ctx.fillRect(x + k, y + 15, 2, 1);
            ctx.fillRect(x, y + k, 1, 2);
            ctx.fillRect(x + 15, y + k, 1, 2);
          }
          ctx.globalAlpha = 1;
        }
        break;
      }
      case 'crusher': {
        const shake = p.state === 'shake' && !this.reducedMotion ? Math.round(Math.sin(p.t * 90)) : 0;
        // Chain to the ceiling.
        ctx.fillStyle = '#3a2a2a';
        for (let cy = p.y0 - 8; cy < y; cy += 4) ctx.fillRect(x + p.w / 2 - 1, cy, 2, 3);
        ctx.fillStyle = '#3a3044';
        ctx.fillRect(x + shake, y, p.w, p.h - 4);
        ctx.fillStyle = '#ffb347';
        for (let k = 0; k < p.w; k += 6) ctx.fillRect(x + shake + k, y + 3, 3, 3);
        ctx.fillStyle = '#6b5a7a';
        ctx.fillRect(x + shake, y, p.w, 1);
        // Teeth.
        ctx.fillStyle = '#c0b4d0';
        for (let k = 0; k < p.w; k += 4) ctx.fillRect(x + shake + k + 1, y + p.h - 4, 2, 4);
        const danger = p.state === 'shake' || p.state === 'fall';
        g.fillStyle = danger ? '#ff3355' : '#ffb347';
        g.globalAlpha = danger ? 0.9 : 0.25;
        g.fillRect(x, y + p.h - 4, p.w, 5);
        g.globalAlpha = 1;
        break;
      }
    }
  }

  private drawPickups(world: World, now: number): void {
    const ctx = this.ctx;
    const g = this.g;
    const P = this.sprites.props;
    const cam = world.camera;
    for (const k of world.pickups) {
      if (k.taken || k.x + 16 < cam.x || k.x > cam.x + this.w) continue;
      const bob = k.kind === 'volt' ? 0 : Math.round(Math.sin(k.t * 3) * 1.5);
      const y = Math.round(k.y + bob + k.emerge * TILE);
      const x = Math.round(k.x);
      let col = '#ffb347';
      if (k.kind === 'volt') {
        const f = [0, 1, 2, 1][Math.floor(k.t * 8) % 4];
        ctx.drawImage(P.volt[f], x, y);
      } else {
        const spr: Sprite = P[k.kind];
        ctx.drawImage(spr, x, y);
        col = { shard: COLORS.shard, token: COLORS.token, repair: '#7dff5c', shield: COLORS.shield, overdrive: COLORS.overdrive }[k.kind];
      }
      g.fillStyle = col;
      g.globalAlpha = k.kind === 'volt' ? 0.55 : 0.75 + 0.25 * Math.sin(now * 4);
      const pad = k.kind === 'volt' ? 1 : 2;
      g.fillRect(x - pad, y - pad, k.w + pad * 2, k.h + pad * 2);
      g.globalAlpha = 1;
    }
  }

  private drawEnemies(world: World): void {
    const ctx = this.ctx;
    const g = this.g;
    const E = this.sprites.enemy;
    const cam = world.camera;
    for (const e of world.enemies) {
      if (e.x + 20 < cam.x || e.x - 20 > cam.x + this.w) continue;
      if (!e.alive && e.deadTime > 0.35) continue;
      let spr: Sprite;
      let sy = 1;
      let sx = 1;
      let glow = '#3dffb0';
      switch (e.kind) {
        case 'slime':
          spr = E.slime;
          sy = 1 + Math.sin(e.t * 8) * 0.08;
          sx = 2 - sy;
          break;
        case 'drone':
        case 'droneV':
          spr = E.drone[Math.floor(e.t * 20) % 2];
          glow = '#ff3bd4';
          break;
        case 'hopper':
          spr = E.hopper[e.onGround && (e.charge > 0 || Math.sin(e.t * 3) > 0.7) ? 1 : 0];
          glow = '#c8ff3d';
          break;
        case 'turret':
          spr = E.turret;
          glow = '#ffb347';
          break;
        case 'phantom':
          spr = E.phantom;
          glow = '#c85cff';
          break;
        default:
          spr = E.spiker;
          glow = '#ff3355';
      }
      if (!e.alive) {
        sy = Math.max(0.15, 1 - e.deadTime * 3);
        sx = 1 + (1 - sy) * 0.6;
        ctx.globalAlpha = 1 - e.deadTime / 0.35;
      }
      const alpha = e.kind === 'phantom' ? e.phantomAlpha : 1;
      ctx.globalAlpha *= alpha;
      const fx = e.x + e.w / 2;
      const fy = e.y + e.h;
      ctx.save();
      ctx.translate(Math.round(fx), Math.round(fy));
      ctx.scale(-e.face * sx, sy);
      ctx.drawImage(spr, -8, -spr.height + (e.kind === 'drone' || e.kind === 'droneV' ? 0 : 0));
      ctx.restore();
      ctx.globalAlpha = 1;
      // Telegraphs.
      if (e.kind === 'turret' && e.alive && e.charge > 0) {
        const bx = e.face > 0 ? e.x + e.w + 1 : e.x - 3;
        const r = 1 + e.charge * 3;
        ctx.fillStyle = '#ffe066';
        ctx.fillRect(Math.round(bx - r / 2), Math.round(e.y + 7 - r / 2), Math.ceil(r), Math.ceil(r));
        g.fillStyle = '#ffb347';
        g.fillRect(Math.round(bx - r * 1.5), Math.round(e.y + 7 - r * 1.5), Math.ceil(r * 3), Math.ceil(r * 3));
      }
      if (e.alive) {
        g.fillStyle = glow;
        g.globalAlpha = 0.35 * alpha;
        g.fillRect(Math.round(e.x - 1), Math.round(e.y - 1), e.w + 2, e.h + 2);
        g.globalAlpha = 1;
      }
    }
  }

  private drawBoss(b: Boss, now: number): void {
    if (b.state === 'wait' || b.state === 'dead') return;
    const ctx = this.ctx;
    const g = this.g;
    const jitter = (b.state === 'shake' || b.state === 'dying') && !this.reducedMotion ? Math.round(Math.sin(now * 70) * 1.5) : 0;
    const x = Math.round(b.x) + jitter;
    const y = Math.round(b.y);
    const flash = b.flash > 0 && Math.floor(b.flash * 20) % 2 === 0;
    // Slam warning on the floor.
    if (b.state === 'shake' || b.state === 'aim') {
      ctx.fillStyle = '#ff3355';
      ctx.globalAlpha = 0.35 + 0.4 * b.charge;
      ctx.fillRect(x + 4, b.floorY - 2, b.w - 8, 2);
      ctx.globalAlpha = 1;
      g.fillStyle = '#ff3355';
      g.globalAlpha = 0.6 * (0.5 + b.charge);
      g.fillRect(x, b.floorY - 6, b.w, 6);
      g.globalAlpha = 1;
    }
    for (const rx of b.rainX) {
      ctx.fillStyle = '#7dff5c';
      ctx.globalAlpha = 0.25 + 0.5 * b.charge;
      for (let ry = b.ceilY; ry < b.floorY; ry += 6) ctx.fillRect(Math.round(rx), ry, 1, 3);
      ctx.globalAlpha = 1;
      g.fillStyle = '#7dff5c';
      g.globalAlpha = 0.5 * b.charge;
      g.fillRect(Math.round(rx) - 2, b.ceilY, 5, 8);
      g.globalAlpha = 1;
    }
    const body = flash ? '#ffffff' : '#241a4a';
    const rim = flash ? '#ffffff' : '#c85cff';
    // Crown antennae.
    ctx.fillStyle = rim;
    for (const ax of [6, 14, 22, 30, 38]) {
      const h = ax === 22 ? 10 : ax === 14 || ax === 30 ? 7 : 5;
      ctx.fillRect(x + ax - 1, y - h, 2, h);
      ctx.fillRect(x + ax - 2, y - h - 2, 4, 2);
    }
    // Head.
    ctx.fillStyle = '#0a0b1e';
    ctx.fillRect(x - 1, y - 1, b.w + 2, b.h + 2);
    ctx.fillStyle = body;
    ctx.fillRect(x, y, b.w, b.h);
    ctx.fillStyle = rim;
    ctx.fillRect(x, y, b.w, 1);
    ctx.fillRect(x, y + b.h - 1, b.w, 1);
    ctx.fillRect(x, y, 1, b.h);
    ctx.fillRect(x + b.w - 1, y, 1, b.h);
    // Screen with static and eyes.
    const sxp = x + 5;
    const syp = y + 8;
    ctx.fillStyle = '#05060f';
    ctx.fillRect(sxp, syp, b.w - 10, b.h - 14);
    const seed = Math.floor(now * 24);
    ctx.fillStyle = '#7dff5c';
    for (let k = 0; k < 14; k++) {
      const n = (seed * 31 + k * 97) % 997;
      ctx.globalAlpha = 0.25;
      ctx.fillRect(sxp + (n % (b.w - 12)), syp + ((n >> 3) % (b.h - 15)), 2, 1);
    }
    ctx.globalAlpha = 1;
    const dazed = b.state === 'dazed';
    const eye = dazed ? '#ffe066' : b.charge > 0.5 ? '#ff3355' : '#7dff5c';
    ctx.fillStyle = eye;
    if (dazed) {
      // Spiral eyes.
      for (const ex of [sxp + 7, sxp + 22]) {
        ctx.fillRect(ex, syp + 6, 6, 1);
        ctx.fillRect(ex + 5, syp + 6, 1, 5);
        ctx.fillRect(ex, syp + 10, 6, 1);
        ctx.fillRect(ex, syp + 8, 1, 3);
      }
    } else {
      ctx.fillRect(sxp + 6, syp + 6, 7, 4);
      ctx.fillRect(sxp + 21, syp + 6, 7, 4);
      ctx.fillRect(sxp + 10, syp + 15, 14, 2);
    }
    // The core on top: shielded unless dazed.
    const coreX = x + b.w / 2 - 5;
    if (dazed) {
      const pulse = 0.6 + 0.4 * Math.sin(now * 14);
      ctx.fillStyle = '#ff3bd4';
      ctx.fillRect(coreX, y - 3, 10, 5);
      ctx.fillStyle = '#ffd6f6';
      ctx.fillRect(coreX + 3, y - 2, 4, 2);
      g.fillStyle = '#ff3bd4';
      g.globalAlpha = pulse;
      g.fillRect(coreX - 6, y - 10, 22, 14);
      g.globalAlpha = 1;
      // A bouncing arrow saying "here".
      const bob = Math.round(Math.sin(now * 8) * 2);
      ctx.fillStyle = '#ffe066';
      ctx.fillRect(coreX + 4, y - 18 + bob, 2, 5);
      ctx.fillRect(coreX + 2, y - 14 + bob, 6, 1);
      ctx.fillRect(coreX + 3, y - 13 + bob, 4, 1);
    } else {
      ctx.fillStyle = '#6b5a7a';
      ctx.fillRect(coreX - 1, y - 2, 12, 3);
    }
    // Volley charge.
    if (b.state === 'volley' || b.state === 'summon' || b.state === 'rain') {
      const r = 2 + b.charge * 6;
      g.fillStyle = b.state === 'summon' ? '#c85cff' : '#7dff5c';
      g.fillRect(Math.round(b.cx - r), Math.round(y + b.h - r), Math.round(r * 2), Math.round(r * 2));
    }
    g.fillStyle = flash ? '#ffffff' : '#c85cff';
    g.globalAlpha = 0.5;
    g.fillRect(x - 2, y - 2, b.w + 4, b.h + 4);
    g.globalAlpha = 1;
  }

  private drawPlayer(world: World, now: number): void {
    const p = world.player;
    const ctx = this.ctx;
    const g = this.g;
    const V = this.sprites.vee;
    // Overdrive afterimages.
    if (p.overdrive > 0 && !p.dead && Math.abs(p.vx) > 40) {
      this.trail.push({ x: p.cx, y: p.bottom, f: p.face });
      if (this.trail.length > 6) this.trail.shift();
    } else if (this.trail.length) this.trail.shift();
    if (p.dead) return;
    let spr: Sprite;
    switch (p.pose) {
      case 'run':
        spr = V.run[Math.floor(p.anim * (8 + Math.abs(p.vx) / 25)) % 4];
        break;
      case 'rise':
        spr = V.rise;
        break;
      case 'fall':
        spr = V.fall;
        break;
      case 'hurt':
        spr = V.hurt;
        break;
      case 'win':
        spr = V.rise;
        break;
      default:
        spr = V.idle[Math.floor(now * 2) % 2];
    }
    this.trail.forEach((t, i) => {
      ctx.globalAlpha = (i + 1) / (this.trail.length + 1) * 0.35;
      ctx.save();
      ctx.translate(Math.round(t.x), Math.round(t.y));
      ctx.scale(t.f, 1);
      ctx.drawImage(spr, -8, -18);
      ctx.restore();
    });
    ctx.globalAlpha = 1;
    const blink = p.invuln > 0 && p.shield <= 0 && Math.floor(now * 14) % 2 === 0;
    if (!blink) {
      ctx.save();
      ctx.translate(Math.round(p.cx), Math.round(p.bottom));
      ctx.scale(p.face * p.sx, p.sy);
      ctx.drawImage(spr, -8, -18);
      ctx.restore();
    }
    const vx = Math.round(p.cx + p.face * 2);
    const vy = Math.round(p.y - 0);
    g.fillStyle = COLORS.hero;
    g.globalAlpha = 0.65;
    g.fillRect(vx - 4, vy - 1, 8, 4);
    g.globalAlpha = 1;
    if (p.overdrive > 0) {
      const fading = p.overdrive < 2 && Math.floor(now * 10) % 2 === 0;
      g.fillStyle = COLORS.overdrive;
      g.globalAlpha = fading ? 0.2 : 0.55;
      g.fillRect(Math.round(p.x - 3), Math.round(p.y - 4), p.w + 6, PLAYER_H + 6);
      g.globalAlpha = 1;
    }
    if (p.shield > 0) {
      const fading = p.shield < 3 && Math.floor(now * 10) % 2 === 0;
      const r = 12;
      const cx = Math.round(p.cx);
      const cy = Math.round(p.y + 6);
      ctx.fillStyle = COLORS.shield;
      ctx.globalAlpha = fading ? 0.3 : 0.8;
      for (let k = 0; k < 20; k++) {
        const a = (k / 20) * Math.PI * 2 + now * 2;
        ctx.fillRect(Math.round(cx + Math.cos(a) * r), Math.round(cy + Math.sin(a) * r), 1, 1);
      }
      ctx.globalAlpha = 1;
      g.strokeStyle = COLORS.shield;
      g.globalAlpha = fading ? 0.25 : 0.6;
      g.lineWidth = 2;
      g.beginPath();
      g.arc(cx, cy, r, 0, Math.PI * 2);
      g.stroke();
      g.globalAlpha = 1;
    }
  }

  private drawHazards(world: World, th: Theme, now: number): void {
    const ctx = this.ctx;
    const g = this.g;
    for (const l of world.lasers) {
      ctx.fillStyle = '#3a3044';
      ctx.fillRect(l.x - 5, l.y - 10, 10, 8);
      ctx.fillStyle = '#ff3355';
      ctx.fillRect(l.x - 2, l.y - 3, 4, 2);
      const stage = l.stage;
      const len = l.y2 - l.y;
      if (stage === 'warn') {
        if (Math.floor(now * 24) % 2 === 0) {
          ctx.fillStyle = '#ff3355';
          ctx.globalAlpha = 0.5;
          ctx.fillRect(l.x, l.y, 1, len);
          ctx.globalAlpha = 1;
        }
        g.fillStyle = '#ff3355';
        g.globalAlpha = 0.5;
        g.fillRect(l.x - 3, l.y - 4, 6, 6);
        g.globalAlpha = 1;
      } else if (stage === 'on') {
        ctx.fillStyle = '#ff3355';
        ctx.fillRect(l.x - 2, l.y, 4, len);
        ctx.fillStyle = '#ffd0d8';
        ctx.fillRect(l.x - 1 + (Math.floor(now * 30) % 2), l.y, 1, len);
        g.fillStyle = '#ff3355';
        g.fillRect(l.x - 4, l.y, 8, len);
      }
    }
    for (const s of world.sweeps) {
      const x = Math.round(s.x);
      ctx.fillStyle = '#3a3044';
      ctx.fillRect(x - 6, s.y - 9, 12, 7);
      ctx.fillStyle = '#7dff5c';
      ctx.fillRect(x - 6, s.y - 9, 12, 1);
      ctx.fillStyle = '#c8ff3d';
      ctx.fillRect(x - 1, s.y, 2, s.len);
      ctx.fillStyle = '#f3ffe0';
      ctx.fillRect(x, s.y, 1, s.len);
      g.fillStyle = '#7dff5c';
      g.fillRect(x - 3, s.y, 6, s.len);
    }
    for (const r of world.rotors) {
      ctx.fillStyle = '#3a3044';
      ctx.fillRect(r.cx - 3, r.cy - 3, 6, 6);
      ctx.fillStyle = th.accent;
      ctx.fillRect(r.cx - 1, r.cy - 1, 2, 2);
      r.orbs((x, y) => {
        ctx.fillStyle = '#ff6a2b';
        ctx.fillRect(Math.round(x) - 4, Math.round(y) - 4, 8, 8);
        ctx.fillStyle = '#ffe066';
        ctx.fillRect(Math.round(x) - 2, Math.round(y) - 2, 4, 4);
        g.fillStyle = '#ff6a2b';
        g.fillRect(Math.round(x) - 6, Math.round(y) - 6, 12, 12);
      });
    }
  }

  private drawProjectiles(world: World): void {
    const ctx = this.ctx;
    const g = this.g;
    for (const q of world.projectiles) {
      if (!q.active) continue;
      const x = Math.round(q.x);
      const y = Math.round(q.y);
      const col = q.kind === 'bolt' ? '#ffb347' : '#7dff5c';
      ctx.fillStyle = col;
      if (q.kind === 'wave') {
        ctx.fillRect(x, y + 4, q.w, 6);
        ctx.fillStyle = '#f3ffe0';
        ctx.fillRect(x + 2, y + 2, q.w - 4, 2);
        ctx.fillRect(x + 4, y, q.w - 8, 2);
      } else if (q.kind === 'rain') {
        ctx.fillRect(x + 1, y, 3, q.h);
        ctx.fillStyle = '#f3ffe0';
        ctx.fillRect(x + 2, y + q.h - 4, 1, 4);
      } else {
        ctx.fillRect(x, y, q.w, q.h);
        ctx.fillStyle = '#fff3c4';
        ctx.fillRect(x + 2, y + 2, 2, 2);
      }
      g.fillStyle = col;
      g.fillRect(x - 3, y - 3, q.w + 6, q.h + 6);
    }
  }

  private drawPit(world: World, th: Theme, cx: number, now: number): void {
    const lv = world.level;
    const y = lv.pxH - 5;
    const ctx = this.ctx;
    const g = this.g;
    ctx.fillStyle = th.pit;
    ctx.globalAlpha = 0.85;
    const t = this.reducedMotion ? 0 : now;
    // Only where the floor is open: the energy shows through the gaps.
    const open = (x: number) => !this.solidish(lv, Math.floor(x / TILE), lv.h - 1);
    for (let x = Math.floor(cx / 4) * 4; x < cx + this.w; x += 4) {
      if (!open(x)) continue;
      const wave = Math.round(Math.sin(x * 0.08 + t * 3) * 1.5 + Math.sin(x * 0.03 - t * 2));
      ctx.fillRect(x, y + wave, 4, lv.pxH - y + 40);
    }
    ctx.globalAlpha = 1;
    g.fillStyle = th.pit;
    for (let x = Math.floor(cx / TILE) * TILE; x < cx + this.w; x += TILE) {
      if (!open(x)) continue;
      g.globalAlpha = 0.8;
      g.fillRect(x, y - 4, TILE, 40);
      g.globalAlpha = 0.3;
      g.fillRect(x, y - 30, TILE, 26);
    }
    g.globalAlpha = 1;
  }

  private drawParticles(world: World): void {
    const ctx = this.ctx;
    const g = this.g;
    for (const p of world.fx.list) {
      if (p.life <= 0) continue;
      const a = Math.min(1, (p.life / p.max) * 1.6);
      ctx.globalAlpha = a;
      ctx.fillStyle = p.color;
      ctx.fillRect(Math.round(p.x), Math.round(p.y), p.size, p.size);
      if (p.glow) {
        g.globalAlpha = a * 0.8;
        g.fillStyle = p.color;
        g.fillRect(Math.round(p.x) - 1, Math.round(p.y) - 1, p.size + 2, p.size + 2);
      }
    }
    ctx.globalAlpha = 1;
    g.globalAlpha = 1;
    for (const t of world.fx.texts) {
      const w = textWidth(t.text);
      ctx.globalAlpha = Math.min(1, t.life * 2);
      drawText(ctx, t.text, Math.round(t.x - w / 2) + 1, Math.round(t.y) + 1, '#0a0b1e');
      drawText(ctx, t.text, Math.round(t.x - w / 2), Math.round(t.y), t.color);
    }
    ctx.globalAlpha = 1;
  }

  /** Drifting energy motes in front of everything, very faint. */
  private drawMotes(th: Theme, cx: number, cy: number, now: number): void {
    const g = this.g;
    const t = this.reducedMotion ? 0 : now;
    const W = this.w + 40;
    const H = this.h + 40;
    for (const m of this.motes) {
      const x = ((((m.x - cx * (0.6 + m.s * 0.5) + Math.sin(t * 0.5 + m.y) * 10) % W) + W) % W) - 20;
      const y = ((((m.y - cy * 0.5 - t * (4 + m.s * 8)) % H) + H) % H) - 20;
      g.fillStyle = th.window[m.c];
      g.globalAlpha = 0.35 + m.s * 0.4;
      g.fillRect(Math.round(x), Math.round(y), 2, 2);
    }
    g.globalAlpha = 1;
  }
}
