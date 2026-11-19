import { h } from '../core/dom';
import type { Ctx, Instance, Result } from '../core/types';

/** Ice House: five summer days, one hour per beat. Vent at night to refill the cold in the walls, shade by day, and keep the ice. */
const DAYS = 5, BASE = [13, 15, 17, 19, 21], AMP = 9, REF = 9, HOUR_T = 0.42, SHADE_HOURS = 8, WIN_ICE = 40;
const P = { kv: 0.9, kc: 0.1, su: 3.5, ss: 0.6, rec: 2.2, melt: 0.8 };
const outside = (d: number, hr: number): number => BASE[d] + AMP * -Math.cos((2 * Math.PI * (hr - 4)) / 24);
const isSun = (hr: number): boolean => hr >= 8 && hr <= 18;

export default function iceHouse(ctx: Ctx): Instance {
  let day = 0, hour = 0, acc = 0, chill = 60, ice = 100, vent = false, shade = false, shadeLeft = SHADE_HOURS, last = 0;

  const cv = ctx.canvas(480, 250), g = cv.g;
  const wrap = h('div', { class: 'ih' });
  cv.el.style.cssText = 'width:100%;height:auto;aspect-ratio:480/250;border-radius:10px;border:2px solid var(--mw-ember);background:var(--mw-night)';
  const barChill = h('i', {}), barIce = h('i', {});
  const bVent = h('button', { class: 'mw-btn ih-t', type: 'button', 'data-vent': '', 'aria-pressed': 'false', onclick: () => toggleVent() });
  const bShade = h('button', { class: 'mw-btn ih-t', type: 'button', 'data-shade': '', 'aria-pressed': 'false', onclick: () => toggleShade() });
  const note = h('p', { class: 'mw-note', role: 'status' }, 'Vent open: cold night air refills the walls, hot day air drains them. Shade cuts the sun.');
  const style = h('style', null, `
    .ih{width:100%;max-width:440px;display:flex;flex-direction:column;gap:8px}
    .ih-m{display:grid;grid-template-columns:64px 1fr 44px;gap:8px;align-items:center;font:700 .85rem var(--mw-font-slab);color:var(--mw-bone)}
    .ih-m .mw-meter{max-width:none}.ih-m .ice i{background:var(--mw-bone)}
    .ih-b{display:grid;grid-template-columns:1fr 1fr;gap:10px}
    .ih-t{min-height:58px;font-size:1rem;flex-direction:column;gap:4px}.ih-t small{font:600 .72rem var(--mw-font-slab);opacity:.85}
    .ih-t[aria-pressed=true]{background:var(--mw-wine);border-color:var(--mw-rose)}
  `);
  wrap.append(cv.el, h('div', { class: 'ih-m' }, h('span', null, 'Wall cold'), h('div', { class: 'mw-meter' }, barChill), h('span', { id: 'ih-c' })),
    h('div', { class: 'ih-m' }, h('span', null, 'Ice'), h('div', { class: 'mw-meter ice' }, barIce), h('span', { id: 'ih-i' })),
    h('div', { class: 'ih-b' }, bVent, bShade), note);
  ctx.root.append(style, wrap);

  function labels(): void {
    bVent.replaceChildren('Vent', h('small', null, vent ? 'OPEN' : 'shut'));
    bVent.setAttribute('aria-pressed', String(vent));
    bShade.replaceChildren('Shade', h('small', null, shade ? `UP - ${shadeLeft}h cloth left` : `down - ${shadeLeft}h cloth left`));
    bShade.setAttribute('aria-pressed', String(shade));
  }
  function hud(): void {
    ctx.hud('Day', `${day + 1}/${DAYS}`); ctx.hud('Hour', `${String(hour).padStart(2, '0')}:00`); ctx.hud('Ice', `${Math.max(0, Math.round(ice))}%`);
    (barChill as HTMLElement).style.width = `${chill}%`; (barIce as HTMLElement).style.width = `${Math.max(0, ice)}%`;
    (wrap.querySelector('#ih-c') as HTMLElement).textContent = `${Math.round(chill)}`; (wrap.querySelector('#ih-i') as HTMLElement).textContent = `${Math.max(0, Math.round(ice))}%`;
  }
  /** Player action: open or shut the vent. */
  function toggleVent(): void { if (ctx.finished) return; vent = !vent; ctx.sfx('tap'); labels(); }
  /** Player action: raise or lower the shade cloth (limited hours per day). */
  function toggleShade(): void { if (ctx.finished) return; if (!shade && shadeLeft <= 0) { ctx.sfx('bad'); return; } shade = !shade; ctx.sfx('tap'); labels(); }

  function tick(): void {
    const e = outside(day, hour);
    if (shade) { shadeLeft--; if (shadeLeft <= 0) shade = false; }
    const heat = Math.max(0, e - REF) * (vent ? P.kv : P.kc) + (isSun(hour) ? (shade ? P.ss : P.su) : 0) - (vent ? Math.max(0, REF - e) * P.rec : 0);
    chill = Math.min(100, chill - heat);
    last = heat;
    if (chill < 0) { ice += chill * P.melt; chill = 0; }
    hour++;
    if (hour >= 24) { hour = 0; day++; shadeLeft = SHADE_HOURS; }
    labels(); hud();
    if (ice <= 0) { ice = 0; hud(); ctx.finish({ result: 'lose', score: day * 100, title: 'The ice is gone', detail: `The ice melted on day ${Math.min(day + 1, DAYS)}. Vent only in cold air and shade the hot hours.` }); return; }
    if (day >= DAYS) {
      day = DAYS - 1; hud();
      if (ice >= WIN_ICE) ctx.finish({ result: 'win', score: Math.round(ice) * 10, title: 'Ice through the summer', detail: `${Math.round(ice)}% of the ice is left after five days.` });
      else ctx.finish({ result: 'lose', score: Math.round(ice) * 10, title: 'Too little left', detail: `Only ${Math.round(ice)}% of the ice survived; ${WIN_ICE}% was needed.` });
    }
  }
  function update(dt: number): void {
    if (ctx.finished) return;
    acc += dt;
    if (acc >= HOUR_T) { acc -= HOUR_T; tick(); }
  }
  function draw(): void {
    const c = ctx.c, W = 480, H = 250, L = 34, R = 470, T = 26, B = 214;
    const X = (hr: number): number => L + ((R - L) * hr) / 24, Y = (t: number): number => B - ((B - T) * (t - 0)) / 30;
    g.clearRect(0, 0, W, H); g.fillStyle = c.night; g.fillRect(0, 0, W, H);
    g.fillStyle = c.umber; g.globalAlpha = 0.55; g.fillRect(X(8), T, X(18) - X(8), B - T); g.globalAlpha = 1;
    g.fillStyle = c.smoke; g.font = '600 12px sans-serif'; g.textAlign = 'center'; g.fillText('SUN HOURS', X(13), T + 12);
    g.textAlign = 'right'; g.fillStyle = c.ash; for (const t of [0, 10, 20, 30]) { g.fillText(`${t}°`, L - 6, Y(t) + 4); g.strokeStyle = c.umber; g.lineWidth = 1; g.beginPath(); g.moveTo(L, Y(t)); g.lineTo(R, Y(t)); g.stroke(); }
    g.textAlign = 'center'; for (const hr of [0, 6, 12, 18, 24]) g.fillText(String(hr), X(hr), B + 16);
    g.strokeStyle = c.rose; g.setLineDash([6, 5]); g.lineWidth = 2; g.beginPath(); g.moveTo(L, Y(REF)); g.lineTo(R, Y(REF)); g.stroke(); g.setLineDash([]);
    g.fillStyle = c.rose; g.textAlign = 'center'; g.fillText(`${REF}° cold line: vent when below it`, X(12), Y(REF) + 17);
    const d = Math.min(day, DAYS - 1);
    g.lineWidth = 2; g.strokeStyle = c.smoke; g.globalAlpha = 0.7; g.setLineDash([3, 5]); g.beginPath();
    for (let hr = 0; hr <= 24; hr++) { if (hr === 0) g.moveTo(X(hr), Y(outside(d, hr))); else g.lineTo(X(hr), Y(outside(d, hr))); }
    g.stroke(); g.setLineDash([]); g.globalAlpha = 1;
    g.lineWidth = 3.5; g.strokeStyle = c.bone; g.beginPath();
    for (let hr = 0; hr <= hour; hr++) { if (hr === 0) g.moveTo(X(hr), Y(outside(d, hr))); else g.lineTo(X(hr), Y(outside(d, hr))); }
    g.stroke();
    const nx = X(hour), ny = Y(outside(d, hour));
    g.fillStyle = outside(d, hour) < REF ? c.rose : c.red; g.beginPath(); g.arc(nx, ny, 7, 0, 7); g.fill(); g.strokeStyle = c.bone; g.lineWidth = 2; g.stroke();
    g.fillStyle = c.bone; g.font = '700 14px sans-serif'; g.textAlign = 'left'; g.fillText(`Now ${String(hour).padStart(2, '0')}:00, ${Math.round(outside(d, hour))}° outside`, L + 6, T + 13);
    g.fillStyle = vent ? c.rose : c.ash; g.textAlign = 'left'; g.font = '700 13px sans-serif'; g.fillText(vent ? 'VENT OPEN' : 'vent shut', L, H - 6);
    g.fillStyle = shade ? c.rose : c.ash; g.textAlign = 'right'; g.fillText(shade ? 'SHADE UP' : 'shade down', R, H - 6);
    g.fillStyle = last > 0 ? c.red : c.rose; g.textAlign = 'center'; g.fillText(last > 0 ? 'walls warming' : 'walls chilling', W / 2, H - 6);
  }
  ctx.keys({ v: (dn) => dn && toggleVent(), s: (dn) => dn && toggleShade() });
  ctx.loop(update, draw);

  return {
    destroy() {},
    reset() { day = 0; hour = 0; acc = 0; chill = 60; ice = 100; vent = false; shade = false; shadeLeft = SHADE_HOURS; last = 0; labels(); hud(); },
    probe: () => ({ day, hour, vent, shade, chill: Math.round(chill), ice: Math.round(ice) }),
    play(kind: Result) {
      for (let guard = 0; guard < 20000 && !ctx.finished; guard++) {
        if (kind === 'win') {
          if (vent !== outside(day, hour) < REF) toggleVent();
          if (shade !== (hour >= 9 && hour <= 16) && (shade || shadeLeft > 0)) toggleShade();
        }
        update(1 / 60);
      }
    },
  };
}
