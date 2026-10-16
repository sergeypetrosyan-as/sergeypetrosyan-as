import { PHYS, SCORE, TILE } from '../game/Config';
import { Boss } from '../entities/Boss';
import { Enemy, Projectile, type EnemyKind, type ProjectileKind } from '../entities/Enemies';
import { Laser, Rotor, Spring, SweepLaser } from '../entities/Hazards';
import { Pickup, type PickupKind } from '../entities/Pickups';
import { Platform, type PlatformKind } from '../entities/Platforms';
import { Player, type Controls } from '../entities/Player';
import { Particles } from '../render/Particles';
import { Camera } from './Camera';
import { Level, T, isSolidTile, type LevelDef } from './Level';
import { overlap, type Box } from './Physics';

export type WorldEventType =
  | 'jump' | 'double-jump' | 'land' | 'volt' | 'shard' | 'token' | 'repair' | 'shield' | 'overdrive' | 'stomp' | 'hurt'
  | 'shield-break' | 'die' | 'respawn-ready' | 'checkpoint' | 'secret' | 'bump' | 'prize' | 'spring' | 'terminal' | 'goal'
  | 'complete' | 'crusher' | 'hop' | 'shot' | 'boss-intro' | 'boss-hit' | 'boss-defeat' | 'boss-shot' | 'boss-slam' | 'clang';

export interface WorldEvent {
  type: WorldEventType;
  value: number;
  text?: string;
}

const ENEMY: Record<string, EnemyKind> = { s: 'slime', d: 'drone', f: 'droneV', j: 'hopper', t: 'turret', y: 'turret', p: 'phantom', k: 'spiker' };
const PLATFORM: Record<string, PlatformKind> = { M: 'slide', V: 'lift', c: 'crumble', g: 'glitch', '1': 'timedA', '2': 'timedB', P: 'crusher' };
const PICKUP: Record<string, PickupKind> = { o: 'volt', '*': 'shard', T: 'token', '+': 'repair' };
const ELECTRIC_PERIOD = 2.4;

export interface Marker extends Box {
  active: boolean;
}

/** One attempt at one level: the whole simulation, independent of rendering, audio and DOM. */
export class World {
  readonly level: Level;
  readonly player = new Player();
  readonly camera = new Camera();
  readonly fx = new Particles();
  platforms: Platform[] = [];
  enemies: Enemy[] = [];
  lasers: Laser[] = [];
  sweeps: SweepLaser[] = [];
  rotors: Rotor[] = [];
  readonly springs: Spring[] = [];
  readonly pickups: Pickup[] = [];
  readonly projectiles: Projectile[] = Array.from({ length: 64 }, () => new Projectile());
  readonly checkpoints: Marker[] = [];
  readonly terminals: Array<Box & { text: string; read: boolean }> = [];
  readonly decor: Array<{ ch: string; x: number; y: number; n: number }> = [];
  gate: Box | null = null;
  boss: Boss | null = null;
  cameraLock: { left: number; right: number } | null = null;
  private arena: { left: number; right: number } | null = null;

  /** Level clock: drives every timed hazard. Also the speed-run timer. */
  time = 0;
  volts = 0;
  readonly voltsTotal: number;
  readonly shards = [false, false, false];
  token = false;
  secrets = 0;
  readonly revealed = new Map<number, number>();
  defeated = 0;
  score = 0;
  deaths = 0;
  shake = 0;
  doorClosed = false;
  nearTerminal = -1;
  /** Counts down after touching the gate / beating the boss, then 'complete' fires. */
  private finishing = -1;
  private dying = -1;
  private respawnAt = { x: 0, y: 0 };
  readonly events: WorldEvent[] = [];
  /** Gate / fragment position once the level is won, for the celebration. */
  finishedAt: { x: number; y: number } | null = null;

