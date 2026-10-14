import * as THREE from 'three';
import { AudioManager } from '../audio/AudioManager';
import { ParticleSystem } from '../effects/ParticleSystem';
import { PostProcessing } from '../effects/PostProcessing';
import { VisualEffects } from '../effects/VisualEffects';
import { Enemy } from '../enemies/Enemy';
import { updateEnemy, type AIContext } from '../enemies/EnemyAI';
import { EnemySpawner } from '../enemies/EnemySpawner';
import { PlayerCombat, type CombatCallbacks, type ShotResult } from '../player/PlayerCombat';
import { PlayerController } from '../player/PlayerController';
import { ThirdPersonCamera } from '../player/ThirdPersonCamera';
import { HUD, type RadarBlip } from '../ui/HUD';
import { Menus } from '../ui/Menus';
import { TrafficSystem } from '../vehicles/TrafficSystem';
import { Vehicle, type DriveInput } from '../vehicles/Vehicle';
import { ProjectileSystem, type BoltTarget } from '../weapons/ProjectileSystem';
import { WEAPONS } from '../weapons/Weapon';
import { CityWorld } from '../world/CityWorld';
import { timeUniform } from '../world/Materials';
import { MAX_FRAME_DT, MISSION, PALETTE, PLAYER, QUALITY_PRESETS, SIM_STEP } from './GameConfig';
import { GameState } from './GameState';
import { Input } from './Input';
import { PICKUP_LABEL, Pickups, type PickupKind } from './Pickups';
import { loadRecords, loadSettings, recordRun, resetRecords, saveSettings, type Records, type Settings } from './Storage';

const CAR_NAMES = ['SOLARA GT', 'NIGHTRUNNER', 'VELVET VX'];
const _v1 = new THREE.Vector3();
const _v2 = new THREE.Vector3();
const _col = new THREE.Color();
const _p = { x: 0, z: 0 };
const _honk = { x: 0, z: 0 };

/**
 * Top-level orchestrator: owns the renderer and every subsystem, runs the
 * fixed-substep simulation, and routes gameplay events between combat, AI,
 * vehicles, effects, audio and UI.
 */
export class Game {
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.PerspectiveCamera(70, 1, 0.1, 1600);
  private readonly post: PostProcessing;
  private readonly world: CityWorld;
  private readonly input: Input;
  private readonly cam: ThirdPersonCamera;
  private readonly player = new PlayerController();
  private readonly combat = new PlayerCombat();
  private readonly vehicles: Vehicle[] = [];
  private readonly traffic: TrafficSystem;
  private readonly spawner: EnemySpawner;
  private readonly bolts: ProjectileSystem;
  private readonly fx = new VisualEffects();
  private readonly particles = new ParticleSystem();
  private readonly pickups = new Pickups();
  private readonly audio = new AudioManager();
  private readonly hud = new HUD();
  private readonly menus: Menus;
  private readonly state = new GameState();
  private settings: Settings;
  private records: Records;
  private vehicle: Vehicle | null = null;
  private readonly aiCtx: AIContext;
  private readonly combatCb: CombatCallbacks;
  private readonly targetVel = new THREE.Vector3();
  private readonly lastTargetPos = new THREE.Vector3();
  private time = 0;
  private lastFrame = 0;
  private raf = 0;
  private dyingTimer = 0;
  private resolutionScale = 1;
  private frameAccum = 0;
  private frameCount = 0;
  private workAccum = 0;
  private slowWindows = 0;
  private lastWork = 0;
  private fpsAccum = 0;
  private fpsFrames = 0;
  private radarTimer = 0;
  private steamTimer = 0;
  private damagePulse = 0;
  private readonly radarBlips: RadarBlip[] = [];
  private readonly cleanup: Array<() => void> = [];
  private disposed = false;
  /** Dev-only: lets automated browser tests run the simulation without pointer lock. */
  debugNoLock = false;

