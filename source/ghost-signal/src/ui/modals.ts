import { h, openModal } from './dom.ts';
import type { Modal } from './dom.ts';
import type { Host } from './host.ts';
import { CASE_DATE, CASE_NAME, CHAPTERS, ENDINGS, INTRO_LINES, LOCATIONS, PEOPLE, REVELATIONS, SOURCE_BY_ID, TALKS } from '../story/data.ts';
import { choose, contradictions, decideSafe, enterNode, collectHotspot, epilogue, hotspotStatus, talkStart, visibleChoices, check, has } from '../story/engine.ts';
import { RULES } from '../story/rules.ts';
import { HOTSPOTS_BY_ID } from './util.ts';
import { KIND_LABEL, claimsList, flag, itemNo, sentence, statusFlags } from './views.ts';
import { SceneRenderer } from '../render/scene.ts';
import { personPhoto, sourceImage } from '../render/photos.ts';
import { fmt } from '../story/types.ts';
import type { EndingId, Source, TalkId } from '../story/types.ts';

const closeBtn = (m: () => Modal | undefined, label = 'Close'): HTMLElement =>
  h('button', { class: 'btn', type: 'button', onclick: () => m()?.close() }, label);

const NIGHT_WORD = ['', 'one', 'two', 'three'];

/** Photo or frame with its paper tag, as shown in evidence sheets. */
function exhibit(host: Host, src: Source, dim = false): HTMLElement {
  return h('figure', { class: 'exhibit' + (dim ? ' dim' : '') },
    h('img', { src: sourceImage(src, 640, 430), alt: `Photograph: ${src.title}`, width: 320, height: 215 }),
    h('figcaption', { class: 'paper-tag' },
      h('span', { class: 'no' }, itemNo(host.state, src.id)),
      h('span', null, src.title),
      h('span', { class: 'case' }, CASE_NAME)));
}

function provenance(src: Source): HTMLElement {
  const rows: [string, string][] = [['Found', src.where], ['Type', KIND_LABEL[src.kind]], ['Reliability', src.hard ? 'Hard: authoritative' : 'Soft: can be wrong or forged']];
  if (src.ts !== undefined) rows.splice(1, 0, ['Recorded', fmt(src.ts)]);
  return h('dl', { class: 'prov' }, rows.map(([k, v]) => [h('dt', null, k), h('dd', { class: k === 'Recorded' ? 'mono' : '' }, v)]));
}

// ------------------------------------------------------------------ source / evidence
export function openSourceModal(host: Host, id: string): void {
  const src = SOURCE_BY_ID[id];
  if (!src) return;
  const S = host.state;
  const cs = contradictions(S).filter((c) => c.a === id || c.b === id);
  let m: Modal | undefined;
  const body = h('div', { class: 'sheet' },
    exhibit(host, src),
    h('div', { class: 'sheet-text' },
      h('h2', null, src.title),
      h('div', { class: 'flags' }, statusFlags(src, cs)),
      provenance(src),
      h('p', { class: 'evidence-text' }, src.text),
      has(S, id) ? h('section', null, h('h3', null, 'What it claims'), claimsList(src)) : null,
      cs.length ? h('section', null, h('h3', null, 'Contradictions'), h('ul', { class: 'con-mini' }, cs.map((c) => h('li', { class: c.resolved ? 'resolved' : c.verdict },
        h('span', { class: 'rule' }, c.rule), ` ${RULES[c.rule].name} with `, h('b', null, SOURCE_BY_ID[c.a === id ? c.b : c.a].title), c.resolved ? ' (resolved)' : '')))) : null,
      h('div', { class: 'row end' }, h('button', { class: 'btn primary', type: 'button', 'data-autofocus': '', onclick: () => m?.close() }, 'Close'))));
  m = openModal(body, { label: src.title, wide: true });
}

