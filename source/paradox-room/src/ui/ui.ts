// DOM UI: the survey office. Title sheet, chapter plans, objective slip, title block, instrument rail,
// modals and the ending. No game rules live here.
import type { Dir, FoldKind, Level } from '../core/types.ts';
import { CHAPTERS, LEVELS } from '../levels/levels.ts';
import type { Store } from '../storage/save.ts';
import { planSvg, PLAN_DEFS } from './plans.ts';

export interface UICallbacks {
  play(index: number): void;
  continueGame(): void;
  openSelect(): void;
  toTitle(): void;
  resume(): void;
  restart(): void;
  undo(): void;
  hint(): void;
  fold(kind: FoldKind): void;
  interact(): void;
  move(dir: Dir): void;
  openPause(): void;
  openSettings(): void;
  openHowTo(): void;
  settingsChanged(): void;
  resetProgress(): void;
  nextLevel(): void;
  replay(): void;
  endingDone(): void;
  replayEnding(): void;
  activeQuality(): string | null;
}

export interface HudStats {
  turns: number;
  refLabel: string;
  refValue: string;
  progress: string;
  held: number;
  total: number;
  note: string | null;
  room: string;
}

const $ = <T extends HTMLElement>(id: string): T => document.getElementById(id) as T;

export const esc = (s: string): string => s.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c] as string);

/** "THE FOLDED HALL" / "The Divided Hall" -> "The folded hall" / "The divided hall". */
export function sentence(s: string): string {
  const low = s.toLowerCase();
  return low.charAt(0).toUpperCase() + low.slice(1);
}

const cap = (k: string): string => `<span class="cap" aria-hidden="true">${k}</span>`;

const FOLD_BTN: Record<FoldKind, { key: string; label: string; title: string }> = {
  rollL: { key: 'Q', label: 'Roll left', title: 'Roll the room: the left wall becomes the floor' },
  rollR: { key: 'F', label: 'Roll right', title: 'Roll the room: the right wall becomes the floor' },
  pitchA: { key: 'X', label: 'Near wall down', title: 'Pitch the room: the near wall becomes the floor' },
  pitchB: { key: 'V', label: 'Far wall down', title: 'Pitch the room: the far wall becomes the floor' },
};

export class UI {
  private overlay = $('overlay');
  private hud = $('hud');
  private stack: { el: HTMLElement; prev: Element | null; onClose?: () => void }[] = [];
  private screenEl: HTMLElement | null = null;
  private msgTimer = 0;
  private rendererNote = '';

  constructor(
    private store: Store,
    private cb: UICallbacks,
  ) {
    document.querySelectorAll<HTMLButtonElement>('[data-move]').forEach((b) => b.addEventListener('click', () => this.cb.move(b.dataset.move as Dir)));
    this.overlay.addEventListener('keydown', (e) => this.trap(e));
    if (!document.getElementById('plan-defs')) document.body.insertAdjacentHTML('beforeend', PLAN_DEFS);
  }

  // ---------------------------------------------------------------- generic helpers
  get modalOpen(): boolean {
    return this.stack.length > 0;
  }

  get hasScreen(): boolean {
    return this.screenEl !== null;
  }

  setRendererNote(text: string): void {
    this.rendererNote = text;
  }

  private trap(e: KeyboardEvent): void {
    if (e.key !== 'Tab') return;
    const root = this.stack.length ? this.stack[this.stack.length - 1].el : this.screenEl;
    if (!root) return;
    const f = Array.from(root.querySelectorAll<HTMLElement>('button, input, [href], [tabindex]:not([tabindex="-1"])')).filter((el) => !el.hasAttribute('disabled'));
    if (!f.length) return;
    const first = f[0];
    const last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  }

  private openModal(html: string, label: string, onClose?: () => void, cls = ''): HTMLElement {
    const back = document.createElement('div');
    back.className = 'backdrop';
    back.innerHTML = `<div class="sheet modal ${cls}" role="dialog" aria-modal="true" aria-label="${esc(label)}">${html}</div>`;
    this.overlay.appendChild(back);
    this.stack.push({ el: back, prev: document.activeElement, onClose });
    const first = back.querySelector<HTMLElement>('[data-first], button, input');
    first?.focus();
    return back;
  }

