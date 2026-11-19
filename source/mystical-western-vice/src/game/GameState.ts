import { MISSION } from './GameConfig';

export type Phase = 'title' | 'playing' | 'paused' | 'dying' | 'ended';
export type WavePhase = 'intro' | 'intermission' | 'active';

/** Run-scoped scoring, combo and statistics. Pure data + rules, no rendering. */
export class GameState {
  phase: Phase = 'title';
  wavePhase: WavePhase = 'intro';
  waveTimer = 0;
  score = 0;
  kills = 0;
  headshots = 0;
  combo = 0;
  comboTimer = 0;
  bestCombo = 1;
  boostTimer = 0;
  elapsed = 0;
  wavesCleared = 0;
  won = false;

  reset(): void {
    this.phase = 'playing';
    this.wavePhase = 'intro';
    this.waveTimer = 3.2;
    this.score = 0;
    this.kills = 0;
    this.headshots = 0;
    this.combo = 0;
    this.comboTimer = 0;
    this.bestCombo = 1;
    this.boostTimer = 0;
    this.elapsed = 0;
    this.wavesCleared = 0;
    this.won = false;
  }

  get multiplier(): number {
    return Math.min(MISSION.maxCombo, 1 + Math.floor(this.combo / 2));
  }

  /** Registers a kill and returns the points awarded (base × combo multiplier). */
  registerKill(base: number, head: boolean): number {
    this.kills++;
    if (head) this.headshots++;
    this.combo++;
    this.comboTimer = MISSION.comboWindow;
    this.bestCombo = Math.max(this.bestCombo, this.multiplier);
    const pts = Math.round((base + (head ? 50 : 0)) * this.multiplier);
    this.score += pts;
    return pts;
  }

  addScore(pts: number): void {
    this.score += pts;
  }

  update(dt: number): void {
    this.elapsed += dt;
    if (this.comboTimer > 0) {
      this.comboTimer -= dt;
      if (this.comboTimer <= 0) this.combo = 0;
    }
    if (this.boostTimer > 0) this.boostTimer = Math.max(0, this.boostTimer - dt);
  }
}
