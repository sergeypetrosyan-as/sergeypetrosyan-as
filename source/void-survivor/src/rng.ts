// Seeded mulberry32 PRNG. State is a single uint32 so a run can be reproduced from its seed.
export interface Rng {
  s: number;
}

export function makeRng(seed: number): Rng {
  return { s: seed >>> 0 || 0x9e3779b9 };
}

export function rand(r: Rng): number {
  r.s = (r.s + 0x6d2b79f5) >>> 0;
  let t = r.s;
  t = Math.imul(t ^ (t >>> 15), t | 1);
  t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
  return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
}

export function randRange(r: Rng, a: number, b: number): number {
  return a + (b - a) * rand(r);
}

export function randInt(r: Rng, n: number): number {
  return Math.floor(rand(r) * n);
}

export function chance(r: Rng, p: number): boolean {
  return rand(r) < p;
}

export function pickWeighted<T>(r: Rng, items: T[], weight: (t: T) => number): T | null {
  let total = 0;
  for (const it of items) total += Math.max(0, weight(it));
  if (total <= 0) return null;
  let x = rand(r) * total;
  for (const it of items) {
    x -= Math.max(0, weight(it));
    if (x <= 0) return it;
  }
  return items[items.length - 1] ?? null;
}
