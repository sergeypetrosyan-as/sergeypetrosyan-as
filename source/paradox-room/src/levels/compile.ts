// Turns ASCII level definitions into runtime levels. Throws on malformed data.
import type { FoldKind, GObj, Level, LevelDef, ObjKind } from '../core/types.ts';

const LEVER_FOLD: Record<string, FoldKind> = { '1': 'rollL', '2': 'rollR', '3': 'pitchA', '4': 'pitchB' };

export function compileLevel(def: LevelDef, index: number): Level {
  const rooms: Level['rooms'] = [];
  const objs: GObj[] = [];
  const cellObjs: Map<number, number[]>[] = [];
  let start = null as Level['start'] | null;
  const controllerBit = new Map<string, number>();
  const links = def.links ?? {};
  let collectBits = 0;
  let ctlBits = 0;
  const portalByCh = new Map<string, number[]>();
  const addObj = (o: Omit<GObj, 'id'>, map: Map<number, number[]>, idx: number): GObj => {
    const obj: GObj = { ...o, id: objs.length };
    objs.push(obj);
    const arr = map.get(idx) ?? [];
    arr.push(obj.id);
    map.set(idx, arr);
    return obj;
  };
  const doorsPending: { obj: GObj; ctl: string }[] = [];

  def.rooms.forEach((rd, ri) => {
    const d = rd.layers.length;
    const h = rd.layers[0].length;
    const w = Math.max(...rd.layers.flatMap((l) => l.map((r) => r.length)));
    const solid = new Uint8Array(w * h * d);
    const map = new Map<number, number[]>();
    cellObjs.push(map);
    rd.layers.forEach((layer, z) => {
      if (layer.length !== h) throw new Error(`${def.id}: room ${ri} layer ${z} has ${layer.length} rows, expected ${h}`);
      layer.forEach((row, y) => {
        if (row.length !== w) throw new Error(`${def.id}: room ${ri} z${z} row ${y} has width ${row.length}, expected ${w}`);
        for (let x = 0; x < w; x++) {
          const ch = row[x];
          const idx = x + w * (y + h * z);
          const base = { room: ri, x, y, z, ch };
          let kind: ObjKind | null = null;
          if (ch === '#') solid[idx] = 1;
          else if (ch === '.' || ch === ' ') {
            /* empty */
          } else if (ch === '@') {
            if (start) throw new Error(`${def.id}: two start cells`);
            start = { room: ri, x, y, z };
          } else if (ch === 'E') kind = 'exit';
          else if (ch === '*') kind = 'crystal';
          else if (ch === '$') kind = 'shard';
          else if (ch >= 'a' && ch <= 'h') kind = 'portal';
          else if (LEVER_FOLD[ch]) kind = 'lever';
          else if (ch === 'S' || ch === 'T' || ch === 'U') kind = 'switch';
          else if (ch === 'P' || ch === 'Q' || ch === 'R') kind = 'plate';
          else if (ch === 'D' || ch === 'F' || ch === 'G') kind = 'door';
          else throw new Error(`${def.id}: unknown cell character '${ch}'`);
          if (!kind) continue;
          const o = addObj({ ...base, kind }, map, idx);
          if (kind === 'crystal' || kind === 'shard') o.bit = collectBits++;
          else if (kind === 'lever') o.fold = LEVER_FOLD[ch];
          else if (kind === 'switch' || kind === 'plate') {
            if (controllerBit.has(ch)) throw new Error(`${def.id}: duplicate controller '${ch}'`);
            o.bit = ctlBits++;
            controllerBit.set(ch, o.bit);
          } else if (kind === 'door') {
            const c = links[ch];
            if (!c) throw new Error(`${def.id}: door '${ch}' has no link`);
            doorsPending.push({ obj: o, ctl: c });
          } else if (kind === 'portal') {
            const list = portalByCh.get(ch) ?? [];
            list.push(o.id);
            portalByCh.set(ch, list);
            if (def.secret?.includes(ch)) o.secret = true;
          }
        }
      });
    });
    rooms.push({ name: rd.name, w, h, d, solid, free: rd.free });
  });

  if (!start) throw new Error(`${def.id}: no start cell`);
  for (const p of doorsPending) {
    const bit = controllerBit.get(p.ctl);
    if (bit === undefined) throw new Error(`${def.id}: door '${p.obj.ch}' links to missing controller '${p.ctl}'`);
    p.obj.bit = bit;
  }
  for (const [ch, ids] of portalByCh) {
    if (ids.length !== 2) throw new Error(`${def.id}: portal '${ch}' appears ${ids.length} times, expected 2`);
    if (objs[ids[0]].room === objs[ids[1]].room) throw new Error(`${def.id}: portal '${ch}' must join two different rooms`);
    objs[ids[0]].pair = ids[1];
    objs[ids[1]].pair = ids[0];
  }
  if (collectBits > 30 || ctlBits > 30) throw new Error(`${def.id}: too many collectibles or controllers`);
  let crystalMask = 0;
  let shardMask = 0;
  let nCrystals = 0;
  let nShards = 0;
  for (const o of objs) {
    if (o.kind === 'crystal') {
      crystalMask |= 1 << (o.bit as number);
      nCrystals++;
    } else if (o.kind === 'shard') {
      shardMask |= 1 << (o.bit as number);
      nShards++;
    }
  }
  if (!objs.some((o) => o.kind === 'exit')) throw new Error(`${def.id}: no exit`);
  return {
    id: def.id,
    chapter: def.chapter,
    index,
    name: def.name,
    objective: def.objective,
    intro: def.intro,
    hints: def.hints,
    rooms,
    objs,
    cellObjs,
    start,
    crystalMask,
    shardMask,
    nCrystals,
    nShards,
  };
}
