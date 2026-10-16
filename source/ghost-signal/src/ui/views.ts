import { h, clear, put } from './dom.ts';
import type { Host } from './host.ts';
import { CHAPTERS, LOCATIONS, LOC_ORDER, PEOPLE, PROOF_HINTS, SLOTS, SOURCES, SOURCE_BY_ID } from '../story/data.ts';
import {
  MAX_SUPPORT, check, chapterGoals, canCloseDay, collected, contradictions, evaluateBoard, hotspotStatus, hotspotsAt, link,
  linkConfirmed, locationOpen, place, setConclusion, slotFor, toggleSupport, unlink,
} from '../story/engine.ts';
import { RULES, describeClaim } from '../story/rules.ts';
import type { Contradiction } from '../story/rules.ts';
import { SceneRenderer } from '../render/scene.ts';
import { sourceImage } from '../render/photos.ts';
import { fmt } from '../story/types.ts';
import type { CaseState, Culprit, Mechanism, Motive, Source, SourceKind } from '../story/types.ts';

export const KIND_LABEL: Record<SourceKind, string> = {
  log: 'Machine log', physical: 'Physical item', forensic: 'Lab result', document: 'Document', fragment: 'Memory fragment', testimony: 'Statement',
};

export const flag = (text: string, cls = ''): HTMLElement => h('span', { class: 'flag ' + cls }, text);
/** Back-compat name used by modals. */
export const badge = flag;

export function conMap(cons: Contradiction[]): Map<string, Contradiction[]> {
  const m = new Map<string, Contradiction[]>();
  for (const c of cons) for (const id of [c.a, c.b]) { const l = m.get(id) ?? []; l.push(c); m.set(id, l); }
  return m;
}

/** Item number as printed on the evidence tag: E (hard), F (fragment), S (statement), counted in order of collection. */
export function itemNo(S: CaseState, id: string): string {
  const pre = (s: Source): string => (s.hard ? 'E' : s.kind === 'fragment' ? 'F' : 'S');
  const src = SOURCE_BY_ID[id];
  if (!src || !S.log.includes(id)) return 'Not logged';
  const p = pre(src); let n = 0;
  for (const x of S.log) { if (pre(SOURCE_BY_ID[x]) === p) n++; if (x === id) break; }
  return `${p}-${String(n).padStart(2, '0')}`;
}

/** Status flags in words (never colour alone). */
export function statusFlags(src: Source, cs: Contradiction[]): HTMLElement[] {
  const active = cs.filter((c) => !c.resolved);
  const out: HTMLElement[] = [];
  if (active.some((c) => c.refuted === src.id)) out.push(flag('Refuted by hard evidence', 'bad'));
  else if (active.length && src.hard && active.every((c) => c.refuted && c.refuted !== src.id)) out.push(flag(active.length === 1 ? 'Refutes 1 source' : `Refutes ${active.length} sources`, 'ok'));
  else if (active.length) out.push(flag(active.length === 1 ? 'In conflict' : `In conflict, ${active.length}`, 'warn'));
  else if (cs.length) out.push(flag('Resolved', 'ok'));
  return out;
}
export function sourceBadges(src: Source, cs: Contradiction[]): HTMLElement[] {
  return [flag(KIND_LABEL[src.kind], 'kind'), flag(src.hard ? 'Hard source' : 'Soft source', src.hard ? 'hard' : 'soft'), ...statusFlags(src, cs)];
}

export function claimsList(src: Source): HTMLElement {
  if (!src.claims.length) return h('p', { class: 'muted' }, 'No machine-readable claims. Use it as context.');
  return h('ul', { class: 'readout' }, src.claims.map((c) => h('li', null, describeClaim(c))));
}

/** Photographed object, video frame or slip, as an <img>. */
export function thumb(src: Source, w: number, h2: number, cls = 'thumb'): HTMLElement {
  return h('img', { class: cls, src: sourceImage(src, w, h2), alt: '', width: w / 2, height: h2 / 2, decoding: 'async' });
}

const sentence = (t: string): string => (t === t.toUpperCase() ? t.charAt(0) + t.slice(1).toLowerCase() : t);
export { sentence };

// ================================================================== SCENE
export interface SceneView { el: HTMLElement; update(): void; renderer: SceneRenderer }

