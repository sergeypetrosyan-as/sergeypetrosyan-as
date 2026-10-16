import type { Quality, RecordEntry, SaveFile, Settings } from '../state/types';

const QUALITIES: Quality[] = ['auto', 'low', 'medium', 'high'];

export const SAVE_KEY = 'neon-overdrive:v1';

export function defaultSettings(): Settings {
  let reduced = false;
  let contrast = false;
  try {
    reduced = !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    contrast = !!window.matchMedia?.('(prefers-contrast: more)').matches;
  } catch {
    /* non-browser */
  }
  return {
    volume: 0.7, muted: false, music: true, shake: !reduced, reducedFlash: reduced, highContrast: contrast,
    speedLines: true, tutorialSeen: false, lastTrack: 0, lastDiff: 1, quality: 'auto',
  };
}

export function emptyRecord(): RecordEntry {
  return { bestTotal: null, bestLap: null, bestPos: null, bestSplits: [], races: 0 };
}

const num = (v: unknown, d: number, lo: number, hi: number): number =>
  typeof v === 'number' && Number.isFinite(v) ? Math.min(hi, Math.max(lo, v)) : d;
const bool = (v: unknown, d: boolean): boolean => (typeof v === 'boolean' ? v : d);
const timeOrNull = (v: unknown): number | null => (typeof v === 'number' && Number.isFinite(v) && v > 0 && v < 36000 ? v : null);

/** Parse and validate a saved string. Anything wrong falls back to defaults field by field. */
export function parseSave(raw: string | null): SaveFile {
  const d = defaultSettings();
  const out: SaveFile = { v: 1, settings: d, records: {} };
  if (!raw) return out;
  let j: unknown;
  try {
    j = JSON.parse(raw);
  } catch {
    return out;
  }
  if (!j || typeof j !== 'object') return out;
  const o = j as Record<string, unknown>;
  if (o.v !== 1) return out;
  const s = (o.settings && typeof o.settings === 'object' ? o.settings : {}) as Record<string, unknown>;
  out.settings = {
    volume: num(s.volume, d.volume, 0, 1),
    muted: bool(s.muted, d.muted),
    music: bool(s.music, d.music),
    shake: bool(s.shake, d.shake),
    reducedFlash: bool(s.reducedFlash, d.reducedFlash),
    highContrast: bool(s.highContrast, d.highContrast),
    speedLines: bool(s.speedLines, d.speedLines),
    tutorialSeen: bool(s.tutorialSeen, d.tutorialSeen),
    lastTrack: Math.round(num(s.lastTrack, 0, 0, 2)),
    lastDiff: Math.round(num(s.lastDiff, 1, 0, 2)),
    quality: QUALITIES.includes(s.quality as Quality) ? (s.quality as Quality) : d.quality,
  };
  const r = o.records;
  if (r && typeof r === 'object') {
    for (const [k, v] of Object.entries(r as Record<string, unknown>)) {
      if (!/^\d:\d$/.test(k) || !v || typeof v !== 'object') continue;
      const e = v as Record<string, unknown>;
      const splits = Array.isArray(e.bestSplits) ? e.bestSplits.filter((x) => typeof x === 'number' && Number.isFinite(x)).slice(0, 4) as number[] : [];
      const pos = typeof e.bestPos === 'number' && e.bestPos >= 1 && e.bestPos <= 4 ? Math.round(e.bestPos) : null;
      out.records[k] = {
        bestTotal: timeOrNull(e.bestTotal),
        bestLap: timeOrNull(e.bestLap),
        bestPos: pos,
        bestSplits: splits.length === 4 ? splits : [],
        races: Math.round(num(e.races, 0, 0, 1e6)),
      };
    }
  }
  return out;
}

export class Store {
  data: SaveFile;
  private timer = 0;

  constructor() {
    let raw: string | null = null;
    try {
      raw = localStorage.getItem(SAVE_KEY);
    } catch {
      raw = null;
    }
    this.data = parseSave(raw);
  }

  get settings(): Settings { return this.data.settings; }

  record(track: number, diff: number): RecordEntry {
    return this.data.records[`${track}:${diff}`] ?? emptyRecord();
  }

  /** Update records after a race. Returns which bests were broken. */
  submit(track: number, diff: number, total: number, laps: number[], splitsOfBestLap: number[], pos: number): { total: boolean; lap: boolean; pos: boolean } {
    const key = `${track}:${diff}`;
    const rec = this.data.records[key] ?? emptyRecord();
    const bestLapNow = Math.min(...laps);
    const res = { total: rec.bestTotal === null || total < rec.bestTotal, lap: rec.bestLap === null || bestLapNow < rec.bestLap, pos: rec.bestPos === null || pos < rec.bestPos };
    if (res.total) rec.bestTotal = total;
    if (res.lap) {
      rec.bestLap = bestLapNow;
      if (splitsOfBestLap.length === 4) rec.bestSplits = splitsOfBestLap;
    }
    if (res.pos) rec.bestPos = pos;
    rec.races++;
    this.data.records[key] = rec;
    this.save();
    return res;
  }

  resetRecords(): void {
    this.data.records = {};
    this.save();
  }

  save(): void {
    window.clearTimeout(this.timer);
    this.timer = window.setTimeout(() => this.flush(), 150);
  }

  flush(): void {
    try {
      localStorage.setItem(SAVE_KEY, JSON.stringify(this.data));
    } catch {
      /* private mode or quota: keep playing in memory */
    }
  }
}
