import { AudioEngine } from '../audio/audio';
import type { Frame, RenderBackend } from '../render/backend';
import { Renderer } from '../render/renderer';
import { Renderer3D } from '../render3d/Renderer3D';
import { DIFFICULTIES, T } from '../state/tuning';
import type { InputState, Quality, RaceEvent, Track } from '../state/types';
import { Store } from '../storage/storage';
import { buildTrack, nextGateDistance } from '../track/build';
import { TRACKS } from '../track/tracks';
import { Ui, type TowerRow } from '../ui/ui';
import { autopilot } from './autopilot';
import { Input, type Action } from './input';
import { fmtTime, NO_INPUT, Race } from './race';

type State = 'menu' | 'countdown' | 'racing' | 'paused' | 'finishing' | 'results';

const RIVAL_CODES = ['ROK', 'SAB', 'CIN'];
const SCALES = [1, 0.85, 0.7, 0.55];

export interface GameOptions {
  /** Try the Three.js renderer first. */
  want3d: boolean;
  /** `?demo=1`: skip menus, autopilot the player. */
  demo: boolean;
  demoTrack: number;
  /** Seconds of race to simulate before the first frame in demo mode. */
  demoAt: number;
  /** `?quality=low|medium|high` for this session only (screenshots, testing). */
  quality: Quality | null;
}

export class Game {
  private store = new Store();
  private audio = new AudioEngine();
  private input = new Input();
  private renderer: RenderBackend;
  private r3d: Renderer3D | null = null;
  private ui: Ui;
  private tracks: (Track | undefined)[] = [];
  private race: Race | null = null;
  private state: State = 'menu';
  private trackIdx = 0;
  private diffIdx = 1;
  private raf = 0;
  private last = 0;
  private clock = 0;
  private boostAmt = 0;
  private flash = 0;
  private shake = 0;
  private attractS = 0;
  private finishT = 0;
  private scrapeCd = 0;
  private perfAcc = 0;
  private perfN = 0;
  private scaleIdx = 0;
  private musicStarted = false;
  private reduced = false;
  private lastSplit = '';
  private lastSplitClass: '' | 'up' | 'down' = '';
  private disposed = false;
  private pausedFrom: State = 'racing';
  private lastInput: InputState = NO_INPUT;
  private demo: boolean;
  private glLost = false;
  private frameMs = 16;
  private qualityLocked = false;

