import { h } from '../core/dom';
import { makeRng, shuffle, pick, rint } from '../core/rng';
import type { Ctx, Instance, Result } from '../core/types';

/** Ghost Town Rooms: open doors, read the rooms, carry up to three things. A chain of keys leads to the bank safe before dusk. */
const LV = [{ rooms: 6, chain: 2, hours: 5 }, { rooms: 7, chain: 3, hours: 6 }, { rooms: 8, chain: 4, hours: 7 }];
const NERVE = 3, PACK = 3;
const KEYS: Record<string, string> = { '◆': 'Iron', '▲': 'Brass', '●': 'Copper', '■': 'Tin', '✚': 'Vault' };
const PLACES = ['Barber shop', 'Dry goods', 'Chapel', 'Stables', 'Telegraph', 'Jail', 'Hotel lobby', 'Smithy', 'Undertaker'];
const JUNK = ['Tin cup', 'Rusty spurs', 'Torn letter', 'Dead lantern', 'Bent spoon', 'Playing cards', 'Dusty bible', 'Broken clock'];
const COLD = ['A cold draft leaks under the door.', 'Faint whispering inside.', 'Frost clings to the knob.'];
const WARM = ['Dust and a creaking hinge.', 'Sun-bleached boards, quiet.', 'A rusty bell hangs above.'];

interface Item { id: string; name: string; kind: 'key' | 'junk' | 'salt'; sym?: string }
interface Room { name: string; hint: string; haunted: boolean; lock: string | null; items: Item[]; opened: boolean }
const keyItem = (sym: string): Item => ({ id: 'k' + sym, name: `${sym} ${KEYS[sym]} key`, kind: 'key', sym });

