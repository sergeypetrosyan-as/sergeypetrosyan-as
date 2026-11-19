import type { Music } from '../world/Level';

/**
 * Everything you hear is synthesized live with Web Audio: no files, no samples.
 * The context is created on the first click or key, as browsers require.
 */
export type Sfx =
  | 'jump' | 'double-jump' | 'land' | 'volt' | 'shard' | 'token' | 'repair' | 'shield' | 'overdrive' | 'stomp' | 'hurt'
  | 'shield-break' | 'die' | 'checkpoint' | 'secret' | 'bump' | 'prize' | 'spring' | 'terminal' | 'crusher' | 'hop' | 'shot'
  | 'boss-intro' | 'boss-hit' | 'boss-defeat' | 'boss-shot' | 'boss-slam' | 'clang' | 'life' | 'ui' | 'confirm' | 'pause';

export type TrackName = Music | 'title';
type Jingle = 'clear' | 'gameover' | 'victory';

const midi = (m: number) => 440 * Math.pow(2, (m - 69) / 12);
const NOTE_INDEX: Record<string, number> = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
function parseNote(tok: string): number {
  const m = /^([A-G])(#|b)?(\d)$/.exec(tok);
  if (!m) return 0;
  return 12 * (Number(m[3]) + 1) + NOTE_INDEX[m[1]] + (m[2] === '#' ? 1 : m[2] === 'b' ? -1 : 0);
}

interface Track {
  bpm: number;
  /** One chord per bar: [bass root, ...chord tones]. */
  chords: number[][];
  /** 16-step strings: x = hit. */
  kick: string;
  snare: string;
  hat: string;
  /** Bass rhythm: x = root, o = octave up. */
  bass: string;
  /** Arpeggio rhythm over chord tones. */
  arp: string;
  /** Lead line: one token per eighth note, '-' holds, '.' rests. Four bars. */
  lead: string;
  leadWave: OscillatorType;
}

const TRACKS: Record<TrackName, Track> = {
  title: {
    bpm: 96,
    chords: [[41, 57, 60, 64], [40, 55, 59, 62], [38, 53, 57, 60], [36, 52, 55, 59]],
    kick: 'x.......x.......', snare: '....x.......x...', hat: '..x...x...x...x.',
    bass: 'x.......x...x...', arp: 'x.x.x.x.x.x.x.x.',
    lead: 'A5 - - G5 E5 - - . G5 - - E5 D5 - - . F5 - E5 - D5 - C5 - E5 - - - . . . .',
    leadWave: 'triangle',
  },
  city: {
    bpm: 118,
    chords: [[36, 60, 64, 67], [43, 59, 62, 67], [45, 60, 64, 69], [41, 60, 65, 69]],
    kick: 'x...x...x...x...', snare: '....x.......x...', hat: 'x.x.x.x.x.x.x.xx',
    bass: 'x.xox.x.x.xox.x.', arp: 'x.xxx.xxx.xxx.xx',
    lead: 'E5 G5 C6 G5 E5 - D5 E5 D5 - B4 D5 G5 - F5 D5 C5 E5 A5 - G5 E5 C5 - A4 C5 F5 E5 D5 - C5 .',
    leadWave: 'square',
  },
  factory: {
    bpm: 128,
    chords: [[38, 62, 65, 69], [34, 62, 65, 70], [36, 60, 64, 67], [33, 61, 64, 69]],
    kick: 'x...x...x...x.x.', snare: '....x.......x...', hat: '.xx..xx..xx..xx.',
    bass: 'xxoxxxoxxxoxxxox', arp: 'x..x..x..x..x.x.',
    lead: 'D5 . D5 F5 . A5 G5 F5 D5 - - . F5 E5 D5 C5 C5 . E5 G5 . C6 A5 G5 E5 - C#5 - A4 . . .',
    leadWave: 'sawtooth',
  },
  glitch: {
    bpm: 124,
    chords: [[40, 64, 67, 71], [36, 64, 67, 72], [38, 62, 66, 69], [35, 63, 66, 71]],
    kick: 'x..x..x...x..x..', snare: '....x.......x..x', hat: 'xxx.xxx.xxx.xxx.',
    bass: 'x..xo..x..x.o..x', arp: 'xx.xx.xx.xx.xx.x',
    lead: 'B5 . G5 . E5 F#5 G5 . E5 . . C5 . E5 G5 A5 F#5 . D5 . A5 . F#5 D5 D#5 - F#5 - B5 - - .',
    leadWave: 'square',
  },
  boss: {
    bpm: 142,
    chords: [[36, 60, 63, 67], [32, 60, 63, 68], [34, 62, 65, 70], [31, 59, 62, 67]],
    kick: 'x.x.x.x.x.x.x.x.', snare: '....x..x....x.x.', hat: 'xxxxxxxxxxxxxxxx',
    bass: 'xoxoxoxoxoxoxoxo', arp: 'xxxxxxxxxxxxxxxx',
    lead: 'C5 C5 . G5 . Eb5 . C5 Ab4 . C5 Eb5 Ab5 . G5 . Bb4 . D5 F5 Bb5 . A5 F5 G5 - F5 - D5 - B4 .',
    leadWave: 'sawtooth',
  },
};

const JINGLES: Record<Jingle, Array<[string, number]>> = {
  clear: [['C5', 1], ['E5', 1], ['G5', 1], ['C6', 1], ['G5', 1], ['C6', 4]],
  gameover: [['G4', 2], ['Eb4', 2], ['C4', 2], ['B3', 1], ['C4', 4]],
  victory: [['C5', 1], ['C5', 1], ['G5', 2], ['F5', 1], ['E5', 1], ['D5', 1], ['E5', 1], ['C6', 2], ['G5', 2], ['C6', 6]],
};

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private musicBus!: GainNode;
  private sfxBus!: GainNode;
  private delay!: DelayNode;
  private noiseBuf!: AudioBuffer;
  private track: Track | null = null;
  private trackName: TrackName | null = null;
  private step = 0;
  private nextTime = 0;
  private timer: number | null = null;
  private musicVol = 0.6;
  private sfxVol = 0.8;
  private muted = false;
  private lastPlayed = new Map<Sfx, number>();

  /** Must be called from a user gesture. Safe to call repeatedly. */
  unlock(): void {
    if (this.ctx) {
      if (this.ctx.state === 'suspended') void this.ctx.resume();
      return;
    }
    const AC = window.AudioContext ?? (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!AC) return;
    try {
      this.ctx = new AC();
    } catch {
      return;
    }
    const ctx = this.ctx;
    this.master = ctx.createGain();
    const comp = ctx.createDynamicsCompressor();
    comp.threshold.value = -14;
    comp.ratio.value = 4;
    this.master.connect(comp).connect(ctx.destination);
    this.musicBus = ctx.createGain();
    this.sfxBus = ctx.createGain();
    this.musicBus.connect(this.master);
    this.sfxBus.connect(this.master);
    this.delay = ctx.createDelay(1);
    const fb = ctx.createGain();
    fb.gain.value = 0.3;
    const wet = ctx.createGain();
    wet.gain.value = 0.25;
    this.delay.connect(fb).connect(this.delay);
    this.delay.connect(wet).connect(this.musicBus);
    const len = ctx.sampleRate;
    this.noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = this.noiseBuf.getChannelData(0);
    for (let i = 0; i < len; i++) d[i] = Math.random() * 2 - 1;
    this.applyVolumes();
    if (this.trackName) {
      const name = this.trackName;
      this.trackName = null;
      this.music(name);
    }
  }

  setVolumes(music: number, sfx: number, muted: boolean): void {
    this.musicVol = music;
    this.sfxVol = sfx;
    this.muted = muted;
    this.applyVolumes();
  }

  private applyVolumes(): void {
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    this.master.gain.setTargetAtTime(this.muted ? 0 : 0.9, t, 0.02);
    this.musicBus.gain.setTargetAtTime(this.musicVol * 0.55, t, 0.05);
    this.sfxBus.gain.setTargetAtTime(this.sfxVol, t, 0.02);
  }

  /** Pause/resume everything (tab hidden, game paused keeps music quieter instead). */
  suspend(on: boolean): void {
    if (!this.ctx) return;
    if (on) void this.ctx.suspend();
    else void this.ctx.resume();
  }

  duck(on: boolean): void {
    if (!this.ctx) return;
    this.musicBus.gain.setTargetAtTime(this.musicVol * (on ? 0.2 : 0.55), this.ctx.currentTime, 0.1);
  }

  // ------------------------------------------------------------------ music

  music(name: TrackName | null): void {
    if (name === this.trackName) return;
    this.trackName = name;
    this.track = name ? TRACKS[name] : null;
    if (!this.ctx) return;
    if (this.timer !== null) clearInterval(this.timer);
    this.timer = null;
    if (!this.track) return;
    this.step = 0;
    this.nextTime = this.ctx.currentTime + 0.08;
    this.timer = window.setInterval(() => this.schedule(), 25);
  }

  private schedule(): void {
    const ctx = this.ctx;
    const tr = this.track;
    if (!ctx || !tr) return;
    const stepDur = 60 / tr.bpm / 4;
    // If the context stalled (tab hidden), skip ahead rather than burst.
    if (this.nextTime < ctx.currentTime - 0.2) this.nextTime = ctx.currentTime + 0.05;
    while (this.nextTime < ctx.currentTime + 0.12) {
      this.playStep(tr, this.step, this.nextTime, stepDur);
      this.step = (this.step + 1) % 64;
      this.nextTime += stepDur;
    }
  }

  private playStep(tr: Track, step: number, t: number, sd: number): void {
    const s = step % 16;
    const chord = tr.chords[Math.floor(step / 16) % 4];
    if (tr.kick[s] === 'x') this.kick(t);
    if (tr.snare[s] === 'x') this.snare(t);
    if (tr.hat[s] === 'x') this.hat(t, s % 4 === 2 ? 0.05 : 0.03);
    if (tr.bass[s] !== '.') this.voice(t, midi(chord[0] + (tr.bass[s] === 'o' ? 12 : 0)), sd * 1.6, 'sawtooth', 0.16, 700, this.musicBus);
    if (tr.arp[s] === 'x') {
      const tones = chord.slice(1);
      this.voice(t, midi(tones[(step + Math.floor(step / 3)) % tones.length] + 12), sd * 0.9, 'square', 0.035, 2600, this.musicBus, true);
    }
    if (s % 2 === 0) {
      const tokens = tr.lead.split(' ');
      const idx = Math.floor(step / 2) % tokens.length;
      const tok = tokens[idx];
      if (tok !== '-' && tok !== '.') {
        let len = 1;
        while (tokens[(idx + len) % tokens.length] === '-' && len < 8) len++;
        this.voice(t, midi(parseNote(tok)), sd * 2 * len * 0.92, tr.leadWave, tr.leadWave === 'triangle' ? 0.12 : 0.06, 3200, this.musicBus, true);
      }
    }
  }

  jingle(name: Jingle): void {
    const ctx = this.ctx;
    if (!ctx) return;
    this.music(null);
    let t = ctx.currentTime + 0.05;
    const beat = name === 'gameover' ? 0.16 : 0.1;
    for (const [n, len] of JINGLES[name]) {
      const f = midi(parseNote(n));
      this.voice(t, f, beat * len * 0.95, 'square', 0.09, 4000, this.musicBus, true);
      this.voice(t, f / 2, beat * len * 0.95, 'triangle', 0.12, 2000, this.musicBus);
      t += beat * len;
    }
  }

  // ------------------------------------------------------------------ voices

  private voice(t: number, freq: number, dur: number, type: OscillatorType, vol: number, cutoff: number, bus: AudioNode, echo = false, slideTo = 0): void {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t + dur);
    const f = ctx.createBiquadFilter();
    f.type = 'lowpass';
    f.frequency.value = cutoff;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(vol, t + 0.008);
    g.gain.exponentialRampToValueAtTime(0.0001, t + Math.max(0.03, dur));
    o.connect(f).connect(g).connect(bus);
    if (echo) g.connect(this.delay);
    o.start(t);
    o.stop(t + dur + 0.05);
  }

  private noise(t: number, dur: number, vol: number, type: BiquadFilterType, freq: number, bus: AudioNode, q = 1): void {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noiseBuf;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    src.connect(f).connect(g).connect(bus);
    src.start(t, Math.random() * 0.5);
    src.stop(t + dur + 0.02);
  }

  private kick(t: number): void {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.frequency.setValueAtTime(150, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.12);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.5, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
    o.connect(g).connect(this.musicBus);
    o.start(t);
    o.stop(t + 0.2);
  }

  private snare(t: number): void {
    this.noise(t, 0.14, 0.22, 'bandpass', 1900, this.musicBus, 0.8);
    this.voice(t, 190, 0.06, 'triangle', 0.12, 1200, this.musicBus);
  }

  private hat(t: number, vol: number): void {
    this.noise(t, 0.035, vol, 'highpass', 7500, this.musicBus);
  }

  // ------------------------------------------------------------------ effects

  play(name: Sfx, intensity = 1): void {
    const ctx = this.ctx;
    if (!ctx || ctx.state !== 'running') return;
    // Rate-limit identical sounds so piles of volts don't clip.
    const now = ctx.currentTime;
    if (now - (this.lastPlayed.get(name) ?? -1) < 0.03) return;
    this.lastPlayed.set(name, now);
    const t = now + 0.005;
    const B = this.sfxBus;
    const v = (f: number, d: number, type: OscillatorType, vol: number, slide = 0, at = 0) => this.voice(t + at, f, d, type, vol, 6000, B, false, slide);
    const arp = (notes: number[], step: number, type: OscillatorType, vol: number) => notes.forEach((n, i) => v(midi(n), step * 1.4, type, vol, 0, i * step));
    switch (name) {
      case 'jump': v(330, 0.12, 'square', 0.12, 720); break;
      case 'double-jump': v(520, 0.14, 'triangle', 0.16, 1250); v(1560, 0.08, 'sine', 0.06, 0, 0.05); break;
      case 'land': this.noise(t, 0.07, 0.12 * intensity, 'lowpass', 500, B); break;
      case 'volt': v(1047, 0.05, 'square', 0.07); v(1568, 0.12, 'square', 0.07, 0, 0.05); break;
      case 'shard': arp([84, 88, 91, 96, 100], 0.06, 'triangle', 0.16); break;
      case 'token': arp([79, 83, 86, 91, 95, 98], 0.05, 'square', 0.08); break;
      case 'repair': arp([72, 76, 79, 84], 0.05, 'triangle', 0.15); break;
      case 'shield': arp([67, 74, 79, 86], 0.06, 'sine', 0.2); v(2400, 0.3, 'sine', 0.04, 1200, 0.1); break;
      case 'overdrive': v(200, 0.35, 'sawtooth', 0.1, 1600); arp([76, 81, 88], 0.07, 'square', 0.07); break;
      case 'stomp': v(260, 0.12, 'square', 0.14, 70); this.noise(t, 0.06, 0.15, 'bandpass', 1200, B); break;
      case 'hurt': v(320, 0.28, 'sawtooth', 0.14, 80); this.noise(t, 0.15, 0.12, 'lowpass', 1800, B); break;
      case 'shield-break': this.noise(t, 0.3, 0.2, 'highpass', 3000, B); v(1800, 0.3, 'sine', 0.1, 400); break;
      case 'die': arp([72, 67, 63, 60, 55], 0.08, 'square', 0.1); this.noise(t, 0.5, 0.15, 'lowpass', 900, B); break;
      case 'checkpoint': arp([67, 72, 79], 0.08, 'square', 0.09); break;
      case 'secret': arp([69, 72, 76, 81, 80], 0.09, 'triangle', 0.14); break;
      case 'bump': v(150, 0.06, 'square', 0.12, 110); break;
      case 'prize': v(380, 0.28, 'triangle', 0.16, 1300); break;
      case 'spring': v(180, 0.22, 'sine', 0.22, 900); v(360, 0.16, 'triangle', 0.08, 1500, 0.04); break;
      case 'terminal': v(1200, 0.04, 'square', 0.06); v(1600, 0.05, 'square', 0.06, 0, 0.06); break;
      case 'crusher': this.noise(t, 0.35, 0.3, 'lowpass', 260, B); v(70, 0.25, 'sine', 0.3, 40); break;
      case 'hop': v(280, 0.1, 'triangle', 0.08, 520); break;
      case 'shot': v(900, 0.08, 'square', 0.04, 420); break;
      case 'boss-intro': v(55, 1.6, 'sawtooth', 0.18, 110); this.noise(t, 1.4, 0.08, 'bandpass', 600, B, 2); break;
      case 'boss-hit': v(600, 0.3, 'square', 0.16, 90); this.noise(t, 0.3, 0.25, 'bandpass', 900, B); arp([84, 79], 0.05, 'square', 0.08); break;
      case 'boss-defeat': this.noise(t, 2.2, 0.35, 'lowpass', 700, B); v(220, 2.0, 'sawtooth', 0.16, 30); break;
      case 'boss-shot': v(1400, 0.18, 'sawtooth', 0.06, 300); break;
      case 'boss-slam': this.noise(t, 0.45, 0.35, 'lowpass', 300, B); v(60, 0.4, 'sine', 0.4, 30); break;
      case 'clang': v(1250, 0.12, 'square', 0.08, 1100); v(1760, 0.1, 'square', 0.05); break;
      case 'life': arp([72, 76, 79, 84, 88, 91], 0.06, 'square', 0.09); break;
      case 'ui': v(880, 0.04, 'square', 0.05); break;
      case 'confirm': v(660, 0.05, 'square', 0.06); v(990, 0.08, 'square', 0.06, 0, 0.05); break;
      case 'pause': v(520, 0.08, 'triangle', 0.1, 260); break;
    }
  }

  dispose(): void {
    if (this.timer !== null) clearInterval(this.timer);
    void this.ctx?.close();
  }
}
