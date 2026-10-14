import type { WeaponId } from '../weapons/Weapon';

/**
 * Fully procedural audio: an original synthwave loop sequenced with Web Audio
 * lookahead scheduling, synthesized SFX, a continuous engine voice and ambient
 * ocean/city beds. The context is only created after a user gesture.
 */
const NOTE = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

// A minor → F → C → G (MIDI roots) with chord tones for pads/arps.
const CHORDS: Array<{ root: number; tones: number[] }> = [
  { root: 45, tones: [57, 60, 64, 69] },
  { root: 41, tones: [53, 57, 60, 65] },
  { root: 48, tones: [55, 60, 64, 67] },
  { root: 43, tones: [55, 59, 62, 67] },
];
const ARP_ORDER = [0, 1, 2, 3, 2, 1, 2, 3, 0, 2, 1, 3, 2, 1, 3, 2];
const LEAD = [76, -1, 74, 72, -1, 69, -1, 72, 74, -1, -1, 76, 79, -1, 76, -1]; // hook (per 2 bars, 8th notes)

export class AudioManager {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private musicBus!: GainNode;
  private sfxBus!: GainNode;
  private drumBus!: GainNode;
  private leadBus!: GainNode;
  private reverb!: ConvolverNode;
  private delay!: DelayNode;
  private noise!: AudioBuffer;
  private scheduler: number | null = null;
  private nextTime = 0;
  private step = 0;
  private engine: { osc1: OscillatorNode; osc2: OscillatorNode; filter: BiquadFilterNode; gain: GainNode } | null = null;
  private screech: { src: AudioBufferSourceNode; gain: GainNode } | null = null;
  private ambience: AudioNode[] = [];
  private musicVolume = 0.55;
  private sfxVolume = 0.8;
  private muted = false;
  private intensity = 0.3;
  private lastFoot = 0;

  get ready(): boolean {
    return this.ctx !== null && this.ctx.state === 'running';
  }

