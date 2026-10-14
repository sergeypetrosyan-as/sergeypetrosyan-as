import { Audio } from '../audio/Audio';
import { LEVELS } from '../levels/levels';
import { Renderer } from '../render/Renderer';
import { LENS_SIZES, LIGHT_PER_SECOND, World, type WorldEvents } from '../sim/World';
import { Ui } from '../ui/Ui';
import { Input } from './Input';
import { loadSave, writeSave, type SaveData } from './Save';

const STEP = 1 / 60;
type State = 'title' | 'intro' | 'play' | 'paused' | 'failed' | 'complete' | 'ending' | 'menu';

/**
 * Owns the loop and the flow between screens. The simulation advances in
 * fixed 1/60 s steps; rendering happens once per animation frame.
 */
export class Game {
  private readonly renderer: Renderer;
  private readonly input: Input;
  private readonly audio = new Audio();
  private readonly ui: Ui;
  private save: SaveData;
  private state: State = 'title';
  private world!: World;
  private levelIndex = 0;
  private camX = 0;
  private clock = 0;
  private shake = 0;
  private acc = 0;
  private last = 0;
  private raf = 0;
  private message: { text: string; until: number } | null = null;
  private seenDeathTip = false;
  private endingT = 0;
  private attract = false;
  private disposed = false;

  constructor(canvas: HTMLCanvasElement) {
    this.save = loadSave(LEVELS.length);
    this.renderer = new Renderer(canvas);
    this.input = new Input(canvas);
    this.audio.setSettings(this.save.settings);
    this.ui = new Ui(this.save.settings, {
      begin: () => this.beginRun(),
      continueRun: () => this.startDistrict(this.save.unlocked),
      openDistricts: () => this.openDistricts(),
      pickDistrict: (i) => this.startDistrict(i),
      resume: () => this.resume(),
      restart: () => this.startDistrict(this.levelIndex),
      next: () => this.next(),
      quit: () => this.toTitle(),
      settings: (s) => {
        this.save.settings = s;
        writeSave(this.save);
        this.audio.setSettings(s);
      },
      skipIntro: () => { if (this.state === 'intro') this.play(); },
      click: () => { this.audio.unlock(); this.audio.startMusic(); this.audio.ui(); },
    });
    window.addEventListener('resize', () => this.renderer.resize());
    document.addEventListener('visibilitychange', () => { if (document.hidden) this.pause(); });
    window.addEventListener('blur', () => this.pause());
    window.addEventListener('keydown', (e) => this.onKey(e));
    const unlockOnce = () => { this.audio.unlock(); this.audio.startMusic(); };
    window.addEventListener('pointerdown', unlockOnce, { once: true });
    window.addEventListener('keydown', unlockOnce, { once: true });
    this.toTitle();
  }

  start(): void {
    this.last = performance.now();
    const frame = (now: number) => {
      if (this.disposed) return;
      this.raf = requestAnimationFrame(frame);
      this.frame(now);
    };
    this.raf = requestAnimationFrame(frame);
  }

  // ------------------------------------------------------------------ flow
  private events(): WorldEvents {
    const pan = (x: number) => Math.max(-1, Math.min(1, ((x - this.camX) / this.renderer.viewW) * 2 - 1));
    return {
      tileShake: (x) => this.audio.shake(pan(x)),
      tileFall: (x) => { this.audio.fall(pan(x)); },
      tileRestore: (x) => this.audio.restore(pan(x)),
      signFall: (x) => this.audio.signFall(pan(x)),
      signLand: (x) => { this.audio.signLand(pan(x)); this.shake = Math.max(this.shake, 0.6); },
      crusherSlam: (x) => {
        const p = pan(x);
        if (Math.abs(p) < 1.2) { this.audio.slam(p); this.shake = Math.max(this.shake, 0.4); }
      },
      spark: (x) => { this.audio.spark(pan(x)); this.flash('A lost second, found: +2.5 s to spare.', 1.8); },
      death: () => {
        this.audio.death();
        if (!this.attract) this.flash(this.seenDeathTip ? 'Rewind her!' : 'Ilo is coming apart. Hold the circle over her to undo it.', 2.2);
        this.seenDeathTip = true;
      },
      revive: () => { this.audio.revive(); this.message = null; },
      win: () => this.audio.win(),
      budgetEmpty: () => { this.audio.empty(); if (!this.attract) this.flash('No time left to spare. Sparks give some back.', 2.5); },
    };
  }

  private flash(text: string, seconds: number): void {
    this.message = { text, until: performance.now() + seconds * 1000 };
  }

  private load(index: number, attract = false): void {
    this.levelIndex = index;
    this.attract = attract;
    const def = LEVELS[index];
    this.world = new World(def, this.events());
    this.renderer.setLevel(def);
    this.camX = this.targetCam();
    this.clock = 0;
    this.message = null;
    this.endingT = 0;
  }

  private toTitle(): void {
    this.state = 'title';
    this.input.enabled = false;
    this.input.releaseAll();
    this.load(0, true);
    const u = this.save.unlocked;
    this.ui.setTitle(u > 0 ? `Continue: ${LEVELS[u].name}` : null, this.save.bestLight);
    this.ui.show('title');
  }