/** Hotspot outline sizes (percent of the stage), matched to the painted objects. */
const HS_BOX: Record<string, [number, number]> = {
  'hs-door-ledger': [8, 16], 'hs-relay': [8, 26], 'hs-booth-recorder': [7, 7], 'hs-booth-loop': [10, 11], 'hs-booth-badge': [10, 11], 'npc-brisk': [11, 38], 'npc-pell': [11, 36],
  'hs-cradle': [8, 7], 'hs-wire': [10, 12], 'hs-safe': [9, 17], 'hs-photo': [9, 17], 'npc-quill': [11, 42],
  'hs-rig': [20, 28], 'hs-fuse': [9, 22], 'hs-b2-cam': [8, 9], 'hs-blackbox': [8, 8], 'hs-roque-reader': [11, 13], 'hs-chalk': [17, 12],
  'npc-voss': [10, 42], 'hs-annex-sign': [26, 60], 'hs-locker': [14, 38],
  'hs-dock-cam': [8, 9], 'hs-dock-console': [12, 22],
  'npc-quill-bar': [11, 42], 'hs-receipt': [11, 12],
};
const CAM_NO: Record<string, number> = { lobby: 1, office: 4, vault: 3, annex: 6, dock: 2, bar: 9 };
const NIGHT_CLOCK = [0, 41 * 60, 23 * 3600 + 5 * 60, 22 * 3600 + 30 * 60];

export function buildScene(host: Host): SceneView {
  const canvas = h('canvas', { class: 'scene-canvas', 'aria-hidden': 'true' });
  const hotLayer = h('div', { class: 'hotspots' });
  const plate = h('div', { class: 'plate' });
  const cam = h('div', { class: 'cam', 'aria-hidden': 'true' });
  const stage = h('div', { class: 'stage' }, canvas, hotLayer, plate, cam);
  const bezel = h('div', { class: 'bezel' }, stage);
  const nav = h('div', { class: 'loc-nav', role: 'group', 'aria-label': 'Go to a location' });
  const blurb = h('p', { class: 'loc-blurb' });
  const side = h('aside', { class: 'side', 'aria-label': 'Night brief and this room' });
  const el = h('section', { class: 'scene-view' }, h('div', { class: 'scene-main' }, bezel, h('div', { class: 'nav-row' }, h('span', { class: 'nav-label' }, 'Go to'), nav), blurb), side);
  const renderer = new SceneRenderer(canvas);
  let lastLoc = '';
  const started = Date.now();
  const tc = h('span', { class: 'tc' });
  const tick = (): void => {
    const base = NIGHT_CLOCK[host.state.chapter] ?? 0;
    const secs = (base + Math.floor((Date.now() - started) / 1000)) % 86400;
    tc.textContent = [secs / 3600, (secs / 60) % 60, secs % 60].map((v) => String(Math.floor(v)).padStart(2, '0')).join(':');
  };
  window.setInterval(() => { if (!el.hidden && el.isConnected && !document.hidden) tick(); }, 1000);

  const update = (): void => {
    const S = host.state;
    const loc = LOCATIONS[S.loc];
    if (lastLoc !== S.loc) { renderer.setLocation(S.loc); lastLoc = S.loc; }
    plate.replaceChildren(h('strong', null, loc.name), h('span', null, loc.floor));
    tick();
    cam.replaceChildren(h('span', null, `Cam ${CAM_NO[S.loc] ?? 1}`), tc);
    blurb.textContent = loc.blurb;
    clear(nav);
    for (const id of LOC_ORDER) {
      const L = LOCATIONS[id];
      const open = locationOpen(S, id);
      nav.appendChild(h('button', {
        class: 'loc' + (id === S.loc ? ' on' : ''), type: 'button', disabled: !open, 'aria-current': id === S.loc ? 'location' : null,
        'data-fk': 'loc-' + id, onclick: () => host.go(id),
      }, h('span', null, L.name), !open ? h('small', null, `Opens night ${L.unlock}`) : null));
    }
    clear(hotLayer);
    const spots = hotspotsAt(S, S.loc);
    for (const hs of spots) {
      const st = hotspotStatus(S, hs);
      const [bw, bh] = HS_BOX[hs.id] ?? [8, 10];
      hotLayer.appendChild(h('button', {
        class: `hot ${hs.kind}${st.done ? ' done' : ''}${!st.open ? ' locked' : ''}`, type: 'button', tabindex: -1, 'aria-hidden': 'true',
        style: `left:${hs.x - bw / 2}%;top:${hs.y - bh / 2}%;width:${bw}%;height:${bh}%`, 'data-hs': hs.id, onclick: () => host.openHotspot(hs.id),
      }, h('i', { class: 'c tl' }), h('i', { class: 'c tr' }), h('i', { class: 'c bl' }), h('i', { class: 'c br' }), h('i', { class: 'scan' }),
      h('span', { class: 'hot-label' }, hs.label, st.done ? h('em', null, 'Logged') : !st.open ? h('em', null, 'Locked') : null)));
    }
    clear(side);
    const ch = CHAPTERS[S.chapter - 1];
    const goals = chapterGoals(S);
    const verb = (k: string): string => (k === 'talk' ? 'Talk to' : k === 'lore' ? 'Look at' : k === 'decision' ? 'Decide' : 'Examine');
    side.append(
      h('section', { class: 'panel brief' }, h('h2', null, `Night ${ch.n}: ${ch.title}`), h('p', null, ch.brief)),
      h('section', { class: 'panel' },
        h('h3', null, ch.n < 3 ? 'Tonight' : 'Final night'),
        goals.length
          ? h('ul', { class: 'goals' }, goals.map((g) => h('li', { class: g.done ? 'done' : '' }, h('span', { class: 'box', 'aria-hidden': 'true' }), h('span', null, g.text), h('span', { class: 'sr-only' }, g.done ? ' (done)' : ' (open)'))))
          : h('p', null, 'Fill the reconstruction, then file a conclusion. The Magistrate does not grade on a curve.'),
        ch.n < 3
          ? h('button', { class: 'btn primary', type: 'button', disabled: !canCloseDay(S), onclick: () => host.confirmCloseDay(), 'data-fk': 'close-day' }, 'Close the day')
          : h('button', { class: 'btn primary', type: 'button', onclick: () => host.setTab(S.ending ? 'conclude' : 'reconstruct'), 'data-fk': 'to-recon' }, 'Open the reconstruction')),
      h('section', { class: 'panel room' }, h('h3', null, 'In this room'),
        h('ul', { class: 'room-list' }, spots.map((hs) => {
          const st = hotspotStatus(S, hs);
          return h('li', null, h('button', {
            class: 'room-btn', type: 'button', 'data-fk': 'poi-' + hs.id, onclick: () => host.openHotspot(hs.id),
            onmouseenter: () => mark(hs.id, true), onmouseleave: () => mark(hs.id, false), onfocus: () => mark(hs.id, true), onblur: () => mark(hs.id, false),
          }, h('span', { class: 'verb' }, verb(hs.kind)), h('span', { class: 'name' }, hs.label),
          st.done ? flag('Logged', 'ok') : !st.open ? flag('Locked', 'warn') : null));
        }))),
    );
  };
  const mark = (id: string, on: boolean): void => { hotLayer.querySelector(`[data-hs="${id}"]`)?.classList.toggle('hl', on); };
  return { el, update, renderer };
}

