import * as THREE from 'three';
import { AudioEngine } from '../audio/Audio.ts';
import { CameraRig } from '../render/CameraRig.ts';
import { GarageStage } from '../render/GarageStage.ts';
import { MatchScene } from '../render/MatchScene.ts';
import { Renderer3D } from '../render/Renderer3D.ts';
import type { RayHit } from '../sim/collision.ts';
import { ARENA_INFO } from '../sim/arenas.ts';
import { DIFFICULTIES, MODES, PAINTS, WEAPONS, type Loadout } from '../sim/content.ts';
import { clamp } from '../sim/math.ts';
import { segmentTank } from '../sim/projectiles.ts';
import type { WeaponId } from '../sim/types.ts';
import { World, arenaRuntime } from '../sim/world.ts';
import { Hud } from '../ui/Hud.ts';
import { Menus, type ScreenId } from '../ui/Menus.ts';
import { Tutorial } from '../ui/Tutorial.ts';
import { $ } from '../ui/dom.ts';
import { Input } from './Input.ts';
import { applyMatch, type MatchSummary, type Profile } from './progression.ts';
import { loadProfile, loadSettings, resetProfile, saveProfile, saveSettings, type Settings } from './Storage.ts';

const SIM_STEP = 1 / 60;
const MAX_FRAME = 0.1;

type Phase = 'menu' | 'loading' | 'playing' | 'paused' | 'ended';

const _hit: RayHit = { t: 0, x: 0, y: 0, z: 0, nx: 0, ny: 0, nz: 0 };
const _dir = new THREE.Vector3();
const _v = new THREE.Vector3();
const _mz = { x: 0, y: 0, z: 0 };
const _bd = { x: 0, y: 0, z: 0 };

/**
 * Top-level orchestrator. Owns the renderer, the garage stage and (during a
 * match) the World + MatchScene. One requestAnimationFrame loop drives
 * everything; the simulation advances in equal sub-steps no longer than 1/60 s.
 */
export class Game {
  private readonly r: Renderer3D;
  private readonly garage: GarageStage;
  private readonly input: Input;
  private readonly audio = new AudioEngine();
  private readonly hud = new Hud();
  private readonly menus: Menus;
  private readonly tutorial = new Tutorial();
  private readonly camera = new THREE.PerspectiveCamera(68, 1, 0.1, 2000);
  private readonly rig: CameraRig;
  private settings: Settings;
  private profile: Profile;
  private world: World | null = null;
  private scene: MatchScene | null = null;
  private phase: Phase = 'menu';
  private raf = 0;
  private last = 0;
  private time = 0;
  private endTimer = -1;
  private wasAlive = true;
  private combatHeat = 0;
  private fpsAcc = 0;
  private fpsFrames = 0;
  private slowAcc = 0;
  private fastAcc = 0;
  private resumeLockPending = false;
  private contextLost = false;
  private disposed = false;
  private viewW = 0;
  private viewH = 0;
  private readonly cleanup: Array<() => void> = [];
  private readonly barrelScreen = { x: 0, y: 0, blocked: false, ready: true };