  closeTop(): boolean {
    const m = this.stack.pop();
    if (!m) return false;
    m.el.remove();
    (m.prev as HTMLElement | null)?.focus?.();
    m.onClose?.();
    return true;
  }

  closeAllModals(): void {
    while (this.stack.length) {
      const m = this.stack.pop();
      m?.el.remove();
    }
  }

  private showScreen(html: string, cls: string): HTMLElement {
    this.clearScreen();
    const el = document.createElement('section');
    el.className = 'screen ' + cls;
    el.innerHTML = html;
    this.overlay.appendChild(el);
    this.screenEl = el;
    (el.querySelector('[data-first], button') as HTMLElement | null)?.focus();
    return el;
  }

  clearScreen(): void {
    this.screenEl?.remove();
    this.screenEl = null;
  }

  private on(root: HTMLElement, sel: string, fn: (el: HTMLElement) => void): void {
    root.querySelectorAll<HTMLElement>(sel).forEach((el) => el.addEventListener('click', () => fn(el)));
  }

  /** Width the title sheet covers, so the 3D room is framed beside it. */
  leftInset(): number {
    const s = this.screenEl?.querySelector('.title-sheet');
    if (!s || window.innerWidth < 760) return 0;
    return Math.ceil(s.getBoundingClientRect().right);
  }

  // ---------------------------------------------------------------- screens
  isUnlocked(i: number): boolean {
    return i === 0 || this.store.data.completed.includes(LEVELS[i - 1].id);
  }

  firstOpenIndex(): number {
    const c = this.store.data.completed;
    for (let i = 0; i < LEVELS.length; i++) if (!c.includes(LEVELS[i].id)) return i;
    return LEVELS.length - 1;
  }

  private controlsKey(): string {
    const rows: [string, string][] = [
      ['W A S D', 'Walk (arrow keys too)'],
      ['Q F', 'Roll the room left or right'],
      ['X V', 'Bring the near or far wall down'],
      ['E', 'Use a lever or switch'],
      ['Z', 'Undo a turn'],
      ['R', 'Restart the room'],
      ['H', 'Ask Ilse for a hint'],
      ['[ ]', 'Turn the view a little'],
      ['Esc', 'Pause'],
      ['M', 'Mute'],
    ];
    return `<table class="keys"><caption>Controls</caption><tbody>${rows
      .map(([k, d]) => `<tr><th scope="row">${k.split(' ').map((x) => `<kbd>${x}</kbd>`).join('')}</th><td>${d}</td></tr>`)
      .join('')}</tbody></table>`;
  }

  showTitle(): void {
    this.hud.classList.add('hidden');
    const d = this.store.data;
    const started = d.completed.length > 0 || d.last !== '1-1';
    const all = d.completed.length >= LEVELS.length;
    let i = LEVELS.findIndex((l) => l.id === d.last);
    if (i < 0 || !this.isUnlocked(i)) i = this.firstOpenIndex();
    const resume = LEVELS[i];
    const el = this.showScreen(
      `<div class="sheet title-sheet">
        <h1 class="wordmark">Paradox Room</h1>
        <p class="tagline">The floor is a matter of opinion.</p>
        <p class="premise">Ilse Varga drew a house she could never finish measuring. Every room agrees with you, then turns a quarter and disagrees. Carry the lantern, fold the rooms, and let a wall become the floor you need.</p>
        <div class="title-actions">
          <button class="btn primary" data-a="play" data-first>${started ? `Continue: ${esc(resume.id)} ${esc(sentence(resume.name))}` : 'Start the first room'}</button>
          <button class="btn" data-a="select">Open the chapter plans</button>
          <button class="btn" data-a="how">How folds work</button>
          <button class="btn" data-a="settings">Settings</button>
          ${all ? '<button class="btn" data-a="ending">Read the ending again</button>' : ''}
        </div>
        ${this.controlsKey()}
        ${this.store.ok ? '' : '<p class="note">Progress cannot be saved in this browser.</p>'}
        ${this.rendererNote ? `<p class="note">${esc(this.rendererNote)}</p>` : ''}
      </div>`,
      'title',
    );
    this.on(el, '[data-a="play"]', () => this.cb.continueGame());
    this.on(el, '[data-a="select"]', () => this.cb.openSelect());
    this.on(el, '[data-a="how"]', () => this.cb.openHowTo());
    this.on(el, '[data-a="settings"]', () => this.cb.openSettings());
    this.on(el, '[data-a="ending"]', () => this.cb.replayEnding());
  }