  /** Must be called from a user gesture (click / keydown). Safe to call repeatedly. */
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
    if (this.ctx.state === 'suspended') void this.ctx.resume();
  }

  private build(): void {
    const ctx = this.ctx!;
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 4;
    this.master = ctx.createGain();
    this.master.connect(comp).connect(ctx.destination);
    this.musicBus = ctx.createGain();
    this.sfxBus = ctx.createGain();
    this.musicBus.connect(this.master);
    this.sfxBus.connect(this.master);
    this.drumBus = ctx.createGain();
    this.drumBus.connect(this.musicBus);
    this.leadBus = ctx.createGain();
    this.leadBus.connect(this.musicBus);

    this.noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;

    // Generated plate-style reverb impulse.
    const len = ctx.sampleRate * 2.2;
    const ir = ctx.createBuffer(2, len, ctx.sampleRate);
    for (let c = 0; c < 2; c++) {
      const ch = ir.getChannelData(c);
      for (let i = 0; i < len; i++) ch[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3.2);
    }
    this.reverb = ctx.createConvolver();
    this.reverb.buffer = ir;
    const revGain = ctx.createGain();
    revGain.gain.value = 0.28;
    this.reverb.connect(revGain).connect(this.master);

    // Tempo-synced dotted-eighth delay for the arp.
    this.delay = ctx.createDelay(1);
    this.delay.delayTime.value = (60 / 104) * 0.75;
    const fb = ctx.createGain();
    fb.gain.value = 0.32;
    const delayOut = ctx.createGain();
    delayOut.gain.value = 0.35;
    this.delay.connect(fb).connect(this.delay);
    this.delay.connect(delayOut).connect(this.musicBus);

    this.applyVolumes();
    this.startAmbience();
  }

  setVolumes(music: number, sfx: number, muted: boolean): void {
    this.musicVolume = music;
    this.sfxVolume = sfx;
    this.muted = muted;
    this.applyVolumes();
  }

  private applyVolumes(): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(this.muted ? 0 : 1, t, 0.03);
    this.musicBus.gain.setTargetAtTime(this.musicVolume * 0.5, t, 0.05);
    this.sfxBus.gain.setTargetAtTime(this.sfxVolume, t, 0.05);
  }

  /** 0 = title (pads + arp), 1 = full combat arrangement. */
  setIntensity(v: number): void {
    this.intensity = v;
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.drumBus.gain.setTargetAtTime(0.25 + v * 0.75, t, 0.4);
    this.leadBus.gain.setTargetAtTime(v > 0.5 ? 0.8 : 0, t, 0.6);
  }

  startMusic(): void {
    if (!this.ctx || this.scheduler !== null) return;
    this.nextTime = this.ctx.currentTime + 0.1;
    this.step = 0;
    this.setIntensity(this.intensity);
    this.scheduler = window.setInterval(() => this.schedule(), 25);
  }

  stopMusic(): void {
    if (this.scheduler !== null) window.clearInterval(this.scheduler);
    this.scheduler = null;
  }

  private schedule(): void {
    const ctx = this.ctx!;
    const stepDur = 60 / 104 / 4;
    while (this.nextTime < ctx.currentTime + 0.15) {
      this.playStep(this.step, this.nextTime, stepDur);
      this.nextTime += stepDur;
      this.step = (this.step + 1) % 128;
    }
  }

  private playStep(step: number, t: number, dur: number): void {
    const bar = Math.floor(step / 16) % 4;
    const s = step % 16;
    const chord = CHORDS[bar];
    // Drums
    if (s % 4 === 0) this.kick(t);
    if (s === 4 || s === 12) this.snare(t);
    if (s % 2 === 1) this.hat(t, s % 4 === 3 ? 0.5 : 0.28);
    // Bass: driving eighths with octave pops.
    if (s % 2 === 0) this.bass(t, NOTE(chord.root - 12 + (s % 8 === 6 ? 12 : 0)), dur * 1.8);
    // Arp
    this.arp(t, NOTE(chord.tones[ARP_ORDER[s]] + 12), dur * 0.9);
    // Pad on each bar downbeat.
    if (s === 0) this.pad(t, chord.tones, dur * 16);
    // Lead hook every other 2-bar phrase.
    if (s % 2 === 0) {
      const phrase = Math.floor(step / 32) % 2;
      const idx = ((Math.floor(step / 16) % 2) * 8) + s / 2;
      const n = LEAD[idx];
      if (phrase === 1 && n > 0) this.lead(t, NOTE(n), dur * 1.9);
    }
  }

  private env(g: GainNode, t: number, a: number, peak: number, decay: number): void {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + decay);
  }

  private kick(t: number): void {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.frequency.setValueAtTime(140, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
    this.env(g, t, 0.003, 0.9, 0.28);
    o.connect(g).connect(this.drumBus);
    o.start(t);
    o.stop(t + 0.35);
  }

  private snare(t: number): void {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = 1800;
    f.Q.value = 0.7;
    const g = ctx.createGain();
    this.env(g, t, 0.002, 0.55, 0.22);
    src.connect(f).connect(g);
    g.connect(this.drumBus);
    g.connect(this.reverb);
    src.start(t, Math.random());
    src.stop(t + 0.3);
    const o = ctx.createOscillator();
    const og = ctx.createGain();
    o.frequency.setValueAtTime(220, t);
    o.frequency.exponentialRampToValueAtTime(140, t + 0.08);
    this.env(og, t, 0.002, 0.25, 0.1);
    o.connect(og).connect(this.drumBus);
    o.start(t);
    o.stop(t + 0.15);
  }

  private hat(t: number, v: number): void {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = 'highpass';
    f.frequency.value = 8000;
    const g = ctx.createGain();
    this.env(g, t, 0.001, 0.12 * v, 0.04);
    src.connect(f).connect(g).connect(this.drumBus);
    src.start(t, Math.random());
    src.stop(t + 0.07);
  }

  private bass(t: number, freq: number, dur: number): void {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = freq;
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.setValueAtTime(900, t);
    f.frequency.exponentialRampToValueAtTime(220, t + dur);
    f.Q.value = 6;
    const g = ctx.createGain();
    this.env(g, t, 0.005, 0.32, dur);
    o.connect(f).connect(g).connect(this.musicBus);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  private arp(t: number, freq: number, dur: number): void {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.type = 'square';
    o.frequency.value = freq;
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 2400;
    const g = ctx.createGain();
    this.env(g, t, 0.004, 0.06, dur);
    o.connect(f).connect(g);
    g.connect(this.musicBus);
    g.connect(this.delay);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  private pad(t: number, tones: number[], dur: number): void {
    const ctx = this.ctx!;
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 1400;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.linearRampToValueAtTime(0.05, t + 0.6);
    g.gain.linearRampToValueAtTime(0.0001, t + dur);
    f.connect(g);
    g.connect(this.musicBus);
    g.connect(this.reverb);
    for (const n of tones.slice(0, 3)) {
      for (const det of [-9, 9]) {
        const o = ctx.createOscillator();
        o.type = 'sawtooth';
        o.frequency.value = NOTE(n);
        o.detune.value = det;
        o.connect(f);
        o.start(t);
        o.stop(t + dur + 0.1);
      }
    }
  }

  private lead(t: number, freq: number, dur: number): void {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.value = freq;
    const vib = ctx.createOscillator();
    vib.frequency.value = 5.5;
    const vg = ctx.createGain();
    vg.gain.value = 4;
    vib.connect(vg).connect(o.detune);
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = 2600;
    const g = ctx.createGain();
    this.env(g, t, 0.02, 0.07, dur);
    o.connect(f).connect(g);
    g.connect(this.leadBus);
    g.connect(this.reverb);
    o.start(t);
    vib.start(t);
    o.stop(t + dur + 0.1);
    vib.stop(t + dur + 0.1);
  }

  // ------------------------------------------------------------------ SFX
  private blip(type: OscillatorType, f0: number, f1: number, dur: number, vol: number, delay = 0, dest?: AudioNode): void {
    if (!this.ready) return;
    const ctx = this.ctx!;
    const t = ctx.currentTime + delay;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    const g = ctx.createGain();
    this.env(g, t, 0.003, vol, dur);
    o.connect(g).connect(dest ?? this.sfxBus);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  private hiss(freq: number, q: number, dur: number, vol: number, type: BiquadFilterType = 'bandpass', delay = 0, sweepTo?: number): void {
    if (!this.ready) return;
    const ctx = this.ctx!;
    const t = ctx.currentTime + delay;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.setValueAtTime(freq, t);
    if (sweepTo) f.frequency.exponentialRampToValueAtTime(sweepTo, t + dur);
    f.Q.value = q;
    const g = ctx.createGain();
    this.env(g, t, 0.002, vol, dur);
    src.connect(f).connect(g).connect(this.sfxBus);
    src.start(t, Math.random() * 1.5);
    src.stop(t + dur + 0.05);
  }

  shoot(id: WeaponId): void {
    if (id === 'pistol') {
      this.hiss(2600, 0.8, 0.09, 0.5, 'bandpass', 0, 600);
      this.blip('square', 900, 120, 0.12, 0.22);
      this.blip('sine', 160, 50, 0.1, 0.4);
    } else {
      this.blip('sawtooth', 1500, 300, 0.07, 0.16);
      this.hiss(4000, 1.2, 0.05, 0.3, 'bandpass', 0, 1500);
      this.blip('sine', 120, 45, 0.07, 0.28);
    }
  }

  dryFire(): void { this.blip('square', 1800, 1700, 0.03, 0.12); }

  reload(id: WeaponId): void {
    this.blip('square', 300, 260, 0.04, 0.15);
    this.hiss(3000, 3, 0.05, 0.2, 'bandpass', 0.12);
    this.blip('square', 520, 480, 0.04, 0.15, id === 'rifle' ? 0.5 : 0.3);
  }

  reloadDone(): void {
    this.blip('square', 700, 900, 0.05, 0.16);
    this.blip('square', 1100, 1300, 0.05, 0.12, 0.06);
  }

  switchWeapon(): void { this.blip('triangle', 600, 900, 0.06, 0.18); }

  hitMarker(head: boolean): void {
    this.blip('sine', head ? 2200 : 1500, head ? 2600 : 1300, 0.05, head ? 0.25 : 0.14);
    if (head) this.blip('sine', 3300, 3400, 0.08, 0.12, 0.04);
  }

  enemyDie(): void {
    this.blip('sawtooth', 600, 60, 0.4, 0.22);
    this.hiss(1200, 1, 0.3, 0.2, 'lowpass', 0, 200);
  }

  enemyShoot(dist: number): void {
    const v = Math.max(0.03, 0.22 * (1 - dist / 60));
    this.blip('sawtooth', 700, 180, 0.16, v);
  }

  melee(): void {
    this.hiss(400, 1, 0.15, 0.4, 'lowpass');
    this.blip('sine', 110, 40, 0.15, 0.5);
  }

  playerHurt(): void {
    this.blip('sawtooth', 220, 90, 0.18, 0.3);
    this.hiss(800, 1, 0.12, 0.25, 'lowpass');
  }

  footstep(run: boolean): void {
    if (!this.ready) return;
    const now = this.ctx!.currentTime;
    if (now - this.lastFoot < 0.12) return;
    this.lastFoot = now;
    this.hiss(run ? 900 : 700, 1.4, 0.06, run ? 0.16 : 0.1, 'bandpass', 0, 250);
  }

  jump(): void { this.hiss(600, 1, 0.1, 0.12, 'bandpass', 0, 1400); }
  land(): void { this.blip('sine', 120, 50, 0.1, 0.3); this.hiss(500, 1, 0.08, 0.15, 'lowpass'); }

  pickup(kind: string): void {
    const base = kind === 'health' ? 660 : kind === 'armor' ? 520 : kind === 'boost' ? 440 : kind === 'cash' ? 990 : 780;
    this.blip('triangle', base, base * 1.5, 0.08, 0.2);
    this.blip('triangle', base * 1.5, base * 2, 0.1, 0.18, 0.07);
  }

  uiClick(): void { this.blip('triangle', 900, 1200, 0.05, 0.14); }
  uiHover(): void { this.blip('sine', 1400, 1500, 0.03, 0.05); }

  spawnWhoosh(): void { this.hiss(300, 2, 0.6, 0.12, 'bandpass', 0, 2400); }

  missionStart(): void {
    [0, 0.12, 0.24].forEach((d, i) => this.blip('square', NOTE(69 + i * 5), NOTE(69 + i * 5), 0.14, 0.14, d));
    this.blip('sawtooth', NOTE(81), NOTE(81), 0.4, 0.12, 0.36);
  }

  waveClear(): void {
    [0, 0.1, 0.2, 0.3].forEach((d, i) => this.blip('triangle', NOTE(72 + [0, 4, 7, 12][i]), NOTE(72 + [0, 4, 7, 12][i]), 0.18, 0.18, d));
  }

  missionComplete(): void {
    [0, 0.15, 0.3, 0.45, 0.7].forEach((d, i) => this.blip('sawtooth', NOTE([69, 72, 76, 81, 84][i]), NOTE([69, 72, 76, 81, 84][i]), 0.35, 0.14, d));
  }

  gameOver(): void {
    [0, 0.25, 0.5].forEach((d, i) => this.blip('sawtooth', NOTE([64, 60, 57][i]), NOTE([63, 59, 45][i]), 0.4, 0.18, d));
  }

  combo(level: number): void { this.blip('sine', 600 + level * 120, 900 + level * 160, 0.08, 0.1); }

  crash(intensity: number): void {
    this.hiss(500, 0.8, 0.25, Math.min(0.6, 0.15 + intensity * 0.02), 'lowpass', 0, 120);
    this.blip('square', 140, 50, 0.2, Math.min(0.35, intensity * 0.02));
  }

  honk(): void {
    this.blip('square', 392, 390, 0.32, 0.06);
    this.blip('square', 494, 492, 0.32, 0.05);
  }

  carDoor(): void {
    this.blip('square', 180, 90, 0.08, 0.25);
    this.hiss(1200, 2, 0.06, 0.15, 'bandpass', 0.05);
  }

  /** Continuous engine voice: call each frame while driving. */
  setEngine(active: boolean, speed: number, throttle: number, slip: number): void {
    if (!this.ready) return;
    const ctx = this.ctx!;
    if (active && !this.engine) {
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc2.type = 'square';
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 600;
      const gain = ctx.createGain();
      gain.gain.value = 0;
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain).connect(this.sfxBus);
      osc1.start();
      osc2.start();
      this.engine = { osc1, osc2, filter, gain };
      const src = ctx.createBufferSource();
      src.buffer = this.noise;
      src.loop = true;
      const bp = ctx.createBiquadFilter();
      bp.type = 'bandpass';
      bp.frequency.value = 2400;
      bp.Q.value = 3;
      const sg = ctx.createGain();
      sg.gain.value = 0;
      src.connect(bp).connect(sg).connect(this.sfxBus);
      src.start();
      this.screech = { src, gain: sg };
    }
    if (!active) {
      if (this.engine) {
        const e = this.engine;
        e.gain.gain.setTargetAtTime(0, ctx.currentTime, 0.08);
        e.osc1.stop(ctx.currentTime + 0.4);
        e.osc2.stop(ctx.currentTime + 0.4);
        this.engine = null;
      }
      if (this.screech) {
        this.screech.gain.gain.setTargetAtTime(0, ctx.currentTime, 0.05);
        this.screech.src.stop(ctx.currentTime + 0.3);
        this.screech = null;
      }
      return;
    }
    const e = this.engine!;
    const t = ctx.currentTime;
    // Fake gearbox: rpm climbs within each gear band.
    const gears = [0, 9, 17, 25, 33, 60];
    let g = 0;
    while (g < gears.length - 2 && Math.abs(speed) > gears[g + 1]) g++;
    const span = gears[g + 1] - gears[g];
    const rpm = 0.25 + 0.75 * ((Math.abs(speed) - gears[g]) / span);
    const f = 38 + rpm * 70 + g * 6;
    e.osc1.frequency.setTargetAtTime(f, t, 0.05);
    e.osc2.frequency.setTargetAtTime(f * 0.5, t, 0.05);
    e.filter.frequency.setTargetAtTime(400 + throttle * 1400 + rpm * 600, t, 0.08);
    e.gain.gain.setTargetAtTime(0.08 + Math.abs(throttle) * 0.07, t, 0.08);
    this.screech!.gain.gain.setTargetAtTime(Math.min(0.22, Math.max(0, slip - 2.5) * 0.04), t, 0.05);
  }

  private startAmbience(): void {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    src.loop = true;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.value = 500;
    const g = ctx.createGain();
    g.gain.value = 0.05;
    const lfo = ctx.createOscillator();
    lfo.frequency.value = 0.12;
    const lg = ctx.createGain();
    lg.gain.value = 0.035;
    lfo.connect(lg).connect(g.gain);
    src.connect(lp).connect(g).connect(this.sfxBus);
    src.start();
    lfo.start();
    this.ambience.push(src, lfo);
  }

  dispose(): void {
    this.stopMusic();
    this.setEngine(false, 0, 0, 0);
    for (const n of this.ambience) (n as AudioScheduledSourceNode).stop();
    void this.ctx?.close();
    this.ctx = null;
  }
}