  constructor(private readonly canvas: HTMLCanvasElement) {
    this.settings = loadSettings();
    this.records = loadRecords();
    const preset = QUALITY_PRESETS[this.settings.quality];
    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: preset.antialias, powerPreference: 'high-performance', stencil: false });
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.05;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    this.world = new CityWorld(this.scene);
    this.world.environment.bakeEnvironment(this.renderer);
    this.input = new Input(canvas);
    this.cam = new ThirdPersonCamera(this.camera, this.world.collision);
    this.post = new PostProcessing(this.renderer, this.scene, this.camera);

    this.scene.add(this.player.character.root);
    this.world.layout.drivableCars.forEach((spot, i) => {
      const v = new Vehicle(spot.x, spot.z, spot.heading, spot.color, spot.accent, CAR_NAMES[i % CAR_NAMES.length]);
      this.vehicles.push(v);
      this.scene.add(v.model.group);
    });
    this.traffic = new TrafficSystem(QUALITY_PRESETS.high.trafficCars);
    this.scene.add(this.traffic.group);
    this.spawner = new EnemySpawner(this.world.collision);
    this.scene.add(this.spawner.group);
    this.bolts = new ProjectileSystem(this.world.collision, PALETTE.orange);
    this.scene.add(this.bolts.group, this.fx.group, this.particles.points, this.pickups.group);

    this.aiCtx = {
      world: this.world.collision,
      target: this.player.position,
      targetAlive: true,
      targetInVehicle: false,
      targetVel: this.targetVel,
      projectiles: this.bolts,
      enemies: this.spawner.pool,
      onMelee: (e, dmg) => this.onMelee(e, dmg),
      onShoot: (e) => this.audio.enemyShoot(e.position.distanceTo(this.player.position)),
    };
    this.combatCb = {
      onShot: (s) => this.onShot(s),
      onDryFire: () => this.audio.dryFire(),
      onReloadStart: (id) => this.audio.reload(id),
      onReloadDone: () => this.audio.reloadDone(),
      onSwitch: (id) => {
        this.audio.switchWeapon();
        this.player.character.setWeapon(id);
        this.player.character.setNeon(WEAPONS[id].color);
      },
    };

    this.menus = new Menus(this.settings, {
      onStart: () => this.startMission(),
      onResume: () => this.resume(),
      onRestart: () => this.startMission(),
      onQuit: () => this.toTitle(),
      onReplay: () => this.startMission(),
      onSettings: (s) => this.applySettings(s),
      onResetRecords: () => { this.records = resetRecords(); this.menus.setRecords(this.records); },
      onLock: () => this.input.requestLock(),
      onUiSound: (k) => (k === 'click' ? this.audio.uiClick() : this.audio.uiHover()),
      onGesture: () => {
        this.audio.unlock();
        this.audio.startMusic();
      },
    });
    this.menus.setRecords(this.records);
    this.applySettings(this.settings);

    this.bindEvents();
    this.resize();
    this.toTitle();
  }

  // ------------------------------------------------------------ lifecycle
  start(): void {
    this.lastFrame = performance.now();
    const frame = (now: number) => {
      if (this.disposed) return;
      this.raf = requestAnimationFrame(frame);
      this.frame(now);
    };
    this.raf = requestAnimationFrame(frame);
  }

  private bindEvents(): void {
    const on = (t: EventTarget, type: string, fn: (e: Event) => void) => {
      t.addEventListener(type, fn);
      this.cleanup.push(() => t.removeEventListener(type, fn));
    };
    on(window, 'resize', () => this.resize());
    on(document, 'visibilitychange', () => { if (document.hidden) this.pause(); });
    on(window, 'blur', () => this.pause());
    on(document, 'pointerlockchange', () => {
      if (document.pointerLockElement === this.canvas) {
        if (this.state.phase === 'playing') this.menus.show('none');
      } else if (this.state.phase === 'playing' && !this.debugNoLock) {
        this.pause();
      }
    });
    on(document, 'pointerlockerror', () => {
      if (this.state.phase === 'playing' && !this.debugNoLock) this.menus.show('lock');
    });
    on(this.canvas, 'click', () => {
      if (this.state.phase === 'playing' && !this.input.locked) this.input.requestLock();
    });
    on(window, 'keydown', (e) => {
      const k = e as KeyboardEvent;
      if (k.code === 'Escape' && this.state.phase === 'playing' && !this.input.locked) this.pause();
      else if (k.code === 'KeyP' && this.state.phase === 'playing') this.pause();
    });
    on(this.canvas, 'webglcontextlost', (e) => {
      e.preventDefault();
      cancelAnimationFrame(this.raf);
      document.getElementById('fatalText')!.textContent = 'The graphics context was lost. Reload the page to continue.';
      document.getElementById('fatal')!.classList.remove('hidden');
    });
  }

  private resize(): void {
    const w = window.innerWidth, h = window.innerHeight;
    const preset = QUALITY_PRESETS[this.settings.quality];
    const pr = Math.min(window.devicePixelRatio || 1, preset.maxPixelRatio) * this.resolutionScale;
    this.renderer.setPixelRatio(pr);
    this.renderer.setSize(w, h, false);
    this.post.setSize(w, h, pr);
    this.camera.aspect = w / h;
    this.camera.updateProjectionMatrix();
    this.particles.setViewportHeight(h * pr);
  }

  private applySettings(s: Settings): void {
    const qualityChanged = s.quality !== this.settings.quality;
    this.settings = s;
    saveSettings(s);
    this.cam.sensitivity = s.sensitivity;
    this.cam.invertY = s.invertY;
    this.cam.reducedShake = s.reducedShake;
    this.audio.setVolumes(s.musicVolume, s.sfxVolume, s.muted);
    const preset = QUALITY_PRESETS[s.quality];
    this.post.setBloom(preset.bloom);
    this.particles.setLimit(preset.maxParticles);
    this.traffic.setVisibleCount(preset.trafficCars);
    document.body.classList.toggle('no-grain', !preset.grain);
    const shadowsChanged = this.renderer.shadowMap.enabled !== preset.shadows;
    this.renderer.shadowMap.enabled = preset.shadows;
    this.world.environment.setShadows(preset.shadows);
    this.world.setPointLights(s.quality !== 'low');
    if (shadowsChanged) {
      this.scene.traverse((o) => {
        const m = (o as THREE.Mesh).material;
        if (Array.isArray(m)) m.forEach((x) => (x.needsUpdate = true));
        else if (m) m.needsUpdate = true;
      });
    }
    if (qualityChanged) this.resolutionScale = 1;
    this.resize();
  }

  // --------------------------------------------------------------- phases
  private toTitle(): void {
    this.state.phase = 'title';
    this.input.enabled = false;
    this.input.exitLock();
    this.resetWorldActors();
    this.player.spawn(this.world.layout.playerStart, this.world.layout.playerStartYaw);
    this.player.character.root.visible = true;
    this.cam.mode = 'orbit';
    this.hud.show(false);
    this.menus.setRecords(this.records);
    this.menus.show('title');
    this.audio.setIntensity(0);
    this.audio.setEngine(false, 0, 0, 0);
  }

  private resetWorldActors(): void {
    if (this.vehicle) this.vehicle.occupied = false;
    this.vehicle = null;
    for (const v of this.vehicles) v.reset();
    this.spawner.reset();
    this.bolts.clear();
    this.fx.clear();
    this.particles.clear();
    this.pickups.clear();
  }

  private startMission(): void {
    this.audio.unlock();
    this.audio.startMusic();
    this.resetWorldActors();
    this.state.reset();
    this.combat.reset();
    this.player.spawn(this.world.layout.playerStart, this.world.layout.playerStartYaw);
    this.player.character.setWeapon('pistol');
    this.player.character.setNeon(WEAPONS.pistol.color);
    this.cam.mode = 'foot';
    this.cam.snapTo(this.player.position, this.world.layout.playerStartYaw);
    this.hud.resetTransient();
    this.hud.show(true);
    this.hud.setWave(1, MISSION.totalWaves);
    this.menus.show('none');
    this.input.enabled = true;
    this.input.releaseAll();
    this.input.requestLock();
    this.audio.setIntensity(1);
    this.audio.missionStart();
    this.hud.banner('MISSION 01', 'NIGHTFALL', 'SURVIVE SIX WAVES');
    this.lastTargetPos.copy(this.player.position);
    if (!this.input.locked && !this.debugNoLock) window.setTimeout(() => this.checkLock(), 400);
  }

  private checkLock(): void {
    if (this.state.phase === 'playing' && !this.input.locked && !this.debugNoLock && this.menus.screen === 'none') this.menus.show('lock');
  }

  private pause(): void {
    if (this.state.phase !== 'playing') return;
    this.state.phase = 'paused';
    this.input.enabled = false;
    this.input.releaseAll();
    this.input.exitLock();
    this.audio.setEngine(false, 0, 0, 0);
    this.menus.show('pause');
  }

  private resume(): void {
    if (this.state.phase !== 'paused') return;
    this.state.phase = 'playing';
    this.input.enabled = true;
    this.menus.show('none');
    this.input.requestLock();
    if (!this.debugNoLock) window.setTimeout(() => this.checkLock(), 400);
  }

  private endMission(won: boolean): void {
    this.state.phase = 'ended';
    this.input.enabled = false;
    this.input.exitLock();
    this.audio.setEngine(false, 0, 0, 0);
    this.audio.setIntensity(0);
    const waves = won ? MISSION.totalWaves : Math.max(0, this.spawner.wave - 1);
    const { records, newBest } = recordRun({
      score: this.state.score,
      wave: won ? MISSION.totalWaves : this.spawner.wave,
      kills: this.state.kills,
      accuracy: this.combat.accuracy,
      completed: won,
      date: new Date().toISOString(),
    });
    this.records = records;
    this.hud.show(false);
    this.menus.showEnd({
      won,
      score: this.state.score,
      kills: this.state.kills,
      waves,
      accuracy: this.combat.accuracy,
      headshots: this.state.headshots,
      bestCombo: this.state.bestCombo,
      time: this.state.elapsed,
      newBest,
    });
  }

  // ----------------------------------------------------------------- loop
  private frame(now: number): void {
    let dt = (now - this.lastFrame) / 1000;
    this.lastFrame = now;
    if (!(dt > 0)) return;
    dt = Math.min(dt, MAX_FRAME_DT);
    this.trackPerformance(dt, this.lastWork);

    const phase = this.state.phase;
    const live = phase === 'playing' && (this.input.locked || this.debugNoLock);
    const timeScale = phase === 'ended' && this.dyingTimer > 0 ? 0.35 : 1;
    const simDt = dt * timeScale;

    if (live) {
      this.cam.rotate(this.input.mouseDX, this.input.mouseDY, this.input.wheel);
    }
    if (live || phase === 'title' || phase === 'ended') {
      this.time += simDt;
      const steps = Math.max(1, Math.ceil(simDt / SIM_STEP));
      const h = simDt / steps;
      for (let i = 0; i < steps; i++) this.simulate(h, live, i === 0);
      this.frameVisuals(simDt, live);
    }
    timeUniform.value = this.time;
    this.input.endFrame();
    this.world.environment.follow(this.camera, this.cam.mode === 'orbit' ? 25 : this.player.position.x, this.cam.mode === 'orbit' ? 10 : this.player.position.z);
    this.post.render(this.time, this.damagePulse);
    this.lastWork = performance.now() - now;
  }

  /** One fixed sub-step of gameplay. `first` gates once-per-frame edge inputs. */
  private simulate(dt: number, live: boolean, first: boolean): void {
    const s = this.state;
    // Traffic & ambient always run (title backdrop too).
    const obstacles: Array<{ x: number; z: number }> = [this.player.position];
    for (const v of this.vehicles) obstacles.push(v.position);
    for (const e of this.spawner.pool) if (e.alive) obstacles.push(e.position);
    this.traffic.update(dt, obstacles);
    if (this.traffic.takeHonk(_honk) && s.phase === 'playing' && Math.hypot(_honk.x - this.player.position.x, _honk.z - this.player.position.z) < 30) this.audio.honk();

    if (!live) {
      if (s.phase === 'ended') this.simulateCombatants(dt, false);
      return;
    }

    s.update(dt);
    this.combat.damageMultiplier = s.boostTimer > 0 ? 2 : 1;

    // Vehicle enter/exit (edge-triggered).
    if (first && this.input.wasPressed('KeyE')) this.toggleVehicle();

    // Player / vehicle movement.
    const aiming = this.input.aimHeld && !this.vehicle && this.player.alive;
    if (this.vehicle) {
      const v = this.vehicle;
      const drive: DriveInput = {
        throttle: this.input.axis('KeyS', 'KeyW', 'ArrowDown', 'ArrowUp'),
        steer: this.input.axis('KeyD', 'KeyA', 'ArrowRight', 'ArrowLeft'),
        handbrake: this.input.isDown('Space'),
      };
      const impact = v.update(dt, drive, this.world.collision);
      if (impact) this.onCarImpact(impact.speed, impact.x, impact.z, impact.nx, impact.nz);
      this.player.position.set(v.position.x, 0, v.position.z);
    } else {
      const ev = this.player.update(dt, this.input, this.cam.yaw, this.cam.pitch, aiming, this.world.collision);
      if (ev.footstep) this.audio.footstep(Math.hypot(this.player.velocity.x, this.player.velocity.z) > PLAYER.walkSpeed + 0.5);
      if (ev.jumped) this.audio.jump();
      if (ev.landed) this.audio.land();
      this.combat.update(dt, this.input, first, this.camera, this.player, this.world.collision, this.spawner.pool, aiming, this.combatCb);
    }
    // Idle vehicles keep coasting/settling.
    for (const v of this.vehicles) if (v !== this.vehicle) v.update(dt, null, this.world.collision);
    this.resolveDynamicCollisions();

    // Target velocity for enemy shot leading.
    this.targetVel.subVectors(this.player.position, this.lastTargetPos).divideScalar(dt);
    this.lastTargetPos.copy(this.player.position);

    this.simulateCombatants(dt, true);
    this.updateWaves(dt);

    const collected = this.pickups.update(dt, this.time, this.player.position.x, this.player.position.z, this.player.alive, this.vehicle ? 2.6 : 1.4);
    if (collected) this.onPickup(collected);

    if (!this.player.alive && s.phase === 'playing') {
      s.phase = 'ended';
      this.dyingTimer = 2.8;
      this.audio.gameOver();
      this.hud.banner('SIGNAL LOST', 'FLATLINED', `${s.score.toLocaleString('en-US')} PTS`);
    }
  }

  private simulateCombatants(dt: number, live: boolean): void {
    this.aiCtx.targetAlive = this.player.alive && live;
    this.aiCtx.targetInVehicle = this.vehicle !== null;
    if (live) this.spawner.update(dt, this.player.position, {
      onTelegraph: (x, z, kind) => {
        _col.set(EnemySpawner.telegraphColor(kind));
        this.fx.spawnBeam(x, z, _col);
        this.fx.ring(x, 0.05, z, _col, 4, 0.9);
        if (this.player.position.distanceTo(_v1.set(x, 0, z)) < 45) this.audio.spawnWhoosh();
      },
      onSpawn: (e) => {
        _col.set(EnemySpawner.telegraphColor(e.def.kind));
        this.particles.burst(e.position.x, 1, e.position.z, 18, 6, _col, 0.14, 0.6, 2, 0.6);
      },
    });
    for (const e of this.spawner.pool) {
      if (!e.active) continue;
      updateEnemy(e, dt, this.aiCtx);
    }
    const target = this.boltTarget();
    this.bolts.update(dt, target, {
      onHitTarget: (dmg, fx, fz) => this.damagePlayer(dmg, fx, fz),
      onHitWorld: (x, y, z, nx, ny, nz) => this.particles.sparks(x, y, z, nx, ny, nz, 6, _col.set(PALETTE.orange)),
    });
  }

  private boltTarget(): BoltTarget | null {
    if (!this.player.alive || this.state.phase !== 'playing') return null;
    const p = this.player.position;
    if (this.vehicle) return { x: p.x, y0: 0, y1: 1.6, z: p.z, radius: 1.3 };
    return { x: p.x, y0: p.y, y1: p.y + PLAYER.height, z: p.z, radius: PLAYER.radius + 0.08 };
  }

  private updateWaves(dt: number): void {
    const s = this.state;
    const sp = this.spawner;
    if (s.wavePhase === 'intro' || s.wavePhase === 'intermission') {
      s.waveTimer -= dt;
      const next = sp.wave + 1;
      if (s.wavePhase === 'intro') this.hud.setObjective('Hostiles are moving in. Hold the plaza.');
      else this.hud.setObjective(`Next wave in ${Math.ceil(Math.max(0, s.waveTimer))} — grab drops or find a ride`);
      if (s.waveTimer <= 0) {
        sp.startWave(next);
        s.wavePhase = 'active';
        this.hud.setWave(next, MISSION.totalWaves);
        const final = next === MISSION.totalWaves;
        this.hud.banner(final ? 'FINAL WAVE' : `WAVE ${next} / ${MISSION.totalWaves}`, final ? 'LAST STAND' : 'HOSTILES INBOUND', `${sp.spec.total} TARGETS`);
        this.audio.missionStart();
      }
    } else {
      this.hud.setObjective(sp.wave === MISSION.totalWaves ? 'Final wave — eliminate every hostile' : 'Eliminate the hostiles');
      if (sp.waveCleared) {
        s.wavesCleared = sp.wave;
        const bonus = 250 * sp.wave + Math.round(this.player.health) * 2;
        s.addScore(bonus);
        this.player.heal(25);
        this.audio.waveClear();
        if (sp.isFinalWave) {
          s.won = true;
          s.addScore(2500);
          this.audio.missionComplete();
          this.hud.banner('MISSION COMPLETE', 'CITY SECURED', `+${bonus + 2500} BONUS`);
          s.phase = 'ended';
          this.dyingTimer = 3;
        } else {
          s.wavePhase = 'intermission';
          s.waveTimer = 7;
          this.hud.banner(`WAVE ${sp.wave} CLEARED`, 'STREETS QUIET', `+${bonus} BONUS · +25 HP`);
        }
      }
    }
  }

  // -------------------------------------------------------------- vehicles
  private nearestVehicle(): Vehicle | null {
    let best: Vehicle | null = null;
    let bestD = 2.8;
    for (const v of this.vehicles) {
      for (let i = 0; i < v.hullCount; i++) {
        v.hullPoint(i, _p);
        const d = Math.hypot(_p.x - this.player.position.x, _p.z - this.player.position.z) - v.hullRadius;
        if (d < bestD) { bestD = d; best = v; }
      }
    }
    return best;
  }

  private toggleVehicle(): void {
    if (!this.player.alive) return;
    if (this.vehicle) {
      const v = this.vehicle;
      if (Math.abs(v.forwardSpeed) > 9) return;
      const h = v.heading;
      const rx = Math.cos(h), rz = -Math.sin(h), fx = Math.sin(h), fz = Math.cos(h);
      const spots: Array<[number, number]> = [[rx * 2, rz * 2], [-rx * 2, -rz * 2], [-fx * 3.4, -fz * 3.4], [fx * 3.4, fz * 3.4]];
      for (const [ox, oz] of spots) {
        _v1.set(v.position.x + ox, 0, v.position.z + oz);
        _v2.copy(_v1);
        this.world.collision.resolveCircle(_v2, PLAYER.radius, PLAYER.stepHeight, PLAYER.height, { hit: false, nx: 0, nz: 0 });
        if (_v2.distanceTo(_v1) < 0.05) {
          v.occupied = false;
          this.vehicle = null;
          this.player.inVehicle = false;
          this.player.position.copy(_v1);
          this.player.velocity.set(0, 0, 0);
          this.player.facing = h;
          this.player.character.root.visible = true;
          this.player.sync();
          this.cam.mode = 'foot';
          this.audio.carDoor();
          this.audio.setEngine(false, 0, 0, 0);
          return;
        }
      }
      return;
    }
    const v = this.nearestVehicle();
    if (!v) return;
    this.vehicle = v;
    v.occupied = true;
    this.player.inVehicle = true;
    this.player.character.root.visible = false;
    this.combat.weapon.cancelReload();
    this.cam.mode = 'vehicle';
    this.audio.carDoor();
  }

  private onCarImpact(speed: number, x: number, z: number, nx: number, nz: number): void {
    this.particles.sparks(x - nx * 1, 0.6, z - nz * 1, nx, 0.2, nz, Math.min(24, Math.round(speed * 1.5)), _col.set(PALETTE.yellow));
    this.audio.crash(speed);
    this.cam.addTrauma(Math.min(0.6, speed * 0.03));
  }

  /** Car vs traffic, enemies and the on-foot player; player vs idle cars. */
  private resolveDynamicCollisions(): void {
    const pv = this.vehicle;
    // Player's car vs traffic.
    if (pv) {
      this.traffic.forEachHull((tx, tz, tr, idx) => {
        for (let i = 0; i < pv.hullCount; i++) {
          pv.hullPoint(i, _p);
          const dx = _p.x - tx, dz = _p.z - tz;
          const d = Math.hypot(dx, dz), min = tr + pv.hullRadius;
          if (d < min && d > 1e-4) {
            const nx = dx / d, nz = dz / d;
            pv.position.x += nx * (min - d);
            pv.position.z += nz * (min - d);
            const imp = pv.bounce(nx, nz, _p.x, _p.z);
            if (imp) { this.onCarImpact(imp.speed, imp.x, imp.z, nx, nz); this.traffic.knock(idx); }
          }
        }
      });
      // Ramming enemies.
      const speed = Math.abs(pv.forwardSpeed);
      for (const e of this.spawner.pool) {
        if (!e.alive) continue;
        for (let i = 0; i < pv.hullCount; i++) {
          pv.hullPoint(i, _p);
          const dx = e.position.x - _p.x, dz = e.position.z - _p.z;
          const d = Math.hypot(dx, dz), min = pv.hullRadius + e.def.radius;
          if (d >= min) continue;
          if (speed > 6) {
            e.velocity.set(pv.velocity.x * 0.6 + (dx / (d || 1)) * 4, 0, pv.velocity.y * 0.6 + (dz / (d || 1)) * 4);
            e.kill();
            this.onEnemyKilled(e, false, true);
            pv.velocity.multiplyScalar(0.93);
          } else if (d > 1e-4) {
            e.position.x += (dx / d) * (min - d);
            e.position.z += (dz / d) * (min - d);
          }
          break;
        }
      }
    }
    // Idle cars push characters out; traffic pushes the on-foot player.
    const pushOut = (pos: THREE.Vector3, r: number) => {
      for (const v of this.vehicles) {
        if (v === pv) continue;
        for (let i = 0; i < v.hullCount; i++) {
          v.hullPoint(i, _p);
          const dx = pos.x - _p.x, dz = pos.z - _p.z;
          const d = Math.hypot(dx, dz), min = r + v.hullRadius;
          if (d < min && d > 1e-4 && pos.y < 1.3) { pos.x += (dx / d) * (min - d); pos.z += (dz / d) * (min - d); }
        }
      }
    };
    if (!pv) {
      pushOut(this.player.position, PLAYER.radius);
      this.traffic.forEachHull((tx, tz, tr) => {
        const dx = this.player.position.x - tx, dz = this.player.position.z - tz;
        const d = Math.hypot(dx, dz), min = tr + PLAYER.radius;
        if (d < min && d > 1e-4) { this.player.position.x += (dx / d) * (min - d); this.player.position.z += (dz / d) * (min - d); }
      });
    }
    for (const e of this.spawner.pool) if (e.alive) pushOut(e.position, e.def.radius);
  }

  // ---------------------------------------------------------------- combat
  private onShot(s: ShotResult): void {
    const def = WEAPONS[s.weapon];
    _col.set(def.color);
    _v1.subVectors(s.to, s.from).normalize();
    this.fx.muzzleFlash(s.from, _v1, _col, s.weapon === 'rifle' ? 0.42 : 0.34);
    this.fx.tracer(s.from, s.to, _col, def.tracerWidth, def.tracerSpeed);
    this.audio.shoot(s.weapon);
    this.cam.addTrauma(def.shake);
    this.cam.pitch -= def.recoil * (0.6 + Math.random() * 0.4);
    if (s.hitWorld) {
      this.particles.sparks(s.to.x, s.to.y, s.to.z, s.normal.x, s.normal.y, s.normal.z, s.weapon === 'rifle' ? 5 : 8, _col);
    }
    if (s.target instanceof Enemy) {
      const e = s.target;
      const killed = e.resolveDamage();
      this.particles.burst(s.to.x, s.to.y, s.to.z, s.head ? 10 : 6, 4, _col.set(e.def.look.neon), 0.09, 0.35, 8);
      this.hud.damageNumber(s.to, s.damage, s.head);
      this.audio.hitMarker(s.head);
      this.hud.hitMarker(killed ? 'kill' : s.head ? 'head' : 'hit');
      if (killed) this.onEnemyKilled(e, s.head, false);
    }
  }

  private onEnemyKilled(e: Enemy, head: boolean, roadkill: boolean): void {
    const pts = this.state.registerKill(e.def.score + (roadkill ? 75 : 0), head);
    this.spawner.registerKill();
    this.hud.feed(pts, e.def.label, roadkill ? 'ROADKILL' : head ? 'HEADSHOT' : this.state.multiplier > 1 ? `x${this.state.multiplier}` : '');
    if (this.state.multiplier > 1) this.audio.combo(this.state.multiplier);
    this.audio.enemyDie();
    _col.set(e.def.look.neon);
    this.particles.burst(e.position.x, 1.1, e.position.z, 30, 7, _col, 0.16, 0.8, 9, 0.5);
    this.fx.ring(e.position.x, 0.06, e.position.z, _col, 3.5, 0.5);
    // Drops
    const r = Math.random();
    let kind: PickupKind | null = null;
    if (this.player.health < 45 && r < 0.45) kind = 'health';
    else if (r < 0.14) kind = 'health';
    else if (r < 0.32) kind = 'ammo';
    else if (r < 0.42) kind = 'armor';
    else if (r < 0.47) kind = 'boost';
    else if (r < 0.75) kind = 'cash';
    if (kind) this.pickups.spawn(kind, e.position.x, e.position.z);
  }

  private onMelee(e: Enemy, dmg: number): void {
    this.audio.melee();
    this.damagePlayer(this.vehicle ? dmg * 0.5 : dmg, e.position.x, e.position.z);
  }

  private damagePlayer(dmg: number, fromX: number, fromZ: number): void {
    if (!this.player.alive || this.state.phase !== 'playing') return;
    const lost = this.player.damage(this.vehicle ? dmg * 0.6 : dmg);
    const dx = fromX - this.player.position.x, dz = fromZ - this.player.position.z;
    const yaw = this.cam.yaw;
    const fwd = dx * -Math.sin(yaw) + dz * -Math.cos(yaw);
    const right = dx * Math.cos(yaw) + dz * -Math.sin(yaw);
    this.hud.damage(lost / 40, Math.atan2(right, fwd));
    this.damagePulse = Math.min(1, this.damagePulse + lost / 30);
    this.cam.addTrauma(0.25);
    this.audio.playerHurt();
  }

  private onPickup(kind: PickupKind): void {
    switch (kind) {
      case 'health': this.player.heal(40); break;
      case 'armor': this.player.addArmor(25); break;
      case 'ammo': this.combat.weapons.rifle.addAmmo(64); break;
      case 'boost': this.state.boostTimer = 10; break;
      case 'cash': this.state.addScore(75 * this.state.multiplier); break;
    }
    this.audio.pickup(kind);
    this.hud.feed(kind === 'cash' ? 75 * this.state.multiplier : 0, PICKUP_LABEL[kind]);
    _col.set(kind === 'health' ? PALETTE.green : kind === 'ammo' ? PALETTE.cyan : kind === 'armor' ? PALETTE.blue : kind === 'boost' ? PALETTE.orange : PALETTE.pink);
    this.fx.ring(this.player.position.x, 0.06, this.player.position.z, _col, 2.5, 0.4);
  }

  // --------------------------------------------------------------- visuals
  private frameVisuals(dt: number, live: boolean): void {
    const s = this.state;
    if (s.phase === 'ended') {
      this.cam.yaw += dt * 0.35; // slow cinematic drift around the final moment
      if (this.dyingTimer > 0) {
        this.dyingTimer -= dt / 0.35;
        if (this.dyingTimer <= 0) this.endMission(s.won);
      }
    }
    this.damagePulse = Math.max(0, this.damagePulse - dt * 2);

    // Camera
    if (this.vehicle) this.cam.update(dt, this.vehicle.position, false, Math.abs(this.vehicle.forwardSpeed), this.vehicle.heading);
    else this.cam.update(dt, this.player.position, live && this.input.aimHeld && this.player.alive, Math.hypot(this.player.velocity.x, this.player.velocity.z), 0);

    if (!this.vehicle && !live) this.player.character.update(dt, { speed: 0, grounded: true, aim: 0, aimPitch: 0, kick: 0, swing: 0 });
    for (const e of this.spawner.pool) if (e.active) e.updateVisual(dt, this.camera.position);
    this.world.update(this.time);
    this.fx.update(dt);
    this.particles.update(dt);

    // Steam from alley vents.
    this.steamTimer -= dt;
    if (this.steamTimer <= 0) {
      this.steamTimer = 0.12;
      _col.setRGB(0.35, 0.28, 0.5);
      for (const v of this.world.layout.steamVents) {
        if (Math.abs(v.x - this.camera.position.x) > 60 || Math.abs(v.z - this.camera.position.z) > 60) continue;
        this.particles.emit(v.x + (Math.random() - 0.5) * 0.4, 0.1, v.z + (Math.random() - 0.5) * 0.4, (Math.random() - 0.5) * 0.3, 1.2 + Math.random(), (Math.random() - 0.5) * 0.3, _col, 0.5, 2.2, -0.2, 0.5, 2.5);
      }
    }

    // Vehicle feedback: engine audio, tyre smoke, underglow light.
    if (this.vehicle && live) {
      const v = this.vehicle;
      const slip = Math.abs(v.lateralSpeed);
      this.audio.setEngine(true, v.forwardSpeed, this.input.axis('KeyS', 'KeyW', 'ArrowDown', 'ArrowUp'), slip);
      if (slip > 3.5 && Math.random() < 0.6) {
        _col.setRGB(0.5, 0.45, 0.6);
        for (const o of [-1.45]) {
          const bx = v.position.x + Math.sin(v.heading) * o, bz = v.position.z + Math.cos(v.heading) * o;
          this.particles.emit(bx, 0.25, bz, (Math.random() - 0.5), 0.6, (Math.random() - 0.5), _col, 0.7, 1.2, -0.3, 1, 3);
        }
      }
    }

    if (s.phase === 'playing' || s.phase === 'ended') this.updateHud(dt, live);
  }

  private updateHud(dt: number, live: boolean): void {
    const s = this.state;
    const w = this.combat.weapon;
    this.hud.setScore(s.score, Math.max(this.records.bestScore, s.score));
    this.hud.setCombo(s.multiplier, Math.max(0, s.comboTimer / MISSION.comboWindow));
    this.hud.setHealth(this.player.health, PLAYER.maxHealth);
    this.hud.setArmor(this.player.armor, PLAYER.maxArmor);
    this.hud.setBoost(s.boostTimer);
    this.hud.setWeapon(w, this.vehicle !== null);
    this.hud.setEnemies(s.wavePhase === 'active' ? this.spawner.remaining : 0);
    this.hud.setSpeed(this.vehicle ? this.vehicle.speedKmh : null, this.vehicle?.name);
    const spread = (this.input.aimHeld ? w.def.aimSpread : w.def.spread) + w.bloom;
    const px = (Math.tan(spread) / Math.tan(THREE.MathUtils.degToRad(this.camera.fov / 2))) * (window.innerHeight / 2);
    this.hud.setCrosshair(!this.vehicle && this.player.alive && live, 6 + px);

    // Interaction prompt
    let prompt: string | null = null;
    if (this.player.alive && live) {
      if (this.vehicle) prompt = Math.abs(this.vehicle.forwardSpeed) > 9 ? null : '<kbd>E</kbd> EXIT VEHICLE';
      else {
        const v = this.nearestVehicle();
        if (v) prompt = `<kbd>E</kbd> DRIVE ${v.name}`;
        else if (w.mag === 0 && !w.reloading && w.reserve > 0) prompt = '<kbd>R</kbd> RELOAD';
        else if (w.empty) prompt = `${w.def.name} DRY — <kbd>1</kbd> SWITCH TO PISTOL`;
      }
    }
    this.hud.prompt(prompt);
    this.hud.update(dt, this.camera, window.innerWidth, window.innerHeight);

    this.radarTimer -= dt;
    if (this.radarTimer <= 0) {
      this.radarTimer = 1 / 20;
      const blips = this.radarBlips;
      blips.length = 0;
      for (const e of this.spawner.pool) if (e.alive) blips.push({ x: e.position.x, z: e.position.z, color: e.def.kind === 'gunner' ? '#2ef2ff' : '#ff8a3d', size: 3.2 });
      for (const v of this.vehicles) if (v !== this.vehicle) blips.push({ x: v.position.x, z: v.position.z, color: '#ff4f9a', size: 3 });
      this.pickups.forEachActive((x, z) => blips.push({ x, z, color: '#4dff9a', size: 2.2 }));
      this.hud.drawRadar(this.player.position.x, this.player.position.z, this.cam.yaw, blips);
    }
  }

  private trackPerformance(dt: number, work: number): void {
    this.fpsAccum += dt;
    this.fpsFrames++;
    if (this.fpsAccum >= 0.5) {
      this.hud.setFps(`${Math.round(this.fpsFrames / this.fpsAccum)} FPS`);
      this.fpsAccum = 0;
      this.fpsFrames = 0;
    }
    // Adaptive resolution: trade pixels for frame rate on slower GPUs.
    // Adaptive resolution: two consecutive slow windows (sub-40 FPS) step the
    // render scale down; sustained headroom steps it back up. Very long frames
    // (>125 ms) mean a throttled/background tab, not a slow GPU, and are ignored.
    this.frameAccum += dt;
    this.workAccum += work;
    this.frameCount++;
    if (this.frameAccum >= 1.5) {
      const avg = this.frameAccum / this.frameCount;
      const prev = this.resolutionScale;
      const slow = avg > 1 / 40 && avg < 0.125 && document.visibilityState === 'visible';
      this.slowWindows = slow ? this.slowWindows + 1 : 0;
      if (this.slowWindows >= 2) {
        this.resolutionScale = Math.max(0.6, this.resolutionScale * 0.88);
        this.slowWindows = 0;
      } else if (avg < 1 / 57 && this.resolutionScale < 1) {
        this.resolutionScale = Math.min(1, this.resolutionScale * 1.06);
      }
      if (prev !== this.resolutionScale) this.resize();
      this.frameAccum = 0;
      this.workAccum = 0;
      this.frameCount = 0;
    }
  }

  /** Exposed for automated smoke tests in development builds. */
  get debug() {
    return {
      state: this.state,
      player: this.player,
      combat: this.combat,
      spawner: this.spawner,
      vehicles: this.vehicles,
      cam: this.cam,
      input: this.input,
      world: this.world,
      renderer: this.renderer,
      enterNearestVehicle: () => this.toggleVehicle(),
      currentVehicle: () => this.vehicle,
      startMission: () => this.startMission(),
      pause: () => this.pause(),
      resume: () => this.resume(),
      render: () => this.post.render(this.time, this.damagePulse),
      /** Steps whole frames with synthetic timestamps (works even when rAF is throttled). */
      advance: (seconds: number, fps = 60) => {
        let t = this.lastFrame;
        for (let i = 0, n = Math.round(seconds * fps); i < n; i++) {
          t += 1000 / fps;
          this.frame(t);
        }
      },
    };
  }

  dispose(): void {
    this.disposed = true;
    cancelAnimationFrame(this.raf);
    this.cleanup.forEach((fn) => fn());
    this.input.dispose();
    this.audio.dispose();
    this.particles.dispose();
    this.post.dispose();
    this.world.environment.dispose();
    for (const e of this.spawner.pool) e.dispose();
    this.scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      mesh.geometry?.dispose();
      const m = mesh.material;
      if (Array.isArray(m)) m.forEach((x) => x.dispose());
      else m?.dispose();
    });
    this.renderer.dispose();
  }
}
