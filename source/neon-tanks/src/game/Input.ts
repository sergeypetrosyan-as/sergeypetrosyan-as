/**
 * Keyboard + mouse state with pointer lock. Mouse deltas and edge-triggered
 * presses accumulate between frames and are cleared by `endFrame()`.
 */
export class Input {
  private readonly down = new Set<string>();
  private readonly pressed = new Set<string>();
  mouseDX = 0;
  mouseDY = 0;
  wheel = 0;
  fireHeld = false;
  locked = false;
  /** Gameplay keys are ignored while false (menus open). */
  enabled = false;
  /** Dev / automation: accept mouse buttons without pointer lock. */
  allowUnlocked = false;
  onLockChange: ((locked: boolean) => void) | null = null;
  private readonly cleanup: Array<() => void> = [];
  private readonly target: HTMLElement;

  constructor(target: HTMLElement) {
    this.target = target;
    this.on(window, 'keydown', (e) => {
      const ev = e as KeyboardEvent;
      if (this.enabled && ['Space', 'Tab', 'ShiftLeft', 'ShiftRight', 'ArrowUp', 'ArrowDown'].includes(ev.code)) ev.preventDefault();
      if (!this.down.has(ev.code)) this.pressed.add(ev.code);
      this.down.add(ev.code);
    });
    this.on(window, 'keyup', (e) => this.down.delete((e as KeyboardEvent).code));
    this.on(window, 'blur', () => this.releaseAll());
    this.on(document, 'mousemove', (e) => {
      if (!this.locked) return;
      const ev = e as MouseEvent;
      // Some browsers emit one huge spike right after locking.
      if (Math.abs(ev.movementX) > 500 || Math.abs(ev.movementY) > 500) return;
      this.mouseDX += ev.movementX;
      this.mouseDY += ev.movementY;
    });
    this.on(target, 'mousedown', (e) => {
      const ev = e as MouseEvent;
      if (!this.locked && !this.allowUnlocked) return;
      if (ev.button === 0) this.fireHeld = true;
    });
    this.on(window, 'mouseup', (e) => {
      if ((e as MouseEvent).button === 0) this.fireHeld = false;
    });
    this.on(target, 'contextmenu', (e) => e.preventDefault());
    this.on(target, 'wheel', (e) => {
      const ev = e as WheelEvent;
      ev.preventDefault();
      this.wheel += Math.sign(ev.deltaY);
    }, { passive: false });
    this.on(document, 'pointerlockchange', () => {
      this.locked = document.pointerLockElement === this.target;
      if (!this.locked) this.fireHeld = false;
      this.onLockChange?.(this.locked);
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
    return this.pressed.has(code);
  }

  axis(neg: string, pos: string, neg2?: string, pos2?: string): number {
    let v = 0;
    if (this.isDown(neg) || (neg2 !== undefined && this.isDown(neg2))) v -= 1;
    if (this.isDown(pos) || (pos2 !== undefined && this.isDown(pos2))) v += 1;
    return v;
  }

  requestLock(): void {
    if (document.pointerLockElement === this.target) return;
    try {
      const r = this.target.requestPointerLock() as unknown;
      if (r instanceof Promise) r.catch(() => undefined);
    } catch {
      /* refused (e.g. too soon after exiting) — the overlay stays up */
    }
  }

  exitLock(): void {
    if (document.pointerLockElement) document.exitPointerLock();
  }

  releaseAll(): void {
    this.down.clear();
    this.fireHeld = false;
  }

  endFrame(): void {
    this.pressed.clear();
    this.mouseDX = 0;
    this.mouseDY = 0;
    this.wheel = 0;
  }

  dispose(): void {
    this.cleanup.forEach((f) => f());
    this.cleanup.length = 0;
  }
}