// ================================================================== LOG
let logFilter: 'all' | 'evidence' | 'fragment' | 'testimony' = 'all';
let logQuery = '';

export function renderLog(host: Host, root: HTMLElement): void {
  const S = host.state;
  const cons = conMap(contradictions(S));
  const all = collected(S);
  const items = all.filter((s) => {
    if (logFilter === 'evidence' && (s.kind === 'fragment' || s.kind === 'testimony')) return false;
    if (logFilter === 'fragment' && s.kind !== 'fragment') return false;
    if (logFilter === 'testimony' && s.kind !== 'testimony') return false;
    const q = logQuery.trim().toLowerCase();
    return !q || (s.title + ' ' + s.text + ' ' + s.where).toLowerCase().includes(q);
  });
  const count = (f: typeof logFilter): number => all.filter((s) => f === 'all' || (f === 'evidence' ? s.kind !== 'fragment' && s.kind !== 'testimony' : s.kind === f)).length;
  const filters: [typeof logFilter, string][] = [['all', 'All'], ['evidence', 'Physical and logs'], ['fragment', 'Memory fragments'], ['testimony', 'Statements']];
  clear(root);
  put(root,
    h('div', { class: 'view-head' }, h('h2', null, 'Evidence log'), h('p', { class: 'muted' }, `${S.log.length} of ${SOURCES.length} sources logged. Open a row to read the full entry.`)),
    h('div', { class: 'toolbar' },
      h('div', { class: 'seg', role: 'group', 'aria-label': 'Show' }, filters.map(([id, label]) => h('button', {
        class: 'seg-btn' + (logFilter === id ? ' on' : ''), type: 'button', 'aria-pressed': String(logFilter === id), 'data-fk': 'lf-' + id,
        onclick: () => { logFilter = id; host.rerender(); },
      }, label, h('span', { class: 'n' }, String(count(id)))))),
      h('label', { class: 'search' }, h('span', { class: 'sr-only' }, 'Search the log'),
        h('input', { type: 'search', placeholder: 'Search titles and text', value: logQuery, 'data-fk': 'log-q', oninput: (e: Event) => { logQuery = (e.target as HTMLInputElement).value; host.rerender(); } }))),
    items.length ? h('ol', { class: 'ev-list' }, items.map((s) => logRow(host, s, cons.get(s.id) ?? [])))
      : h('p', { class: 'empty' }, S.log.length ? 'Nothing matches that search.' : 'Your log is empty. Examine something in the scene.'),
  );
}

