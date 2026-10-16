/** Procedural audio: engine, effects and a small synthwave loop. Everything is synthesised; no files. */
type Ctx = AudioContext;

export class AudioEngine {
  private ctx: Ctx | null = null;
  private master: GainNode | null = null;
  private sfx: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private noise: AudioBuffer | null = null;
  private engA: OscillatorNode | null = null;
  private engB: OscillatorNode | null = null;
  private engF: BiquadFilterNode | null = null;
  private engG: GainNode | null = null;
  private windG: GainNode | null = null;
  private windF: BiquadFilterNode | null = null;
  private timer = 0;
  private nextStep = 0;
  private step = 0;
  private root = 110;
  private musicOn = true;
  private musicRunning = false;
  private ducked = false;
  volume = 0.7;
  muted = false;
  available = typeof window !== 'undefined' && !!(window.AudioContext || (window as unknown as { webkitAudioContext?: unknown }).webkitAudioContext);

  /** Call from a user gesture. Safe to call repeatedly. */
  ensure(): void {
    if (!this.available) return;
    try {
      if (!this.ctx) {
        const AC = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AC();
        this.ctx = ctx;
        const comp = ctx.createDynamicsCompressor();
        comp.threshold.value = -14;
        comp.ratio.value = 4;
        this.master = ctx.createGain();
        this.sfx = ctx.createGain();
        this.musicGain = ctx.createGain();
        this.sfx.connect(this.master);
        this.musicGain.connect(this.master);
        this.master.connect(comp).connect(ctx.destination);
        const len = ctx.sampleRate;
        const buf = ctx.createBuffer(1, len, ctx.sampleRate);
        const d = buf.getChannelData(0);
        for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
        this.noise = buf;
        this.applyGains();
        this.buildEngine();
      }
      if (this.ctx.state === 'suspended') void this.ctx.resume();
    } catch {
      this.available = false;
    }
  }