  constructor(canvas: HTMLCanvasElement) {
    this.settings = loadSettings();
    this.profile = loadProfile();
    this.r = new Renderer3D(canvas, this.settings.quality);
    this.garage = new GarageStage(this.r.env);
    this.input = new Input(canvas);
    this.rig = new CameraRig(this.camera);
    this.rig.targetDistance = this.settings.cameraDistance;
    this.audio.setVolumes(this.settings.masterVolume, this.settings.sfxVolume, this.settings.musicVolume, this.settings.muted);

    this.menus = new Menus(this.profile, this.settings, {
      deploy: () => this.deploy(),
      resume: () => this.resume(),
      restart: () => this.deploy(),
      quit: () => this.quitToMenu(),
      settingsChanged: (s) => this.applySettings(s),
      preview: (l) => this.previewLoadout(l),
      profileChanged: () => saveProfile(this.profile),
      resetProgress: () => {
        this.profile = resetProfile();
        this.menus.setProfile(this.profile);
        this.previewLoadout(this.profile.loadout);
        this.menus.show('menu');
      },
      sound: (k) => { this.audio.unlock(); this.audio.ui(k); },
      screenChanged: (s) => this.onScreen(s),
    });
    this.tutorial.onFinish = () => {
      this.profile.tutorialDone = true;
      saveProfile(this.profile);
    };
    this.input.onLockChange = (locked) => this.onLockChange(locked);
    $('btnLock').addEventListener('click', () => {
      this.audio.unlock();
      this.input.requestLock();
    });

    const on = (el: EventTarget, type: string, fn: (e: Event) => void) => {
      el.addEventListener(type, fn);
      this.cleanup.push(() => el.removeEventListener(type, fn));
    };
    on(window, 'resize', () => this.resize());
    on(window, 'keydown', (e) => this.onKey(e as KeyboardEvent));
    on(window, 'keyup', (e) => {
      if ((e as KeyboardEvent).code === 'Tab') this.hud.showScoreboard(false);
    });
    on(document, 'visibilitychange', () => {
      this.audio.suspend(document.hidden);
      if (document.hidden && this.phase === 'playing') this.pause();
    });
    on(window, 'pointerdown', () => this.audio.unlock());
    on(canvas, 'webglcontextlost', (e) => {
      e.preventDefault();
      this.contextLost = true;
      if (this.phase === 'playing') this.pause();
      $('loadText').textContent = 'GRAPHICS CONTEXT LOST — RESTORING…';
      $('loading').classList.remove('hidden');
    });
    on(canvas, 'webglcontextrestored', () => {
      this.contextLost = false;
      $('loading').classList.add('hidden');
      this.resize();
    });

    this.previewLoadout(this.profile.loadout);
    this.resize();
    this.menus.show('menu');
  }

  start(): void {
    this.last = performance.now();
    const loop = (now: number) => {
      if (this.disposed) return;
      this.raf = requestAnimationFrame(loop);
      const dt = Math.min(MAX_FRAME, Math.max(0, (now - this.last) / 1000));
      this.last = now;
      this.frame(dt);
    };
    this.raf = requestAnimationFrame(loop);
  }

  // ------------------------------------------------------------ menus & settings

  private onScreen(s: ScreenId): void {
    // Leaving the results screen for the menu or garage closes the finished match.
    if (this.phase === 'ended' && (s === 'menu' || s === 'garage' || s === 'modes')) {
      this.teardownMatch();
      this.phase = 'menu';
    }
    this.input.enabled = s === 'none' && this.phase === 'playing';
    if (s === 'garage' || s === 'menu' || s === 'modes') this.previewLoadout(s === 'garage' ? null : this.profile.loadout);
  }

  private previewLoadout(l: Loadout | null): void {
    const lo = l ?? this.profile.loadout;
    const paint = PAINTS.find((p) => p.id === lo.paint) ?? PAINTS[0];
    this.garage.setLook({ hull: lo.hull, weapon: lo.weapon, body: paint.body, metal: paint.metal, accent: paint.accent, light: 0xd8f6ff });
  }

  private applySettings(s: Settings): void {
    this.settings = s;
    saveSettings(s);
    this.audio.setVolumes(s.masterVolume, s.sfxVolume, s.musicVolume, s.muted);
    if (this.phase === 'menu' && s.quality !== this.r.level) {
      this.r.setQuality(s.quality);
      this.resize();
    }
  }

  private resize(): void {
    const w = window.innerWidth, h = window.innerHeight;
    this.viewW = w;
    this.viewH = h;
    this.r.resize(w, h);
    this.camera.aspect = w / Math.max(1, h);
    this.camera.updateProjectionMatrix();
    this.garage.resize(w, h);
    this.scene?.fx.setPixelScale(h * this.r.pixelRatio, this.camera.fov);
  }

