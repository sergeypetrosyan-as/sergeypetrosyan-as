// Web Audio synthesis only. The context is created on the first user gesture; every call is safe if audio is missing.

type Wave = OscillatorType;

export class Sfx {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private ambient: { stop: () => void } | null = null;
  private volume = 0.6;
  private muted = false;
  private pluckTimer: number | null = null;
  private chapter = 0;

  /** Call from a user gesture (keydown / pointerdown). */
  unlock(): void {
    try {
      if (!this.ctx) {
        const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AC) return;
        this.ctx = new AC();
        this.master = this.ctx.createGain();
        this.master.connect(this.ctx.destination);
        this.apply();
      }
      if (this.ctx.state === 'suspended') void this.ctx.resume();
    } catch {
      this.ctx = null;
    }
  }

  setVolume(v: number): void {
    this.volume = Math.max(0, Math.min(1, v));
    this.apply();
  }

  setMuted(m: boolean): void {
    this.muted = m;
    this.apply();
  }

  suspend(): void {
    try {
      void this.ctx?.suspend();
    } catch {
      /* ignore */
    }
  }

  resume(): void {
    try {
      if (this.ctx && this.ctx.state === 'suspended') void this.ctx.resume();
    } catch {
      /* ignore */
    }
  }

  private apply(): void {
    if (this.master && this.ctx) this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume * this.volume, this.ctx.currentTime, 0.03);
  }

  private tone(freq: number, dur: number, type: Wave, gain: number, slideTo?: number, delay = 0, attack = 0.005, filter?: number): void {
    const c = this.ctx;
    if (!c || !this.master || this.muted) return;
    const t = c.currentTime + delay;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(gain, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    let node: AudioNode = o;
    if (filter) {
      const f = c.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.value = filter;
      o.connect(f);
      node = f;
    }
    node.connect(g);
    g.connect(this.master);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  private noise(dur: number, gain: number, f0: number, f1: number, delay = 0): void {
    const c = this.ctx;
    if (!c || !this.master || this.muted) return;
    const t = c.currentTime + delay;
    const len = Math.max(1, Math.floor(c.sampleRate * dur));
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    const src = c.createBufferSource();
    src.buffer = buf;
    const f = c.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.setValueAtTime(f0, t);
    f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f);
    f.connect(g);
    g.connect(this.master);
    src.start(t);
  }

  step(): void {
    this.tone(90, 0.04, 'sine', 0.12);
  }
  blocked(): void {
    this.tone(70, 0.09, 'triangle', 0.18, 50);
  }
  fold(down: boolean): void {
    const [a, b] = down ? [180, 60] : [60, 180];
    this.tone(a, 0.6, 'sawtooth', 0.07, b, 0, 0.02, 900);
    this.tone(a * 1.01, 0.6, 'sawtooth', 0.05, b * 1.01, 0, 0.02, 900);
  }
  crystal(): void {
    [660, 880, 1320].forEach((f, i) => this.tone(f, 0.35, 'sine', 0.12, undefined, i * 0.07));
  }
  shard(): void {
    [988, 1318, 1760, 2093].forEach((f, i) => this.tone(f, 0.5, 'sine', 0.07, undefined, i * 0.08));
  }
  click(): void {
    this.noise(0.04, 0.12, 2400, 800);
    this.tone(220, 0.08, 'square', 0.04);
  }
  portal(): void {
    this.noise(0.3, 0.1, 300, 2400);
    this.tone(330, 0.3, 'sine', 0.08, 660);
  }
  door(): void {
    this.tone(110, 0.4, 'sine', 0.2, 70);
  }
  hint(): void {
    this.tone(1040, 0.5, 'sine', 0.1);
    this.tone(1560, 0.4, 'sine', 0.04, undefined, 0.04);
  }
  undo(): void {
    this.tone(300, 0.1, 'triangle', 0.08, 200);
  }
  complete(): void {
    [220, 277.18, 329.63, 415.3].forEach((f, i) => this.tone(f, 1.8, 'sine', 0.1, undefined, i * 0.04, 0.04));
    this.tone(880, 1.4, 'sine', 0.04, undefined, 0.2, 0.05);
  }
  ui(): void {
    this.tone(520, 0.05, 'sine', 0.06);
  }

  /** Quiet two-drone bed with sparse pentatonic plucks. Root changes per chapter. */
  startAmbient(chapter: number): void {
    this.chapter = chapter;
    this.stopAmbient();
    const c = this.ctx;
    if (!c || !this.master) return;
    const root = [55, 73.42, 43.65][chapter % 3];
    const gain = c.createGain();
    gain.gain.value = 0.035;
    gain.connect(this.master);
    const lfo = c.createOscillator();
    const lfoGain = c.createGain();
    lfo.frequency.value = 0.07;
    lfoGain.gain.value = 0.015;
    lfo.connect(lfoGain);
    lfoGain.connect(gain.gain);
    const o1 = c.createOscillator();
    const o2 = c.createOscillator();
    o1.type = 'sine';
    o2.type = 'sine';
    o1.frequency.value = root;
    o2.frequency.value = root * 1.5;
    o1.connect(gain);
    o2.connect(gain);
    lfo.start();
    o1.start();
    o2.start();
    this.ambient = {
      stop: () => {
        try {
          o1.stop();
          o2.stop();
          lfo.stop();
          gain.disconnect();
        } catch {
          /* ignore */
        }
      },
    };
    const scale = [0, 2, 4, 7, 9];
    const pluck = (): void => {
      const n = scale[Math.floor(Math.random() * scale.length)];
      const f = root * 4 * Math.pow(2, n / 12);
      this.tone(f, 2.2, 'sine', 0.03, undefined, 0, 0.02);
      this.pluckTimer = window.setTimeout(pluck, 6000 + Math.random() * 6000);
    };
    this.pluckTimer = window.setTimeout(pluck, 3000);
  }

  stopAmbient(): void {
    if (this.pluckTimer !== null) window.clearTimeout(this.pluckTimer);
    this.pluckTimer = null;
    this.ambient?.stop();
    this.ambient = null;
  }

  get currentChapter(): number {
    return this.chapter;
  }
}