function logRow(host: Host, s: Source, cs: Contradiction[]): HTMLElement {
  const S = host.state;
  const flags = statusFlags(s, cs);
  return h('li', null, h('button', { class: 'ev-row' + (flags.some((f) => f.classList.contains('bad')) ? ' refuted' : flags.length && !flags[0].classList.contains('ok') ? ' conflict' : ''), type: 'button', 'data-fk': 'open-' + s.id, onclick: () => host.openSource(s.id) },
    thumb(s, 192, 128),
    h('span', { class: 'tag' }, itemNo(S, s.id)),
    h('span', { class: 'ev-main' },
      h('span', { class: 'ev-title' }, s.title),
      h('span', { class: 'ev-sub' }, `${KIND_LABEL[s.kind]}, ${s.hard ? 'hard' : 'soft'}. Found: ${s.where}.`)),
    h('span', { class: 'ev-time' }, s.ts !== undefined ? fmt(s.ts) : ''),
    h('span', { class: 'ev-flags' }, flags)));
}

// ================================================================== BOARD
let boardSel: string[] = [];

export function renderBoard(host: Host, root: HTMLElement): void {
  const S = host.state;
  const all = contradictions(S);
  const cons = conMap(all);
  const items = collected(S);
  const groups: [string, string, Source[]][] = [['scene', 'The scene', items.filter((x) => x.subject === 'scene')]];
  for (const p of ['quill', 'brisk', 'voss', 'pell', 'roque'] as const) groups.push([p, PEOPLE[p].name, items.filter((x) => x.subject === p)]);
  const linkCount = (id: string): number => S.links.filter((l) => l[0] === id || l[1] === id).length;
  const active = all.filter((c) => !c.resolved).length;
  clear(root);
  put(root,
    h('div', { class: 'view-head row-head' },
      h('div', null, h('h2', null, 'Case board'),
        h('p', { class: 'muted' }, 'Pick two items, then link them. A link that one of the seven rules backs up is marked confirmed. Every contradiction also appears under Contradictions, linked or not.')),
      h('div', { class: 'board-actions' },
        h('button', { class: 'btn primary', type: 'button', disabled: boardSel.length !== 2, 'data-fk': 'link-btn', onclick: () => {
          const [a, b] = boardSel; boardSel = []; host.apply(link(S, a, b));
        } }, boardSel.length === 2 ? 'Link the selected pair' : `Pick two items (${boardSel.length} of 2)`),
        h('button', { class: 'btn', type: 'button', disabled: !boardSel.length, onclick: () => { boardSel = []; host.rerender(); } }, 'Clear selection'))),
    h('p', { class: 'board-stats' }, h('span', null, h('b', null, String(active)), active === 1 ? ' open conflict' : ' open conflicts'), h('span', null, h('b', null, String(S.links.length)), S.links.length === 1 ? ' link' : ' links')),
    items.length ? h('div', { class: 'board-cols' }, groups.filter((g) => g[2].length).map(([, name, list]) =>
      h('section', { class: 'col', 'aria-label': name }, h('h3', null, name, h('span', { class: 'n' }, String(list.length))),
        list.map((s) => {
          const sel = boardSel.includes(s.id);
          const n = (cons.get(s.id) ?? []).filter((c) => !c.resolved).length;
          const lc = linkCount(s.id);
          return h('button', {
            class: `pin${sel ? ' sel' : ''}${n ? ' flagged' : ''}`, type: 'button', 'aria-pressed': String(sel), 'data-fk': 'pin-' + s.id,
            onclick: () => { boardSel = sel ? boardSel.filter((x) => x !== s.id) : [...boardSel, s.id].slice(-2); host.rerender(); },
          }, thumb(s, 112, 76, 'pin-thumb'),
          h('span', { class: 'pin-body' },
            h('span', { class: 'pin-top' }, h('span', { class: 'tag small' }, itemNo(S, s.id)), s.ts !== undefined ? h('span', { class: 'time' }, fmt(s.ts)) : null),
            h('span', { class: 'pin-title' }, s.title),
            (n || lc) ? h('span', { class: 'pin-note' }, [n ? `${n} conflict${n > 1 ? 's' : ''}` : '', lc ? `${lc} link${lc > 1 ? 's' : ''}` : ''].filter(Boolean).join(', ')) : null));
        })))) : h('p', { class: 'empty' }, 'Nothing on the board yet. Logged evidence appears here.'),
    boardSel.length ? h('section', { class: 'compare', 'aria-label': 'Selected items' }, boardSel.map((id, i) => {
      const s = SOURCE_BY_ID[id];
      return h('div', { class: 'cmp' }, thumb(s, 320, 214, 'cmp-img'),
        h('div', null, h('p', { class: 'cmp-k' }, `Selected ${i + 1}`), h('h4', null, s.title), h('p', null, s.text.length > 240 ? s.text.slice(0, 238).trimEnd() + '…' : s.text),
          h('button', { class: 'btn small', type: 'button', onclick: () => host.openSource(id) }, 'Read the full entry')));
    })) : null,
    S.links.length ? h('section', { class: 'panel links' }, h('h3', null, 'Links'),
      h('ul', { class: 'link-list' }, S.links.map((l) => {
        const con = linkConfirmed(S, l);
        return h('li', { class: con ? (con.resolved ? 'resolved' : 'confirmed') : '' },
          h('span', { class: 'pair' }, h('b', null, SOURCE_BY_ID[l[0]].title), h('span', { class: 'with' }, 'with'), h('b', null, SOURCE_BY_ID[l[1]].title)),
          con ? flag(con.resolved ? 'Contradiction, resolved' : `Confirmed: ${RULES[con.rule].name.toLowerCase()} (${con.rule})`, con.resolved ? 'ok' : 'bad') : flag('Association only', 'kind'),
          h('button', { class: 'btn small', type: 'button', onclick: () => { unlink(S, l[0], l[1]); host.persist(); host.rerender(); } }, 'Remove link'));
      }))) : null,
  );
}

