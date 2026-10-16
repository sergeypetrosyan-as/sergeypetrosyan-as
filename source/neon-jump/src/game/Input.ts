import type { Controls } from '../entities/Player';

export type Action = 'left' | 'right' | 'down' | 'jump' | 'sprint' | 'interact' | 'pause' | 'restart';

const KEYS: Record<string, Action> = {
  ArrowLeft: 'left', KeyA: 'left',
  ArrowRight: 'right', KeyD: 'right',
  ArrowDown: 'down', KeyS: 'down',
  Space: 'jump', KeyW: 'jump', ArrowUp: 'jump', KeyK: 'jump',
  ShiftLeft: 'sprint', ShiftRight: 'sprint', KeyJ: 'sprint',
  KeyE: 'interact',
  Escape: 'pause', KeyP: 'pause',
  KeyR: 'restart',
};

/** Keys whose browser default (scrolling) is blocked while a level is being played. */
const BLOCK = new Set(['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']);

/**
 * Keyboard, on-screen touch buttons and gamepads, merged into actions.
 * `pressed` edges are kept until the game consumes them at the end of a frame.
 */
export class Input {
  /** True while a level is running: game keys stop scrolling the page. */
  enabled = false;
  usedTouch = false;
  private keys = new Set<string>();
  private touch = new Set<Action>();
  private pad = new Set<Action>();
  private readonly pressedSet = new Set<Action>();
  private readonly cleanup: Array<() => void> = [];

  constructor() {
    this.on(window, 'keydown', (e) => {
      const k = e as KeyboardEvent;
      const a = KEYS[k.code];
      if (this.enabled && BLOCK.has(k.code)) k.preventDefault();
      if (!a || k.repeat) return;
      if (!this.held(a)) this.pressedSet.add(a);
      this.keys.add(k.code);
      this.usedTouch = false;
    });
    this.on(window, 'keyup', (e) => this.keys.delete((e as KeyboardEvent).code));
    this.on(window, 'blur', () => this.releaseAll());
  }

  private on(t: EventTarget, type: string, fn: (e: Event) => void): void {
    t.addEventListener(type, fn);
    this.cleanup.push(() => t.removeEventListener(type, fn));
  }

  /** Wires on-screen buttons marked with data-action. */
  bindTouch(root: HTMLElement): void {
    for (const btn of Array.from(root.querySelectorAll<HTMLElement>('[data-action]'))) {
      const a = btn.dataset.action as Action;
      const down = (e: Event) => {
        e.preventDefault();
        if (!this.touch.has(a)) this.pressedSet.add(a);
        this.touch.add(a);
        btn.classList.add('on');
        this.usedTouch = true;
      };
      const up = (e: Event) => {
        e.preventDefault();
        this.touch.delete(a);
        btn.classList.remove('on');
      };
      this.on(btn, 'pointerdown', down);
      this.on(btn, 'pointerup', up);
      this.on(btn, 'pointercancel', up);
      this.on(btn, 'pointerleave', up);
      this.on(btn, 'contextmenu', (e) => e.preventDefault());
    }
  }

  /** Polls the first connected gamepad (standard mapping). */
  pollPad(): void {
    const pads = navigator.getGamepads?.() ?? [];
    const gp = Array.from(pads).find((p) => p && p.connected);
    const prev = this.pad;
    this.pad = new Set();
    if (!gp) return;
    const b = (i: number) => !!gp.buttons[i]?.pressed;
    const ax = gp.axes[0] ?? 0;
    const ay = gp.axes[1] ?? 0;
    if (b(14) || ax < -0.4) this.pad.add('left');
    if (b(15) || ax > 0.4) this.pad.add('right');
    if (b(13) || ay > 0.6) this.pad.add('down');
    if (b(0)) this.pad.add('jump');
    if (b(2) || b(7)) this.pad.add('sprint');
    if (b(1) || b(3)) this.pad.add('interact');
    if (b(9)) this.pad.add('pause');
    if (b(8)) this.pad.add('restart');
    for (const a of this.pad) if (!prev.has(a)) this.pressedSet.add(a);
  }

  held(a: Action): boolean {
    if (this.touch.has(a) || this.pad.has(a)) return true;
    for (const code of this.keys) if (KEYS[code] === a) return true;
    return false;
  }

  pressed(a: Action): boolean {
    return this.pressedSet.has(a);
  }

  /** Controls for one physics step. Edge-triggered flags only on the frame's first step. */
  controls(first: boolean): Controls {
    return {
      left: this.held('left'),
      right: this.held('right'),
      down: this.held('down'),
      jump: this.held('jump'),
      jumpPressed: first && this.pressedSet.has('jump'),
      sprint: this.held('sprint'),
      interactPressed: first && this.pressedSet.has('interact'),
    };
  }

  endFrame(): void {
    this.pressedSet.clear();
  }

  releaseAll(): void {
    this.keys.clear();
    this.touch.clear();
    this.pressedSet.clear();
  }

  dispose(): void {
    this.cleanup.forEach((f) => f());
  }
}
