import { h } from '../core/dom';
import { makeRng } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Fever Town: twelve houses linked by lanes. Each day send one doctor and close two doors, then the fever spreads. */
const COLS = 4, ROWS = 3, DAYS = 10, DIE = 3, P = 0.4, LOSE_AT = 5;
const GLYPH = ['⌂', '✚', '★', '✕'];
const LABEL = ['Healthy', 'Sick', 'Recovered', 'Lost'];
type Sim = { st: number[]; sd: number[]; cl: boolean[]; day: number };

export default function feverTown(ctx: Ctx): Instance {
  let rand = makeRng(1), seed = 1;
  let edges: [number, number][] = [], adj: number[][] = [];
  let s: Sim = { st: [], sd: [], cl: [], day: 1 };
  let docs = 1, doors = 2, mode: 'doctor' | 'close' = 'doctor', ever = 0;

  const style = h('style', null, `
    .ft{width:100%;max-width:420px;display:flex;flex-direction:column;gap:10px;align-items:center}
    .ft-map{position:relative;width:100%;aspect-ratio:4/3.1}
    .ft-map svg{position:absolute;inset:0;width:100%;height:100%}
    .ft-h{position:absolute;width:21%;min-height:58px;transform:translate(-50%,-50%);border-radius:10px 10px 6px 6px;border:3px solid var(--mw-mesa);background:var(--mw-night);color:var(--mw-bone);font:700 .78rem/1.1 var(--mw-font-slab);cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;padding:2px}
    .ft-h i{font-style:normal;font-size:1.3rem}
    .ft-h.s1{background:var(--mw-red);border-color:var(--mw-rose);color:var(--mw-white)}
    .ft-h.s2{background:var(--mw-wine);border-color:var(--mw-rose)}
    .ft-h.s3{opacity:.4;border-style:dotted;cursor:default}
    .ft-h.cl{outline:4px double var(--mw-bone);outline-offset:2px}
    .ft-msg{min-height:2.4em}
  `);
  const lines = h('svg', { viewBox: '0 0 100 100', preserveAspectRatio: 'none', 'aria-hidden': 'true' });
  const map = h('div', { class: 'ft-map' }, lines);
  const mDoc = h('button', { class: 'mw-btn', type: 'button', 'data-mode': 'doctor' });
  const mDoor = h('button', { class: 'mw-btn', type: 'button', 'data-mode': 'close' });
  const endBtn = h('button', { class: 'mw-btn primary', type: 'button', 'data-end': '' }, 'End the day');
  const note = h('p', { class: 'mw-note ft-msg', role: 'status' });
  ctx.root.append(style, h('div', { class: 'ft' }, map, h('div', { class: 'mw-row' }, mDoc, mDoor), endBtn, note));
  mDoc.addEventListener('click', () => { mode = 'doctor'; render(); });
  mDoor.addEventListener('click', () => { mode = 'close'; render(); });
  endBtn.addEventListener('click', () => endDay());

  const pos = (i: number) => ({ x: ((i % COLS) + 0.5) * (100 / COLS), y: (Math.floor(i / COLS) + 0.5) * (100 / ROWS) });
  const roll = (a: number, b: number, day: number) => { let x = (seed * 7919 + a * 104729 + b * 1299709 + day * 15485863) >>> 0; x = Math.imul(x ^ (x >>> 15), 2246822519) >>> 0; x = Math.imul(x ^ (x >>> 13), 3266489917) >>> 0; return ((x ^ (x >>> 16)) >>> 0) / 4294967296; };
  /** Pure: one day of fever. */
  function step(a: Sim): Sim {
    const st = a.st.slice(), sd = a.sd.slice();
    a.st.forEach((v, i) => {
      if (v !== 0 || a.cl[i]) return;
      if (adj[i].some((j) => a.st[j] === 1 && !a.cl[j] && roll(i, j, a.day) < P)) st[i] = 1;
    });
    a.st.forEach((v, i) => { if (v === 1) { sd[i]++; if (sd[i] >= DIE) st[i] = 3; } });
    return { st, sd, cl: a.cl.map(() => false), day: a.day + 1 };
  }
  const gone = (a: Sim) => a.st.filter((v) => v === 3).length;
  function render(): void {
    const q = (i: number) => pos(i);
    lines.replaceChildren(...edges.map(([a, b]) => h('line', { x1: q(a).x, y1: q(a).y, x2: q(b).x, y2: q(b).y, stroke: s.st[a] === 1 || s.st[b] === 1 ? 'var(--mw-rose)' : 'var(--mw-mesa)', 'stroke-width': 0.9, 'stroke-dasharray': '2 2.4', 'vector-effect': 'non-scaling-stroke' })));
    map.replaceChildren(lines, ...s.st.map((v, i) => h('button', {
      class: `ft-h s${v}` + (s.cl[i] ? ' cl' : ''), type: 'button', 'data-house': i, style: { left: `${q(i).x}%`, top: `${q(i).y}%` },
      'aria-label': `House ${i + 1}: ${LABEL[v]}${s.cl[i] ? ', door closed' : ''}`, onclick: () => act(i),
    }, h('i', null, s.cl[i] && v !== 3 ? '▮' : GLYPH[v]), v === 1 ? `day ${s.sd[i] + 1}/${DIE}` : s.cl[i] ? 'closed' : LABEL[v])));
    mDoc.textContent = `Send doctor (${docs})`; mDoor.textContent = `Close door (${doors})`;
    mDoc.classList.toggle('primary', mode === 'doctor'); mDoor.classList.toggle('primary', mode === 'close');
    ctx.hud('Day', `${Math.min(s.day, DAYS)}/${DAYS}`); ctx.hud('Sick', s.st.filter((v) => v === 1).length); ctx.hud('Lost', `${gone(s)}/${LOSE_AT}`);
  }
  /** Player action: apply the selected tool to a house. */
  function act(i: number, m: 'doctor' | 'close' = mode): void {
    if (ctx.finished || s.st[i] === 3) return;
    if (m === 'doctor') {
      if (s.st[i] !== 1 || docs < 1) { note.textContent = 'The doctor can only treat a sick house, once a day.'; return; }
      s.st[i] = 2; docs--; ctx.sfx('good'); note.textContent = `House ${i + 1} treated and recovered.`;
    } else if (s.cl[i]) { s.cl[i] = false; doors++; }
    else if (doors > 0) { s.cl[i] = true; doors--; ctx.sfx('tap'); note.textContent = `House ${i + 1} is shut: it cannot catch or pass the fever today.`; }
    else { note.textContent = 'No doors left today. Tap a closed house to reopen it.'; return; }
    render();
  }
  function endDay(): void {
    if (ctx.finished) return;
    const before = s.st.filter((v) => v === 1).length;
    s = step(s); docs = 1; doors = 2; ever = Math.max(ever, 0);
    ever += s.st.filter((v, i) => v === 1 && s.sd[i] === 0).length;
    note.textContent = `Day ${s.day - 1} over. ${before} were sick going in.`; ctx.sfx('tick'); render();
    const lost = gone(s), sick = s.st.filter((v) => v === 1).length;
    const score = Math.max(0, (COLS * ROWS - lost) * 80 + (COLS * ROWS - ever) * 40);
    if (lost >= LOSE_AT) ctx.finish({ result: 'lose', score: 0, title: 'The town empties', detail: `${lost} houses were lost to the fever by day ${s.day - 1}.` });
    else if (s.day > DAYS || sick === 0) ctx.finish({ result: 'win', score, title: 'The fever breaks', detail: `${COLS * ROWS - lost} houses stand. ${ever} cases in all, ${lost} lost.` });
  }

  function best(a: Sim): { doc: number; c: number[] } {
    const sickIdx = a.st.flatMap((v, i) => (v === 1 ? [i] : []));
    const ok = a.st.flatMap((v, i) => (v !== 3 ? [i] : []));
    const rollout = (x: Sim): number => {
      let y = x;
      while (y.day <= DAYS && gone(y) < LOSE_AT && y.st.some((v) => v === 1)) {
        const st = y.st.slice(); const sdv = y.sd;
        let o = -1; st.forEach((v, i) => { if (v === 1 && (o < 0 || sdv[i] > sdv[o])) o = i; }); if (o >= 0) st[o] = 2;
        const cl = y.cl.map(() => false);
        const exp = st.map((v, i) => (v === 0 ? adj[i].filter((j) => st[j] === 1).length : -1));
        for (let k = 0; k < 2; k++) { let b = -1; exp.forEach((e, i) => { if (e > 0 && !cl[i] && (b < 0 || e > exp[b])) b = i; }); if (b >= 0) cl[b] = true; }
        y = step({ ...y, st, cl });
      }
      return gone(y) * 10 + y.st.filter((v) => v === 1).length + (y.day > DAYS ? 0 : 0);
    };
    let bestV = Infinity, res = { doc: -1, c: [] as number[] };
    for (const d of [-1, ...sickIdx]) {
      for (let x = -1; x < ok.length; x++) for (let y = x; y < ok.length; y++) {
        if (y === x && y !== -1) continue;
        const cs = [x, y].filter((k) => k >= 0).map((k) => ok[k]);
        const st = a.st.slice(); if (d >= 0) st[d] = 2;
        const cl = a.cl.map(() => false); cs.forEach((i) => (cl[i] = true));
        const v = rollout(step({ ...a, st, cl }));
        if (v < bestV) { bestV = v; res = { doc: d, c: cs }; }
      }
    }
    return res;
  }

  return {
    destroy() {},
    reset(sd) {
      rand = makeRng(sd); seed = sd; edges = []; adj = Array.from({ length: COLS * ROWS }, () => []);
      for (let i = 0; i < COLS * ROWS; i++) {
        const x = i % COLS, y = Math.floor(i / COLS);
        if (x < COLS - 1 && rand() < 0.88) edges.push([i, i + 1]);
        if (y < ROWS - 1 && rand() < 0.88) edges.push([i, i + COLS]);
        if (x < COLS - 1 && y < ROWS - 1 && rand() < 0.2) edges.push([i, i + COLS + 1]);
      }
      edges.forEach(([a, b]) => { adj[a].push(b); adj[b].push(a); });
      const st = Array(COLS * ROWS).fill(0);
      let c = 0; while (c < 2) { const i = Math.floor(rand() * st.length); if (st[i] === 0 && adj[i].length) { st[i] = 1; c++; } }
      s = { st, sd: Array(st.length).fill(0), cl: Array(st.length).fill(false), day: 1 };
      docs = 1; doors = 2; mode = 'doctor'; ever = 2; note.textContent = 'Pick a tool, tap houses, then end the day. Sick houses pass the fever along lanes.'; render();
    },
    probe: () => ({ day: s.day, st: s.st.join(''), cl: s.cl.map((b) => +b).join(''), docs, doors }),
    play(kind: Result) {
      for (let g = 0; g < 40 && !ctx.finished; g++) {
        if (kind === 'win') { const b = best(s); if (b.doc >= 0) act(b.doc, 'doctor'); b.c.forEach((i) => act(i, 'close')); }
        endDay();
      }
    },
  };
}
