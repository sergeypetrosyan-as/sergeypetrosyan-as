// Tiny DOM helpers, modal stack with focus trap, and toasts.

type Child = string | number | Node | null | undefined | false | Child[];
type Attrs = Record<string, string | number | boolean | null | undefined | ((e: Event) => void)>;

export function h<K extends keyof HTMLElementTagNameMap>(tag: K, attrs?: Attrs | null, ...kids: Child[]): HTMLElementTagNameMap[K] {
  const el = document.createElement(tag);
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v === null || v === undefined || v === false) continue;
      if (k.startsWith('on') && typeof v === 'function') el.addEventListener(k.slice(2).toLowerCase(), v as EventListener);
      else if (k === 'class') el.className = String(v);
      else if (v === true) el.setAttribute(k, '');
      else el.setAttribute(k, String(v));
    }
  }
  append(el, kids);
  return el;
}
function append(el: Node, kids: Child[]): void {
  for (const k of kids) {
    if (k === null || k === undefined || k === false) continue;
    if (Array.isArray(k)) append(el, k);
    else el.appendChild(typeof k === 'object' ? k : document.createTextNode(String(k)));
  }
}
export function put(el: Element, ...kids: Child[]): void { append(el, kids); }
export function clear(el: Element): void { while (el.firstChild) el.removeChild(el.firstChild); }

export const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

// ------------------------------------------------------------------ modal stack
export interface Modal {
  root: HTMLElement;
  close: () => void;
  onKey?: (e: KeyboardEvent) => boolean;
  closable: boolean;
}
const stack: Modal[] = [];
let returnFocus: (HTMLElement | null)[] = [];
let host: HTMLElement;
let appRoot: HTMLElement;
let onStackChange: () => void = () => undefined;

export function initModals(overlay: HTMLElement, app: HTMLElement, change: () => void): void {
  host = overlay; appRoot = app; onStackChange = change;
  document.addEventListener('keydown', (e) => {
    const top = stack[stack.length - 1];
    if (!top) return;
    if (top.onKey && top.onKey(e)) return;
    if (e.key === 'Escape' && top.closable) { e.preventDefault(); top.close(); return; }
    if (e.key === 'Tab') {
      const f = [...top.root.querySelectorAll<HTMLElement>(FOCUSABLE)].filter((x) => x.offsetParent !== null || x === document.activeElement);
      if (!f.length) { e.preventDefault(); return; }
      const first = f[0]; const last = f[f.length - 1];
      if (!top.root.contains(document.activeElement)) { e.preventDefault(); first.focus(); }
      else if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });
}
export const modalOpen = (): boolean => stack.length > 0;
export const topModal = (): Modal | undefined => stack[stack.length - 1];

export function openModal(content: HTMLElement, opts: { closable?: boolean; onClose?: () => void; onKey?: (e: KeyboardEvent) => boolean; wide?: boolean; cls?: string; label?: string } = {}): Modal {
  const closable = opts.closable !== false;
  const root = h('div', { class: 'modal-layer ' + (opts.cls ?? ''), role: 'dialog', 'aria-modal': 'true', 'aria-label': opts.label ?? 'Dialog' });
  const panel = h('div', { class: 'modal' + (opts.wide ? ' wide' : '') }, content);
  root.appendChild(panel);
  const m: Modal = {
    root, closable, onKey: opts.onKey,
    close: () => {
      const i = stack.indexOf(m);
      if (i < 0) return;
      stack.splice(i, 1);
      root.remove();
      const rf = returnFocus.splice(i, 1)[0];
      appRoot.toggleAttribute('inert', stack.length > 0);
      host.classList.toggle('open', stack.length > 0);
      onStackChange();
      opts.onClose?.();
      if (stack.length) { const t = stack[stack.length - 1].root.querySelector<HTMLElement>('[data-autofocus]') ?? stack[stack.length - 1].root.querySelector<HTMLElement>(FOCUSABLE); t?.focus(); }
      else if (rf && document.contains(rf)) rf.focus();
    },
  };
  returnFocus.push(document.activeElement as HTMLElement | null);
  if (stack.length) stack[stack.length - 1].root.setAttribute('aria-hidden', 'true');
  stack.push(m);
  host.appendChild(root);
  host.classList.add('open');
  appRoot.setAttribute('inert', '');
  onStackChange();
  root.addEventListener('mousedown', (e) => { if (e.target === root && closable) m.close(); });
  requestAnimationFrame(() => {
    root.setAttribute('aria-hidden', 'false');
    (root.querySelector<HTMLElement>('[data-autofocus]') ?? root.querySelector<HTMLElement>(FOCUSABLE))?.focus();
  });
  return m;
}
export function closeAllModals(): void { while (stack.length) stack[stack.length - 1].close(); }

// ------------------------------------------------------------------ toasts and live region
let toastHost: HTMLElement | null = null;
let live: HTMLElement | null = null;
export function initToasts(t: HTMLElement, l: HTMLElement): void { toastHost = t; live = l; }
export function toast(msg: string, kind: 'info' | 'good' | 'warn' | 'bad' = 'info'): void {
  if (live) live.textContent = msg;
  if (!toastHost) return;
  const el = h('div', { class: 'toast ' + kind, role: 'status' }, msg);
  toastHost.appendChild(el);
  while (toastHost.children.length > 4) toastHost.firstElementChild?.remove();
  setTimeout(() => el.remove(), 4800);
}