  constructor(def: LevelDef) {
    this.level = new Level(def);
    const lv = this.level;
    for (const s of lv.spawns) {
      const x = s.tx * TILE;
      const y = s.ty * TILE;
      if (PICKUP[s.ch]) this.pickups.push(new Pickup(PICKUP[s.ch], x, y, s.n));
      else if (s.ch === 'S') this.respawnAt = { x: x + (TILE - this.player.w) / 2, y: y + TILE - this.player.h };
      else if (s.ch === 'C') this.checkpoints.push({ x, y: y - 2 * TILE, w: TILE, h: 3 * TILE, active: false });
      else if (s.ch === 'G') this.gate = { x, y: y - 2 * TILE, w: TILE, h: 3 * TILE };
      else if (s.ch === 'i') this.terminals.push({ x, y, w: TILE, h: TILE, text: def.terminals[s.n] ?? '', read: false });
      else if (s.ch === 'B') this.springs.push(new Spring(s.tx, s.ty));
      else if (s.ch === 'l' || s.ch === 'n') this.decor.push({ ch: s.ch, x, y, n: s.n });
      else if (s.ch === 'K') this.setupArena(s.tx, s.ty);
    }
    this.voltsTotal = this.pickups.filter((p) => p.kind === 'volt').length + [...lv.prizes.values()].filter((p) => p === 'volt').length;
    this.spawnDynamic();
    this.player.spawn(this.respawnAt.x, this.respawnAt.y);
    this.player.invuln = 0;
  }

  private setupArena(tx: number, ty: number): void {
    const lv = this.level;
    let door = tx;
    while (door > 0 && lv.at(door, ty) !== T.Door) door--;
    let wall = tx;
    while (wall < lv.w - 1 && !isSolidTile(lv.at(wall, ty))) wall++;
    let floor = ty;
    while (floor < lv.h - 1 && !isSolidTile(lv.at(tx, floor))) floor++;
    let ceil = ty;
    while (ceil > 0 && !isSolidTile(lv.at(tx, ceil))) ceil--;
    this.arena = { left: (door + 1) * TILE, right: wall * TILE };
    this.boss = new Boss((tx + 0.5) * TILE, (ty + 0.5) * TILE, this.arena.left, this.arena.right, floor * TILE, (ceil + 1) * TILE);
  }

  /** (Re)creates everything that resets when Vee respawns. */
  private spawnDynamic(): void {
    const lv = this.level;
    this.platforms = [];
    this.enemies = [];
    this.lasers = [];
    this.sweeps = [];
    this.rotors = [];
    for (const s of lv.spawns) {
      const phase = (s.tx * 0.37) % 3;
      const pk = PLATFORM[s.ch];
      if (pk) this.platforms.push(new Platform(pk, s.tx, s.ty, pk === 'crusher' ? Math.max(2, s.w) : s.w, pk === 'slide' || pk === 'lift' ? 0 : phase));
      const ek = ENEMY[s.ch];
      if (ek) {
        const e = new Enemy(ek, s.tx, s.ty, phase);
        if (s.ch === 'y') e.face = 1;
        this.enemies.push(e);
      }
      if (s.ch === 'L') {
        const laser = new Laser(s.tx, s.ty, s.tx * 0.11);
        let ty = s.ty + 1;
        while (ty < lv.h && !isSolidTile(lv.at(s.tx, ty))) ty++;
        laser.y2 = ty >= lv.h ? lv.pxH + 40 : ty * TILE;
        this.lasers.push(laser);
      }
      if (s.ch === 'Z') this.sweeps.push(new SweepLaser(s.tx, s.ty, phase));
      if (s.ch === 'R' || s.ch === 'Q') this.rotors.push(new Rotor(s.tx, s.ty, s.ch === 'Q'));
    }
    for (const p of this.projectiles) p.active = false;
    this.boss?.reset();
    this.doorClosed = false;
    this.cameraLock = null;
  }

  // ------------------------------------------------------------------ queries

  solidTile(tx: number, ty: number): boolean {
    const t = this.level.at(tx, ty);
    if (t === T.Door) return this.doorClosed;
    return isSolidTile(t);
  }

  /** Is there something to stand on at this point? Used by walkers to turn at ledges. */
  supportAt(px: number, py: number): boolean {
    const tx = Math.floor(px / TILE);
    const ty = Math.floor(py / TILE);
    if (this.solidTile(tx, ty) || this.level.at(tx, ty) === T.OneWay) return true;
    return this.platforms.some((p) => p.solid && px >= p.x && px <= p.x + p.w && py >= p.y && py <= p.y + p.h);
  }

  /** The first solid surface below y across [x1, x2]. */
  floorBelow(x1: number, x2: number, y: number): number {
    for (let ty = Math.floor(y / TILE); ty < this.level.h; ty++) {
      for (let tx = Math.floor(x1 / TILE); tx <= Math.floor(x2 / TILE); tx++) if (this.solidTile(tx, ty)) return ty * TILE;
    }
    return this.level.pxH + 64;
  }

