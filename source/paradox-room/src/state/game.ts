// Game controller: state machine, input handling, save/hint/undo glue between the pure rules and the DOM.
import type { Action, Dir, FoldKind, GEvent, GState, Level } from '../core/types.ts';
import { applyAction, cloneState, crystalsLeft, initialState, interactables, stateKey } from '../core/rules.ts';
import { solve } from '../core/solver.ts';
import { describeAction } from '../core/describe.ts';
import { LEVELS } from '../levels/levels.ts';
import { Renderer } from '../render/renderer.ts';
import type { ViewRenderer } from '../render/types.ts';
import { Renderer3D } from '../render3d/scene3d.ts';
import { Sfx } from '../audio/audio.ts';
import { Store } from '../storage/save.ts';
import { UI, sentence, type UICallbacks } from '../ui/ui.ts';
import { commandFor } from './input.ts';

type Mode = 'title' | 'select' | 'play' | 'paused' | 'complete' | 'ending';

const MIN_TURN_GAP = 110; // ms between turns when a key is held
const HINT_COOLDOWN = 6000;
const HINT_MAX = 3;
const SOFTLOCK_CAP = 150000;

const REASONS: Record<string, string> = {
  wall: 'A wall blocks the way.',
  void: 'There is no floor there.',
  edge: 'The room ends there.',
  nofloor: 'The fold finds no floor.',
  farside: 'The far side has no floor. Fold that room first.',
  doorway: 'Something is standing in the doorway.',
  locked: 'This room will not fold by hand. Find a lever.',
};

interface Snap {
  state: GState;
  turns: number;
  folds: number;
}

export class Game implements UICallbacks {
  private store = new Store();
  private sfx = new Sfx();
  private renderer: ViewRenderer;
  private canvas: HTMLCanvasElement;
  private ui: UI;
  private mode: Mode = 'title';
  private level: Level = LEVELS[0];
  private state: GState = initialState(LEVELS[0]);
  private undoStack: Snap[] = [];
  private turns = 0;
  private folds = 0;
  private hintsUsed = new Map<string, number>();
  private hintReadyAt = 0;
  private hintDir: Dir | null = null;
  private lastTurnAt = 0;
  private lastFrame = 0;
  private mouse: { x: number; y: number } | null = null;
  private drag: { x: number; y: number; moved: boolean; id: number } | null = null;
  private hover: number | null = null;
  private target: number | null = null;
  private solvable = new Set<string>();
  private ambientFor = -1;
  private hintLabel = '';
  private running = false;
  private completeTimer = 0;
  private softTimer = 0;
  private systemEffects = true;