// ------------------------------------------------------------------ hotspot
export function openHotspotModal(host: Host, hsId: string): void {
  const S = host.state;
  const hs = HOTSPOTS_BY_ID[hsId];
  if (!hs) return;
  if (hs.kind === 'talk' && hs.talk) { openTalk(host, hs.talk); return; }
  const st = hotspotStatus(S, hs);
  let m: Modal | undefined;
  if (hs.kind === 'lore') {
    m = openModal(h('div', { class: 'modal-body' }, h('p', { class: 'kicker' }, 'Observation, not logged'), h('h2', null, hs.label), h('p', { class: 'evidence-text' }, hs.examine ?? ''),
      h('div', { class: 'row end' }, h('button', { class: 'btn primary', type: 'button', 'data-autofocus': '', onclick: () => m?.close() }, 'Close'))), { label: hs.label });
    return;
  }
  const src = hs.source ? SOURCE_BY_ID[hs.source] : undefined;
  if (!src) return;
  const done = has(S, src.id);
  const isDecision = hs.kind === 'decision' && S.decisions.bleed === 'unset' && S.chapter < 3;
  const buttons: HTMLElement[] = [];
  if (done) buttons.push(h('span', { class: 'muted' }, 'Already in your evidence log.'));
  else if (!st.open) buttons.push(h('p', { class: 'locked-text' }, st.reason ?? 'Locked.'));
  else if (isDecision) {
    buttons.push(
      h('button', { class: 'btn danger', type: 'button', onclick: () => { m?.close(); host.apply(decideSafe(S, 'bleed')); }, 'data-fk': 'dec-bleed' }, 'Bleed the ICE with a black-market decrypt (illegal, now)'),
      h('button', { class: 'btn primary', type: 'button', 'data-autofocus': '', onclick: () => { m?.close(); host.apply(decideSafe(S, 'subpoena')); } }, 'File a subpoena (lawful, arrives on night three)'));
  } else {
    buttons.push(h('button', { class: 'btn primary', type: 'button', 'data-autofocus': '', onclick: () => { m?.close(); host.apply(collectHotspot(S, hs.id)); } }, 'Collect to log'));
  }
  const cs = contradictions(S).filter((c) => c.a === src.id || c.b === src.id);
  const open = st.open || done;
  m = openModal(h('div', { class: 'sheet' },
    open ? exhibit(host, src) : h('figure', { class: 'exhibit sealed' }, h('div', { class: 'sealed-box' }, h('span', null, 'Not available yet'))),
    h('div', { class: 'sheet-text' },
      h('h2', null, hs.label),
      done ? h('div', { class: 'flags' }, flag('Logged', 'ok'), statusFlags(src, cs)) : null,
      open ? provenance(src) : null,
      h('p', { class: 'evidence-text' }, !open ? (hs.lockedText ?? 'You cannot reach this yet.') : src.text),
      done ? h('section', null, h('h3', null, 'What it claims'), claimsList(src)) : null,
      isDecision ? h('p', { class: 'muted' }, 'A bled ledger is tainted. If it ends up in your case, a defence lawyer will find out how you got it.') : null,
      h('div', { class: 'row end' }, buttons, closeBtn(() => m)))), { label: hs.label, wide: true });
}

// ------------------------------------------------------------------ talk
interface Line { who: 'npc' | 'you'; text: string }

