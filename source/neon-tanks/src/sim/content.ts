import type { AbilityId, DifficultyId, HullId, ModeId, WeaponId } from './types.ts';

/** Original equipment for NEON TANKS: OVERDRIVE. All numbers are SI-ish (metres, seconds, radians). */

export interface HullDef {
  id: HullId;
  name: string;
  role: string;
  blurb: string;
  maxSpeed: number;
  reverseFactor: number;
  accel: number;
  brake: number;
  turnRate: number;
  health: number;
  armor: number;
  /** Collision circle radius. */
  radius: number;
  length: number;
  width: number;
  /** Height of the turret ring above the tank's ground point. */
  turretHeight: number;
  mass: number;
  ability: AbilityId;
  unlockLevel: number;
  cost: number;
}

export const HULLS: Record<HullId, HullDef> = {
  hornet: {
    id: 'hornet', name: 'HORNET', role: 'LIGHT RAIDER',
    blurb: 'Low, quick and twitchy. Flanks fast, folds under focused fire.',
    maxSpeed: 17, reverseFactor: 0.62, accel: 24, brake: 34, turnRate: 2.35,
    health: 195, armor: 12, radius: 1.75, length: 4.3, width: 3.0, turretHeight: 1.45, mass: 1,
    ability: 'dash', unlockLevel: 1, cost: 0,
  },
  vanguard: {
    id: 'vanguard', name: 'VANGUARD', role: 'MAIN BATTLE',
    blurb: 'The all-rounder. Balanced speed and plating with a tactical shield.',
    maxSpeed: 13.5, reverseFactor: 0.58, accel: 17, brake: 28, turnRate: 1.85,
    health: 275, armor: 25, radius: 2.0, length: 4.9, width: 3.4, turretHeight: 1.7, mass: 1.45,
    ability: 'aegis', unlockLevel: 1, cost: 0,
  },
  bastion: {
    id: 'bastion', name: 'BASTION', role: 'SIEGE HEAVY',
    blurb: 'A rolling fortress. Slow to turn, brutal up close with its shockwave.',
    maxSpeed: 10.5, reverseFactor: 0.55, accel: 11.5, brake: 22, turnRate: 1.38,
    health: 370, armor: 45, radius: 2.3, length: 5.5, width: 3.9, turretHeight: 1.95, mass: 2.1,
    ability: 'shockwave', unlockLevel: 3, cost: 1200,
  },
};

export interface AbilityDef {
  id: AbilityId;
  name: string;
  blurb: string;
  /** Seconds to charge from empty with no combat bonus. */
  chargeTime: number;
  duration: number;
}

export const ABILITIES: Record<AbilityId, AbilityDef> = {
  dash: { id: 'dash', name: 'PHASE DASH', blurb: 'A burst of thrust that halves incoming damage while it lasts.', chargeTime: 13, duration: 0.7 },
  aegis: { id: 'aegis', name: 'AEGIS SHIELD', blurb: 'A hard-light dome that blocks 60% of damage for 5 seconds.', chargeTime: 20, duration: 5 },
  shockwave: { id: 'shockwave', name: 'SHOCKWAVE', blurb: 'A ground slam: heavy damage and knockback within 12 m, jams turrets.', chargeTime: 22, duration: 0.4 },
};

export type ProjectileKind = 'plasma' | 'rail' | 'volt' | 'nova';

export interface WeaponDef {
  id: WeaponId;
  name: string;
  role: string;
  blurb: string;
  damage: number;
  speed: number;
  /** Seconds between shots. */
  cooldown: number;
  /** Rounds per magazine; 0 = no magazine. */
  magazine: number;
  reloadTime: number;
  /** Heat model (VOLT): heat added per shot, cooling per second, lockout when overheated. */
  heatPerShot: number;
  coolRate: number;
  overheatLock: number;
  /** Hold-to-fire charge before the shot leaves (RAIL). */
  charge: number;
  splashRadius: number;
  splashDamage: number;
  gravity: number;
  lifetime: number;
  spread: number;
  /** Fraction of target armor ignored. */
  pierce: number;
  knockback: number;
  /** Seconds a hit slows the target (VOLT jolt). */
  jolt: number;
  turretSpeed: number;
  pitchMin: number;
  pitchMax: number;
  recoil: number;
  /** Turret ring height offset of the barrel and its length. */
  barrelLength: number;
  projectile: ProjectileKind;
  color: number;
  unlockLevel: number;
  cost: number;
  /** Bot preferred engagement range. */
  preferredRange: number;
}

