#!/usr/bin/env node
/**
 * Browser verification for the new games, run through the CATALOG the way a visitor would.
 *
 *   node scripts/verify.mjs --ids noon-draw,vault-cipher [--base http://localhost:5300] [--shots out/dir]
 *   node scripts/verify.mjs --batch 1          every game of batch 1
 *   node scripts/verify.mjs --all
 *
 * Without --base it serves the built repository root (run `npm run build` first). With --base it targets a running
 * `vite` dev server (`npm run dev`).
 *
 * Per game it checks: the catalog lists it and its cover loads; clicking its catalog card opens the game; the first
 * screen shows title and rules; Play starts a run; the game's declared real input (meta.smoke) changes probe();
 * reset(seed) is deterministic; the bot reaches a WIN outcome; Play again resets cleanly; the bot reaches a LOSE
 * outcome; at 390 px wide with touch there is no horizontal overflow and the touch path works; zero console errors,
 * page errors or failed requests. Writes docs/arcade-90/verification/<id>.json for each game.
 */
import http from 'node:http';
import { readFile, stat, mkdir, writeFile } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, extname, resolve, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import puppeteer from 'puppeteer-core';
import { CONCEPTS } from '../concepts.mjs';

const PKG = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const REPO = resolve(PKG, '../..');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif', '.json': 'application/json', '.jpg': 'image/jpeg' };
const CHROME = [process.env.CHROME, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean).find((p) => existsSync(p));

const args = process.argv.slice(2);
const opt = (n) => { const i = args.indexOf(`--${n}`); return i >= 0 ? args[i + 1] : undefined; };
const ids = opt('ids') ? opt('ids').split(',') : opt('batch') ? CONCEPTS.filter((c) => c.batch === Number(opt('batch'))).map((c) => c.id) : args.includes('--all') ? CONCEPTS.map((c) => c.id) : [];
if (!ids.length) { console.error('Pass --ids a,b | --batch N | --all'); process.exit(2); }
const shots = opt('shots');

