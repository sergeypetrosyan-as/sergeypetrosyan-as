/**
 * Simulation → presentation event stream. Events are pooled records written by
 * the sim during a tick and drained once per rendered frame by effects, audio
 * and HUD, so the hot loop allocates nothing.
 */
export type SimEventType =
  | 'fire'
  | 'charge'
  | 'beam'
  | 'impact'
  | 'explode'
  | 'damage'
  | 'kill'
  | 'spawn'
  | 'pickup'
  | 'pickupReady'
  | 'ability'
  | 'reload'
  | 'overheat'
  | 'capture'
  | 'neutral'
  | 'matchEnd'
  | 'countdown';

export interface SimEvent {
  type: SimEventType;
  /** Primary tank id (shooter, victim of damage, picker…) or -1. */
  a: number;
  /** Secondary tank id (attacker, killer…) or -1. */
  b: number;
  x: number;
  y: number;
  z: number;
  /** Direction / normal / beam end. */
  x2: number;
  y2: number;
  z2: number;
  value: number;
  kind: string;
}

export class EventQueue {
  private readonly pool: SimEvent[] = [];
  count = 0;

  push(type: SimEventType, a = -1, b = -1, kind = ''): SimEvent {
    let e = this.pool[this.count];
    if (!e) {
      e = { type, a, b, x: 0, y: 0, z: 0, x2: 0, y2: 0, z2: 0, value: 0, kind };
      this.pool.push(e);
    }
    this.count++;
    e.type = type;
    e.a = a;
    e.b = b;
    e.kind = kind;
    e.x = e.y = e.z = e.x2 = e.y2 = e.z2 = e.value = 0;
    return e;
  }

  get(i: number): SimEvent {
    return this.pool[i];
  }

  clear(): void {
    this.count = 0;
  }
}
