import type { Camera, Guard, World } from '../sim/types.ts';
import { T_DOOR, T_FLOOR, T_LASER, T_LOCKER, T_SHADOW, T_TERMINAL, T_WALL } from '../sim/types.ts';
import { blocksSight, isLit, kindAt } from '../sim/grid.ts';
import { DIFF, K } from '../sim/vision.ts';
import { hackables } from '../sim/world.ts';

import type { GameRenderer, RenderOpts } from './types.ts';
export type { RenderOpts } from './types.ts';

interface Palette { patrol: string; suspicious: string; alert: string; search: string; camera: string; cyan: string; amber: string; red: string; green: string }
const NORMAL: Palette = { patrol: '#5ef2ff', suspicious: '#ffb347', alert: '#ff3b4e', search: '#c58bff', camera: '#9fd8ff', cyan: '#5ef2ff', amber: '#ffb347', red: '#ff3b4e', green: '#58ffa0' };
const CB: Palette = { patrol: '#4aa3ff', suspicious: '#ffa000', alert: '#ff7bff', search: '#ffffff', camera: '#8ec5ff', cyan: '#4aa3ff', amber: '#ffa000', red: '#ff7bff', green: '#ffffff' };

function makePattern(ctx: CanvasRenderingContext2D, kind: 'diag' | 'cross' | 'dots'): CanvasPattern | null {
  const c = document.createElement('canvas');
  c.width = c.height = 8;
  const g = c.getContext('2d');
  if (!g) return null;
  g.strokeStyle = 'rgba(255,255,255,0.55)';
  g.fillStyle = 'rgba(255,255,255,0.55)';
  g.lineWidth = 1.4;
  if (kind === 'diag' || kind === 'cross') { g.beginPath(); g.moveTo(0, 8); g.lineTo(8, 0); g.stroke(); }
  if (kind === 'cross') { g.beginPath(); g.moveTo(0, 0); g.lineTo(8, 8); g.stroke(); }
  if (kind === 'dots') { g.beginPath(); g.arc(4, 4, 1.3, 0, Math.PI * 2); g.fill(); }
  return ctx.createPattern(c, 'repeat');
}

