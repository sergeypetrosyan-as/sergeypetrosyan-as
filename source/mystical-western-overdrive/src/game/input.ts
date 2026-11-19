import type { InputState } from '../state/types';

const GAME_KEYS = new Set([
  'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'KeyW', 'KeyA', 'KeyS', 'KeyD',
  'ShiftLeft', 'ShiftRight', 'Space', 'KeyB', 'Enter', 'KeyQ',
]);

export type Action = 'restart' | 'pause' | 'mute';

/** Keyboard and touch input. Edge-triggered actions go through `onAction`. */
export class Input {
  private down = new Set<string>();
  private touch = { left: false, right: false, gas: false, brake: false, drift: false, boost: false };
  private steerSmooth = 0;
  captureGameKeys = false;
  onAction: (a: Action) => void = () => {};
  onFirstGesture: () => void = () => {};

  constructor() {
    window.addEventListener('keydown', (e) => this.key(e, true));
    window.addEventListener('keyup', (e) => this.key(e, false));
    window.addEventListener('blur', () => this.reset());
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) this.reset();
    });
    window.addEventListener('pointerdown', () => this.onFirstGesture(), { passive: true });
  }

  reset(): void {
    this.down.clear();
    for (const k of Object.keys(this.touch)) (this.touch as Record<string, boolean>)[k] = false;
    this.steerSmooth = 0;
  }

  private key(e: KeyboardEvent, isDown: boolean): void {
    if (isDown) this.onFirstGesture();
    if (this.captureGameKeys && GAME_KEYS.has(e.code)) e.preventDefault();
    if (isDown && !e.repeat) {
      if (e.code === 'KeyR') this.onAction('restart');
      else if (e.code === 'KeyP' || e.code === 'Escape') this.onAction('pause');
      else if (e.code === 'KeyM') this.onAction('mute');
    }
    if (isDown) this.down.add(e.code);
    else this.down.delete(e.code);
  }

  bindTouch(el: HTMLElement): void {
    el.querySelectorAll<HTMLElement>('[data-touch]').forEach((b) => {
      const k = b.dataset.touch as keyof Input['touch'];
      const set = (v: boolean) => (ev: Event) => {
        ev.preventDefault();
        this.touch[k] = v;
        b.classList.toggle('on', v);
      };
      b.addEventListener('pointerdown', set(true));
      for (const t of ['pointerup', 'pointercancel', 'pointerleave']) b.addEventListener(t, set(false));
      b.addEventListener('contextmenu', (ev) => ev.preventDefault());
    });
  }

  private any(...codes: string[]): boolean {
    return codes.some((c) => this.down.has(c));
  }

  sample(dt: number): InputState {
    const l = this.any('ArrowLeft', 'KeyA') || this.touch.left;
    const r = this.any('ArrowRight', 'KeyD') || this.touch.right;
    const raw = (r ? 1 : 0) - (l ? 1 : 0);
    const rate = raw === 0 ? 9 : 6;
    const d = raw - this.steerSmooth;
    this.steerSmooth += Math.sign(d) * Math.min(Math.abs(d), rate * dt);
    return {
      steer: this.steerSmooth,
      throttle: this.any('ArrowUp', 'KeyW') || this.touch.gas,
      brake: this.any('ArrowDown', 'KeyS') || this.touch.brake,
      drift: this.any('ShiftLeft', 'ShiftRight', 'Space') || this.touch.drift,
      boost: this.any('KeyB', 'Enter', 'KeyQ') || this.touch.boost,
    };
  }
}