  showSelect(): void {
    this.hud.classList.add('hidden');
    const d = this.store.data;
    const totalNotes = LEVELS.filter((l) => l.nShards).length;
    let html = `<div class="plan-sheet sheet">
      <header class="plan-head">
        <h2>Plans of the Paradox House</h2>
        <div class="plan-tools"><button class="btn" data-a="settings">Settings</button><button class="btn" data-a="back" data-first>Back to the title</button></div>
      </header>
      <div class="panels">`;
    CHAPTERS.forEach((ch, ci) => {
      html += `<section class="panel" aria-labelledby="ch${ci}"><h3 id="ch${ci}"><span class="ch-no">${ci + 1}</span>${esc(sentence(ch.name))}</h3><p class="blurb">${esc(ch.blurb)}</p><ol class="levels">`;
      LEVELS.filter((l) => l.chapter === ci).forEach((l) => {
        const unlocked = this.isUnlocked(l.index);
        const done = d.completed.includes(l.id);
        const best = d.best[l.id];
        const status = !unlocked ? 'Not yet surveyed' : done ? `Solved in ${best ?? '?'} turns` : 'Ready to survey';
        const noteFound = d.shards.includes(l.id);
        const note = l.nShards > 0 && unlocked ? (noteFound ? '<span class="note-mark found"><span class="paper" aria-hidden="true"></span>Note found</span>' : '<span class="note-mark pencil" title="A margin note is hidden in this room">a note is hidden here?</span>') : '';
        html += `<li><button class="level ${done ? 'done' : ''} ${unlocked ? '' : 'locked'}" data-i="${l.index}" ${unlocked ? '' : 'disabled'} aria-label="${esc(`${l.id} ${sentence(l.name)}. ${status}.${l.nShards > 0 && unlocked ? (noteFound ? ' Margin note found.' : ' A margin note is hidden here.') : ''}`)}">
          <span class="mini" aria-hidden="true">${planSvg(l, !unlocked)}</span>
          <span class="ltext"><span class="lid">${l.id}</span><span class="lname">${esc(sentence(l.name))}</span><span class="lstatus">${status}</span>${note}</span>
        </button></li>`;
      });
      html += '</ol></section>';
    });
    html += `</div>
      <table class="titleblock foot-block"><tbody><tr>
        <th scope="row">Sheet</th><td>Paradox House, all floors</td>
        <th scope="row">Rooms solved</th><td>${d.completed.length} of ${LEVELS.length}</td>
        <th scope="row">Margin notes</th><td>${d.shards.length} of ${totalNotes}</td>
      </tr></tbody></table>
    </div>`;
    const el = this.showScreen(html, 'select');
    this.on(el, '[data-a="back"]', () => this.cb.toTitle());
    this.on(el, '[data-a="settings"]', () => this.cb.openSettings());
    this.on(el, '.level', (b) => this.cb.play(Number(b.dataset.i)));
  }

  // ---------------------------------------------------------------- HUD
  showHud(level: Level, foldKinds: FoldKind[]): void {
    this.clearScreen();
    this.hud.classList.remove('hidden');
    $('hudChapter').textContent = sentence(CHAPTERS[level.chapter].name);
    $('hudLevel').textContent = level.id;
    $('hudName').textContent = sentence(level.name);
    $('hudObjective').textContent = level.objective;
    this.setFolds(foldKinds);
  }