export const WEAPONS: Record<WeaponId, WeaponDef> = {
  plasma: {
    id: 'plasma', name: 'PLASMA CANNON', role: 'BALANCED',
    blurb: 'Eight-round magazine of hot plasma slugs with a small splash. Reliable at any range.',
    damage: 26, speed: 92, cooldown: 0.55, magazine: 8, reloadTime: 2.2,
    heatPerShot: 0, coolRate: 0, overheatLock: 0, charge: 0,
    splashRadius: 2.4, splashDamage: 9, gravity: 0, lifetime: 1.7, spread: 0.006, pierce: 0, knockback: 0.6, jolt: 0,
    turretSpeed: 2.2, pitchMin: -0.16, pitchMax: 0.36, recoil: 0.28, barrelLength: 2.6,
    projectile: 'plasma', color: 0x38e8ff, unlockLevel: 1, cost: 0, preferredRange: 30,
  },
  rail: {
    id: 'rail', name: 'RAIL DRIVER', role: 'SNIPER',
    blurb: 'Charges for a beat, then drives a slug through 50% of armor. Long cooldown — make it count.',
    damage: 80, speed: 560, cooldown: 2.5, magazine: 0, reloadTime: 0,
    heatPerShot: 0, coolRate: 0, overheatLock: 0, charge: 0.38,
    splashRadius: 0, splashDamage: 0, gravity: 0, lifetime: 0.5, spread: 0, pierce: 0.5, knockback: 3.2, jolt: 0,
    turretSpeed: 1.55, pitchMin: -0.14, pitchMax: 0.32, recoil: 0.6, barrelLength: 3.4,
    projectile: 'rail', color: 0xb8f4ff, unlockLevel: 4, cost: 1500, preferredRange: 48,
  },
  volt: {
    id: 'volt', name: 'VOLT EMITTER', role: 'BRAWLER',
    blurb: 'A short-range arc stream. Each hit jolts the target. Watch the heat — R vents early.',
    damage: 6, speed: 125, cooldown: 0.085, magazine: 0, reloadTime: 1.1,
    heatPerShot: 0.045, coolRate: 0.42, overheatLock: 1.8, charge: 0,
    splashRadius: 0, splashDamage: 0, gravity: 0, lifetime: 0.42, spread: 0.028, pierce: 0, knockback: 0, jolt: 0.6,
    turretSpeed: 2.9, pitchMin: -0.2, pitchMax: 0.38, recoil: 0.05, barrelLength: 2.1,
    projectile: 'volt', color: 0x7f9dff, unlockLevel: 2, cost: 800, preferredRange: 17,
  },
  nova: {
    id: 'nova', name: 'NOVA ROCKETS', role: 'ARTILLERY',
    blurb: 'Four-rocket rack. Arcing shots with a 6 m blast that pushes tanks around. Lob over cover.',
    damage: 22, speed: 50, cooldown: 0.24, magazine: 4, reloadTime: 3.3,
    heatPerShot: 0, coolRate: 0, overheatLock: 0, charge: 0,
    splashRadius: 6, splashDamage: 24, gravity: 9, lifetime: 3.2, spread: 0.012, pierce: 0, knockback: 7.5, jolt: 0,
    turretSpeed: 1.9, pitchMin: -0.12, pitchMax: 0.5, recoil: 0.32, barrelLength: 1.9,
    projectile: 'nova', color: 0xff8a3d, unlockLevel: 6, cost: 2200, preferredRange: 30,
  },
};

export interface PaintDef {
  id: string;
  name: string;
  body: number;
  accent: number;
  metal: number;
  unlockLevel: number;
  cost: number;
}

export const PAINTS: PaintDef[] = [
  { id: 'graphite', name: 'GRAPHITE / CYAN', body: 0x2b3240, accent: 0x2ef2ff, metal: 0.65, unlockLevel: 1, cost: 0 },
  { id: 'arctic', name: 'ARCTIC SHELL', body: 0xc9d4e2, accent: 0x6fd7ff, metal: 0.45, unlockLevel: 1, cost: 250 },
  { id: 'ultraviolet', name: 'ULTRAVIOLET', body: 0x2c1f4a, accent: 0xa66bff, metal: 0.6, unlockLevel: 2, cost: 400 },
  { id: 'ember', name: 'EMBER CORE', body: 0x3a1c19, accent: 0xff7a2f, metal: 0.55, unlockLevel: 3, cost: 600 },
  { id: 'chrome', name: 'CHROME TIDE', body: 0x8b96a8, accent: 0x34ffd2, metal: 0.95, unlockLevel: 5, cost: 900 },
  { id: 'midnight', name: 'MIDNIGHT GOLD', body: 0x13161f, accent: 0xffc23d, metal: 0.8, unlockLevel: 7, cost: 1400 },
];

