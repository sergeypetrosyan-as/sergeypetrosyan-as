import { T } from '../state/tuning';
import type { Segment, Sprite, Track, TrackDef } from '../state/types';

function rng(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const easeIn = (a: number, b: number, p: number): number => a + (b - a) * p * p;
const easeInOut = (a: number, b: number, p: number): number => a + (b - a) * (-Math.cos(p * Math.PI) / 2 + 0.5);

export function buildTrack(def: TrackDef): Track {
  const segs: Segment[] = [];
  const lastY = (): number => (segs.length ? segs[segs.length - 1].y2 : 0);
  const add = (curve: number, y: number): void => {
    const i = segs.length;
    segs.push({ i, curve, y1: lastY(), y2: y, spine: false, gate: 0, cp: 0, band: Math.floor(i / 3) % 2, sprites: [] });
  };
  const road = (enter: number, hold: number, leave: number, curve: number, hill: number): void => {
    const startY = lastY();
    const endY = startY + hill * T.SEG_LEN;
    const total = enter + hold + leave;
    for (let n = 0; n < enter; n++) add(easeIn(0, curve, n / enter), easeInOut(startY, endY, n / total));
    for (let n = 0; n < hold; n++) add(curve, easeInOut(startY, endY, (enter + n) / total));
    for (let n = 0; n < leave; n++) add(easeInOut(curve, 0, n / leave), easeInOut(startY, endY, (enter + hold + n) / total));
  };
  for (const s of def.sections) road(s[0], s[1], s[2], s[3], s[4]);
  // closing section returns to height 0 so the lap loops cleanly
  road(30, 30, 30, 0, -lastY() / T.SEG_LEN);
  segs[segs.length - 1].y2 = 0;

  const N = segs.length;
  const spineStarts: number[] = [];
  const spineEnds: number[] = [];
  for (const sp of def.spines) {
    const start = Math.floor(sp.at * N);
    const end = Math.min(N - 2, start + sp.len);
    for (let k = start; k < end; k++) segs[k].spine = true;
    segs[start].gate = 1;
    segs[end].gate = 2;
    spineStarts.push(start);
    spineEnds.push(end);
  }
  const cpIdx = [Math.floor(N / 4), Math.floor(N / 2), Math.floor((N * 3) / 4), 0];
  cpIdx.forEach((idx, k) => {
    segs[idx].cp = k + 1;
  });

  const rand = rng(def.seed);
  let i = 6;
  while (i < N - 4) {
    for (const side of [-1, 1]) {
      if (rand() < 0.2) continue;
      const r = rand();
      const kind: Sprite['kind'] = r < 0.45 ? 'tower' : r < 0.75 ? 'sign' : 'pylon';
      const dist = kind === 'tower' ? 2.2 + rand() * 4.2 : kind === 'sign' ? 1.7 + rand() * 1.4 : 1.35 + rand() * 0.3;
      segs[i].sprites.push({ kind, x: side * dist, tex: Math.floor(rand() * 4) });
    }
    i += 4 + Math.floor(rand() * 6);
  }
  return { def, segs, length: N * T.SEG_LEN, spineStarts, spineEnds };
}

export function segAt(track: Track, s: number): Segment {
  const n = track.segs.length;
  const i = Math.floor(s / T.SEG_LEN);
  return track.segs[((i % n) + n) % n];
}

/** Height of the road at progress s (world units), interpolated inside a segment. */
export function heightAt(track: Track, s: number): number {
  const seg = segAt(track, s);
  const p = (((s % T.SEG_LEN) + T.SEG_LEN) % T.SEG_LEN) / T.SEG_LEN;
  return seg.y1 + (seg.y2 - seg.y1) * p;
}

/** Distance in world units to the next Spine entrance gate ahead of progress s. */
export function nextGateDistance(track: Track, s: number): number {
  const L = track.length;
  const pos = ((s % L) + L) % L;
  let best = Infinity;
  for (const idx of track.spineStarts) {
    let d = idx * T.SEG_LEN - pos;
    if (d < 0) d += L;
    if (d < best) best = d;
  }
  return best;
}