  setFolds(kinds: FoldKind[]): void {
    const a = $('actions');
    let folds = '';
    for (const k of kinds) {
      const b = FOLD_BTN[k];
      folds += `<button type="button" class="key fold" data-fold="${k}" title="${esc(b.title)}">${cap(b.key)}<span class="lbl">${b.label}</span></button>`;
    }
    const foldGroup = kinds.length
      ? `<div class="rail-group folds" role="group" aria-label="Folds">${folds}</div>`
      : '<div class="rail-group folds locked-note"><span class="lbl">Folding by hand is locked here. Use the levers.</span></div>';
    a.innerHTML = `${foldGroup}<div class="rail-group" role="group" aria-label="Actions">
      <button type="button" class="key use" data-act="use" title="Use the highlighted lever or switch">${cap('E')}<span class="lbl">Use</span></button>
      <button type="button" class="key" data-act="undo" title="Undo the last turn">${cap('Z')}<span class="lbl">Undo</span></button>
      <button type="button" class="key" data-act="restart" title="Restart this room">${cap('R')}<span class="lbl">Restart</span></button>
      <button type="button" class="key" data-act="hint" id="hintBtn">${cap('H')}<span class="lbl" id="hintLabel">Hint</span></button>
      <button type="button" class="key" data-act="menu" title="Pause menu">${cap('Esc')}<span class="lbl">Menu</span></button></div>`;
    a.querySelectorAll<HTMLElement>('[data-fold]').forEach((b) => b.addEventListener('click', () => this.cb.fold(b.dataset.fold as FoldKind)));
    a.querySelector('[data-act="use"]')?.addEventListener('click', () => this.cb.interact());
    a.querySelector('[data-act="undo"]')?.addEventListener('click', () => this.cb.undo());
    a.querySelector('[data-act="restart"]')?.addEventListener('click', () => this.cb.restart());
    a.querySelector('[data-act="hint"]')?.addEventListener('click', () => this.cb.hint());
    a.querySelector('[data-act="menu"]')?.addEventListener('click', () => this.cb.openPause());
  }

  setStats(s: HudStats): void {
    $('hudTurns').textContent = String(s.turns);
    $('hudRefLabel').textContent = s.refLabel;
    $('hudRef').textContent = s.refValue;
    $('hudProgress').textContent = s.progress;
    $('hudRoom').textContent = s.room;
    let g = '';
    for (let i = 0; i < s.total; i++) g += `<span class="gem ${i < s.held ? 'held' : ''}"></span>`;
    $('hudGlyphs').innerHTML = g;
    const row = $('hudNoteRow');
    row.classList.toggle('hidden', s.note === null);
    $('hudNote').textContent = s.note ?? '';
  }

  setObjective(text: string): void {
    $('hudObjective').textContent = text;
  }

  setHintButton(left: number, cooldownS: number): void {
    const l = document.getElementById('hintLabel');
    const b = document.getElementById('hintBtn') as HTMLButtonElement | null;
    if (!l || !b) return;
    l.textContent = left <= 0 ? 'No hints left' : cooldownS > 0 ? `Hint in ${cooldownS}s` : `Hint, ${left} left`;
    b.disabled = left <= 0;
  }

  setUseEnabled(on: boolean): void {
    const b = document.querySelector<HTMLButtonElement>('[data-act="use"]');
    if (b) b.disabled = !on;
  }

  hintFocus(kind: FoldKind | 'use' | null): void {
    document.querySelectorAll('.hinted').forEach((e) => e.classList.remove('hinted'));
    if (!kind) return;
    const sel = kind === 'use' ? '[data-act="use"]' : `[data-fold="${kind}"]`;
    document.querySelector(sel)?.classList.add('hinted');
  }

  /** Ilse's pencil note on the objective slip. Also mirrored to the live region. */
  hint(h: { stage: number; of: number; text: string } | null): void {
    const el = $('hudHint');
    if (!h) {
      el.classList.add('hidden');
      el.textContent = '';
      return;
    }
    el.classList.remove('hidden');
    el.innerHTML = `<span class="hint-no">Hint ${h.stage} of ${h.of}</span> ${esc(h.text)}`;
    // announce through the live region, but keep the band quiet: the slip already shows it
    const m = $('hudMsg');
    window.clearTimeout(this.msgTimer);
    m.classList.remove('show');
    m.classList.add('quiet');
    m.textContent = `Hint ${h.stage} of ${h.of}: ${h.text}`;
  }