  constructor(canvas: HTMLCanvasElement) {
    this.store.load();
    this.canvas = canvas;
    this.ui = new UI(this.store, this);
    this.renderer = this.makeRenderer(canvas);
    if (this.renderer.kind === '2d') this.ui.setRendererNote('WebGL 2 is not available in this browser, so the House is drawn in the simpler flat view.');
    this.applySettings();
    window.addEventListener('resize', () => this.onResize());
    window.addEventListener('keydown', (e) => this.onKey(e));
    window.addEventListener('pointerdown', () => this.gesture(), { capture: true });
    this.bindCanvas(canvas);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        this.running = false;
        this.sfx.suspend();
      } else {
        this.sfx.resume();
        this.start();
      }
    });
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    this.systemEffects = !mq.matches;
    mq.addEventListener?.('change', () => {
      this.systemEffects = !mq.matches;
    });
    // `?level=2-1` opens a room directly (used for posters and checks); `?debug` exposes the controller.
    const params = new URLSearchParams(location.search);
    if (params.has('debug')) (window as unknown as { __paradox: Game }).__paradox = this;
    // `?quality=medium` forces a graphics level for this visit only (headless poster capture).
    const qp = params.get('quality');
    if (qp === 'low' || qp === 'medium' || qp === 'high') this.renderer.setQuality(qp);
    const want = params.get('level');
    const wi = want ? LEVELS.findIndex((l) => l.id === want) : -1;
    if (wi >= 0) this.beginLevel(wi);
    else this.toTitle();
    this.start();
  }

  /** WebGL 3D when possible; the Canvas 2D view otherwise. */
  private makeRenderer(canvas: HTMLCanvasElement): ViewRenderer {
    try {
      return new Renderer3D(canvas, this.store.data.settings.quality, {
        onContextLost: () => this.ui.message('The graphics card stopped drawing. Waiting for it to come back.', 0),
        onContextRestored: () => this.ui.message('The view is back.'),
        onContextGone: () => this.fallBackTo2D(),
      });
    } catch {
      try {
        return new Renderer(canvas);
      } catch {
        // a canvas that already holds a (failed) WebGL context cannot give a 2D one: use a fresh canvas
        return new Renderer(this.freshCanvas(false));
      }
    }
  }

  private freshCanvas(bind = true): HTMLCanvasElement {
    const fresh = this.canvas.cloneNode(false) as HTMLCanvasElement;
    this.canvas.replaceWith(fresh);
    this.canvas = fresh;
    if (bind) this.bindCanvas(fresh);
    return fresh;
  }

  /** The WebGL context did not come back: continue in the flat 2D view without losing the turn. */
  private fallBackTo2D(): void {
    if (this.renderer.kind === '2d') return;
    try {
      this.renderer.dispose();
    } catch {
      /* the context is already gone */
    }
    this.renderer = new Renderer(this.freshCanvas());
    this.renderer.setState(this.level, this.state);
    this.onResize();
    this.ui.setRendererNote('The 3D view was lost, so the House is now drawn in the simpler flat view.');
    this.ui.message('The 3D view was lost. Continuing in the flat view.', 0);
  }

  private bindCanvas(canvas: HTMLCanvasElement): void {
    canvas.addEventListener('pointermove', (e) => {
      this.mouse = { x: e.clientX, y: e.clientY };
      const d = this.drag;
      if (d && e.pointerId === d.id) {
        const dx = e.clientX - d.x;
        const dy = e.clientY - d.y;
        if (d.moved || Math.hypot(dx, dy) > 6) {
          d.moved = true;
          this.renderer.orbit(-dx * 0.004, dy * 0.003);
          d.x = e.clientX;
          d.y = e.clientY;
        }
      }
    });
    canvas.addEventListener('pointerleave', () => {
      this.mouse = null;
    });
    canvas.addEventListener('pointerdown', (e) => {
      this.drag = { x: e.clientX, y: e.clientY, moved: false, id: e.pointerId };
    });
    canvas.addEventListener('pointerup', (e) => {
      const d = this.drag;
      this.drag = null;
      if (!d || d.moved || e.pointerId !== d.id) return;
      if (this.mode === 'play' && this.hover !== null) this.act({ t: 'use', obj: this.hover });
    });
    canvas.addEventListener('pointercancel', () => {
      this.drag = null;
    });
  }

  activeQuality(): string | null {
    return this.renderer?.activeQuality ?? null;
  }

  private start(): void {
    if (this.running) return;
    this.running = true;
    this.lastFrame = performance.now();
    requestAnimationFrame((t) => this.loop(t));
  }

  // ------------------------------------------------------------------ settings and helpers
  private effects(): boolean {
    const e = this.store.data.settings.effects;
    return e === null ? this.systemEffects : e;
  }

  private applySettings(): void {
    const s = this.store.data.settings;
    this.sfx.setVolume(s.volume);
    this.sfx.setMuted(s.muted);
    document.documentElement.dataset.text = String(s.textSize);
    document.documentElement.dataset.contrast = s.contrast ? '1' : '0';
    this.renderer.setQuality(s.quality);
    this.onResize();
  }

  settingsChanged(): void {
    this.applySettings();
  }

  private onResize(): void {
    this.renderer.resize();
    this.refreshInsets();
  }

  private refreshInsets(): void {
    if (this.mode === 'play' || this.mode === 'paused' || this.mode === 'complete') {
      const i = this.ui.insets();
      this.renderer.setInsets(i.top, i.bottom);
    } else this.renderer.setInsets(0, 0, this.mode === 'title' ? this.ui.leftInset() : 0);
  }

  private gesture(): void {
    this.sfx.unlock();
    if (this.ambientFor < 0) {
      this.ambientFor = this.level.chapter;
      this.sfx.startAmbient(this.ambientFor);
    }
  }

  // ------------------------------------------------------------------ loop
  private loop(now: number): void {
    if (!this.running) return;
    const dt = Math.min(0.05, Math.max(0, (now - this.lastFrame) / 1000));
    this.lastFrame = now;
    const playing = this.mode === 'play' || this.mode === 'paused' || this.mode === 'complete';
    if (!playing) this.renderer.attractTick(dt, this.effects());
    if (playing && this.mouse && this.mode === 'play' && !this.drag?.moved) {
      const ids = interactables(this.level, this.state);
      const h = this.renderer.pick(this.mouse.x, this.mouse.y, ids);
      if (h !== this.hover) {
        this.hover = h;
        this.refreshPrompt();
      }
    } else if (this.hover !== null) {
      this.hover = null;
      this.refreshPrompt();
    }
    if (playing) this.tickHintLabel(now);
    this.renderer.frame(dt, {
      effects: this.effects(),
      contrast: this.store.data.settings.contrast,
      hintDir: this.hintDir,
      target: this.target,
      hover: this.hover,
      showPlayer: playing,
    });
    requestAnimationFrame((t) => this.loop(t));
  }

  // ------------------------------------------------------------------ navigation
  toTitle(): void {
    this.ui.closeAllModals();
    this.mode = 'title';
    window.clearTimeout(this.completeTimer);
    this.level = LEVELS[0];
    this.state = initialState(this.level);
    this.renderer.setState(this.level, this.state);
    this.renderer.recenter();
    this.ui.showTitle();
    this.refreshInsets();
  }

  openSelect(): void {
    this.ui.closeAllModals();
    window.clearTimeout(this.completeTimer);
    this.mode = 'select';
    this.refreshInsets();
    this.ui.showSelect();
  }

  continueGame(): void {
    const d = this.store.data;
    let i = LEVELS.findIndex((l) => l.id === d.last);
    if (i < 0 || !this.ui.isUnlocked(i)) i = this.ui.firstOpenIndex();
    this.play(i);
  }

  play(index: number): void {
    this.sfx.ui();
    this.hintsUsed.delete(LEVELS[index].id);
    this.beginLevel(index);
  }

  private beginLevel(index: number): void {
    this.ui.closeAllModals();
    window.clearTimeout(this.completeTimer);
    this.level = LEVELS[index];
    this.state = initialState(this.level);
    this.undoStack = [];
    this.turns = 0;
    this.folds = 0;
    this.hintDir = null;
    this.hintReadyAt = 0;
    this.mode = 'play';
    this.store.data.last = this.level.id;
    this.store.save();
    this.renderer.setState(this.level, this.state);
    this.renderer.facing = 'right';
    this.ui.showHud(this.level, this.foldKinds());
    this.ui.hint(null);
    this.refreshInsets();
    this.renderer.setCaption(sentence(this.level.rooms[this.state.room].name));
    this.refreshHud();
    this.ui.message(this.level.intro, 0);
    window.setTimeout(() => this.refreshInsets(), 50);
    if (this.ambientFor !== this.level.chapter && this.ambientFor >= 0) {
      this.ambientFor = this.level.chapter;
      this.sfx.startAmbient(this.ambientFor);
    }
  }

  resume(): void {
    this.ui.closeAllModals();
    this.mode = 'play';
  }

  openPause(): void {
    if (this.mode !== 'play') return;
    this.mode = 'paused';
    this.ui.showPause();
  }

  openSettings(): void {
    this.ui.showSettings();
  }

  openHowTo(): void {
    this.ui.showHowTo();
  }

  resetProgress(): void {
    this.store.reset();
    this.applySettings();
  }

  restart(): void {
    if (this.mode !== 'play' && this.mode !== 'paused') return;
    this.ui.closeAllModals();
    this.mode = 'play';
    this.state = initialState(this.level);
    this.undoStack = [];
    this.turns = 0;
    this.folds = 0;
    this.hintDir = null;
    this.renderer.setState(this.level, this.state);
    this.ui.setFolds(this.foldKinds());
    this.ui.hintFocus(null);
    this.sfx.undo();
    this.refreshHud();
    this.ui.message('Room restarted.');
  }

  replay(): void {
    this.hintsUsed.delete(this.level.id);
    this.beginLevel(this.level.index);
  }

  nextLevel(): void {
    const n = this.level.index + 1;
    if (n < LEVELS.length) {
      this.hintsUsed.delete(LEVELS[n].id);
      this.beginLevel(n);
    } else {
      this.ui.closeAllModals();
      this.runEnding();
    }
  }

  private runEnding(): void {
    this.mode = 'ending';
    this.store.data.endingSeen = true;
    this.store.save();
    const total = LEVELS.filter((l) => l.nShards > 0).length;
    this.ui.showEnding(this.store.data.shards.length, total);
  }

  replayEnding(): void {
    this.runEnding();
  }

  endingDone(): void {
    this.toTitle();
  }

  // ------------------------------------------------------------------ input
  private onKey(e: KeyboardEvent): void {
    const cmd = commandFor(e);
    if (!cmd) return;
    const target = e.target as HTMLElement | null;
    const inField = target && target.tagName === 'INPUT' && (target as HTMLInputElement).type === 'text';
    if (inField) return;
    this.gesture();
    if (cmd.c === 'mute') {
      e.preventDefault();
      const s = this.store.data.settings;
      s.muted = !s.muted;
      this.store.save();
      this.applySettings();
      this.ui.message(s.muted ? 'Sound muted.' : 'Sound on.');
      return;
    }
    if (cmd.c === 'orbit' || cmd.c === 'recenter') {
      if (this.ui.modalOpen) return;
      e.preventDefault();
      if (cmd.c === 'orbit') this.renderer.orbit(cmd.d * 0.07, 0);
      else this.renderer.recenter();
      return;
    }
    if (cmd.c === 'menu') {
      e.preventDefault();
      if (e.repeat) return;
      if (this.ui.modalOpen) {
        this.ui.closeTop();
        if (this.mode === 'paused' && !this.ui.modalOpen) this.mode = 'play';
      } else if (this.mode === 'play') this.openPause();
      else if (this.mode === 'select') this.toTitle();
      return;
    }
    if (this.mode !== 'play' || this.ui.modalOpen) {
      // Let Space/Enter activate focused buttons in menus.
      return;
    }
    // A focused HUD button handles Space itself; every other game key keeps the page still.
    if (e.code === 'Space' && target?.tagName === 'BUTTON') return;
    e.preventDefault();
    const now = performance.now();
    switch (cmd.c) {
      case 'move':
        if (e.repeat && now - this.lastTurnAt < MIN_TURN_GAP) return;
        this.move(cmd.dir);
        break;
      case 'fold':
        if (e.repeat) return;
        this.fold(cmd.kind);
        break;
      case 'interact':
        if (e.repeat) return;
        this.interact();
        break;
      case 'undo':
        if (e.repeat && now - this.lastTurnAt < MIN_TURN_GAP * 2) return;
        this.undo();
        break;
      case 'restart':
        if (e.repeat) return;
        this.restart();
        break;
      case 'hint':
        if (e.repeat) return;
        this.hint();
        break;
      default:
        break;
    }
  }

  move(dir: Dir): void {
    this.act({ t: 'move', dir });
  }

  fold(kind: FoldKind): void {
    this.act({ t: 'fold', kind });
  }

  interact(): void {
    const id = this.hover ?? this.target;
    if (id === null) {
      this.ui.message('Nothing here to use.');
      return;
    }
    this.act({ t: 'use', obj: id });
  }

  private foldKinds(): FoldKind[] {
    return this.level.rooms[this.state.room].free;
  }

  // ------------------------------------------------------------------ turns
  private act(a: Action): void {
    if (this.mode !== 'play') return;
    this.lastTurnAt = performance.now();
    const r = applyAction(this.level, this.state, a);
    if (a.t === 'move') this.renderer.facing = a.dir;
    if (!r.ok) {
      this.sfx.blocked();
      if (a.t === 'move') this.renderer.blockedNudge(a.dir);
      this.ui.message(REASONS[r.reason] ?? 'That does not work.');
      return;
    }
    if (a.t === 'use') this.renderer.used(a.obj);
    this.undoStack.push({ state: this.state, turns: this.turns, folds: this.folds });
    if (this.undoStack.length > 500) this.undoStack.shift();
    const before = this.state;
    this.state = r.state;
    this.turns++;
    this.hintDir = null;
    this.ui.hintFocus(null);
    let msg = '';
    let complete = false;
    for (const e of r.events) {
      const m = this.onEvent(e);
      if (m) msg = m;
      if (e.k === 'complete') complete = true;
      if (e.k === 'fold') this.folds++;
    }
    this.renderer.apply(before, this.state, r.events, this.effects());
    if (before.room !== this.state.room) this.ui.setFolds(this.foldKinds());
    this.ui.message(msg);
    this.refreshHud();
    if (complete) this.onComplete();
    else this.queueSoftlockCheck();
  }

  private onEvent(e: GEvent): string {
    const lvl = this.level;
    switch (e.k) {
      case 'step':
        this.sfx.step();
        return '';
      case 'fold':
        this.sfx.fold(true);
        return e.fell ? 'The room turns, and you fall to the new floor.' : 'The room turns.';
      case 'collect': {
        const o = lvl.objs[e.obj];
        if (o.kind === 'shard') {
          this.sfx.shard();
          const d = this.store.data;
          if (!d.shards.includes(lvl.id)) {
            d.shards.push(lvl.id);
            this.store.save();
          }
          return 'A margin note, in a careful hand. Saved.';
        }
        this.sfx.crystal();
        const left = crystalsLeft(lvl, this.state);
        return left === 0 ? `Axiom ${lvl.nCrystals} of ${lvl.nCrystals}. The gate is open.` : `Axiom ${lvl.nCrystals - left} of ${lvl.nCrystals} held.`;
      }
      case 'latch':
        this.sfx.click();
        return 'The plate clicks. Something opens.';
      case 'toggle':
        this.sfx.click();
        return e.on ? 'Switch on. A door opens.' : 'Switch off. A door closes.';
      case 'door':
        this.sfx.door();
        return '';
      case 'portal':
        this.sfx.portal();
        return 'Through the ring.';
      case 'sealed':
        return `The gate is sealed. ${e.remaining} ${e.remaining === 1 ? 'axiom remains' : 'axioms remain'}.`;
      default:
        return '';
    }
  }

  undo(): void {
    if (this.mode !== 'play') return;
    const s = this.undoStack.pop();
    if (!s) {
      this.ui.message('Nothing to undo.');
      return;
    }
    const roomChanged = s.state.room !== this.state.room;
    this.state = s.state;
    this.turns = s.turns;
    this.folds = s.folds;
    this.hintDir = null;
    this.ui.hintFocus(null);
    this.renderer.setState(this.level, this.state);
    if (roomChanged) this.ui.setFolds(this.foldKinds());
    this.sfx.undo();
    this.refreshHud();
    this.ui.message('Undone.');
  }

  // ------------------------------------------------------------------ HUD
  private refreshHud(): void {
    const lvl = this.level;
    const left = crystalsLeft(lvl, this.state);
    const held = lvl.nCrystals - left;
    const progress = lvl.nCrystals === 0 ? 'No axioms in this room. The gate is open.' : `${held} of ${lvl.nCrystals} ${lvl.nCrystals === 1 ? 'axiom' : 'axioms'} held`;
    const note = lvl.nShards > 0 ? (this.store.data.shards.includes(lvl.id) ? 'Found' : 'Hidden here') : null;
    const par = this.parOf(lvl);
    const best = this.store.data.best[lvl.id];
    this.ui.setStats({
      turns: this.turns,
      refLabel: best !== undefined ? 'Your best' : 'Shortest known',
      refValue: best !== undefined ? String(best) : par !== undefined ? String(par) : '',
      progress,
      held,
      total: lvl.nCrystals,
      note,
      room: sentence(lvl.rooms[this.state.room].name),
    });
    this.ui.setObjective(lvl.nCrystals > 0 && left === 0 ? 'All axioms held. Reach the gate.' : lvl.objective);
    this.refreshPrompt();
    this.tickHintLabel(performance.now(), true);
    this.refreshInsets();
  }

  private parCache = new Map<string, number>();
  private parOf(lvl: Level): number | undefined {
    if (this.parCache.has(lvl.id)) return this.parCache.get(lvl.id);
    const r = solve(lvl);
    if (r.actions) this.parCache.set(lvl.id, r.actions.length);
    return r.actions?.length;
  }

  private refreshPrompt(): void {
    const ids = interactables(this.level, this.state);
    this.target = ids.length ? ids[0] : null;
    const id = this.hover ?? this.target;
    this.ui.setUseEnabled(id !== null);
    if (id === null) {
      this.ui.setPrompt(null);
      return;
    }
    const o = this.level.objs[id];
    if (o.kind === 'lever') {
      const what = { rollL: 'rolls the room left', rollR: 'rolls the room right', pitchA: 'brings the near wall down', pitchB: 'brings the far wall down' }[o.fold as FoldKind];
      this.ui.setPrompt('Pull the lever', what);
    } else {
      const on = (this.state.ctl >> (o.bit as number)) & 1;
      this.ui.setPrompt(on ? 'Flip the switch off' : 'Flip the switch on', on ? 'the door will close' : 'a door will open');
    }
  }

  private tickHintLabel(now: number, force = false): void {
    const used = this.hintsUsed.get(this.level.id) ?? 0;
    const cd = Math.max(0, Math.ceil((this.hintReadyAt - now) / 1000));
    const label = `${HINT_MAX - used}:${cd}`;
    if (!force && label === this.hintLabel) return;
    this.hintLabel = label;
    this.ui.setHintButton(HINT_MAX - used, cd);
  }

  // ------------------------------------------------------------------ hints and soft-locks
  hint(): void {
    if (this.mode !== 'play') return;
    const lvl = this.level;
    const used = this.hintsUsed.get(lvl.id) ?? 0;
    const now = performance.now();
    if (used >= HINT_MAX) {
      this.ui.message('No hints left for this room. Start it again from the chapter plans to refresh them.');
      return;
    }
    if (now < this.hintReadyAt) {
      this.ui.message(`The next hint is ready in ${Math.ceil((this.hintReadyAt - now) / 1000)} seconds.`);
      return;
    }
    const r = solve(lvl, { from: this.state, cap: SOFTLOCK_CAP });
    if (!r.actions) {
      this.ui.message(r.capped ? 'The search is too large from here. Try undoing a few turns.' : 'This arrangement can no longer be solved. Undo (Z) or restart (R).', 0);
      return;
    }
    const stage = used + 1;
    this.hintsUsed.set(lvl.id, stage);
    this.hintReadyAt = now + HINT_COOLDOWN;
    const next = r.actions[0];
    let text: string;
    if (stage === 1) text = lvl.hints[0] ?? 'Look for what a fold would make reachable.';
    else if (stage === 2) {
      const kind = next.t === 'move' ? 'walking' : next.t === 'fold' ? 'folding the room' : 'using a lever or switch';
      text = `${lvl.hints[1] ?? ''} The shortest way from here is ${r.actions.length} more turns, and the next one is ${kind}.`.trim();
    } else {
      const d = describeAction(lvl, next);
      text = `${d.text} (${d.key}). Then ${r.actions.length - 1} more turns.`;
      if (next.t === 'move') this.hintDir = next.dir;
      else if (next.t === 'fold') this.ui.hintFocus(next.kind);
      else this.ui.hintFocus('use');
    }
    this.sfx.hint();
    this.ui.hint({ stage, of: HINT_MAX, text });
    this.tickHintLabel(now, true);
    this.refreshInsets();
  }

  private queueSoftlockCheck(): void {
    window.clearTimeout(this.softTimer);
    this.softTimer = window.setTimeout(() => this.checkSoftlock(), 40);
  }

  private checkSoftlock(): void {
    if (this.mode !== 'play') return;
    const key = stateKey(this.state);
    if (this.solvable.has(key)) return;
    const r = solve(this.level, { from: this.state, cap: SOFTLOCK_CAP });
    if (r.actions) {
      // every state along the winning path is solvable too
      let s = cloneState(this.state);
      this.solvable.add(stateKey(s));
      for (const a of r.actions) {
        const n = applyAction(this.level, s, a);
        if (!n.ok) break;
        s = n.state;
        this.solvable.add(stateKey(s));
      }
    } else if (!r.capped) {
      this.ui.message('No way forward from here. Undo (Z) or restart (R).', 0);
    }
  }

  // ------------------------------------------------------------------ completion
  private onComplete(): void {
    this.mode = 'complete';
    this.sfx.complete();
    const d = this.store.data;
    const lvl = this.level;
    if (!d.completed.includes(lvl.id)) d.completed.push(lvl.id);
    const prevBest = d.best[lvl.id];
    const newBest = prevBest === undefined || this.turns < prevBest;
    if (newBest) d.best[lvl.id] = this.turns;
    const next = LEVELS[lvl.index + 1];
    if (next) d.last = next.id;
    this.store.save();
    this.ui.message('The gate opens.');
    const par = this.parOf(lvl) ?? this.turns;
    this.completeTimer = window.setTimeout(() => {
      if (this.mode !== 'complete') return;
      this.ui.showComplete(lvl, this.turns, par, this.folds, this.hintsUsed.get(lvl.id) ?? 0, !!next, newBest);
    }, this.effects() ? 1100 : 300);
  }
}
