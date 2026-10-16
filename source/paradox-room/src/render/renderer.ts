// Canvas 2D renderer: oblique projection of voxel rooms, painter's algorithm, procedural glyphs.
import type { Dir, FoldKind, GEvent, GObj, GState, Level } from '../core/types.ts';
import { MATS } from '../core/rotations.ts';
import { crystalsLeft, downOf, inBounds, isSolid, probeMove } from '../core/rules.ts';
import * as P from './palette.ts';
import type { Flags, Quality, QualitySetting, ViewRenderer } from './types.ts';

// This is the fallback view, used when WebGL is unavailable or its context is lost for good.

type M = number[];
type V3 = [number, number, number];

const PX = 0.45; // depth shifts right...
const PY = 0.4; // ...and up
const DVIEW: V3 = [-PX, PY, 1]; // ray direction away from the viewer
const LIGHT: V3 = (() => {
  const l = Math.hypot(0.25, 0.8, 0.55);
  return [0.25 / l, -0.8 / l, -0.55 / l];
})();
const FOLD_TIME = 0.38;
const FACES: { a: 0 | 1 | 2; s: 1 | -1 }[] = [
  { a: 0, s: 1 },
  { a: 0, s: -1 },
  { a: 1, s: 1 },
  { a: 1, s: -1 },
  { a: 2, s: 1 },
  { a: 2, s: -1 },
];
// For each axis, the four corner bit-patterns (other two axes) in polygon order.
const CYCLE: [number, number][] = [
  [0, 0],
  [1, 0],
  [1, 1],
  [0, 1],
];


interface Item {
  z: number;
  y: number;
  x: number;
  order: number;
  draw: () => void;
}

interface Pulse {
  room: number;
  c: V3;
  t: number;
  life: number;
  color: [number, number, number];
  big: boolean;
}

interface Particle {
  room: number;
  c: V3;
  ox: number;
  oy: number;
  vx: number;
  vy: number;
  t: number;
}

function mul(a: M, b: M): M {
  const r: M = new Array(9).fill(0);
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) r[i * 3 + j] = a[i * 3] * b[j] + a[i * 3 + 1] * b[3 + j] + a[i * 3 + 2] * b[6 + j];
  return r;
}

function rotFor(kind: FoldKind, t: number): M {
  const deg = kind === 'rollR' ? 90 : kind === 'rollL' ? -90 : kind === 'pitchA' ? 90 : -90;
  const ang = (deg * Math.PI * t) / 180;
  const c = Math.cos(ang);
  const s = Math.sin(ang);
  return kind === 'rollR' || kind === 'rollL' ? [c, -s, 0, s, c, 0, 0, 0, 1] : [1, 0, 0, 0, c, -s, 0, s, c];
}

const ease = (t: number): number => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