function serveRepo() {
  return new Promise((ok) => {
    const srv = http.createServer(async (req, res) => {
      try {
        const p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
        let f = join(REPO, p);
        if ((await stat(f)).isDirectory()) f = join(f, 'index.html');
        res.writeHead(200, { 'content-type': TYPES[extname(f)] ?? 'application/octet-stream' });
        res.end(await readFile(f));
      } catch { res.writeHead(404); res.end('not found'); }
    });
    srv.listen(0, '127.0.0.1', () => ok({ srv, base: `http://127.0.0.1:${srv.address().port}` }));
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let server = null;
let base = opt('base');
if (!base) { const s = await serveRepo(); server = s.srv; base = s.base; }
const browser = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--no-sandbox', '--autoplay-policy=no-user-gesture-required'] });

async function verifyOne(id) {
  const concept = CONCEPTS.find((c) => c.id === id);
  const checks = [];
  const fail = (name, detail) => checks.push({ name, ok: false, detail: String(detail) });
  const pass = (name, detail = '') => checks.push({ name, ok: true, detail });
  const problems = [];
  const page = await browser.newPage();
  page.on('console', (m) => { if (m.type() === 'error') problems.push(`console: ${m.text()}`); });
  page.on('pageerror', (e) => problems.push(`pageerror: ${e.message}`));
  page.on('requestfailed', (r) => problems.push(`requestfailed: ${r.url()}`));
  page.on('response', (r) => { if (r.status() >= 400 && !/favicon/.test(r.url()) && !/arcade\/media/.test(r.url())) problems.push(`http ${r.status()}: ${r.url()}`); });
  const snap = async (tag) => { if (shots) { await mkdir(shots, { recursive: true }); await page.screenshot({ path: join(shots, `${id}-${tag}.png`) }); } };
  const probe = () => page.evaluate(() => JSON.stringify(window.__arcade.inst.probe()));
  const shown = (sel) => page.evaluate((s) => { const e = document.querySelector(s); return !!e && !e.hidden && e.getClientRects().length > 0; }, sel);
  try {
    await page.setViewport({ width: 1280, height: 800 });

    // 1. catalog entry
    await page.goto(`${base}/frontier/`, { waitUntil: 'networkidle0', timeout: 30000 });
    const item = await page.$(`li[data-id="${id}"] a`);
    if (!item) { fail('catalog lists game', 'no card'); throw new Error('not in catalog'); }
    await item.evaluate((el) => el.scrollIntoView({ block: 'center' }));
    await sleep(250);
    const cover = await page.$eval(`li[data-id="${id}"] img`, (img) => ({ ok: img.complete && img.naturalWidth > 0, src: img.getAttribute('src') }));
    cover.ok ? pass('catalog cover loads') : fail('catalog cover loads', cover.src);
    const route = await page.$eval(`li[data-id="${id}"] a`, (a) => a.getAttribute('href'));
    route === `../games/${id}/` ? pass('catalog route') : fail('catalog route', route);
    await Promise.all([page.waitForNavigation({ waitUntil: 'load' }), item.click()]);
    pass('opened from catalog', page.url());

    // 2. first screen
    await page.waitForSelector('#mw-start', { timeout: 10000 });
    const intro = await page.evaluate(() => ({ title: document.querySelector('.mw-ov-title')?.textContent, how: document.querySelector('.mw-how')?.textContent ?? '', controls: document.querySelectorAll('.mw-controls li').length }));
    intro.title === concept.title && intro.how.length > 25 ? pass('first screen teaches the action', intro.how) : fail('first screen teaches the action', JSON.stringify(intro));
    intro.controls > 0 ? pass('controls listed') : fail('controls listed', 'none');
    await snap('1-intro');

    // 3. start + real input
    await page.goto(`${base}/games/${id}/?seed=7`, { waitUntil: 'load' });
    await page.waitForSelector('#mw-start');
    await page.click('#mw-start');
    await page.waitForFunction(() => window.__arcade?.inst, { timeout: 10000 });
    await sleep(300);
    const meta = await import(pathToFileURL(join(PKG, `src/meta/${id}.mjs`)).href).then((m) => m.default);
    const before = await probe();
    const box = await page.$eval('#stage', (e) => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
    const at = (fx, fy) => [box.x + box.w * fx, box.y + box.h * fy];
    const s = meta.smoke;
    if (s.click) await page.click(`#stage ${s.click}`);
    else if (s.key) await page.keyboard.press(s.key);
    else if (s.tap) await page.mouse.click(...at(...s.tap));
    else if (s.drag) { const [x1, y1] = at(s.drag[0], s.drag[1]); const [x2, y2] = at(s.drag[2], s.drag[3]); await page.mouse.move(x1, y1); await page.mouse.down(); await page.mouse.move((x1 + x2) / 2, (y1 + y2) / 2, { steps: 4 }); await page.mouse.move(x2, y2, { steps: 4 }); await page.mouse.up(); }
    else if (s.hold) { await page.mouse.move(...at(...s.hold)); await page.mouse.down(); await sleep(s.ms); await page.mouse.up(); }
    await sleep(250);
    const after = await probe();
    before !== after ? pass('defining input changes the state', `${before} -> ${after}`) : fail('defining input changes the state', `unchanged: ${before}`);
    await snap('2-playing');

    // 4. deterministic reset
    const det = await page.evaluate(() => { const i = window.__arcade.inst; i.reset(7); const a = JSON.stringify(i.probe()); i.reset(7); const b = JSON.stringify(i.probe()); return { a, b }; });
    det.a === det.b ? pass('reset(seed) is deterministic', det.a) : fail('reset(seed) is deterministic', `${det.a} vs ${det.b}`);

    // 5. win outcome, replay, lose outcome
    await page.evaluate(() => window.__arcade.inst.play('win'));
    await page.waitForFunction(() => window.__arcade.state === 'over', { timeout: 15000 });
    const win = await page.evaluate(() => window.__arcade.outcome);
    win?.result === 'win' ? pass('bot reaches a win', JSON.stringify(win)) : fail('bot reaches a win', JSON.stringify(win));
    await page.waitForSelector('#mw-again', { visible: true, timeout: 5000 });
    await snap('3-outcome');
    await page.click('#mw-again');
    await sleep(200);
    const replay = await page.evaluate(() => ({ state: window.__arcade.state, outcome: window.__arcade.outcome, overlay: !!document.querySelector('.mw-overlay:not([hidden])') }));
    replay.state === 'playing' && !replay.outcome && !replay.overlay ? pass('play again resets cleanly') : fail('play again resets cleanly', JSON.stringify(replay));
    await page.evaluate(() => window.__arcade.inst.play('lose'));
    await page.waitForFunction(() => window.__arcade.state === 'over', { timeout: 15000 });
    const lose = await page.evaluate(() => window.__arcade.outcome);
    lose?.result === 'lose' ? pass('bot reaches a loss', JSON.stringify(lose)) : fail('bot reaches a loss', JSON.stringify(lose));

    // 6. narrow touch layout
    const mobile = await browser.newPage();
    mobile.on('console', (m) => { if (m.type() === 'error') problems.push(`mobile console: ${m.text()}`); });
    mobile.on('pageerror', (e) => problems.push(`mobile pageerror: ${e.message}`));
    await mobile.emulate({ viewport: { width: 390, height: 780, deviceScaleFactor: 2, isMobile: true, hasTouch: true }, userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148' });
    await mobile.goto(`${base}/games/${id}/?seed=7`, { waitUntil: 'load' });
    await mobile.waitForSelector('#mw-start');
    const introFits = await mobile.evaluate(() => { const c = document.querySelector('.mw-card')?.getBoundingClientRect(); return !!c && c.left >= 0 && c.right <= window.innerWidth + 1; });
    introFits ? pass('mobile first screen fits') : fail('mobile first screen fits', 'card overflows');
    await mobile.tap('#mw-start');
    await mobile.waitForFunction(() => window.__arcade?.inst, { timeout: 10000 });
    await sleep(300);
    const lay = await mobile.evaluate(() => {
      const st = document.getElementById('stage');
      const over = [...st.querySelectorAll('*')].filter((e) => { const r = e.getBoundingClientRect(); return r.width > 0 && (r.right > window.innerWidth + 2 || r.left < -2); }).length;
      return { docW: document.documentElement.scrollWidth, winW: window.innerWidth, stageOverflowX: st.scrollWidth - st.clientWidth, off: over };
    });
    lay.docW <= lay.winW + 1 && lay.stageOverflowX <= 2 && lay.off === 0 ? pass('mobile layout has no horizontal overflow', JSON.stringify(lay)) : fail('mobile layout has no horizontal overflow', JSON.stringify(lay));
    const mb = await mobile.$eval('#stage', (e) => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; });
    const mbefore = await mobile.evaluate(() => JSON.stringify(window.__arcade.inst.probe()));
    let touched = true;
    if (s.click) await mobile.tap(`#stage ${s.click}`);
    else if (s.key) { const btn = await mobile.$(`.mw-pad [data-key="${s.key}"]`); if (btn) await btn.tap(); else touched = false; }
    else if (s.tap) await mobile.touchscreen.tap(mb.x + mb.w * s.tap[0], mb.y + mb.h * s.tap[1]);
    else if (s.drag) { const [x1, y1, x2, y2] = [mb.x + mb.w * s.drag[0], mb.y + mb.h * s.drag[1], mb.x + mb.w * s.drag[2], mb.y + mb.h * s.drag[3]]; await mobile.touchscreen.touchStart(x1, y1); await mobile.touchscreen.touchMove((x1 + x2) / 2, (y1 + y2) / 2); await mobile.touchscreen.touchMove(x2, y2); await mobile.touchscreen.touchEnd(); }
    else if (s.hold) { await mobile.touchscreen.touchStart(mb.x + mb.w * s.hold[0], mb.y + mb.h * s.hold[1]); await sleep(s.ms); await mobile.touchscreen.touchEnd(); }
    await sleep(300);
    const mafter = await mobile.evaluate(() => JSON.stringify(window.__arcade.inst.probe()));
    !touched ? fail('touch path works', 'key-driven game has no ctx.pad button for ' + s.key) : mbefore !== mafter ? pass('touch input changes the state') : fail('touch input changes the state', `unchanged: ${mbefore}`);
    if (shots) await mobile.screenshot({ path: join(shots, `${id}-4-mobile.png`) });
    await mobile.close();
  } catch (e) {
    fail('run completed', e.message);
  }
  const bad = problems.filter((p, i) => problems.indexOf(p) === i);
  bad.length ? fail('no console errors or failed requests', bad.slice(0, 5).join(' | ')) : pass('no console errors or failed requests');
  await page.close();
  const ok = checks.every((c) => c.ok);
  const out = { id, title: concept.title, batch: concept.batch, ok, at: new Date().toISOString(), base: opt('base') ? 'dev server' : 'built output', checks };
  const dir = join(REPO, 'docs/arcade-90/verification');
  await mkdir(dir, { recursive: true });
  await writeFile(join(dir, `${id}.json`), JSON.stringify(out, null, 2) + '\n');
  console.log(`${ok ? 'PASS' : 'FAIL'}  ${id}${ok ? '' : '\n' + checks.filter((c) => !c.ok).map((c) => `      x ${c.name}: ${c.detail}`).join('\n')}`);
  return ok;
}

let allOk = true;
for (const id of ids) { if (!CONCEPTS.some((c) => c.id === id)) { console.log(`SKIP  ${id} (not a concept)`); allOk = false; continue; } if (!existsSync(join(PKG, `src/games/${id}.ts`))) { console.log(`TODO  ${id} (no src/games/${id}.ts yet)`); allOk = false; continue; } allOk = (await verifyOne(id)) && allOk; }
await browser.close();
server?.close();
process.exit(allOk ? 0 : 1);
