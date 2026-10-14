/**
 * UNFALL's sound. The score is synthesized once into an AudioBuffer (with an
 * OfflineAudioContext) plus a reversed copy; holding the lens hands playback to
 * the reversed copy at the mirrored position, so the music literally runs
 * backward from the moment you grab time. Everything is generated — no files.
 */
const NOTE = (m: number) => 440 * Math.pow(2, (m - 69) / 12);
const BPM = 76;
const BEAT = 60 / BPM;
const BARS = 8;
const LOOP = BARS * 4 * BEAT;
// D minor drift: Dm9 · B♭maj7 · Fmaj7 · C6sus — two passes.
const CHORDS = [
  [50, 57, 60, 64, 65], [46, 53, 57, 62, 65], [41, 53, 57, 60, 64], [48, 55, 60, 62, 67],
];

async function renderScore(sampleRate: number): Promise<AudioBuffer> {
  const len = Math.ceil(LOOP * sampleRate);
  const ctx = new OfflineAudioContext(2, len, sampleRate);
  const master = ctx.createGain();
  master.gain.value = 0.55;
  const verbIn = ctx.createGain();
  const delay = ctx.createDelay(2);
  delay.delayTime.value = BEAT * 0.75;
  const fb = ctx.createGain();
  fb.gain.value = 0.42;
  const wet = ctx.createGain();
  wet.gain.value = 0.35;
  verbIn.connect(delay).connect(fb).connect(delay);
  delay.connect(wet).connect(master);
  master.connect(ctx.destination);

  const env = (g: GainNode, t: number, a: number, peak: number, d: number) => {
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(peak, t + a);
    g.gain.exponentialRampToValueAtTime(0.0001, t + a + d);
  };

  for (let bar = 0; bar < BARS; bar++) {
    const chord = CHORDS[bar % 4];
    const t0 = bar * 4 * BEAT;
    // Pad: detuned saws through a slow low-pass swell.
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(500, t0);
    lp.frequency.linearRampToValueAtTime(1300, t0 + 2 * BEAT);
    lp.frequency.linearRampToValueAtTime(600, t0 + 4 * BEAT);
    const pg = ctx.createGain();
    pg.gain.setValueAtTime(0.0001, t0);
    pg.gain.linearRampToValueAtTime(0.06, t0 + 1.2);
    pg.gain.linearRampToValueAtTime(0.0001, t0 + 4 * BEAT + 0.4);
    lp.connect(pg);
    pg.connect(master);
    pg.connect(verbIn);
    for (const n of chord.slice(1, 4)) {
      for (const det of [-7, 6]) {
        const o = ctx.createOscillator();
        o.type = 'sawtooth';
        o.frequency.value = NOTE(n);
        o.detune.value = det;
        o.connect(lp);
        o.start(t0);
        o.stop(t0 + 4 * BEAT + 0.5);
      }
    }
    // Sub bass on beats 1 and 3.
    for (const b of [0, 2]) {
      const t = t0 + b * BEAT;
      const o = ctx.createOscillator();
      o.frequency.value = NOTE(chord[0] - 12);
      const g = ctx.createGain();
      env(g, t, 0.02, 0.22, BEAT * 1.7);
      o.connect(g).connect(master);
      o.start(t);
      o.stop(t + BEAT * 2);
    }
    // Glassy arpeggio, sparse: like a music box left running.
    const pattern = [4, 2, 3, 1, 4, 3, 2, 0];
    for (let i = 0; i < 8; i++) {
      if ((bar + i) % 3 === 2) continue;
      const t = t0 + i * BEAT * 0.5;
      const o = ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.value = NOTE(chord[pattern[i]] + 12);
      const g = ctx.createGain();
      env(g, t, 0.004, 0.07, 0.9);
      o.connect(g);
      g.connect(master);
      g.connect(verbIn);
      o.start(t);
      o.stop(t + 1.1);
    }
    // Clock tick on every beat.
    for (let b = 0; b < 4; b++) {
      const t = t0 + b * BEAT;
      const o = ctx.createOscillator();
      o.type = 'square';
      o.frequency.value = b === 0 ? 2400 : 1800;
      const g = ctx.createGain();
      env(g, t, 0.001, 0.02, 0.025);
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.value = 1500;
      o.connect(hp).connect(g).connect(master);
      o.start(t);
      o.stop(t + 0.05);
    }
  }
  return ctx.startRendering();
}

