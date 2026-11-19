import type { ProjectileKind } from '../sim/content.ts';

const NOTE = (n: number) => 440 * Math.pow(2, (n - 69) / 12);
// D minor → B♭ → F → C (MIDI roots and chord tones).
const CHORDS = [
  { root: 38, tones: [62, 65, 69] },
  { root: 34, tones: [58, 62, 65] },
  { root: 41, tones: [60, 65, 69] },
  { root: 36, tones: [60, 64, 67] },
];

/**
 * Fully procedural Web Audio: spatialised one-shots (PannerNode, listener on
 * the camera), a continuous engine voice for the player's tank, UI blips and a
 * lookahead-scheduled synth loop. Nothing is loaded from the network.
 */
export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private sfx!: GainNode;
  private music!: GainNode;
  private noise!: AudioBuffer;
  private engine: { a: OscillatorNode; b: OscillatorNode; filter: BiquadFilterNode; gain: GainNode } | null = null;
  private hum: { osc: OscillatorNode; gain: GainNode; pan: PannerNode } | null = null;
  private scheduler: number | null = null;
  private nextTime = 0;
  private step = 0;
  private masterVol = 0.8;
  private sfxVol = 0.85;
  private musicVol = 0.45;
  private muted = false;
  private intensity = 0.4;
  private lastHitTick = 0;
  private voices = 0;

  get ready(): boolean {
    return !!this.ctx && this.ctx.state === 'running';
  }

  /** Must run inside a user gesture. Safe to call repeatedly. */
  unlock(): void {
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!Ctor) return;
      try {
        this.ctx = new Ctor();
      } catch {
        return;
      }
      this.build();
    }
    if (this.ctx.state === 'suspended') void this.ctx.resume().catch(() => undefined);
  }

  private build(): void {
    const ctx = this.ctx!;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -12;
    comp.ratio.value = 5;
    this.master = ctx.createGain();
    this.master.connect(comp).connect(ctx.destination);
    this.sfx = ctx.createGain();
    this.music = ctx.createGain();
    this.sfx.connect(this.master);
    this.music.connect(this.master);
    this.noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
    this.applyVolumes();
    this.startMusic();
  }

  setVolumes(master: number, sfx: number, music: number, muted: boolean): void {
    this.masterVol = master;
    this.sfxVol = sfx;
    this.musicVol = music;
    this.muted = muted;
    this.applyVolumes();
  }

  private applyVolumes(): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(this.muted ? 0 : this.masterVol, t, 0.05);
    this.sfx.gain.setTargetAtTime(this.sfxVol, t, 0.05);
    this.music.gain.setTargetAtTime(this.musicVol * 0.5, t, 0.2);
  }

  /** Suspend everything while the tab is hidden. */
  suspend(hidden: boolean): void {
    if (!this.ctx) return;
    if (hidden) void this.ctx.suspend().catch(() => undefined);
    else void this.ctx.resume().catch(() => undefined);
  }

  setListener(x: number, y: number, z: number, fx: number, fy: number, fz: number): void {
    if (!this.ctx) return;
    const l = this.ctx.listener;
    if (l.positionX) {
      const t = this.ctx.currentTime;
      l.positionX.setTargetAtTime(x, t, 0.02);
      l.positionY.setTargetAtTime(y, t, 0.02);
      l.positionZ.setTargetAtTime(z, t, 0.02);
      l.forwardX.setTargetAtTime(fx, t, 0.02);
      l.forwardY.setTargetAtTime(fy, t, 0.02);
      l.forwardZ.setTargetAtTime(fz, t, 0.02);
      l.upX.value = 0; l.upY.value = 1; l.upZ.value = 0;
    } else {
      l.setPosition(x, y, z);
      l.setOrientation(fx, fy, fz, 0, 1, 0);
    }
  }

  /** Music density: 0 = menu, 1 = heavy combat. */
  setIntensity(v: number): void {
    this.intensity = Math.max(0, Math.min(1, v));
  }

  // ------------------------------------------------------------ building blocks

  /** Output node for a sound: spatial when a position is given, else straight to the bus. */
  private out(pos: { x: number; y: number; z: number } | null, gain: number): GainNode | null {
    if (!this.ctx || this.ctx.state !== 'running') return null;
    if (this.voices > 48) return null;
    const ctx = this.ctx;
    const g = ctx.createGain();
    g.gain.value = gain;
    if (pos) {
      const p = ctx.createPanner();
      p.panningModel = 'equalpower';
      p.distanceModel = 'inverse';
      p.refDistance = 9;
      p.maxDistance = 220;
      p.rolloffFactor = 1.1;
      if (p.positionX) { p.positionX.value = pos.x; p.positionY.value = pos.y; p.positionZ.value = pos.z; }
      else p.setPosition(pos.x, pos.y, pos.z);
      g.connect(p).connect(this.sfx);
    } else g.connect(this.sfx);
    this.voices++;
    window.setTimeout(() => { this.voices--; g.disconnect(); }, 2600);
    return g;
  }

  private tone(dest: AudioNode, type: OscillatorType, f0: number, f1: number, t0: number, dur: number, vol: number, attack = 0.005): void {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(f0, t0);
    o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(vol, t0 + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g).connect(dest);
    o.start(t0);
    o.stop(t0 + dur + 0.05);
  }

  private burst(dest: AudioNode, type: BiquadFilterType, f0: number, f1: number, t0: number, dur: number, vol: number, q = 1): void {
    const ctx = this.ctx!;
    const s = ctx.createBufferSource();
    s.buffer = this.noise;
    s.playbackRate.value = 0.8 + Math.random() * 0.4;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.Q.value = q;
    f.frequency.setValueAtTime(f0, t0);
    f.frequency.exponentialRampToValueAtTime(Math.max(30, f1), t0 + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t0);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    s.connect(f).connect(g).connect(dest);
    s.start(t0, Math.random() * 1.5);
    s.stop(t0 + dur + 0.05);
  }

  // ------------------------------------------------------------ combat

  fire(kind: ProjectileKind, pos: { x: number; y: number; z: number }, own: boolean): void {
    const o = this.out(own ? null : pos, own ? 0.9 : 1);
    if (!o) return;
    const t = this.ctx!.currentTime;
    switch (kind) {
      case 'plasma':
        this.tone(o, 'sawtooth', 520, 90, t, 0.22, 0.35);
        this.tone(o, 'sine', 160, 50, t, 0.25, 0.5);
        this.burst(o, 'lowpass', 3000, 300, t, 0.18, 0.4);
        break;
      case 'rail':
        this.tone(o, 'square', 1800, 120, t, 0.4, 0.22);
        this.tone(o, 'sine', 90, 30, t, 0.5, 0.7);
        this.burst(o, 'highpass', 6000, 1200, t, 0.35, 0.5);
        break;
      case 'volt':
        this.tone(o, 'square', 900 + Math.random() * 300, 420, t, 0.05, 0.13);
        this.burst(o, 'bandpass', 4000, 2500, t, 0.05, 0.18, 4);
        break;
      case 'nova':
        this.burst(o, 'bandpass', 900, 200, t, 0.45, 0.5, 1.2);
        this.tone(o, 'triangle', 240, 80, t, 0.3, 0.3);
        break;
    }
  }

  charge(own: boolean, pos: { x: number; y: number; z: number }): void {
    const o = this.out(own ? null : pos, 0.6);
    if (!o) return;
    const t = this.ctx!.currentTime;
    this.tone(o, 'sine', 300, 2200, t, 0.36, 0.2, 0.3);
  }

  impact(kind: ProjectileKind, pos: { x: number; y: number; z: number }, onTank: boolean): void {
    if (kind === 'nova') return;
    const o = this.out(pos, kind === 'volt' ? 0.4 : 0.8);
    if (!o) return;
    const t = this.ctx!.currentTime;
    if (onTank) {
      this.tone(o, 'square', 340, 140, t, 0.12, 0.2);
      this.burst(o, 'bandpass', 2400, 900, t, 0.14, 0.45, 2);
    } else {
      this.burst(o, 'lowpass', 2200, 200, t, 0.2, 0.4);
    }
  }

  explosion(pos: { x: number; y: number; z: number }, big: boolean): void {
    const o = this.out(pos, big ? 1.4 : 1);
    if (!o) return;
    const t = this.ctx!.currentTime;
    this.burst(o, 'lowpass', big ? 1600 : 2400, 60, t, big ? 1.6 : 0.8, 1);
    this.tone(o, 'sine', big ? 90 : 120, 28, t, big ? 1.1 : 0.6, 0.9);
  }

  /** Player landed a hit (rate-limited UI tick). */
  hitConfirm(kill: boolean): void {
    const o = this.out(null, 0.6);
    if (!o) return;
    const t = this.ctx!.currentTime;
    if (kill) {
      this.tone(o, 'triangle', 880, 880, t, 0.09, 0.4);
      this.tone(o, 'triangle', 1320, 1320, t + 0.08, 0.16, 0.4);
      return;
    }
    if (t - this.lastHitTick < 0.06) return;
    this.lastHitTick = t;
    this.tone(o, 'square', 1500, 1300, t, 0.04, 0.16);
  }

  damageTaken(amount: number, low: boolean): void {
    const o = this.out(null, Math.min(1, 0.3 + amount / 60));
    if (!o) return;
    const t = this.ctx!.currentTime;
    this.tone(o, 'sine', 140, 50, t, 0.25, 0.8);
    this.burst(o, 'lowpass', 900, 100, t, 0.2, 0.6);
    if (low) this.tone(o, 'square', 620, 620, t + 0.05, 0.12, 0.08);
  }

  pickup(kind: string): void {
    const o = this.out(null, 0.6);
    if (!o) return;
    const t = this.ctx!.currentTime;
    const base = kind === 'repair' ? 60 : kind === 'overdrive' ? 64 : 67;
    [0, 4, 7, 12].forEach((n, i) => this.tone(o, 'triangle', NOTE(base + n + 12), NOTE(base + n + 12), t + i * 0.05, 0.16, 0.3));
  }

  ability(kind: string, pos: { x: number; y: number; z: number }, own: boolean): void {
    const o = this.out(own ? null : pos, 0.9);
    if (!o) return;
    const t = this.ctx!.currentTime;
    if (kind === 'dash') {
      this.burst(o, 'bandpass', 600, 3000, t, 0.5, 0.6, 1.5);
      this.tone(o, 'sawtooth', 120, 400, t, 0.4, 0.2);
    } else if (kind === 'aegis') {
      this.tone(o, 'sine', 220, 660, t, 0.5, 0.4, 0.05);
      this.tone(o, 'triangle', 330, 990, t + 0.05, 0.5, 0.25, 0.05);
    } else {
      this.burst(o, 'lowpass', 1200, 40, t, 1.2, 1);
      this.tone(o, 'sine', 70, 25, t, 0.9, 1);
    }
  }

  reload(done: boolean): void {
    const o = this.out(null, 0.4);
    if (!o) return;
    const t = this.ctx!.currentTime;
    if (done) {
      this.burst(o, 'bandpass', 3000, 2000, t, 0.05, 0.6, 6);
      this.burst(o, 'bandpass', 2000, 1500, t + 0.08, 0.06, 0.6, 6);
    } else this.burst(o, 'bandpass', 1500, 900, t, 0.08, 0.4, 4);
  }

  overheat(): void {
    const o = this.out(null, 0.5);
    if (!o) return;
    const t = this.ctx!.currentTime;
    this.burst(o, 'highpass', 3000, 6000, t, 0.7, 0.5);
    this.tone(o, 'square', 300, 150, t, 0.3, 0.12);
  }

  ui(kind: 'hover' | 'click' | 'confirm' | 'back' | 'deny'): void {
    const o = this.out(null, 0.35);
    if (!o) return;
    const t = this.ctx!.currentTime;
    if (kind === 'hover') this.tone(o, 'sine', 1400, 1400, t, 0.03, 0.08);
    else if (kind === 'click') this.tone(o, 'triangle', 900, 700, t, 0.06, 0.25);
    else if (kind === 'confirm') { this.tone(o, 'triangle', 660, 660, t, 0.08, 0.3); this.tone(o, 'triangle', 990, 990, t + 0.07, 0.12, 0.3); }
    else if (kind === 'back') this.tone(o, 'triangle', 600, 400, t, 0.1, 0.25);
    else { this.tone(o, 'square', 200, 160, t, 0.12, 0.15); this.tone(o, 'square', 200, 160, t + 0.13, 0.12, 0.15); }
  }

  countdown(n: number): void {
    const o = this.out(null, 0.6);
    if (!o) return;
    const t = this.ctx!.currentTime;
    if (n > 0) this.tone(o, 'square', 660, 660, t, 0.14, 0.18);
    else {
      this.tone(o, 'sawtooth', 220, 220, t, 0.7, 0.25, 0.02);
      this.tone(o, 'sawtooth', 330, 330, t, 0.7, 0.2, 0.02);
      this.tone(o, 'square', 1320, 1320, t, 0.25, 0.12);
    }
  }

  matchEnd(win: boolean): void {
    const o = this.out(null, 0.7);
    if (!o) return;
    const t = this.ctx!.currentTime;
    const seq = win ? [62, 65, 69, 74] : [62, 60, 57, 50];
    seq.forEach((n, i) => this.tone(o, 'triangle', NOTE(n), NOTE(n), t + i * 0.16, i === 3 ? 0.9 : 0.2, 0.35));
  }

  capture(friendly: boolean): void {
    const o = this.out(null, 0.6);
    if (!o) return;
    const t = this.ctx!.currentTime;
    const seq = friendly ? [69, 74, 78] : [69, 65, 62];
    seq.forEach((n, i) => this.tone(o, 'square', NOTE(n), NOTE(n), t + i * 0.1, 0.14, 0.14));
  }

  // ------------------------------------------------------------ engine

  /** Player engine: speed 0..1, load 0..1 (throttle), boosting. Pass null to stop. */
  setEngine(state: { speed: number; load: number; boost: boolean; heavy: number } | null): void {
    if (!this.ctx || this.ctx.state !== 'running') return;
    const ctx = this.ctx;
    if (!state) {
      if (this.engine) {
        const e = this.engine;
        e.gain.gain.setTargetAtTime(0, ctx.currentTime, 0.1);
        window.setTimeout(() => { try { e.a.stop(); e.b.stop(); } catch { /* already stopped */ } }, 500);
        this.engine = null;
      }
      return;
    }
    if (!this.engine) {
      const a = ctx.createOscillator();
      const b = ctx.createOscillator();
      a.type = 'sawtooth';
      b.type = 'square';
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.Q.value = 2;
      const gain = ctx.createGain();
      gain.gain.value = 0;
      a.connect(filter);
      b.connect(filter);
      filter.connect(gain).connect(this.sfx);
      a.start();
      b.start();
      this.engine = { a, b, filter, gain };
    }
    const e = this.engine;
    const t = ctx.currentTime;
    const base = 38 - state.heavy * 10;
    const f = base + state.speed * 55 + state.load * 10 + (state.boost ? 25 : 0);
    e.a.frequency.setTargetAtTime(f, t, 0.08);
    e.b.frequency.setTargetAtTime(f * 0.5, t, 0.08);
    e.filter.frequency.setTargetAtTime(240 + state.speed * 700 + state.load * 300 + (state.boost ? 900 : 0), t, 0.1);
    e.gain.gain.setTargetAtTime(0.08 + state.load * 0.06 + state.speed * 0.05, t, 0.1);
  }

  /** A shared hum placed on the nearest other tank so enemies are heard approaching. */
  setNearbyEngine(pos: { x: number; y: number; z: number } | null, speed: number): void {
    if (!this.ctx || this.ctx.state !== 'running') return;
    const ctx = this.ctx;
    if (!this.hum) {
      const osc = ctx.createOscillator();
      osc.type = 'sawtooth';
      const f = ctx.createBiquadFilter();
      f.type = 'lowpass';
      f.frequency.value = 380;
      const gain = ctx.createGain();
      gain.gain.value = 0;
      const pan = ctx.createPanner();
      pan.panningModel = 'equalpower';
      pan.distanceModel = 'inverse';
      pan.refDistance = 8;
      pan.rolloffFactor = 1.3;
      osc.connect(f).connect(gain).connect(pan).connect(this.sfx);
      osc.start();
      this.hum = { osc, gain, pan };
    }
    const h = this.hum;
    const t = ctx.currentTime;
    if (!pos) { h.gain.gain.setTargetAtTime(0, t, 0.2); return; }
    if (h.pan.positionX) {
      h.pan.positionX.setTargetAtTime(pos.x, t, 0.05);
      h.pan.positionY.setTargetAtTime(pos.y, t, 0.05);
      h.pan.positionZ.setTargetAtTime(pos.z, t, 0.05);
    } else h.pan.setPosition(pos.x, pos.y, pos.z);
    h.osc.frequency.setTargetAtTime(32 + speed * 40, t, 0.1);
    h.gain.gain.setTargetAtTime(0.1 + speed * 0.08, t, 0.15);
  }

  // ------------------------------------------------------------ music

  private startMusic(): void {
    if (!this.ctx || this.scheduler !== null) return;
    this.nextTime = this.ctx.currentTime + 0.1;
    this.scheduler = window.setInterval(() => this.schedule(), 50);
  }

  private schedule(): void {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== 'running') return;
    const sixteenth = 60 / 104 / 4;
    while (this.nextTime < ctx.currentTime + 0.15) {
      this.playStep(this.step, this.nextTime);
      this.nextTime += sixteenth;
      this.step = (this.step + 1) % 256;
    }
  }

  private playStep(step: number, t: number): void {
    const ctx = this.ctx!;
    const chord = CHORDS[Math.floor(step / 64) % 4];
    const s16 = step % 16;
    const busy = this.intensity;
    const m = this.music;
    // Bass: driving eighths.
    if (s16 % 2 === 0) {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const f = ctx.createBiquadFilter();
      o.type = 'sawtooth';
      o.frequency.value = NOTE(chord.root + (s16 === 6 || s16 === 14 ? 12 : 0));
      f.type = 'lowpass';
      f.frequency.setValueAtTime(300 + busy * 500, t);
      f.frequency.exponentialRampToValueAtTime(120, t + 0.18);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.22, t + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.2);
      o.connect(f).connect(g).connect(m);
      o.start(t);
      o.stop(t + 0.25);
    }
    // Pad at the top of each chord.
    if (step % 64 === 0) {
      for (const n of chord.tones) {
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.type = 'triangle';
        o.frequency.value = NOTE(n);
        o.detune.value = (Math.random() - 0.5) * 12;
        g.gain.setValueAtTime(0.0001, t);
        g.gain.linearRampToValueAtTime(0.05, t + 0.8);
        g.gain.linearRampToValueAtTime(0.0001, t + 4.4);
        o.connect(g).connect(m);
        o.start(t);
        o.stop(t + 4.5);
      }
    }
    // Drums scale with intensity.
    if (s16 === 0 || s16 === 8 || (busy > 0.6 && s16 === 10)) {
      this.tone(m, 'sine', 120, 40, t, 0.22, 0.5 + busy * 0.3);
    }
    if (busy > 0.25 && (s16 === 4 || s16 === 12)) this.burst(m, 'bandpass', 1800, 900, t, 0.14, 0.18 + busy * 0.12, 0.8);
    if (s16 % 2 === 1 && busy > 0.15) this.burst(m, 'highpass', 8000, 7000, t, 0.03, 0.05 + busy * 0.05);
    // Arp in combat.
    if (busy > 0.5 && s16 % 2 === 0) {
      const n = chord.tones[(s16 / 2) % chord.tones.length] + 12;
      this.tone(m, 'square', NOTE(n), NOTE(n), t, 0.09, 0.03);
    }
  }

  dispose(): void {
    if (this.scheduler !== null) window.clearInterval(this.scheduler);
    this.scheduler = null;
    void this.ctx?.close().catch(() => undefined);
    this.ctx = null;
    this.engine = null;
    this.hum = null;
  }
}
