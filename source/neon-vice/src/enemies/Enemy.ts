import * as THREE from 'three';
import { Humanoid, type HumanoidLook } from '../characters/Humanoid';
import { PALETTE } from '../game/GameConfig';
import type { ShotTarget } from '../player/PlayerCombat';

export type EnemyKind = 'enforcer' | 'gunner';

export interface EnemyDef {
  kind: EnemyKind;
  label: string;
  health: number;
  speed: number;
  /** Preferred distance band to the player. */
  minRange: number;
  maxRange: number;
  attackRange: number;
  damage: number;
  /** Seconds between attacks. */
  cooldown: number;
  score: number;
  radius: number;
  height: number;
  look: HumanoidLook;
}

export const ENEMY_DEFS: Record<EnemyKind, EnemyDef> = {
  enforcer: {
    kind: 'enforcer',
    label: 'STREET ENFORCER',
    health: 95,
    speed: 5.3,
    minRange: 0,
    maxRange: 1.4,
    attackRange: 2.1,
    damage: 14,
    cooldown: 1.1,
    score: 100,
    radius: 0.5,
    height: 1.95,
    look: { skin: 0x8a5a44, jacket: 0x3a0f14, shirt: 0xd8323e, pants: 0x14141c, shoes: 0x0c0c0c, hair: 0x0c0806, neon: PALETTE.orange, bulk: 1.28, height: 1.08, visor: true, weapon: 'knuckles' },
  },
  gunner: {
    kind: 'gunner',
    label: 'NEON GUNNER',
    health: 60,
    speed: 4.1,
    minRange: 11,
    maxRange: 22,
    attackRange: 34,
    damage: 9,
    cooldown: 1.6,
    score: 150,
    radius: 0.42,
    height: 1.8,
    look: { skin: 0xd0a080, jacket: 0x2a1650, shirt: 0x14102a, pants: 0x1c1830, shoes: 0x2a2a3a, hair: 0xd8d8f0, neon: PALETTE.cyan, bulk: 0.92, height: 1, visor: true, weapon: 'rifle' },
  },
};

const _v = new THREE.Vector3();

/**
 * One hostile: rig + gameplay state. Movement decisions live in EnemyAI;
 * this class owns health, hit boxes and presentation.
 */
export class Enemy implements ShotTarget {
  readonly character: Humanoid;
  readonly position = new THREE.Vector3();
  readonly velocity = new THREE.Vector3();
  facing = 0;
  health = 0;
  maxHealth = 0;
  alive = false;
  active = false;
  attackTimer = 0;
  swing = 0;
  /** Seconds since spawn; enemies hold fire briefly after dropping in. */
  age = 0;
  stagger = 0;
  strafeDir = 1;
  strafeTimer = 0;
  seesPlayer = false;
  losTimer = 0;
  aimTimer = 0;
  kick = 0;
  /** Set when the last hit was a headshot / killed by vehicle — for scoring. */
  lastHitHead = false;
  pendingDamage = 0;
  pendingHead = false;
  knockX = 0;
  knockZ = 0;
  dmgScale = 1;
  speedScale = 1;
  readonly def: EnemyDef;
  private readonly healthBar: THREE.Sprite;
  private readonly barCanvas: HTMLCanvasElement;
  private readonly barTex: THREE.CanvasTexture;
  private barShown = 0;

  constructor(kind: EnemyKind) {
    this.def = ENEMY_DEFS[kind];
    this.character = new Humanoid(this.def.look);
    this.barCanvas = document.createElement('canvas');
    this.barCanvas.width = 64;
    this.barCanvas.height = 8;
    this.barTex = new THREE.CanvasTexture(this.barCanvas);
    this.healthBar = new THREE.Sprite(new THREE.SpriteMaterial({ map: this.barTex, depthTest: true, depthWrite: false, toneMapped: false, transparent: true }));
    this.healthBar.scale.set(0.9, 0.11, 1);
    this.healthBar.position.y = this.def.height + 0.35;
    this.healthBar.visible = false;
    this.character.root.add(this.healthBar);
    this.healthBar.scale.divideScalar(this.character.root.scale.x);
    this.healthBar.position.y /= this.character.root.scale.x;
    this.character.root.visible = false;
  }

  spawn(x: number, z: number, healthScale: number, dmgScale: number, speedScale: number): void {
    this.position.set(x, 0, z);
    this.velocity.set(0, 0, 0);
    this.maxHealth = this.health = Math.round(this.def.health * healthScale);
    this.dmgScale = dmgScale;
    this.speedScale = speedScale;
    this.alive = true;
    this.active = true;
    this.age = 0;
    this.attackTimer = 0.8 + Math.random() * 1.2;
    this.swing = 0;
    this.stagger = 0;
    this.seesPlayer = false;
    this.losTimer = Math.random() * 0.3;
    this.strafeDir = Math.random() < 0.5 ? -1 : 1;
    this.strafeTimer = 1 + Math.random() * 2;
    this.pendingDamage = 0;
    this.barShown = 0;
    this.healthBar.visible = false;
    this.character.reset();
    this.character.root.visible = true;
    this.character.root.position.copy(this.position);
  }