  overlapsPlayer(b: Box): boolean {
    return !this.player.dead && overlap(this.player, b);
  }

  electricStage(tx: number): 'off' | 'warn' | 'live' {
    const p = (((this.time - tx * 0.09) % ELECTRIC_PERIOD) + ELECTRIC_PERIOD) % ELECTRIC_PERIOD;
    return p < 1.0 ? 'off' : p < 1.55 ? 'warn' : 'live';
  }

  get finished(): boolean {
    return this.finishing >= 0;
  }

  get shardCount(): number {
    return this.shards.filter(Boolean).length;
  }

  /** 0..1 progress through the level, for the HUD. */
  get progress(): number {
    const goal = this.gate ? this.gate.x : this.arena ? this.arena.left : this.level.pxW;
    return Math.max(0, Math.min(1, this.player.cx / goal));
  }

  // ------------------------------------------------------------------ actions

  emit(type: WorldEventType, value = 0, text?: string): void {
    this.events.push({ type, value, text });
  }

  addShake(amount: number): void {
    this.shake = Math.max(this.shake, amount);
  }

  bumpTile(index: number): void {
    const lv = this.level;
    const tx = index % lv.w;
    const ty = Math.floor(index / lv.w);
    const t = lv.tiles[index];
    if (t !== T.Prize) {
      this.emit('bump');
      return;
    }
    lv.tiles[index] = T.Used;
    const prize = lv.prizes.get(index) ?? 'volt';
    const x = tx * TILE;
    const y = (ty - 1) * TILE;
    // Anything standing on the block gets knocked off.
    for (const e of this.enemies) {
      if (e.alive && e.kind !== 'spiker' && Math.abs(e.x + e.w / 2 - (x + 8)) < 14 && Math.abs(e.y + e.h - ty * TILE) < 3) this.defeatEnemy(e, false);
    }
    if (prize === 'volt') {
      this.collectVolt(x + 8, y + 4);
      this.fx.burst(x + 8, y + 8, 6, '#ffb347', 70, 0.4, 200, true);
    } else {
      const p = new Pickup(prize, x, y);
      p.emerge = 1;
      this.pickups.push(p);
      this.emit('prize');
    }
  }

  fireBolt(x: number, y: number, vx: number, vy: number, kind: ProjectileKind): void {
    const p = this.projectiles.find((q) => !q.active);
    if (!p) return;
    p.active = true;
    p.kind = kind;
    p.x = x;
    p.y = y;
    p.vx = vx;
    p.vy = vy;
    p.t = 0;
    p.w = kind === 'wave' ? 12 : kind === 'rain' ? 5 : 6;
    p.h = kind === 'wave' ? 10 : kind === 'rain' ? 12 : 6;
    p.ghost = kind !== 'bolt';
    if (kind === 'bolt') this.emit('shot', x);
  }

  crusherSlam(p: Platform): void {
    this.addShake(3);
    this.emit('crusher', p.x);
    for (let i = 0; i < 8; i++) this.fx.emit(p.x + Math.random() * p.w, p.y + p.h, (Math.random() - 0.5) * 120, -Math.random() * 80, 0.5, '#ffb347', 1, 300);
    const pl = this.player;
    // Anyone left inside gets pushed out to the nearer side.
    if (overlap(pl, p)) {
      this.hurtPlayer(p.x + p.w / 2);
      pl.x = pl.cx < p.x + p.w / 2 ? p.x - pl.w : p.x + p.w;
    }
  }

  bossSlam(b: Boss): void {
    this.addShake(5);
    this.emit('boss-slam');
    const y = b.floorY - 10;
    this.fireBolt(b.x - 12, y, -150, 0, 'wave');
    this.fireBolt(b.x + b.w, y, 150, 0, 'wave');
    this.fx.burst(b.cx, b.floorY, 24, '#7dff5c', 140, 0.7, 260, true);
  }

  summonDrones(): void {
    if (!this.arena) return;
    const alive = this.enemies.filter((e) => e.alive && e.kind === 'drone').length;
    const spots = [this.arena.left + 24, this.arena.right - 88];
    for (let i = alive; i < 2; i++) {
      const e = new Enemy('drone', Math.floor(spots[i] / TILE), 7, i * 2);
      this.enemies.push(e);
      this.fx.burst(e.x + 7, e.y + 5, 14, '#c85cff', 90, 0.5, 0, true);
    }
  }

