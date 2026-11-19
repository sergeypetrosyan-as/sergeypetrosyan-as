import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Gatling Gallery: bullets take time to fly, so lead the red outlaws, spare the townsfolk, and mind the ammo. */
const W = 480, H = 640, GX = 240, GY = 596, SPEED = 540;
const LANES = [210, 310, 410], CHAMBER = 6, RESERVE = 24, RELOAD = 1.1, TIME = 45, GOAL = 1000, MAX_STRIKES = 3;

interface T { id: number; x: number; y: number; vx: number; bad: boolean; alive: boolean; born: number }
interface Bu { x: number; y: number; vx: number; vy: number }
interface Fl { x: number; y: number; txt: string; ttl: number; hot: boolean }

export default function gatlingGallery(ctx: Ctx): Instance {
  const cv = ctx.canvas(W, H);
  const g = cv.g, c = ctx.c;
  let rand = makeRng(1);
  let ts: T[] = [], bs: Bu[] = [], fl: Fl[] = [];
  let ammo = CHAMBER, reserve = RESERVE, rel = 0, time = TIME, el = 0, spawn = 0.4, nid = 0;
  let bounty = 0, strikes = 0, shots = 0, hits = 0, spin = 0, aimX = 240, aimY = 300, kick = 0;

  const RELOAD_BOX = { x: 346, y: 560, w: 124, h: 68 };
  const cy = (t: T) => t.y - 24;
  function hud(): void { ctx.hud('Bounty', `$${bounty} / ${GOAL}`); ctx.hud('Time', Math.ceil(Math.max(0, time))); ctx.hud('Ammo', `${ammo} + ${reserve}`); ctx.hud('Strikes', `${strikes}/${MAX_STRIKES}`); }
  function over(win: boolean, title: string, detail: string): void {
    ctx.finish({ result: win ? 'win' : 'lose', score: Math.max(0, bounty) + (win ? (ammo + reserve) * 10 + Math.ceil(time) * 5 : 0), title, detail });
  }
  function reload(): void {
    if (ctx.finished || rel > 0 || ammo >= CHAMBER || reserve <= 0) return;
    rel = RELOAD; ctx.sfx('tick');
  }
  /** The one player action: fire toward a point. */
  function fire(x: number, y: number): void {
    if (ctx.finished || rel > 0) return;
    if (ammo <= 0) { if (reserve > 0) reload(); return; }
    const dx = x - GX, dy = y - GY, d = Math.hypot(dx, dy) || 1;
    bs.push({ x: GX + (dx / d) * 40, y: GY + (dy / d) * 40, vx: (dx / d) * SPEED, vy: (dy / d) * SPEED });
    ammo--; shots++; spin += 0.9; kick = 6; ctx.sfx('tap'); hud();
  }
  const struck = (b: Bu, t: T) => Math.hypot(b.x - t.x, b.y - cy(t)) < 24;
  function popup(x: number, y: number, txt: string, hot: boolean): void { fl.push({ x, y, txt, ttl: 1, hot }); }
  function update(dt: number): void {
    if (ctx.finished) return;
    el += dt; time -= dt;
    const held = ctx.held;
    if (held.has('ArrowLeft')) aimX = Math.max(10, aimX - 260 * dt);
    if (held.has('ArrowRight')) aimX = Math.min(W - 10, aimX + 260 * dt);
    if (held.has('ArrowUp')) aimY = Math.max(120, aimY - 260 * dt);
    if (held.has('ArrowDown')) aimY = Math.min(540, aimY + 260 * dt);
    if (rel > 0) { rel -= dt; if (rel <= 0) { const n = Math.min(CHAMBER - ammo, reserve); ammo += n; reserve -= n; rel = 0; hud(); } }
    kick = Math.max(0, kick - dt * 30); spin *= 0.94;
    spawn -= dt;
    if (spawn <= 0) {
      spawn = Math.max(0.55, 1.15 - el * 0.012) * (0.75 + rand() * 0.5);
      const lane = Math.floor(rand() * 3), dir = rand() < 0.5 ? 1 : -1, sp = (80 + rand() * 60 + lane * 14) * (1 + el / 80);
      ts.push({ id: nid++, x: dir > 0 ? -30 : W + 30, y: LANES[lane], vx: dir * sp, bad: rand() < 0.68, alive: true, born: el });
    }
    ts.forEach((t) => { t.x += t.vx * dt; });
    ts = ts.filter((t) => t.alive && t.x > -60 && t.x < W + 60);
    for (const b of bs) {
      for (let k = 0; k < 2; k++) {
        b.x += (b.vx * dt) / 2; b.y += (b.vy * dt) / 2;
        const t = ts.find((q) => q.alive && struck(b, q));
        if (t) {
          t.alive = false; b.x = -999; hits++;
          if (t.bad) { bounty += 100; popup(t.x, cy(t), '+$100', false); ctx.sfx('good'); } else { strikes++; bounty = Math.max(0, bounty - 100); popup(t.x, cy(t), 'Townsfolk! -$100', true); ctx.sfx('bad'); }
          hud(); break;
        }
      }
    }
    bs = bs.filter((b) => b.x > -50 && b.x < W + 50 && b.y > -50 && b.y < H + 50);
    fl.forEach((f) => { f.ttl -= dt; f.y -= 24 * dt; }); fl = fl.filter((f) => f.ttl > 0);
    hud();
    if (bounty >= GOAL) { over(true, 'Gallery cleared', `You collected $${bounty} with ${hits} hits from ${shots} shots.`); return; }
    if (strikes >= MAX_STRIKES) { over(false, 'Townsfolk down', 'Three townsfolk were hit. The sheriff closes the gallery.'); return; }
    if (ammo + reserve <= 0 && !bs.length) { over(false, 'Out of bullets', `You ran dry at $${bounty} of $${GOAL}.`); return; }
    if (time <= 0) over(false, 'Time is up', `The gallery closed at $${bounty} of $${GOAL}.`);
  }

  function person(t: T): void {
    const x = t.x, y = t.y, bad = t.bad;
    g.fillStyle = bad ? c.red : c.bone; g.strokeStyle = c.ink; g.lineWidth = 3;
    g.fillRect(x - 13, y - 34, 26, 34); g.strokeRect(x - 13, y - 34, 26, 34);
    g.beginPath(); g.arc(x, y - 44, 10, 0, 7); g.fillStyle = c.tan; g.fill(); g.stroke();
    g.fillStyle = bad ? c.ink : c.saddle; g.beginPath(); g.moveTo(x - 16, y - 50); g.lineTo(x + 16, y - 50); g.lineTo(x + 8, y - 66); g.lineTo(x - 8, y - 66); g.closePath(); g.fill(); g.stroke();
    g.lineWidth = 3.5;
    if (bad) { g.fillStyle = c.ink; g.fillRect(x - 10, y - 42, 20, 5); g.strokeStyle = c.white; g.beginPath(); g.moveTo(x - 9, y - 28); g.lineTo(x + 9, y - 12); g.moveTo(x + 9, y - 28); g.lineTo(x - 9, y - 12); g.stroke(); }
    else { g.strokeStyle = c.blush; g.lineWidth = 3; g.beginPath(); g.arc(x, y - 22, 8, 0, 7); g.stroke(); g.fillStyle = c.ink; g.fillRect(x - 6, y - 24, 12, 4); g.fillRect(x - 2, y - 28, 4, 12); }
  }
  function draw(): void {
    g.fillStyle = c.bg; g.fillRect(0, 0, W, H);
    g.fillStyle = c.dusk; g.fillRect(0, 0, W, 150);
    g.fillStyle = c.mesa; g.beginPath(); g.moveTo(0, 150); g.lineTo(0, 120); g.lineTo(60, 120); g.lineTo(80, 80); g.lineTo(190, 80); g.lineTo(210, 120); g.lineTo(300, 120); g.lineTo(330, 96); g.lineTo(420, 96); g.lineTo(440, 130); g.lineTo(W, 130); g.lineTo(W, 150); g.fill();
    g.fillStyle = c.night; g.fillRect(0, 150, W, H - 150);
    LANES.forEach((y) => { g.fillStyle = c.umber; g.fillRect(0, y, W, 14); g.fillStyle = c.saddle; g.fillRect(0, y + 14, W, 6); g.strokeStyle = c.ember; g.lineWidth = 2; g.setLineDash([6, 8]); g.beginPath(); g.moveTo(0, y + 30); g.lineTo(W, y + 30); g.stroke(); g.setLineDash([]); });
    ts.forEach(person);
    g.strokeStyle = c.rose; g.lineWidth = 1.5; g.setLineDash([3, 7]); g.beginPath(); g.moveTo(GX, GY); g.lineTo(aimX, aimY); g.stroke(); g.setLineDash([]);
    bs.forEach((b) => { g.strokeStyle = c.tan; g.lineWidth = 2; g.beginPath(); g.moveTo(b.x, b.y); g.lineTo(b.x - b.vx * 0.03, b.y - b.vy * 0.03); g.stroke(); g.fillStyle = c.white; g.beginPath(); g.arc(b.x, b.y, 3.5, 0, 7); g.fill(); });
    const a = Math.atan2(aimY - GY, aimX - GX);
    g.save(); g.translate(GX, GY); g.rotate(a + Math.PI / 2);
    g.fillStyle = c.tan; g.strokeStyle = c.ink; g.lineWidth = 3; g.fillRect(-9, -46 + kick, 18, 40); g.strokeRect(-9, -46 + kick, 18, 40);
    g.fillStyle = c.saddle; g.beginPath(); g.arc(0, 0, 26, 0, 7); g.fill(); g.stroke();
    for (let i = 0; i < 6; i++) { const q = spin + (i * Math.PI) / 3; g.fillStyle = i < ammo ? c.rose : c.night; g.beginPath(); g.arc(Math.cos(q) * 14, Math.sin(q) * 14, 4.5, 0, 7); g.fill(); }
    g.restore();
    const ax = aimX, ay = aimY;
    g.strokeStyle = c.bone; g.lineWidth = 2.5; g.beginPath(); g.arc(ax, ay, 15, 0, 7); g.moveTo(ax - 22, ay); g.lineTo(ax + 22, ay); g.moveTo(ax, ay - 22); g.lineTo(ax, ay + 22); g.stroke();
    g.font = '700 16px "Zilla Slab", serif'; g.textAlign = 'center'; g.textBaseline = 'middle';
    fl.forEach((f) => { g.fillStyle = f.hot ? c.red : c.bone; g.globalAlpha = Math.min(1, f.ttl * 2); g.fillText(f.txt, f.x, f.y - 30); g.globalAlpha = 1; });
    for (let i = 0; i < CHAMBER; i++) { g.beginPath(); g.arc(34 + i * 26, 590, 9, 0, 7); g.fillStyle = i < ammo ? c.rose : 'transparent'; g.fill(); g.strokeStyle = c.bone; g.lineWidth = 2; g.stroke(); }
    g.textAlign = 'left'; g.fillStyle = c.ash; g.fillText(rel > 0 ? 'Reloading…' : `Reserve ${reserve}`, 20, 618);
    const rb = RELOAD_BOX; g.fillStyle = rel > 0 ? c.night : c.wine; g.fillRect(rb.x, rb.y, rb.w, rb.h); g.strokeStyle = c.rose; g.lineWidth = 3; g.strokeRect(rb.x, rb.y, rb.w, rb.h);
    g.fillStyle = c.bone; g.textAlign = 'center'; g.fillText('RELOAD (R)', rb.x + rb.w / 2, rb.y + rb.h / 2);
    g.textAlign = 'left'; g.fillStyle = c.bone; g.fillText('Red + cross = outlaw', 12, 24); g.fillStyle = c.blush; g.fillText('Pale + ring = townsfolk, hold fire', 12, 46);
    g.fillStyle = c.ash; g.fillText('Aim ahead: bullets take time to land', 12, 68);
  }

  function press(e: PointerEvent): void {
    e.preventDefault();
    const p = cv.pt(e), rb = RELOAD_BOX;
    if (p.x >= rb.x && p.x <= rb.x + rb.w && p.y >= rb.y && p.y <= rb.y + rb.h) { reload(); return; }
    aimX = p.x; aimY = p.y; fire(p.x, p.y);
  }
  ctx.on(cv.el, 'pointerdown', press);
  ctx.on(cv.el, 'pointermove', (e: PointerEvent) => { if (e.pointerType === 'mouse') { const p = cv.pt(e); aimX = p.x; aimY = p.y; } });
  ctx.keys({ ' ': (d) => d && fire(aimX, aimY), r: (d) => d && reload(), ArrowLeft: () => {}, ArrowRight: () => {}, ArrowUp: () => {}, ArrowDown: () => {} });
  ctx.loop(update, draw);

  /** Bot helper: where to aim at a target, and the first thing that shot would strike. */
  function lead(t: T): { x: number; y: number } {
    let tt = 0.5;
    for (let i = 0; i < 6; i++) tt = (Math.hypot(t.x + t.vx * tt - GX, cy(t) - GY) - 40) / SPEED;
    return { x: t.x + t.vx * tt, y: cy(t) };
  }
  function firstHit(p: { x: number; y: number }): T | null {
    const d = Math.hypot(p.x - GX, p.y - GY) || 1;
    const b: Bu = { x: GX + ((p.x - GX) / d) * 40, y: GY + ((p.y - GY) / d) * 40, vx: ((p.x - GX) / d) * SPEED, vy: ((p.y - GY) / d) * SPEED };
    const sim = ts.map((t) => ({ ...t }));
    for (let i = 0; i < 160; i++) {
      for (let k = 0; k < 2; k++) {
        b.x += b.vx / 120; b.y += b.vy / 120;
        const t = sim.find((q) => q.alive && struck(b, q));
        if (t) return ts.find((q) => q.id === t.id) ?? null;
      }
      sim.forEach((t) => { t.x += t.vx / 60; });
    }
    return null;
  }

  return {
    destroy() {},
    reset(seed) {
      rand = makeRng(seed); ts = []; bs = []; fl = []; ammo = CHAMBER; reserve = RESERVE; rel = 0; time = TIME; el = 0; spawn = 0.4; nid = 0;
      bounty = 0; strikes = 0; shots = 0; hits = 0; spin = 0; aimX = 240; aimY = 300; kick = 0; hud();
    },
    probe: () => ({ ammo, reserve, shots, hits, bounty, strikes, t: Math.round(time * 10) / 10 }),
    play(kind: Result) {
      const wantBad = kind === 'win', aimed = new Set<number>();
      for (let n = 0; n < 5000 && !ctx.finished; n++) {
        update(1 / 60);
        if (ctx.finished) break;
        if (rel > 0) continue;
        if (ammo <= 0) { reload(); continue; }
        for (const t of ts) {
          if (!t.alive || aimed.has(t.id) || t.bad !== wantBad || t.x < 30 || t.x > W - 30) continue;
          const p = lead(t);
          if (p.x < 10 || p.x > W - 10 || firstHit(p) !== t) continue;
          aimX = p.x; aimY = p.y; aimed.add(t.id); fire(p.x, p.y); break;
        }
      }
    },
  };
}