  setPrompt(action: string | null, detail?: string): void {
    const p = $('prompt');
    if (!action) {
      p.classList.add('hidden');
      return;
    }
    p.classList.remove('hidden');
    p.innerHTML = `${cap('E')}<span class="pa">${esc(action)}</span>${detail ? `<span class="pd">${esc(detail)}</span>` : ''}`;
  }

  message(text: string, ms = 3600): void {
    const m = $('hudMsg');
    m.classList.remove('quiet');
    m.textContent = text;
    m.classList.toggle('show', text.length > 0);
    window.clearTimeout(this.msgTimer);
    if (text && ms > 0) this.msgTimer = window.setTimeout(() => m.classList.remove('show'), ms);
  }

  insets(): { top: number; bottom: number } {
    const t = $('hudTop').getBoundingClientRect();
    const b = $('hudBottom').getBoundingClientRect();
    const barH = Math.ceil(window.innerHeight - b.top);
    document.documentElement.style.setProperty('--mid-bottom', barH + 8 + 'px');
    return { top: Math.ceil(t.bottom) + 8, bottom: barH + 70 };
  }

  hideHud(): void {
    this.hud.classList.add('hidden');
  }

  // ---------------------------------------------------------------- modals
  showPause(): void {
    const el = this.openModal(
      `<h2>Paused</h2><p class="sub">The House waits. Nothing moves while you think.</p>
       <div class="stack"><button class="btn primary" data-a="resume" data-first>Resume</button>
       <button class="btn" data-a="restart">Restart this room</button>
       <button class="btn" data-a="how">How folds work</button>
       <button class="btn" data-a="settings">Settings</button>
       <button class="btn" data-a="select">Open the chapter plans</button>
       <button class="btn" data-a="title">Leave to the title</button></div>`,
      'Paused',
    );
    this.on(el, '[data-a="resume"]', () => this.cb.resume());
    this.on(el, '[data-a="restart"]', () => {
      this.closeTop();
      this.cb.restart();
    });
    this.on(el, '[data-a="how"]', () => this.cb.openHowTo());
    this.on(el, '[data-a="settings"]', () => this.cb.openSettings());
    this.on(el, '[data-a="select"]', () => this.cb.openSelect());
    this.on(el, '[data-a="title"]', () => this.cb.toTitle());
  }

  private qualityNote(): string {
    const s = this.store.data.settings;
    const a = this.cb.activeQuality();
    if (!a) return 'The flat view has no graphics options.';
    const name = a.charAt(0).toUpperCase() + a.slice(1);
    return s.quality === 'auto' ? `Auto picked ${name} for this device.` : `${name} is in use.`;
  }

