import { HOTSPOTS } from '../story/data.ts';
import type { Hotspot } from '../story/types.ts';

export const HOTSPOTS_BY_ID: Record<string, Hotspot> = Object.fromEntries(HOTSPOTS.map((x) => [x.id, x]));