export default function ghostTownRooms(ctx: Ctx): Instance {
  let rand = makeRng(1);
  let level = 0, score = 0, hours = 0, nerve = NERVE, sel = -1, msg = '';
  let rooms: Room[] = [], pack: Item[] = [], chain: number[] = [];

  const street = h('div', { class: 'gt-street' });
  const safe = h('button', { class: 'gt-safe', type: 'button', 'data-safe': '', onclick: () => openSafe() });
  const room = h('div', { class: 'gt-room', 'aria-live': 'polite' });
  const packEl = h('div', { class: 'gt-pack' });
  const note = h('p', { class: 'mw-note', role: 'status', style: { minHeight: '2.8em', margin: 0 } });
  const style = h('style', null, `
    .gt{width:100%;max-width:480px;display:flex;flex-direction:column;gap:8px}
    .gt-street{display:grid;grid-template-columns:repeat(auto-fit,minmax(104px,1fr));gap:6px}
    .gt-door{min-height:92px;padding:6px 6px 4px;border-radius:40px 40px 6px 6px;border:3px solid var(--mw-tan);background:var(--mw-wine);color:var(--mw-bone);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:2px;text-align:center;font:600 .78rem/1.15 var(--mw-font-slab)}
    .gt-door b{font:700 .88rem var(--mw-font-slab);margin-top:6px}
    .gt-door em{font:400 .76rem/1.2 var(--mw-font-body);color:var(--mw-tan)}
    .gt-door.gt-locked{border-style:dashed;background:var(--mw-night)}
    .gt-door.open{background:var(--mw-night);border-color:var(--mw-mesa)}
    .gt-door.cur{outline:3px solid var(--mw-bone);outline-offset:1px}
    .gt-door.cold em{color:var(--mw-bone);font-weight:700}.gt-door.cold em::before{content:"❄ "}
    .gt-safe{min-height:48px;border-radius:8px;border:3px double var(--mw-rose);background:var(--mw-wine);color:var(--mw-bone);font:700 .95rem var(--mw-font-slab);cursor:pointer}
    .gt-room,.gt-pack{border:2px solid var(--mw-ember);border-radius:10px;padding:8px 10px;background:var(--mw-night);display:flex;flex-direction:column;gap:6px}
    .gt-room h3,.gt-pack h3{margin:0;font:700 .9rem var(--mw-font-slab);color:var(--mw-tan)}
    .gt-it{display:flex;align-items:center;justify-content:space-between;gap:8px;font:500 .95rem var(--mw-font-body)}
    .gt-it button{min-height:44px;min-width:76px;border-radius:8px;border:2px solid var(--mw-ember);background:var(--mw-dusk);color:var(--mw-bone);font:700 .85rem var(--mw-font-slab);cursor:pointer}
  `);
  ctx.root.append(style, h('div', { class: 'gt' }, street, safe, room, packEl, note));

  const hasVault = () => pack.some((i) => i.sym === '✚');
  function render(): void {
    street.replaceChildren(...rooms.map((r, i) => h('button', { class: `gt-door${r.lock && !r.opened ? ' gt-locked' : ''}${r.opened ? ' open' : ''}${i === sel ? ' cur' : ''}${r.haunted && !r.opened ? ' cold' : ''}`, type: 'button', 'data-i': i, onclick: () => openDoor(i) },
      h('b', null, r.name), h('span', null, r.opened ? 'Open ✓' : r.lock ? `Locked ${r.lock}` : 'Unlocked'), r.opened ? '' : h('em', null, r.hint))));
    safe.textContent = `Bank safe: locked ✚ ${hasVault() ? '(you have the vault key)' : ''}`;
    const r = rooms[sel];
    room.replaceChildren(r ? h('h3', null, `Inside: ${r.name}`) : h('h3', null, 'Pick a door'), ...(r ? (r.items.length ? r.items.map((it) => h('div', { class: 'gt-it' }, h('span', null, it.kind === 'salt' ? `${it.name} (shields one cold room)` : it.name), h('button', { type: 'button', 'data-take': it.id, onclick: () => take(it.id) }, 'Take'))) : [h('p', { class: 'mw-note', style: { margin: 0 } }, 'Nothing else here.')]) : [h('p', { class: 'mw-note', style: { margin: 0 } }, 'Read each door: its lock symbol and the feel of the room.')]));
    packEl.replaceChildren(h('h3', null, `Pack ${pack.length}/${PACK}`), ...(pack.length ? pack.map((it) => h('div', { class: 'gt-it' }, h('span', null, it.name), h('button', { type: 'button', 'data-drop': it.id, onclick: () => drop(it.id) }, 'Leave'))) : [h('p', { class: 'mw-note', style: { margin: 0 } }, 'Empty. A key breaks when it opens its door.')]));
    note.textContent = msg;
    ctx.hud('Town', `${level + 1}/${LV.length}`); ctx.hud('Hours', hours); ctx.hud('Nerve', `${'♥'.repeat(Math.max(0, nerve))}${'·'.repeat(Math.max(0, NERVE - nerve))}`); ctx.hud('Score', score);
  }
  function startLevel(): void {
    const c = LV[level], order = shuffle(rand, Array.from({ length: c.rooms }, (_, i) => i));
    const names = shuffle(rand, PLACES);
    const path = order.slice(0, c.chain), decoys = order.slice(c.chain);
    const syms = shuffle(rand, ['◆', '▲', '●', '■']);
    rooms = Array.from({ length: c.rooms }, (_, i) => ({ name: names[i], hint: '', haunted: false, lock: null, items: [], opened: false }));
    path.forEach((ri, k) => { if (k) rooms[ri].lock = syms[k - 1]; rooms[ri].items.push(keyItem(k < c.chain - 1 ? syms[k] : '✚')); });
    const decoyLock = syms[c.chain - 1];
    rooms[decoys[0]].lock = decoyLock; rooms[pick(rand, path)].items.push(keyItem(decoyLock));
    const free = shuffle(rand, [path[0], ...decoys.filter((d) => !rooms[d].lock)]);
    free.slice(0, 3).forEach((ri) => (rooms[ri].haunted = true));
    const calm = free.filter((ri) => !rooms[ri].haunted);
    rooms[calm.length ? calm[0] : path[0]].items.push({ id: 'salt', name: 'Jar of salt', kind: 'salt' });
    const junk = shuffle(rand, JUNK);
    decoys.forEach((d) => { for (let k = rint(rand, 1, 2); k > 0; k--) rooms[d].items.push({ id: 'j' + junk.length, name: junk.pop()!, kind: 'junk' }); });
    rooms.forEach((r) => (r.hint = pick(rand, r.haunted ? COLD : WARM)));
    chain = path; hours = c.hours; nerve = NERVE; sel = -1; pack = [];
    msg = 'Open a door. Cold rooms cost nerve. Each key fits only the door with its symbol.';
    render();
  }
  function dusk(): boolean {
    if (nerve <= 0) { ctx.finish({ result: 'lose', score, title: 'Your nerve breaks', detail: `The cold rooms got to you in town ${level + 1}.` }); return true; }
    if (hours <= 0 && !hasVault() && !(rooms[sel]?.items.some((i) => i.sym === '✚'))) { ctx.finish({ result: 'lose', score, title: 'Dusk falls', detail: `The light ran out before you reached the safe in town ${level + 1}.` }); return true; }
    return false;
  }
  /** Choose a door: open it (using a matching key) and read the room. */
  function openDoor(i: number): void {
    if (ctx.finished) return;
    const r = rooms[i];
    if (r.opened) { sel = i; msg = ''; render(); return; }
    if (r.lock) {
      const k = pack.find((p) => p.sym === r.lock);
      if (!k) { msg = `${r.name} is locked. It needs a ${r.lock} key.`; ctx.sfx('bad'); render(); return; }
      pack = pack.filter((p) => p !== k); msg = `The ${k.name} turns and snaps in the lock. `;
    } else msg = '';
    if (hours <= 0) { dusk(); return; }
    hours--; r.opened = true; sel = i;
    if (r.haunted) {
      const salt = pack.find((p) => p.kind === 'salt');
      if (salt) { pack = pack.filter((p) => p !== salt); msg += 'A cold shape rises, but the salt holds it back.'; ctx.sfx('good'); }
      else { nerve--; msg += 'A cold hand grips you: nerve -1.'; ctx.sfx('bad'); }
    } else { msg += 'The room is quiet.'; ctx.sfx('tap'); }
    render(); dusk();
  }
  function take(id: string): void {
    if (ctx.finished) return;
    const r = rooms[sel], it = r?.items.find((x) => x.id === id);
    if (!it) return;
    if (pack.length >= PACK) { msg = 'Your pack is full. Leave something first.'; ctx.sfx('bad'); render(); return; }
    r.items = r.items.filter((x) => x !== it); pack.push(it); msg = `Took the ${it.name}.`; ctx.sfx('tap'); render();
  }
  function drop(id: string): void {
    if (ctx.finished || sel < 0) return;
    const it = pack.find((x) => x.id === id);
    if (!it) return;
    pack = pack.filter((x) => x !== it); rooms[sel].items.push(it); msg = `Left the ${it.name} in ${rooms[sel].name}.`; render(); dusk();
  }
  function openSafe(): void {
    if (ctx.finished) return;
    if (!hasVault()) { msg = 'The safe needs the ✚ vault key.'; ctx.sfx('bad'); render(); return; }
    score += 300 + hours * 20 + nerve * 30; ctx.sfx('win');
    if (level >= LV.length - 1) { render(); ctx.finish({ result: 'win', score, title: 'Safe cracked', detail: `You opened all ${LV.length} safes and kept ${nerve} nerve in the last town.` }); return; }
    level++; startLevel(); msg = 'Safe open. On to the next dead town.'; render();
  }

  return {
    destroy() {},
    reset(seed) { rand = makeRng(seed); level = 0; score = 0; startLevel(); },
    probe: () => ({ level, hours, nerve, sel, pack: pack.map((p) => p.id).join(','), opened: rooms.filter((r) => r.opened).length, msg }),
    play(kind: Result) {
      for (let g = 0; g < 40 && !ctx.finished; g++) {
        if (kind === 'win') {
          const lv = level;
          for (const ri of chain) { if (level !== lv || ctx.finished) break; openDoor(ri); const k = rooms[ri].items.find((x) => x.kind === 'key' && x.sym !== undefined && (x.sym === '✚' || rooms.some((q) => q.lock === x.sym && chain.includes(rooms.indexOf(q))))); if (k) take(k.id); }
          if (level === lv && !ctx.finished) openSafe();
        } else rooms.forEach((r, i) => { if (r.haunted && !r.lock && !ctx.finished) openDoor(i); });
      }
    },
  };
}
