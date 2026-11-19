import { PALETTE, ROLES } from '../../../../design/19_mystical-western/palette.mjs';
import { h } from './dom';
import { isMuted, setMuted, sfx } from './audio';
import type { CanvasHandle, Ctx, Factory, FinishInfo, Instance, Meta } from './types';

export interface ShellOptions {
  id: string;
  title: string;
  line: string;
  meta: Meta;
  load: () => Promise<{ default: Factory }>;
  catalogUrl: string;
  coverUrl: string;
}

const colors: Record<string, string> = { ...PALETTE, ...ROLES };
const norm = (k: string): string => (k.length === 1 ? k.toLowerCase() : k);

/** The page around every game: top bar, HUD, stage, first screen, outcome screen, replay. */
export function runShell(o: ShellOptions): void {
  const app = document.getElementById('app')!;
  const hudEl = h('div', { class: 'mw-hud', role: 'group', 'aria-label': 'Status' });
  const stage = h('div', { class: 'mw-stage', id: 'stage' });
  const padEl = h('div', { class: 'mw-pad', hidden: true });
  const overlay = h('div', { class: 'mw-overlay', role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'mw-ov-title' });
  const soundBtn = h('button', { class: 'mw-icon', type: 'button', 'aria-pressed': String(!isMuted()), 'aria-label': 'Sound' }, '');
  const syncSound = (): void => { soundBtn.textContent = isMuted() ? 'Sound off' : 'Sound on'; soundBtn.setAttribute('aria-pressed', String(!isMuted())); };
  syncSound();
  soundBtn.onclick = () => { setMuted(!isMuted()); syncSound(); sfx('tap'); };
  const restartBtn = h('button', { class: 'mw-icon', type: 'button', hidden: true }, 'Restart');

  app.append(
    h('header', { class: 'mw-top' },
      h('a', { class: 'mw-back', href: o.catalogUrl }, '← Catalog'),
      h('h1', { class: 'mw-name' }, o.title),
      h('div', { class: 'mw-tools' }, restartBtn, soundBtn)),
    hudEl,
    h('main', { class: 'mw-main' }, stage, overlay),
    padEl,
  );
  document.title = `${o.title} | Mystical Western Arcade`;

  // ---- run state, mirrored on window.__arcade so the verifier can read it
  let inst: Instance | null = null;
  let state: 'intro' | 'playing' | 'over' = 'intro';
  let seed = Number(new URLSearchParams(location.search).get('seed')) || (Date.now() % 1000000);
  let finished = false;
  let outcome: FinishInfo | null = null;
  const disposers: Array<() => void> = [];
  const timers = new Set<number>();
  const held = new Set<string>();
  const keyMap: Record<string, (down: boolean) => void> = {};
  const hudItems = new Map<string, HTMLElement>();
  const publish = (): void => {
    (window as any).__arcade = { id: o.id, get state() { return state; }, get outcome() { return outcome; }, seed, inst };
  };
  publish();

  const press = (key: string, down: boolean): void => {
    const k = norm(key);
    if (finished) return;
    if (down) held.add(k); else held.delete(k);
    keyMap[k]?.(down);
  };
  const on: Ctx['on'] = (t, type, fn, opts) => { t.addEventListener(type, fn, opts); disposers.push(() => t.removeEventListener(type, fn, opts)); };
  on(window, 'keydown', (e: KeyboardEvent) => {
    const el = e.target as HTMLElement;
    if (el && /^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName)) return;
    const k = norm(e.key);
    if (!(k in keyMap) || e.ctrlKey || e.metaKey || e.altKey) return;
    if (el && el.tagName === 'BUTTON' && (k === ' ' || k === 'Enter')) return;
    e.preventDefault();
    if (!e.repeat) press(k, true);
  });
  on(window, 'keyup', (e: KeyboardEvent) => { const k = norm(e.key); if (k in keyMap) { press(k, false); } });
  on(window, 'blur', () => { for (const k of [...held]) press(k, false); });

  const ctx: Ctx = {
    root: stage,
    c: colors,
    get seed() { return seed; },
    held,
    get finished() { return finished; },
    hud(label, value) {
      let el = hudItems.get(label);
      if (!el) {
        el = h('span', { class: 'mw-hud-v' });
        hudItems.set(label, el);
        hudEl.append(h('div', { class: 'mw-hud-i' }, h('span', { class: 'mw-hud-l' }, label), el));
      }
      el.textContent = String(value);
    },
    finish(info) {
      if (finished) return;
      finished = true;
      state = 'over';
      outcome = info;
      sfx(info.result === 'win' ? 'win' : 'lose');
      showOutcome(info);
      publish();
    },
    sfx: (n) => sfx(n),
    on,
    keys(map) {
      for (const [k, fn] of Object.entries(map)) keyMap[norm(k)] = fn;
    },
    pad(buttons) {
      padEl.hidden = false;
      padEl.replaceChildren(...buttons.map((b) => {
        const el = h('button', { class: `mw-padbtn${b.wide ? ' wide' : ''}`, type: 'button', 'data-key': b.key }, b.label);
        el.addEventListener('pointerdown', (e) => { e.preventDefault(); el.setPointerCapture(e.pointerId); press(b.key, true); });
        const up = (): void => press(b.key, false);
        el.addEventListener('pointerup', up);
        el.addEventListener('pointercancel', up);
        el.addEventListener('click', (e) => { if (e.detail === 0) { press(b.key, true); press(b.key, false); } });
        return el;
      }));
    },
    canvas(w = 480, h2 = 640): CanvasHandle {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const el = h('canvas', { class: 'mw-canvas', width: Math.round(w * dpr), height: Math.round(h2 * dpr), role: 'img', 'aria-label': `${o.title} playfield` });
      const g = el.getContext('2d')!;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      stage.append(el);
      return {
        el, g, w, h: h2,
        pt(e) {
          const r = el.getBoundingClientRect();
          const s = Math.min(r.width / w, r.height / h2);
          return { x: (e.clientX - r.left - (r.width - w * s) / 2) / s, y: (e.clientY - r.top - (r.height - h2 * s) / 2) / s };
        },
      };
    },
    loop(update, draw) {
      let raf = 0, last = performance.now(), acc = 0, stopped = false;
      const frame = (t: number): void => {
        if (stopped) return;
        raf = requestAnimationFrame(frame);
        const dt = Math.min(0.1, (t - last) / 1000);
        last = t;
        if (document.hidden) return;
        acc += dt;
        while (acc >= 1 / 60) { if (!finished) update(1 / 60); acc -= 1 / 60; }
        draw();
      };
      raf = requestAnimationFrame(frame);
      const stop = (): void => { stopped = true; cancelAnimationFrame(raf); };
      disposers.push(stop);
      return { stop };
    },
    drag(el, f) {
      let active = false;
      const rel = (e: PointerEvent): [number, number] => { const r = el.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
      on(el, 'pointerdown', (e: PointerEvent) => { if (finished) return; active = true; el.setPointerCapture(e.pointerId); f.down?.(...rel(e), e); });
      on(el, 'pointermove', (e: PointerEvent) => { if (active) f.move?.(...rel(e), e); });
      const end = (e: PointerEvent): void => { if (!active) return; active = false; f.up?.(...rel(e), e); };
      on(el, 'pointerup', end);
      on(el, 'pointercancel', end);
    },
    after(ms, fn) {
      const id = window.setTimeout(() => { timers.delete(id); if (!finished) fn(); }, ms);
      timers.add(id);
    },
  };

  // ---- first screen
  const controls = o.meta.controls.length
    ? h('ul', { class: 'mw-controls', 'aria-label': 'Controls' },
        o.meta.controls.map((c) => h('li', null, h('span', { class: 'mw-keys' }, c.keys.map((k) => h('kbd', null, k))), h('span', null, c.action))))
    : null;
  function showIntro(): void {
    state = 'intro';
    overlay.hidden = false;
    overlay.dataset.kind = 'intro';
    const start = h('button', { class: 'mw-btn primary', type: 'button', id: 'mw-start' }, 'Play');
    start.onclick = () => void startRun();
    overlay.replaceChildren(
      h('div', { class: 'mw-card' },
        h('img', { class: 'mw-cover', src: o.coverUrl, alt: '', width: 120, height: 200 }),
        h('div', { class: 'mw-card-body' },
          h('h2', { class: 'mw-ov-title', id: 'mw-ov-title' }, o.title),
          h('p', { class: 'mw-how' }, o.meta.how),
          controls,
          start)));
    start.focus({ preventScroll: true });
    publish();
  }

  function showOutcome(info: FinishInfo): void {
    window.setTimeout(() => {
      if (!finished || outcome !== info) return;
      overlay.hidden = false;
      overlay.dataset.kind = 'over';
      overlay.dataset.result = info.result;
      const key = `mw:best:${o.id}`;
      let best: number | null = null;
      if (typeof info.score === 'number') {
        try {
          const prev = Number(localStorage.getItem(key));
          best = Math.max(Number.isFinite(prev) ? prev : 0, info.score);
          localStorage.setItem(key, String(best));
        } catch { best = info.score; }
      }
      const again = h('button', { class: 'mw-btn primary', type: 'button', id: 'mw-again' }, 'Play again');
      again.onclick = () => restart();
      overlay.replaceChildren(
        h('div', { class: 'mw-card over' },
          h('div', { class: 'mw-card-body' },
            h('h2', { class: 'mw-ov-title', id: 'mw-ov-title' }, info.title ?? (info.result === 'win' ? 'Well played' : 'Not this time')),
            info.detail ? h('p', { class: 'mw-how' }, info.detail) : null,
            typeof info.score === 'number' ? h('p', { class: 'mw-score' }, h('span', null, 'Score ', h('b', null, info.score)), best != null ? h('span', null, 'Best ', h('b', null, best)) : null) : null,
            h('div', { class: 'mw-actions' }, again, h('a', { class: 'mw-btn', href: o.catalogUrl }, 'Back to catalog')))));
      again.focus({ preventScroll: true });
    }, 350);
  }

  async function startRun(): Promise<void> {
    overlay.hidden = true;
    state = 'playing';
    restartBtn.hidden = false;
    try {
      const mod = await o.load();
      finished = false;
      outcome = null;
      inst = mod.default(ctx);
      inst.reset(seed);
      publish();
    } catch (err) {
      console.error(err);
      overlay.hidden = false;
      overlay.replaceChildren(h('div', { class: 'mw-card' }, h('div', { class: 'mw-card-body' }, h('h2', { class: 'mw-ov-title' }, 'This card will not load'), h('p', { class: 'mw-how' }, 'Reload the page. If it keeps failing, go back to the catalog and pick another game.'), h('a', { class: 'mw-btn', href: o.catalogUrl }, 'Back to catalog'))));
    }
  }

  function restart(): void {
    if (!inst) return;
    timers.forEach((t) => clearTimeout(t));
    timers.clear();
    for (const k of [...held]) held.delete(k);
    hudEl.replaceChildren();
    hudItems.clear();
    seed += 1;
    finished = false;
    outcome = null;
    state = 'playing';
    overlay.hidden = true;
    inst.reset(seed);
    publish();
  }
  restartBtn.onclick = () => restart();

  showIntro();
}
