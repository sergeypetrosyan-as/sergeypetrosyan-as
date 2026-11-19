type Child = Node | string | number | false | null | undefined | Child[];
type Attrs = Record<string, any>;
const SVG_TAGS = new Set(['svg', 'g', 'path', 'circle', 'rect', 'line', 'polygon', 'polyline', 'text', 'defs', 'use', 'ellipse']);

/** Tiny hyperscript: h('div', { class: 'x', onclick: fn, style: { gap: '4px' }, 'aria-label': 'y' }, child...) */
export function h<K extends keyof HTMLElementTagNameMap>(tag: K, attrs?: Attrs | null, ...kids: Child[]): HTMLElementTagNameMap[K];
export function h(tag: string, attrs?: Attrs | null, ...kids: Child[]): HTMLElement;
export function h(tag: string, attrs?: Attrs | null, ...kids: Child[]): HTMLElement {
  const el = SVG_TAGS.has(tag) ? (document.createElementNS('http://www.w3.org/2000/svg', tag) as unknown as HTMLElement) : document.createElement(tag);
  for (const [k, v] of Object.entries(attrs ?? {})) {
    if (v == null || v === false) continue;
    if (k === 'style' && typeof v === 'object') Object.assign(el.style, v);
    else if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2), v);
    else if (k === 'text') el.textContent = String(v);
    else el.setAttribute(k, v === true ? '' : String(v));
  }
  const add = (c: Child): void => {
    if (Array.isArray(c)) c.forEach(add);
    else if (c != null && c !== false) el.append(c instanceof Node ? c : String(c));
  };
  kids.forEach(add);
  return el;
}