  constructor(private canvas: HTMLCanvasElement, opts: GameOptions) {
    this.demo = opts.demo;
    this.qualityLocked = opts.quality !== null;
    try {
      this.reduced = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    } catch {
      this.reduced = false;
    }
    const s = this.store.settings;
    let fallbackReason = '';
    if (opts.want3d) {
      try {
        this.r3d = new Renderer3D(canvas, opts.quality ?? s.quality);
      } catch (err) {
        console.warn('3D renderer failed, using the 2D view', err);
        fallbackReason = 'The 3D view could not start on this device.';
        this.r3d = null;
        // a canvas that tried WebGL cannot give a 2D context; swap in a fresh one
        const fresh = canvas.cloneNode(false) as HTMLCanvasElement;
        canvas.replaceWith(fresh);
        this.canvas = fresh;
      }
    } else fallbackReason = 'WebGL is not available in this browser.';
    this.renderer = this.r3d ?? new Renderer(this.canvas);
    this.trackIdx = s.lastTrack;
    this.diffIdx = s.lastDiff;
    this.ui = new Ui(this.store, {
      onStart: (t, d) => this.startRace(t, d),
      onResume: () => this.resume(),
      onRestart: () => this.restart(),
      onQuit: () => this.quit(),
      onNext: () => this.next(),
      onSettings: () => this.applySettings(),
      onSound: (k) => this.audio.blip(k),
      onTutorialDone: () => {
        this.store.settings.tutorialSeen = true;
        this.store.save();
        this.ui.show('title');
      },
      track: (i) => this.track(i),
    });
    this.ui.selTrack = this.trackIdx;
    this.ui.selDiff = this.diffIdx;
    if (this.r3d) {
      const r = this.r3d;
      this.ui.setGraphics('3d', r.activeLevel);
      r.onLevelChange = (l) => this.ui.setGraphics('3d', l);
      r.onContext = (lost) => {
        this.glLost = lost;
        if (lost) {
          this.pause();
          this.ui.notice('The browser interrupted the graphics. Waiting for it to restore them. If nothing happens, reload the page.', false);
        } else this.ui.notice('Graphics restored.', true);
      };
    } else {
      this.ui.setGraphics('2d', null);
      this.ui.notice(`${fallbackReason} You are seeing the simplified 2D view. For full 3D graphics, turn on hardware acceleration in your browser settings, update the browser, then reload.`, false);
    }
    this.input.bindTouch(document.getElementById('touch') as HTMLElement);
    this.input.onAction = (a) => this.action(a);
    this.input.onFirstGesture = () => this.gesture();
    this.applySettings();
    window.addEventListener('resize', () => this.resize());
    document.addEventListener('visibilitychange', () => this.visibility());
    window.addEventListener('blur', () => {
      if (!this.demo && (this.state === 'racing' || this.state === 'countdown')) this.pause();
    });
    this.resize();
    if (this.demo) {
      this.ui.show(null);
      this.startRace(Math.max(0, Math.min(TRACKS.length - 1, opts.demoTrack)), 1);
      const race = this.race as Race | null;
      if (race) {
        race.cdT = T.COUNTDOWN;
        const steps = Math.round(opts.demoAt * 60);
        for (let i = 0; i < steps; i++) {
          race.update(1 / 60, autopilot(race, 55, 0.35));
          race.events.length = 0;
        }
        this.ui.countdown('');
        if (race.phase !== 'countdown') this.state = race.phase === 'finished' ? 'finishing' : 'racing';
        if (race.phase === 'finished') this.showResults(race);
      }
    } else {
      const want = new URLSearchParams(location.search).get('screen');
      const ok = ['title', 'setup', 'guide', 'settings', 'records'].includes(want ?? '');
      this.ui.show(ok ? (want as 'title') : s.tutorialSeen ? 'title' : 'tutorial');
    }
  }

  start(): void {
    this.last = performance.now();
    const loop = (now: number): void => {
      if (this.disposed) return;
      this.raf = requestAnimationFrame(loop);
      this.tick(now);
    };
    this.raf = requestAnimationFrame(loop);
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.audio.stopMusic();
    this.store.flush();
    this.renderer.dispose();
  }

  // ---------- setup ----------
  private track(i: number): Track {
    return (this.tracks[i] ??= buildTrack(TRACKS[i]));
  }

  private gesture(): void {
    this.audio.ensure();
    this.audio.setVolume(this.store.settings.volume);
    this.audio.setMuted(this.store.settings.muted);
    this.audio.setMusic(this.store.settings.music);
    if (!this.musicStarted) {
      this.musicStarted = true;
      this.audio.startMusic(TRACKS[this.trackIdx].hz);
    }
  }

  private applySettings(): void {
    const s = this.store.settings;
    this.audio.setVolume(s.volume);
    this.audio.setMuted(s.muted);
    this.audio.setMusic(s.music);
    document.body.classList.toggle('hc', s.highContrast);
    document.body.classList.toggle('rf', s.reducedFlash);
    if (!this.qualityLocked) this.r3d?.setQuality(s.quality);
    this.store.save();
  }

  private resize(): void {
    this.renderer.resize(SCALES[this.scaleIdx]);
  }

  private visibility(): void {
    if (document.hidden) {
      this.audio.suspend();
      if (!this.demo && (this.state === 'racing' || this.state === 'countdown')) this.pause();
    } else {
      this.audio.resume();
      this.last = performance.now();
    }
  }

