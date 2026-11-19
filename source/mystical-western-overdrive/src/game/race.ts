import { T, DIFFICULTIES } from '../state/tuning';
import type { Car, InputState, RaceEvent, Rival, Track } from '../state/types';
import { makeRivals, stepRival } from './ai';
import { newCar, stepPlayer } from './physics';

export type RacePhase = 'countdown' | 'racing' | 'finished';

export interface ResultRow { name: string; time: number; player: boolean; place: number }

export const NO_INPUT: InputState = { steer: 0, throttle: false, brake: false, drift: false, boost: false };

/** Complete race simulation. DOM-free and audio-free so it can run in Node. */
export class Race {
  readonly track: Track;
  readonly diffIdx: number;
  readonly trackBonus: number;
  player: Car = newCar(0, 0.5);
  rivals: Rival[] = makeRivals();
  phase: RacePhase = 'countdown';
  time = 0; // seconds since GO
  clock = 0; // seconds since scene start (drives AI weave)
  cdT = 0;
  cdShown = 0;
  events: RaceEvent[] = [];
  maxS = 0;
  cpCount = 0;
  lapStart = 0;
  lapTimes: number[] = [];
  splits: number[][] = [[]];
  finishTime: number | null = null;
  rank = 4;
  bumpCd = 0;
  results: ResultRow[] = [];
  wrongSpine = 0; // gates sealed on the player
  spinePasses = 0; // gates opened for the player

  constructor(track: Track, diffIdx: number) {
    this.track = track;
    this.diffIdx = diffIdx;
    this.trackBonus = track.def.aiBonus;
    this.rank = this.computeRank();
  }

  get diff() { return DIFFICULTIES[this.diffIdx]; }

  update(dtIn: number, input: InputState): void {
    const dt = Math.min(dtIn, T.MAX_DT);
    this.clock += dt;
    const ev = this.events;
    if (this.phase === 'countdown') {
      this.cdT += dt;
      const step = Math.floor((this.cdT - 0.2) / 1.0);
      const shown = step >= 0 && step < 3 ? 3 - step : this.cdT >= T.COUNTDOWN ? 0 : this.cdShown;
      if (shown !== this.cdShown && shown > 0) ev.push({ type: 'countdown', value: shown });
      this.cdShown = shown;
      if (this.cdT >= T.COUNTDOWN) {
        this.phase = 'racing';
        ev.push({ type: 'go', value: 0 });
      }
      return;
    }
    this.time += dt;
    const finished = this.phase === 'finished';
    const inp: InputState = finished
      ? { steer: 0, throttle: false, brake: this.player.speed > 0 && this.time - (this.finishTime ?? 0) > 1.2, drift: false, boost: false }
      : input;
    const before = ev.length;
    stepPlayer(this.player, inp, this.track, this.diff, dt, ev);
    for (let i = before; i < ev.length; i++) {
      if (ev[i].type === 'gateOpen') this.spinePasses++;
      else if (ev[i].type === 'gateSealed') this.wrongSpine++;
    }
    for (const r of this.rivals) stepRival(r, this.track, this.diff, this.trackBonus, this.player.s, this.player.x, this.time, dt);
    this.collide(dt);
    if (!finished) this.progress();
    const rank = this.computeRank();
    if (rank !== this.rank) {
      this.rank = rank;
      ev.push({ type: 'position', value: rank });
    }
  }

  private collide(dt: number): void {
    const p = this.player;
    this.bumpCd = Math.max(0, this.bumpCd - dt);
    for (const r of this.rivals) {
      const ds = r.s - p.s;
      const dx = p.x - r.x;
      if (Math.abs(ds) < T.CAR_DS && Math.abs(dx) < T.CAR_DX) {
        const side = dx >= 0 ? 1 : -1;
        const push = (T.CAR_DX - Math.abs(dx) + 0.02) * 0.5;
        p.x += side * push;
        r.x -= side * push * 0.6;
        p.vx += side * 0.6;
        if (ds > 0) {
          if (p.speed > r.speed) p.speed = Math.max(r.speed * 0.94, p.speed * 0.92);
        } else r.speed *= 0.93;
        if (this.bumpCd <= 0) {
          this.bumpCd = 0.4;
          p.reserve = Math.max(0, p.reserve - T.BUMP_PENALTY);
          p.cleanT = 0;
          this.events.push({ type: 'bump', value: Math.min(1, Math.abs(p.speed - r.speed) / 4000 + 0.3) });
        }
      }
    }
  }

  private progress(): void {
    const L = this.track.length;
    this.maxS = Math.max(this.maxS, this.player.s);
    const cps = Math.floor(this.maxS / (L / T.CHECKPOINTS));
    while (this.cpCount < cps && this.phase !== 'finished') {
      this.cpCount++;
      const k = this.cpCount;
      const inLap = ((k - 1) % T.CHECKPOINTS) + 1;
      const lapIdx = Math.floor((k - 1) / T.CHECKPOINTS);
      const split = this.time - this.lapStart;
      if (inLap < T.CHECKPOINTS) {
        this.splits[lapIdx][inLap - 1] = split;
        this.events.push({ type: 'checkpoint', value: split, text: String(inLap) });
      } else {
        this.lapTimes.push(split);
        this.splits[lapIdx][T.CHECKPOINTS - 1] = split;
        this.lapStart = this.time;
        const lapNo = lapIdx + 1;
        if (lapNo >= T.LAPS) {
          this.finishTime = this.time;
          this.phase = 'finished';
          this.events.push({ type: 'finish', value: this.time });
        } else {
          this.splits.push([]);
          this.events.push({ type: 'lap', value: split, text: String(lapNo + 1) });
        }
      }
    }
  }

  /** 1-based position of the player (finished cars rank by finish time, others by distance). */
  computeRank(): number {
    const me = this.finishTime;
    let rank = 1;
    for (const r of this.rivals) {
      if (r.finish !== null && me === null) rank++;
      else if (r.finish !== null && me !== null) {
        if (r.finish < me) rank++;
      } else if (me === null && r.s > this.player.s) rank++;
    }
    return rank;
  }

  /** Current lap number (1-based, capped at LAPS). */
  get lap(): number {
    return Math.min(T.LAPS, Math.floor(this.maxS / this.track.length) + 1);
  }

  /** Let the rivals finish so the results table has real times. */
  settle(): void {
    if (this.finishTime === null) return;
    let guard = 0;
    while (this.rivals.some((r) => r.finish === null) && guard++ < 6000) {
      this.time += 1 / 30;
      for (const r of this.rivals) stepRival(r, this.track, this.diff, this.trackBonus, r.s, this.player.x, this.time, 1 / 30);
    }
    const rows: ResultRow[] = [
      { name: 'JUNO (YOU)', time: this.finishTime, player: true, place: 0 },
      ...this.rivals.map((r) => ({ name: r.name, time: r.finish ?? Infinity, player: false, place: 0 })),
    ];
    rows.sort((a, b) => a.time - b.time);
    rows.forEach((row, i) => { row.place = i + 1; });
    this.results = rows;
    this.rank = rows.find((r) => r.player)?.place ?? 4;
  }
}

export function fmtTime(t: number | null | undefined): string {
  if (t === null || t === undefined || !Number.isFinite(t)) return '--:--.---';
  const m = Math.floor(t / 60);
  const s = t - m * 60;
  return `${m}:${s < 10 ? '0' : ''}${s.toFixed(3)}`;
}