  /** Ray vs head sphere and body box, in world space. */
  rayHit(ox: number, oy: number, oz: number, dx: number, dy: number, dz: number, maxDist: number, out: { head: boolean }): number {
    if (!this.alive) return -1;
    const s = this.character.root.scale.x / 0.88;
    const headY = this.position.y + 1.69 * s;
    const headR = 0.24 * s;
    // Head sphere
    let best = -1;
    const hx = ox - this.position.x, hy = oy - headY, hz = oz - this.position.z;
    const b = hx * dx + hy * dy + hz * dz;
    const c = hx * hx + hy * hy + hz * hz - headR * headR;
    const disc = b * b - c;
    if (disc >= 0) {
      const t = -b - Math.sqrt(disc);
      if (t > 0 && t < maxDist) { best = t; out.head = true; }
    }
    // Body box (axis aligned; characters are roughly cylindrical)
    const r = this.def.radius * 0.85;
    const minX = this.position.x - r, maxX = this.position.x + r;
    const minZ = this.position.z - r, maxZ = this.position.z + r;
    const minY = this.position.y, maxY = headY - headR * 0.8;
    let tmin = 0, tmax = best >= 0 ? best : maxDist;
    for (const [o, d, lo, hi] of [[ox, dx, minX, maxX], [oy, dy, minY, maxY], [oz, dz, minZ, maxZ]] as const) {
      if (Math.abs(d) < 1e-9) {
        if (o < lo || o > hi) return best;
      } else {
        let t1 = (lo - o) / d, t2 = (hi - o) / d;
        if (t1 > t2) { const tt = t1; t1 = t2; t2 = tt; }
        tmin = Math.max(tmin, t1);
        tmax = Math.min(tmax, t2);
        if (tmin > tmax) return best;
      }
    }
    if (tmin > 0 && (best < 0 || tmin < best)) { out.head = false; return tmin; }
    return best;
  }

  applyHit(damage: number, head: boolean, dirX: number, dirZ: number): void {
    if (!this.alive) return;
    this.pendingDamage += damage;
    this.pendingHead = this.pendingHead || head;
    this.knockX += dirX;
    this.knockZ += dirZ;
  }

  /** Consumes queued damage; returns true when this hit killed the enemy. */
  resolveDamage(): boolean {
    if (!this.pendingDamage || !this.alive) return false;
    this.health -= this.pendingDamage;
    this.lastHitHead = this.pendingHead;
    this.pendingDamage = 0;
    this.pendingHead = false;
    this.character.hitFlash();
    this.stagger = 0.18;
    this.velocity.x += this.knockX * 1.6;
    this.velocity.z += this.knockZ * 1.6;
    this.knockX = this.knockZ = 0;
    this.barShown = 3;
    this.drawBar();
    if (this.health <= 0) {
      this.kill();
      return true;
    }
    // Being shot always reveals the shooter.
    this.seesPlayer = true;
    return false;
  }

  kill(): void {
    this.alive = false;
    this.health = 0;
    this.healthBar.visible = false;
    this.character.startDeath();
  }

  private drawBar(): void {
    const g = this.barCanvas.getContext('2d')!;
    const pct = Math.max(0, this.health / this.maxHealth);
    g.clearRect(0, 0, 64, 8);
    g.fillStyle = 'rgba(10,6,20,0.85)';
    g.fillRect(0, 0, 64, 8);
    g.fillStyle = this.def.kind === 'gunner' ? '#2ef2ff' : '#ff8a3d';
    g.fillRect(1, 1, Math.round(62 * pct), 6);
    this.barTex.needsUpdate = true;
  }

  /** Presentation update; returns true when the corpse should be recycled. */
  updateVisual(dt: number, cameraPos: THREE.Vector3): boolean {
    this.kick = Math.max(0, this.kick - dt * 6);
    if (this.swing > 0) this.swing = Math.min(1, this.swing + dt * 2.6);
    if (this.swing >= 1) this.swing = 0;
    const hspeed = Math.hypot(this.velocity.x, this.velocity.z);
    this.character.update(dt, {
      speed: hspeed,
      grounded: true,
      aim: this.def.kind === 'gunner' && this.seesPlayer ? 1 : 0,
      aimPitch: 0,
      kick: this.kick,
      swing: this.swing,
    });
    const root = this.character.root;
    if (this.alive) root.position.copy(this.position);
    else root.position.x = this.position.x, root.position.z = this.position.z;
    root.rotation.y = this.facing;
    this.barShown = Math.max(0, this.barShown - dt);
    this.healthBar.visible = this.alive && this.barShown > 0 && _v.copy(this.position).distanceTo(cameraPos) < 45;
    if (!this.alive && this.character.deathTime > 2.6) {
      this.active = false;
      root.visible = false;
      return true;
    }
    return false;
  }

  dispose(): void {
    this.character.dispose();
    this.barTex.dispose();
    (this.healthBar.material as THREE.Material).dispose();
  }
}