  private onKey(e: KeyboardEvent): void {
    if (e.code === 'KeyM' && !e.repeat) {
      this.settings.muted = !this.settings.muted;
      this.applySettings(this.settings);
      this.menus.syncSettings();
      return;
    }
    if (e.code === 'Tab' && (this.phase === 'playing' || this.phase === 'ended') && this.world) {
      e.preventDefault();
      this.hud.showScoreboard(true);
      return;
    }
    if (e.code === 'Escape') {
      // When locked the browser releases the pointer itself and onLockChange pauses.
      if (this.phase === 'playing' && !this.input.locked) this.pause();
      else if (this.phase === 'paused' && this.menus.current === 'pause') this.resume();
      else if (this.phase === 'paused' && this.menus.current === 'none') {
        this.resumeLockPending = false;
        $('lockPrompt').classList.add('hidden');
        this.menus.show('pause');
      }
      else if (this.menus.current !== 'none' && this.menus.current !== 'menu' && this.menus.current !== 'end') this.menus.back();
    }
  }

  private onLockChange(locked: boolean): void {
    if (locked) {
      $('lockPrompt').classList.add('hidden');
      if (this.phase === 'paused' && this.resumeLockPending) this.resume();
      return;
    }
    if (this.phase === 'playing') this.pause();
  }

  // ------------------------------------------------------------ match lifecycle

  private deploy(): void {
    this.audio.unlock();
    // Request the lock inside the click gesture; the build continues while it engages.
    if (!this.input.allowUnlocked) this.input.requestLock();
    this.teardownMatch();
    this.phase = 'loading';
    this.menus.show('none');
    const m = this.profile.match;
    $('loadText').textContent = `DEPLOYING TO ${ARENA_INFO[m.arena].name}…`;
    $('loadBar').style.width = '40%';
    $('loading').classList.remove('hidden');
    window.setTimeout(() => this.buildMatch(), 30);
  }

  private buildMatch(): void {
    const m = this.profile.match;
    arenaRuntime(m.arena); // builds + caches the nav graph before timing-sensitive work
    $('loadBar').style.width = '75%';
    const paint = PAINTS.find((p) => p.id === this.profile.loadout.paint) ?? PAINTS[0];
    this.world = new World({
      mode: m.mode,
      arena: m.arena,
      difficulty: m.difficulty,
      scoreLimit: m.scoreLimit,
      timeLimit: m.timeLimit,
      player: { name: this.profile.callsign, loadout: this.profile.loadout, paint },
      seed: (Date.now() & 0xffff) + 1,
    });
    if (this.settings.quality !== this.r.level) this.r.setQuality(this.settings.quality);
    this.scene = new MatchScene(this.world, this.r);
    this.hud.bind(this.world);
    const p = this.world.player!;
    this.rig.reset(p.heading);
    this.rig.targetDistance = this.settings.cameraDistance;
    this.rig.update(0, p.x, p.y, p.z, this.world.collision, this.camSettings());
    this.resize();
    this.r.renderer.compile(this.scene.scene, this.camera);
    this.wasAlive = true;
    this.endTimer = -1;
    this.combatHeat = 0;
    this.menus.setPauseInfo(`${MODES[m.mode].name} · ${ARENA_INFO[m.arena].name} · ${DIFFICULTIES[m.difficulty].name}`);
    $('loading').classList.add('hidden');
    $('loadBar').style.width = '100%';
    this.hud.show(true);
    this.phase = 'playing';
    this.input.enabled = true;
    this.input.releaseAll();
    if (!this.input.locked && !this.input.allowUnlocked) $('lockPrompt').classList.remove('hidden');
    if (!this.profile.tutorialDone) this.tutorial.start(p);
    else this.tutorial.stop();
  }