// ================================================================== RECONSTRUCT
let selFrag: string | null = null;

export function renderReconstruct(host: Host, root: HTMLElement): void {
  const S = host.state;
  const view = evaluateBoard(S);
  const frags = collected(S).filter((s) => s.kind === 'fragment' && s.ts !== undefined).sort((a, b) => (a.ts ?? 0) - (b.ts ?? 0));
  const placedIds = new Set(Object.values(S.board).filter(Boolean));
  const cons = conMap(contradictions(S));
  clear(root);
  put(root,
    h('div', { class: 'view-head' }, h('h2', null, 'Reconstruction'),
      h('p', { class: 'muted' }, 'Put one memory fragment in each time slot. A fragment only fits the slot whose window holds its timestamp. The board tests every placed fragment against all the hard evidence you hold.')),
    h('div', { class: 'recon-status ' + (view.valid ? 'ok' : view.contradictions.length ? 'bad' : 'idle'), role: 'status' },
      view.valid ? 'The reconstruction holds: every key slot is filled and nothing on the board contradicts anything.'
        : view.contradictions.length ? `${view.contradictions.length} contradiction${view.contradictions.length > 1 ? 's' : ''} on the board. Remove or replace the fragment that conflicts.`
          : !view.keyFilled ? 'The four key slots still need fragments.' : 'A key slot holds a fragment the timeline cannot rely on yet.'),
    h('ol', { class: 'bays' }, SLOTS.map((sl, i) => {
      const sv = view.slots[i];
      const frag = sv.frag ? SOURCE_BY_ID[sv.frag] : null;
      const eligible = selFrag ? slotFor(SOURCE_BY_ID[selFrag]) === sl.id : false;
      const status = sv.status === 'conflict' ? `Conflicts with ${sv.conflicts.length} source${sv.conflicts.length > 1 ? 's' : ''}` : sv.status === 'ok' ? 'Holds' : sv.status === 'unverified' ? 'Not yet verified' : 'Empty';
      return h('li', { class: `bay ${sv.status}${eligible ? ' eligible' : ''}${sl.key ? ' key' : ''}` },
        h('div', { class: 'bay-head' }, h('span', { class: 'bay-n' }, String(i + 1)), h('strong', null, sl.name)),
        h('div', { class: 'bay-time' }, `${fmt(sl.from)} to ${fmt(sl.to)}`, sl.key ? h('span', { class: 'keyslot' }, 'Key slot') : null),
        frag ? h('div', { class: 'bay-frag' }, thumb(frag, 320, 180, 'frame'), h('b', null, frag.title),
          h('div', { class: 'row' },
            h('button', { class: 'btn small', type: 'button', onclick: () => host.openSource(frag.id) }, 'Read'),
            h('button', { class: 'btn small', type: 'button', 'data-fk': 'clear-' + sl.id, onclick: () => { host.apply(place(S, sl.id, null)); } }, 'Clear slot')))
          : h('button', { class: 'bay-empty', type: 'button', disabled: !eligible, 'data-fk': 'slot-' + sl.id,
            onclick: () => { if (selFrag) { const f = selFrag; selFrag = null; host.apply(place(S, sl.id, f)); } } },
          eligible ? 'Place the selected fragment here' : 'No fragment'),
        h('p', { class: 'bay-status' }, status));
    })),
    h('section', { class: 'panel tray' }, h('h3', null, 'Fragment tray'),
      h('p', { class: 'muted small' }, selFrag ? 'Now choose the highlighted slot.' : 'Select a fragment, then choose its slot.'),
      frags.length ? h('ul', { class: 'strip' }, frags.map((f) => {
        const slot = SLOTS.find((x) => x.id === slotFor(f));
        const placed = placedIds.has(f.id);
        const sel = selFrag === f.id;
        return h('li', { class: 'reel' + (sel ? ' sel' : '') + (placed ? ' placed' : '') },
          thumb(f, 320, 180, 'frame'),
          h('div', { class: 'reel-body' },
            h('b', null, f.title),
            h('span', { class: 'muted small' }, `Recorded ${fmt(f.ts ?? 0)}. Fits ${slot ? slot.name : 'no slot'}.`),
            h('span', { class: 'ev-flags' }, statusFlags(f, cons.get(f.id) ?? [])),
            h('div', { class: 'row' },
              h('button', { class: 'btn small', type: 'button', onclick: () => host.openSource(f.id) }, 'Read'),
              placed ? flag('On the board', 'ok')
                : h('button', { class: 'btn small' + (sel ? ' primary' : ''), type: 'button', 'aria-pressed': String(sel), 'data-fk': 'sel-' + f.id, onclick: () => { selFrag = sel ? null : f.id; host.rerender(); } }, sel ? 'Selected' : 'Select'))));
      })) : h('p', { class: 'empty' }, 'No memory fragments logged yet.')),
    view.contradictions.length ? h('section', { class: 'panel' }, h('h3', null, 'What the board contradicts'), h('ol', { class: 'analysis' }, view.contradictions.map((c) => conCard(host, c, false)))) : null,
  );
}

