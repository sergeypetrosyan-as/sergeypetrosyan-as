/** Local progress. Every read is validated; unavailable storage just means no saving. */
const KEY = 'neon-jump.save.v1';

export type Rank = 'S' | 'A' | 'B' | 'C';

export interface LevelRecord {
  done: boolean;
  /** Best completion time in seconds. */
  bestTime: number | null;
  bestScore: number;
  /** Bitmask of the three neon shards ever collected. */
  shards: number;
  token: boolean;
  rank: Rank | null;
}

export interface Settings {
  music: number;
  sfx: number;
  muted: boolean;
  reducedMotion: boolean;
  showTimer: boolean;
  touch: 'auto' | 'on' | 'off';
  skin: 'classic' | 'retro';
}

export interface SaveData {
  /** Highest level index that may be started. */
  unlocked: number;
  levels: LevelRecord[];
  beaten: boolean;
  settings: Settings;
}

const RANKS: Rank[] = ['S', 'A', 'B', 'C'];
export const RANK_ORDER: Record<Rank, number> = { S: 3, A: 2, B: 1, C: 0 };

export function emptySave(count: number): SaveData {
  let reduced = false;
  try {
    reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
  } catch {
    /* ignore */
  }
  return {
    unlocked: 0,
    levels: Array.from({ length: count }, () => ({ done: false, bestTime: null, bestScore: 0, shards: 0, token: false, rank: null })),
    beaten: false,
    settings: { music: 0.6, sfx: 0.8, muted: false, reducedMotion: reduced, showTimer: false, touch: 'auto', skin: 'classic' },
  };
}

const num = (v: unknown, lo: number, hi: number): number | null => (typeof v === 'number' && Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : null);
const bool = (v: unknown, d: boolean): boolean => (typeof v === 'boolean' ? v : d);
/** A value outside its range is treated as missing rather than clamped. */
const valid = (v: unknown, lo: number, hi: number): number | null => (typeof v === 'number' && Number.isFinite(v) && v >= lo && v <= hi ? v : null);

export function loadSave(count: number): SaveData {
  const base = emptySave(count);
  let raw: unknown;
  try {
    raw = JSON.parse(localStorage.getItem(KEY) ?? 'null');
  } catch {
    return base;
  }
  if (typeof raw !== 'object' || raw === null) return base;
  const r = raw as Record<string, unknown>;
  const lv = Array.isArray(r.levels) ? r.levels : [];
  const s = (typeof r.settings === 'object' && r.settings ? r.settings : {}) as Record<string, unknown>;
  return {
    unlocked: Math.floor(valid(r.unlocked, 0, count - 1) ?? 0),
    beaten: bool(r.beaten, false),
    levels: base.levels.map((d, i) => {
      const x = (typeof lv[i] === 'object' && lv[i] ? lv[i] : {}) as Record<string, unknown>;
      return {
        done: bool(x.done, false),
        bestTime: valid(x.bestTime, 0.1, 99999),
        bestScore: Math.floor(valid(x.bestScore, 0, 1e8) ?? 0),
        shards: Math.floor(valid(x.shards, 0, 7) ?? 0),
        token: bool(x.token, false),
        rank: RANKS.includes(x.rank as Rank) ? (x.rank as Rank) : d.rank,
      };
    }),
    settings: {
      music: num(s.music, 0, 1) ?? base.settings.music,
      sfx: num(s.sfx, 0, 1) ?? base.settings.sfx,
      muted: bool(s.muted, false),
      reducedMotion: bool(s.reducedMotion, base.settings.reducedMotion),
      showTimer: bool(s.showTimer, false),
      touch: s.touch === 'on' || s.touch === 'off' ? s.touch : 'auto',
      skin: s.skin === 'retro' ? 'retro' : 'classic',
    },
  };
}

export function writeSave(data: SaveData): boolean {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

export function clearSave(): void {
  try {
    localStorage.removeItem(KEY);
  } catch {
    /* ignore */
  }
}
