import type { CaseState, GameEvent, LocId } from '../story/types.ts';
import type { SaveData } from '../storage/storage.ts';
import type { Sound } from '../audio/audio.ts';

export type Tab = 'scene' | 'log' | 'board' | 'reconstruct' | 'contradictions' | 'conclude';
export const TABS: { id: Tab; label: string; key: string }[] = [
  { id: 'scene', label: 'Scene', key: '1' },
  { id: 'log', label: 'Evidence log', key: '2' },
  { id: 'board', label: 'Case board', key: '3' },
  { id: 'reconstruct', label: 'Reconstruction', key: '4' },
  { id: 'contradictions', label: 'Contradictions', key: '5' },
  { id: 'conclude', label: 'Conclusion', key: '6' },
];

export interface Host {
  state: CaseState;
  data: SaveData;
  sound: Sound;
  tab: Tab;
  setTab(t: Tab): void;
  apply(ev: GameEvent[]): void;
  rerender(): void;
  persist(): void;
  go(loc: LocId): void;
  openSource(id: string): void;
  openHotspot(id: string): void;
  confirmCloseDay(): void;
  openSubmit(): void;
  newCase(): void;
  openEnding(): void;
  applySettings(): void;
  openTitle(): void;
  openHelp(): void;
  openSettings(): void;
}
