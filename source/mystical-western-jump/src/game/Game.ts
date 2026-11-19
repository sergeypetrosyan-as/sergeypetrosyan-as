import { AudioEngine, type Sfx } from '../audio/Audio';
import { Renderer } from '../render/Renderer';
import { Ui, fmtTime, type ScreenId } from '../ui/Ui';
import { LEVELS } from '../world/levels';
import { World, type WorldEvent } from '../world/World';
import { START_LIVES, STEP, VOLTS_PER_LIFE } from './Config';
import { Input } from './Input';
import { RANK_ORDER, clearSave, emptySave, loadSave, writeSave, type Rank, type SaveData } from './Save';

type State = 'title' | 'menu' | 'intro' | 'play' | 'pause' | 'dialog' | 'complete' | 'gameover' | 'ending';

/** World events that simply play a sound of the same name. */
const SOUND: Partial<Record<WorldEvent['type'], Sfx>> = {
  jump: 'jump', 'double-jump': 'double-jump', shard: 'shard', token: 'token', repair: 'repair', shield: 'shield',
  overdrive: 'overdrive', stomp: 'stomp', hurt: 'hurt', 'shield-break': 'shield-break', checkpoint: 'checkpoint',
  secret: 'secret', bump: 'bump', prize: 'prize', spring: 'spring', crusher: 'crusher', 'boss-hit': 'boss-hit',
  'boss-shot': 'boss-shot', 'boss-slam': 'boss-slam', clang: 'clang', volt: 'volt',
};

/** Owns the loop and the flow between menus and levels. */
export class Game {
  readonly renderer: Renderer;
  readonly input = new Input();
  readonly audio = new AudioEngine();
  readonly ui = new Ui();
  save: SaveData;
  storageOk: boolean;
  state: State = 'title';
  world: World;
  levelIndex = 0;
  lives = START_LIVES;
  /** Volts toward the next extra life. */
  bank = 0;
  private acc = 0;
  private last = 0;
  private raf = 0;
  private now = 0;
  private menuReturn: State = 'title';
  private dialogText = '';
  private busy = false;
  private readonly cleanup: Array<() => void> = [];

  constructor(pix: HTMLCanvasElement, glow: HTMLCanvasElement) {
    this.renderer = new Renderer(pix, glow);
    this.save = loadSave(LEVELS.length);
    this.storageOk = writeSave(this.save);
    this.world = this.attractWorld();
    this.applySettings();
    this.bindUi();
    this.input.bindTouch(this.ui.touch);
    const on = (t: EventTarget, type: string, fn: (e: Event) => void) => {
      t.addEventListener(type, fn);
      this.cleanup.push(() => t.removeEventListener(type, fn));
    };
    on(window, 'resize', () => this.renderer.resize());
    on(window, 'pointerdown', () => this.audio.unlock());
    on(window, 'keydown', (e) => {
      this.audio.unlock();
      this.onKey(e as KeyboardEvent);
    });
    on(document, 'visibilitychange', () => {
      if (document.hidden) {
        if (this.state === 'play') this.pause();
        this.audio.suspend(true);
      } else this.audio.suspend(false);
    });
    this.ui.titleProgress(this.save, LEVELS);
    this.audio.music('title');
  }

  start(): void {
    this.last = performance.now();
    const frame = (t: number) => {
      this.raf = requestAnimationFrame(frame);
      this.frame(t);
    };
    this.raf = requestAnimationFrame(frame);
  }

  dispose(): void {
    cancelAnimationFrame(this.raf);
    this.cleanup.forEach((f) => f());
    this.input.dispose();
    this.audio.dispose();
  }

  // ------------------------------------------------------------------ flow

  private attractWorld(): World {
    const w = new World(LEVELS[0]);
    w.player.dead = true;
    return w;
  }

  private transition(fn: () => void): void {
    if (this.busy) return;
    if (this.save.settings.reducedMotion) {
      fn();
      return;
    }
    this.busy = true;
    this.ui.fade(true);
    window.setTimeout(() => {
      fn();
      this.ui.fade(false);
      this.busy = false;
    }, 260);
  }

  private screen(id: ScreenId | null, state: State): void {
    this.state = state;
    this.ui.show(id);
    const playing = state === 'play' || state === 'dialog';
    this.input.enabled = playing || state === 'intro';
    this.ui.hud.classList.toggle('hidden', !(playing || state === 'pause'));
    this.updateTouch();
  }

