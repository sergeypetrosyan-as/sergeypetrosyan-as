import { PALETTE } from '../game/GameConfig';

export type WeaponId = 'pistol' | 'rifle';

export interface WeaponDef {
  id: WeaponId;
  name: string;
  damage: number;
  headMultiplier: number;
  /** Seconds between shots. */
  interval: number;
  automatic: boolean;
  magSize: number;
  /** Max reserve rounds; Infinity for the sidearm. */
  reserveMax: number;
  reloadTime: number;
  /** Cone half-angle (radians) hip-fire / aimed. */
  spread: number;
  aimSpread: number;
  bloomPerShot: number;
  bloomMax: number;
  range: number;
  color: number;
  tracerWidth: number;
  /** 0 = instant beam, otherwise a visible bolt travelling at this speed. */
  tracerSpeed: number;
  recoil: number;
  shake: number;
}

export const WEAPONS: Record<WeaponId, WeaponDef> = {
  pistol: {
    id: 'pistol',
    name: 'NEON PISTOL',
    damage: 34,
    headMultiplier: 2.4,
    interval: 0.2,
    automatic: false,
    magSize: 12,
    reserveMax: Infinity,
    reloadTime: 1.05,
    spread: 0.012,
    aimSpread: 0.002,
    bloomPerShot: 0.01,
    bloomMax: 0.03,
    range: 140,
    color: PALETTE.magenta,
    tracerWidth: 0.05,
    tracerSpeed: 0,
    recoil: 0.025,
    shake: 0.12,
  },
  rifle: {
    id: 'rifle',
    name: 'PULSE RIFLE',
    damage: 17,
    headMultiplier: 1.9,
    interval: 0.085,
    automatic: true,
    magSize: 32,
    reserveMax: 160,
    reloadTime: 1.6,
    spread: 0.026,
    aimSpread: 0.008,
    bloomPerShot: 0.006,
    bloomMax: 0.05,
    range: 120,
    color: PALETTE.cyan,
    tracerWidth: 0.09,
    tracerSpeed: 240,
    recoil: 0.012,
    shake: 0.07,
  },
};

/** Runtime ammo / cooldown / reload state for one weapon. */
export class WeaponState {
  mag: number;
  reserve: number;
  cooldown = 0;
  reloadLeft = 0;
  bloom = 0;

  constructor(readonly def: WeaponDef) {
    this.mag = def.magSize;
    this.reserve = def.reserveMax === Infinity ? Infinity : 64;
  }

  get reloading(): boolean {
    return this.reloadLeft > 0;
  }

  get empty(): boolean {
    return this.mag === 0 && this.reserve === 0;
  }

  canFire(): boolean {
    return this.cooldown <= 0 && !this.reloading && this.mag > 0;
  }

  fire(): void {
    this.mag--;
    this.cooldown = this.def.interval;
    this.bloom = Math.min(this.def.bloomMax, this.bloom + this.def.bloomPerShot);
  }

  canReload(): boolean {
    return !this.reloading && this.mag < this.def.magSize && this.reserve > 0;
  }

  startReload(): boolean {
    if (!this.canReload()) return false;
    this.reloadLeft = this.def.reloadTime;
    return true;
  }

  cancelReload(): void {
    this.reloadLeft = 0;
  }

  /** Returns true on the frame a reload completes. */
  update(dt: number): boolean {
    this.cooldown = Math.max(0, this.cooldown - dt);
    this.bloom = Math.max(0, this.bloom - dt * 0.12);
    if (this.reloadLeft > 0) {
      this.reloadLeft -= dt;
      if (this.reloadLeft <= 0) {
        this.reloadLeft = 0;
        const need = this.def.magSize - this.mag;
        const take = Math.min(need, this.reserve);
        this.mag += take;
        if (this.reserve !== Infinity) this.reserve -= take;
        return true;
      }
    }
    return false;
  }

  addAmmo(rounds: number): void {
    if (this.reserve === Infinity) return;
    this.reserve = Math.min(this.def.reserveMax, this.reserve + rounds);
  }

  reset(): void {
    this.mag = this.def.magSize;
    this.reserve = this.def.reserveMax === Infinity ? Infinity : 64;
    this.cooldown = 0;
    this.reloadLeft = 0;
    this.bloom = 0;
  }
}