// ================================================================== CONTRADICTIONS
let showResolved = false;

function claimOf(c: Contradiction, side: 0 | 1): string | null {
  const parts = c.id.split('|');
  const src = SOURCE_BY_ID[side === 0 ? c.a : c.b];
  const idx = Number(parts[3 + side]);
  const cl = Number.isInteger(idx) && idx >= 0 ? src.claims[idx] : undefined;
  return cl ? describeClaim(cl) : null;
}

export function conCard(host: Host, c: Contradiction, withOpen = true): HTMLElement {
  const A = SOURCE_BY_ID[c.a]; const B = SOURCE_BY_ID[c.b];
  const verdict = c.resolved ? 'Resolved. A statement was retracted.' : c.verdict === 'refuted' ? `${SOURCE_BY_ID[c.refuted ?? '']?.title ?? 'The soft source'} is refuted: hard evidence says otherwise.` : 'Disputed. Both sources are soft, so one of them is false.';
  const side = (s: Source, i: 0 | 1): HTMLElement => {
    const cl = claimOf(c, i);
    return h('div', { class: 'side-src' + (c.refuted === s.id ? ' loses' : '') },
      h('span', { class: 'src-k' }, `${s.hard ? 'Hard' : 'Soft'}, ${KIND_LABEL[s.kind].toLowerCase()}`),
      withOpen ? h('button', { class: 'linkish', type: 'button', onclick: () => host.openSource(s.id) }, s.title) : h('b', null, s.title),
      cl ? h('span', { class: 'claim' }, cl) : null);
  };
  return h('li', { class: 'finding ' + (c.resolved ? 'resolved' : c.verdict) },
    h('div', { class: 'finding-head' }, h('span', { class: 'rule' }, c.rule), h('strong', null, RULES[c.rule].name)),
    h('div', { class: 'vs' }, side(A, 0), h('span', { class: 'vs-mark', 'aria-hidden': 'true' }, 'against'), side(B, 1)),
    (() => { const both = claimOf(c, 0) && claimOf(c, 1); const extra = c.detail.match(/\(([^)]*)\)\s*$/); const d = both ? (extra ? extra[1].charAt(0).toUpperCase() + extra[1].slice(1) + '.' : null) : c.detail; return d ? h('p', { class: 'detail' }, d) : null; })(),
    h('p', { class: 'verdict' }, verdict, ' ', h('span', { class: 'muted' }, RULES[c.rule].explain)));
}

