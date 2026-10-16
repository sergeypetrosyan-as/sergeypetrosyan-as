import { h, clear, initModals, initToasts, modalOpen, toast } from './dom.ts';
import { TABS } from './host.ts';
import type { Host, Tab } from './host.ts';
import { buildScene, renderBoard, renderConclude, renderContradictions, renderLog, renderReconstruct, resetViewState } from './views.ts';
import {
  openChapter, openConfirmClose, openEndingModal, openHelp, openHotspotModal, openRevelation, openSettings, openSourceModal,
  openSubmitModal, openTitleScreen,
} from './modals.ts';
import { Sound } from '../audio/audio.ts';
import { SceneRenderer } from '../render/scene.ts';
import { load, save } from '../storage/storage.ts';
import type { SaveData } from '../storage/storage.ts';
import { CASE_NAME, CHAPTERS, SOURCES, SOURCE_BY_ID } from '../story/data.ts';
import { closeDay, contradictions, newState, submit, travelTo } from '../story/engine.ts';
import type { GameEvent, LocId } from '../story/types.ts';

export function start(): void {
  const appRoot = document.getElementById('app') as HTMLElement;
  const overlay = document.getElementById('overlay') as HTMLElement;
  const toasts = document.getElementById('toasts') as HTMLElement;
  const live = document.getElementById('live') as HTMLElement;
  const data: SaveData = load();
  const sound = new Sound();
  let sceneView: ReturnType<typeof buildScene> | null = null;
  const viewEls: Record<Tab, HTMLElement> = {
    scene: h('div'), log: h('div', { class: 'view' }), board: h('div', { class: 'view' }), reconstruct: h('div', { class: 'view' }),
    contradictions: h('div', { class: 'view' }), conclude: h('div', { class: 'view' }),
  };
  const headerInfo = h('dl', { class: 'readouts' });
  const muteBtn = h('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Mute sound (M)', onclick: () => toggleMute() }, '');
  const tabNav = h('nav', { class: 'tabs', 'aria-label': 'Main sections' });
  const main = h('main', { id: 'main', class: 'main', tabindex: -1 });

  const host: Host = {
    state: data.progress ?? newState(),
    data, sound, tab: 'scene',
    setTab(t) { host.tab = t; host.rerender(); window.scrollTo(0, 0); },
    apply(ev) { handle(ev); },
    rerender() { render(); },
    persist() { data.progress = host.state; save(data); },
    go(loc: LocId) { const e = travelTo(host.state, loc); if (!e.length) sound.blip(); host.apply(e); },
    openSource(id) { sound.blip(); openSourceModal(host, id); },
    openHotspot(id) { sound.blip(); openHotspotModal(host, id); },
    confirmCloseDay() { openConfirmClose(host, () => host.apply(closeDay(host.state))); },
    openSubmit() { openSubmitModal(host, (mother) => host.apply(submit(host.state, mother))); },
    newCase() { startNewCase(); },
    openEnding() { if (host.state.ending) openEndingModal(host, host.state.ending); },
    applySettings() { applySettings(); },
    openTitle() { openTitle(); },
    openHelp() { openHelp(); },
    openSettings() { openSettings(host); },
  };

  // ---------------------------------------------------------------- settings
  function applySettings(): void {
    const s = data.settings;
    const root = document.documentElement;
    root.dataset.text = s.textSize;
    root.classList.toggle('reduced', s.reducedMotion);
    root.classList.toggle('hc', s.highContrast);
    sound.setVolume(s.volume / 100);
    sound.setMuted(s.muted);
    for (const r of SceneRenderer.live) { r.setReduced(s.reducedMotion); r.setQuality(s.quality); }
    muteBtn.textContent = s.muted ? 'Sound off' : 'Sound on';
    muteBtn.setAttribute('aria-pressed', String(s.muted));
    muteBtn.setAttribute('aria-label', (s.muted ? 'Unmute' : 'Mute') + ' sound (M)');
  }
  function toggleMute(): void {
    data.settings.muted = !data.settings.muted;
    sound.unlock();
    applySettings(); host.persist();
    toast(data.settings.muted ? 'Sound muted.' : 'Sound on.');
  }

  // ---------------------------------------------------------------- events
  function handle(events: GameEvent[]): void {
    const reveals: string[] = [];
    let chapter = 0;
    let ending: string | null = null;
    for (const e of events) {
      switch (e.t) {
        case 'collected': toast(`Collected: ${SOURCE_BY_ID[e.id].title}`, 'good'); sound.collect(); break;
        case 'contradiction': toast(`Contradiction: ${e.text.replace(/^[^:]+: /, '')}`, 'warn'); sound.contradiction(); pulseTab('contradictions'); break;
        case 'revelation': reveals.push(e.id); break;
        case 'chapter': chapter = e.n; break;
        case 'ending': ending = e.id; if (!data.endings.includes(e.id)) data.endings.push(e.id); break;
        case 'locked': toast(e.text, 'bad'); sound.deny(); break;
        case 'note': toast(e.text, 'info'); sound.notify(); break;
      }
    }
    host.persist();
    render();
    for (const r of reveals) openRevelation(host, r);
    if (chapter) openChapter(host, chapter);
    if (ending) openEndingModal(host, ending as NonNullable<typeof host.state.ending>);
  }
  function pulseTab(t: Tab): void {
    if (data.settings.reducedMotion) return;
    const b = tabNav.querySelector(`[data-tab="${t}"]`);
    b?.classList.remove('pulse'); void (b as HTMLElement | null)?.offsetWidth; b?.classList.add('pulse');
  }

  // ---------------------------------------------------------------- render
  function renderHeader(): void {
    const S = host.state;
    const ch = CHAPTERS[S.chapter - 1];
    const active = contradictions(S).filter((c) => !c.resolved).length;
    const ro = (k: string, v: string, extra?: string, cls = ''): HTMLElement => h('div', { class: 'ro ' + cls }, h('dt', null, k), h('dd', null, h('span', { class: 'v' }, v), extra ? h('span', { class: 'x' }, extra) : null));
    headerInfo.replaceChildren(
      ro('Night', String(ch.n), ch.title),
      ro('Sources', String(S.log.length), `of ${SOURCES.length}`),
      ro('Open conflicts', String(active), undefined, active ? 'alert' : ''));
    clear(tabNav);
    for (const t of TABS) {
      tabNav.appendChild(h('button', {
        class: 'tab' + (host.tab === t.id ? ' on' : ''), type: 'button', 'data-tab': t.id, 'data-fk': 'tab-' + t.id,
        'aria-current': host.tab === t.id ? 'page' : null, onclick: () => { sound.blip(); host.setTab(t.id); },
      }, h('span', { class: 'k', 'aria-hidden': 'true' }, t.key), t.label, t.id === 'contradictions' && active ? h('span', { class: 'count' }, h('span', { class: 'sr-only' }, ', open: '), String(active)) : null));
    }
  }

  function render(): void {
    const active = document.activeElement as HTMLElement | null;
    const fk = active?.dataset?.fk;
    const caret = active instanceof HTMLInputElement && active.type === 'search' ? active.selectionStart : null;
    renderHeader();
    for (const [id, el] of Object.entries(viewEls)) el.hidden = id !== host.tab;
    switch (host.tab) {
      case 'scene': sceneView?.update(); break;
      case 'log': renderLog(host, viewEls.log); break;
      case 'board': renderBoard(host, viewEls.board); break;
      case 'reconstruct': renderReconstruct(host, viewEls.reconstruct); break;
      case 'contradictions': renderContradictions(host, viewEls.contradictions); break;
      case 'conclude': renderConclude(host, viewEls.conclude); break;
    }
    if (fk && !modalOpen()) {
      const t = document.querySelector<HTMLElement>(`[data-fk="${fk}"]`);
      if (t && t !== document.activeElement) { t.focus({ preventScroll: true }); if (caret !== null && t instanceof HTMLInputElement) t.setSelectionRange(caret, caret); }
    }
    syncScene();
  }

  function syncScene(): void {
    if (!sceneView) return;
    const run = host.tab === 'scene' && !document.hidden && !modalOpen();
    if (run) { sceneView.renderer.resize(); sceneView.renderer.start(); } else sceneView.renderer.stop();
  }

  // ---------------------------------------------------------------- case lifecycle
  function startNewCase(): void {
    host.state = newState();
    data.progress = host.state;
    resetViewState();
    host.tab = 'scene';
    host.persist();
    render();
    openChapter(host, 1);
  }
  function openTitle(): void {
    openTitleScreen(host, !!data.progress, () => { render(); }, () => startNewCase());
  }

  // ---------------------------------------------------------------- shell
  sceneView = buildScene(host);
  viewEls.scene = sceneView.el;
  const brand = h('div', { class: 'brand' }, h('span', { class: 'logo-mark', 'aria-hidden': 'true' }), h('span', { class: 'brand-name' }, 'Ghost Signal'), h('span', { class: 'brand-case' }, CASE_NAME));
  const header = h('header', { class: 'top' }, brand, headerInfo, h('div', { class: 'top-actions' },
    muteBtn,
    h('button', { class: 'icon-btn', type: 'button', onclick: () => openHelp() }, 'Help'),
    h('button', { class: 'icon-btn', type: 'button', onclick: () => openSettings(host) }, 'Settings'),
    h('button', { class: 'icon-btn', type: 'button', onclick: () => openTitle() }, 'Menu')));
  main.append(...Object.values(viewEls));
  appRoot.append(h('a', { class: 'skip', href: '#main', onclick: (e: Event) => { e.preventDefault(); main.focus(); } }, 'Skip to the case'), header, tabNav, main);
  initModals(overlay, appRoot, syncScene);
  initToasts(toasts, live);
  applySettings();
  render();

  window.addEventListener('resize', () => { if (host.tab === 'scene') sceneView?.renderer.resize(); });
  document.addEventListener('visibilitychange', syncScene);
  // The audio context may only start after a user gesture.
  const unlock = (): void => { sound.unlock(); };
  window.addEventListener('pointerdown', unlock, { once: true });
  window.addEventListener('keydown', unlock, { once: true });

  document.addEventListener('keydown', (e) => {
    const t = e.target as HTMLElement | null;
    const typing = !!t && (t.tagName === 'INPUT' && (t as HTMLInputElement).type !== 'checkbox' && (t as HTMLInputElement).type !== 'radio' && (t as HTMLInputElement).type !== 'range' || t.tagName === 'TEXTAREA' || t.tagName === 'SELECT');
    if (typing || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'm' || e.key === 'M') { e.preventDefault(); toggleMute(); return; }
    if (modalOpen()) return;
    if (e.key === '?') { e.preventDefault(); openHelp(); return; }
    const tab = TABS.find((x) => x.key === e.key);
    if (tab) { e.preventDefault(); sound.blip(); host.setTab(tab.id); }
  });

  openTitle();
}
