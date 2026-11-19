import './styles/catalog.css';
import { CATEGORIES, CONCEPTS } from '../concepts.mjs';
import start from '../../../docs/arcade-90/starting-roster.json';
import { h } from './core/dom';

type Entry = { id: string; title: string; line: string; cat: string; href: string; img: string; original: boolean };

const original: Entry[] = start.games.map((g: { id: string; title: string; tagline: string; playUrl: string; thumbnail: string }) => ({
  id: g.id, title: g.title, line: g.tagline, cat: 'original', href: `.${g.playUrl}`, img: `.${g.thumbnail}`, original: true,
}));
const fresh: Entry[] = CONCEPTS.map((c: { id: string; title: string; line: string; category: string }) => ({
  id: c.id, title: c.title, line: c.line, cat: c.category, href: `../games/${c.id}/`, img: `./covers/${c.id}.svg`, original: false,
}));
const all = [...fresh, ...original];
const catName = (id: string): string => (id === 'original' ? 'Original ten' : CATEGORIES.find((c: { id: string }) => c.id === id)?.name ?? id);

const root = document.getElementById('catalog')!;
root.replaceChildren();
let cat = 'all';
let q = '';
try {
  const p = new URLSearchParams(location.hash.slice(1));
  cat = p.get('c') ?? 'all';
  q = p.get('q') ?? '';
} catch { /* ignore */ }

const grid = h('ul', { class: 'cat-grid', id: 'cat-grid' });
const count = h('p', { class: 'cat-count', role: 'status', 'aria-live': 'polite' });
const search = h('input', { class: 'cat-search', type: 'search', placeholder: 'Search games', 'aria-label': 'Search games', value: q, autocomplete: 'off' });
const chips = h('div', { class: 'cat-chips', role: 'group', 'aria-label': 'Filter by kind of play' });

function chip(id: string, label: string, n: number): HTMLElement {
  const b = h('button', { class: 'cat-chip', type: 'button', 'aria-pressed': String(cat === id), 'data-cat': id }, label, h('span', { class: 'cat-n' }, String(n)));
  b.onclick = () => { cat = id; sync(); };
  return b;
}
function drawChips(): void {
  chips.replaceChildren(
    chip('all', 'All', all.length),
    ...CATEGORIES.map((c: { id: string; name: string }) => chip(c.id, c.name, all.filter((e) => e.cat === c.id).length)),
    chip('original', 'Original ten', original.length),
  );
}
function card(e: Entry): HTMLElement {
  return h('li', { class: 'cat-item', 'data-id': e.id },
    h('a', { class: 'cat-card', href: e.href, 'aria-label': `Play ${e.title}` },
      h('img', { class: 'cat-art', src: e.img, alt: '', width: 300, height: 500, loading: 'lazy', decoding: 'async' }),
      h('span', { class: 'cat-title' }, e.title),
      h('span', { class: 'cat-line' }, e.line),
      h('span', { class: 'cat-kind' }, catName(e.cat))));
}
function sync(): void {
  const needle = q.trim().toLowerCase();
  const shown = all.filter((e) => (cat === 'all' || e.cat === cat) && (!needle || `${e.title} ${e.line} ${catName(e.cat)}`.toLowerCase().includes(needle)));
  grid.replaceChildren(...shown.map(card));
  count.textContent = shown.length ? `${shown.length} ${shown.length === 1 ? 'game' : 'games'}` : 'No game matches. Clear the search or pick another kind of play.';
  drawChips();
  const p = new URLSearchParams();
  if (cat !== 'all') p.set('c', cat);
  if (needle) p.set('q', q.trim());
  history.replaceState(null, '', p.toString() ? `#${p}` : location.pathname + location.search);
}
search.addEventListener('input', () => { q = search.value; sync(); });

const sky = `<svg class="cat-sky" viewBox="0 0 600 120" preserveAspectRatio="xMidYMax slice" aria-hidden="true"><circle cx="470" cy="40" r="20" fill="var(--mw-bone)" stroke="var(--mw-ember)" stroke-width="2"/><circle cx="478" cy="38" r="20" fill="var(--mw-dusk)"/><polyline points="60,30 120,52 180,24 250,46" fill="none" stroke="var(--mw-rose)" stroke-width="1.2" stroke-dasharray="3 6" opacity=".8"/><g fill="var(--mw-bone)"><circle cx="60" cy="30" r="2.4"/><circle cx="120" cy="52" r="2.4"/><circle cx="180" cy="24" r="2.4"/><circle cx="250" cy="46" r="2.4"/></g><path d="M0 120V92h40l8-22h90l10 22h60l8-14h40l8 20h90l12-34h110l12 28h60v28z" fill="var(--mw-mesa)"/><path d="M0 120v-12h120l20-8h140l20 8h300v12z" fill="var(--mw-night)"/></svg>`;
const header = h('header', { class: 'cat-head' });
header.innerHTML = sky;
header.append(
  h('a', { class: 'cat-back', href: '../' }, '← Arcade home'),
  h('h1', { class: 'cat-h1' }, 'Observatory Catalog'),
  h('p', { class: 'cat-lead' }, `${fresh.length} new games and the original ten. Each one is a complete little game: learn it on the first screen, finish a run, play again.`),
);
root.append(header, h('main', { class: 'cat-main' }, h('div', { class: 'cat-bar' }, search, chips), count, grid));
sync();
