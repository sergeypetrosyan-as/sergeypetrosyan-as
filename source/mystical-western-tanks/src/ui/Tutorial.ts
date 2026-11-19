import { ABILITIES } from '../sim/content.ts';
import { angleDiff } from '../sim/math.ts';
import type { Tank } from '../sim/tank.ts';
import { $ } from './dom.ts';

interface Step {
  text: (t: Tank) => string;
  done: (t: Tank, s: TutorialState) => boolean;
}

interface TutorialState {
  travelled: number;
  aimed: number;
  shots: number;
  boostTime: number;
  ability: boolean;
  timer: number;
  kills: number;
}

const STEPS: Step[] = [
  { text: () => 'Drive with <kbd>W</kbd> <kbd>S</kbd> and turn the hull with <kbd>A</kbd> <kbd>D</kbd>.', done: (_, s) => s.travelled > 18 },
  { text: () => 'Move the mouse to aim — the turret turns on its own, independent of the hull.', done: (_, s) => s.aimed > 1.2 },
  { text: () => '<b>Left-click</b> to fire. The small ring shows where your barrel points right now.', done: (_, s) => s.shots >= 3 },
  { text: () => 'Hold <kbd>Shift</kbd> while driving forward to boost.', done: (_, s) => s.boostTime > 0.8 },
  { text: (t) => `When the ring fills, press <kbd>Space</kbd> for <b>${ABILITIES[t.hull.ability].name}</b>.`, done: (t, s) => s.ability || t.abilityCharge < 0.05 },
  { text: () => '<kbd>R</kbd> reloads or vents heat, <kbd>Tab</kbd> shows the score, <kbd>Esc</kbd> pauses. Good hunting!', done: (_, s) => s.timer > 7 || s.kills > 0 },
];

/** First-match coaching strip: each step completes when the player actually does the thing. */
export class Tutorial {
  active = false;
  private step = 0;
  private hold = 0;
  private lastX = 0;
  private lastZ = 0;
  private lastYaw = 0;
  private readonly s: TutorialState = { travelled: 0, aimed: 0, shots: 0, boostTime: 0, ability: false, timer: 0, kills: 0 };
  private readonly el = $('tutorial');
  private readonly text = $('tutText');
  private readonly stepEl = $('tutStep');
  onFinish: (() => void) | null = null;

  constructor() {
    $('tutSkip').addEventListener('click', () => this.finish());
  }

  start(t: Tank): void {
    this.active = true;
    this.step = 0;
    this.hold = 0;
    Object.assign(this.s, { travelled: 0, aimed: 0, shots: 0, boostTime: 0, ability: false, timer: 0, kills: 0 });
    this.lastX = t.x;
    this.lastZ = t.z;
    this.lastYaw = t.turretYaw;
    this.el.classList.remove('hidden');
    this.render(t);
  }

  stop(): void {
    this.active = false;
    this.el.classList.add('hidden');
  }

  private finish(): void {
    this.stop();
    this.onFinish?.();
  }

  noteShot(): void { this.s.shots++; }
  noteAbility(): void { this.s.ability = true; }
  noteKill(): void { this.s.kills++; }

  update(t: Tank, dt: number): void {
    if (!this.active) return;
    const s = this.s;
    if (t.alive) {
      s.travelled += Math.hypot(t.x - this.lastX, t.z - this.lastZ);
      s.aimed += Math.abs(angleDiff(this.lastYaw, t.turretYaw));
      if (t.boosting) s.boostTime += dt;
    }
    this.lastX = t.x;
    this.lastZ = t.z;
    this.lastYaw = t.turretYaw;
    if (this.hold > 0) {
      this.hold -= dt;
      if (this.hold <= 0) {
        this.step++;
        if (this.step >= STEPS.length) { this.finish(); return; }
        s.timer = 0;
        this.render(t);
      }
      return;
    }
    s.timer += dt;
    if (STEPS[this.step].done(t, s)) {
      this.hold = 0.9;
      this.text.classList.add('done');
    }
  }

  private render(t: Tank): void {
    this.text.classList.remove('done');
    this.text.innerHTML = STEPS[this.step].text(t);
    this.stepEl.textContent = `${this.step + 1} / ${STEPS.length}`;
  }
}