  // ---------- flow ----------
  private startRace(t: number, d: number): void {
    this.gesture();
    this.trackIdx = t;
    this.diffIdx = d;
    this.ui.selTrack = t;
    this.ui.selDiff = d;
    const s = this.store.settings;
    if (!this.demo) {
      s.lastTrack = t;
      s.lastDiff = d;
      this.store.save();
    }
    const tr = this.track(t);
    this.race = new Race(tr, d);
    this.state = 'countdown';
    this.boostAmt = 0;
    this.flash = 0;
    this.shake = 0;
    this.finishT = 0;
    this.lastSplit = '';
    this.lastSplitClass = '';
    this.renderer.clearFx();
    this.ui.buildProgress(tr);
    this.ui.show(null);
    this.ui.showHud(true);
    this.ui.clearMessage();
    this.ui.countdown('');
    this.input.reset();
    this.input.captureGameKeys = true;
    (document.activeElement as HTMLElement | null)?.blur();
    this.audio.duck(false);
    this.audio.stopMusic();
    this.audio.startMusic(TRACKS[t].hz);
    this.ui.announce(`${TRACKS[t].name}. Three laps. Get ready.`);
  }

  private restart(): void {
    if (this.state === 'menu' || !this.race) return;
    this.startRace(this.trackIdx, this.diffIdx);
  }

  private next(): void {
    const t = Math.min(TRACKS.length - 1, this.trackIdx + 1);
    this.startRace(t, this.diffIdx);
  }

  private quit(): void {
    this.race = null;
    this.state = 'menu';
    this.input.captureGameKeys = false;
    this.ui.showHud(false);
    this.ui.countdown('');
    this.audio.duck(false);
    this.audio.stopMusic();
    this.audio.startMusic(110);
    this.ui.returnTo = 'title';
    this.ui.show('title');
  }

  private pause(): void {
    if (this.state !== 'racing' && this.state !== 'countdown') return;
    this.pausedFrom = this.state;
    this.state = 'paused';
    this.input.reset();
    this.audio.duck(true);
    this.ui.returnTo = 'pause';
    this.ui.show('pause');
  }

  private resume(): void {
    if (this.state !== 'paused' || this.glLost) return;
    this.state = this.pausedFrom === 'countdown' ? 'countdown' : 'racing';
    this.ui.show(null);
    this.audio.duck(false);
    this.last = performance.now();
    (document.activeElement as HTMLElement | null)?.blur();
  }

  private action(a: Action): void {
    if (this.demo) return;
    if (a === 'mute') {
      const s = this.store.settings;
      s.muted = !s.muted;
      this.applySettings();
      this.ui.syncSettings();
      if (this.state !== 'menu') this.ui.message(s.muted ? 'Sound off' : 'Sound on', false, 900);
      return;
    }
    if (a === 'restart') {
      if (this.state === 'racing' || this.state === 'countdown' || this.state === 'paused' || this.state === 'finishing' || this.state === 'results') this.restart();
      return;
    }
    switch (this.state) {
      case 'racing':
      case 'countdown':
        this.pause();
        break;
      case 'paused':
        if (this.ui.current === 'pause') this.resume();
        else this.ui.show('pause');
        break;
      case 'menu': {
        const c = this.ui.current;
        if (c === 'tutorial') {
          this.store.settings.tutorialSeen = true;
          this.store.save();
          this.ui.show('title');
        } else if (c && c !== 'title') this.ui.show('title');
        break;
      }
      default:
        break;
    }
  }