  private applyGains(): void {
    if (!this.ctx || !this.master || !this.musicGain || !this.sfx) return;
    const t = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume, t, 0.03);
    this.sfx.gain.value = 1;
    this.musicGain.gain.setTargetAtTime(this.musicOn ? (this.ducked ? 0.12 : 0.38) : 0, t, 0.1);
  }

  setVolume(v: number): void {
    this.volume = Math.max(0, Math.min(1, v));
    this.applyGains();
  }

  setMuted(m: boolean): void {
    this.muted = m;
    this.applyGains();
  }

  setMusic(on: boolean): void {
    this.musicOn = on;
    this.applyGains();
  }

  duck(on: boolean): void {
    this.ducked = on;
    this.applyGains();
  }

  suspend(): void {
    if (this.ctx && this.ctx.state === 'running') void this.ctx.suspend();
  }

  resume(): void {
    if (this.ctx && this.ctx.state === 'suspended') void this.ctx.resume();
  }

  // ---------- engine ----------
  private buildEngine(): void {
    const ctx = this.ctx;
    if (!ctx || !this.sfx || !this.noise) return;
    this.engA = ctx.createOscillator();
    this.engB = ctx.createOscillator();
    this.engA.type = 'sawtooth';
    this.engB.type = 'square';
    this.engF = ctx.createBiquadFilter();
    this.engF.type = 'lowpass';
    this.engF.frequency.value = 500;
    this.engG = ctx.createGain();
    this.engG.gain.value = 0;
    this.engA.connect(this.engF);
    this.engB.connect(this.engF);
    this.engF.connect(this.engG).connect(this.sfx);
    this.engA.start();
    this.engB.start();
    const w = ctx.createBufferSource();
    w.buffer = this.noise;
    w.loop = true;
    this.windF = ctx.createBiquadFilter();
    this.windF.type = 'bandpass';
    this.windF.frequency.value = 800;
    this.windF.Q.value = 0.6;
    this.windG = ctx.createGain();
    this.windG.gain.value = 0;
    w.connect(this.windF).connect(this.windG).connect(this.sfx);
    w.start();
  }

  /** Per-frame engine update. `active` false silences it (menus, pause). */
  engine(speedPct: number, throttle: boolean, boosting: boolean, active: boolean): void {
    if (!this.ctx || !this.engA || !this.engB || !this.engF || !this.engG || !this.windG || !this.windF) return;
    const t = this.ctx.currentTime;
    const sp = Math.max(0, Math.min(1.5, speedPct));
    const f = (55 + sp * 210) * (boosting ? 1.2 : 1);
    this.engA.frequency.setTargetAtTime(f, t, 0.05);
    this.engB.frequency.setTargetAtTime(f * 1.5, t, 0.05);
    this.engF.frequency.setTargetAtTime(500 + sp * 2200, t, 0.08);
    const g = active ? 0.04 + (throttle ? 0.05 : 0) + sp * 0.03 : 0;
    this.engG.gain.setTargetAtTime(g, t, 0.06);
    this.windG.gain.setTargetAtTime(active ? sp * sp * 0.1 : 0, t, 0.1);
    this.windF.frequency.setTargetAtTime(500 + sp * 1800, t, 0.1);
  }

  // ---------- effects ----------
  private tone(freq: number, dur: number, type: OscillatorType, vol: number, when = 0, slideTo?: number): void {
    const ctx = this.ctx;
    if (!ctx || !this.sfx) return;
    const t = ctx.currentTime + when;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(this.sfx);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  private burst(dur: number, vol: number, f0: number, f1: number, type: BiquadFilterType, q = 1): void {
    const ctx = this.ctx;
    if (!ctx || !this.sfx || !this.noise) return;
    const t = ctx.currentTime;
    const s = ctx.createBufferSource();
    s.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.Q.value = q;
    f.frequency.setValueAtTime(f0, t);
    f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f).connect(g).connect(this.sfx);
    s.start(t, Math.random() * 0.5);
    s.stop(t + dur + 0.02);
  }

  blip(kind: 'move' | 'ok' | 'back'): void {
    this.tone(kind === 'move' ? 660 : kind === 'ok' ? 990 : 330, 0.06, 'square', 0.05);
  }

  countdown(n: number): void {
    this.tone(n === 0 ? 880 : 440, n === 0 ? 0.5 : 0.18, 'square', 0.09);
  }

  boost(): void {
    this.burst(0.6, 0.35, 400, 3200, 'bandpass', 1.2);
    this.tone(180, 0.4, 'sawtooth', 0.05, 0, 520);
  }

  thud(intensity: number): void {
    this.tone(140, 0.25, 'sine', 0.25 + intensity * 0.3, 0, 40);
    this.burst(0.18 + intensity * 0.12, 0.2 + intensity * 0.25, 1800, 160, 'lowpass');
  }

  scrape(intensity: number): void {
    this.burst(0.09, 0.05 + intensity * 0.06, 3200, 5200, 'highpass');
  }

  chime(): void {
    this.tone(880, 0.25, 'sine', 0.12);
    this.tone(1320, 0.3, 'sine', 0.1, 0.07);
  }

  lap(): void {
    this.tone(660, 0.2, 'triangle', 0.14);
    this.tone(990, 0.2, 'triangle', 0.14, 0.1);
    this.tone(1320, 0.4, 'triangle', 0.14, 0.2);
  }

  gateOpen(): void {
    this.tone(523, 0.18, 'triangle', 0.12);
    this.tone(659, 0.18, 'triangle', 0.12, 0.07);
    this.tone(784, 0.3, 'triangle', 0.12, 0.14);
  }

  gateSealed(): void {
    this.tone(90, 0.45, 'sawtooth', 0.2, 0, 50);
    this.tone(97, 0.45, 'square', 0.1, 0, 55);
  }

  finish(good: boolean): void {
    const notes = good ? [523, 659, 784, 1046] : [392, 349, 330, 294];
    notes.forEach((n, i) => this.tone(n, 0.3, 'triangle', 0.14, i * 0.12));
  }

  // ---------- music ----------
  startMusic(root: number): void {
    this.root = root;
    if (!this.ctx || this.musicRunning) return;
    this.musicRunning = true;
    this.step = 0;
    this.nextStep = this.ctx.currentTime + 0.08;
    this.timer = window.setInterval(() => this.schedule(), 40);
  }

  stopMusic(): void {
    window.clearInterval(this.timer);
    this.musicRunning = false;
  }

  private schedule(): void {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== 'running') return;
    const stepDur = 60 / 118 / 4;
    while (this.nextStep < ctx.currentTime + 0.15) {
      this.note(this.step, this.nextStep);
      this.nextStep += stepDur;
      this.step = (this.step + 1) % 64;
    }
  }

  private note(step: number, t: number): void {
    const ctx = this.ctx;
    if (!ctx || !this.musicGain || !this.noise) return;
    const bar = Math.floor(step / 16) % 4;
    const chord = [0, 3, 5, 7][bar];
    const s16 = step % 16;
    const hz = (semi: number): number => this.root * Math.pow(2, semi / 12);
    const voice = (f: number, type: OscillatorType, dur: number, vol: number, cutoff: number): void => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const fl = ctx.createBiquadFilter();
      fl.type = 'lowpass';
      fl.frequency.value = cutoff;
      o.type = type;
      o.frequency.value = f;
      g.gain.setValueAtTime(vol, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
      o.connect(fl).connect(g).connect(this.musicGain!);
      o.start(t);
      o.stop(t + dur + 0.02);
    };
    if (s16 % 2 === 0) voice(hz(chord - 12), 'sawtooth', 0.22, 0.2, 700);
    const arp = [0, 7, 12, 15, 12, 7, 10, 7];
    if (s16 % 2 === 1 || s16 % 4 === 0) voice(hz(chord + arp[s16 % 8]), 'triangle', 0.16, 0.1, 3000);
    if (s16 % 4 === 0) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      o.frequency.setValueAtTime(130, t);
      o.frequency.exponentialRampToValueAtTime(40, t + 0.12);
      g.gain.setValueAtTime(0.4, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.16);
      o.connect(g).connect(this.musicGain);
      o.start(t);
      o.stop(t + 0.2);
    }
    if (s16 % 4 === 2) {
      const s = ctx.createBufferSource();
      s.buffer = this.noise;
      const f = ctx.createBiquadFilter();
      f.type = 'highpass';
      f.frequency.value = 7000;
      const g = ctx.createGain();
      g.gain.setValueAtTime(0.06, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
      s.connect(f).connect(g).connect(this.musicGain);
      s.start(t, Math.random() * 0.5);
      s.stop(t + 0.07);
    }
  }
}