export function openTalk(host: Host, talkId: TalkId): void {
  const S = host.state;
  const talk = TALKS[talkId];
  const person = PEOPLE[talk.who];
  const lines: Line[] = [];
  let node = talkStart(S, talk);
  let m: Modal | undefined;
  const log = h('div', { class: 'transcript', role: 'log', 'aria-live': 'polite' });
  const choicesEl = h('div', { class: 'choices' });
  const enter = (id: string): void => {
    node = id;
    host.apply(enterNode(S, talk, id));
    lines.push({ who: 'npc', text: talk.nodes[id].say });
  };
  const render = (): void => {
    log.replaceChildren(...lines.slice(-6).map((l) => h('p', { class: 'line ' + l.who }, h('b', null, l.who === 'npc' ? person.name.split(' ').slice(-1)[0] : 'Halvard'), h('span', null, l.text))));
    log.scrollTop = log.scrollHeight;
    const vis = visibleChoices(S, talk, talk.nodes[node]);
    choicesEl.replaceChildren(...vis.map((c, i) => h('button', {
      class: `choice ${c.tone}`, type: 'button', 'data-choice': c.id, onclick: () => pick(c.id),
    }, h('span', { class: 'num' }, String(i + 1)), h('span', null, c.text))));
    (choicesEl.firstElementChild as HTMLElement | null)?.focus();
  };
  const pick = (cid: string): void => {
    const c = talk.nodes[node].choices.find((x) => x.id === cid);
    if (!c) return;
    lines.push({ who: 'you', text: c.text.replace(/\s*\((pressure|rapport)\)$/, '') });
    const r = choose(S, talk, node, cid);
    host.apply(r.events);
    if (r.next === null) { m?.close(); return; }
    node = r.next;
    lines.push({ who: 'npc', text: talk.nodes[node].say });
    render();
  };
  enter(node);
  const body = h('div', { class: 'modal-body talk' },
    h('div', { class: 'talk-head' }, h('img', { class: 'idphoto', src: personPhoto(talk.who, 180), alt: '', width: 72, height: 86 }),
      h('div', null, h('h2', null, person.name), h('p', { class: 'muted' }, `${person.role}. Interviewed in ${LOCATIONS[S.loc].name}.`))),
    log, choicesEl,
    h('p', { class: 'muted hint' }, 'Press 1 to 9 to choose a reply. Esc leaves the interview.'));
  m = openModal(body, {
    label: `Interview with ${person.name}`, wide: true,
    onKey: (e) => {
      if (/^[1-9]$/.test(e.key) && !e.ctrlKey && !e.metaKey && !e.altKey) {
        const b = choicesEl.children[Number(e.key) - 1] as HTMLElement | undefined;
        if (b) { e.preventDefault(); b.click(); return true; }
      }
      return false;
    },
  });
  render();
}

// ------------------------------------------------------------------ revelation / chapter / ending overlays
export function openRevelation(host: Host, id: string, onDone?: () => void): void {
  const r = REVELATIONS[id];
  if (!r) { onDone?.(); return; }
  host.sound.revelation();
  let m: Modal | undefined;
  const title = sentence(r.title);
  m = openModal(h('div', { class: 'modal-body overlay-card reveal' },
    h('h2', { class: 'display glitch', 'data-text': title }, title),
    r.lines.map((l) => h('p', null, l)),
    h('div', { class: 'row end' }, h('button', { class: 'btn primary', type: 'button', 'data-autofocus': '', onclick: () => m?.close() }, 'Continue'))),
  { label: title, cls: 'cinema', onClose: onDone });
}

export function openChapter(host: Host, n: number, onDone?: () => void): void {
  const prev = CHAPTERS[n - 2];
  const ch = CHAPTERS[n - 1];
  host.sound.notify();
  let m: Modal | undefined;
  m = openModal(h('div', { class: 'modal-body overlay-card' },
    h('h2', { class: 'display' }, `Night ${NIGHT_WORD[n] ?? n}: ${ch.title}`),
    prev ? h('p', { class: 'muted' }, prev.close) : null,
    h('p', null, ch.brief),
    h('div', { class: 'row end' }, h('button', { class: 'btn primary', type: 'button', 'data-autofocus': '', onclick: () => m?.close() }, 'Begin night ' + (NIGHT_WORD[n] ?? n)))),
  { label: `Night ${n}: ${ch.title}`, cls: 'cinema', onClose: onDone });
}

export function openConfirmClose(host: Host, onYes: () => void): void {
  const ch = CHAPTERS[host.state.chapter - 1];
  let m: Modal | undefined;
  m = openModal(h('div', { class: 'modal-body' }, h('h2', null, 'Close the day?'),
    h('p', null, `Night ${ch.n} ends. You keep everything you hold, but the world moves on: new locations open, and statements change.`),
    h('div', { class: 'row end' }, h('button', { class: 'btn', type: 'button', onclick: () => m?.close() }, 'Not yet'),
      h('button', { class: 'btn primary', type: 'button', 'data-autofocus': '', onclick: () => { m?.close(); onYes(); } }, 'Close the day'))), { label: 'Close the day' });
}