  private beginRun(): void {
    this.save.run = Array(LEVELS.length).fill(null);
    writeSave(this.save);
    this.startDistrict(0);
  }

  private openDistricts(): void {
    this.ui.setDistricts(LEVELS.map((l, i) => ({ name: l.name, locked: i > this.save.unlocked, best: this.save.best[i] })));
    this.state = 'menu';
    this.ui.show('districts');
  }

  private startDistrict(i: number): void {
    this.load(Math.min(i, this.save.unlocked));
    this.state = 'intro';
    this.input.enabled = false;
    this.ui.intro(this.levelIndex, LEVELS.length, this.world.def.name, `“${this.world.def.line}”`);
    window.setTimeout(() => { if (this.state === 'intro' && this.world.def === LEVELS[this.levelIndex]) this.play(); }, 3200);
  }

  private play(): void {
    this.state = 'play';
    this.input.enabled = true;
    this.ui.show('play');
  }

  private pause(): void {
    if (this.state !== 'play') return;
    this.state = 'paused';
    this.input.enabled = false;
    this.input.releaseAll();
    this.ui.show('paused');
  }

  private resume(): void {
    if (this.state !== 'paused') return;
    this.play();
  }

  private next(): void {
    if (LEVELS[this.levelIndex].final) return;
    this.startDistrict(this.levelIndex + 1);
  }

  private onKey(e: KeyboardEvent): void {
    if (e.code === 'Escape' || e.code === 'KeyP') {
      if (this.state === 'play') this.pause();
      else if (this.state === 'paused' && e.code === 'Escape') this.resume();
    } else if (e.code === 'KeyR' && (this.state === 'play' || this.state === 'failed')) {
      this.startDistrict(this.levelIndex);
    } else if (e.code === 'Enter') {
      if (this.state === 'intro') this.play();
      else if (this.state === 'complete') this.next();
    }
  }

  /** Light left in the lantern: earlier districts of this run plus the current one. */
  private light(includeCurrent = true): number {
    let borrowed = 0;
    for (let i = 0; i < LEVELS.length; i++) {
      if (i === this.levelIndex) continue;
      if (i < this.levelIndex || this.state === 'ending') borrowed += this.save.run[i] ?? 0;
    }
    if (includeCurrent) borrowed += this.world.borrowed;
    return Math.max(0, 100 - borrowed * LIGHT_PER_SECOND);
  }

  private complete(): void {
    const i = this.levelIndex;
    const w = this.world;
    const prevBest = this.save.best[i];
    this.save.run[i] = w.borrowed;
    this.save.best[i] = prevBest === null ? w.borrowed : Math.min(prevBest, w.borrowed);
    this.save.unlocked = Math.max(this.save.unlocked, Math.min(LEVELS.length - 1, i + 1));
    writeSave(this.save);
    if (w.def.final) {
      this.state = 'ending';
      this.endingT = 0;
      this.input.enabled = false;
      this.input.releaseAll();
      this.ui.show('none');
      this.audio.dawn();
      return;
    }
    this.state = 'complete';
    this.input.enabled = false;
    this.ui.complete({
      name: w.def.name, borrowed: w.borrowed, best: prevBest, sparks: w.sparksTaken, totalSparks: w.sparks.length,
      time: w.time, light: this.light(), last: !!LEVELS[i + 1]?.final,
    });
  }

  private finishEnding(): void {
    const total = this.save.run.reduce<number>((a, b) => a + (b ?? 0), 0);
    const light = Math.max(0, 100 - total * LIGHT_PER_SECOND);
    const tier = light >= 75 ? 'dawn' : light >= 45 ? 'lantern' : 'ember';
    this.save.bestLight = Math.max(this.save.bestLight ?? 0, light);
    if (!this.save.endings.includes(tier)) this.save.endings.push(tier);
    writeSave(this.save);
    this.ui.ending(tier, light, total);
  }

  // ------------------------------------------------------------------ loop
  private targetCam(): number {
    const w = this.world;
    const vw = this.renderer.viewW;
    const focus = this.state === 'ending' ? w.def.goal : w.courier.x;
    return Math.max(-60, Math.min(w.def.length + 60 - vw, focus - vw * (this.state === 'ending' ? 0.55 : 0.33)));
  }

