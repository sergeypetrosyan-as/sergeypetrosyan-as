import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Domino Fall: stand a limited number of dominoes on the ledge, then tip the first so the chain reaches the bell. */
const W = 480, H = 330, GY = 250, DH = 48, DW = 9, START = 70, MINGAP = 16;
const LEVELS = [
  { bell: 440, chasms: [] as number[][], n: 9 },
  { bell: 440, chasms: [[228, 262]], n: 9 },
  { bell: 440, chasms: [[150, 182], [290, 322]], n: 10 },
];
const TRIES = 3;

export default function dominoFall(ctx: Ctx): Instance {
  const cv = ctx.canvas(W, H);
  const g = cv.g, C = ctx.c;
  cv.el.style.maxWidth = '580px';
  let lvl = 0, score = 0, tries = TRIES, xs: number[] = [], phase: 'build' | 'run' | 'done' = 'build', t = 0, ghost = -1;
  let afterT = 0, after: () => void = () => {};
  let th: number[] = [], om: number[] = [], fall: boolean[] = [], broke = -1, belled = false, ring = 0;
  const L = (): (typeof LEVELS)[number] => LEVELS[lvl];

  const tip = h('button', { class: 'mw-btn primary', type: 'button', 'data-tip': '' }, 'Tip the first domino');
  const clear = h('button', { class: 'mw-btn', type: 'button', 'data-clear': '' }, 'Clear');
  const note = h('p', { class: 'mw-note', role: 'status' });
  ctx.root.append(h('div', { class: 'mw-row' }, tip, clear), note);

  const solid = (x: number): boolean => x - DW / 2 >= 22 && x + DW / 2 <= W - 22 && !L().chasms.some(([a, b]) => x + DW / 2 > a && x - DW / 2 < b);
  const all = (): number[] => [START, ...xs].sort((a, b) => a - b);
  function hud(): void { ctx.hud('Level', `${lvl + 1}/${LEVELS.length}`); ctx.hud('Dominoes left', L().n - xs.length); ctx.hud('Tries', tries); }

  /** Action 1: tap the ledge to stand a domino there (tap one again to lift it). */
  function place(x: number): void {
    if (ctx.finished || phase !== 'build') return;
    x = Math.round(x / 2) * 2;
    const near = xs.findIndex((v) => Math.abs(v - x) < DW + 2);
    if (near >= 0) { xs.splice(near, 1); ctx.sfx('tap'); hud(); return; }
    if (!solid(x) || Math.abs(x - START) < MINGAP || xs.some((v) => Math.abs(v - x) < MINGAP) || xs.length >= L().n) { ctx.sfx('bad'); return; }
    xs.push(x); ctx.sfx('tap'); hud();
  }
  /** Action 2: tip the first domino. */
  function tipFirst(): void {
    if (ctx.finished || phase !== 'build') return;
    const d = all(); th = d.map(() => 0); om = d.map(() => 0); fall = d.map(() => false);
    fall[0] = true; om[0] = 0.5; phase = 'run'; t = 0; broke = -1; belled = false; ctx.sfx('tick'); note.textContent = 'Down it goes…';
  }
  function update(dt: number): void {
    if (ctx.finished) return;
    ring += dt;
    if (phase === 'done') { t += dt; if (t > afterT && afterT > 0) { afterT = 0; after(); } return; }
    if (phase !== 'run') return;
    t += dt;
    const d = all();
    for (let i = 0; i < d.length; i++) {
      if (!fall[i] || th[i] >= Math.PI / 2) continue;
      om[i] += 24 * (0.25 + Math.sin(th[i])) * dt; th[i] = Math.min(Math.PI / 2, th[i] + om[i] * dt);
      const tipX = d[i] + DH * Math.sin(th[i]);
      if (i + 1 < d.length) { if (!fall[i + 1] && tipX >= d[i + 1] - DW / 2) { fall[i + 1] = true; om[i + 1] = om[i] * 0.7; ctx.sfx('tick'); } }
      else if (tipX >= L().bell - 8 && !belled) { belled = true; ring = 0; }
    }
    const moving = d.some((_, i) => fall[i] && th[i] < Math.PI / 2);
    if (!moving) {
      if (belled) conclude(true);
      else { const last = d.findIndex((_, i) => !fall[i]); broke = last < 0 ? d.length - 1 : last - 1; conclude(false); }
    }
  }
  function conclude(ok: boolean): void {
    phase = 'done'; t = 0;
    if (ok) {
      score += 300 + (L().n - xs.length) * 30 + (tries - 1) * 50 + 0; ctx.sfx('good'); hud();
      note.textContent = 'The bell rings. The whole chain fell.';
      afterT = 1.1;
      after = () => {
        if (lvl + 1 >= LEVELS.length) { ctx.sfx('win'); ctx.finish({ result: 'win', score, title: 'The bell rang', detail: `All three chains fell, with ${tries} tries to spare.` }); }
        else { lvl++; newLevel(); }
      };
    } else {
      tries--; ctx.sfx('bad'); hud();
      if (tries <= 0) { ctx.finish({ result: 'lose', score, title: 'The chain broke', detail: `A gap was too wide on level ${lvl + 1}; each domino must stand within one tip-length of the next.` }); return; }
      note.textContent = 'The chain broke at the red mark. Move dominoes closer there and tip again.';
      afterT = 1.3; after = () => { phase = 'build'; };
    }
  }
  function newLevel(): void { xs = []; phase = 'build'; tries = TRIES; broke = -1; belled = false; note.textContent = 'Tap the ledge to stand a domino. Keep each one within a tip-length of the next, and bridge the gaps.'; hud(); }

  function draw(): void {
    g.fillStyle = C.night; g.fillRect(0, 0, W, H);
    // quiet sky and mesa horizon
    g.fillStyle = C.bone; g.globalAlpha = 0.5;
    for (let i = 0; i < 18; i++) g.fillRect((i * 97) % W, (i * 53) % 130 + 8, 2, 2);
    g.globalAlpha = 0.5; g.fillStyle = C.dusk; g.beginPath(); g.moveTo(0, GY + 20); g.lineTo(0, 190); g.lineTo(60, 190); g.lineTo(80, 160); g.lineTo(170, 160); g.lineTo(190, 195); g.lineTo(330, 195); g.lineTo(350, 175); g.lineTo(420, 175); g.lineTo(440, 200); g.lineTo(W, 200); g.lineTo(W, GY + 20); g.fill(); g.globalAlpha = 1;
    // ledge in segments
    const cs = L().chasms; let a = 22;
    g.fillStyle = C.umber; g.strokeStyle = C.ember; g.lineWidth = 2;
    for (const [s, e] of [...cs, [W - 22, W - 22]]) { g.fillRect(a, GY, s - a, H - GY); g.beginPath(); g.moveTo(a, GY); g.lineTo(s, GY); g.stroke(); a = e; }
    g.fillStyle = C.red; for (const [s, e] of cs) { g.globalAlpha = 0.8; for (let x = s + 4; x < e; x += 8) { g.beginPath(); g.moveTo(x, GY + 14); g.lineTo(x + 4, GY + 4); g.lineTo(x + 8, GY + 14); g.fill(); } g.globalAlpha = 1; }
    // dominoes
    const d = all();
    d.forEach((x, i) => {
      g.save(); g.translate(x, GY); if (phase !== 'build' && th[i]) g.rotate(th[i]);
      g.fillStyle = i === 0 ? C.rose : C.bone; g.strokeStyle = C.ink; g.lineWidth = 1.5;
      g.fillRect(-DW / 2, -DH, DW, DH); g.strokeRect(-DW / 2, -DH, DW, DH);
      g.fillStyle = C.ink; g.fillRect(-DW / 2 + 2, -DH + 8, DW - 4, 3); g.fillRect(-DW / 2 + 2, -DH + 16, DW - 4, 3);
      g.restore();
    });
    // reach bracket on the last domino (the gameplay motif) and the ghost
    if (phase === 'build') {
      const last = d[d.length - 1];
      g.strokeStyle = C.rose; g.lineWidth = 2; g.setLineDash([4, 3]);
      g.beginPath(); g.moveTo(last, GY - DH - 8); g.lineTo(last + DH + DW / 2, GY - DH - 8); g.moveTo(last + DH + DW / 2, GY - DH - 14); g.lineTo(last + DH + DW / 2, GY - DH - 2); g.stroke(); g.setLineDash([]);
      if (ghost > 0 && solid(ghost)) { g.globalAlpha = 0.45; g.fillStyle = C.bone; g.fillRect(ghost - DW / 2, GY - DH, DW, DH); g.globalAlpha = 1; }
    }
    if (broke >= 0 && d[broke] != null) { const bx = d[broke] + (d[broke + 1] != null ? (d[broke + 1] - d[broke]) / 2 : 20) ; g.strokeStyle = C.red; g.lineWidth = 4; g.beginPath(); g.moveTo(bx - 8, GY - 40); g.lineTo(bx + 8, GY - 24); g.moveTo(bx + 8, GY - 40); g.lineTo(bx - 8, GY - 24); g.stroke(); }
    // bell
    const bx = L().bell; g.save(); g.translate(bx, GY - 58); g.rotate(belled ? Math.sin(ring * 18) * 0.25 * Math.exp(-ring * 2) : 0);
    g.fillStyle = belled ? C.rose : C.tan; g.strokeStyle = C.bone; g.lineWidth = 2;
    g.beginPath(); g.moveTo(-14, 28); g.quadraticCurveTo(-14, -8, 0, -8); g.quadraticCurveTo(14, -8, 14, 28); g.closePath(); g.fill(); g.stroke(); g.restore();
    g.strokeStyle = C.saddle; g.lineWidth = 4; g.beginPath(); g.moveTo(bx, GY); g.lineTo(bx, GY - 30); g.stroke();
  }
  ctx.on(cv.el, 'pointermove', (e: PointerEvent) => { ghost = Math.round(cv.pt(e).x / 2) * 2; });
  ctx.on(cv.el, 'pointerleave', () => { ghost = -1; });
  ctx.on(cv.el, 'pointerdown', (e: PointerEvent) => { e.preventDefault(); const p = cv.pt(e); place(p.x); });
  tip.addEventListener('click', tipFirst);
  clear.addEventListener('click', () => { if (phase === 'build' && !ctx.finished) { xs = []; hud(); } });
  ctx.keys({ Enter: (d) => d && tipFirst(), ' ': (d) => d && tipFirst() });
  ctx.loop(update, draw);

  function plan(): number[] {
    const out: number[] = []; let cur = START;
    while (cur < L().bell - 8 - DH + 2 && out.length < 30) {
      let c = cur + 44;
      const ahead = L().chasms.find(([a]) => a > cur);
      if (ahead) {
        const e = Math.floor((ahead[0] - DW / 2 - 2) / 2) * 2, rem = e - cur;
        if (rem <= 46 && rem >= MINGAP) c = e; else if (rem > 46) c = cur + Math.min(44, rem - MINGAP); else c = Math.ceil((ahead[1] + DW / 2 + 2) / 2) * 2;
        if (c > e && c < ahead[1] + DW / 2 + 2) c = e;
      }
      cur = Math.round(c / 2) * 2; out.push(cur);
    }
    return out;
  }
  return {
    destroy() { /* released by the shell */ },
    reset(seed) { makeRng(seed); lvl = 0; score = 0; ghost = -1; ring = 9; newLevel(); },
    probe: () => ({ lvl, tries, phase, placed: xs.slice().sort((a, b) => a - b).join(','), score }),
    play(kind: Result) {
      for (let n = 0; n < 20000 && !ctx.finished; n++) {
        if (phase === 'build') {
          xs = [];
          if (kind === 'win') plan().forEach(place); else { place(START + 120); place(START + 200); }
          tipFirst();
        } else update(1 / 60);
      }
    },
  };
}