  private pause(): void {
    if (this.phase !== 'playing') return;
    this.phase = 'paused';
    this.input.enabled = false;
    this.input.releaseAll();
    this.input.exitLock();
    this.hud.showScoreboard(false);
    $('lockPrompt').classList.add('hidden');
    this.audio.setEngine(null);
    this.menus.show('pause');
  }

  private resume(): void {
    if (this.phase !== 'paused') return;
    if (!this.input.locked && !this.input.allowUnlocked) {
      // Wait for the lock (requested within this click); onLockChange finishes the resume.
      this.resumeLockPending = true;
      this.input.requestLock();
      this.menus.show('none');
      $('lockPrompt').classList.remove('hidden');
      this.phase = 'paused';
      return;
    }
    this.resumeLockPending = false;
    this.menus.show('none');
    this.phase = 'playing';
    this.input.enabled = true;
    this.last = performance.now();
  }

  private quitToMenu(): void {
    this.teardownMatch();
    this.phase = 'menu';
    this.input.exitLock();
    this.menus.show('menu');
  }

  private teardownMatch(): void {
    this.tutorial.stop();
    this.hud.show(false);
    this.hud.showScoreboard(false);
    $('lockPrompt').classList.add('hidden');
    this.audio.setEngine(null);
    this.audio.setNearbyEngine(null, 0);
    this.scene?.dispose();
    this.scene = null;
    this.world = null;
    this.resumeLockPending = false;
  }

  private finishMatch(): void {
    const w = this.world!;
    const p = w.player!;
    const result = w.playerResult();
    const summary: MatchSummary = {
      result,
      kills: p.stats.kills,
      deaths: p.stats.deaths,
      assists: p.stats.assists,
      damage: p.stats.damage,
      score: p.stats.score,
      bestStreak: p.stats.bestStreak,
      duration: w.config.timeLimit - w.timeLeft,
    };
    const rewards = applyMatch(this.profile, summary);
    saveProfile(this.profile);
    this.phase = 'ended';
    this.input.enabled = false;
    this.input.exitLock();
    this.tutorial.stop();
    this.audio.setEngine(null);
    this.menus.showEnd(w, summary, rewards);
  }

  // ------------------------------------------------------------ frame

  private camSettings() {
    return { sensitivity: this.settings.sensitivity, invertY: this.settings.invertY, smoothing: this.settings.smoothing, fov: this.settings.fov, shake: this.settings.shake };
  }

  private frame(dt: number): void {
    if (this.contextLost) return;
    // Catch viewport changes that never fired a resize event (e.g. booted in a hidden tab).
    if (window.innerWidth !== this.viewW || window.innerHeight !== this.viewH) this.resize();
    this.time += dt;
    const t0 = performance.now();
    if (this.world && this.scene && (this.phase === 'playing' || this.phase === 'paused' || this.phase === 'ended')) this.matchFrame(dt);
    else {
      this.garage.update(dt, this.time);
      this.r.render(this.garage.scene, this.garage.camera);
    }
    this.input.endFrame();
    this.perf(dt, performance.now() - t0);
  }

