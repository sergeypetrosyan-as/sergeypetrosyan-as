import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Comet Sling: drag back from the comet and let go. Planets bend its path; hit the star target before you run out of launches. */
const W = 480, H = 640, G = 2300, SUB = 3, START = { x: 70, y: 560 }, MAX_PULL = 100, POWER = 4.4;
interface Planet { x: number; y: number; r: number }
const LEVELS: { par: number; target: { x: number; y: number; r: number }; planets: Planet[] }[] = [
  { par: 2, target: { x: 400, y: 120, r: 22 }, planets: [{ x: 260, y: 340, r: 34 }] },
  { par: 3, target: { x: 410, y: 90, r: 20 }, planets: [{ x: 220, y: 400, r: 32 }, { x: 340, y: 230, r: 30 }] },
  { par: 3, target: { x: 90, y: 90, r: 20 }, planets: [{ x: 190, y: 320, r: 40 }, { x: 360, y: 430, r: 30 }, { x: 330, y: 140, r: 26 }] },
];
const EXTRA = 2;

type End = 'hit' | 'burn' | 'lost' | null;
function accel(ps: Planet[], x: number, y: number): [number, number] {
  let ax = 0, ay = 0;
  for (const p of ps) { const dx = p.x - x, dy = p.y - y, d2 = dx * dx + dy * dy + 400, k = (G * p.r * p.r) / (d2 * Math.sqrt(d2)); ax += dx * k; ay += dy * k; }
  return [ax, ay];
}
/** One physics sub-step. Pure on its arguments; the live game and the aim preview share it. */
function advance(L: (typeof LEVELS)[number], s: { x: number; y: number; vx: number; vy: number }, dt: number): End {
  const [ax, ay] = accel(L.planets, s.x, s.y);
  s.vx += ax * dt; s.vy += ay * dt; s.x += s.vx * dt; s.y += s.vy * dt;
  if (Math.hypot(s.x - L.target.x, s.y - L.target.y) < L.target.r + 6) return 'hit';
  if (L.planets.some((p) => Math.hypot(s.x - p.x, s.y - p.y) < p.r + 4)) return 'burn';
  if (s.x < -30 || s.x > W + 30 || s.y < -30 || s.y > H + 30) return 'lost';
  return null;
}