  // ---------- loop ----------
  private tick(now: number): void {
    const real = Math.min(0.25, (now - this.last) / 1000);
    this.last = now;
    const dt = Math.min(real, T.MAX_DT);
    this.frameMs += (real * 1000 - this.frameMs) * 0.05;
    (window as unknown as { __nodFrameMs: number }).__nodFrameMs = this.frameMs;
    this.clock += dt;
    this.perf(real);
    if (this.scrapeCd > 0) this.scrapeCd -= dt;

    if (this.state === 'menu' || !this.race) {
      this.attractS += 6800 * dt;
      this.audio.engine(0, false, false, false);
      this.renderer.render(this.attractFrame(dt));
      return;
    }
    const race = this.race;
    const st = this.state;
    if (st === 'racing' || st === 'countdown' || st === 'finishing') {
      let inp = st === 'racing' ? this.input.sample(dt) : NO_INPUT;
      if (this.demo && st === 'racing') inp = autopilot(race, 55, 0.35);
      this.lastInput = inp;
      race.update(dt, inp);
      this.handleEvents(race.events.splice(0));
      this.boostAmt += ((race.player.boosting ? 1 : 0) - this.boostAmt) * Math.min(1, 5 * dt);
      this.flash = Math.max(0, this.flash - dt * 11);
      this.shake *= Math.exp(-5 * dt);
      if (st === 'countdown' && race.phase === 'racing') this.state = 'racing';
      if (st === 'racing' && race.phase === 'finished') {
        this.state = 'finishing';
        this.finishT = 0;
        this.input.captureGameKeys = false;
      }
      if (this.state === 'finishing') {
        this.finishT += dt;
        if (this.finishT > 3) this.showResults(race);
      }
      this.audio.engine(Math.abs(race.player.speed) / T.MAX_SPEED, inp.throttle, race.player.boosting, true);
    } else {
      this.audio.engine(0, false, false, false);
    }
    const frozen = this.state === 'paused' || this.state === 'results';
    this.renderer.render(this.raceFrame(race, frozen ? 0 : dt));
    if (this.state === 'racing' || this.state === 'finishing' || this.state === 'countdown') this.updateHud(race);
  }

  /** Adaptive resolution for the 2D fallback; the 3D renderer manages its own quality. */
  private perf(real: number): void {
    if (this.renderer.kind !== '2d') return;
    this.perfAcc += real;
    if (++this.perfN < 40) return;
    const avg = (this.perfAcc / this.perfN) * 1000;
    this.perfAcc = 0;
    this.perfN = 0;
    if (avg > 21 && this.scaleIdx < SCALES.length - 1) {
      this.scaleIdx++;
      this.resize();
    } else if (avg < 12 && this.scaleIdx > 0) {
      this.scaleIdx--;
      this.resize();
    }
  }

  private shakeOffset(): [number, number] {
    const s = this.store.settings;
    if (!s.shake || this.shake < 0.2) return [0, 0];
    const h = this.renderer.kind === '2d' ? this.canvas.height : 720;
    const k = (this.reduced ? 0.4 : 1) * this.shake * (h / 720);
    return [(Math.random() - 0.5) * 2 * k, (Math.random() - 0.5) * 2 * k];
  }

  private baseFrame(track: Track, idx: number, dt: number): Pick<Frame, 'track' | 'trackIdx' | 'boostAmt' | 'time' | 'dt' | 'gateText' | 'threshold' | 'flash' | 'shakeX' | 'shakeY' | 'highContrast' | 'reducedFlash' | 'speedLines' | 'reducedMotion'> {
    const s = this.store.settings;
    const [sx, sy] = this.shakeOffset();
    const thr = DIFFICULTIES[this.diffIdx].threshold;
    return {
      track, trackIdx: idx, boostAmt: this.boostAmt, time: this.clock, dt,
      gateText: `SEALED  NEED ${thr}%`, threshold: thr,
      flash: this.flash, shakeX: sx, shakeY: sy,
      highContrast: s.highContrast, reducedFlash: s.reducedFlash, speedLines: s.speedLines, reducedMotion: this.reduced,
    };
  }