  private matchFrame(dt: number): void {
    const w = this.world!, scene = this.scene!, p = w.player!;
    const running = this.phase === 'playing' || this.phase === 'ended';
    const cs = this.camSettings();

    if (this.phase === 'playing') {
      this.rig.look(this.input.mouseDX, this.input.mouseDY, cs);
      if (this.input.wheel) this.rig.zoom(this.input.wheel);
      this.playerControls();
    }
    if (running) {
      const n = Math.max(1, Math.ceil(dt / SIM_STEP - 1e-6));
      const step = dt / n;
      for (let i = 0; i < n; i++) {
        w.step(step);
        this.dispatchEvents();
      }
    }

    // Camera follows the tank (or its wreck); snaps to the new spawn.
    if (p.alive && !this.wasAlive) this.rig.reset(p.heading);
    this.wasAlive = p.alive;
    this.rig.update(dt, p.x, p.y, p.z, w.collision, cs);

    if (running) scene.update(dt, this.time);
    this.r.render(scene.scene, this.camera);

    // HUD.
    this.computeBarrelScreen();
    const { w: sw, h: sh } = this.r.size;
    this.hud.update(running ? dt : 0, this.camera, this.rig.yaw, sw, sh, this.barrelScreen);
    if (this.phase === 'playing') this.tutorial.update(p, dt);

    // Audio.
    this.rig.dir(_dir);
    this.audio.setListener(this.camera.position.x, this.camera.position.y, this.camera.position.z, _dir.x, _dir.y, _dir.z);
    if (this.phase === 'playing' && p.alive) {
      this.audio.setEngine({ speed: clamp(Math.abs(p.speed) / p.hull.maxSpeed, 0, 1.4), load: Math.abs(p.controls.throttle), boost: p.boosting, heavy: p.hull.mass / 2.1 });
      let near: typeof p | null = null;
      let nd = 45;
      for (const t of w.tanks) {
        if (t === p || !t.alive) continue;
        const d = Math.hypot(t.x - p.x, t.z - p.z);
        if (d < nd) { nd = d; near = t; }
      }
      this.audio.setNearbyEngine(near ? { x: near.x, y: near.y + 1, z: near.z } : null, near ? Math.min(1, Math.hypot(near.vx, near.vz) / 14) : 0);
    } else if (this.phase === 'playing') this.audio.setEngine(null);
    this.combatHeat = Math.max(0, this.combatHeat - dt * 0.08);
    this.audio.setIntensity(this.phase === 'playing' ? 0.35 + this.combatHeat * 0.65 : 0.2);

    if (this.endTimer >= 0) {
      this.endTimer -= dt;
      if (this.endTimer < 0) this.finishMatch();
    }
  }

  private playerControls(): void {
    const w = this.world!, p = w.player!, c = p.controls, inp = this.input;
    c.throttle = inp.axis('KeyS', 'KeyW', 'ArrowDown', 'ArrowUp');
    c.steer = inp.axis('KeyD', 'KeyA', 'ArrowRight', 'ArrowLeft');
    c.boost = inp.isDown('ShiftLeft') || inp.isDown('ShiftRight');
    c.fire = inp.fireHeld && inp.enabled;
    c.ability = inp.enabled && inp.wasPressed('Space');
    c.reload = inp.enabled && inp.wasPressed('KeyR');

    // Aim: cast the camera ray into the world (and other tanks) and steer the turret at the hit.
    this.rig.dir(_dir);
    const cam = this.camera.position;
    let maxT = 420;
    let ax = cam.x + _dir.x * maxT, ay = cam.y + _dir.y * maxT, az = cam.z + _dir.z * maxT;
    if (w.collision.raycast(cam.x, cam.y, cam.z, _dir.x, _dir.y, _dir.z, maxT, _hit)) {
      maxT = _hit.t;
      ax = _hit.x; ay = _hit.y; az = _hit.z;
    }
    for (const t of w.tanks) {
      if (t === p || !t.alive) continue;
      const s = segmentTank(t, cam.x, cam.y, cam.z, _dir.x * maxT, _dir.y * maxT, _dir.z * maxT);
      if (s >= 0) {
        maxT *= s;
        ax = cam.x + _dir.x * maxT; ay = cam.y + _dir.y * maxT; az = cam.z + _dir.z * maxT;
      }
    }
    // Never aim at a point behind or inside our own hull (camera inside geometry).
    const px = p.x, py = p.y + p.pivotHeight, pz = p.z;
    let dx = ax - px, dz = az - pz;
    let hd = Math.hypot(dx, dz);
    if (hd < 6) {
      ax = px + _dir.x * 40; az = pz + _dir.z * 40; ay = py + _dir.y * 40;
      dx = ax - px; dz = az - pz; hd = Math.hypot(dx, dz);
    }
    c.aimYaw = Math.atan2(dx, dz);
    const wpn = p.weapon;
    const dy = ay - py;
    if (wpn.gravity > 0) {
      const v = wpn.speed, g = wpn.gravity;
      const disc = v * v * v * v - g * (g * hd * hd + 2 * dy * v * v);
      c.aimPitch = disc > 0 ? Math.atan((v * v - Math.sqrt(disc)) / (g * hd)) : wpn.pitchMax;
    } else c.aimPitch = Math.atan2(dy, hd);
  }