  private collectVolt(x: number, y: number): void {
    this.volts++;
    this.score += SCORE.volt;
    this.emit('volt');
    this.fx.burst(x, y, 5, '#ffb347', 60, 0.35, 0, true);
  }

  private defeatEnemy(e: Enemy, stomped: boolean): void {
    e.defeat();
    this.defeated++;
    this.score += SCORE.enemy;
    this.fx.burst(e.x + e.w / 2, e.y + e.h / 2, 14, e.kind === 'phantom' ? '#c85cff' : e.kind === 'turret' ? '#ffb347' : '#7dff5c', 110, 0.5, 280, true);
    this.fx.text(e.x + e.w / 2, e.y - 4, `+${SCORE.enemy}`, '#f3f6ff');
    this.emit('stomp', stomped ? 1 : 0);
  }

  hurtPlayer(fromX: number): void {
    const r = this.player.hurt(fromX);
    if (r === 'none') return;
    if (r === 'shield') {
      this.emit('shield-break');
      this.fx.burst(this.player.cx, this.player.y + 7, 18, '#32f6ff', 120, 0.5, 0, true);
      this.addShake(2);
    } else if (r === 'hurt') {
      this.emit('hurt');
      this.addShake(3);
      this.fx.burst(this.player.cx, this.player.y + 7, 10, '#ff3355', 100, 0.4, 200);
    } else this.killPlayer();
  }

  killPlayer(): void {
    if (this.player.dead || this.finished) return;
    this.player.dead = true;
    this.player.hp = 0;
    this.deaths++;
    this.dying = 1.25;
    this.addShake(4);
    const { cx, y } = this.player;
    const yy = Math.min(y + 7, this.camera.y + this.camera.h - 8);
    this.fx.burst(cx, yy, 30, '#32f6ff', 150, 0.9, 120, true);
    this.fx.burst(cx, yy, 16, '#ff3bd4', 110, 0.8, 120, true);
    this.emit('die');
  }

  /** Called by the game after a death when a life remains. */
  respawn(): void {
    this.spawnDynamic();
    this.player.spawn(this.respawnAt.x, this.respawnAt.y);
    this.dying = -1;
    this.camera.snap(this);
    this.fx.burst(this.player.cx, this.player.y + 7, 20, '#32f6ff', 90, 0.6, 0, true);
  }

  // ------------------------------------------------------------------ update

  update(dt: number, c: Controls): void {
    const p = this.player;
    if (!this.finished && !p.dead) this.time += dt;
    this.shake = Math.max(0, this.shake - dt * 12);

    for (const pl of this.platforms) pl.update(dt, this);
    const prevBottom = p.y + p.h;
    p.update(dt, c, this);

    for (const e of this.enemies) e.update(dt, this);
    if (this.enemies.length > 40) this.enemies = this.enemies.filter((e) => e.alive || e.deadTime < 1);
    for (const s of this.sweeps) s.update(dt);
    for (const r of this.rotors) r.update(dt);
    for (const l of this.lasers) l.t += dt;
    for (const s of this.springs) s.squash = Math.max(0, s.squash - dt * 4);
    this.updateProjectiles(dt);
    this.updatePickups(dt);
    this.boss?.update(dt, this);

    if (!p.dead && !this.finished) this.interact(c, prevBottom);

    if (this.dying >= 0) {
      this.dying -= dt;
      if (this.dying < 0) this.emit('respawn-ready');
    }
    if (this.finishing >= 0) {
      this.finishing -= dt;
      if (this.finishing < 0) this.emit('complete');
    }
    this.fx.update(dt);
    if (!p.dead) this.camera.update(dt, this);
  }