  private updateTouch(): void {
    const s = this.save.settings.touch;
    let coarse = false;
    try {
      coarse = matchMedia('(pointer: coarse)').matches;
    } catch {
      /* ignore */
    }
    const want = s === 'on' || (s === 'auto' && (coarse || this.input.usedTouch));
    const playing = this.state === 'play' || this.state === 'dialog';
    this.ui.touch.classList.toggle('hidden', !(want && playing));
    const portrait = coarse && window.innerHeight > window.innerWidth;
    this.ui.el('rotate').classList.toggle('hidden', !(portrait && playing));
  }

  toTitle(): void {
    this.transition(() => {
      this.world = this.attractWorld();
      this.ui.titleProgress(this.save, LEVELS);
      this.screen('title', 'title');
      this.audio.music('title');
    });
  }

  private openMenu(id: ScreenId, from: State): void {
    this.menuReturn = from;
    if (id === 'levels') this.ui.levelGrid(this.save, LEVELS, (i) => this.beginRun(i));
    if (id === 'settings') this.ui.fillSettings(this.save.settings, this.tokens, this.storageOk);
    this.screen(id, 'menu');
    this.audio.play('ui');
  }

  private closeMenu(): void {
    this.audio.play('ui');
    if (this.menuReturn === 'pause') this.screen('pause', 'pause');
    else if (this.menuReturn === 'gameover') this.screen('gameover', 'gameover');
    else if (this.menuReturn === 'ending') this.screen('ending', 'ending');
    else {
      this.ui.titleProgress(this.save, LEVELS);
      this.screen('title', 'title');
    }
  }

  /** Starts playing from a level with a fresh set of lives. */
  beginRun(index: number): void {
    this.lives = START_LIVES;
    this.bank = 0;
    this.audio.play('confirm');
    this.startLevel(index);
  }

  startLevel(index: number): void {
    this.transition(() => {
      this.levelIndex = index;
      const def = LEVELS[index];
      this.world = new World(def);
      this.world.camera.w = this.renderer.w;
      this.world.camera.h = this.renderer.h;
      this.world.camera.snap(this.world);
      this.ui.hudLevel(def);
      this.ui.intro(def);
      this.screen('intro', 'intro');
      this.audio.music(def.music);
    });
  }

  private play(): void {
    if (this.state !== 'intro') return;
    this.audio.play('confirm');
    this.input.releaseAll();
    this.screen(null, 'play');
    this.acc = 0;
  }

  pause(): void {
    if (this.state !== 'play') return;
    this.input.releaseAll();
    this.audio.play('pause');
    this.audio.duck(true);
    this.screen('pause', 'pause');
  }

  private resume(): void {
    this.audio.duck(false);
    this.input.releaseAll();
    this.screen(null, 'play');
    this.last = performance.now();
  }

  private restartCheckpoint(): void {
    this.transition(() => {
      this.world.respawn();
      this.audio.duck(false);
      if (this.world.boss) this.audio.music(this.world.level.def.music);
      this.screen(null, 'play');
    });
  }

  private get tokens(): number {
    return this.save.levels.filter((l) => l.token).length;
  }

  private completeLevel(): void {
    const w = this.world;
    const def = w.level.def;
    const time = w.time;
    const timeBonus = Math.max(0, Math.round((def.par - time) * 20));
    const score = w.score + timeBonus;
    const voltPct = w.voltsTotal ? w.volts / w.voltsTotal : 1;
    const points = voltPct * 30 + w.shardCount * 15 + (time <= def.par ? 25 : time <= def.par * 1.5 ? 12 : 0);
    const rank: Rank = points >= 90 ? 'S' : points >= 70 ? 'A' : points >= 45 ? 'B' : 'C';
    const rec = this.save.levels[this.levelIndex];
    const newBest = rec.bestTime === null || time < rec.bestTime;
    rec.done = true;
    if (newBest) rec.bestTime = Math.round(time * 10) / 10;
    rec.bestScore = Math.max(rec.bestScore, score);
    rec.shards |= w.shards.reduce((m, s, i) => m | (s ? 1 << i : 0), 0);
    rec.token ||= w.token;
    if (!rec.rank || RANK_ORDER[rank] > RANK_ORDER[rec.rank]) rec.rank = rank;
    const last = this.levelIndex === LEVELS.length - 1;
    this.save.unlocked = Math.max(this.save.unlocked, Math.min(LEVELS.length - 1, this.levelIndex + 1));
    if (last) this.save.beaten = true;
    this.storageOk = writeSave(this.save);
    this.ui.complete({
      def, volts: w.volts, voltsTotal: w.voltsTotal, shards: w.shardCount, secrets: w.secrets, secretsTotal: w.level.fakeGroups.length,
      time, score, rank, record: rec, newBest, last,
    });
    this.screen('complete', 'complete');
    this.audio.jingle(last ? 'victory' : 'clear');
  }

