/**
 * Keyboard + mouse state. Mouse deltas accumulate between simulation frames and
 * are consumed once per rendered frame. Edge-triggered presses are tracked via
 * `pressed`, which is cleared after each frame by `endFrame()`.
 */
export class Input {
  private readonly down = new Set<string>();
  private readonly pressed = new Set<string>();
  mouseDX = 0;
  mouseDY = 0;
  wheel = 0;
  fireHeld = false;
  aimHeld = false;
  firePressed = false;
  locked = false;
  /** Set by the game: when false, gameplay keys are ignored (menus open). */
  enabled = false;

  private readonly cleanup: Array<() => void> = [];

  constructor(private readonly target: HTMLElement) {
    this.on(window, 'keydown', (e) => {
      const ev = e as KeyboardEvent;
      if (this.enabled && ['Space', 'Tab', 'ArrowUp', 'ArrowDown'].includes(ev.code)) ev.preventDefault();
      if (!this.down.has(ev.code)) this.pressed.add(ev.code);
      this.down.add(ev.code);
    });
    this.on(window, 'keyup', (e) => this.down.delete((e as KeyboardEvent).code));
    this.on(window, 'blur', () => this.releaseAll());
    this.on(document, 'mousemove', (e) => {
      if (!this.locked) return;
      const ev = e as MouseEvent;
      // Guard against the occasional huge spike some browsers emit on lock.
      if (Math.abs(ev.movementX) > 400 || Math.abs(ev.movementY) > 400) return;
      this.mouseDX += ev.movementX;
      this.mouseDY += ev.movementY;
    });
    this.on(target, 'mousedown', (e) => {
      const ev = e as MouseEvent;
      if (!this.locked) return;
      if (ev.button === 0) {
        this.fireHeld = true;
        this.firePressed = true;
      } else if (ev.button === 2) this.aimHeld = true;
    });
    this.on(window, 'mouseup', (e) => {
      const ev = e as MouseEvent;
      if (ev.button === 0) this.fireHeld = false;
      else if (ev.button === 2) this.aimHeld = false;
    });
    this.on(target, 'contextmenu', (e) => e.preventDefault());
    this.on(target, 'wheel', (e) => {
      this.wheel += Math.sign((e as WheelEvent).deltaY);
    }, { passive: true });
    this.on(document, 'pointerlockchange', () => {
      this.locked = document.pointerLockElement === this.target;
      if (!this.locked) this.releaseAll();
    });
  }

  private on(el: EventTarget, type: string, fn: (e: Event) => void, opts?: AddEventListenerOptions): void {
    el.addEventListener(type, fn, opts);
    this.cleanup.push(() => el.removeEventListener(type, fn, opts));
  }

  isDown(code: string): boolean {
    return this.enabled && this.down.has(code);
  }

  wasPressed(code: string): boolean {
    return this.enabled && this.pressed.has(code);
  }

  /** Axis in [-1, 1] from two key codes. */
  axis(neg: string, pos: string, neg2?: string, pos2?: string): number {
    let v = 0;
    if (this.isDown(neg) || (neg2 && this.isDown(neg2))) v -= 1;
    if (this.isDown(pos) || (pos2 && this.isDown(pos2))) v += 1;
    return v;
  }

  requestLock(): void {
    if (document.pointerLockElement === this.target) return;
    try {
      const result = this.target.requestPointerLock() as unknown;
      if (result instanceof Promise) result.catch(() => undefined);
    } catch {
      /* lock refused (e.g. too soon after exit) — the overlay prompt stays visible */
    }
  }

  exitLock(): void {
    if (document.pointerLockElement) document.exitPointerLock();
  }

  releaseAll(): void {
    this.down.clear();
    this.fireHeld = false;
    this.aimHeld = false;
  }

  endFrame(): void {
    this.pressed.clear();
    this.mouseDX = 0;
    this.mouseDY = 0;
    this.wheel = 0;
    this.firePressed = false;
  }

  dispose(): void {
    this.cleanup.forEach((fn) => fn());
    this.cleanup.length = 0;
  }
}