export function renderContradictions(host: Host, root: HTMLElement): void {
  const all = contradictions(host.state);
  const active = all.filter((c) => !c.resolved);
  const resolved = all.filter((c) => c.resolved);
  clear(root);
  put(root,
    h('div', { class: 'view-head' }, h('h2', null, 'Contradictions'),
      h('p', { class: 'muted' }, 'Seven fixed rules compare every pair of sources you hold. Nothing here is random. Hard evidence beats a soft source; two soft sources that disagree only tell you one of them is lying.')),
    h('details', { class: 'panel rules' }, h('summary', null, 'The seven rules'),
      h('dl', { class: 'rule-list' }, (Object.keys(RULES) as (keyof typeof RULES)[]).map((r) => [h('dt', null, h('span', { class: 'rule' }, r), ' ', RULES[r].name), h('dd', null, RULES[r].explain)]))),
    active.length ? h('ol', { class: 'analysis' }, active.map((c) => conCard(host, c))) : h('p', { class: 'empty' }, 'No open contradictions. Either everyone is honest, or you have not logged enough.'),
    resolved.length ? h('label', { class: 'check' }, h('input', { type: 'checkbox', checked: showResolved, onchange: (e: Event) => { showResolved = (e.target as HTMLInputElement).checked; host.rerender(); } }), `Show ${resolved.length} resolved`) : null,
    showResolved ? h('ol', { class: 'analysis' }, resolved.map((c) => conCard(host, c))) : null,
  );
}

// ================================================================== CONCLUDE
const CULPRITS: [Culprit, string][] = [['quill', 'Mara Quill'], ['brisk', 'Teodor Brisk'], ['voss', 'Linnea Voss'], ['pell', 'Ottoline Pell'], ['none', 'No one: it was self-inflicted']];
const MECHS: [Mechanism, string][] = [
  ['self-overload', 'Roque overloaded his own rig'],
  ['sabotage-restore', 'The protector was sabotaged and the power-restore spike killed him'],
  ['blackout-strike', 'A direct strike the moment the lights went out'],
];
const MOTIVES: [Motive, string][] = [
  ['inheritance-money', 'Money: the Corvane sale'], ['cover-smuggling', 'Covering a smuggling arrangement'],
  ['stolen-grief', 'Grief: something taken from the killer'], ['despair', 'Despair'],
];

let lastCheck = false;

