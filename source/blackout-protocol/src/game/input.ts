import type { Input } from '../sim/types.ts';

const DIR_KEYS: Record<string, number> = { ArrowUp: 0, KeyW: 0, ArrowRight: 1, KeyD: 1, ArrowDown: 2, KeyS: 2, ArrowLeft: 3, KeyA: 3 };

/** Keyboard + touch input. Edge actions are held for exactly one simulation step by `poll`. */
export class InputState {
  enabled = false;
  puzzleActive = false;
  private keys = new Set<string>();
  private touchHold = new Set<string>();
  private sneakToggle = false;
  private edge = { interact: false, hack: false, cycle: false, decoy: false, dir: -1, cancel: false };
  onPause: () => void = () => undefined;
  onMute: () => void = () => undefined;
  onGesture: () => void = () => undefined;
  onMenuNav: (delta: number) => void = () => undefined;

  attach(): void {
    window.addEventListener('keydown', (e) => this.down(e));
    window.addEventListener('keyup', (e) => { this.keys.delete(e.code); });
    window.addEventListener('blur', () => this.releaseAll());
    window.addEventListener('pointerdown', () => this.onGesture(), { passive: true });
    document.querySelectorAll<HTMLButtonElement>('[data-hold]').forEach((b) => {
      const k = b.dataset.hold ?? '';
      const on = (e: Event): void => { e.preventDefault(); this.touchHold.add(k); this.onGesture(); };
      const off = (): void => { this.touchHold.delete(k); };
      b.addEventListener('pointerdown', on);
      b.addEventListener('pointerup', off);
      b.addEventListener('pointercancel', off);
      b.addEventListener('pointerleave', off);
    });
    document.querySelectorAll<HTMLButtonElement>('[data-tap]').forEach((b) => {
      b.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.onGesture();
        const k = b.dataset.tap;
        if (k === 'interact') this.edge.interact = true;
        else if (k === 'hack') this.edge.hack = true;
        else if (k === 'cycle') this.edge.cycle = true;
        else if (k === 'decoy') this.edge.decoy = true;
      });
    });
    document.querySelectorAll<HTMLButtonElement>('[data-toggle="sneak"]').forEach((b) => {
      b.addEventListener('pointerdown', (e) => {
        e.preventDefault();
        this.sneakToggle = !this.sneakToggle;
        b.setAttribute('aria-pressed', String(this.sneakToggle));
      });
    });
    document.querySelectorAll<HTMLButtonElement>('[data-pz]').forEach((b) => {
      b.addEventListener('pointerdown', (e) => { e.preventDefault(); this.edge.dir = Number(b.dataset.pz); });
    });
  }

  releaseAll(): void {
    this.keys.clear();
    this.touchHold.clear();
    this.edge = { interact: false, hack: false, cycle: false, decoy: false, dir: -1, cancel: false };
  }

  private down(e: KeyboardEvent): void {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    this.onGesture();
    const c = e.code;
    if (c === 'KeyM') { if (!e.repeat) this.onMute(); return; }
    if (!this.enabled) {
      if (c === 'ArrowDown' || c === 'ArrowUp') { e.preventDefault(); this.onMenuNav(c === 'ArrowDown' ? 1 : -1); }
      return;
    }
    if (c === 'Escape') {
      e.preventDefault();
      if (!e.repeat) { if (this.puzzleActive) this.edge.cancel = true; else this.onPause(); }
      return;
    }
    if (c === 'KeyP') { if (!e.repeat) this.onPause(); return; }
    if (c in DIR_KEYS || c === 'Tab' || c === 'Space' || c === 'Enter') e.preventDefault();
    if (e.repeat) return;
    this.keys.add(c);
    if (c in DIR_KEYS) this.edge.dir = DIR_KEYS[c];
    else if (c === 'KeyE') this.edge.interact = true;
    else if (c === 'Space' || c === 'KeyH' || c === 'Enter') this.edge.hack = true;
    else if (c === 'Tab' || c === 'KeyQ') this.edge.cycle = true;
    else if (c === 'KeyF') this.edge.decoy = true;
  }

  /** Tactical zoom-out (hold Z). Render-only: never reaches the simulation. */
  zoomHeld(): boolean { return this.enabled && this.keys.has('KeyZ'); }

  poll(): Input {
    const k = this.keys, t = this.touchHold;
    const left = k.has('KeyA') || k.has('ArrowLeft') || t.has('left');
    const right = k.has('KeyD') || k.has('ArrowRight') || t.has('right');
    const up = k.has('KeyW') || k.has('ArrowUp') || t.has('up');
    const down = k.has('KeyS') || k.has('ArrowDown') || t.has('down');
    const out: Input = {
      mx: (right ? 1 : 0) - (left ? 1 : 0),
      my: (down ? 1 : 0) - (up ? 1 : 0),
      sneak: k.has('ShiftLeft') || k.has('ShiftRight') || k.has('KeyC') || this.sneakToggle,
      interact: this.edge.interact,
      hack: this.edge.hack,
      cycle: this.edge.cycle,
      decoy: this.edge.decoy,
      dir: this.edge.dir,
      cancel: this.edge.cancel,
    };
    this.edge = { interact: false, hack: false, cycle: false, decoy: false, dir: -1, cancel: false };
    return out;
  }
}
