import { h } from '../core/dom';
import { makeRng, rint } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Wind Cannon: pick angle and charge, read the windsock, fire. Five targets, three shots each. */
const TARGETS = 5, SHOTS = 3, G = 300, VK = 4.2, DT = 1 / 120, HITR = 22, GY = 250, PX = 40, PY = 16;
interface Rnd { tx: number; th: number; wind: number; wall: { x: number; h: number } | null }
interface Ball { x: number; y: number; vx: number; vy: number }
type End = { hit: boolean; x: number; wall: boolean } | null;

function launch(angle: number, power: number): Ball {
  const a = (angle * Math.PI) / 180, v = power * VK;
  return { x: PX + Math.cos(a) * 36, y: PY + Math.sin(a) * 36, vx: Math.cos(a) * v, vy: Math.sin(a) * v };
}
/** One physics step. Returns the outcome once the ball hits the target, the wall or the ground. */
function advance(b: Ball, r: Rnd): End {
  b.vx += r.wind * 9 * DT; b.vy -= G * DT; b.x += b.vx * DT; b.y += b.vy * DT;
  if (Math.hypot(b.x - r.tx, b.y - (r.th + 22)) < HITR + 4) return { hit: true, x: b.x, wall: false };
  if (r.wall && b.x > r.wall.x - 8 && b.x < r.wall.x + 8 && b.y < r.wall.h) return { hit: false, x: b.x, wall: true };
  if (b.y < 0 || b.x > 520 || b.x < -30) return { hit: false, x: b.x, wall: false };
  return null;
}
function shoot(angle: number, power: number, r: Rnd): End & {} {
  const b = launch(angle, power);
  for (let i = 0; i < 2400; i++) { const e = advance(b, r); if (e) return e; }
  return { hit: false, x: b.x, wall: false };
}
function solutions(r: Rnd): [number, number][] {
  const out: [number, number][] = [];
  for (let a = 10; a <= 80; a++) for (let p = 20; p <= 100; p++) if (shoot(a, p, r).hit) out.push([a, p]);
  return out;
}