export type UpgradeStat = 'damage' | 'armor' | 'speed' | 'reload';

export interface UpgradeDef {
  id: UpgradeStat;
  name: string;
  perLevel: string;
}

export const UPGRADES: UpgradeDef[] = [
  { id: 'damage', name: 'DAMAGE CORE', perLevel: '+6% weapon damage' },
  { id: 'armor', name: 'COMPOSITE PLATING', perLevel: '+7 armor' },
  { id: 'speed', name: 'DRIVE COILS', perLevel: '+4% top speed' },
  { id: 'reload', name: 'LOADER SERVO', perLevel: '-6% cooldown & reload' },
];

export const UPGRADE_MAX = 5;
export const UPGRADE_COSTS = [150, 300, 500, 800, 1200];

export interface Loadout {
  hull: HullId;
  weapon: WeaponId;
  paint: string;
  upgrades: Record<UpgradeStat, number>;
}

export interface DifficultyDef {
  id: DifficultyId;
  name: string;
  /** Seconds between first sighting and opening fire. */
  reaction: number;
  /** Aim error (radians) at 30 m against a moving target. */
  aimError: number;
  /** 0 = aims at current position, 1 = perfect lead. */
  lead: number;
  turretMult: number;
  /** Max turret misalignment (radians) before the bot pulls the trigger. */
  fireAlign: number;
  retreatHealth: number;
  viewRange: number;
  strafe: number;
  think: number;
  /** Uses abilities and pickups smartly. */
  tactics: number;
}

export const DIFFICULTIES: Record<DifficultyId, DifficultyDef> = {
  rookie: { id: 'rookie', name: 'ROOKIE', reaction: 0.95, aimError: 0.12, lead: 0.25, turretMult: 0.7, fireAlign: 0.07, retreatHealth: 0.2, viewRange: 55, strafe: 0.35, think: 0.7, tactics: 0.3 },
  veteran: { id: 'veteran', name: 'VETERAN', reaction: 0.55, aimError: 0.07, lead: 0.65, turretMult: 0.9, fireAlign: 0.045, retreatHealth: 0.32, viewRange: 72, strafe: 0.7, think: 0.45, tactics: 0.7 },
  elite: { id: 'elite', name: 'ELITE', reaction: 0.3, aimError: 0.042, lead: 0.92, turretMult: 1.05, fireAlign: 0.028, retreatHealth: 0.38, viewRange: 88, strafe: 1, think: 0.3, tactics: 1 },
};

export interface ModeDef {
  id: ModeId;
  name: string;
  short: string;
  blurb: string;
  scoreLimits: number[];
  defaultScore: number;
  timeLimits: number[];
  teams: boolean;
}

export const MODES: Record<ModeId, ModeDef> = {
  tdm: {
    id: 'tdm', name: 'TEAM DEATHMATCH', short: 'TDM',
    blurb: 'Blue versus magenta, four tanks a side. Every destroyed enemy scores for your team.',
    scoreLimits: [15, 25, 40], defaultScore: 25, timeLimits: [300, 480, 600], teams: true,
  },
  ffa: {
    id: 'ffa', name: 'FREE-FOR-ALL', short: 'FFA',
    blurb: 'Eight tanks, no friends. First to the frag limit — or the most frags at the buzzer — wins.',
    scoreLimits: [10, 15, 25], defaultScore: 15, timeLimits: [300, 480, 600], teams: false,
  },
  cp: {
    id: 'cp', name: 'CONTROL POINT', short: 'CP',
    blurb: 'Capture the central uplink and hold it. The owning team earns a point every second.',
    scoreLimits: [60, 100, 150], defaultScore: 100, timeLimits: [300, 480, 600], teams: true,
  },
};

/** Original callsigns. Bots are always shown with a BOT tag in the UI. */
export const BOT_NAMES = [
  'KESTREL', 'RIVET', 'NOX', 'SABLE', 'TALON', 'MERIDIAN', 'VEX', 'ORBIT',
  'GRIDLOCK', 'PALADIN', 'ION', 'FERRO', 'QUASAR', 'BRAMBLE', 'DRIFT', 'HALO',
];

export const RESPAWN_DELAY = 4;
export const SPAWN_PROTECT = 2.2;
export const KILL_XP = 100;
export const ASSIST_XP = 35;
export const BOOST_MULT = 1.45;
export const BOOST_DRAIN = 0.34;
export const BOOST_REGEN = 0.16;
export const REGEN_DELAY = 6;
export const REGEN_RATE = 0.035;
export const STEP_HEIGHT = 0.95;
export const GRAVITY = 24;
export const TANK_HEIGHT = 2.3;
