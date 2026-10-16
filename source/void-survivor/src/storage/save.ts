// Versioned localStorage persistence. Every access is guarded; corrupted data falls back to defaults.
import type { ArenaId } from '../sim/types.ts';

export const SAVE_KEY = 'void-survivor:v1';

export interface Settings {
  volume: number;
  muted: boolean;
  shake: boolean;
  reducedFlash: boolean;
  outline: boolean;
  aim: 'auto' | 'mouse' | 'move';
  numbers: boolean;
  /** Graphics quality; 'auto' picks a preset from the device at start. */
  quality: Quality;
}

export type Quality = 'auto' | 'low' | 'medium' | 'high';

export interface Best {
  time: number;
  kills: number;
  wave: number;
  score: number;
  level: number;
}

export interface Save {
  v: 1;
  shards: number;
  owned: Record<string, number>;
  best: Best;
  stats: { runs: number; wins: number; kills: number; deaths: number; bosses: number; playtime: number };
  settings: Settings;
  arena: ArenaId;
}

export function defaultSettings(reducedMotion = false): Settings {
  return { volume: 0.6, muted: false, shake: !reducedMotion, reducedFlash: reducedMotion, outline: true, aim: 'auto', numbers: true, quality: 'auto' };
}

export function defaultSave(reducedMotion = false): Save {
  return {
    v: 1,
    shards: 0,
    owned: {},
    best: { time: 0, kills: 0, wave: 0, score: 0, level: 0 },
    stats: { runs: 0, wins: 0, kills: 0, deaths: 0, bosses: 0, playtime: 0 },
    settings: defaultSettings(reducedMotion),
    arena: 'hollow',
  };
}

function num(v: unknown, d: number, min = 0, max = 1e9): number {
  return typeof v === 'number' && Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : d;
}
function bool(v: unknown, d: boolean): boolean {
  return typeof v === 'boolean' ? v : d;
}

/** Field-by-field validation: unknown or invalid fields fall back to defaults. */
export function parseSave(raw: string | null, reducedMotion = false): Save {
  const d = defaultSave(reducedMotion);
  if (!raw) return d;
  let o: unknown;
  try {
    o = JSON.parse(raw);
  } catch {
    return d;
  }
  if (!o || typeof o !== 'object') return d;
  const r = o as Record<string, unknown>;
  if (r.v !== 1) return d;
  const best = (r.best && typeof r.best === 'object' ? r.best : {}) as Record<string, unknown>;
  const stats = (r.stats && typeof r.stats === 'object' ? r.stats : {}) as Record<string, unknown>;
  const set = (r.settings && typeof r.settings === 'object' ? r.settings : {}) as Record<string, unknown>;
  const ownedIn = (r.owned && typeof r.owned === 'object' ? r.owned : {}) as Record<string, unknown>;
  const owned: Record<string, number> = {};
  for (const k of Object.keys(ownedIn)) {
    const t = ownedIn[k];
    if (typeof t === 'number' && Number.isFinite(t) && t > 0 && t < 10) owned[k] = Math.floor(t);
  }
  const quality: Quality = set.quality === 'low' || set.quality === 'medium' || set.quality === 'high' || set.quality === 'auto' ? set.quality : d.settings.quality;
  const aim = set.aim === 'mouse' || set.aim === 'move' || set.aim === 'auto' ? set.aim : d.settings.aim;
  return {
    v: 1,
    shards: Math.floor(num(r.shards, 0)),
    owned,
    best: {
      time: num(best.time, 0),
      kills: num(best.kills, 0),
      wave: num(best.wave, 0),
      score: num(best.score, 0),
      level: num(best.level, 0),
    },
    stats: {
      runs: num(stats.runs, 0),
      wins: num(stats.wins, 0),
      kills: num(stats.kills, 0),
      deaths: num(stats.deaths, 0),
      bosses: num(stats.bosses, 0),
      playtime: num(stats.playtime, 0),
    },
    settings: {
      volume: num(set.volume, d.settings.volume, 0, 1),
      muted: bool(set.muted, d.settings.muted),
      shake: bool(set.shake, d.settings.shake),
      reducedFlash: bool(set.reducedFlash, d.settings.reducedFlash),
      outline: bool(set.outline, d.settings.outline),
      aim,
      numbers: bool(set.numbers, d.settings.numbers),
      quality,
    },
    arena: r.arena === 'foundry' ? 'foundry' : 'hollow',
  };
}

export function loadSave(reducedMotion = false): Save {
  try {
    return parseSave(localStorage.getItem(SAVE_KEY), reducedMotion);
  } catch {
    return defaultSave(reducedMotion);
  }
}

export function writeSave(s: Save): void {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify(s));
  } catch {
    /* private mode or quota: keep playing from memory */
  }
}