/** Canvas 2D tactical view: the fallback when WebGL is unavailable. */
export class Renderer implements GameRenderer {
  readonly kind = '2d' as const;
  readonly canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private cw = 0;
  private ch = 0;
  private dpr = 1;
  private camX = 0;
  private camY = 0;
  private camInit = false;
  private pat: { diag: CanvasPattern | null; cross: CanvasPattern | null; dots: CanvasPattern | null };
  private shake = 0;
  private time = 0;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const c = canvas.getContext('2d');
    if (!c) throw new Error('Canvas 2D is not available');
    this.ctx = c;
    this.pat = { diag: makePattern(c, 'diag'), cross: makePattern(c, 'cross'), dots: makePattern(c, 'dots') };
    this.resize();
  }

  resize(): void {
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.cw = Math.max(1, this.canvas.clientWidth);
    this.ch = Math.max(1, this.canvas.clientHeight);
    this.canvas.width = Math.round(this.cw * this.dpr);
    this.canvas.height = Math.round(this.ch * this.dpr);
  }

  resetCamera(): void { this.camInit = false; }
  dispose(): void { this.ctx.setTransform(1, 0, 0, 1, 0, 0); this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height); }
  kick(): void { this.shake = 0.25; }

  tileSize(): number { return Math.max(22, Math.min(54, Math.min(this.cw, this.ch) / 12.5)); }

  draw(w: World, o: RenderOpts, dt: number): void {
    const ctx = this.ctx;
    this.time += dt;
    const pal = o.cb ? CB : NORMAL;
    const ts = this.tileSize();
    const px = w.player.x, py = w.player.y;
    if (!this.camInit) { this.camX = px; this.camY = py; this.camInit = true; }
    const k = 1 - Math.pow(0.001, dt);
    this.camX += (px - this.camX) * k;
    this.camY += (py - this.camY) * k;
    const mapW = w.map.w * ts, mapH = w.map.h * ts;
    let ox = this.cw / 2 - this.camX * ts, oy = this.ch / 2 - this.camY * ts;
    if (mapW <= this.cw) ox = (this.cw - mapW) / 2;
    if (mapH <= this.ch) oy = (this.ch - mapH) / 2;
    let sx = 0, sy = 0;
    if (this.shake > 0) {
      this.shake -= dt;
      if (!o.reduce) { sx = (Math.random() - 0.5) * 8; sy = (Math.random() - 0.5) * 8; }
    }
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    ctx.fillStyle = '#04070d';
    ctx.fillRect(0, 0, this.cw, this.ch);
    ctx.save();
    ctx.translate(ox + sx, oy + sy);

    this.drawTiles(w, ts, ox, oy, pal, o);
    this.drawItems(w, ts, pal, o);
    if (o.cones) {
      for (const c of w.cameras) this.drawCameraCone(w, c, ts, pal);
      for (const g of w.guards) this.drawGuardCone(w, g, ts, pal);
    }
    this.drawRings(w, ts, pal);
    this.drawDecoy(w, ts, pal);
    this.drawCameras(w, ts, pal, o);
    this.drawGuards(w, ts, pal, o);
    this.drawHackFocus(w, ts, pal);
    this.drawPlayer(w, ts, pal, o);
    ctx.restore();
    this.drawLight(w, ts, ox, oy, o);
  }

  // ---- tiles --------------------------------------------------------------------
  private drawTiles(w: World, ts: number, ox: number, oy: number, pal: Palette, o: RenderOpts): void {
    const ctx = this.ctx;
    const x0 = Math.max(0, Math.floor(-ox / ts) - 1), x1 = Math.min(w.map.w - 1, Math.ceil((this.cw - ox) / ts) + 1);
    const y0 = Math.max(0, Math.floor(-oy / ts) - 1), y1 = Math.min(w.map.h - 1, Math.ceil((this.ch - oy) / ts) + 1);
    const ready = w.def.objectives.filter((q) => q.id !== 'extract' && !q.optional).every((q) => w.objectives[q.id]);
    for (let ty = y0; ty <= y1; ty++) {
      for (let tx = x0; tx <= x1; tx++) {
        const kd = kindAt(w.map, tx, ty);
        const X = tx * ts, Y = ty * ts;
        if (kd === T_WALL) {
          ctx.fillStyle = '#18294a';
          ctx.fillRect(X, Y, ts, ts);
          ctx.strokeStyle = '#2b4468';
          ctx.lineWidth = 1;
          const nf = (dx: number, dy: number): boolean => kindAt(w.map, tx + dx, ty + dy) !== T_WALL;
          ctx.beginPath();
          if (nf(0, -1)) { ctx.moveTo(X, Y + 0.5); ctx.lineTo(X + ts, Y + 0.5); }
          if (nf(0, 1)) { ctx.moveTo(X, Y + ts - 0.5); ctx.lineTo(X + ts, Y + ts - 0.5); }
          if (nf(-1, 0)) { ctx.moveTo(X + 0.5, Y); ctx.lineTo(X + 0.5, Y + ts); }
          if (nf(1, 0)) { ctx.moveTo(X + ts - 0.5, Y); ctx.lineTo(X + ts - 0.5, Y + ts); }
          ctx.stroke();
          continue;
        }
        const lit = kd !== T_SHADOW && !w.blackout;
        ctx.fillStyle = lit ? '#0d1a2c' : '#060b16';
        ctx.fillRect(X, Y, ts, ts);
        ctx.strokeStyle = lit ? 'rgba(94,242,255,0.06)' : 'rgba(94,242,255,0.025)';
        ctx.strokeRect(X + 0.5, Y + 0.5, ts - 1, ts - 1);
        if (kd === T_SHADOW) {
          ctx.strokeStyle = 'rgba(120,150,200,0.12)';
          ctx.beginPath();
          for (let i = -ts; i < ts; i += 8) { ctx.moveTo(X + i, Y + ts); ctx.lineTo(X + i + ts, Y); }
          ctx.save();
          ctx.beginPath(); ctx.rect(X, Y, ts, ts); ctx.clip();
          ctx.stroke();
          ctx.restore();
        }
        if (kd === T_LOCKER) this.drawLocker(w, tx, ty, ts, pal);
        else if (kd === T_TERMINAL) this.drawTerminal(w, tx, ty, ts, pal, o);
        else if (kd === T_DOOR) this.drawDoor(w, tx, ty, ts, pal);
        else if (kd === T_LASER) this.drawLaserTile(w, tx, ty, ts, pal, o);
      }
    }
    // exit, checkpoints, start
    const ex = w.map.exit.x * ts, ey = w.map.exit.y * ts;
    ctx.fillStyle = ready ? 'rgba(88,255,160,0.22)' : 'rgba(150,170,200,0.10)';
    ctx.fillRect(ex + 2, ey + 2, ts - 4, ts - 4);
    ctx.strokeStyle = ready ? pal.green : '#5b6f8c';
    ctx.lineWidth = 2;
    ctx.strokeRect(ex + 3, ey + 3, ts - 6, ts - 6);
    ctx.beginPath();
    ctx.moveTo(ex + ts * 0.3, ey + ts * 0.45); ctx.lineTo(ex + ts * 0.5, ey + ts * 0.25); ctx.lineTo(ex + ts * 0.7, ey + ts * 0.45);
    ctx.moveTo(ex + ts * 0.3, ey + ts * 0.72); ctx.lineTo(ex + ts * 0.5, ey + ts * 0.52); ctx.lineTo(ex + ts * 0.7, ey + ts * 0.72);
    ctx.stroke();
    for (const c of w.checkpoints) {
      const cx = c.x * ts, cy = c.y * ts, r = ts * 0.22;
      ctx.beginPath();
      ctx.moveTo(cx, cy - r); ctx.lineTo(cx + r, cy); ctx.lineTo(cx, cy + r); ctx.lineTo(cx - r, cy); ctx.closePath();
      ctx.strokeStyle = c.hit ? pal.green : '#7f93b3';
      ctx.fillStyle = c.hit ? 'rgba(88,255,160,0.35)' : 'rgba(127,147,179,0.08)';
      ctx.lineWidth = 1.5;
      ctx.fill(); ctx.stroke();
    }
  }

  private drawLocker(w: World, tx: number, ty: number, ts: number, pal: Palette): void {
    const ctx = this.ctx;
    const X = tx * ts, Y = ty * ts;
    const inside = w.player.hidden && Math.floor(w.player.x) === tx && Math.floor(w.player.y) === ty;
    ctx.fillStyle = '#1a2b44';
    ctx.fillRect(X + 3, Y + 2, ts - 6, ts - 4);
    ctx.strokeStyle = inside ? pal.cyan : '#4a6a96';
    ctx.lineWidth = inside ? 2.5 : 1.5;
    ctx.strokeRect(X + 3.5, Y + 2.5, ts - 7, ts - 5);
    ctx.strokeStyle = '#33506f';
    ctx.lineWidth = 1;
    for (let i = 0; i < 3; i++) { ctx.beginPath(); ctx.moveTo(X + ts * 0.3, Y + ts * (0.25 + i * 0.1)); ctx.lineTo(X + ts * 0.7, Y + ts * (0.25 + i * 0.1)); ctx.stroke(); }
    ctx.fillStyle = inside ? pal.cyan : '#6f8fb8';
    ctx.fillRect(X + ts * 0.62, Y + ts * 0.58, 3, 6);
  }

  private drawTerminal(w: World, tx: number, ty: number, ts: number, pal: Palette, o: RenderOpts): void {
    const ctx = this.ctx;
    const X = tx * ts, Y = ty * ts;
    const t = w.terminals[w.map.ref[ty * w.map.w + tx]];
    const done = t?.done;
    const locked = (t?.lockT ?? 0) > 0;
    ctx.fillStyle = '#10223a';
    ctx.fillRect(X + 3, Y + 3, ts - 6, ts - 6);
    ctx.strokeStyle = done ? pal.green : locked ? pal.red : pal.cyan;
    ctx.lineWidth = 2;
    ctx.strokeRect(X + 3.5, Y + 3.5, ts - 7, ts - 7);
    ctx.fillStyle = done ? 'rgba(88,255,160,0.5)' : locked ? 'rgba(255,59,78,0.5)' : `rgba(94,242,255,${o.reduce ? 0.45 : 0.3 + 0.2 * Math.sin(this.time * 3)})`;
    ctx.fillRect(X + 7, Y + 7, ts - 14, ts * 0.38);
    ctx.fillStyle = '#d9f6ff';
    ctx.font = `700 ${Math.round(ts * 0.3)}px ui-monospace, Consolas, monospace`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(done ? 'OK' : locked ? 'X' : t?.id ?? '', X + ts / 2, Y + ts * 0.72);
  }

  private drawDoor(w: World, tx: number, ty: number, ts: number, pal: Palette): void {
    const ctx = this.ctx;
    const X = tx * ts, Y = ty * ts;
    const d = w.doors[w.map.ref[ty * w.map.w + tx]];
    if (!d) return;
    const horiz = kindAt(w.map, tx - 1, ty) === T_WALL && kindAt(w.map, tx + 1, ty) === T_WALL;
    const col = d.locked ? pal.red : pal.amber;
    ctx.strokeStyle = col;
    ctx.fillStyle = d.locked ? 'rgba(255,59,78,0.28)' : 'rgba(255,179,71,0.22)';
    ctx.lineWidth = 2;
    if (d.open) {
      if (horiz) { ctx.fillRect(X, Y + ts * 0.4, ts * 0.18, ts * 0.2); ctx.fillRect(X + ts * 0.82, Y + ts * 0.4, ts * 0.18, ts * 0.2); }
      else { ctx.fillRect(X + ts * 0.4, Y, ts * 0.2, ts * 0.18); ctx.fillRect(X + ts * 0.4, Y + ts * 0.82, ts * 0.2, ts * 0.18); }
      return;
    }
    ctx.fillRect(X + 1, Y + 1, ts - 2, ts - 2);
    ctx.strokeRect(X + 2, Y + 2, ts - 4, ts - 4);
    ctx.beginPath();
    if (horiz) { ctx.moveTo(X + ts / 2, Y + 2); ctx.lineTo(X + ts / 2, Y + ts - 2); } else { ctx.moveTo(X + 2, Y + ts / 2); ctx.lineTo(X + ts - 2, Y + ts / 2); }
    ctx.stroke();
    if (d.locked) {
      ctx.fillStyle = col;
      ctx.fillRect(X + ts * 0.38, Y + ts * 0.42, ts * 0.24, ts * 0.2);
      ctx.beginPath(); ctx.arc(X + ts / 2, Y + ts * 0.42, ts * 0.1, Math.PI, 0); ctx.stroke();
      if (d.card) {
        ctx.fillStyle = d.card === 'red' ? '#ff5a68' : d.card === 'blue' ? '#5aa8ff' : '#ffe14d';
        ctx.fillRect(X + ts * 0.7, Y + ts * 0.7, ts * 0.2, ts * 0.14);
      }
    }
  }

  private drawLaserTile(w: World, tx: number, ty: number, ts: number, pal: Palette, o: RenderOpts): void {
    const ctx = this.ctx;
    const X = tx * ts, Y = ty * ts;
    const l = w.lasers[w.map.ref[ty * w.map.w + tx]];
    if (!l) return;
    const isL = (dx: number, dy: number): boolean => kindAt(w.map, tx + dx, ty + dy) === T_LASER;
    const horizontal = isL(-1, 0) || isL(1, 0) || !(isL(0, -1) || isL(0, 1));
    const cx = X + ts / 2, cy = Y + ts / 2;
    const flick = o.reduce ? 1 : 0.85 + 0.15 * Math.sin(this.time * 38 + tx * 3 + ty);
    ctx.save();
    if (l.active) {
      ctx.strokeStyle = pal.cyan;
      ctx.shadowColor = pal.cyan;
      ctx.shadowBlur = 10;
      ctx.lineWidth = 3;
      ctx.globalAlpha = flick;
    } else {
      ctx.strokeStyle = 'rgba(94,242,255,0.35)';
      ctx.lineWidth = 1.5;
      ctx.setLineDash([3, 6]);
    }
    ctx.beginPath();
    if (horizontal) { ctx.moveTo(X, cy); ctx.lineTo(X + ts, cy); } else { ctx.moveTo(cx, Y); ctx.lineTo(cx, Y + ts); }
    ctx.stroke();
    ctx.restore();
    // emitters on the ends of the grid
    const end = horizontal ? !isL(-1, 0) || !isL(1, 0) : !isL(0, -1) || !isL(0, 1);
    if (end) {
      ctx.fillStyle = l.active ? pal.cyan : '#46607e';
      ctx.fillRect(horizontal ? (!isL(-1, 0) ? X : X + ts - 4) : cx - 3, horizontal ? cy - 3 : (!isL(0, -1) ? Y : Y + ts - 4), horizontal ? 4 : 6, horizontal ? 6 : 4);
    }
    // pulse indicator for pulsing grids: small square pattern when active (shape, not only colour)
    if (l.period && l.active) {
      ctx.fillStyle = 'rgba(94,242,255,0.5)';
      ctx.fillRect(cx - 2, cy - 2, 4, 4);
    }
  }

  private drawItems(w: World, ts: number, pal: Palette, o: RenderOpts): void {
    const ctx = this.ctx;
    for (const it of w.items) {
      if (it.taken) continue;
      const cx = (it.x + 0.5) * ts, cy = (it.y + 0.5) * ts;
      const bob = o.reduce ? 0 : Math.sin(this.time * 3 + it.x) * 2;
      ctx.save();
      ctx.translate(cx, cy + bob);
      if (it.kind === 'energy') {
        ctx.fillStyle = 'rgba(88,255,160,0.25)'; ctx.strokeStyle = pal.green; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.moveTo(0, -ts * 0.26); ctx.lineTo(ts * 0.2, 0); ctx.lineTo(0, ts * 0.26); ctx.lineTo(-ts * 0.2, 0); ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-ts * 0.05, -ts * 0.1); ctx.lineTo(ts * 0.05, -0.02 * ts); ctx.lineTo(-ts * 0.05, 0.04 * ts); ctx.lineTo(ts * 0.05, ts * 0.12); ctx.stroke();
      } else if (it.kind === 'card') {
        ctx.fillStyle = it.card === 'red' ? '#ff5a68' : it.card === 'blue' ? '#5aa8ff' : '#ffe14d';
        ctx.fillRect(-ts * 0.24, -ts * 0.16, ts * 0.48, ts * 0.32);
        ctx.fillStyle = 'rgba(0,0,0,0.5)'; ctx.fillRect(-ts * 0.18, -ts * 0.04, ts * 0.2, ts * 0.05);
        ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.strokeRect(-ts * 0.24, -ts * 0.16, ts * 0.48, ts * 0.32);
      } else {
        ctx.strokeStyle = '#ff9bf2'; ctx.fillStyle = 'rgba(255,155,242,0.25)'; ctx.lineWidth = 2;
        ctx.beginPath();
        for (let i = 0; i < 6; i++) { const a = (Math.PI / 3) * i; ctx.lineTo(Math.cos(a) * ts * 0.27, Math.sin(a) * ts * 0.27); }
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.beginPath(); ctx.arc(0, 0, ts * 0.08, 0, Math.PI * 2); ctx.fillStyle = '#ff9bf2'; ctx.fill();
      }
      ctx.restore();
    }
  }

  // ---- vision cones -----------------------------------------------------------------
  private conePoly(w: World, x: number, y: number, dir: number, fov: number, range: number): { x: number; y: number }[] {
    const pts: { x: number; y: number }[] = [{ x, y }];
    const n = 36;
    for (let i = 0; i <= n; i++) {
      const a = dir - fov / 2 + (fov * i) / n;
      const cx = Math.cos(a), cy = Math.sin(a);
      let d = 0;
      for (; d < range; d += 0.12) {
        if (blocksSight(w, Math.floor(x + cx * d), Math.floor(y + cy * d))) break;
      }
      pts.push({ x: x + cx * Math.min(d, range), y: y + cy * Math.min(d, range) });
    }
    return pts;
  }

  private paintCone(pts: { x: number; y: number }[], ts: number, x: number, y: number, range: number, color: string, pattern: CanvasPattern | null, dashed: boolean, thick: number, alpha: number): void {
    const ctx = this.ctx;
    ctx.beginPath();
    pts.forEach((p, i) => { if (i === 0) ctx.moveTo(p.x * ts, p.y * ts); else ctx.lineTo(p.x * ts, p.y * ts); });
    ctx.closePath();
    const g = ctx.createRadialGradient(x * ts, y * ts, 0, x * ts, y * ts, range * ts);
    g.addColorStop(0, hexA(color, alpha));
    g.addColorStop(1, hexA(color, alpha * 0.12));
    ctx.fillStyle = g;
    ctx.fill();
    if (pattern) {
      ctx.save();
      ctx.clip();
      ctx.globalAlpha = 0.16;
      ctx.fillStyle = pattern;
      ctx.fillRect((x - range) * ts, (y - range) * ts, range * 2 * ts, range * 2 * ts);
      ctx.restore();
    }
    ctx.strokeStyle = hexA(color, 0.9);
    ctx.lineWidth = thick;
    ctx.setLineDash(dashed ? [6, 5] : []);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  private drawGuardCone(w: World, g: Guard, ts: number, pal: Palette): void {
    const range = g.range * DIFF[w.difficulty].range;
    const pts = this.conePoly(w, g.x, g.y, g.dir, g.fov, range);
    const col = g.state === 'patrol' ? pal.patrol : g.state === 'suspicious' ? pal.suspicious : g.state === 'alert' ? pal.alert : pal.search;
    const pattern = g.state === 'patrol' ? null : g.state === 'suspicious' ? this.pat.diag : g.state === 'alert' ? this.pat.cross : this.pat.dots;
    this.paintCone(pts, ts, g.x, g.y, range, col, pattern, g.state === 'suspicious', g.state === 'alert' ? 3 : 1.5, g.state === 'alert' ? 0.34 : 0.24);
    // shadow range: a faint inner arc showing how far you are seen while in shadow
    const ctx = this.ctx;
    ctx.strokeStyle = hexA(col, 0.35);
    ctx.lineWidth = 1;
    ctx.setLineDash([2, 4]);
    ctx.beginPath();
    ctx.arc(g.x * ts, g.y * ts, range * K.SHADOW_RANGE * ts, g.dir - g.fov / 2, g.dir + g.fov / 2);
    ctx.stroke();
    ctx.setLineDash([]);
  }

  private drawCameraCone(w: World, c: Camera, ts: number, pal: Palette): void {
    if (c.loopT > 0) return;
    const range = c.range * DIFF[w.difficulty].range;
    const pts = this.conePoly(w, c.x, c.y, c.dir, c.fov, range);
    const col = c.trackT > 0 || c.sus > 50 ? pal.alert : pal.camera;
    this.paintCone(pts, ts, c.x, c.y, range, col, this.pat.dots, true, 1.5, 0.18);
  }

  // ---- entities ----------------------------------------------------------------------
  private drawRings(w: World, ts: number, pal: Palette): void {
    const ctx = this.ctx;
    for (const r of w.rings) {
      const t = r.age / r.ttl;
      const rad = r.r * ts * (r.kind === 'step' || r.kind === 'sneak' ? 0.4 + 0.6 * t : 0.3 + 0.7 * t);
      ctx.strokeStyle = r.kind === 'alarm' ? hexA(pal.red, 0.7 * (1 - t)) : r.kind === 'hack' ? hexA(pal.cyan, 0.8 * (1 - t)) : r.kind === 'decoy' ? hexA(pal.amber, 0.6 * (1 - t)) : `rgba(200,220,255,${0.22 * (1 - t)})`;
      ctx.lineWidth = r.kind === 'step' || r.kind === 'sneak' ? 1 : 2;
      ctx.beginPath();
      ctx.arc(r.x * ts, r.y * ts, rad, 0, Math.PI * 2);
      ctx.stroke();
    }
  }

  private drawDecoy(w: World, ts: number, pal: Palette): void {
    if (!w.decoy) return;
    const ctx = this.ctx;
    const d = w.decoy;
    const x = d.x * ts, y = d.y * ts;
    ctx.fillStyle = hexA(pal.amber, 0.25);
    ctx.strokeStyle = pal.amber;
    ctx.lineWidth = 2;
    ctx.beginPath(); ctx.arc(x, y, ts * 0.2, 0, Math.PI * 2); ctx.fill(); ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y, ts * 0.34, -0.7, 0.7); ctx.stroke();
    ctx.beginPath(); ctx.arc(x, y, ts * 0.34, Math.PI - 0.7, Math.PI + 0.7); ctx.stroke();
    ctx.strokeStyle = hexA(pal.amber, 0.7);
    ctx.beginPath(); ctx.arc(x, y, ts * 0.5, -Math.PI / 2, -Math.PI / 2 + (Math.PI * 2 * d.t) / K.DECOY_T); ctx.stroke();
  }

  private drawCameras(w: World, ts: number, pal: Palette, o: RenderOpts): void {
    const ctx = this.ctx;
    for (const c of w.cameras) {
      const x = c.x * ts, y = c.y * ts;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(c.dir);
      const looped = c.loopT > 0;
      ctx.fillStyle = '#1b2c47';
      ctx.strokeStyle = looped ? '#7f8aa0' : c.trackT > 0 ? pal.red : pal.camera;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-ts * 0.22, -ts * 0.2); ctx.lineTo(ts * 0.26, -ts * 0.12); ctx.lineTo(ts * 0.26, ts * 0.12); ctx.lineTo(-ts * 0.22, ts * 0.2); ctx.closePath();
      ctx.fill(); ctx.stroke();
      const blink = o.reduce || Math.floor(this.time * 3) % 2 === 0;
      ctx.fillStyle = looped ? '#7f8aa0' : blink ? pal.red : '#552029';
      ctx.beginPath(); ctx.arc(ts * 0.18, 0, ts * 0.06, 0, Math.PI * 2); ctx.fill();
      ctx.restore();
      if (looped && c.loopT < 9000) {
        ctx.fillStyle = '#c3cce0';
        ctx.font = `700 ${Math.round(ts * 0.28)}px ui-monospace, Consolas, monospace`;
        ctx.textAlign = 'center';
        ctx.fillText(`LOOP ${c.loopT.toFixed(1)}`, x, y - ts * 0.4);
      } else if (looped) {
        ctx.fillStyle = '#7f8aa0';
        ctx.font = `700 ${Math.round(ts * 0.26)}px ui-monospace, Consolas, monospace`;
        ctx.textAlign = 'center';
        ctx.fillText('OFFLINE', x, y - ts * 0.4);
      } else if (c.sus > 1) {
        this.susBar(x, y - ts * 0.42, ts, c.sus, pal);
      }
    }
  }

  private susBar(x: number, y: number, ts: number, sus: number, pal: Palette): void {
    const ctx = this.ctx;
    const w = ts * 0.9, h = Math.max(4, ts * 0.1);
    ctx.fillStyle = 'rgba(0,0,0,0.65)';
    ctx.fillRect(x - w / 2 - 1, y - 1, w + 2, h + 2);
    ctx.fillStyle = sus >= 100 ? pal.alert : sus >= K.SUS_THRESHOLD ? pal.suspicious : pal.patrol;
    ctx.fillRect(x - w / 2, y, (w * Math.min(100, sus)) / 100, h);
    ctx.fillStyle = '#fff';
    ctx.fillRect(x - w / 2 + (w * K.SUS_THRESHOLD) / 100 - 0.5, y - 2, 1.5, h + 4);
  }

  private drawGuards(w: World, ts: number, pal: Palette, o: RenderOpts): void {
    const ctx = this.ctx;
    for (const g of w.guards) {
      const x = g.x * ts, y = g.y * ts;
      const col = g.state === 'patrol' ? pal.patrol : g.state === 'suspicious' ? pal.suspicious : g.state === 'alert' ? pal.alert : pal.search;
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(g.dir);
      ctx.fillStyle = '#1b2a45';
      ctx.strokeStyle = col;
      ctx.lineWidth = 2.5;
      const r = ts * 0.3;
      roundRect(ctx, -r, -r, r * 2, r * 2, r * 0.45);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = col;
      ctx.fillRect(r * 0.25, -r * 0.55, r * 0.5, r * 1.1);
      ctx.restore();
      // state icon above the head (shape, not only colour)
      const iy = y - ts * 0.62;
      ctx.lineWidth = 2;
      ctx.strokeStyle = col;
      ctx.fillStyle = col;
      if (g.state === 'suspicious') {
        ctx.beginPath(); ctx.moveTo(x, iy - ts * 0.16); ctx.lineTo(x + ts * 0.16, iy + ts * 0.12); ctx.lineTo(x - ts * 0.16, iy + ts * 0.12); ctx.closePath(); ctx.stroke();
        ctx.font = `800 ${Math.round(ts * 0.26)}px ui-monospace, Consolas, monospace`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('?', x, iy + ts * 0.03);
      } else if (g.state === 'alert') {
        const pulse = o.reduce ? 1 : 1 + 0.12 * Math.sin(this.time * 12);
        ctx.beginPath(); ctx.moveTo(x, iy - ts * 0.2 * pulse); ctx.lineTo(x + ts * 0.18 * pulse, iy); ctx.lineTo(x, iy + ts * 0.2 * pulse); ctx.lineTo(x - ts * 0.18 * pulse, iy); ctx.closePath(); ctx.fill();
        ctx.fillStyle = '#10080a';
        ctx.font = `800 ${Math.round(ts * 0.26)}px ui-monospace, Consolas, monospace`;
        ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
        ctx.fillText('!', x, iy + ts * 0.02);
      } else if (g.state === 'search') {
        ctx.beginPath(); ctx.arc(x, iy, ts * 0.15, 0, Math.PI * 2); ctx.stroke();
        for (let i = -1; i <= 1; i++) { ctx.beginPath(); ctx.arc(x + i * ts * 0.07, iy, 1.4, 0, Math.PI * 2); ctx.fill(); }
      }
      if (g.sus > 1 && g.state !== 'alert') this.susBar(x, y - ts * 0.44, ts, g.sus, pal);
    }
  }

  private drawHackFocus(w: World, ts: number, pal: Palette): void {
    const f = w.player.focus;
    if (!f) return;
    const h = hackables(w).find((q) => q.kind === f.kind && q.i === f.i);
    if (!h) return;
    const ctx = this.ctx;
    ctx.strokeStyle = pal.cyan;
    ctx.lineWidth = 2;
    ctx.setLineDash([5, 4]);
    ctx.lineDashOffset = -this.time * 12;
    ctx.beginPath(); ctx.arc(h.x * ts, h.y * ts, ts * 0.55, 0, Math.PI * 2); ctx.stroke();
    ctx.setLineDash([]);
    ctx.lineDashOffset = 0;
    ctx.strokeStyle = hexA(pal.cyan, 0.35);
    ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(w.player.x * ts, w.player.y * ts); ctx.lineTo(h.x * ts, h.y * ts); ctx.stroke();
  }

  private drawPlayer(w: World, ts: number, pal: Palette, o: RenderOpts): void {
    const p = w.player;
    if (p.hidden) return;
    const ctx = this.ctx;
    const x = p.x * ts, y = p.y * ts;
    const lit = isLit(w, p.x, p.y);
    ctx.save();
    ctx.translate(x, y);
    if (lit) {
      ctx.fillStyle = 'rgba(255,255,255,0.06)';
      ctx.beginPath(); ctx.arc(0, 0, ts * 0.5, 0, Math.PI * 2); ctx.fill();
    }
    ctx.rotate(p.dir);
    const r = ts * (p.sneak ? 0.22 : 0.27);
    ctx.fillStyle = '#0b1a2a';
    ctx.strokeStyle = pal.cyan;
    ctx.lineWidth = 2.5;
    if (p.sneak) ctx.setLineDash([4, 3]);
    ctx.beginPath();
    for (let i = 0; i < 6; i++) { const a = (Math.PI / 3) * i; ctx.lineTo(Math.cos(a) * r, Math.sin(a) * r); }
    ctx.closePath();
    ctx.fill(); ctx.stroke();
    ctx.setLineDash([]);
    ctx.fillStyle = pal.cyan;
    ctx.beginPath(); ctx.moveTo(r * 1.35, 0); ctx.lineTo(r * 0.55, -r * 0.35); ctx.lineTo(r * 0.55, r * 0.35); ctx.closePath(); ctx.fill();
    ctx.restore();
    void o;
  }

  /** Vignette plus the blackout light circle. */
  private drawLight(w: World, ts: number, ox: number, oy: number, o: RenderOpts): void {
    const ctx = this.ctx;
    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    const px = ox + w.player.x * ts, py = oy + w.player.y * ts;
    const R = Math.max(this.cw, this.ch);
    if (w.blackout) {
      const g = ctx.createRadialGradient(px, py, ts * 0.8, px, py, ts * 5.5);
      g.addColorStop(0, 'rgba(2,4,9,0)');
      g.addColorStop(1, 'rgba(2,4,9,0.9)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, this.cw, this.ch);
    } else {
      const g = ctx.createRadialGradient(this.cw / 2, this.ch / 2, R * 0.25, this.cw / 2, this.ch / 2, R * 0.75);
      g.addColorStop(0, 'rgba(2,4,9,0)');
      g.addColorStop(1, 'rgba(2,4,9,0.65)');
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, this.cw, this.ch);
    }
    void o;
  }
}

function hexA(hex: string, a: number): string {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16), g = parseInt(h.slice(2, 4), 16), b = parseInt(h.slice(4, 6), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

void T_FLOOR;
