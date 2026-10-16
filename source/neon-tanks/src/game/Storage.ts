import { DIFFICULTIES, HULLS, MODES, PAINTS, UPGRADE_MAX, WEAPONS } from '../sim/content.ts';
import type { ArenaId, DifficultyId, HullId, ModeId, WeaponId } from '../sim/types.ts';
import type { QualityLevel } from '../render/quality.ts';
import { defaultProfile, MAX_LEVEL, type Profile } from './progression.ts';

/**
 * localStorage that never throws: private windows, blocked storage and
 * corrupted payloads all degrade to defaults, and everything read back is validated.
 */
const SETTINGS_KEY = 'neon-tanks.settings.v1';
const PROFILE_KEY = 'neon-tanks.profile.v1';

function read(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as unknown) : null;
  } catch {
    return null;
  }
}

function write(key: string, v: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(v));
  } catch {
    /* storage unavailable: progress lasts for this session only */
  }
}

const isObj = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null && !Array.isArray(v);
const num = (v: unknown, lo: number, hi: number, d: number) => (typeof v === 'number' && Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : d);
const bool = (v: unknown, d: boolean) => (typeof v === 'boolean' ? v : d);
const oneOf = <T extends string>(v: unknown, list: readonly T[], d: T): T => (typeof v === 'string' && (list as readonly string[]).includes(v) ? (v as T) : d);

export interface Settings {
  masterVolume: number;
  sfxVolume: number;
  musicVolume: number;
  muted: boolean;
  sensitivity: number;
  invertY: boolean;
  fov: number;
  smoothing: number;
  shake: boolean;
  quality: QualityLevel;
  showFps: boolean;
  cameraDistance: number;
}

export const DEFAULT_SETTINGS: Settings = {
  masterVolume: 0.8,
  sfxVolume: 0.85,
  musicVolume: 0.45,
  muted: false,
  sensitivity: 1,
  invertY: false,
  fov: 68,
  smoothing: 0.35,
  shake: true,
  quality: 'medium',
  showFps: false,
  cameraDistance: 12.5,
};

export function loadSettings(): Settings {
  const d = read(SETTINGS_KEY);
  const D = DEFAULT_SETTINGS;
  if (!isObj(d)) return { ...D };
  return {
    masterVolume: num(d.masterVolume, 0, 1, D.masterVolume),
    sfxVolume: num(d.sfxVolume, 0, 1, D.sfxVolume),
    musicVolume: num(d.musicVolume, 0, 1, D.musicVolume),
    muted: bool(d.muted, D.muted),
    sensitivity: num(d.sensitivity, 0.2, 3, D.sensitivity),
    invertY: bool(d.invertY, D.invertY),
    fov: num(d.fov, 55, 90, D.fov),
    smoothing: num(d.smoothing, 0, 1, D.smoothing),
    shake: bool(d.shake, D.shake),
    quality: oneOf(d.quality, ['low', 'medium', 'high'] as const, D.quality),
    showFps: bool(d.showFps, D.showFps),
    cameraDistance: num(d.cameraDistance, 5.5, 22, D.cameraDistance),
  };
}

export function saveSettings(s: Settings): void {
  write(SETTINGS_KEY, s);
}

const HULL_IDS = Object.keys(HULLS) as HullId[];
const WEAPON_IDS = Object.keys(WEAPONS) as WeaponId[];
const PAINT_IDS = PAINTS.map((p) => p.id);

function ids<T extends string>(v: unknown, list: readonly T[], base: T[]): T[] {
  const out = new Set<T>(base);
  if (Array.isArray(v)) for (const x of v) if (typeof x === 'string' && (list as readonly string[]).includes(x)) out.add(x as T);
  return [...out];
}

export function loadProfile(): Profile {
  const d = read(PROFILE_KEY);
  const D = defaultProfile();
  if (!isObj(d)) return D;
  const owned = isObj(d.owned) ? d.owned : {};
  const p: Profile = {
    version: 1,
    callsign: typeof d.callsign === 'string' ? d.callsign.replace(/[^\w\- ]/g, '').slice(0, 14).toUpperCase() || D.callsign : D.callsign,
    level: Math.floor(num(d.level, 1, MAX_LEVEL, 1)),
    xp: Math.floor(num(d.xp, 0, 1e7, 0)),
    credits: Math.floor(num(d.credits, 0, 1e8, D.credits)),
    owned: {
      hulls: ids(owned.hulls, HULL_IDS, D.owned.hulls),
      weapons: ids(owned.weapons, WEAPON_IDS, D.owned.weapons),
      paints: ids(owned.paints, PAINT_IDS, D.owned.paints),
    },
    loadout: D.loadout,
    stats: D.stats,
    tutorialDone: bool(d.tutorialDone, false),
    match: D.match,
  };
  if (isObj(d.loadout)) {
    const l = d.loadout;
    const up = isObj(l.upgrades) ? l.upgrades : {};
    p.loadout = {
      hull: oneOf(l.hull, p.owned.hulls, D.loadout.hull),
      weapon: oneOf(l.weapon, p.owned.weapons, D.loadout.weapon),
      paint: oneOf(l.paint, p.owned.paints, D.loadout.paint),
      upgrades: {
        damage: Math.floor(num(up.damage, 0, UPGRADE_MAX, 0)),
        armor: Math.floor(num(up.armor, 0, UPGRADE_MAX, 0)),
        speed: Math.floor(num(up.speed, 0, UPGRADE_MAX, 0)),
        reload: Math.floor(num(up.reload, 0, UPGRADE_MAX, 0)),
      },
    };
  }
  if (isObj(d.stats)) {
    const s = d.stats;
    p.stats = {
      matches: Math.floor(num(s.matches, 0, 1e7, 0)),
      wins: Math.floor(num(s.wins, 0, 1e7, 0)),
      kills: Math.floor(num(s.kills, 0, 1e8, 0)),
      deaths: Math.floor(num(s.deaths, 0, 1e8, 0)),
      assists: Math.floor(num(s.assists, 0, 1e8, 0)),
      damage: Math.floor(num(s.damage, 0, 1e10, 0)),
      bestStreak: Math.floor(num(s.bestStreak, 0, 1e5, 0)),
      playTime: num(s.playTime, 0, 1e9, 0),
    };
  }
  if (isObj(d.match)) {
    const m = d.match;
    const mode = oneOf(m.mode, Object.keys(MODES) as ModeId[], D.match.mode);
    p.match = {
      mode,
      arena: oneOf(m.arena, ['docks', 'void'] as ArenaId[], D.match.arena),
      difficulty: oneOf(m.difficulty, Object.keys(DIFFICULTIES) as DifficultyId[], D.match.difficulty),
      scoreLimit: MODES[mode].scoreLimits.includes(m.scoreLimit as number) ? (m.scoreLimit as number) : MODES[mode].defaultScore,
      timeLimit: MODES[mode].timeLimits.includes(m.timeLimit as number) ? (m.timeLimit as number) : 480,
    };
  }
  return p;
}

export function saveProfile(p: Profile): void {
  write(PROFILE_KEY, p);
}

export function resetProfile(): Profile {
  const p = defaultProfile();
  write(PROFILE_KEY, p);
  return p;
}
