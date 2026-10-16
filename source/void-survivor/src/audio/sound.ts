// Web Audio synthesis: sound effects and a small generative music loop. No audio files.
import type { World } from '../sim/types.ts';

type Ctor = typeof AudioContext;

const MAX_VOICES = 14;

export class Sound {
  private ctx: AudioContext | null = null;
  private master: GainNode | null = null;
  private music: GainNode | null = null;
  private noiseBuf: AudioBuffer | null = null;
  private voices = 0;
  volume = 0.6;
  muted = false;
  musicOn = false;
  private step = 0;
  private nextTime = 0;
  private timer: number | null = null;
  private wave = 1;
  private duck = false;
  private last: Record<string, number> = {};

  /** Must be called from a user gesture. Safe to call repeatedly. */
  init(): void {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') void this.ctx.resume();
      return;
    }
    try {
      const AC: Ctor | undefined = window.AudioContext ?? (window as unknown as { webkitAudioContext?: Ctor }).webkitAudioContext;
      if (!AC) return;
      this.ctx = new AC();
      this.master = this.ctx.createGain();
      this.master.connect(this.ctx.destination);
      this.music = this.ctx.createGain();
      this.music.connect(this.master);
      this.applyGain();
      const n = this.ctx.sampleRate * 0.6;
      this.noiseBuf = this.ctx.createBuffer(1, n, this.ctx.sampleRate);
      const d = this.noiseBuf.getChannelData(0);
      let s = 12345;
      for (let i = 0; i < n; i++) {
        s = (s * 1664525 + 1013904223) >>> 0;
        d[i] = (s / 4294967296) * 2 - 1;
      }
    } catch {
      this.ctx = null;
    }
  }

  setVolume(v: number): void {
    this.volume = v;
    this.applyGain();
  }

  setMuted(m: boolean): void {
    this.muted = m;
    this.applyGain();
  }

  setDuck(d: boolean): void {
    this.duck = d;
    this.applyGain();
  }

  private applyGain(): void {
    if (!this.master || !this.music || !this.ctx) return;
    const t = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume * 0.7, t, 0.02);
    this.music.gain.setTargetAtTime(this.duck ? 0.12 : 0.3, t, 0.1);
  }

  private tone(freq: number, dur: number, type: OscillatorType, vol: number, slideTo?: number, delay = 0): void {
    const c = this.ctx;
    if (!c || !this.master || this.muted || this.voices >= MAX_VOICES) return;
    const t = c.currentTime + delay;
    const o = c.createOscillator();
    const g = c.createGain();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(Math.max(20, slideTo), t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g);
    g.connect(this.master);
    this.voices++;
    o.onended = () => {
      this.voices--;
    };
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  private noise(dur: number, vol: number, freq: number, delay = 0): void {
    const c = this.ctx;
    if (!c || !this.master || !this.noiseBuf || this.muted || this.voices >= MAX_VOICES) return;
    const t = c.currentTime + delay;
    const s = c.createBufferSource();
    s.buffer = this.noiseBuf;
    const f = c.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(freq, t);
    f.frequency.exponentialRampToValueAtTime(Math.max(80, freq * 0.2), t + dur);
    const g = c.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    s.connect(f);
    f.connect(g);
    g.connect(this.master);
    this.voices++;
    s.onended = () => {
      this.voices--;
    };
    s.start(t);
    s.stop(t + dur + 0.02);
  }

  /** Rate-limit helper so a flood of events does not stack voices. */
  private gate(name: string, minGap: number): boolean {
    const now = performance.now();
    if (now - (this.last[name] ?? 0) < minGap) return false;
    this.last[name] = now;
    return true;
  }

  handle(w: World): void {
    if (!this.ctx || this.muted) return;
    this.wave = w.wave;
    for (const ev of w.events) {
      switch (ev.t) {
        case 'shot':
          if (this.gate('shot', 90)) this.tone(ev.a === 1 ? 300 : 620, 0.07, 'sawtooth', 0.05, ev.a === 1 ? 160 : 260);
          break;
        case 'hit':
          if (this.gate('hit', 45)) this.tone(180 + Math.random() * 40, 0.04, 'square', 0.04);
          break;
        case 'kill':
          if (this.gate('kill', 40)) this.tone(300 + Math.min(900, w.chain * 25), 0.09, 'triangle', 0.07, 120);
          break;
        case 'mote':
          if (this.gate('mote', 55)) this.tone(880 + Math.random() * 200, 0.05, 'sine', 0.035);
          break;
        case 'shard':
          this.tone(1040, 0.08, 'sine', 0.07);
          this.tone(1560, 0.12, 'sine', 0.06, undefined, 0.07);
          break;
        case 'chest':
          for (let i = 0; i < 4; i++) this.tone(520 * Math.pow(1.26, i), 0.14, 'triangle', 0.08, undefined, i * 0.06);
          break;
        case 'hurt':
          this.noise(0.18, 0.2, 1800);
          this.tone(140, 0.2, 'square', 0.1, 60);
          break;
        case 'levelup':
          for (let i = 0; i < 4; i++) this.tone(440 * Math.pow(1.335, i), 0.22, 'triangle', 0.09, undefined, i * 0.07);
          break;
        case 'fieldUp':
          this.tone(300, 0.25, 'sine', 0.07, 700);
          break;
        case 'absorb':
          if (this.gate('absorb', 60)) this.tone(900, 0.06, 'sine', 0.05, 500);
          break;
        case 'fieldBreak':
          this.noise(0.3, 0.16, 3000);
          this.tone(500, 0.3, 'sawtooth', 0.07, 100);
          break;
        case 'detonate':
          this.noise(0.6, 0.35, 2600);
          this.tone(160, 0.55, 'sawtooth', 0.14, 35);
          break;
        case 'beam':
          if (this.gate('beam', 100)) this.tone(1200, 0.14, 'sawtooth', 0.05, 300);
          break;
        case 'arc':
          if (this.gate('arc', 100)) this.noise(0.12, 0.08, 6000);
          break;
        case 'shieldBlock':
          if (this.gate('block', 80)) this.tone(2000, 0.04, 'square', 0.03);
          break;
        case 'telegraph':
          if (this.gate('tele', 120)) this.tone(500, 0.1, 'sine', 0.03, 700);
          break;
        case 'bossWarn':
          for (let i = 0; i < 3; i++) this.tone(300, 0.4, 'sawtooth', 0.08, 700, i * 0.45);
          break;
        case 'bossPhase':
          this.tone(120, 0.7, 'sawtooth', 0.12, 400);
          break;
        case 'bossDown':
        case 'win':
          for (let i = 0; i < 6; i++) this.tone(330 * Math.pow(1.19, i), 0.3, 'triangle', 0.09, undefined, i * 0.09);
          break;
        case 'dead':
          this.noise(0.8, 0.3, 1400);
          this.tone(220, 0.9, 'sawtooth', 0.12, 40);
          break;
        case 'wave':
          if ((ev.a ?? 1) > 1) this.tone(660, 0.16, 'square', 0.05, 880);
          break;
        default:
          break;
      }
    }
  }

  click(): void {
    this.tone(700, 0.05, 'square', 0.05, 900);
  }

  // --- generative music (bass + arpeggio + hat) ---------------------------------------------

  startMusic(): void {
    if (!this.ctx || this.musicOn) return;
    this.musicOn = true;
    this.nextTime = this.ctx.currentTime + 0.1;
    this.step = 0;
    this.timer = window.setInterval(() => this.schedule(), 100);
  }

  stopMusic(): void {
    this.musicOn = false;
    if (this.timer !== null) window.clearInterval(this.timer);
    this.timer = null;
  }

  private schedule(): void {
    const c = this.ctx;
    if (!c || !this.music || !this.musicOn) return;
    const bpm = 118 + 2 * this.wave;
    const spb = 60 / bpm / 4;
    const root = [55, 55, 65.4, 49][Math.floor(this.step / 16) % 4];
    while (this.nextTime < c.currentTime + 0.25) {
      const s = this.step % 16;
      const t = this.nextTime;
      if (s % 4 === 0 || s === 10) this.mTone(root * (s === 10 ? 1.5 : 1), spb * 3, 'sawtooth', 0.22, t, 700);
      if (s % 2 === 0) this.mTone(root * 4 * [1, 1.5, 1.2, 1.8][(s / 2) % 4], spb * 1.5, 'square', 0.05, t, 2400);
      if (s % 2 === 1) this.mHat(t);
      this.nextTime += spb;
      this.step++;
    }
  }

  private mTone(freq: number, dur: number, type: OscillatorType, vol: number, t: number, cutoff: number): void {
    const c = this.ctx;
    if (!c || !this.music) return;
    const o = c.createOscillator();
    const f = c.createBiquadFilter();
    const g = c.createGain();
    o.type = type;
    o.frequency.value = freq;
    f.type = 'lowpass';
    f.frequency.value = cutoff;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(f);
    f.connect(g);
    g.connect(this.music);
    o.start(t);
    o.stop(t + dur + 0.02);
  }

  private mHat(t: number): void {
    const c = this.ctx;
    if (!c || !this.music || !this.noiseBuf) return;
    const s = c.createBufferSource();
    s.buffer = this.noiseBuf;
    const f = c.createBiquadFilter();
    f.type = 'highpass';
    f.frequency.value = 7000;
    const g = c.createGain();
    g.gain.setValueAtTime(0.06, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
    s.connect(f);
    f.connect(g);
    g.connect(this.music);
    s.start(t);
    s.stop(t + 0.05);
  }
}