  /** Where the barrel currently points, projected to the screen (the moving ring). */
  private computeBarrelScreen(): void {
    const w = this.world!, p = w.player!;
    const b = this.barrelScreen;
    if (!p.alive) return;
    p.muzzle(_mz);
    p.barrelDir(_bd);
    const wpn = p.weapon;
    let x = _mz.x, y = _mz.y, z = _mz.z;
    let vx = _bd.x * wpn.speed, vy = _bd.y * wpn.speed, vz = _bd.z * wpn.speed;
    const stepT = wpn.gravity > 0 ? 0.05 : Math.min(0.1, 300 / wpn.speed / 20);
    let travelled = 0;
    let blocked = false;
    for (let i = 0; i < 60; i++) {
      vy -= wpn.gravity * stepT;
      const sx = vx * stepT, sy = vy * stepT, sz = vz * stepT;
      if (w.collision.raycast(x, y, z, sx, sy, sz, 1, _hit)) {
        x = _hit.x; y = _hit.y; z = _hit.z;
        travelled += Math.hypot(sx, sy, sz) * _hit.t;
        blocked = travelled < 7;
        break;
      }
      x += sx; y += sy; z += sz;
      travelled += Math.hypot(sx, sy, sz);
      if (travelled > wpn.speed * wpn.lifetime) break;
    }
    _v.set(x, y, z).project(this.camera);
    const { w: sw, h: sh } = this.r.size;
    b.x = (_v.x * 0.5 + 0.5) * sw;
    b.y = (-_v.y * 0.5 + 0.5) * sh;
    b.blocked = blocked;
    b.ready = p.cooldown <= 0 && p.reloadTimer <= 0 && p.overheated <= 0 && !p.venting;
  }