function reversed(ctx: BaseAudioContext, buf: AudioBuffer): AudioBuffer {
  const out = ctx.createBuffer(buf.numberOfChannels, buf.length, buf.sampleRate);
  for (let c = 0; c < buf.numberOfChannels; c++) {
    const src = buf.getChannelData(c);
    const dst = out.getChannelData(c);
    for (let i = 0, n = src.length; i < n; i++) dst[i] = src[n - 1 - i];
  }
  return out;
}

interface Voice { src: AudioBufferSourceNode; gain: GainNode; startedAt: number; offset: number; reverse: boolean }

export class Audio {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private music!: GainNode;
  private sfx!: GainNode;
  private forward: AudioBuffer | null = null;
  private backward: AudioBuffer | null = null;
  private voice: Voice | null = null;
  private noise!: AudioBuffer;
  private rewindBed: { gain: GainNode; filter: BiquadFilterNode } | null = null;
  private hushBed: GainNode | null = null;
  private reversedNow = false;
  private settings = { music: 0.6, sfx: 0.8, muted: false };
  private playing = false;

  get available(): boolean {
    return this.ctx !== null;
  }

  /** Call from a user gesture. Safe to call repeatedly. */
  unlock(): void {
    if (!this.ctx) {
      try {
        this.ctx = new AudioContext();
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
    comp.threshold.value = -16;
    this.master = ctx.createGain();
    this.master.connect(comp).connect(ctx.destination);
    this.music = ctx.createGain();
    this.sfx = ctx.createGain();
    this.music.connect(this.master);
    this.sfx.connect(this.master);
    this.noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;

    // Continuous beds: tape-rewind whoosh and the hiss of the Hush.
    const rw = ctx.createBufferSource();
    rw.buffer = this.noise;
    rw.loop = true;
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.value = 900;
    bp.Q.value = 2.5;
    const rg = ctx.createGain();
    rg.gain.value = 0;
    rw.connect(bp).connect(rg).connect(this.sfx);
    rw.start();
    this.rewindBed = { gain: rg, filter: bp };
    const hs = ctx.createBufferSource();
    hs.buffer = this.noise;
    hs.loop = true;
    const hlp = ctx.createBiquadFilter();
    hlp.type = 'highpass';
    hlp.frequency.value = 3000;
    const hg = ctx.createGain();
    hg.gain.value = 0;
    hs.connect(hlp).connect(hg).connect(this.sfx);
    hs.start(0, 0.5);
    this.hushBed = hg;

    this.apply();
    renderScore(ctx.sampleRate)
      .then((buf) => {
        this.forward = buf;
        this.backward = reversed(ctx, buf);
        if (this.playing) this.startVoice(false, 0);
      })
      .catch(() => { /* score unavailable: the game stays playable in silence */ });
  }

  setSettings(s: { music: number; sfx: number; muted: boolean }): void {
    this.settings = { ...s };
    this.apply();
  }

  private apply(): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(this.settings.muted ? 0 : 1, t, 0.03);
    this.music.gain.setTargetAtTime(this.settings.music * 0.9, t, 0.05);
    this.sfx.gain.setTargetAtTime(this.settings.sfx, t, 0.05);
  }

  startMusic(): void {
    this.playing = true;
    if (this.forward && !this.voice) this.startVoice(false, 0);
  }

  /** Position in the *forward* score, in seconds. */
  private position(): number {
    const v = this.voice;
    if (!v || !this.ctx) return 0;
    const p = (v.offset + (this.ctx.currentTime - v.startedAt) * v.src.playbackRate.value) % LOOP;
    return v.reverse ? LOOP - p : p;
  }

  private startVoice(reverse: boolean, forwardPos: number): void {
    const ctx = this.ctx!;
    const buf = reverse ? this.backward : this.forward;
    if (!buf) return;
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    src.playbackRate.value = reverse ? 1.35 : 1;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.0001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(1, ctx.currentTime + 0.08);
    src.connect(gain).connect(this.music);
    const offset = ((reverse ? LOOP - forwardPos : forwardPos) % LOOP + LOOP) % LOOP;
    src.start(0, offset);
    const old = this.voice;
    if (old) {
      old.gain.gain.setTargetAtTime(0.0001, ctx.currentTime, 0.03);
      old.src.stop(ctx.currentTime + 0.2);
    }
    this.voice = { src, gain, startedAt: ctx.currentTime, offset, reverse };
  }

  /** Per frame: lens state drives the reversed score and the rewind bed. */
  update(lensActive: boolean, hushProximity: number): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    if (this.forward && this.playing && lensActive !== this.reversedNow) {
      this.reversedNow = lensActive;
      this.startVoice(lensActive, this.position());
    }
    if (this.rewindBed) {
      this.rewindBed.gain.gain.setTargetAtTime(lensActive ? 0.09 : 0, t, lensActive ? 0.05 : 0.12);
      this.rewindBed.filter.frequency.setTargetAtTime(lensActive ? 1800 : 500, t, 0.4);
    }
    this.hushBed?.gain.setTargetAtTime(Math.min(0.12, hushProximity * 0.12), t, 0.2);
  }