  showSettings(): void {
    const s = this.store.data.settings;
    const qs: [string, string][] = [
      ['auto', 'Auto'],
      ['low', 'Low'],
      ['medium', 'Medium'],
      ['high', 'High'],
    ];
    const el = this.openModal(
      `<h2>Settings</h2>
       <label class="field"><span>Volume <output id="volOut">${Math.round(s.volume * 100)}</output></span><input id="setVol" type="range" min="0" max="100" value="${Math.round(s.volume * 100)}" aria-label="Master volume" /></label>
       <label class="check"><input id="setMute" type="checkbox" ${s.muted ? 'checked' : ''} /> Mute sound</label>
       <label class="check"><input id="setFx" type="checkbox" ${this.effectsOn() ? 'checked' : ''} /> Camera effects (fold animation, bobbing, shake)</label>
       <label class="check"><input id="setCon" type="checkbox" ${s.contrast ? 'checked' : ''} /> High-contrast outlines</label>
       <div class="field"><span id="qLab">Graphics quality</span><div class="seg" role="group" aria-labelledby="qLab">
         ${qs.map(([v, n]) => `<button type="button" class="btn small ${s.quality === v ? 'on' : ''}" data-q="${v}" aria-pressed="${s.quality === v}">${n}</button>`).join('')}</div>
         <span class="hint-line" id="qNote">${esc(this.qualityNote())}</span></div>
       <div class="field"><span id="tsLab">Text size</span><div class="seg" role="group" aria-labelledby="tsLab">
         ${['Small', 'Medium', 'Large'].map((n, i) => `<button type="button" class="btn small ${s.textSize === i ? 'on' : ''}" data-ts="${i}" aria-pressed="${s.textSize === i}">${n}</button>`).join('')}</div></div>
       <div class="field"><span>Progress</span><button class="btn small" id="setReset" type="button">Erase solved rooms and notes</button><span class="hint-line" id="resetNote"></span></div>
       ${this.store.ok ? '' : '<p class="note">Saving is unavailable in this browser; progress lasts until you close the tab.</p>'}
       <div class="stack"><button class="btn primary" data-a="close" data-first>Close settings</button></div>`,
      'Settings',
      () => this.cb.settingsChanged(),
    );
    const vol = el.querySelector<HTMLInputElement>('#setVol') as HTMLInputElement;
    vol.addEventListener('input', () => {
      s.volume = Number(vol.value) / 100;
      (el.querySelector('#volOut') as HTMLElement).textContent = vol.value;
      this.store.save();
      this.cb.settingsChanged();
    });
    const bindCheck = (id: string, set: (v: boolean) => void): void =>
      (el.querySelector(id) as HTMLInputElement).addEventListener('change', (e) => {
        set((e.target as HTMLInputElement).checked);
        this.store.save();
        this.cb.settingsChanged();
      });
    bindCheck('#setMute', (v) => (s.muted = v));
    bindCheck('#setFx', (v) => (s.effects = v));
    bindCheck('#setCon', (v) => (s.contrast = v));
    const seg = (attr: string, apply: (v: string) => void): void =>
      el.querySelectorAll<HTMLButtonElement>(`[data-${attr}]`).forEach((b) =>
        b.addEventListener('click', () => {
          apply(b.dataset[attr] as string);
          this.store.save();
          this.cb.settingsChanged();
          el.querySelectorAll<HTMLElement>(`[data-${attr}]`).forEach((x) => {
            x.classList.toggle('on', x === b);
            x.setAttribute('aria-pressed', String(x === b));
          });
          (el.querySelector('#qNote') as HTMLElement).textContent = this.qualityNote();
        }),
      );
    seg('q', (v) => (s.quality = v as typeof s.quality));
    seg('ts', (v) => (s.textSize = Number(v) as 0 | 1 | 2));
    let armed = false;
    const rb = el.querySelector<HTMLButtonElement>('#setReset') as HTMLButtonElement;
    rb.addEventListener('click', () => {
      if (!armed) {
        armed = true;
        rb.textContent = 'Click again to erase';
        (el.querySelector('#resetNote') as HTMLElement).textContent = 'This clears solved rooms and margin notes. Settings stay.';
        return;
      }
      this.cb.resetProgress();
      armed = false;
      rb.textContent = 'Erase solved rooms and notes';
      (el.querySelector('#resetNote') as HTMLElement).textContent = 'Progress erased.';
    });
    this.on(el, '[data-a="close"]', () => this.closeTop());
  }

  effectsOn(): boolean {
    const e = this.store.data.settings.effects;
    return e === null ? !window.matchMedia('(prefers-reduced-motion: reduce)').matches : e;
  }

