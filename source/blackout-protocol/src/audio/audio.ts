import type { WorldEvent } from '../sim/types.ts';

/** Web Audio synthesis only. The context is created lazily after the first user gesture. */
export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private sfx: GainNode | null = null;
  private music: GainNode | null = null;
  private noiseBuf: AudioBuffer | null = null;
  private hum: { osc: OscillatorNode; gain: GainNode } | null = null;
  private drone: { a: OscillatorNode; b: OscillatorNode; pulse: GainNode; filter: BiquadFilterNode } | null = null;
  private volume = 0.7;
  private muted = false;
  private lastStep = 0;
  private musicOn = false;

  /** Call from a user gesture handler (key press, click). */
  ensure(): void {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') void this.ctx.resume().catch(() => undefined);
      return;
    }
    try {
      const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.sfx = this.ctx.createGain();
      this.music = this.ctx.createGain();
      this.sfx.gain.value = 0.9;
      this.music.gain.value = 0.35;
      const comp = this.ctx.createDynamicsCompressor();
      this.sfx.connect(this.master);
      this.music.connect(this.master);
      this.master.connect(comp);
      comp.connect(this.ctx.destination);
      const len = this.ctx.sampleRate;
      this.noiseBuf = this.ctx.createBuffer(1, len, this.ctx.sampleRate);
      const d = this.noiseBuf.getChannelData(0);
      for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
      this.applyVolume();
      if (this.musicOn) this.startMusic();
    } catch {
      this.ctx = null;
    }
  }

  setVolume(v: number, muted: boolean): void {
    this.volume = v;
    this.muted = muted;
    this.applyVolume();
  }

  private applyVolume(): void {
    if (!this.master || !this.ctx) return;
    this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume * 0.5, this.ctx.currentTime, 0.02);
  }

  private tone(freq: number, dur: number, type: OscillatorType = 'sine', vol = 0.2, slideTo?: number, delay = 0): void {
    if (!this.ctx || !this.sfx) return;
    const t = this.ctx.currentTime + delay;
    const o = this.ctx.createOscillator();
    const g = this.ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(this.sfx);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  private noise(dur: number, vol: number, f0: number, f1: number, delay = 0): void {
    if (!this.ctx || !this.sfx || !this.noiseBuf) return;
    const t = this.ctx.currentTime + delay;
    const s = this.ctx.createBufferSource();
    s.buffer = this.noiseBuf;
    const f = this.ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.setValueAtTime(f0, t);
    f.frequency.exponentialRampToValueAtTime(f1, t + dur);
    const g = this.ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f);
    f.connect(g);
    g.connect(this.sfx);
    s.start(t, Math.random() * 0.5, dur + 0.05);
  }

  /** Map a simulation event to a sound. */
  play(e: WorldEvent): void {
    if (!this.ctx) return;
    switch (e.k) {
      case 'step': {
        const now = this.ctx.currentTime;
        if (now - this.lastStep < 0.08) return;
        this.lastStep = now;
        this.noise(0.06, e.v ? 0.05 : 0.14, 700, 220);
        break;
      }
      case 'suspicious': this.tone(420, 0.28, 'sine', 0.16, 780); break;
      case 'alert':
        for (let i = 0; i < 4; i++) this.tone(i % 2 ? 660 : 440, 0.16, 'sawtooth', 0.14, undefined, i * 0.17);
        break;
      case 'search': this.tone(300, 0.3, 'triangle', 0.1, 220); break;
      case 'spot': this.tone(900, 0.12, 'square', 0.12); this.tone(600, 0.2, 'square', 0.12, undefined, 0.13); break;
      case 'laser': this.tone(1200, 0.35, 'sawtooth', 0.16, 300); this.noise(0.3, 0.2, 3000, 400); break;
      case 'hack': this.tone(220, 0.25, 'square', 0.1, 880); this.tone(880, 0.1, 'sine', 0.1, undefined, 0.25); break;
      case 'cycle': this.tone(660, 0.05, 'square', 0.07); break;
      case 'deny': this.tone(160, 0.2, 'square', 0.12, 110); break;
      case 'pickup': this.tone(660, 0.1, 'sine', 0.15); this.tone(990, 0.16, 'sine', 0.15, undefined, 0.09); break;
      case 'door': this.noise(0.25, 0.12, 300, 1200); break;
      case 'locker': this.tone(110, 0.14, 'triangle', 0.2, 70); break;
      case 'decoy': this.tone(500, 0.2, 'sine', 0.14, 1000); break;
      case 'ping': this.tone(1320, 0.12, 'sine', 0.1); this.tone(1320, 0.12, 'sine', 0.06, undefined, 0.14); break;
      case 'lure': break;
      case 'puzzleStart': this.tone(520, 0.08, 'square', 0.08); this.tone(780, 0.08, 'square', 0.08, undefined, 0.09); break;
      case 'puzzleKey': this.tone(600 + (e.v ?? 0) * 70, 0.07, 'square', 0.09); break;
      case 'puzzleBad': this.tone(120, 0.3, 'sawtooth', 0.14, 80); break;
      case 'puzzleOk': [523, 659, 784, 1047].forEach((f, i) => this.tone(f, 0.14, 'triangle', 0.14, undefined, i * 0.08)); break;
      case 'puzzleFail': this.tone(110, 0.45, 'sawtooth', 0.16, 55); this.noise(0.4, 0.18, 2000, 200); break;
      case 'checkpoint': this.tone(440, 0.12, 'sine', 0.12); this.tone(660, 0.18, 'sine', 0.12, undefined, 0.1); break;
      case 'objective': this.tone(784, 0.14, 'triangle', 0.14); this.tone(1047, 0.2, 'triangle', 0.14, undefined, 0.1); break;
      case 'finale': this.tone(80, 1.2, 'sawtooth', 0.2, 40); this.noise(1.0, 0.25, 4000, 100); break;
      case 'countdown': this.tone(1000, 0.07, 'square', 0.1); break;
      case 'complete': [392, 523, 659, 784].forEach((f, i) => this.tone(f, 0.4, 'triangle', 0.14, undefined, i * 0.12)); break;
      case 'compromised': this.tone(300, 0.7, 'sawtooth', 0.2, 60); break;
      default: break;
    }
  }

  uiClick(): void { this.tone(540, 0.05, 'square', 0.06); }

  startMusic(): void {
    this.musicOn = true;
    if (!this.ctx || !this.music || this.drone) return;
    const c = this.ctx;
    const filter = c.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.value = 400;
    const pulse = c.createGain();
    pulse.gain.value = 0.5;
    const a = c.createOscillator();
    const b = c.createOscillator();
    a.type = 'sawtooth'; b.type = 'triangle';
    a.frequency.value = 55; b.frequency.value = 82.4;
    const ga = c.createGain(); ga.gain.value = 0.35;
    const gb = c.createGain(); gb.gain.value = 0.45;
    a.connect(ga); b.connect(gb); ga.connect(filter); gb.connect(filter);
    filter.connect(pulse); pulse.connect(this.music);
    a.start(); b.start();
    this.drone = { a, b, pulse, filter };
  }

  stopMusic(): void {
    this.musicOn = false;
    if (this.drone) {
      try { this.drone.a.stop(); this.drone.b.stop(); } catch { /* already stopped */ }
      this.drone = null;
    }
    this.setHum(0);
  }

  /** Per-frame ambience: alert drives the drone brightness and pulse speed, laser proximity drives the hum. */
  ambience(alert: number, laserNear: number, time: number, reduce: boolean): void {
    if (!this.ctx) return;
    if (this.drone) {
      const a = Math.min(1, alert / 100);
      this.drone.filter.frequency.setTargetAtTime(280 + a * 900, this.ctx.currentTime, 0.2);
      const rate = 0.6 + a * 3.2;
      this.drone.pulse.gain.setTargetAtTime(reduce ? 0.5 : 0.5 + 0.35 * Math.sin(time * rate * 2), this.ctx.currentTime, 0.05);
    }
    this.setHum(laserNear);
  }

  private setHum(level: number): void {
    if (!this.ctx || !this.sfx) return;
    if (!this.hum && level > 0.01) {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const f = this.ctx.createBiquadFilter();
      f.type = 'lowpass'; f.frequency.value = 500;
      osc.type = 'sawtooth'; osc.frequency.value = 110;
      gain.gain.value = 0;
      osc.connect(f); f.connect(gain); gain.connect(this.sfx);
      osc.start();
      this.hum = { osc, gain };
    }
    if (this.hum) this.hum.gain.gain.setTargetAtTime(level * 0.09, this.ctx.currentTime, 0.1);
  }
}