export function openSubmitModal(host: Host, onYes: (mother?: 'return' | 'seal' | 'release') => void): void {
  const S = host.state;
  const c = S.conclusion;
  const res = check(S);
  const askMother = has(S, 'ev-ledger') && c.culprit === 'voss';
  let mother: 'return' | 'seal' | 'release' = 'seal';
  let m: Modal | undefined;
  const opts: ['return' | 'seal' | 'release', string][] = [
    ['return', 'Return it to Linnea Voss. It is hers.'],
    ['seal', 'Seal it as evidence. Procedure is procedure.'],
    ['release', 'Release it to the public. Let the city hear what it sold.'],
  ];
  m = openModal(h('div', { class: 'modal-body' }, h('h2', null, 'File the conclusion'),
    h('p', null, `You are about to tell the Magistrate that ${c.culprit === 'none' ? 'no one' : PEOPLE[c.culprit as 'voss'].name} is responsible. This cannot be taken back.`),
    !res.complete ? h('p', { class: 'warn-text' }, 'Your answers are incomplete. The Magistrate will notice.') : null,
    askMother ? h('fieldset', { class: 'q' }, h('legend', null, 'The recovered memory of Ilse Voss: what happens to it?'),
      opts.map(([v, label]) => h('label', { class: 'opt' + (v === 'seal' ? ' on' : '') }, h('input', { type: 'radio', name: 'mother', value: v, checked: v === 'seal', onchange: () => { mother = v; } }), h('span', null, label)))) : null,
    h('div', { class: 'row end' }, h('button', { class: 'btn', type: 'button', 'data-autofocus': '', onclick: () => m?.close() }, 'Not yet'),
      h('button', { class: 'btn danger', type: 'button', onclick: () => { m?.close(); onYes(askMother ? mother : undefined); } }, 'File it'))), { label: 'File the conclusion' });
}

export function openEndingModal(host: Host, id: EndingId): void {
  const S = host.state;
  const e = ENDINGS.find((x) => x.id === id)!;
  host.sound.ending(id === 'clean-signal' ? 'good' : id === 'burned-evidence' || id === 'ghost-remains' ? 'neutral' : 'bad');
  const epi = epilogue(S);
  const reached = host.data.endings.length;
  let m: Modal | undefined;
  m = openModal(h('div', { class: 'modal-body overlay-card ending' },
    h('h2', { class: 'display' }, sentence(e.title)),
    e.canonical ? h('p', { class: 'canon' }, 'This is the canonical ending.') : null,
    h('p', { class: 'lead' }, e.summary),
    e.body.map((p) => h('p', null, p)),
    epi.length ? h('div', { class: 'epilogue' }, h('h3', null, 'What your choices left behind'), epi.map((p) => h('p', null, p))) : null,
    h('p', { class: 'muted' }, `Endings found: ${reached} of ${ENDINGS.length}. ${e.canonical ? '' : 'The canonical ending is still out there if you did not find it.'}`),
    h('div', { class: 'row end' },
      h('button', { class: 'btn', type: 'button', onclick: () => m?.close() }, 'Read the case file'),
      h('button', { class: 'btn', type: 'button', onclick: () => { m?.close(); host.openTitle(); } }, 'Title screen'),
      h('button', { class: 'btn primary', type: 'button', 'data-autofocus': '', onclick: () => { m?.close(); host.newCase(); } }, 'Open a new case'))),
  { label: e.title, cls: 'cinema', wide: true });
}

