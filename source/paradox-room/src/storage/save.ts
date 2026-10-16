// Versioned persistence. Every read and write is guarded; corrupted data falls back to defaults.

const KEY = 'paradox-room:v1';

export interface Settings {
  volume: number; // 0..1
  muted: boolean;
  effects: boolean | null; // null = follow prefers-reduced-motion
  textSize: 0 | 1 | 2;
  contrast: boolean;
  quality: 'auto' | 'low' | 'medium' | 'high';
}

export interface SaveData {
  v: 1;
  completed: string[];
  best: Record<string, number>;
  shards: string[];
  settings: Settings;
  last: string;
  endingSeen: boolean;
}

export function defaults(): SaveData {
  return {
    v: 1,
    completed: [],
    best: {},
    shards: [],
    settings: { volume: 0.6, muted: false, effects: null, textSize: 1, contrast: false, quality: 'auto' },
    last: '1-1',
    endingSeen: false,
  };
}

const isStrArr = (a: unknown): a is string[] => Array.isArray(a) && a.every((s) => typeof s === 'string');

function sanitize(raw: unknown): SaveData {
  const d = defaults();
  if (!raw || typeof raw !== 'object') return d;
  const r = raw as Record<string, unknown>;
  if (r.v !== 1) return d;
  if (isStrArr(r.completed)) d.completed = r.completed.slice(0, 64);
  if (isStrArr(r.shards)) d.shards = r.shards.slice(0, 64);
  if (r.best && typeof r.best === 'object') {
    for (const [k, v] of Object.entries(r.best as Record<string, unknown>)) {
      if (typeof v === 'number' && Number.isFinite(v) && v >= 0) d.best[k] = Math.floor(v);
    }
  }
  if (typeof r.last === 'string') d.last = r.last;
  if (typeof r.endingSeen === 'boolean') d.endingSeen = r.endingSeen;
  const s = r.settings as Record<string, unknown> | undefined;
  if (s && typeof s === 'object') {
    if (typeof s.volume === 'number' && Number.isFinite(s.volume)) d.settings.volume = Math.max(0, Math.min(1, s.volume));
    if (typeof s.muted === 'boolean') d.settings.muted = s.muted;
    if (typeof s.effects === 'boolean' || s.effects === null) d.settings.effects = s.effects;
    if (s.textSize === 0 || s.textSize === 1 || s.textSize === 2) d.settings.textSize = s.textSize;
    if (typeof s.contrast === 'boolean') d.settings.contrast = s.contrast;
    if (s.quality === 'auto' || s.quality === 'low' || s.quality === 'medium' || s.quality === 'high') d.settings.quality = s.quality;
  }
  return d;
}

export class Store {
  data: SaveData = defaults();
  ok = true;

  load(): void {
    try {
      const txt = window.localStorage.getItem(KEY);
      this.data = txt ? sanitize(JSON.parse(txt)) : defaults();
    } catch {
      this.data = defaults();
    }
  }

  save(): void {
    try {
      window.localStorage.setItem(KEY, JSON.stringify(this.data));
      this.ok = true;
    } catch {
      this.ok = false;
    }
  }

  reset(): void {
    const settings = this.data.settings;
    this.data = defaults();
    this.data.settings = settings;
    this.save();
  }
}
