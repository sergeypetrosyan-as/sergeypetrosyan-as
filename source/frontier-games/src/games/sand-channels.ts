import { makeRng } from '../core/rng';
import type { Ctx, Instance } from '../core/types';

/** Sand Channels: draw a few ledges, release the sand, and steer enough grains into every cup. Three levels. */
const W = 480, H = 640, CUPY = 540, GRAV = 620, R = 5, MAXLEN = 150;
interface Seg { ax: number; ay: number; bx: number; by: number }
interface Cup { x: number; w: number }
interface Level { hx: number; cups: Cup[]; ledges: number; grains: number; quota: number; rocks: Seg[] }
interface Grain { x: number; y: number; vx: number; vy: number; still: number }
interface World { gs: Grain[]; emitted: number; count: number[]; lost: number; tick: number; rand: () => number }

const LEVELS: Level[] = [
  { hx: 240, cups: [{ x: 85, w: 110 }, { x: 395, w: 110 }], ledges: 3, grains: 80, quota: 22, rocks: [] },
  { hx: 240, cups: [{ x: 70, w: 110 }, { x: 240, w: 110 }, { x: 410, w: 110 }], ledges: 4, grains: 80, quota: 15, rocks: [] },
  { hx: 240, cups: [{ x: 70, w: 110 }, { x: 240, w: 110 }, { x: 410, w: 110 }], ledges: 3, grains: 80, quota: 14, rocks: [{ ax: 190, ay: 240, bx: 290, by: 268 }] },
];

function stepWorld(w: World, L: Level, ledges: Seg[]): void {
  w.tick++;
  if (w.emitted < L.grains && w.tick % 2 === 0) { w.gs.push({ x: L.hx + (w.rand() - 0.5) * 56, y: 58, vx: (w.rand() - 0.5) * 24, vy: 30, still: 0 }); w.emitted++; }
  const dt = 1 / 120;
  for (let i = w.gs.length - 1; i >= 0; i--) {
    const g = w.gs[i]; let gone = false;
    for (let s = 0; s < 2 && !gone; s++) {
      g.vy += GRAV * dt; g.x += g.vx * dt; g.y += g.vy * dt;
      for (const seg of ledges.concat(L.rocks)) {
        const dx = seg.bx - seg.ax, dy = seg.by - seg.ay, l2 = dx * dx + dy * dy || 1;
        const t = Math.max(0, Math.min(1, ((g.x - seg.ax) * dx + (g.y - seg.ay) * dy) / l2)), cx = seg.ax + t * dx, cy = seg.ay + t * dy;
        let nx = g.x - cx, ny = g.y - cy; const d = Math.hypot(nx, ny);
        if (d >= R) continue;
        if (d < 1e-4) { const l = Math.sqrt(l2); nx = dy / l; ny = -dx / l; if (ny > 0) { nx = -nx; ny = -ny; } } else { nx /= d; ny /= d; }
        g.x = cx + nx * R; g.y = cy + ny * R;
        const vn = g.vx * nx + g.vy * ny;
        if (vn < 0) { g.vx -= 1.12 * vn * nx; g.vy -= 1.12 * vn * ny; }
        { const vt = g.vx * -ny + g.vy * nx; g.vx += vt * ny * 0.03; g.vy -= vt * nx * 0.03; } g.vx += (w.rand() - 0.5) * 4;
      }
      if (g.y >= CUPY) {
        const k = L.cups.findIndex((c) => Math.abs(g.x - c.x) <= c.w / 2);
        if (k >= 0) w.count[k]++; else w.lost++;
        gone = true;
      } else if (g.x < -10 || g.x > W + 10) { w.lost++; gone = true; }
    }
    g.still = Math.hypot(g.vx, g.vy) < 12 ? g.still + 1 / 60 : 0;
    if (!gone && g.still > 1.2) { w.lost++; gone = true; }
    if (gone) w.gs.splice(i, 1);
  }
}
const newWorld = (L: Level, seed: number): World => ({ gs: [], emitted: 0, count: L.cups.map(() => 0), lost: 0, tick: 0, rand: makeRng(seed) });
const cleared = (w: World, L: Level): boolean => w.count.every((n) => n >= L.quota);
const finished = (w: World, L: Level): boolean => w.emitted >= L.grains && w.gs.length === 0;