export function renderConclude(host: Host, root: HTMLElement): void {
  const S = host.state;
  const c = S.conclusion;
  clear(root);
  if (S.ending) {
    put(root, h('div', { class: 'view-head' }, h('h2', null, 'Case filed')), h('p', null, 'The Magistrate has heard your conclusion.'),
      h('div', { class: 'row' }, h('button', { class: 'btn primary', type: 'button', onclick: () => host.openEnding() }, 'Read the ending'), h('button', { class: 'btn', type: 'button', onclick: () => host.newCase() }, 'Open a new case')));
    return;
  }
  const radios = <T extends string>(n: number, legend: string, name: string, opts: [T, string][], cur: T | '', set: (v: T) => void): HTMLElement =>
    h('fieldset', { class: 'q' }, h('legend', null, h('span', { class: 'qn' }, String(n)), legend), opts.map(([v, label]) =>
      h('label', { class: 'opt' + (cur === v ? ' on' : '') }, h('input', { type: 'radio', name, value: v, checked: cur === v, onchange: () => { set(v); host.persist(); lastCheck = false; host.rerender(); } }), h('span', null, label))));
  const log = collected(S);
  const res = lastCheck ? check(S) : null;
  const field = (ok: boolean, label: string, hint: string): HTMLElement =>
    h('li', { class: ok ? 'ok' : 'no' }, h('span', { class: 'mark', 'aria-hidden': 'true' }, ok ? '✓' : '✗'), h('span', null, h('strong', null, `${label}: ${ok ? 'supported' : 'not supported'}`), ok ? null : h('span', { class: 'muted' }, ' ' + hint)));
  put(root,
    h('div', { class: 'view-head' }, h('h2', null, 'Conclusion'),
      h('p', { class: 'muted' }, S.chapter < 3 ? 'You can draft a conclusion now, but the Magistrate only hears it on the third night.' : 'Answer three questions and cite the sources that prove each answer. The Magistrate checks the answers, the proof and your reconstruction.')),
    h('form', { class: 'filing', onsubmit: (e: Event) => e.preventDefault() },
      h('div', { class: 'concl-grid' },
        radios(1, 'Who did it?', 'culprit', CULPRITS, c.culprit, (v) => setConclusion(S, { culprit: v })),
        radios(2, 'How?', 'mech', MECHS, c.mechanism, (v) => setConclusion(S, { mechanism: v })),
        radios(3, 'Why?', 'motive', MOTIVES, c.motive, (v) => setConclusion(S, { motive: v }))),
      h('fieldset', { class: 'q support' }, h('legend', null, h('span', { class: 'qn' }, '4'), `Cite your sources (${c.support.length} of ${MAX_SUPPORT})`),
        log.length ? h('div', { class: 'support-list' }, log.map((s) => {
          const on = c.support.includes(s.id);
          return h('label', { class: 'opt cite' + (on ? ' on' : '') }, h('input', { type: 'checkbox', checked: on, disabled: !on && c.support.length >= MAX_SUPPORT, onchange: () => { toggleSupport(S, s.id); host.persist(); lastCheck = false; host.rerender(); } }),
            h('span', { class: 'tag small' }, itemNo(S, s.id)), h('span', null, s.title));
        })) : h('p', { class: 'empty' }, 'Your log is empty.')),
      h('div', { class: 'row' },
        h('button', { class: 'btn', type: 'button', 'data-fk': 'check-btn', onclick: () => { lastCheck = true; host.rerender(); } }, 'Run the Magistrate\'s check'),
        h('button', { class: 'btn primary', type: 'button', disabled: !c.culprit || S.chapter < 3, 'data-fk': 'submit-btn', onclick: () => host.openSubmit() }, 'File the conclusion'))),
    res ? h('section', { class: 'panel report', role: 'status' }, h('h3', null, 'Magistrate\'s check'), h('p', { class: 'muted small' }, 'A preview. Nothing has been filed.'),
      h('ul', { class: 'checks' },
        field(res.supported.culprit, 'Culprit', PROOF_HINTS.culprit),
        field(res.supported.mechanism, 'Mechanism', PROOF_HINTS.mechanism),
        field(res.supported.motive, 'Motive', PROOF_HINTS.motive),
        field(res.board.valid, 'Reconstruction', res.board.contradictions.length ? 'The board contradicts itself.' : 'Fill the four key slots with fragments that hold.'),
        S.log.includes('ev-ledger') ? field(res.lawful, 'Ledger lawfulness', 'The ledger came from a black-market decrypt. A defence lawyer will find that.') : null)) : null,
  );
}

export function resetViewState(): void { boardSel = []; selFrag = null; logFilter = 'all'; logQuery = ''; lastCheck = false; showResolved = false; }
