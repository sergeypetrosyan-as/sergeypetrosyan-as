import type { QualityLevel } from './GameConfig';

/**
 * localStorage access that never throws: private windows, blocked storage and
 * corrupted payloads all degrade to defaults. Everything read back is validated.
 */
const SETTINGS_KEY = 'neon-vice.settings.v1';
const RECORDS_KEY = 'neon-vice.records.v1';

function safeRead(key: string): unknown {
  try {
    const raw = window.localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as unknown) : null;
  } catch {
    return null;
  }
}

function safeWrite(key: string, value: unknown): void {
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* storage unavailable: settings simply won't persist */
  }
}

function isObj(v: unknown): v is Record<string, unknown> {
  return typeof v === 'object' && v !== null && !Array.isArray(v);
}

function num(v: unknown, min: number, max: number, fallback: number): number {
  return typeof v === 'number' && Number.isFinite(v) ? Math.min(max, Math.max(min, v)) : fallback;
}

function bool(v: unknown, fallback: boolean): boolean {
  return typeof v === 'boolean' ? v : fallback;
}

export interface Settings {
  sensitivity: number;
  invertY: boolean;
  musicVolume: number;
  sfxVolume: number;
  muted: boolean;
  quality: QualityLevel;
  reducedShake: boolean;
  highContrast: boolean;
}

export const DEFAULT_SETTINGS: Settings = {
  sensitivity: 1,
  invertY: false,
  musicVolume: 0.55,
  sfxVolume: 0.8,
  muted: false,
  quality: 'medium',
  reducedShake: false,
  highContrast: false,
};

export function loadSettings(): Settings {
  const data = safeRead(SETTINGS_KEY);
  if (!isObj(data)) return { ...DEFAULT_SETTINGS };
  const q = data.quality;
  return {
    sensitivity: num(data.sensitivity, 0.2, 3, DEFAULT_SETTINGS.sensitivity),
    invertY: bool(data.invertY, DEFAULT_SETTINGS.invertY),
    musicVolume: num(data.musicVolume, 0, 1, DEFAULT_SETTINGS.musicVolume),
    sfxVolume: num(data.sfxVolume, 0, 1, DEFAULT_SETTINGS.sfxVolume),
    muted: bool(data.muted, DEFAULT_SETTINGS.muted),
    quality: q === 'low' || q === 'medium' || q === 'high' ? q : DEFAULT_SETTINGS.quality,
    reducedShake: bool(data.reducedShake, DEFAULT_SETTINGS.reducedShake),
    highContrast: bool(data.highContrast, DEFAULT_SETTINGS.highContrast),
  };
}

export function saveSettings(s: Settings): void {
  safeWrite(SETTINGS_KEY, s);
}

export interface RunRecord {
  score: number;
  wave: number;
  kills: number;
  accuracy: number;
  completed: boolean;
  date: string;
}

export interface Records {
  bestScore: number;
  highestWave: number;
  totalKills: number;
  runs: RunRecord[];
}

const EMPTY_RECORDS: Records = { bestScore: 0, highestWave: 0, totalKills: 0, runs: [] };
const MAX_RUNS = 5;

function validRun(v: unknown): RunRecord | null {
  if (!isObj(v)) return null;
  const date = typeof v.date === 'string' && !Number.isNaN(Date.parse(v.date)) ? v.date : null;
  if (!date) return null;
  return {
    score: Math.floor(num(v.score, 0, 1e9, 0)),
    wave: Math.floor(num(v.wave, 0, 999, 0)),
    kills: Math.floor(num(v.kills, 0, 1e6, 0)),
    accuracy: num(v.accuracy, 0, 1, 0),
    completed: bool(v.completed, false),
    date,
  };
}

export function loadRecords(): Records {
  const data = safeRead(RECORDS_KEY);
  if (!isObj(data)) return structuredClone(EMPTY_RECORDS);
  const runs = Array.isArray(data.runs)
    ? data.runs.map(validRun).filter((r): r is RunRecord => r !== null).slice(0, MAX_RUNS)
    : [];
  return {
    bestScore: Math.floor(num(data.bestScore, 0, 1e9, 0)),
    highestWave: Math.floor(num(data.highestWave, 0, 999, 0)),
    totalKills: Math.floor(num(data.totalKills, 0, 1e9, 0)),
    runs,
  };
}

/** Folds a finished run into the records. Returns the updated records and whether it set a new best. */
export function recordRun(run: RunRecord): { records: Records; newBest: boolean } {
  const records = loadRecords();
  const newBest = run.score > records.bestScore;
  records.bestScore = Math.max(records.bestScore, run.score);
  records.highestWave = Math.max(records.highestWave, run.wave);
  records.totalKills += run.kills;
  records.runs = [...records.runs, run].sort((a, b) => b.score - a.score).slice(0, MAX_RUNS);
  safeWrite(RECORDS_KEY, records);
  return { records, newBest };
}

export function resetRecords(): Records {
  safeWrite(RECORDS_KEY, EMPTY_RECORDS);
  return structuredClone(EMPTY_RECORDS);
}
