// Simple object pool: `list` holds live objects, dead ones are recycled via `free`.
export class Pool<T> {
  list: T[] = [];
  private free: T[] = [];
  private make: () => T;
  constructor(make: () => T) {
    this.make = make;
  }

  acquire(): T {
    const o = this.free.pop() ?? this.make();
    this.list.push(o);
    return o;
  }

  /** Swap-remove by index (iterate backwards when calling this in a loop). */
  removeAt(i: number): void {
    const last = this.list.length - 1;
    const o = this.list[i];
    this.list[i] = this.list[last];
    this.list.pop();
    this.free.push(o);
  }

  clear(): void {
    for (const o of this.list) this.free.push(o);
    this.list.length = 0;
  }

  get count(): number {
    return this.list.length;
  }
}