// ------------------------------------------------------------------ help / settings / endings / title
export function openHelp(): void {
  let m: Modal | undefined;
  m = openModal(h('div', { class: 'modal-body' }, h('h2', null, 'How to play'),
    h('p', null, 'A man is dead in a vault and four people remember the night differently. Visit locations, examine and collect evidence, question people, and rebuild the timeline. The game never guesses: it applies seven fixed rules to what you hold.'),
    h('h3', null, 'Sources'),
    h('p', null, 'Hard sources (logs, objects, lab results) are authoritative. Soft sources (memory fragments, statements) can lie or be forged. A hard source that disagrees with a soft one refutes it. Two soft sources that disagree only tell you that one is false.'),
    h('h3', null, 'The reconstruction'),
    h('p', null, 'Put one fragment in each time slot. A fragment fits only the slot containing its timestamp. The four key slots must hold fragments that survive every hard source you have.'),
    h('h3', null, 'The conclusion'),
    h('p', null, 'On the third night, name who did it, how, and why, and cite the sources that prove each answer. Wrong accusations have consequences. There are five endings.'),
    h('h3', null, 'The rules'),
    h('dl', { class: 'rule-list' }, (Object.keys(RULES) as (keyof typeof RULES)[]).map((r) => [h('dt', null, h('span', { class: 'rule' }, r), ' ', RULES[r].name), h('dd', null, RULES[r].explain)])),
    h('h3', null, 'Keys'),
    h('table', { class: 'keys' }, h('tbody', null,
      [['Tab, Shift+Tab', 'Move focus'], ['Enter, Space', 'Activate'], ['1 to 6', 'Switch sections'], ['1 to 9 in an interview', 'Choose a reply'], ['Esc', 'Close the top panel'], ['M', 'Mute or unmute'], ['?', 'This help']].map(([k, v]) => h('tr', null, h('th', null, h('kbd', null, k)), h('td', null, v))))),
    h('div', { class: 'row end' }, h('button', { class: 'btn primary', type: 'button', 'data-autofocus': '', onclick: () => m?.close() }, 'Close'))),
  { label: 'How to play', wide: true });
}

export function openSettings(host: Host): void {
  const st = host.data.settings;
  let m: Modal | undefined;
  const upd = (fn: () => void): void => { fn(); host.applySettings(); host.persist(); };
  const group = <T extends string>(legend: string, name: string, opts: [T, string, string?][], cur: T, set: (v: T) => void): HTMLElement =>
    h('fieldset', { class: 'q seg-field' }, h('legend', null, legend), h('div', { class: 'seg' }, opts.map(([v, l, hint]) => h('label', { class: 'seg-btn' + (cur === v ? ' on' : ''), title: hint ?? null },
      h('input', { type: 'radio', name, value: v, checked: cur === v, onchange: (e: Event) => { upd(() => set(v)); const box = (e.target as HTMLElement).closest('.seg'); box?.querySelectorAll('.seg-btn').forEach((x) => x.classList.toggle('on', x.contains(e.target as Node))); } }), h('span', null, l)))));
  m = openModal(h('div', { class: 'modal-body settings' }, h('h2', null, 'Settings'),
    h('label', { class: 'field' }, h('span', null, 'Volume'), h('input', { type: 'range', min: 0, max: 100, value: st.volume, 'aria-label': 'Volume', 'data-autofocus': '', oninput: (e: Event) => upd(() => { st.volume = Number((e.target as HTMLInputElement).value); }) })),
    h('label', { class: 'check' }, h('input', { type: 'checkbox', checked: st.muted, onchange: (e: Event) => upd(() => { st.muted = (e.target as HTMLInputElement).checked; }) }), 'Mute all sound (M)'),
    group('Text size', 'tsize', [['small', 'Small'], ['medium', 'Medium'], ['large', 'Large']], st.textSize, (v) => { st.textSize = v; }),
    group('Visual quality', 'quality', [['low', 'Low', 'Lighter rain, no grain or glass droplets. Best for phones.'], ['medium', 'Medium'], ['high', 'High', 'Full rain, droplets, grain and lens fringing.']], st.quality, (v) => { st.quality = v; }),
    h('p', { class: 'muted small' }, 'Quality sets rain density, blur, film grain, reflections and droplets on glass. Low keeps phones fast.'),
    h('label', { class: 'check' }, h('input', { type: 'checkbox', checked: st.reducedMotion, onchange: (e: Event) => upd(() => { st.reducedMotion = (e.target as HTMLInputElement).checked; }) }), 'Reduce motion (a still scene: no rain movement, flicker or steam)'),
    h('label', { class: 'check' }, h('input', { type: 'checkbox', checked: st.highContrast, onchange: (e: Event) => upd(() => { st.highContrast = (e.target as HTMLInputElement).checked; }) }), 'High contrast'),
    h('div', { class: 'row end' }, h('button', { class: 'btn primary', type: 'button', onclick: () => m?.close() }, 'Done'))),
  { label: 'Settings' });
}