  // ------------------------------------------------------------------ SFX
  private tone(type: OscillatorType, f0: number, f1: number, dur: number, vol: number, pan = 0, delay = 0): void {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime + delay;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(f0, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const p = ctx.createStereoPanner();
    p.pan.value = Math.max(-1, Math.min(1, pan));
    o.connect(g).connect(p).connect(this.sfx);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  private burst(freq: number, q: number, dur: number, vol: number, pan = 0, type: BiquadFilterType = 'lowpass'): void {
    if (!this.ctx) return;
    const ctx = this.ctx;
    const t = ctx.currentTime;
    const s = ctx.createBufferSource();
    s.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    const p = ctx.createStereoPanner();
    p.pan.value = Math.max(-1, Math.min(1, pan));
    s.connect(f).connect(g).connect(p).connect(this.sfx);
    s.start(t, Math.random());
    s.stop(t + dur + 0.05);
  }

  shake(pan: number): void { this.burst(180, 1, 0.35, 0.12, pan); }
  fall(pan: number): void { this.tone('sine', 120, 40, 0.5, 0.25, pan); this.burst(400, 0.7, 0.4, 0.18, pan); }
  /** Rising glass chime: a piece of the world un-falls. */
  restore(pan: number): void { this.tone('triangle', 660, 990, 0.25, 0.09, pan); this.tone('sine', 1320, 1760, 0.3, 0.04, pan, 0.05); }
  signFall(pan: number): void { this.burst(2400, 0.8, 0.25, 0.1, pan, 'bandpass'); }
  signLand(pan: number): void { this.tone('square', 90, 45, 0.35, 0.16, pan); this.burst(900, 0.6, 0.5, 0.2, pan); }
  slam(pan: number): void { this.tone('sine', 70, 35, 0.4, 0.4, pan); this.burst(300, 0.8, 0.25, 0.2, pan); }
  spark(pan: number): void { [0, 0.07, 0.14].forEach((d, i) => this.tone('triangle', NOTE(81 + i * 4), NOTE(81 + i * 4), 0.35, 0.07, pan, d)); }
  death(): void { this.tone('triangle', 880, 110, 1.1, 0.14); this.burst(5000, 0.5, 0.8, 0.08, 0, 'highpass'); }
  revive(): void { this.tone('triangle', 220, 880, 0.5, 0.1); }
  empty(): void { this.tone('square', 300, 150, 0.25, 0.08); }
  win(): void { [0, 0.12, 0.24, 0.42].forEach((d, i) => this.tone('triangle', NOTE([74, 77, 81, 86][i]), NOTE([74, 77, 81, 86][i]), 0.9, 0.08, 0, d)); }
  ui(): void { this.tone('sine', 1200, 1500, 0.06, 0.05); }
  /** The big ending swell. */
  dawn(): void { CHORDS[0].forEach((n, i) => this.tone('sine', NOTE(n + 12), NOTE(n + 12), 5, 0.05, (i - 2) * 0.3, i * 0.2)); }

  dispose(): void {
    void this.ctx?.close();
    this.ctx = null;
  }
}
