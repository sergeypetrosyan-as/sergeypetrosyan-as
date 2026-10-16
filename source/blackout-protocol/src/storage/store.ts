import type { Difficulty } from '../sim/types.ts';

export const SAVE_KEY = 'blackout-protocol:v1';

export interface Settings {
  volume: number; // 0..1
  mute: boolean;
  colorblind: boolean;
  cones: boolean;
  difficulty: Difficulty;
  reduceMotion: boolean;
  /** Graphics quality preference for the 3D renderer ('auto' detects a tier at start). */
  quality: QualityPref;
}

export type QualityPref = 'auto' | 'low' | 'medium' | 'high';

export interface Best { score: number; rating: string; time: number }

export interface CheckpointSave {
  mission: string;
  difficulty: Difficulty;
  snapshot: unknown;
}

export interface SaveData {
  v: 1;
  unlocked: number;
  best: Record<string, Best>;
  settings: Settings;
  checkpoint: CheckpointSave | null;
}

export function defaultSettings(): Settings {
  let reduce = false;
  try { reduce = typeof matchMedia === 'function' && matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { /* ignore */ }
  return { volume: 0.7, mute: false, colorblind: false, cones: true, difficulty: 'normal', reduceMotion: reduce, quality: 'auto' };
}

export function defaultSave(): SaveData {
  return { v: 1, unlocked: 0, best: {}, settings: defaultSettings(), checkpoint: null };
}

let memory: string | null = null;

const isObj = (x: unknown): x is Record<string, unknown> => typeof x === 'object' && x !== null && !Array.isArray(x);
const num = (x: unknown, lo: number, hi: number, d: number): number => (typeof x === 'number' && Number.isFinite(x) ? Math.min(hi, Math.max(lo, x)) : d);

/** Parse and sanitise a saved blob. Anything malformed falls back to defaults field by field. */
export function sanitize(raw: unknown): SaveData {
  const d = defaultSave();
  if (!isObj(raw) || raw.v !== 1) return d;
  const out = defaultSave();
  out.unlocked = Math.floor(num(raw.unlocked, 0, 3, 0));
  if (isObj(raw.best)) {
    for (const [k, v] of Object.entries(raw.best)) {
      if (isObj(v) && typeof v.rating === 'string' && /^[SABC]$/.test(v.rating)) {
        out.best[k] = { score: num(v.score, 0, 5000, 0), rating: v.rating, time: num(v.time, 0, 99999, 0) };
      }
    }
  }
  if (isObj(raw.settings)) {
    const s = raw.settings;
    out.settings = {
      volume: num(s.volume, 0, 1, d.settings.volume),
      mute: typeof s.mute === 'boolean' ? s.mute : d.settings.mute,
      colorblind: typeof s.colorblind === 'boolean' ? s.colorblind : d.settings.colorblind,
      cones: typeof s.cones === 'boolean' ? s.cones : d.settings.cones,
      difficulty: s.difficulty === 'easy' || s.difficulty === 'hard' || s.difficulty === 'normal' ? s.difficulty : 'normal',
      reduceMotion: typeof s.reduceMotion === 'boolean' ? s.reduceMotion : d.settings.reduceMotion,
      quality: s.quality === 'low' || s.quality === 'medium' || s.quality === 'high' ? s.quality : 'auto',
    };
  }
  if (isObj(raw.checkpoint) && typeof raw.checkpoint.mission === 'string' && isObj(raw.checkpoint.snapshot)) {
    const df = raw.checkpoint.difficulty;
    out.checkpoint = { mission: raw.checkpoint.mission, difficulty: df === 'easy' || df === 'hard' ? df : 'normal', snapshot: raw.checkpoint.snapshot };
  }
  return out;
}

export function loadSave(): SaveData {
  let text: string | null = null;
  try { text = localStorage.getItem(SAVE_KEY); } catch { text = memory; }
  if (text === null) text = memory;
  if (!text) return defaultSave();
  try { return sanitize(JSON.parse(text)); } catch { return defaultSave(); }
}

export function writeSave(data: SaveData): void {
  let text: string;
  try { text = JSON.stringify(data); } catch { return; }
  memory = text;
  try { localStorage.setItem(SAVE_KEY, text); } catch { /* storage blocked or full: keep the in-memory copy */ }
}