export default function windCannon(ctx: Ctx): Instance {
  let rand = makeRng(1);
  type Phase = 'aim' | 'fly' | 'after';
  let phase: Phase = 'aim';
  let round = 0, shots = SHOTS, score = 0, angle = 45, power = 60, t = 0, win = false, msg = '';
  let rnd: Rnd = { tx: 300, th: 0, wind: 0, wall: null };
  let ball: Ball = launch(45, 60), trail: string[] = [];

  const svg = h('svg', { viewBox: '0 0 480 290', class: 'wc-svg', role: 'img', 'aria-label': 'Cannon, target and windsock' });
  const sky = h('rect', { x: 0, y: 0, width: 480, height: 290, fill: 'var(--mw-night)' });
  const mesa = h('path', { d: 'M0 250 L0 200 L50 200 L66 170 L150 170 L166 200 L260 200 L280 180 L350 180 L366 205 L480 205 L480 250 Z', fill: 'var(--mw-wine)' });
  const stars = [[30,30],[90,60],[150,24],[210,50],[270,22],[330,44],[430,28],[380,66],[60,100]].map(([x, y]) => h('circle', { cx: x, cy: y, r: 1.6, fill: 'var(--mw-bone)', opacity: 0.45 }));
  const moon = h('circle', { cx: 250, cy: 80, r: 16, fill: 'var(--mw-bone)', opacity: 0.85 });
  const ground = h('rect', { x: 0, y: GY, width: 480, height: 40, fill: 'var(--mw-saddle)', stroke: 'var(--mw-tan)', 'stroke-width': 3 });
  const wall = h('rect', { fill: 'var(--mw-ink)', stroke: 'var(--mw-tan)', 'stroke-width': 3 });
  const plat = h('rect', { fill: 'var(--mw-saddle)', stroke: 'var(--mw-tan)', 'stroke-width': 3 });
  const tg = h('g', null,
    h('circle', { r: 22, fill: 'var(--mw-bone)', stroke: 'var(--mw-ink)', 'stroke-width': 3 }), h('circle', { r: 14, fill: 'var(--mw-red)' }), h('circle', { r: 6, fill: 'var(--mw-bone)' }));
  const barrel = h('rect', { x: PX, y: GY - PY - 6, width: 34, height: 12, fill: 'var(--mw-tan)', stroke: 'var(--mw-ink)', 'stroke-width': 3, rx: 3 });
  const trailEl = h('path', { fill: 'none', stroke: 'var(--mw-ash)', 'stroke-width': 2, 'stroke-dasharray': '3 6' });
  const marks = h('g', null);
  const ballEl = h('circle', { r: 5.5, fill: 'var(--mw-white)', stroke: 'var(--mw-ink)', 'stroke-width': 2, cx: 0, cy: 0, visibility: 'hidden' });
  const sock = h('g', null);
  svg.append(sky, ...stars, moon, mesa, ground, plat, wall, tg, sock, trailEl, marks, h('circle', { cx: PX, cy: GY - 8, r: 16, fill: 'var(--mw-saddle)', stroke: 'var(--mw-tan)', 'stroke-width': 3 }), barrel, h('circle', { cx: PX, cy: GY - PY, r: 9, fill: 'var(--mw-ink)', stroke: 'var(--mw-tan)', 'stroke-width': 3 }), ballEl);

  const aIn = h('input', { type: 'range', min: 10, max: 80, value: 45, 'aria-label': 'Angle', oninput: () => setAngle(+(aIn as HTMLInputElement).value) }) as HTMLInputElement;
  const pIn = h('input', { type: 'range', min: 20, max: 100, value: 60, 'aria-label': 'Charge', oninput: () => setPower(+(pIn as HTMLInputElement).value) }) as HTMLInputElement;
  const aV = h('b', null), pV = h('b', null);
  const fireBtn = h('button', { class: 'mw-btn primary', type: 'button', 'data-fire': '', style: { width: '100%', minHeight: '52px', fontSize: '1.2rem' }, onclick: () => fire() }, 'Fire');
  const note = h('p', { class: 'mw-note', role: 'status', style: { minHeight: '2.8em', margin: 0 } });
  const style = h('style', null, `
    .wc{width:100%;max-width:480px;display:flex;flex-direction:column;gap:8px}
    .wc-svg{display:block;width:100%;height:auto;border:2px solid var(--mw-ember);border-radius:10px}
    .wc-ctl{display:grid;grid-template-columns:auto 1fr auto;gap:2px 10px;align-items:center;font:600 .9rem var(--mw-font-slab);color:var(--mw-bone)}
    .wc-ctl input{width:100%;min-height:44px;accent-color:var(--mw-rose)}
    .wc-ctl b{min-width:3.2em;text-align:right;font-variant-numeric:tabular-nums}
  `);
  ctx.root.append(style, h('div', { class: 'wc' }, svg, h('div', { class: 'wc-ctl' }, h('span', null, 'Angle'), aIn, aV, h('span', null, 'Charge'), pIn, pV), fireBtn, note));

  function sky2(): void {
    const w = rnd.wind, len = 12 + Math.abs(w) * 9, dir = w >= 0 ? 1 : -1, px = 392, py = 92;
    sock.replaceChildren(
      h('line', { x1: px, y1: py + 60, x2: px, y2: py - 6, stroke: 'var(--mw-tan)', 'stroke-width': 4 }),
      h('polygon', { points: w ? `${px},${py - 6} ${px + dir * len},${py} ${px + dir * len},${py + 10} ${px},${py + 14}` : `${px},${py - 6} ${px + 6},${py + 22} ${px - 6},${py + 22}`, fill: 'var(--mw-rose)', stroke: 'var(--mw-bone)', 'stroke-width': 2, 'stroke-linejoin': 'round' }),
      h('text', { x: px, y: py + 80, 'text-anchor': 'middle', fill: 'var(--mw-bone)', 'font-size': 14, 'font-family': 'var(--mw-font-slab)', 'font-weight': 700 }, w ? `${w < 0 ? '←' : '→'} Wind ${Math.abs(w)}` : 'Calm'));
  }
  function place(): void {
    tg.setAttribute('transform', `translate(${rnd.tx} ${GY - rnd.th - 22})`);
    plat.setAttribute('x', String(rnd.tx - 28)); plat.setAttribute('width', '56'); plat.setAttribute('y', String(GY - rnd.th)); plat.setAttribute('height', String(rnd.th));
    if (rnd.wall) { wall.setAttribute('x', String(rnd.wall.x - 8)); wall.setAttribute('width', '16'); wall.setAttribute('y', String(GY - rnd.wall.h)); wall.setAttribute('height', String(rnd.wall.h)); } else { wall.setAttribute('width', '0'); wall.setAttribute('height', '0'); }
    sky2();
  }
  function hud(): void { ctx.hud('Target', `${round + 1}/${TARGETS}`); ctx.hud('Shots left', shots); ctx.hud('Wind', rnd.wind ? `${rnd.wind < 0 ? '←' : '→'} ${Math.abs(rnd.wind)}` : 'calm'); ctx.hud('Score', score); }
  function controls(): void {
    aIn.value = String(angle); pIn.value = String(power); aV.textContent = `${angle}°`; pV.textContent = String(power);
    barrel.setAttribute('transform', `rotate(${-angle} ${PX} ${GY - PY})`);
    (fireBtn as HTMLButtonElement).disabled = phase !== 'aim';
  }
  function setAngle(v: number): void { if (phase === 'aim') { angle = Math.max(10, Math.min(80, Math.round(v))); controls(); } }
  function setPower(v: number): void { if (phase === 'aim') { power = Math.max(20, Math.min(100, Math.round(v))); controls(); } }
  function startRound(): void {
    for (;;) {
      const tx = rint(rand, 200, 440), th = round < 1 ? 0 : rint(rand, 0, 70), mw = Math.min(6, 1 + round);
      const wind = rint(rand, -mw, mw) || (round > 0 ? 1 : 0);
      const wl = round >= 2 ? { x: Math.round(130 + rand() * (tx - 190)), h: rint(rand, 70, 110) } : null;
      const r: Rnd = { tx, th, wind, wall: wl };
      const s = solutions(r).length;
      if (s >= 6) { rnd = r; break; }
    }
    shots = SHOTS; phase = 'aim'; trail = []; trailEl.setAttribute('d', ''); marks.replaceChildren(); ballEl.setAttribute('visibility', 'hidden');
    msg = round === 0 ? 'Set the angle and charge, then Fire. A cross marks where each shot lands.' : `Target ${round + 1}: read the windsock before you fire.`;
    place(); hud(); controls(); note.textContent = msg;
  }
  /** The one scoring action: fire the cannon. */
  function fire(): void {
    if (ctx.finished || phase !== 'aim') return;
    shots--; ball = launch(angle, power); trail = [`M${ball.x.toFixed(1)} ${(GY - ball.y).toFixed(1)}`]; phase = 'fly'; t = 0; ballEl.setAttribute('visibility', 'visible'); ctx.sfx('tap'); hud(); controls();
    note.textContent = 'Cannonball in flight…';
  }
  function landed(e: NonNullable<End>): void {
    win = e.hit;
    const cx = Math.min(468, Math.max(12, e.x)), cy = e.hit ? GY - rnd.th - 22 : GY;
    marks.append(e.hit ? h('circle', { cx, cy, r: 9, fill: 'var(--mw-rose)', stroke: 'var(--mw-bone)', 'stroke-width': 3 }) : h('path', { d: `M${cx - 8} ${GY - 8} L${cx + 8} ${GY + 8} M${cx + 8} ${GY - 8} L${cx - 8} ${GY + 8}`, stroke: 'var(--mw-red)', 'stroke-width': 4, 'stroke-linecap': 'round' }));
    phase = 'after'; t = 0;
    if (e.hit) { score += (shots + 1) * 100; ctx.sfx('good'); msg = `Direct hit! ${shots + 1} shot${shots ? 's' : ''} to spare scores ${(shots + 1) * 100}.`; }
    else { ctx.sfx('bad'); const d = Math.round(e.x - rnd.tx); msg = e.wall ? 'The ball smacked into the wall. Lob it higher.' : e.x > 520 ? 'Way too long.' : d < 0 ? `Landed ${-d} short of the target.` : `Landed ${d} long of the target.`; msg += rnd.wind ? ' The wind is pushing it.' : ''; }
    note.textContent = msg; hud(); controls();
  }
  function update(dt: number): void {
    if (phase === 'fly') {
      for (let k = 0; k < 2; k++) {
        const e = advance(ball, rnd);
        if (e) { ballEl.setAttribute('cx', String(e.x)); landed(e); return; }
      }
      ballEl.setAttribute('cx', ball.x.toFixed(1)); ballEl.setAttribute('cy', (GY - ball.y).toFixed(1));
      if (++t % 3 === 0) { trail.push(`L${ball.x.toFixed(1)} ${(GY - ball.y).toFixed(1)}`); trailEl.setAttribute('d', trail.join('')); }
    } else if (phase === 'after') {
      t += dt;
      if (t > 1.2) {
        if (win) {
          if (round >= TARGETS - 1) { ctx.finish({ result: 'win', score, title: 'Every target down', detail: `You hit all ${TARGETS} targets.` }); return; }
          round++; startRound();
        } else if (shots <= 0) ctx.finish({ result: 'lose', score, title: 'Out of powder', detail: `Three misses on target ${round + 1}.` });
        else { phase = 'aim'; ballEl.setAttribute('visibility', 'hidden'); note.textContent = `${shots} shot${shots === 1 ? '' : 's'} left. Adjust and fire again.`; controls(); }
      }
    }
  }
  ctx.keys({ ArrowLeft: (d) => d && setAngle(angle - 1), ArrowRight: (d) => d && setAngle(angle + 1), ArrowUp: (d) => d && setPower(power + 2), ArrowDown: (d) => d && setPower(power - 2), ' ': (d) => d && fire() });
  ctx.loop(update, () => {});

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); round = 0; score = 0; angle = 45; power = 60; startRound(); },
    probe: () => ({ round, shots, phase, angle, power, score }),
    play(kind: Result) {
      for (let g = 0; g < 20000 && !ctx.finished; g++) {
        if (phase === 'aim') {
          if (kind === 'win') { const s = solutions(rnd)[0]; setAngle(s[0]); setPower(s[1]); } else { setAngle(45); setPower(20); }
          fire();
        } else update(1 / 60);
      }
    },
  };
}