  private next(): void {
    if (this.levelIndex === LEVELS.length - 1) this.showEnding();
    else this.startLevel(this.levelIndex + 1);
  }

  private showEnding(): void {
    this.transition(() => {
      const shards = this.save.levels.reduce((n, l) => n + ((l.shards & 1) + ((l.shards >> 1) & 1) + ((l.shards >> 2) & 1)), 0);
      const total = this.save.levels.reduce((t, l) => t + (l.bestTime ?? 0), 0);
      this.ui.ending(
        `SHARDS ${shards}/18 · TOKENS ${this.tokens}/6 · BEST TIMES TOTAL ${fmtTime(total)}`,
        this.tokens >= 6 ? 'All six arcade tokens found: Retro Vee is unlocked in Settings.' : `Find all six arcade tokens to unlock Retro Vee (${this.tokens}/6). Each level hides one in a secret room.`,
      );
      this.world = this.attractWorld();
      this.screen('ending', 'ending');
      this.audio.music('title');
    });
  }

  // ------------------------------------------------------------------ settings

  applySettings(): void {
    const s = this.save.settings;
    this.audio.setVolumes(s.music, s.sfx, s.muted);
    this.renderer.reducedMotion = s.reducedMotion;
    this.world.fx.density = s.reducedMotion ? 0.5 : 1;
    document.body.classList.toggle('reduced', s.reducedMotion);
    this.renderer.sprites.useSkin(s.skin === 'retro' && this.tokens >= 6);
    this.updateTouch();
  }

  private settingsChanged(): void {
    this.save.settings = this.ui.readSettings();
    this.applySettings();
    this.storageOk = writeSave(this.save);
  }

  // ------------------------------------------------------------------ input

  private bindUi(): void {
    const ui = this.ui;
    ui.on('btnStart', () => this.beginRun(0));
    ui.on('btnContinue', () => this.beginRun(this.firstUnfinished()));
    ui.on('btnLevels', () => this.openMenu('levels', 'title'));
    ui.on('btnHow', () => this.openMenu('howto', 'title'));
    ui.on('btnSettings', () => this.openMenu('settings', 'title'));
    ui.on('btnLevelsBack', () => this.closeMenu());
    ui.on('btnHowBack', () => this.closeMenu());
    ui.on('btnSettingsDone', () => this.closeMenu());
    ui.on('btnReset', () => {
      const b = ui.el<HTMLButtonElement>('btnReset');
      if (b.dataset.armed !== '1') {
        b.dataset.armed = '1';
        b.textContent = 'CLICK AGAIN TO ERASE';
        window.setTimeout(() => {
          b.dataset.armed = '';
          b.textContent = 'RESET PROGRESS';
        }, 3000);
        return;
      }
      b.dataset.armed = '';
      b.textContent = 'PROGRESS ERASED';
      const settings = this.save.settings;
      clearSave();
      this.save = emptySave(LEVELS.length);
      this.save.settings = settings;
      this.storageOk = writeSave(this.save);
      this.applySettings();
      ui.fillSettings(this.save.settings, this.tokens, this.storageOk);
    });
    for (const id of ['setMusic', 'setSfx', 'setMute', 'setReduced', 'setTimer', 'setTouch', 'setSkin']) {
      ui.el(id).addEventListener('input', () => this.settingsChanged());
      ui.el(id).addEventListener('change', () => this.settingsChanged());
    }
    ui.el('intro').addEventListener('click', () => this.play());
    ui.on('btnPause', () => this.pause());
    ui.on('btnResume', () => this.resume());
    ui.on('btnCheckpoint', () => this.restartCheckpoint());
    ui.on('btnRestart', () => this.startLevel(this.levelIndex));
    ui.on('btnPauseSettings', () => this.openMenu('settings', 'pause'));
    ui.on('btnQuit', () => this.toTitle());
    ui.on('btnNext', () => this.next());
    ui.on('btnReplay', () => this.startLevel(this.levelIndex));
    ui.on('btnCompMenu', () => this.toTitle());
    ui.on('btnRetry', () => this.beginRun(this.levelIndex));
    ui.on('btnOverLevels', () => this.openMenu('levels', 'gameover'));
    ui.on('btnOverMenu', () => this.toTitle());
    ui.on('btnEndLevels', () => this.openMenu('levels', 'ending'));
    ui.on('btnEndMenu', () => this.toTitle());
    ui.el('dialog').addEventListener('click', () => this.advanceDialog());
  }

  private firstUnfinished(): number {
    const i = this.save.levels.findIndex((l, k) => !l.done && k <= this.save.unlocked);
    return i < 0 ? Math.min(this.save.unlocked, LEVELS.length - 1) : i;
  }