export class Renderer implements ViewRenderer {
  readonly kind = '2d' as const;
  readonly activeQuality: Quality | null = null;
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private W = 0;
  private H = 0;
  private dpr = 1;
  private S = 40;
  private insetTop = 90;
  private insetBottom = 90;
  level!: Level;
  state!: GState;
  private rm: M = MATS[0].slice();
  private fa: { t: number; from: M; kind: FoldKind } | null = null;
  private pv: V3 = [0, 0, 0];
  private cam: [number, number] = [0, 0];
  private pulses: Pulse[] = [];
  private parts: Particle[] = [];
  private doorOpen = new Map<number, number>();
  private time = 0;
  private squash = 0;
  private wipe = 0;
  private caption = { text: '', t: 0 };
  private nudge: [number, number, number] = [0, 0, 0];
  private proj = new Map<number, [number, number]>();
  private attract = { t: 0 };
  facing: Dir = 'right';

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    const c = canvas.getContext('2d');
    if (!c) throw new Error('Canvas 2D is unavailable');
    this.ctx = c;
    this.resize();
  }

  resize(): void {
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const W = Math.max(1, Math.floor(window.innerWidth));
    const H = Math.max(1, Math.floor(window.innerHeight));
    this.dpr = dpr;
    this.W = W;
    this.H = H;
    this.canvas.width = Math.floor(W * dpr);
    this.canvas.height = Math.floor(H * dpr);
    this.canvas.style.width = W + 'px';
    this.canvas.style.height = H + 'px';
  }

  setInsets(top: number, bottom: number): void {
    this.insetTop = top;
    this.insetBottom = bottom;
  }

  /** Jump to a state with no animation (level start, undo, restart). */
  setState(level: Level, state: GState): void {
    this.level = level;
    this.state = state;
    this.fa = null;
    this.rm = MATS[state.ori[state.room]].slice();
    this.pv = [state.x, state.y, state.z];
    this.pulses = [];
    this.parts = [];
    this.doorOpen.clear();
    for (const o of level.objs) if (o.kind === 'door') this.doorOpen.set(o.id, (state.ctl >> (o.bit as number)) & 1);
    this.cam = [0, 0];
    this.snapCamera = true;
  }
  private snapCamera = true;

  setCaption(text: string): void {
    this.caption = { text, t: 2.2 };
  }

  /** Animate from `before` to `after`, driven by the events the rules produced. */
  apply(before: GState, after: GState, events: GEvent[], effects: boolean): void {
    const roomChanged = before.room !== after.room;
    this.state = after;
    if (roomChanged) {
      this.fa = null;
      this.rm = MATS[after.ori[after.room]].slice();
      this.pv = [after.x, after.y, after.z];
      this.snapCamera = true;
      this.wipe = 1;
      this.setCaption(this.level.rooms[after.room].name);
    }
    for (const e of events) {
      if (e.k === 'fold' && !roomChanged) {
        const from = MATS[before.ori[before.room]].slice();
        if (effects) this.fa = { t: 0, from, kind: e.kind };
        else {
          this.fa = null;
          this.rm = MATS[after.ori[after.room]].slice();
        }
        if (!effects) this.pv = [after.x, after.y, after.z];
      } else if (e.k === 'step') {
        this.squash = effects ? 1 : 0;
      } else if (e.k === 'collect') {
        const o = this.level.objs[e.obj];
        this.burst(o, o.kind === 'shard' ? P.PAPER : P.AMBER, effects);
      } else if (e.k === 'latch' || e.k === 'toggle') {
        this.pulse(this.level.objs[e.obj], P.CYAN, false);
      } else if (e.k === 'complete') {
        this.pulse(this.exitObj(), P.AMBER, true);
      }
    }
    if (!effects) {
      this.pv = [after.x, after.y, after.z];
      this.rm = MATS[after.ori[after.room]].slice();
    }
  }

  private exitObj(): GObj {
    return this.level.objs.find((o) => o.kind === 'exit') as GObj;
  }

  private pulse(o: GObj, color: [number, number, number], big: boolean): void {
    this.pulses.push({ room: o.room, c: [o.x, o.y, o.z], t: 0, life: big ? 1.4 : 0.6, color, big });
  }

  private burst(o: GObj, color: [number, number, number], effects: boolean): void {
    this.pulse(o, color, false);
    if (!effects) return;
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2;
      this.parts.push({ room: o.room, c: [o.x, o.y, o.z], ox: 0, oy: 0, vx: Math.cos(a) * 0.9, vy: -0.7 + Math.sin(a) * 0.5, t: 0 });
    }
  }

  used(_obj: number): void {}
  orbit(_dyaw: number, _dpitch: number): void {}
  recenter(): void {}
  setQuality(_q: QualitySetting): void {}
  dispose(): void {}

  blockedNudge(dir: Dir): void {
    const m = dir === 'right' ? [3, 0] : dir === 'left' ? [-3, 0] : dir === 'away' ? [0, -3] : [0, 3];
    this.nudge = [m[0], m[1], 1];
  }

  /** Slow demonstration fold for title and menu screens. */
  attractTick(dt: number, enabled: boolean): void {
    this.attract.t += dt;
    if (enabled && this.attract.t > 3.4 && !this.fa) {
      this.attract.t = 0;
      const from = this.rm.slice();
      this.fa = { t: 0, from, kind: 'rollL' };
      }
  }

  private visRot(): M {
    if (this.fa) return mul(rotFor(this.fa.kind, ease(Math.min(1, this.fa.t))), this.fa.from);
    return this.rm;
  }

  private center(roomIdx: number): V3 {
    const r = this.level.rooms[roomIdx];
    return [(r.w - 1) / 2, (r.h - 1) / 2, (r.d - 1) / 2];
  }

  private toView(R: M, c: V3, v: V3): V3 {
    const x = v[0] - c[0];
    const y = v[1] - c[1];
    const z = v[2] - c[2];
    return [R[0] * x + R[1] * y + R[2] * z, R[3] * x + R[4] * y + R[5] * z, R[6] * x + R[7] * y + R[8] * z];
  }

  private sx(v: V3): number {
    return (v[0] + PX * v[2]) * this.S;
  }
  private sy(v: V3): number {
    return (v[1] - PY * v[2]) * this.S;
  }

  /** Object under screen point `mx,my` among candidate ids (uses the previous frame's projections). */
  pick(mx: number, my: number, ids: number[]): number | null {
    let best: number | null = null;
    let bd = (0.9 * this.S) ** 2;
    for (const id of ids) {
      const p = this.proj.get(id);
      if (!p) continue;
      const d = (p[0] - mx) ** 2 + (p[1] - my) ** 2;
      if (d < bd) {
        bd = d;
        best = id;
      }
    }
    return best;
  }

  frame(dt: number, f: Flags): void {
    const { ctx } = this;
    this.time += dt;
    if (this.fa) {
      this.fa.t += dt / FOLD_TIME;
      if (this.fa.t >= 1) {
        this.rm = MATS[this.attractOrFinal()].slice();
        this.fa = null;
      }
    }
    this.squash = Math.max(0, this.squash - dt / 0.09);
    this.wipe = Math.max(0, this.wipe - dt / 0.35);
    this.caption.t = Math.max(0, this.caption.t - dt);
    for (const p of this.pulses) p.t += dt;
    this.pulses = this.pulses.filter((p) => p.t < p.life);
    for (const p of this.parts) {
      p.t += dt;
      p.ox += p.vx * dt;
      p.oy += p.vy * dt;
      p.vy += 1.4 * dt;
    }
    this.parts = this.parts.filter((p) => p.t < 0.7);
    this.nudge[2] = Math.max(0, this.nudge[2] - dt / 0.12);

    const st = this.state;
    const lvl = this.level;
    const k = 1 - Math.exp(-dt * 16);
    this.pv[0] += (st.x - this.pv[0]) * k;
    this.pv[1] += (st.y - this.pv[1]) * k;
    this.pv[2] += (st.z - this.pv[2]) * k;
    for (const o of lvl.objs) {
      if (o.kind !== 'door') continue;
      const want = (st.ctl >> (o.bit as number)) & 1;
      const cur = this.doorOpen.get(o.id) ?? want;
      this.doorOpen.set(o.id, cur + (want - cur) * (1 - Math.exp(-dt * 10)));
    }

    const R = this.visRot();
    const ctr = this.center(st.room);
    const room = lvl.rooms[st.room];
    const pitchable = room.free.some((k) => k === 'pitchA' || k === 'pitchB') || lvl.objs.some((o) => o.room === st.room && o.kind === 'lever' && (o.fold === 'pitchA' || o.fold === 'pitchB'));
    const dims = [room.w, room.h, room.d].sort((a, b) => b - a);
    const ext = pitchable ? [dims[0] + PX * dims[1], dims[0] + PY * dims[1]] : [Math.max(room.w, room.h) + PX * room.d, Math.max(room.w, room.h) + PY * room.d];
    const availW = this.W - 32;
    const availH = Math.max(120, this.H - this.insetTop - this.insetBottom);
    this.S = Math.max(20, Math.min(88, 1.15 * Math.min(availW / (ext[0] + 1), availH / (ext[1] + 1))));

    // camera follows the player, blended with the room centre
    const pvv = this.toView(R, ctr, this.pv);
    const tx = (this.sx(pvv) / this.S) * 0.6;
    const ty = (this.sy(pvv) / this.S) * 0.6;
    if (this.snapCamera) {
      this.cam = [tx, ty];
      this.snapCamera = false;
    } else {
      const kc = 1 - Math.exp(-dt * 9);
      this.cam[0] += (tx - this.cam[0]) * kc;
      this.cam[1] += (ty - this.cam[1]) * kc;
    }
    const ox = this.W / 2 - this.cam[0] * this.S + this.nudge[0] * this.nudge[2];
    const oy = this.insetTop + availH / 2 - this.cam[1] * this.S + this.nudge[1] * this.nudge[2];

    ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
    this.drawBackground();
    ctx.save();
    ctx.translate(ox, oy);

    // ---- build the painter's list
    const items: Item[] = [];
    this.proj.clear();
    const rv: V3[] = [];
    for (let i = 0; i < 8; i++) {
      const dx = i & 1 ? 0.5 : -0.5;
      const dy = i & 2 ? 0.5 : -0.5;
      const dz = i & 4 ? 0.5 : -0.5;
      rv.push([R[0] * dx + R[1] * dy + R[2] * dz, R[3] * dx + R[4] * dy + R[5] * dz, R[6] * dx + R[7] * dy + R[8] * dz]);
    }
    const down = downOf(st);
    const stLevel = this.state;
    for (let z = 0; z < room.d; z++)
      for (let y = 0; y < room.h; y++)
        for (let x = 0; x < room.w; x++) {
          const idx = x + room.w * (y + room.h * z);
          if (!room.solid[idx]) continue;
          const cv = this.toView(R, ctr, [x, y, z]);
          items.push({ z: cv[2], y: cv[1], x: cv[0], order: 0, draw: () => this.drawCube(R, rv, cv, [x, y, z], down, 1, false, f.contrast, stLevel) });
        }
    for (const o of lvl.objs) {
      if (o.room !== st.room) continue;
      const cv = this.toView(R, ctr, [o.x, o.y, o.z]);
      if (o.kind === 'door') {
        const open = this.doorOpen.get(o.id) ?? 0;
        items.push({
          z: cv[2],
          y: cv[1],
          x: cv[0],
          order: 0,
          draw: () => this.drawCube(R, rv, cv, [o.x, o.y, o.z], down, 1 - open * 0.92, true, f.contrast, stLevel),
        });
        continue;
      }
      const sxp = this.sx(cv) * 1;
      const syp = this.sy(cv) + 0.2 * this.S;
      this.proj.set(o.id, [ox + sxp, oy + syp]);
      items.push({ z: cv[2], y: cv[1], x: cv[0], order: 1, draw: () => this.drawObject(o, sxp, syp, f) });
    }
    // walk markers
    if (f.showPlayer) {
      const dirs: Dir[] = ['right', 'left', 'away', 'toward'];
      for (const d of dirs) {
        const pr = probeMove(lvl, st, d);
        const cv = this.toView(R, ctr, pr.ok ? [pr.to[0], pr.to[1], pr.to[2]] : [(st.x + pr.to[0]) / 2, (st.y + pr.to[1]) / 2, (st.z + pr.to[2]) / 2]);
        const isHint = f.hintDir === d;
        items.push({ z: cv[2], y: cv[1], x: cv[0], order: 1, draw: () => this.drawMarker(cv, pr.ok, isHint, f.contrast) });
      }
      const pc = this.toView(R, ctr, this.pv);
      items.push({ z: pc[2], y: pc[1], x: pc[0], order: 2, draw: () => this.drawPlayer(pc) });
    }
    items.sort((a, b) => b.z - a.z || b.y - a.y || a.x - b.x || a.order - b.order);
    for (const it of items) it.draw();

    // pulses and particles (room-anchored)
    for (const p of this.pulses) {
      if (p.room !== st.room) continue;
      const cv = this.toView(R, ctr, p.c);
      const u = p.t / p.life;
      const r = (p.big ? 0.4 + u * 3.2 : 0.3 + u * 1.1) * this.S;
      ctx.strokeStyle = P.rgba(p.color, (1 - u) * 0.9);
      ctx.lineWidth = p.big ? 3 : 2;
      ctx.beginPath();
      ctx.ellipse(this.sx(cv), this.sy(cv) + 0.3 * this.S, r, r * 0.55, 0, 0, Math.PI * 2);
      ctx.stroke();
    }
    for (const p of this.parts) {
      if (p.room !== st.room) continue;
      const cv = this.toView(R, ctr, p.c);
      ctx.fillStyle = P.rgba(P.AMBER, 1 - p.t / 0.7);
      ctx.fillRect(this.sx(cv) + p.ox * this.S - 2, this.sy(cv) + p.oy * this.S - 2, 4, 4);
    }
    ctx.restore();

    if (this.wipe > 0) {
      const g = ctx.createLinearGradient(0, 0, this.W, 0);
      g.addColorStop(0, P.rgba(P.VIOLET, 0));
      g.addColorStop(0.5, P.rgba(P.VIOLET, 0.45 * this.wipe));
      g.addColorStop(1, P.rgba(P.VIOLET, 0));
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, this.W, this.H);
    }
    if (this.caption.t > 0) {
      ctx.globalAlpha = Math.min(1, this.caption.t);
      ctx.fillStyle = P.rgba(P.PAPER, 0.9);
      ctx.font = '600 14px system-ui, sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText(this.caption.text.toUpperCase().split('').join(' '), this.W / 2, this.H - this.insetBottom - 12);
      ctx.globalAlpha = 1;
    }
    void f;
  }

  private attractOrFinal(): number {
    if (this.fa) {
      // find the orientation index matching the integer-rounded final matrix
      const end = mul(rotFor(this.fa.kind, 1), this.fa.from).map((v) => Math.round(v));
      const i = MATS.findIndex((m) => m.every((v, j) => v === end[j]));
      return i < 0 ? 0 : i;
    }
    return 0;
  }

  private drawBackground(): void {
    const { ctx, W, H } = this;
    ctx.fillStyle = P.INK;
    ctx.fillRect(0, 0, W, H);
    const g = ctx.createRadialGradient(W / 2, H * 0.5, 10, W / 2, H * 0.5, Math.max(W, H) * 0.7);
    g.addColorStop(0, 'rgba(40,60,120,0.22)');
    g.addColorStop(1, 'rgba(5,6,11,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);
  }

  private drawCube(R: M, rv: V3[], cv: V3, cell: V3, down: readonly number[], alpha: number, isDoor: boolean, contrast: boolean, st: GState): void {
    const { ctx } = this;
    const lvl = this.level;
    const sxs: number[] = [];
    const sys: number[] = [];
    for (let i = 0; i < 8; i++) {
      sxs.push(this.sx([cv[0] + rv[i][0], cv[1] + rv[i][1], cv[2] + rv[i][2]]));
      sys.push(this.sy([cv[0] + rv[i][0], cv[1] + rv[i][1], cv[2] + rv[i][2]]));
    }
    const base = isDoor ? P.mix(P.FACE, P.PINK, 0.4) : P.FACE;
    const edge = isDoor ? P.PINK : [110, 190, 255];
    for (const f of FACES) {
      const n: number[] = [0, 0, 0];
      n[f.a] = f.s;
      const nx = cell[0] + n[0];
      const ny = cell[1] + n[1];
      const nz = cell[2] + n[2];
      if (!inBounds(lvl, st.room, nx, ny, nz)) continue; // outside the room: never drawn
      if (isSolid(lvl, st.ctl, st.room, nx, ny, nz)) continue;
      const nv: V3 = [f.s * R[f.a], f.s * R[3 + f.a], f.s * R[6 + f.a]];
      const facing = nv[0] * DVIEW[0] + nv[1] * DVIEW[1] + nv[2] * DVIEW[2] < 0;
      const floor = n[0] === -down[0] && n[1] === -down[1] && n[2] === -down[2];
      const other = [(f.a + 1) % 3, (f.a + 2) % 3];
      const bit = f.s > 0 ? 1 << f.a : 0;
      ctx.beginPath();
      CYCLE.forEach(([p, q], i) => {
        const ci = bit | (p << other[0]) | (q << other[1]);
        if (i === 0) ctx.moveTo(sxs[ci], sys[ci]);
        else ctx.lineTo(sxs[ci], sys[ci]);
      });
      ctx.closePath();
      if (facing) {
        const b = Math.max(0, nv[0] * LIGHT[0] + nv[1] * LIGHT[1] + nv[2] * LIGHT[2]);
        let col: number[] = [base[0] * (0.5 + 0.9 * b), base[1] * (0.5 + 0.9 * b), base[2] * (0.55 + 0.9 * b)];
        if (floor && !isDoor) col = P.mix(col, P.CYAN, 0.2);
        ctx.fillStyle = P.rgba(col, 0.86 * alpha);
        ctx.fill();
        ctx.strokeStyle = P.rgba(floor ? P.CYAN : edge, (contrast ? 0.8 : floor ? 0.4 : 0.26) * Math.max(alpha, 0.3));
        ctx.lineWidth = contrast ? 1.6 : 1;
        ctx.stroke();
      } else {
        ctx.fillStyle = P.rgba(base, 0.1 * alpha);
        ctx.fill();
        ctx.strokeStyle = P.rgba(edge, (contrast ? 0.5 : 0.17) * Math.max(alpha, 0.3));
        ctx.lineWidth = 1;
        ctx.stroke();
      }
    }
  }

  private drawMarker(cv: V3, ok: boolean, hint: boolean, contrast: boolean): void {
    const { ctx, S } = this;
    const fy = cv[1] + 0.5;
    const pt = (dx: number, dz: number): [number, number] => [this.sx([cv[0] + dx, fy, cv[2] + dz]), this.sy([cv[0] + dx, fy, cv[2] + dz])];
    const pulse = 0.5 + 0.5 * Math.sin(this.time * 4);
    if (ok) {
      const r = 0.28 + (hint ? 0.1 * pulse : 0);
      const a = pt(-r, 0);
      const b = pt(0, -r);
      const c = pt(r, 0);
      const d = pt(0, r);
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
      ctx.lineTo(c[0], c[1]);
      ctx.lineTo(d[0], d[1]);
      ctx.closePath();
      ctx.fillStyle = P.rgba(hint ? P.PINK : P.CYAN, hint ? 0.5 : 0.14 + 0.08 * pulse);
      ctx.fill();
      ctx.strokeStyle = P.rgba(hint ? P.PINK : P.CYAN, contrast ? 1 : 0.75);
      ctx.lineWidth = hint ? 2.5 : 1.5;
      ctx.stroke();
    } else {
      const r = 0.15;
      const a = pt(-r, -r);
      const b = pt(r, r);
      const c = pt(-r, r);
      const d = pt(r, -r);
      ctx.strokeStyle = P.rgba(P.AMBER, contrast ? 0.95 : 0.5);
      ctx.lineWidth = 1.6;
      ctx.beginPath();
      ctx.moveTo(a[0], a[1]);
      ctx.lineTo(b[0], b[1]);
      ctx.moveTo(c[0], c[1]);
      ctx.lineTo(d[0], d[1]);
      ctx.stroke();
    }
    void S;
  }

  private drawPlayer(cv: V3): void {
    const { ctx, S } = this;
    const sxp = this.sx(cv);
    const base = this.sy(cv) + 0.48 * S;
    const sq = this.squash * 0.06;
    const bw = 0.2 * S * (1 + sq);
    const bh = 0.78 * S * (1 - sq);
    ctx.fillStyle = 'rgba(0,0,0,0.45)';
    ctx.beginPath();
    ctx.ellipse(sxp, base, 0.26 * S, 0.11 * S, 0, 0, Math.PI * 2);
    ctx.fill();
    const g = ctx.createRadialGradient(sxp, base - bh * 0.6, 2, sxp, base - bh * 0.6, S * 0.9);
    g.addColorStop(0, P.rgba(P.CYAN, 0.35));
    g.addColorStop(1, P.rgba(P.CYAN, 0));
    ctx.fillStyle = g;
    ctx.fillRect(sxp - S, base - bh - S * 0.4, S * 2, S * 2);
    ctx.fillStyle = P.rgba(P.CYAN, 0.95);
    ctx.beginPath();
    ctx.moveTo(sxp - bw, base);
    ctx.lineTo(sxp - bw, base - bh + bw);
    ctx.arc(sxp, base - bh + bw, bw, Math.PI, 0);
    ctx.lineTo(sxp + bw, base);
    ctx.closePath();
    ctx.fill();
    const fx = this.facing === 'right' ? 1 : this.facing === 'left' ? -1 : 0;
    ctx.fillStyle = P.INK;
    ctx.fillRect(sxp + fx * bw * 0.45 - 2, base - bh * 0.78, 4, 6);
  }

  private drawObject(o: GObj, x: number, y: number, f: Flags): void {
    const { ctx, S } = this;
    const bob = f.effects ? Math.sin(this.time * 2 + o.id) * 0.04 * S : 0;
    const st = this.state;
    const targeted = f.target === o.id || f.hover === o.id;
    const glow = (col: readonly number[], r: number, a: number): void => {
      const g = ctx.createRadialGradient(x, y, 1, x, y, r);
      g.addColorStop(0, P.rgba(col, a));
      g.addColorStop(1, P.rgba(col, 0));
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    };
    switch (o.kind) {
      case 'crystal': {
        if ((st.got >> (o.bit as number)) & 1) return;
        glow(P.AMBER, S * 0.7, 0.35);
        ctx.fillStyle = P.rgba(P.AMBER, 0.95);
        ctx.beginPath();
        ctx.moveTo(x, y - 0.32 * S + bob);
        ctx.lineTo(x + 0.17 * S, y + bob);
        ctx.lineTo(x, y + 0.32 * S + bob);
        ctx.lineTo(x - 0.17 * S, y + bob);
        ctx.closePath();
        ctx.fill();
        ctx.strokeStyle = 'rgba(255,255,255,0.7)';
        ctx.lineWidth = 1;
        ctx.stroke();
        break;
      }
      case 'shard': {
        if ((st.got >> (o.bit as number)) & 1) return;
        glow(P.PAPER, S * 0.6, 0.3);
        ctx.fillStyle = P.rgba(P.PAPER, 0.95);
        ctx.beginPath();
        ctx.moveTo(x, y - 0.25 * S + bob);
        ctx.lineTo(x + 0.17 * S, y + 0.16 * S + bob);
        ctx.lineTo(x - 0.17 * S, y + 0.16 * S + bob);
        ctx.closePath();
        ctx.fill();
        break;
      }
      case 'exit': {
        const open = crystalsLeft(this.level, st) === 0;
        const a = open ? 0.95 : 0.35;
        if (open) glow(P.AMBER, S * 0.9, 0.35 + (f.effects ? 0.15 * Math.sin(this.time * 3) : 0));
        ctx.strokeStyle = P.rgba(P.AMBER, a);
        ctx.lineWidth = 2.5;
        ctx.beginPath();
        ctx.ellipse(x, y - 0.05 * S, 0.3 * S, 0.4 * S, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(x, y - 0.05 * S, 0.18 * S, 0.26 * S, 0, 0, Math.PI * 2);
        ctx.stroke();
        if (!open) {
          ctx.beginPath();
          ctx.moveTo(x - 0.12 * S, y - 0.05 * S);
          ctx.lineTo(x + 0.12 * S, y - 0.05 * S);
          ctx.stroke();
        }
        break;
      }
      case 'portal': {
        const col = P.portalColor(o.ch);
        const al = o.secret ? 0.5 : 0.95;
        glow(col, S * 0.8, o.secret ? 0.15 : 0.3);
        ctx.strokeStyle = P.rgba(col, al);
        ctx.lineWidth = 2.5;
        ctx.setLineDash(o.secret ? [3, 4] : []);
        ctx.beginPath();
        ctx.ellipse(x, y - 0.05 * S, 0.27 * S, 0.4 * S, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        const ph = f.effects ? this.time * 1.5 : 0;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.ellipse(x, y - 0.05 * S, 0.15 * S, 0.27 * S, 0, ph, ph + Math.PI * 1.4);
        ctx.stroke();
        ctx.fillStyle = P.rgba(col, 0.95);
        ctx.font = `700 ${Math.max(9, 0.22 * S) | 0}px system-ui, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(o.secret ? '?' : o.ch.toUpperCase(), x, y - 0.05 * S);
        ctx.textBaseline = 'alphabetic';
        break;
      }
      case 'lever': {
        const kind = o.fold as FoldKind;
        ctx.fillStyle = P.rgba(P.PINK, 0.55);
        ctx.fillRect(x - 0.2 * S, y + 0.14 * S, 0.4 * S, 0.1 * S);
        const ang = kind === 'rollL' ? -0.6 : kind === 'rollR' ? 0.6 : 0;
        ctx.strokeStyle = P.rgba(P.PINK, 0.98);
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x, y + 0.16 * S);
        ctx.lineTo(x + Math.sin(ang) * 0.34 * S, y + 0.16 * S - Math.cos(ang) * 0.34 * S);
        ctx.stroke();
        ctx.fillStyle = P.rgba(P.PAPER, 0.95);
        ctx.font = `700 ${Math.max(10, 0.3 * S) | 0}px system-ui, sans-serif`;
        ctx.textAlign = 'center';
        const glyph = kind === 'rollL' ? '↺' : kind === 'rollR' ? '↻' : kind === 'pitchA' ? '↓' : '↑';
        ctx.fillText(glyph, x, y - 0.26 * S);
        break;
      }
      case 'switch': {
        const on = (st.ctl >> (o.bit as number)) & 1;
        ctx.fillStyle = P.rgba(on ? P.CYAN : P.PAPER, on ? 0.9 : 0.35);
        ctx.fillRect(x - 0.2 * S, y - 0.1 * S, 0.4 * S, 0.3 * S);
        ctx.fillStyle = P.INK;
        ctx.fillRect(x - 0.1 * S + (on ? 0.1 : -0.0) * S, y - 0.02 * S, 0.1 * S, 0.14 * S);
        break;
      }
      case 'plate': {
        const on = (st.ctl >> (o.bit as number)) & 1;
        ctx.fillStyle = P.rgba(on ? P.CYAN : P.PAPER, on ? 0.8 : 0.3);
        ctx.beginPath();
        ctx.ellipse(x, y + 0.2 * S, 0.3 * S, 0.12 * S, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.strokeStyle = P.rgba(on ? P.CYAN : P.PAPER, 0.8);
        ctx.lineWidth = 1.5;
        ctx.stroke();
        break;
      }
      default:
        break;
    }
    if (targeted) {
      ctx.strokeStyle = P.rgba(P.PAPER, 0.9);
      ctx.lineWidth = 1.5;
      ctx.setLineDash([4, 4]);
      ctx.lineDashOffset = f.effects ? -this.time * 12 : 0;
      ctx.beginPath();
      ctx.arc(x, y - 0.02 * S, 0.5 * S, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
    }
  }
}