export default function sandChannels(ctx: Ctx): Instance {
  const cv = ctx.canvas(W, H), g = cv.g, c = ctx.c;
  let lv = 0, L = LEVELS[0], ledges: Seg[] = [], phase: 'draw' | 'run' | 'clear' = 'draw', w = newWorld(L, 1), seed = 1, timer = 0, spare = 0, preview: Seg | null = null, banner = '';
  const seedFor = (): number => seed * 131 + lv * 17 + 5;

  function hud(): void { ctx.hud('Level', `${lv + 1}/${LEVELS.length}`); ctx.hud('Ledges left', L.ledges - ledges.length); ctx.hud('Per cup', L.quota); }
  function start(i: number): void { lv = i; L = LEVELS[i]; ledges = []; phase = 'draw'; w = newWorld(L, seedFor()); preview = null; banner = 'Drag on the map to draw ledges, then release the sand.'; hud(); }
  /** Draw one ledge from (ax,ay) to (bx,by); long strokes are cut to the maximum length. */
  function addLedge(ax: number, ay: number, bx: number, by: number): boolean {
    if (phase !== 'draw' || ctx.finished || ledges.length >= L.ledges) return false;
    const d = Math.hypot(bx - ax, by - ay); if (d < 24) return false;
    const k = Math.min(1, MAXLEN / d); ledges.push({ ax: Math.max(10, Math.min(470, ax)), ay: Math.max(100, Math.min(520, ay)), bx: Math.max(10, Math.min(470, ax + (bx - ax) * k)), by: Math.max(100, Math.min(520, ay + (by - ay) * k)) });
    ctx.sfx('tap'); hud(); return true;
  }
  function undo(): void { if (phase === 'draw' && ledges.length) { ledges.pop(); ctx.sfx('tick'); hud(); } }
  function release(): void { if (phase !== 'draw' || ctx.finished) return; phase = 'run'; w = newWorld(L, seedFor()); banner = 'Sand is running...'; ctx.sfx('good'); }
  function update(): void {
    if (ctx.finished) return;
    if (phase === 'run') {
      stepWorld(w, L, ledges);
      if (cleared(w, L)) {
        spare += L.ledges - ledges.length;
        if (lv === LEVELS.length - 1) { phase = 'clear'; ctx.sfx('win'); ctx.finish({ result: 'win', score: 500 + spare * 60, title: 'Every cup is full', detail: `All ${LEVELS.length} levels filled with ${spare} spare ledge${spare === 1 ? '' : 's'}.` }); }
        else { phase = 'clear'; timer = 70; banner = 'Cups full. Next level...'; ctx.sfx('good'); }
      } else if (finished(w, L)) {
        ctx.sfx('lose'); phase = 'clear';
        ctx.finish({ result: 'lose', score: lv * 100 + w.count.reduce((a, b) => a + b, 0), title: 'The sand slipped away', detail: `Level ${lv + 1}: cups held ${w.count.join(', ')} of ${L.quota} grains each.` });
      }
    } else if (phase === 'clear' && !ctx.finished && --timer <= 0) start(lv + 1);
  }

  function bar(x: number, y: number, ww: number, hh: number, f: number, col: string): void { g.fillStyle = c.ink; g.fillRect(x, y, ww, hh); g.fillStyle = col; g.fillRect(x, y + hh * (1 - Math.min(1, f)), ww, hh * Math.min(1, f)); }
  function draw(): void {
    g.fillStyle = c.night; g.fillRect(0, 0, W, H);
    g.fillStyle = c.umber; g.fillRect(0, CUPY + 64, W, H);
    // hopper
    g.fillStyle = c.saddle; g.strokeStyle = c.tan; g.lineWidth = 3; g.beginPath(); g.moveTo(L.hx - 36, 14); g.lineTo(L.hx + 36, 14); g.lineTo(L.hx + 8, 54); g.lineTo(L.hx - 8, 54); g.closePath(); g.fill(); g.stroke();
    // cups: outline, quota star, fill meter and count
    L.cups.forEach((cup, i) => {
      const x0 = cup.x - cup.w / 2, n = w.count[i];
      bar(x0 + 4, CUPY + 4, cup.w - 8, 60, n / L.quota, n >= L.quota ? c.rose : c.tan);
      g.strokeStyle = n >= L.quota ? c.rose : c.bone; g.lineWidth = 4; g.beginPath(); g.moveTo(x0, CUPY - 14); g.lineTo(x0, CUPY + 64); g.lineTo(x0 + cup.w, CUPY + 64); g.lineTo(x0 + cup.w, CUPY - 14); g.stroke();
      g.fillStyle = c.bone; g.font = `700 20px ${getComputedStyle(document.body).fontFamily}`; g.textAlign = 'center'; g.fillText(`${n}/${L.quota}`, cup.x, CUPY - 24);
    });
    // rocks: hatched, grey-brown, clearly not drawable
    for (const r of L.rocks) { g.strokeStyle = c.mesa; g.lineWidth = 14; g.lineCap = 'round'; g.beginPath(); g.moveTo(r.ax, r.ay); g.lineTo(r.bx, r.by); g.stroke(); g.strokeStyle = c.ink; g.lineWidth = 2; g.setLineDash([3, 8]); g.beginPath(); g.moveTo(r.ax, r.ay); g.lineTo(r.bx, r.by); g.stroke(); g.setLineDash([]); }
    for (const s of ledges) { g.strokeStyle = c.bone; g.lineWidth = 8; g.lineCap = 'round'; g.beginPath(); g.moveTo(s.ax, s.ay); g.lineTo(s.bx, s.by); g.stroke(); g.fillStyle = c.rose; g.beginPath(); g.arc(s.bx, s.by, 3, 0, 7); g.fill(); }
    if (preview) { g.strokeStyle = c.rose; g.lineWidth = 5; g.setLineDash([8, 8]); g.beginPath(); g.moveTo(preview.ax, preview.ay); g.lineTo(preview.bx, preview.by); g.stroke(); g.setLineDash([]); }
    g.fillStyle = c.tan; for (const p of w.gs) { g.beginPath(); g.arc(p.x, p.y, 3.2, 0, 7); g.fill(); }
    g.fillStyle = c.ash; g.font = `600 16px ${getComputedStyle(document.body).fontFamily}`; g.textAlign = 'center'; g.fillText(banner, W / 2, 92);
  }
  let down: { x: number; y: number } | null = null;
  const clampEnd = (a: { x: number; y: number }, p: { x: number; y: number }): Seg => { const d = Math.hypot(p.x - a.x, p.y - a.y), k = d > MAXLEN ? MAXLEN / d : 1; return { ax: a.x, ay: a.y, bx: a.x + (p.x - a.x) * k, by: a.y + (p.y - a.y) * k }; };
  ctx.on(cv.el, 'pointerdown', (e: PointerEvent) => { if (phase !== 'draw') return; down = cv.pt(e); cv.el.setPointerCapture?.(e.pointerId); });
  ctx.on(cv.el, 'pointermove', (e: PointerEvent) => { if (down) preview = clampEnd(down, cv.pt(e)); });
  ctx.on(cv.el, 'pointerup', (e: PointerEvent) => { if (!down) return; const s = clampEnd(down, cv.pt(e)); down = null; preview = null; addLedge(s.ax, s.ay, s.bx, s.by); });
  ctx.keys({ z: (d) => d && undo(), Backspace: (d) => d && undo(), ' ': (d) => d && release(), Enter: (d) => d && release() });
  ctx.pad([{ key: 'z', label: 'Undo ledge' }, { key: ' ', label: 'Release sand', wide: true }]);
  ctx.loop(update, draw);

  /** Test bot: search random ledge layouts in the same simulation the game runs, then draw the one that fills every cup. */
  function solve(): boolean {
    const pr = makeRng(4242 + lv);
    const rnd = (): Seg => { const cx = 40 + pr() * 400, cy = 120 + pr() * 380, len = 70 + pr() * 80, a = (12 + pr() * 55) * (pr() < 0.5 ? -1 : 1) * Math.PI / 180; return { ax: cx - Math.cos(a) * len / 2, ay: cy - Math.sin(a) * len / 2, bx: cx + Math.cos(a) * len / 2, by: cy + Math.sin(a) * len / 2 }; };
    const run = (cand: Seg[]): [number, boolean] => { if (cand.some((s) => [s.ay, s.by].some((v) => v < 100 || v > 520) || [s.ax, s.bx].some((v) => v < 10 || v > 470))) return [-1, false]; const t = newWorld(L, seedFor()); for (let f = 0; f < 1100 && !cleared(t, L) && !finished(t, L) && t.lost <= L.grains - L.quota * L.cups.length; f++) stepWorld(t, L, cand); return [t.count.reduce((s, n) => s + Math.min(n, L.quota), 0), cleared(t, L)]; };
    for (let r = 0; r < 40; r++) {
      const roof = (): Seg[] => { const a = (14 + pr() * 22) * Math.PI / 180, l1 = 80 + pr() * 70, l2 = 80 + pr() * 70, y = 150 + pr() * 80; return [{ ax: L.hx - 3, ay: y, bx: L.hx - 3 - Math.cos(a) * l1, by: y + Math.sin(a) * l1 }, { ax: L.hx + 3, ay: y, bx: L.hx + 3 + Math.cos(a) * l2, by: y + Math.sin(a) * l2 }]; };
      let cur = r % 2 ? Array.from({ length: L.ledges }, rnd) : roof().concat(Array.from({ length: L.ledges - 2 }, rnd)), [sc, ok] = run(cur); if (sc < 0) { sc = -1; }
      for (let i = 0; i < 90 && !ok; i++) {
        const nx = cur.map((s) => ({ ...s })), k = Math.floor(pr() * nx.length), s = nx[k], m = pr();
        if (m < 0.2) nx[k] = rnd(); else { const dx = (pr() - 0.5) * 50, dy = (pr() - 0.5) * 50, rot = (pr() - 0.5) * 0.5, mx = (s.ax + s.bx) / 2, my = (s.ay + s.by) / 2, hx = (s.bx - s.ax) / 2, hy = (s.by - s.ay) / 2; const co = Math.cos(rot), si = Math.sin(rot); nx[k] = { ax: mx + dx - (hx * co - hy * si), ay: my + dy - (hx * si + hy * co), bx: mx + dx + (hx * co - hy * si), by: my + dy + (hx * si + hy * co) }; }
        const [s2, ok2] = run(nx); if (s2 >= sc) { cur = nx; sc = s2; ok = ok2; }
      }
      if (ok) { for (const s of cur) addLedge(s.ax, s.ay, s.bx, s.by); return true; }
    }
    return false;
  }
  return {
    destroy() { /* released by the shell */ },
    reset(s) { seed = s; spare = 0; start(0); },
    probe: () => ({ lv, phase, ledges: ledges.map((l) => [l.ax, l.ay, l.bx, l.by].map(Math.round).join(',')).join(';'), count: w.count.join(',') }),
    play(kind) {
      for (let guard = 0; guard < 20000 && !ctx.finished; guard++) {
        if (phase === 'draw') { if (kind === 'win') solve(); release(); }
        update();
      }
    },
  };
}