  private interact(c: Controls, prevBottom: number): void {
    const p = this.player;
    const lv = this.level;

    // Falling out of the world.
    if (p.y > lv.pxH + 24) {
      this.killPlayer();
      return;
    }

    // Floors that bite.
    if (p.onGround && !p.ground) {
      const tx = Math.floor(p.cx / TILE);
      if (p.groundTile === T.Electric && this.electricStage(tx) === 'live') this.hurtPlayer(p.cx + (Math.random() - 0.5));
      if (p.groundTile === T.Spike) {
        this.hurtPlayer(p.cx);
        p.bounce(260, false);
      }
    }

    // Enemies: stomp from above, otherwise they hurt.
    for (const e of this.enemies) {
      if (!e.alive || !overlap(p, e) || !e.solidNow) continue;
      const fromAbove = p.vy > 0 && prevBottom <= e.y + 5;
      if (fromAbove && e.stompable) {
        this.defeatEnemy(e, true);
        p.bounce(PHYS.stompV, c.jump);
      } else if (fromAbove && e.kind === 'spiker') {
        this.hurtPlayer(e.x + e.w / 2);
        p.bounce(280, false);
      } else this.hurtPlayer(e.x + e.w / 2);
      if (p.dead) return;
    }

    for (const l of this.lasers) if (l.hits(p)) this.hurtPlayer(l.x);
    for (const s of this.sweeps) if (s.hits(p)) this.hurtPlayer(s.x);
    for (const r of this.rotors) if (r.hits(p)) this.hurtPlayer(r.cx);
    for (const pl of this.platforms) {
      if (pl.crushing && overlap(p, { x: pl.x, y: pl.y, w: pl.w, h: pl.h + 2 }) && p.y > pl.y) this.hurtPlayer(pl.x + pl.w / 2);
    }
    if (p.dead) return;

    // Springs.
    for (const s of this.springs) {
      if (p.vy >= 0 && overlap(p, s) && prevBottom <= s.y + s.h) {
        p.y = s.y - p.h;
        p.bounce(PHYS.springV, false, PHYS.springV, true);
        s.squash = 1;
        this.emit('spring');
        this.fx.burst(s.x + 7, s.y, 8, '#32f6ff', 70, 0.35, 0, true);
      }
    }

    // Checkpoints.
    for (const cp of this.checkpoints) {
      if (!cp.active && p.cx >= cp.x && Math.abs(p.bottom - (cp.y + cp.h)) < 80) {
        for (const other of this.checkpoints) if (other.x <= cp.x) other.active = true;
        this.respawnAt = { x: cp.x + (TILE - p.w) / 2, y: cp.y + cp.h - p.h };
        this.emit('checkpoint');
        this.fx.burst(cp.x + 8, cp.y + 6, 24, '#7dff5c', 110, 0.8, 60, true);
        this.fx.text(cp.x + 8, cp.y - 6, 'CHECKPOINT', '#7dff5c');
      }
    }

    // Terminals.
    this.nearTerminal = this.terminals.findIndex((t) => overlap(p, { x: t.x - 6, y: t.y - 8, w: t.w + 12, h: t.h + 8 }));
    if (this.nearTerminal >= 0 && c.interactPressed) {
      const t = this.terminals[this.nearTerminal];
      t.read = true;
      this.emit('terminal', this.nearTerminal, t.text);
    }

    // Secret walls reveal when you step inside.
    const x0 = Math.floor(p.x / TILE);
    const x1 = Math.floor((p.x + p.w - 0.01) / TILE);
    const y0 = Math.floor(p.y / TILE);
    const y1 = Math.floor((p.y + p.h - 0.01) / TILE);
    for (let ty = y0; ty <= y1; ty++) {
      for (let tx = x0; tx <= x1; tx++) {
        const g = lv.fakeGroup.get(ty * lv.w + tx);
        if (g !== undefined && !this.revealed.has(g)) {
          this.revealed.set(g, this.time);
          this.secrets++;
          this.score += SCORE.secret;
          this.emit('secret');
          this.fx.text(p.cx, p.y - 8, 'SECRET!', '#7dff5c');
        }
      }
    }

    // The exit gate.
    if (this.gate && overlap(p, this.gate)) {
      this.finish(this.gate.x + 8, this.gate.y + 16);
      this.emit('goal');
    }

    // The boss arena.
    const b = this.boss;
    if (b && this.arena) {
      if (b.state === 'wait' && p.x > this.arena.left + 36) {
        this.doorClosed = true;
        this.cameraLock = this.arena;
        b.start();
        this.emit('boss-intro');
        this.addShake(3);
      }
      if (b.state === 'dead' && !this.finished) this.finish(b.cx, b.y + b.h / 2);
      const body = { x: b.x + 3, y: b.y + 2, w: b.w - 6, h: b.h - 2 };
      if (overlap(p, body)) {
        const fromAbove = p.vy > 0 && prevBottom <= b.y + 9;
        if (fromAbove && b.vulnerable) {
          b.hit();
          p.bounce(380, c.jump, 470);
          this.addShake(4);
          this.fx.burst(b.cx, b.y + 4, 26, '#ff3bd4', 150, 0.7, 120, true);
          this.emit(b.hp <= 0 ? 'boss-defeat' : 'boss-hit', b.hp);
          if (b.hp <= 0) {
            this.score += 5000;
            for (const e of this.enemies) if (e.alive) this.defeatEnemy(e, false);
          }
        } else if (fromAbove && b.dangerous) {
          p.bounce(300, false);
          this.emit('clang');
        } else if (b.dangerous) this.hurtPlayer(b.cx);
      }
    }
  }

