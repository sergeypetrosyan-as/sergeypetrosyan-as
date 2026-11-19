import type { Ctx, Instance } from '../core/types';

/** Rope Cut: a lantern hangs from ropes. Cut them in the right order and moment so it drops into the lamp bowl. */
interface Level { anchors: [number, number][]; start: [number, number]; lamp: { x: number; y: number; r: number }; stars: [number, number][] }
interface S { x: number; y: number; px: number; py: number; cut: boolean[]; got: boolean[]; status: 0 | 1 | 2; f: number }
const W = 360, H = 480, G = 900, LIVES = 3;
const LEVELS: Level[] = [
  { anchors: [[110, 60], [250, 60]], start: [180, 200], lamp: { x: 55, y: 400, r: 38 }, stars: [[158, 212], [120, 217], [80, 300]] },
  { anchors: [[60, 50], [180, 40], [300, 50]], start: [150, 190], lamp: { x: 285, y: 410, r: 40 }, stars: [[200, 240], [262, 262], [290, 340]] },
  { anchors: [[80, 40], [290, 40]], start: [130, 220], lamp: { x: 310, y: 420, r: 40 }, stars: [[180, 270], [250, 286], [300, 350]] },
];

export default function ropeCut(ctx: Ctx): Instance {
  const cv = ctx.canvas(W, H);
  let li = 0, lives = LIVES, score = 0, s: S = blank(0), lens: number[] = [], wait = 0, next: 'next' | 'retry' | null = null;
  function blank(i: number): S { const L = LEVELS[i]; return { x: L.start[0], y: L.start[1], px: L.start[0], py: L.start[1], cut: L.anchors.map(() => false), got: L.stars.map(() => false), status: 0, f: 0 }; }
  const clone = (a: S): S => ({ ...a, cut: a.cut.slice(), got: a.got.slice() });

  function phys(a: S): void {
    const L = LEVELS[li], hs = 1 / 120;
    for (let sub = 0; sub < 2; sub++) {
      const vx = (a.x - a.px) * 0.9995, vy = (a.y - a.py) * 0.9995;
      a.px = a.x; a.py = a.y; a.x += vx; a.y += vy + G * hs * hs;
      for (let it = 0; it < 3; it++) L.anchors.forEach((p, i) => {
        if (a.cut[i]) return;
        const dx = a.x - p[0], dy = a.y - p[1], d = Math.hypot(dx, dy);
        if (d > lens[i]) { a.x = p[0] + (dx * lens[i]) / d; a.y = p[1] + (dy * lens[i]) / d; }
      });
    }
    L.stars.forEach((p, i) => { if (!a.got[i] && Math.hypot(a.x - p[0], a.y - p[1]) < 22) a.got[i] = true; });
    if (a.y >= L.lamp.y) a.status = Math.abs(a.x - L.lamp.x) <= L.lamp.r ? 1 : 2;
    else if (a.y > H + 20 || a.x < -30 || a.x > W + 30) a.status = 2;
    a.f++;
  }
  function loadLevel(i: number): void {
    li = i; s = blank(i); wait = 0; next = null;
    lens = LEVELS[i].anchors.map((p) => Math.hypot(s.x - p[0], s.y - p[1]));
    hud(); draw();
  }
  function hud(): void { ctx.hud('Yard', `${li + 1}/${LEVELS.length}`); ctx.hud('Lanterns', lives); ctx.hud('Score', score); }
  /** The one player action: cut a rope. */
  function cutRope(i: number): boolean {
    if (ctx.finished || wait > 0 || s.status || i < 0 || i >= s.cut.length || s.cut[i]) return false;
    s.cut[i] = true; ctx.sfx('tap'); draw(); return true;
  }
  function update(): void {
    if (ctx.finished) return;
    if (wait > 0) { wait--; if (wait === 0) { if (next === 'next') loadLevel(li + 1); else loadLevel(li); } return; }
    phys(s);
    if (s.status === 1) {
      const gain = 100 + 50 * s.got.filter(Boolean).length; score += gain; ctx.sfx('good'); hud(); draw();
      if (li + 1 >= LEVELS.length) { ctx.sfx('win'); ctx.finish({ result: 'win', score, title: 'The lamp is lit', detail: `All ${LEVELS.length} yards done with ${lives} lanterns to spare.` }); }
      else { wait = 50; next = 'next'; }
    } else if (s.status === 2) {
      lives--; ctx.sfx('bad'); hud(); draw();
      if (lives <= 0) ctx.finish({ result: 'lose', score, title: 'Out of lanterns', detail: `The last lantern was lost in yard ${li + 1}.` });
      else { wait = 40; next = 'retry'; }
    }
  }
  function draw(): void {
    const g = cv.g, c = ctx.c, L = LEVELS[li];
    g.clearRect(0, 0, W, H); g.fillStyle = c.night; g.fillRect(0, 0, W, H);
    g.strokeStyle = c.ash; g.lineWidth = 1.5; g.setLineDash([3, 6]); g.beginPath();
    L.stars.forEach((p, i) => (i ? g.lineTo(p[0], p[1]) : g.moveTo(p[0], p[1]))); g.lineTo(L.lamp.x, L.lamp.y - 12); g.stroke(); g.setLineDash([]);
    L.stars.forEach((p, i) => { g.beginPath(); for (let k = 0; k < 10; k++) { const a = -Math.PI / 2 + (k * Math.PI) / 5, r = k % 2 ? 6 : 14; g.lineTo(p[0] + Math.cos(a) * r, p[1] + Math.sin(a) * r); } g.closePath(); g.fillStyle = s.got[i] ? c.dusk : c.rose; g.strokeStyle = c.bone; g.lineWidth = 1.5; g.fill(); g.stroke(); });
    const lp = L.lamp; g.fillStyle = c.saddle; g.strokeStyle = c.bone; g.lineWidth = 2.5; g.beginPath(); g.moveTo(lp.x - lp.r, lp.y); g.lineTo(lp.x + lp.r, lp.y); g.lineTo(lp.x + lp.r * 0.7, lp.y + 34); g.lineTo(lp.x - lp.r * 0.7, lp.y + 34); g.closePath(); g.fill(); g.stroke();
    g.fillStyle = c.bone; g.font = '700 14px sans-serif'; g.textAlign = 'center'; g.fillText('LAMP', lp.x, lp.y + 22);
    g.fillStyle = c.rose; g.beginPath(); g.moveTo(lp.x - 7, lp.y - 26); g.lineTo(lp.x + 7, lp.y - 26); g.lineTo(lp.x, lp.y - 14); g.fill();
    L.anchors.forEach((p, i) => {
      if (!s.cut[i]) {
        const d = Math.hypot(s.x - p[0], s.y - p[1]), sag = Math.max(0, lens[i] - d) * 0.9;
        g.strokeStyle = c.tan; g.lineWidth = 3; g.beginPath(); g.moveTo(p[0], p[1]); g.quadraticCurveTo((p[0] + s.x) / 2, (p[1] + s.y) / 2 + sag, s.x, s.y); g.stroke();
        const mx = p[0] + (s.x - p[0]) * 0.45, my = p[1] + (s.y - p[1]) * 0.45; g.fillStyle = c.bone; g.beginPath(); g.arc(mx, my, 11, 0, 7); g.fill();
        g.fillStyle = c.ink; g.font = '700 13px sans-serif'; g.fillText(String(i + 1), mx, my + 4.5);
      }
      g.fillStyle = c.umber; g.strokeStyle = c.bone; g.lineWidth = 2; g.beginPath(); g.arc(p[0], p[1], 7, 0, 7); g.fill(); g.stroke();
    });
    g.fillStyle = c.rose; g.globalAlpha = 0.25; g.beginPath(); g.arc(s.x, s.y, 26, 0, 7); g.fill(); g.globalAlpha = 1;
    g.fillStyle = c.bone; g.strokeStyle = c.ember; g.lineWidth = 2.5; g.beginPath(); g.arc(s.x, s.y, 12, 0, 7); g.fill(); g.stroke();
    g.fillStyle = c.red; g.beginPath(); g.arc(s.x, s.y, 5, 0, 7); g.fill();
    if (wait > 0) { g.fillStyle = c.bone; g.font = '700 22px sans-serif'; g.fillText(s.status === 1 ? 'Lit!' : 'Lost one', W / 2, H / 2); }
  }
  // swipe / tap to cut
  let last: { x: number; y: number } | null = null;
  const distSeg = (p: { x: number; y: number }, a: number[], b: number[]) => { const dx = b[0] - a[0], dy = b[1] - a[1], t = Math.max(0, Math.min(1, ((p.x - a[0]) * dx + (p.y - a[1]) * dy) / (dx * dx + dy * dy || 1))); return Math.hypot(p.x - a[0] - t * dx, p.y - a[1] - t * dy); };
  function slice(p: { x: number; y: number }, q: { x: number; y: number }): void {
    LEVELS[li].anchors.forEach((a, i) => { if (s.cut[i]) return; for (let k = 0; k <= 6; k++) { const m = { x: p.x + ((q.x - p.x) * k) / 6, y: p.y + ((q.y - p.y) * k) / 6 }; if (distSeg(m, a, [s.x, s.y]) < 14) { cutRope(i); return; } } });
  }
  ctx.on(cv.el, 'pointerdown', (e) => { last = cv.pt(e); slice(last, last); try { cv.el.setPointerCapture(e.pointerId); } catch { /* ignore */ } });
  ctx.on(cv.el, 'pointermove', (e) => { if (!last) return; const p = cv.pt(e); slice(last, p); last = p; });
  ctx.on(cv.el, 'pointerup', () => { last = null; });
  ctx.on(cv.el, 'pointercancel', () => { last = null; });
  ctx.keys({ '1': (d) => d && cutRope(0), '2': (d) => d && cutRope(1), '3': (d) => d && cutRope(2) });
  ctx.pad([{ key: '1', label: 'Cut 1' }, { key: '2', label: 'Cut 2' }, { key: '3', label: 'Cut 3' }]);
  ctx.loop(update, draw);

  /** Bot: search cut moments on a copy of the physics, then play them through cutRope. */
  function solve(): { f: number; i: number }[] | null {
    let budget = 900000;
    const adv = (a: S, n: number): void => { for (let k = 0; k < n && !a.status; k++) { phys(a); budget--; } };
    const rec = (st: S, f0: number, cuts: { f: number; i: number }[]): { f: number; i: number }[] | null => {
      for (let k = f0; k <= 220 && budget > 0 && !st.status; k += 3) {
        for (let i = 0; i < st.cut.length; i++) {
          if (st.cut[i]) continue;
          const c = clone(st); c.cut[i] = true; const plan = [...cuts, { f: k, i }];
          if (c.cut.every(Boolean)) { adv(c, 400); if (c.status === 1) return plan; } else { const r = rec(c, k, plan); if (r) return r; }
        }
        adv(st, 3);
      }
      return null;
    };
    return rec(clone(s), 0, []);
  }
  return {
    destroy() {},
    reset(seed) { void seed; lives = LIVES; score = 0; loadLevel(0); },
    probe: () => ({ level: li, lives, score, cut: s.cut.join(','), f: Math.floor(s.f / 20) }),
    play(kind) {
      for (let g = 0; g < 4000 && !ctx.finished; g++) {
        if (wait > 0 || s.status) { update(); continue; }
        if (kind === 'lose') { s.cut.forEach((_, i) => cutRope(i)); update(); continue; }
        const plan = solve(); const f0 = s.f;
        if (!plan) { s.cut.forEach((_, i) => cutRope(i)); continue; }
        const y = li;
        for (let k = 0; k < 400 && !ctx.finished && li === y && !s.status; k++) { plan.filter((p) => p.f === s.f - f0).forEach((p) => cutRope(p.i)); update(); }
      }
    },
  };
}
