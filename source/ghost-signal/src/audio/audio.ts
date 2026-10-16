// Web Audio synthesis only. Nothing is created before the first user gesture.
type Ctx = AudioContext;

export class Sound {
  private ctx: Ctx | null = null;
  private master: GainNode | null = null;
  private drone: GainNode | null = null;
  private volume = 0.6;
  private muted = false;

  setVolume(v: number): void { this.volume = Math.max(0, Math.min(1, v)); this.apply(); }
  setMuted(m: boolean): void { this.muted = m; this.apply(); }
  get isMuted(): boolean { return this.muted; }

  /** Call from a user gesture handler. Safe to call repeatedly. */
  unlock(): void {
    try {
      if (!this.ctx) {
        const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
        if (!AC) return;
        this.ctx = new AC();
        this.master = this.ctx.createGain();
        this.master.connect(this.ctx.destination);
        this.startDrone();
        this.apply();
      }
      if (this.ctx.state === 'suspended') void this.ctx.resume();
    } catch { /* audio unavailable */ }
  }

  private apply(): void {
    if (!this.master || !this.ctx) return;
    this.master.gain.setTargetAtTime(this.muted ? 0 : this.volume * 0.7, this.ctx.currentTime, 0.05);
  }

  private startDrone(): void {
    const c = this.ctx!;
    const g = c.createGain();
    g.gain.value = 0.18;
    const lp = c.createBiquadFilter();
    lp.type = 'lowpass'; lp.frequency.value = 340;
    const lfo = c.createOscillator(); const lg = c.createGain();
    lfo.frequency.value = 0.07; lg.gain.value = 120;
    lfo.connect(lg); lg.connect(lp.frequency); lfo.start();
    for (const [f, d] of [[55, -4], [55.4, 5], [82.5, 2]] as const) {
      const o = c.createOscillator(); o.type = f > 80 ? 'triangle' : 'sawtooth'; o.frequency.value = f; o.detune.value = d;
      const og = c.createGain(); og.gain.value = f > 80 ? 0.25 : 0.4;
      o.connect(og); og.connect(lp); o.start();
    }
    // rain-ish noise bed
    const len = c.sampleRate * 2;
    const buf = c.createBuffer(1, len, c.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * 0.5;
    const n = c.createBufferSource(); n.buffer = buf; n.loop = true;
    const bp = c.createBiquadFilter(); bp.type = 'bandpass'; bp.frequency.value = 2400; bp.Q.value = 0.4;
    const ng = c.createGain(); ng.gain.value = 0.05;
    n.connect(bp); bp.connect(ng); ng.connect(g);
    lp.connect(g); g.connect(this.master!);
    n.start();
    this.drone = g;
  }

  private tone(freq: number, dur: number, type: OscillatorType, gain: number, when = 0, slideTo?: number): void {
    if (!this.ctx || !this.master) return;
    const c = this.ctx; const t = c.currentTime + when;
    const o = c.createOscillator(); const g = c.createGain();
    o.type = type; o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(gain, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g); g.connect(this.master); o.start(t); o.stop(t + dur + 0.05);
  }

  private noise(dur: number, gain: number, freq: number, when = 0): void {
    if (!this.ctx || !this.master) return;
    const c = this.ctx; const t = c.currentTime + when;
    const len = Math.max(1, Math.floor(c.sampleRate * dur));
    const buf = c.createBuffer(1, len, c.sampleRate); const d = buf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / len);
    const s = c.createBufferSource(); s.buffer = buf;
    const f = c.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = freq; f.Q.value = 1.2;
    const g = c.createGain(); g.gain.value = gain;
    s.connect(f); f.connect(g); g.connect(this.master); s.start(t);
  }

  blip(): void { this.tone(780, 0.05, 'triangle', 0.12); }
  select(): void { this.tone(520, 0.07, 'triangle', 0.14); this.tone(780, 0.07, 'triangle', 0.1, 0.05); }
  collect(): void { this.tone(660, 0.12, 'sine', 0.2); this.tone(990, 0.2, 'sine', 0.16, 0.09); }
  notify(): void { this.tone(440, 0.1, 'square', 0.05); this.tone(554, 0.12, 'square', 0.05, 0.08); }
  deny(): void { this.tone(190, 0.18, 'sawtooth', 0.1, 0, 120); }
  contradiction(): void { this.noise(0.35, 0.28, 1800); this.tone(520, 0.45, 'sawtooth', 0.09, 0.02, 130); }
  revelation(): void { this.noise(0.6, 0.3, 900); this.tone(110, 1.4, 'sawtooth', 0.14, 0.05, 55); this.tone(330, 1.0, 'sine', 0.12, 0.3); }
  ending(kind: 'good' | 'bad' | 'neutral'): void {
    const chords: Record<string, number[]> = { good: [392, 494, 587], bad: [220, 262, 311], neutral: [294, 370, 440] };
    chords[kind].forEach((f, i) => this.tone(f, 2.2, 'sine', 0.13, i * 0.18));
  }
  get ready(): boolean { return !!this.ctx && this.drone !== null; }
}