  private attractFrame(dt: number): Frame {
    const idx = this.ui.current === 'setup' ? this.ui.selTrack : 0;
    const track = this.track(idx);
    const x = this.renderer.kind === '3d' ? 0.25 + Math.sin(this.clock * 0.21) * 0.2 : Math.sin(this.clock * 0.5) * 0.45;
    return {
      ...this.baseFrame(track, idx, dt),
      s: this.attractS, x, speedPct: 0.57, steer: Math.cos(this.clock * 0.21) * 0.1, vx: Math.cos(this.clock * 0.21) * 0.04,
      drifting: false, boosting: false, braking: false, rivals: [], gateOpen: true, boostAmt: 0, cinematic: true,
    };
  }

  private raceFrame(race: Race, dt: number): Frame {
    const p = race.player;
    const diff = DIFFICULTIES[race.diffIdx];
    const inp = this.lastInput;
    return {
      ...this.baseFrame(race.track, this.trackIdx, dt),
      s: p.s, x: p.x, speedPct: Math.max(0, p.speed) / T.MAX_SPEED, steer: inp.steer, vx: p.vx,
      drifting: p.drifting, boosting: p.boosting, braking: inp.brake && p.speed > 0 || race.phase === 'finished',
      rivals: race.rivals, gateOpen: p.reserve >= diff.threshold || p.spineMode, cinematic: false,
    };
  }

  private updateHud(race: Race): void {
    const p = race.player;
    const diff = DIFFICULTIES[race.diffIdx];
    const L = race.track.length;
    const dist = nextGateDistance(race.track, p.s) * 0.0074;
    const spine = p.spineMode ? 'in' : p.reserve >= diff.threshold ? 'open' : 'sealed';
    const cap = 3 * L;
    const cars = [
      { code: 'JUN', s: Math.min(p.s, cap), speed: p.speed, me: true, fin: race.finishTime },
      ...race.rivals.map((r, i) => ({ code: RIVAL_CODES[i], s: Math.min(r.s, cap), speed: r.speed, me: false, fin: r.finish })),
    ];
    cars.sort((a, b) => {
      if (a.fin !== null && b.fin !== null) return a.fin - b.fin;
      if (a.fin !== null) return -1;
      if (b.fin !== null) return 1;
      return b.s - a.s;
    });
    const lead = cars[0];
    const tower: TowerRow[] = cars.map((c, i) => {
      let gap = 'Leader';
      if (i > 0 && c.fin !== null && lead.fin !== null) gap = `+${(c.fin - lead.fin).toFixed(2)}`;
      else if (i > 0) {
        const v = Math.max(5000, (c.speed + lead.speed) / 2);
        gap = `+${((lead.s - c.s) / v).toFixed(2)}`;
      }
      return { code: c.code, gap, me: c.me };
    });
    this.ui.hud({
      pos: race.rank,
      lap: race.lap,
      time: fmtTime(race.time),
      split: this.lastSplit,
      splitClass: this.lastSplitClass,
      speed: Math.round(Math.abs(p.speed) * (p.spineMode ? T.SPINE_ADVANCE : 1) * T.KMH),
      reserve: p.reserve,
      threshold: diff.threshold,
      boosting: p.boosting,
      spine,
      spineDist: p.spineMode ? '' : dist < 700 ? `${Math.round(dist / 10) * 10} m` : '',
      dots: [
        { p: (Math.min(p.s, cap) % L) / L, me: true },
        ...race.rivals.map((r) => ({ p: (Math.min(r.s, cap) % L) / L, me: false })),
      ],
      tower,
    });
  }