  private onKey(e: KeyboardEvent): void {
    if (e.repeat) return;
    const confirm = e.code === 'Enter' || e.code === 'Space' || e.code === 'NumpadEnter';
    if (this.state === 'intro' && (confirm || e.code === 'KeyW' || e.code === 'ArrowUp')) {
      e.preventDefault();
      this.play();
    } else if (this.state === 'dialog' && (confirm || e.code === 'KeyE' || e.code === 'Escape')) {
      e.preventDefault();
      this.advanceDialog();
    } else if (this.state === 'pause' && (e.code === 'Escape' || e.code === 'KeyP')) {
      this.resume();
    } else if (this.state === 'menu' && e.code === 'Escape') {
      this.closeMenu();
    }
  }

  private advanceDialog(): void {
    if (this.state !== 'dialog') return;
    if (this.ui.advanceDialog(this.dialogText)) {
      this.input.releaseAll();
      this.screen(null, 'play');
      this.audio.duck(false);
    }
  }

  // ------------------------------------------------------------------ loop

  private frame(t: number): void {
    const dt = Math.min(0.1, Math.max(0, (t - this.last) / 1000));
    this.last = t;
    this.now += dt;
    this.input.pollPad();
    const w = this.world;

    if (this.state === 'play') {
      if (this.input.pressed('pause')) this.pause();
      else if (this.input.pressed('restart') && !w.player.dead && !w.finished) this.restartCheckpoint();
    }
    if (this.state === 'play') {
      this.acc += dt;
      let first = true;
      let steps = 0;
      while (this.acc >= STEP && steps < 10) {
        w.update(STEP, this.input.controls(first));
        first = false;
        this.acc -= STEP;
        steps++;
        this.handleEvents();
        if (this.state !== 'play') break;
      }
      if (steps >= 10) this.acc = 0;
      this.ui.updateHud(w, this.lives, this.bank, this.save.settings.showTimer);
    } else if (this.state === 'title' || this.state === 'menu' || this.state === 'ending') {
      this.attract(dt);
    }
    this.input.endFrame();
    this.renderer.render(this.world, this.now);
  }

  /** Title backdrop: the first level, panning slowly, with its enemies going about their day. */
  private attract(dt: number): void {
    const w = this.world;
    if (!w.player.dead) return;
    for (let i = 0; i < 2; i++) w.update(dt / 2, { left: false, right: false, down: false, jump: false, jumpPressed: false, sprint: false, interactPressed: false });
    w.events.length = 0;
    const cam = w.camera;
    cam.w = this.renderer.w;
    cam.h = this.renderer.h;
    const span = Math.max(1, w.level.pxW - cam.w);
    cam.x = span * (0.5 - 0.5 * Math.cos(this.now * 0.02));
    cam.y = w.level.pxH - cam.h;
  }

  private handleEvents(): void {
    const w = this.world;
    for (const ev of w.events) {
      const s = SOUND[ev.type];
      if (s) this.audio.play(s);
      switch (ev.type) {
        case 'land':
          this.audio.play('land', Math.min(1, ev.value / 500));
          break;
        case 'volt':
          this.bank++;
          if (this.bank >= VOLTS_PER_LIFE) {
            this.bank -= VOLTS_PER_LIFE;
            this.lives = Math.min(99, this.lives + 1);
            this.audio.play('life');
            this.ui.toast('1-UP');
          }
          break;
        case 'hop':
        case 'shot':
          if (Math.abs(ev.value - w.player.cx) < 260) this.audio.play(ev.type);
          break;
        case 'die':
          this.audio.play('die');
          this.lives--;
          break;
        case 'respawn-ready':
          if (this.lives > 0) {
            this.transition(() => {
              this.world.respawn();
              if (this.world.boss) this.audio.music(this.world.level.def.music);
            });
          } else {
            this.screen('gameover', 'gameover');
            this.audio.jingle('gameover');
          }
          break;
        case 'terminal':
          this.dialogText = ev.text ?? '';
          this.audio.play('terminal');
          this.audio.duck(true);
          this.input.releaseAll();
          this.screen(null, 'dialog');
          this.ui.openDialog(this.dialogText, this.save.settings.reducedMotion);
          break;
        case 'goal':
          this.audio.jingle('clear');
          break;
        case 'boss-intro':
          this.audio.play('boss-intro');
          this.audio.music('boss');
          this.ui.toast('THE STATIC SOVEREIGN');
          break;
        case 'boss-defeat':
          this.audio.play('boss-defeat');
          this.audio.music(null);
          break;
        case 'complete':
          this.completeLevel();
          break;
      }
    }
    w.events.length = 0;
  }
}
