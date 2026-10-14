/** Local progress. Every read is validated; unavailable storage just means no saving. */
const KEY = 'unfall.save.v1';

export interface Settings {
  music: number;
  sfx: number;
  muted: boolean;
  reducedMotion: boolean;
}

export interface SaveData {
  /** Highest district index the player may start. */
  unlocked: number;
  /** Seconds borrowed in the most recent completion of each district (the run). */
  run: Array<number | null>;
  /** Fewest seconds ever borrowed per district. */
  best: Array<number | null>;
  /** Best ending light reached (percent), or null if never finished. */
  bestLight: number | null;
  endings: string[];
  settings: Settings;
}

const DEFAULT_SETTINGS: Settings = { music: 0.6, sfx: 0.8, muted: false, reducedMotion: false };

export function emptySave(levels: number): SaveData {
  return {
    unlocked: 0,
    run: Array(levels).fill(null),
    best: Array(levels).fill(null),
    bestLight: null,
    endings: [],
    settings: { ...DEFAULT_SETTINGS, reducedMotion: matchMedia('(prefers-reduced-motion: reduce)').matches },
  };
}

const num = (v: unknown, lo: number, hi: number): number | null => (typeof v === 'number' && Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : null);

export function loadSave(levels: number): SaveData {
  const base = emptySave(levels);
  let raw: unknown = null;
  try {
    raw = JSON.parse(localStorage.getItem(KEY) ?? 'null');
  } catch {
    return base;
  }
  if (typeof raw !== 'object' || raw === null) return base;
  const r = raw as Record<string, unknown>;
  const list = (v: unknown) => (Array.isArray(v) ? Array.from({ length: levels }, (_, i) => num(v[i], 0, 9999)) : Array(levels).fill(null));
  const s = (typeof r.settings === 'object' && r.settings ? r.settings : {}) as Record<string, unknown>;
  return {
    unlocked: Math.floor(num(r.unlocked, 0, levels - 1) ?? 0),
    run: list(r.run),
    best: list(r.best),
    bestLight: num(r.bestLight, 0, 100),
    endings: Array.isArray(r.endings) ? r.endings.filter((e): e is string => typeof e === 'string').slice(0, 8) : [],
    settings: {
      music: num(s.music, 0, 1) ?? base.settings.music,
      sfx: num(s.sfx, 0, 1) ?? base.settings.sfx,
      muted: typeof s.muted === 'boolean' ? s.muted : base.settings.muted,
      reducedMotion: typeof s.reducedMotion === 'boolean' ? s.reducedMotion : base.settings.reducedMotion,
    },
  };
}

export function writeSave(data: SaveData): void {
  try {
    localStorage.setItem(KEY, JSON.stringify(data));
  } catch {
    /* storage unavailable — progress lasts for this session only */
  }
}
