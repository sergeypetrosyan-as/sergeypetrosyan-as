import { sanitize } from '../story/engine.ts';
import type { CaseState, EndingId } from '../story/types.ts';
import { ENDINGS } from '../story/data.ts';

export const KEY = 'ghost-signal:v1';

export type VisualQuality = 'low' | 'medium' | 'high';

export interface Settings {
  volume: number;
  muted: boolean;
  textSize: 'small' | 'medium' | 'large';
  quality: VisualQuality;
  reducedMotion: boolean;
  highContrast: boolean;
}
export interface SaveData { settings: Settings; progress: CaseState | null; endings: EndingId[]; introSeen: boolean }

/** Small touch screens start on Low so phones stay fast; everything else starts on Medium. */
export function defaultQuality(): VisualQuality {
  try {
    const coarse = window.matchMedia('(pointer: coarse)').matches;
    if (coarse && Math.min(window.screen.width, window.screen.height) < 820) return 'low';
  } catch { /* ignore */ }
  return 'medium';
}

export function defaultSettings(): Settings {
  let rm = false;
  try { rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches; } catch { /* ignore */ }
  return { volume: 60, muted: false, textSize: 'medium', quality: defaultQuality(), reducedMotion: rm, highContrast: false };
}

export function load(): SaveData {
  const base: SaveData = { settings: defaultSettings(), progress: null, endings: [], introSeen: false };
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return base;
    const j = JSON.parse(raw) as Partial<SaveData> | null;
    if (!j || typeof j !== 'object') return base;
    const st = j.settings;
    if (st && typeof st === 'object') {
      if (typeof st.volume === 'number' && st.volume >= 0 && st.volume <= 100) base.settings.volume = st.volume;
      if (typeof st.muted === 'boolean') base.settings.muted = st.muted;
      if (st.textSize === 'small' || st.textSize === 'medium' || st.textSize === 'large') base.settings.textSize = st.textSize;
      if (st.quality === 'low' || st.quality === 'medium' || st.quality === 'high') base.settings.quality = st.quality;
      if (typeof st.reducedMotion === 'boolean') base.settings.reducedMotion = st.reducedMotion;
      if (typeof st.highContrast === 'boolean') base.settings.highContrast = st.highContrast;
    }
    if (Array.isArray(j.endings)) base.endings = j.endings.filter((e): e is EndingId => ENDINGS.some((x) => x.id === e));
    if (typeof j.introSeen === 'boolean') base.introSeen = j.introSeen;
    if (j.progress) base.progress = sanitize(j.progress);
  } catch {
    /* corrupted or unavailable storage: defaults */
  }
  return base;
}

export function save(d: SaveData): void {
  try { localStorage.setItem(KEY, JSON.stringify(d)); } catch { /* storage unavailable */ }
}