export function openEndingsGallery(host: Host): void {
  const got = new Set(host.data.endings);
  let m: Modal | undefined;
  m = openModal(h('div', { class: 'modal-body' }, h('h2', null, `Endings found: ${got.size} of ${ENDINGS.length}`),
    h('ul', { class: 'endings' }, ENDINGS.map((e) => h('li', { class: got.has(e.id) ? 'got' : '' },
      h('strong', null, got.has(e.id) ? sentence(e.title) : 'Not found yet'), got.has(e.id) && e.canonical ? flag('Canonical', 'ok') : null,
      h('p', { class: 'muted' }, got.has(e.id) ? e.summary : 'Play again and choose differently.')))),
    h('div', { class: 'row end' }, h('button', { class: 'btn primary', type: 'button', 'data-autofocus': '', onclick: () => m?.close() }, 'Close'))), { label: 'Endings' });
}

export function openConfirm(title: string, text: string, yes: string, onYes: () => void): void {
  let m: Modal | undefined;
  m = openModal(h('div', { class: 'modal-body' }, h('h2', null, title), h('p', null, text),
    h('div', { class: 'row end' }, h('button', { class: 'btn', type: 'button', 'data-autofocus': '', onclick: () => m?.close() }, 'Cancel'),
      h('button', { class: 'btn danger', type: 'button', onclick: () => { m?.close(); onYes(); } }, yes))), { label: title });
}

export function openTitleScreen(host: Host, hasSave: boolean, onContinue: () => void, onNew: () => void): Modal {
  const canvas = h('canvas', { class: 'title-canvas', 'aria-hidden': 'true' });
  let renderer: SceneRenderer | null = null;
  try { renderer = new SceneRenderer(canvas); } catch { renderer = null; }
  const closable = hasSave;
  let m: Modal | undefined;
  const go = (fn: () => void) => (): void => { host.sound.unlock(); host.sound.select(); fn(); };
  const body = h('div', { class: 'title-screen' }, canvas, h('div', { class: 'title-shade', 'aria-hidden': 'true' }),
    h('div', { class: 'title-card' },
      h('h1', { class: 'logo' }, 'Ghost Signal'),
      h('p', { class: 'tagline' }, 'Memories can lie. Timestamps can\'t.'),
      h('p', { class: 'case-line' }, `${CASE_NAME}, Kestrel Bay, ${CASE_DATE}`),
      h('div', { class: 'intro' }, INTRO_LINES.slice(1).map((l) => h('p', null, l))),
      h('div', { class: 'title-menu' },
        hasSave ? h('button', { class: 'btn primary big', type: 'button', 'data-autofocus': '', onclick: go(() => { m?.close(); onContinue(); }) }, 'Continue the case') : null,
        h('button', { class: 'btn big' + (hasSave ? '' : ' primary'), type: 'button', 'data-autofocus': hasSave ? null : '', onclick: go(() => { if (hasSave) openConfirm('Start a new case?', 'Your current case file will be replaced. Endings you have found and your settings are kept.', 'Start over', () => { m?.close(); onNew(); }); else { m?.close(); onNew(); } }) }, 'New case'),
        h('button', { class: 'btn big quiet', type: 'button', onclick: go(() => openEndingsGallery(host)) }, `Endings found (${host.data.endings.length} of ${ENDINGS.length})`),
        h('button', { class: 'btn big quiet', type: 'button', onclick: go(() => openHelp()) }, 'How to play'),
        h('button', { class: 'btn big quiet', type: 'button', onclick: go(() => openSettings(host)) }, 'Settings'))),
    h('p', { class: 'title-foot' }, 'Bureau of Recorded Events, field kit 7'));
  const onResize = (): void => renderer?.resize();
  m = openModal(body, { closable, cls: 'title', label: 'Ghost Signal title screen', onClose: () => { renderer?.dispose(); window.removeEventListener('resize', onResize); } });
  if (renderer) {
    const r = renderer;
    r.setReduced(host.data.settings.reducedMotion);
    r.setQuality(host.data.settings.quality);
    r.setLocation('street');
    requestAnimationFrame(() => { r.resize(); r.start(); });
    window.addEventListener('resize', onResize);
  }
  return m;
}
