import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Tumble Run: three lanes. Dodge tumbleweeds by changing lane, hop low rocks, pick up stars; 3 hearts; reach the town 2400 m away. */
const GOAL = 2400, PY = 520, LX = [110, 240, 370], HEARTS = 3, JUMP = 0.6;
type Haz = { lane: number; y: number; kind: 'weed' | 'rock' | 'star'; hit?: boolean };

export default function tumbleRun(ctx: Ctx): Instance {
  const cv = ctx.canvas(480, 640);
  const g = cv.g, C = ctx.c;
  let rand = makeRng(1);
  let lane = 1, vx = LX[1], jt = 0, dist = 0, hearts = HEARTS, inv = 0, score = 0, nextRow = 0, spin = 0, flash = 0, stars = 0;
  let hz: Haz[] = [], sy = 0;

  const speed = () => 280 + Math.min(1, dist / GOAL) * 300; // px per second
  const air = () => jt > 0.12 && jt < JUMP - 0.12;
  function hud(): void { ctx.hud('Distance', `${Math.floor(dist)} / ${GOAL} m`); ctx.hud('Hearts', '♥'.repeat(hearts) || '0'); ctx.hud('Score', score); }
  function row(): void {
    const r = rand();
    const lanes = [0, 1, 2];
    if (r < 0.2) lanes.forEach((l) => hz.push({ lane: l, y: -40, kind: 'rock' }));
    else if (r < 0.55) { const free = Math.floor(rand() * 3); lanes.filter((l) => l !== free).forEach((l) => hz.push({ lane: l, y: -40, kind: 'weed' })); if (rand() < 0.5) hz.push({ lane: free, y: -40, kind: 'star' }); }
    else if (r < 0.85) { const l = Math.floor(rand() * 3); hz.push({ lane: l, y: -40, kind: rand() < 0.5 ? 'weed' : 'rock' }); if (rand() < 0.4) hz.push({ lane: (l + 1 + Math.floor(rand() * 2)) % 3, y: -40, kind: 'star' }); }
    else { const l = Math.floor(rand() * 3); hz.push({ lane: l, y: -40, kind: 'weed' }); hz.push({ lane: (l + 1) % 3, y: -40, kind: 'rock' }); }
  }
  /** Player actions: change lane or hop. */
  function steer(d: number): void { if (ctx.finished) return; const l = Math.max(0, Math.min(2, lane + d)); if (l !== lane) { lane = l; ctx.sfx('tap'); } }
  function hop(): void { if (ctx.finished || jt > 0) return; jt = 0.0001; ctx.sfx('tap'); }
  function update(dt: number): void {
    if (ctx.finished) return;
    const v = speed() * dt;
    dist += v / 10; spin += dt * 6; sy = (sy + v) % 60;
    vx += (LX[lane] - vx) * Math.min(1, dt * 16);
    if (jt > 0) { jt += dt; if (jt >= JUMP) jt = 0; }
    if (inv > 0) inv -= dt; if (flash > 0) flash -= dt;
    nextRow -= v; if (nextRow <= 0) { row(); nextRow = speed() * (0.9 + rand() * 0.4); }
    for (const o of hz) {
      o.y += v;
      if (o.hit || o.lane !== lane || Math.abs(o.y - PY) > 30) continue;
      if (o.kind === 'star') { o.hit = true; score += 50; stars++; ctx.sfx('good'); }
      else if (o.kind === 'rock' && air()) { /* hopped over */ }
      else if (inv <= 0) { o.hit = true; hearts--; inv = 1.2; flash = 0.4; ctx.sfx('bad'); }
    }
    hz = hz.filter((o) => o.y < 700 && !(o.hit && o.kind === 'star'));
    score += Math.round(v / 10);
    hud();
    if (hearts <= 0) { ctx.finish({ result: 'lose', score, title: 'Trampled by tumbleweeds', detail: `You made it ${Math.floor(dist)} m of ${GOAL} m.` }); return; }
    if (dist >= GOAL) ctx.finish({ result: 'win', score: score + hearts * 200, title: 'Town in sight', detail: `Ran ${GOAL} m with ${hearts} ${hearts === 1 ? 'heart' : 'hearts'} left and ${stars} stars.` });
  }
  function draw(): void {
    g.fillStyle = C.bg; g.fillRect(0, 0, 480, 640);
    // mesa horizon doubles as the progress strip
    g.fillStyle = C.mesa; g.beginPath(); g.moveTo(0, 70); g.lineTo(0, 46); g.lineTo(40, 46); g.lineTo(52, 22); g.lineTo(130, 22); g.lineTo(142, 46); g.lineTo(220, 46); g.lineTo(230, 34); g.lineTo(300, 34); g.lineTo(312, 50); g.lineTo(400, 50); g.lineTo(412, 18); g.lineTo(480, 18); g.lineTo(480, 70); g.fill();
    g.fillStyle = C.umber; g.fillRect(0, 70, 480, 570);
    g.strokeStyle = C.bone; g.lineWidth = 3; g.beginPath(); g.moveTo(14, 62); g.lineTo(466, 62); g.stroke();
    g.fillStyle = C.player; g.beginPath(); g.arc(14 + (dist / GOAL) * 452, 62, 7, 0, 6.3); g.fill(); g.strokeStyle = C.ink; g.lineWidth = 2; g.stroke();
    g.fillStyle = C.bone; g.font = '700 13px "Zilla Slab", serif'; g.textAlign = 'right'; g.fillText('TOWN', 470, 14); g.textAlign = 'center';
    // lanes
    g.strokeStyle = C.saddle; g.lineWidth = 3; g.setLineDash([22, 38]); g.lineDashOffset = -sy;
    for (const x of [175, 305]) { g.beginPath(); g.moveTo(x, 70); g.lineTo(x, 640); g.stroke(); } g.setLineDash([]);
    for (const o of hz) {
      const x = LX[o.lane];
      if (o.kind === 'weed') {
        g.save(); g.translate(x, o.y); g.rotate(spin); g.strokeStyle = C.red; g.fillStyle = C.wine; g.lineWidth = 3; g.beginPath(); g.arc(0, 0, 30, 0, 6.3); g.fill(); g.stroke();
        g.strokeStyle = C.rose; g.lineWidth = 2; for (let k = 0; k < 4; k++) { g.beginPath(); g.moveTo(-26, -8 + k * 6); g.lineTo(26, 8 - k * 6); g.stroke(); } g.restore();
        g.fillStyle = C.white; g.font = '700 18px "Zilla Slab", serif'; g.fillText('✕', x, o.y + 6);
      } else if (o.kind === 'rock') {
        g.fillStyle = C.ash; g.strokeStyle = C.ink; g.lineWidth = 3; g.beginPath(); g.moveTo(x - 36, o.y + 14); g.lineTo(x - 26, o.y - 12); g.lineTo(x + 20, o.y - 16); g.lineTo(x + 36, o.y + 14); g.closePath(); g.fill(); g.stroke();
        g.fillStyle = C.ink; g.font = '700 15px "Zilla Slab", serif'; g.fillText('▲ HOP', x, o.y + 6);
      } else { g.fillStyle = C.collectible; g.strokeStyle = C.bone; g.lineWidth = 2; g.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + (i * Math.PI) / 5, r = i % 2 ? 8 : 20; g.lineTo(x + Math.cos(a) * r, o.y + Math.sin(a) * r); } g.closePath(); g.fill(); g.stroke(); }
    }
    // player
    const lift = air() ? Math.sin((jt / JUMP) * Math.PI) * 46 : jt > 0 ? Math.sin((jt / JUMP) * Math.PI) * 46 : 0;
    g.fillStyle = C.ink; g.globalAlpha = 0.4; g.beginPath(); g.ellipse(vx, PY + 24, 22 - lift * 0.15, 7, 0, 0, 6.3); g.fill(); g.globalAlpha = 1;
    if (inv <= 0 || Math.floor(inv * 12) % 2) {
      g.fillStyle = C.player; g.strokeStyle = C.ink; g.lineWidth = 3; g.beginPath(); g.arc(vx, PY - lift - 14, 12, 0, 6.3); g.fill(); g.stroke();
      g.beginPath(); g.moveTo(vx - 18, PY - lift - 28); g.lineTo(vx + 18, PY - lift - 28); g.lineTo(vx + 9, PY - lift - 20); g.lineTo(vx - 9, PY - lift - 20); g.closePath(); g.fillStyle = C.saddle; g.fill(); g.stroke();
      g.fillStyle = C.player; g.fillRect(vx - 11, PY - lift - 2, 22, 24); g.strokeRect(vx - 11, PY - lift - 2, 22, 24);
    }
    if (flash > 0) { g.fillStyle = C.red; g.globalAlpha = flash; g.fillRect(0, 70, 480, 570); g.globalAlpha = 1; }
    g.textAlign = 'left';
  }
  // swipe: left/right change lane, up or tap hops
  let sp: { x: number; y: number } | null = null;
  ctx.on(cv.el, 'pointerdown', (e: PointerEvent) => { sp = cv.pt(e); });
  ctx.on(cv.el, 'pointerup', (e: PointerEvent) => {
    if (!sp) return; const p = cv.pt(e), dx = p.x - sp.x, dy = p.y - sp.y; sp = null;
    if (Math.abs(dx) > 28 && Math.abs(dx) > Math.abs(dy)) steer(dx > 0 ? 1 : -1); else hop();
  });
  ctx.keys({ ArrowLeft: (d) => d && steer(-1), ArrowRight: (d) => d && steer(1), a: (d) => d && steer(-1), d: (d) => d && steer(1), ArrowUp: (d) => d && hop(), ' ': (d) => d && hop() });
  ctx.pad([{ key: 'ArrowLeft', label: '◀' }, { key: ' ', label: 'Hop' }, { key: 'ArrowRight', label: '▶' }]);
  ctx.loop(update, draw);

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); lane = 1; vx = LX[1]; jt = 0; dist = 0; hearts = HEARTS; inv = 0; score = 0; nextRow = 90; spin = 0; flash = 0; stars = 0; hz = []; sy = 0; hud(); },
    probe: () => ({ lane, jt: jt > 0, dist: Math.floor(dist), hearts, score }),
    play(kind: Result) {
      for (let guard = 0; guard < 60 * 400 && !ctx.finished; guard++) {
        if (kind === 'win') {
          const v = speed(), D = (l: number, k: Haz['kind']) => hz.filter((o) => o.lane === l && o.kind === k && !o.hit && o.y < PY + 30 && PY - o.y < v * 0.6).map((o) => PY - o.y);
          const risk = (l: number) => D(l, 'weed').length * 3 + D(l, 'rock').length;
          if (D(lane, 'weed').length) {
            const cands = [lane - 1, lane + 1].filter((l) => l >= 0 && l <= 2).sort((x, y) => risk(x) - risk(y));
            steer(cands[0] - lane);
          }
          if (jt === 0 && D(lane, 'rock').some((d) => d <= v * 0.3 && d >= v * 0.2)) hop();
        }
        update(1 / 60);
      }
    },
  };
}