export default function cometSling(ctx: Ctx): Instance {
  const cv = ctx.canvas(W, H), g = cv.g;
  let rand = makeRng(1), stars: [number, number, number][] = [];
  let lvl = 0, used = 0, score = 0, pull: { x: number; y: number } | null = null, dragging = false;
  let comet = { x: START.x, y: START.y, vx: 0, vy: 0 }, flying = false, wait = -1, ft = 0, trail: [number, number][] = [], won = false, msg = '', fired = false;
  const L = (): (typeof LEVELS)[number] => LEVELS[lvl];
  const limit = (): number => L().par + EXTRA;

  function hud(): void { ctx.hud('Sling', `${lvl + 1}/${LEVELS.length}`); ctx.hud('Launches left', limit() - used); ctx.hud('Par', L().par); }
  /** The one action: launch the comet with a velocity (what a drag-back release produces). */
  function launch(vx: number, vy: number): void {
    if (ctx.finished || flying || wait >= 0) return;
    used++; fired = true; comet = { x: START.x, y: START.y, vx, vy }; flying = true; ft = 0; trail = []; msg = ''; ctx.sfx('tap'); hud();
  }
  function endShot(e: Exclude<End, null>): void {
    flying = false; wait = 0;
    if (e === 'hit') { won = true; score += 300 + Math.max(0, L().par + 1 - used) * 100; ctx.sfx('good'); msg = used <= L().par ? 'Under par!' : 'Hit!'; }
    else { won = false; ctx.sfx('bad'); msg = e === 'burn' ? 'Burned up on a planet.' : 'Lost in the dark.'; }
  }
  function update(dt: number): void {
    if (ctx.finished) return;
    if (flying) {
      ft += dt;
      for (let i = 0; i < SUB && flying; i++) { const e = advance(L(), comet, dt / SUB); if (e) endShot(e); }
      if (flying && ft > 12) endShot('lost');
      if (flying && Math.floor(ft * 60) % 2 === 0) { trail.push([comet.x, comet.y]); if (trail.length > 60) trail.shift(); }
    } else if (wait >= 0) {
      wait += dt;
      if (wait > 0.9) {
        wait = -1;
        if (won) {
          lvl++;
          if (lvl >= LEVELS.length) { lvl = LEVELS.length - 1; ctx.finish({ result: 'win', score, title: 'Bullseye, three times', detail: 'You slung the comet through all three skies.' }); return; }
          used = 0; won = false; msg = '';
        } else if (used >= limit()) { ctx.finish({ result: 'lose', score, title: 'Out of comets', detail: `All ${limit()} launches spent on sling ${lvl + 1}. Let a planet bend the path.` }); return; }
        comet = { x: START.x, y: START.y, vx: 0, vy: 0 }; trail = []; hud();
      }
    }
  }
  /** Where would a pull of (px,py) go? First second or so of flight, for the aim guide. */
  function preview(vx: number, vy: number): [number, number][] {
    const s = { x: START.x, y: START.y, vx, vy }, pts: [number, number][] = [];
    for (let i = 0; i < 70 * SUB; i++) { if (advance(L(), s, 1 / 60 / SUB)) break; if (i % SUB === 0) pts.push([s.x, s.y]); }
    return pts;
  }
  const star = (x: number, y: number, r: number): void => { g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, rr = i % 2 ? r * 0.45 : r; g.lineTo(x + Math.cos(a) * rr, y + Math.sin(a) * rr); } g.closePath(); };
  function draw(): void {
    const c = ctx.c, lv = L();
    const bg = g.createLinearGradient(0, 0, 0, H); bg.addColorStop(0, c.night); bg.addColorStop(1, c.dusk); g.fillStyle = bg; g.fillRect(0, 0, W, H);
    g.fillStyle = c.bone; for (const [x, y, a] of stars) { g.globalAlpha = a; g.fillRect(x, y, 2, 2); } g.globalAlpha = 1;
    // mesa horizon with the launch plateau
    g.fillStyle = c.mesa; g.beginPath(); g.moveTo(0, H); g.lineTo(0, 580); g.lineTo(20, 580); g.lineTo(30, 575); g.lineTo(130, 575); g.lineTo(140, 590); g.lineTo(200, 590); g.lineTo(215, 610); g.lineTo(330, 610); g.lineTo(345, 595); g.lineTo(480, 595); g.lineTo(480, H); g.closePath(); g.fill();
    g.strokeStyle = c.ember; g.lineWidth = 2; g.stroke();
    // planets and their gravity wells
    for (const p of lv.planets) {
      g.strokeStyle = c.saddle; g.globalAlpha = 0.55; g.lineWidth = 1.5; g.setLineDash([4, 6]);
      for (const k of [1.9, 2.8]) { g.beginPath(); g.arc(p.x, p.y, p.r * k, 0, 7); g.stroke(); }
      g.setLineDash([]); g.globalAlpha = 1; g.fillStyle = c.wine; g.strokeStyle = c.ember; g.lineWidth = 3; g.beginPath(); g.arc(p.x, p.y, p.r, 0, 7); g.fill(); g.stroke();
      g.strokeStyle = c.saddle; g.lineWidth = 1; g.beginPath(); g.arc(p.x, p.y, p.r * 0.6, 0, 7); g.stroke(); g.beginPath(); g.moveTo(p.x - p.r, p.y); g.lineTo(p.x + p.r, p.y); g.stroke();
    }
    // target star
    const t = lv.target; g.strokeStyle = c.rose; g.lineWidth = 2; g.setLineDash([3, 5]); g.beginPath(); g.arc(t.x, t.y, t.r + 10, 0, 7); g.stroke(); g.setLineDash([]);
    g.fillStyle = c.rose; g.strokeStyle = c.bone; g.lineWidth = 2; star(t.x, t.y, t.r + 4); g.fill(); g.stroke();
    // aim
    if (dragging && pull && !flying) {
      const pts = preview(pull.x * POWER, pull.y * POWER);
      g.fillStyle = c.bone; pts.forEach(([x, y], i) => { if (i % 2 === 0) { g.globalAlpha = 1 - i / pts.length; g.beginPath(); g.arc(x, y, 2.5, 0, 7); g.fill(); } }); g.globalAlpha = 1;
      g.strokeStyle = c.rose; g.lineWidth = 3; g.beginPath(); g.moveTo(START.x, START.y); g.lineTo(START.x - pull.x, START.y - pull.y); g.stroke();
      g.fillStyle = c.ember; g.beginPath(); g.arc(START.x - pull.x, START.y - pull.y, 8, 0, 7); g.fill();
    }
    // comet
    if (trail.length) { g.strokeStyle = c.rose; g.lineWidth = 3; g.globalAlpha = 0.7; g.beginPath(); trail.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.stroke(); g.globalAlpha = 1; }
    if (!(wait >= 0 && !won)) { g.fillStyle = c.bone; g.strokeStyle = c.red; g.lineWidth = 3; g.beginPath(); g.arc(comet.x, comet.y, 9, 0, 7); g.fill(); g.stroke(); }
    g.font = '700 15px sans-serif'; g.textAlign = 'center'; g.fillStyle = c.bone;
    if (msg) g.fillText(msg, W / 2, 40);
    else if (!fired && lvl === 0) { g.fillStyle = c.smoke; g.fillText('Drag back from the comet, then let go', W / 2, 40); }
    g.fillStyle = c.ash; g.font = '600 12px sans-serif'; g.fillText('dashed rings: gravity wells', W / 2, H - 12);
  }
  const clampPull = (x: number, y: number): { x: number; y: number } => { const dx = START.x - x, dy = START.y - y, d = Math.hypot(dx, dy) || 1, k = Math.min(1, MAX_PULL / d); return { x: dx * k, y: dy * k }; };
  ctx.on(cv.el, 'pointerdown', (e: PointerEvent) => {
    if (flying || wait >= 0 || ctx.finished) return;
    const p = cv.pt(e); if (Math.hypot(p.x - START.x, p.y - START.y) > 150) return;
    dragging = true; pull = clampPull(p.x, p.y); cv.el.setPointerCapture(e.pointerId);
  });
  ctx.on(cv.el, 'pointermove', (e: PointerEvent) => { if (dragging) { const p = cv.pt(e); pull = clampPull(p.x, p.y); } });
  const release = (): void => { if (!dragging) return; dragging = false; if (pull && Math.hypot(pull.x, pull.y) > 14) launch(pull.x * POWER, pull.y * POWER); pull = null; };
  ctx.on(cv.el, 'pointerup', release); ctx.on(cv.el, 'pointercancel', () => { dragging = false; pull = null; });
  ctx.loop(update, draw);

  /** Bot helper: search aims with the real physics until one hits (or misses on request). */
  function search(wantHit: boolean): [number, number] {
    for (const pw of [60, 75, 90, 100, 45]) for (let a = 0; a < 360; a += 2) {
      const vx = Math.cos((a * Math.PI) / 180) * pw * POWER, vy = Math.sin((a * Math.PI) / 180) * pw * POWER, s = { x: START.x, y: START.y, vx, vy };
      let r: End = null; for (let i = 0; i < 12 * 60 * SUB && !r; i++) r = advance(L(), s, 1 / 60 / SUB);
      if (wantHit ? r === 'hit' : r === 'lost') return [vx, vy];
    }
    return [-200, 0];
  }
  return {
    destroy() {},
    reset(seed) {
      rand = makeRng(seed); stars = Array.from({ length: 70 }, () => [rand() * W, rand() * 560, 0.2 + rand() * 0.4]);
      lvl = 0; used = 0; score = 0; pull = null; dragging = false; flying = false; wait = -1; won = false; msg = ''; fired = false; trail = [];
      comet = { x: START.x, y: START.y, vx: 0, vy: 0 }; hud();
    },
    probe: () => ({ lvl, used, flying, score, x: Math.round(comet.x), y: Math.round(comet.y) }),
    play(kind: Result) {
      for (let guard = 0; guard < 30000 && !ctx.finished; guard++) {
        if (!flying && wait < 0) { const [vx, vy] = search(kind === 'win'); launch(vx, vy); }
        update(1 / 60);
      }
    },
  };
}