  private dispatchEvents(): void {
    const w = this.world!, scene = this.scene!, p = w.player!;
    const q = w.events;
    for (let i = 0; i < q.count; i++) {
      const e = q.get(i);
      scene.handle(e);
      this.hud.onEvent(e);
      const own = e.a === p.id;
      switch (e.type) {
        case 'fire': {
          const kind = WEAPONS[e.kind as WeaponId].projectile;
          this.audio.fire(kind, e, own);
          if (own) {
            this.tutorial.noteShot();
            if (kind === 'rail' || kind === 'nova') this.rig.addTrauma(kind === 'rail' ? 0.25 : 0.12);
          }
          break;
        }
        case 'charge': {
          const t = w.tanks[e.a];
          this.audio.charge(own, { x: t.x, y: t.y + 2, z: t.z });
          break;
        }
        case 'impact':
          this.audio.impact(WEAPONS[e.kind as WeaponId].projectile, e, e.a >= 0);
          break;
        case 'explode': {
          const t = w.tanks[e.a];
          const pos = e.kind === 'shockwave' ? { x: t.x, y: t.y, z: t.z } : e;
          if (e.kind === 'shockwave') this.audio.ability('shockwave', pos, own);
          else this.audio.explosion(pos, false);
          const d = Math.hypot(pos.x - p.x, pos.z - p.z);
          if (d < 25) this.rig.addTrauma((1 - d / 25) * 0.35);
          break;
        }
        case 'damage':
          if (e.b === p.id && e.a !== p.id) { this.audio.hitConfirm(false); this.combatHeat = Math.min(1, this.combatHeat + 0.15); }
          if (e.a === p.id) {
            this.audio.damageTaken(e.value, p.health < p.maxHealth * 0.3);
            this.rig.addTrauma(Math.min(0.5, e.value / 70));
            this.combatHeat = Math.min(1, this.combatHeat + 0.2);
          }
          break;
        case 'kill': {
          const v = w.tanks[e.a];
          this.audio.explosion({ x: v.x, y: v.y + 1, z: v.z }, true);
          if (e.b === p.id && e.a !== p.id) { this.audio.hitConfirm(true); this.tutorial.noteKill(); }
          const d = Math.hypot(v.x - p.x, v.z - p.z);
          if (own) this.rig.addTrauma(0.6);
          else if (d < 30) this.rig.addTrauma((1 - d / 30) * 0.5);
          break;
        }
        case 'pickup':
          if (own) this.audio.pickup(e.kind);
          break;
        case 'ability': {
          const t = w.tanks[e.a];
          if (e.kind !== 'shockwave') this.audio.ability(e.kind, { x: t.x, y: t.y + 1, z: t.z }, own);
          if (own) this.tutorial.noteAbility();
          break;
        }
        case 'reload':
          if (own) this.audio.reload(true);
          break;
        case 'overheat':
          if (own) this.audio.overheat();
          break;
        case 'capture':
          this.audio.capture(e.kind === p.team);
          break;
        case 'countdown':
          this.audio.countdown(e.value);
          break;
        case 'matchEnd':
          this.audio.matchEnd(w.playerResult() === 'win');
          this.hud.banner(MODES[w.mode].name, w.playerResult() === 'win' ? 'VICTORY' : w.playerResult() === 'loss' ? 'DEFEAT' : 'DRAW', w.playerResult() === 'loss' ? 'red' : '');
          this.endTimer = 3;
          this.input.enabled = false;
          this.tutorial.stop();
          break;
        default:
          break;
      }
    }
    q.clear();
  }

  /** FPS readout and dynamic resolution when frames run long. */
  private perf(dt: number, workMs: number): void {
    this.fpsAcc += dt;
    this.fpsFrames++;
    if (this.fpsAcc >= 0.5) {
      this.hud.setFps(this.settings.showFps && !!this.world, this.fpsFrames / this.fpsAcc);
      this.fpsAcc = 0;
      this.fpsFrames = 0;
    }
    if (this.phase !== 'playing') return;
    if (dt > 1 / 40 || workMs > 22) { this.slowAcc += dt; this.fastAcc = 0; }
    else if (dt < 1 / 55) { this.fastAcc += dt; this.slowAcc = Math.max(0, this.slowAcc - dt * 0.5); }
    if (this.slowAcc > 2 && this.r.scale > 0.6) {
      this.r.scale = Math.max(0.6, this.r.scale - 0.1);
      this.slowAcc = 0;
      this.resize();
    } else if (this.fastAcc > 6 && this.r.scale < 1) {
      this.r.scale = Math.min(1, this.r.scale + 0.05);
      this.fastAcc = 0;
      this.resize();
    }
  }

  /**
   * Automated testing: runs the normal frame loop synchronously for `seconds`
   * (background tabs get no requestAnimationFrame). Debug builds only.
   */
  advance(seconds: number, dt = 1 / 60): void {
    for (let t = 0; t < seconds; t += dt) {
      this.frame(dt);
    }
  }

  /** Dev / automated testing: play without pointer lock (mouse buttons accepted while unlocked). */
  setTestMode(on: boolean): void {
    this.input.allowUnlocked = on;
  }

  get debug(): { world: World | null; phase: Phase; rig: CameraRig; input: Input; profile: Profile } {
    return { world: this.world, phase: this.phase, rig: this.rig, input: this.input, profile: this.profile };
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.teardownMatch();
    this.cleanup.forEach((f) => f());
    this.input.dispose();
    this.audio.dispose();
    this.garage.dispose();
    this.r.dispose();
  }
}