  showHowTo(): void {
    const el = this.openModal(
      `<h2>How folds work</h2>
       <ol class="rules">
         <li><b>You stand on a floor.</b> Down is whichever wall the room is lying on. You walk on it in four directions; you never climb or jump.</li>
         <li><b>You cannot step onto nothing.</b> A lit square marks every step that works. A pale cross marks a way that is closed.</li>
         <li><b>A fold turns the room a quarter-turn.</b> A wall becomes the floor. If nothing is under you afterwards, you fall along the new down until you land.</li>
         <li><b>No floor at all? The fold is refused.</b> Nothing is lost.</li>
         <li><b>Axioms</b> (amber crystals) open the gate. <b>Levers</b> fold a room for you. <b>Switches</b> toggle doors; <b>plates</b> stay pressed.</li>
         <li><b>Portals</b> (shimmering rings with a letter) join two rooms. Each room remembers how it was turned when you left.</li>
         <li><b>Stuck?</b> Undo with <kbd>Z</kbd>, restart with <kbd>R</kbd>, or ask Ilse for a hint with <kbd>H</kbd>.</li>
       </ol>
       <div class="stack"><button class="btn primary" data-a="close" data-first>Back to the House</button></div>`,
      'How folds work',
    );
    this.on(el, '[data-a="close"]', () => this.closeTop());
  }

  showComplete(level: Level, turns: number, par: number, folds: number, hints: number, hasNext: boolean, newBest: boolean): void {
    const el = this.openModal(
      `<h2>${esc(sentence(level.name))} is solved</h2>
       <p class="sub">The gate opens, and so does the next room.${newBest ? ' That is your best count for this room.' : ''}</p>
       <table class="titleblock sum"><tbody>
         <tr><th scope="row">Sheet</th><td>${esc(level.id)}</td><th scope="row">Turns</th><td>${turns}</td></tr>
         <tr><th scope="row">Shortest known</th><td>${par}</td><th scope="row">Folds</th><td>${folds}</td></tr>
         <tr><th scope="row">Hints used</th><td>${hints}</td><th scope="row">Result</th><td>${turns <= par ? 'Matched the shortest' : `${turns - par} over`}</td></tr>
       </tbody></table>
       <div class="stack"><button class="btn primary" data-a="next" data-first>${hasNext ? 'Go to the next room' : 'Finish the House'}</button>
       <button class="btn" data-a="replay">Replay this room</button><button class="btn" data-a="select">Open the chapter plans</button></div>`,
      'Room solved',
    );
    this.on(el, '[data-a="next"]', () => this.cb.nextLevel());
    this.on(el, '[data-a="replay"]', () => this.cb.replay());
    this.on(el, '[data-a="select"]', () => this.cb.openSelect());
  }

  showEnding(shards: number, total: number): void {
    this.hud.classList.add('hidden');
    const cards: string[] = [
      'The last gate opens. Behind it there is nothing but the plan the House was drawn on.',
      'Every room folds flat. Every wall lies down beside the floor it was always standing on.',
      'Ilse Varga left a line in the margin of the final page: “The room I could not finish was never a place. It was a question. Which way is down for you?”',
      shards >= total
        ? 'And in the smallest margin, three notes in her hand: “Down is wherever you decide to stand. Decide gently.”'
        : `Margin notes found: ${shards} of ${total}. The rest are still folded away somewhere in the House.`,
      'Fold it again whenever you like.',
    ];
    let i = 0;
    const el = this.showScreen(
      `<div class="sheet ending"><p class="card-no" id="endNo"></p><p class="card-text" id="endText" aria-live="polite"></p>
       <div class="row"><button class="btn primary" data-a="next" data-first id="endNext">Turn the page</button><button class="btn" data-a="skip">Skip to the title</button></div></div>`,
      'ending-screen',
    );
    const text = el.querySelector<HTMLElement>('#endText') as HTMLElement;
    const no = el.querySelector<HTMLElement>('#endNo') as HTMLElement;
    const next = el.querySelector<HTMLButtonElement>('#endNext') as HTMLButtonElement;
    const show = (): void => {
      text.classList.remove('in');
      text.textContent = cards[i];
      no.textContent = `Page ${i + 1} of ${cards.length}`;
      void text.offsetWidth;
      text.classList.add('in');
      next.textContent = i === cards.length - 1 ? 'Back to the title' : 'Turn the page';
    };
    show();
    next.addEventListener('click', () => {
      if (i >= cards.length - 1) this.cb.endingDone();
      else {
        i++;
        show();
      }
    });
    this.on(el, '[data-a="skip"]', () => this.cb.endingDone());
  }
}
