let ac: AudioContext | null = null;
export const isMuted = (): boolean => {
  try { return localStorage.getItem('mw:muted') === '1'; } catch { return false; }
};
export function setMuted(m: boolean): void {
  try { localStorage.setItem('mw:muted', m ? '1' : '0'); } catch { /* storage blocked */ }
}

const SHAPES: Record<string, Array<[number, number, number]>> = {
  tap: [[520, 0, 0.05]],
  tick: [[900, 0, 0.025]],
  good: [[660, 0, 0.07], [880, 0.07, 0.1]],
  bad: [[180, 0, 0.16]],
  win: [[523, 0, 0.1], [659, 0.1, 0.1], [784, 0.2, 0.22]],
  lose: [[330, 0, 0.14], [247, 0.14, 0.14], [196, 0.28, 0.25]],
};

/** Short synthesized blips. Silent when muted or before any user gesture. */
export function sfx(name: string): void {
  if (isMuted() || !SHAPES[name]) return;
  try {
    ac ??= new AudioContext();
    if (ac.state === 'suspended') void ac.resume();
    const t0 = ac.currentTime;
    for (const [f, at, len] of SHAPES[name]) {
      const o = ac.createOscillator();
      const g = ac.createGain();
      o.type = name === 'bad' || name === 'lose' ? 'sawtooth' : 'triangle';
      o.frequency.value = f;
      g.gain.setValueAtTime(0.0001, t0 + at);
      g.gain.exponentialRampToValueAtTime(0.12, t0 + at + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + at + len);
      o.connect(g).connect(ac.destination);
      o.start(t0 + at);
      o.stop(t0 + at + len + 0.02);
    }
  } catch { /* audio unavailable */ }
}
