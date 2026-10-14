/**
 * Lens input. Mouse/touch: the circle follows the pointer, held button = rewind.
 * Keyboard: arrows move the circle, Space holds it. Wheel, Q/E or 1–3 resize.
 */
export class Input {
  /** Screen-space lens position in CSS pixels. */
  px = 0;
  py = 0;
  held = false;
  sizeIndex = 1;
  usedKeyboard = false;
  private keys = new Set<string>();
  private pointerHeld = false;
  private readonly pressed = new Set<string>();
  private readonly cleanup: Array<() => void> = [];
  enabled = false;

  constructor(el: HTMLElement) {
    this.px = window.innerWidth * 0.6;
    this.py = window.innerHeight * 0.5;
    const on = <K extends keyof WindowEventMap>(t: EventTarget, type: K | string, fn: (e: Event) => void, opts?: AddEventListenerOptions) => {
      t.addEventListener(type, fn, opts);
      this.cleanup.push(() => t.removeEventListener(type, fn, opts));
    };
    on(el, 'pointermove', (e) => {
      const p = e as PointerEvent;
      this.px = p.clientX;
      this.py = p.clientY - (p.pointerType === 'touch' ? 40 : 0);
      this.usedKeyboard = false;
    });
    on(el, 'pointerdown', (e) => {
      const p = e as PointerEvent;
      if (p.button !== 0) return;
      this.px = p.clientX;
      this.py = p.clientY - (p.pointerType === 'touch' ? 40 : 0);
      this.pointerHeld = true;
      el.setPointerCapture?.(p.pointerId);
    });
    const release = () => { this.pointerHeld = false; };
    on(el, 'pointerup', release);
    on(el, 'pointercancel', release);
    on(el, 'lostpointercapture', release);
    on(el, 'contextmenu', (e) => e.preventDefault());
    on(el, 'wheel', (e) => {
      const w = e as WheelEvent;
      w.preventDefault();
      this.resize(w.deltaY > 0 ? -1 : 1);
    }, { passive: false });
    on(window, 'keydown', (e) => {
      const k = e as KeyboardEvent;
      if (!this.keys.has(k.code)) this.pressed.add(k.code);
      this.keys.add(k.code);
      if (this.enabled && ['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(k.code)) k.preventDefault();
      if (!this.enabled) return;
      if (k.code === 'KeyQ' || k.code === 'Minus') this.resize(-1);
      if (k.code === 'KeyE' || k.code === 'Equal') this.resize(1);
      if (k.code === 'Digit1') this.sizeIndex = 0;
      if (k.code === 'Digit2') this.sizeIndex = 1;
      if (k.code === 'Digit3') this.sizeIndex = 2;
    });
    on(window, 'keyup', (e) => this.keys.delete((e as KeyboardEvent).code));
    on(window, 'blur', () => { this.keys.clear(); this.pointerHeld = false; });
  }

  private resize(d: number): void {
    if (!this.enabled) return;
    this.sizeIndex = Math.max(0, Math.min(2, this.sizeIndex + d));
  }

  wasPressed(code: string): boolean {
    return this.pressed.has(code);
  }

  update(dt: number): void {
    let dx = 0, dy = 0;
    if (this.keys.has('ArrowLeft') || this.keys.has('KeyA')) dx -= 1;
    if (this.keys.has('ArrowRight') || this.keys.has('KeyD')) dx += 1;
    if (this.keys.has('ArrowUp') || this.keys.has('KeyW')) dy -= 1;
    if (this.keys.has('ArrowDown') || this.keys.has('KeyS')) dy += 1;
    if (dx || dy) {
      this.usedKeyboard = true;
      const s = 520 * dt;
      this.px = Math.max(0, Math.min(window.innerWidth, this.px + dx * s));
      this.py = Math.max(0, Math.min(window.innerHeight, this.py + dy * s));
    }
    this.held = this.enabled && (this.pointerHeld || this.keys.has('Space'));
  }

  endFrame(): void {
    this.pressed.clear();
  }

  releaseAll(): void {
    this.keys.clear();
    this.pointerHeld = false;
    this.held = false;
  }

  dispose(): void {
    this.cleanup.forEach((f) => f());
  }
}
