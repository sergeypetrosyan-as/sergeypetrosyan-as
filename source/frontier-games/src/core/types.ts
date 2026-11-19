export type Result = 'win' | 'lose';
export type Colors = Record<string, string>;

/** One control line on the first screen, e.g. { keys: ['←', '→'], action: 'Move' }. */
export interface ControlHint { keys: string[]; action: string }

/**
 * A real input the verifier performs from the catalog page, after which probe() must change.
 * Positions are fractions (0..1) of the stage box. `click` is a CSS selector inside the stage.
 */
export type Smoke =
  | { click: string }
  | { key: string }
  | { tap: [number, number] }
  | { drag: [number, number, number, number] }
  | { hold: [number, number]; ms: number };

/** Cover-art op, see core/cover.mjs. */
export type CoverOp = unknown[];

/** src/meta/<id>.mjs: light data the shell, catalog and covers read without loading the game. */
export interface Meta {
  how: string;
  controls: ControlHint[];
  motif: string;
  cover: CoverOp[];
  smoke: Smoke;
}

export interface Instance {
  /** Remove every listener, timer and loop. */
  destroy(): void;
  /** Start a fresh run from `seed`. Must restore the exact starting state and re-set the HUD. */
  reset(seed: number): void;
  /** A small JSON-able snapshot of the rules state (score, position, turn...). Changes when the player acts. */
  probe(): unknown;
  /**
   * Test bot. Drive the game through the SAME action functions the inputs call until it calls
   * ctx.finish with this result. Step real-time games by calling their update(dt) in a loop.
   */
  play(kind: Result): void | Promise<void>;
}

export interface FinishInfo { result: Result; score?: number; title?: string; detail?: string }

export interface Loop { stop(): void }

export interface CanvasHandle {
  el: HTMLCanvasElement;
  g: CanvasRenderingContext2D;
  w: number;
  h: number;
  /** Pointer event to logical canvas coordinates. */
  pt(e: PointerEvent | MouseEvent): { x: number; y: number };
}

export interface Ctx {
  /** The stage: fills the space under the HUD. Put the playfield here. */
  root: HTMLElement;
  /** Palette: every role (bg, fg, accent, hostile, collectible, player, world, quiet...) and tint (bone, red, rose...). */
  c: Colors;
  /** Seed of the current run (also passed to reset). */
  seed: number;
  hud(label: string, value: string | number): void;
  /** End the run. Shows the outcome screen. Ignored if already finished this run. */
  finish(info: FinishInfo): void;
  readonly finished: boolean;
  sfx(name: 'tap' | 'good' | 'bad' | 'win' | 'lose' | 'tick'): void;
  /** addEventListener that is removed automatically on destroy. */
  on(t: EventTarget, type: string, fn: (e: any) => void, opts?: AddEventListenerOptions): void;
  /** Keyboard: map event.key (e.g. 'ArrowLeft', ' ', 'a') to handlers(down). Also fed by ctx.pad buttons. */
  keys(map: Record<string, (down: boolean) => void>): void;
  /** Keys currently held (event.key, lowercase for letters). */
  held: Set<string>;
  /** Touch buttons under the stage that behave exactly like keys. */
  pad(buttons: { key: string; label: string; wide?: boolean }[]): void;
  canvas(w?: number, h?: number): CanvasHandle;
  /** Fixed-step loop: update(1/60) 0..n times then draw(). Stops on destroy, pauses when the tab is hidden. */
  loop(update: (dt: number) => void, draw: () => void): Loop;
  /** Pointer drag helper on an element; handlers get element-relative CSS pixels. */
  drag(el: HTMLElement, f: { down?: (x: number, y: number, e: PointerEvent) => void; move?: (x: number, y: number, e: PointerEvent) => void; up?: (x: number, y: number, e: PointerEvent) => void }): void;
  /** Timeout cleared on destroy and on reset. */
  after(ms: number, fn: () => void): void;
}

export type Factory = (ctx: Ctx) => Instance;