  private handleEvents(events: RaceEvent[]): void {
    const race = this.race;
    if (!race) return;
    const p = race.player;
    const dir = p.x >= 0 ? 1 : -1;
    for (const e of events) {
      switch (e.type) {
        case 'countdown':
          this.ui.countdown(String(e.value));
          this.audio.countdown(e.value);
          break;
        case 'go':
          this.ui.countdown('Go');
          this.audio.countdown(0);
          window.setTimeout(() => this.state !== 'menu' && this.ui.countdown(''), 800);
          this.ui.message(`The lit centre channel is the Spine. Its gates open at ${DIFFICULTIES[race.diffIdx].threshold} % reserve.`, false, 4200, true);
          break;
        case 'checkpoint': {
          const k = Number(e.text);
          const best = this.store.record(this.trackIdx, this.diffIdx).bestSplits[k - 1];
          let delta = '';
          this.lastSplitClass = '';
          if (best !== undefined) {
            const d = e.value - best;
            delta = `${d >= 0 ? '+' : '−'}${Math.abs(d).toFixed(2)}`;
            this.lastSplitClass = d > 0 ? 'up' : 'down';
          }
          this.lastSplit = `Split ${k}  ${fmtTime(e.value)}${delta ? '  ' + delta : ''}`;
          this.ui.message(`Checkpoint ${k}`, false, 1400);
          this.ui.announce(`Checkpoint ${k}, ${e.value.toFixed(1)} seconds`);
          this.audio.chime();
          break;
        }
        case 'lap':
          this.lastSplit = `Lap ${Number(e.text) - 1}  ${fmtTime(e.value)}`;
          this.lastSplitClass = '';
          this.ui.message(Number(e.text) === T.LAPS ? 'Final lap' : `Lap ${e.text}`, false, 1600);
          this.ui.announce(`Lap ${Number(e.text) - 1} complete, ${e.value.toFixed(1)} seconds. Lap ${e.text}.`);
          this.audio.lap();
          break;
        case 'finish':
          this.ui.message('Finish', false, 2400);
          this.audio.finish(race.computeRank() <= 2);
          this.ui.announce(`Finished in position ${race.computeRank()}.`);
          break;
        case 'wall':
          this.audio.thud(e.value);
          this.shake = Math.max(this.shake, 6 + e.value * 10);
          this.flash = 1;
          this.renderer.sparks(dir, 18 + Math.round(e.value * 22));
          break;
        case 'scrape':
          if (this.scrapeCd <= 0) {
            this.scrapeCd = 0.07;
            this.audio.scrape(e.value);
            this.renderer.sparks(dir, 4);
            this.shake = Math.max(this.shake, 2.5);
          }
          break;
        case 'rail':
          this.audio.thud(0.25);
          this.shake = Math.max(this.shake, 3);
          this.renderer.sparks(dir, 6);
          break;
        case 'bump':
          this.audio.thud(e.value * 0.7);
          this.shake = Math.max(this.shake, 4 + e.value * 5);
          this.renderer.sparks(dir, 8);
          break;
        case 'gateOpen':
          this.audio.gateOpen();
          this.ui.message('Spine open', false, 1200);
          this.ui.announce('Spine gate open.');
          break;
        case 'gateSealed':
          this.audio.gateSealed();
          this.audio.thud(1);
          this.shake = 16;
          this.flash = 1;
          this.renderer.sparks(dir, 30);
          this.ui.message('Spine sealed. Charge your reserve first.', true, 1800);
          this.ui.announce('Spine gate sealed. Reserve too low.');
          break;
        case 'boostStart':
          this.audio.boost();
          break;
        case 'position':
          this.ui.announce(`Position ${e.value} of 4`);
          break;
        default:
          break;
      }
    }
  }

  private showResults(race: Race): void {
    race.settle();
    this.state = 'results';
    this.input.captureGameKeys = false;
    const place = race.results.find((r) => r.player)?.place ?? race.rank;
    let bi = 0;
    race.lapTimes.forEach((t, i) => {
      if (t < race.lapTimes[bi]) bi = i;
    });
    const total = race.finishTime ?? race.time;
    const newBest = this.demo ? { total: false, lap: false, pos: false } : this.store.submit(this.trackIdx, this.diffIdx, total, race.lapTimes, race.splits[bi] ?? [], place);
    this.ui.showHud(false);
    this.ui.showResults({
      trackIdx: this.trackIdx, rows: race.results, place, laps: race.lapTimes, total, newBest,
      hasNext: this.trackIdx < TRACKS.length - 1,
    });
    this.ui.announce(`Results. Position ${place}. Total time ${fmtTime(total)}.`);
  }
}