  private frame(now: number): void {
    const dt = Math.min(0.1, Math.max(0, (now - this.last) / 1000));
    this.last = now;
    this.input.update(dt);
    const w = this.world;
    const live = this.state === 'play' || this.state === 'title' || this.state === 'ending';

    // Lens in world space.
    if (this.state !== 'ending') {
      const lensWorld = this.renderer.toWorld(this.input.px, this.input.py, this.camX);
      w.lens.x = lensWorld.x;
      w.lens.y = lensWorld.y;
      w.lens.r = LENS_SIZES[this.input.sizeIndex];
    }
    let held = this.state === 'play' && this.input.held;
    if (this.attract) held = this.attractLens();

    if (live) {
      this.acc += dt;
      let steps = 0;
      while (this.acc >= STEP && steps < 6) {
        if (this.state === 'ending') this.stepEnding(STEP);
        else w.step(STEP, held, w.lens.r / LENS_SIZES[1]);
        this.acc -= STEP;
        steps++;
      }
      if (steps === 6) this.acc = 0;
      this.clock += w.lens.active ? -dt * 1.6 * 60 : dt * 60;
    }

    if (this.state === 'play') {
      const c = w.courier;
      if (c.won) this.complete();
      else if (c.dead && c.deadTime > 2.2) {
        this.state = 'failed';
        this.input.enabled = false;
        this.ui.failed(c.dead);
      }
    }
    if (this.attract && (w.courier.won || (w.courier.dead && w.courier.deadTime > 1.5))) this.load(0, true);

    const k = 1 - Math.exp(-dt * 4);
    this.camX += (this.targetCam() - this.camX) * k;
    this.shake = Math.max(0, this.shake - dt * 2.5);

    const hush = w.front ? Math.max(0, 1 - (w.courier.x - w.front.x) / 300) : 0;
    this.audio.update(w.lens.active && this.state !== 'ending', live ? hush : 0);

    const reduced = this.save.settings.reducedMotion;
    this.renderer.draw(w, {
      camX: this.camX,
      lens: {
        x: w.lens.x - this.camX,
        y: w.lens.y,
        r: this.state === 'ending' ? 105 + Math.min(1, this.endingT / 1.6) * 1200 : w.lens.r,
        held,
        active: w.lens.active || (this.state === 'ending' && this.endingT < 4.5),
        fizzling: w.fizzling,
      },
      clock: this.clock,
      shake: this.shake,
      light: this.state === 'title' ? 100 : this.light(),
      ending: this.state === 'ending' ? Math.min(1, this.endingT / 4) : 0,
      reducedMotion: reduced,
      showLensPreview: this.state === 'play' && !this.input.held,
    }, dt);

    if (this.state === 'play' || this.state === 'intro') {
      const hint = (w.def.hints ?? []).find((h) => w.courier.x >= h.atX && (h.untilX === undefined || w.courier.x < h.untilX));
      if (this.message && performance.now() > this.message.until) this.message = null;
      this.ui.hud({
        name: w.def.name, index: this.levelIndex, total: LEVELS.length, light: this.light(), budget: w.budget, maxBudget: w.def.budget,
        hint: hint ? hint.text : null, message: this.message?.text ?? null, lensSize: this.input.sizeIndex,
      });
    }
    this.input.endFrame();
  }

  /** The finale: the lens swells over the whole city and everything un-falls. */
  private stepEnding(dt: number): void {
    const w = this.world;
    this.endingT += dt;
    w.lens.x = w.def.goal;
    w.lens.y = 260;
    w.lens.r = 105 + Math.min(1, this.endingT / 1.6) * 1200;
    // Everything un-falls, then the city holds still: nothing is left to break.
    if (this.endingT < 4.5) {
      for (const o of w.timed) {
        o.inLens = true;
        o.step(dt);
      }
    }
    w.time += dt;
    if (this.endingT >= 5.2 && this.endingT - dt < 5.2) this.finishEnding();
  }

  /** Title-screen demo: rebuild the tram bridge when Ilo reaches it. */
  private attractLens(): boolean {
    const w = this.world;
    const c = w.courier;
    // Centred below the bridge so the circle never touches Ilo waiting at the edge.
    w.lens.x = 700;
    w.lens.y = 470;
    w.lens.r = 105;
    const broken = w.tiles.some((t) => t.collapsible && t.tau > 0.4 && t.rect.x >= 620 && t.rect.x < 780);
    return c.x > 470 && c.x < 625 && broken;
  }

  /** Development helpers for automated play-testing. */
  get debug() {
    return {
      game: this,
      world: () => this.world,
      state: () => this.state,
      input: this.input,
      save: () => this.save,
      startDistrict: (i: number) => { this.save.unlocked = Math.max(this.save.unlocked, i); this.startDistrict(i); this.play(); },
      /** Simulate `seconds` with an optional lens script (world coords). */
      sim: (seconds: number, lens?: (w: World, t: number) => { x: number; y: number; r?: number; held: boolean } | null) => {
        const w = this.world;
        for (let t = 0; t < seconds; t += STEP) {
          const l = lens?.(w, t);
          if (l) { w.lens.x = l.x; w.lens.y = l.y; w.lens.r = l.r ?? 105; }
          w.step(STEP, !!l?.held, w.lens.r / 105);
          if (w.courier.won || (w.courier.dead && w.courier.deadTime > 2.2)) break;
        }
        return { x: Math.round(w.courier.x), dead: w.courier.dead, won: w.courier.won, borrowed: +w.borrowed.toFixed(2), budget: +w.budget.toFixed(2), time: +w.time.toFixed(2) };
      },
      complete: () => this.complete(),
      render: () => this.frame(performance.now()),
    };
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.input.dispose();
    this.audio.dispose();
  }
}