  private finish(x: number, y: number): void {
    if (this.finished) return;
    this.finishing = 1.9;
    this.player.won = true;
    this.finishedAt = { x, y };
    for (let i = 0; i < 3; i++) this.fx.burst(x, y, 30, ['#32f6ff', '#ff3bd4', '#ffb347'][i], 160, 1.1, 90, true);
  }

  private updateProjectiles(dt: number): void {
    const p = this.player;
    for (const q of this.projectiles) {
      if (!q.active) continue;
      q.t += dt;
      q.x += q.vx * dt;
      q.y += q.vy * dt;
      const tx = Math.floor((q.x + q.w / 2) / TILE);
      const ty = Math.floor((q.y + q.h / 2) / TILE);
      const blocked = q.kind === 'wave' ? this.solidTile(Math.floor((q.vx > 0 ? q.x + q.w : q.x) / TILE), ty) : this.solidTile(tx, ty);
      if (blocked || q.t > 8 || q.y > this.level.pxH + 20) {
        q.active = false;
        if (blocked) this.fx.burst(q.x + q.w / 2, q.y + q.h / 2, 5, q.kind === 'bolt' ? '#ffb347' : '#7dff5c', 60, 0.3, 0, true);
        continue;
      }
      if (!p.dead && !this.finished && overlap(p, q)) {
        q.active = false;
        this.hurtPlayer(q.x);
      }
    }
  }

  private updatePickups(dt: number): void {
    const p = this.player;
    for (const k of this.pickups) {
      if (k.taken) continue;
      k.t += dt;
      if (k.emerge > 0) {
        k.emerge = Math.max(0, k.emerge - dt * 2.5);
        continue;
      }
      if (p.dead || p.won) continue;
      // Volts drift toward Vee when close.
      if (k.kind === 'volt') {
        const dx = p.cx - k.cx;
        const dy = p.y + 7 - k.cy;
        const d = Math.hypot(dx, dy);
        if (d < 26 && d > 0.1) {
          k.x += (dx / d) * 160 * dt;
          k.y += (dy / d) * 160 * dt;
        }
      }
      if (!overlap(p, k)) continue;
      k.taken = true;
      switch (k.kind) {
        case 'volt':
          this.collectVolt(k.cx, k.cy);
          break;
        case 'shard':
          this.shards[k.index] = true;
          this.score += SCORE.shard;
          this.emit('shard', k.index);
          this.fx.burst(k.cx, k.cy, 22, '#ff3bd4', 120, 0.8, 0, true);
          this.fx.text(k.cx, k.y - 6, `SHARD ${this.shardCount}/3`, '#ff3bd4');
          break;
        case 'token':
          this.token = true;
          this.score += SCORE.token;
          this.emit('token');
          this.fx.burst(k.cx, k.cy, 22, '#7dff5c', 120, 0.8, 0, true);
          this.fx.text(k.cx, k.y - 6, 'ARCADE TOKEN', '#7dff5c');
          break;
        case 'repair':
          if (p.hp < 3) p.hp++;
          else this.score += 200;
          this.emit('repair');
          this.fx.burst(k.cx, k.cy, 14, '#7dff5c', 90, 0.5, 0, true);
          break;
        case 'shield':
          p.shield = PHYS.shieldTime;
          this.emit('shield');
          this.fx.burst(k.cx, k.cy, 18, '#32f6ff', 110, 0.6, 0, true);
          this.fx.text(k.cx, k.y - 6, 'PULSE SHIELD', '#32f6ff');
          break;
        case 'overdrive':
          p.overdrive = PHYS.overdriveTime;
          this.emit('overdrive');
          this.fx.burst(k.cx, k.cy, 18, '#ffe066', 110, 0.6, 0, true);
          this.fx.text(k.cx, k.y - 6, 'OVERDRIVE', '#ffe066');
          break;
      }
    }
  }
}
