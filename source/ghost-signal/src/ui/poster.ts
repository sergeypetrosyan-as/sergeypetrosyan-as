// Poster / screenshot mode: `?scene=<location>` shows one location scene full-bleed
// with its location plate and no interface. Used to capture the hub poster.
import { h } from './dom.ts';
import { LOCATIONS } from '../story/data.ts';
import { SceneRenderer } from '../render/scene.ts';
import type { Quality, SceneKey } from '../render/scene.ts';

const KEYS: SceneKey[] = ['lobby', 'office', 'vault', 'annex', 'dock', 'bar', 'street'];

export function posterKey(): SceneKey | null {
  try {
    const k = new URLSearchParams(location.search).get('scene');
    return k && (KEYS as string[]).includes(k) ? (k as SceneKey) : null;
  } catch { return null; }
}

export function startPoster(key: SceneKey): void {
  const params = new URLSearchParams(location.search);
  const qp = params.get('quality');
  const quality: Quality = qp === 'low' || qp === 'medium' ? qp : 'high';
  document.documentElement.classList.add('poster-mode');
  const app = document.getElementById('app') as HTMLElement;
  const canvas = h('canvas', { class: 'poster-canvas', 'aria-hidden': 'true' });
  const loc = key === 'street' ? { name: 'Undertow Street', floor: 'Kestrel Bay' } : LOCATIONS[key];
  app.append(h('main', { class: 'poster' }, canvas,
    h('div', { class: 'plate' }, h('strong', null, loc.name), h('span', null, loc.floor)),
    h('p', { class: 'poster-mark' }, 'Ghost Signal')));
  const r = new SceneRenderer(canvas);
  r.setQuality(quality);
  r.setLocation(key);
  requestAnimationFrame(() => { r.resize(); r.start(); });
  window.addEventListener('resize', () => r.resize());
}
