#!/usr/bin/env node
/**
 * Headless Chrome helper for checking a built game.
 *
 *   import { open } from '../../tools/theme/smoke.mjs';
 *   const { page, shot, close } = await open('games/unfall/index.html', { w: 1280, h: 720 });
 *   await shot('out/title.png');  await page.keyboard.press('Enter'); ...
 *
 * Serves the repository root over http://127.0.0.1 (never file://), runs Chrome
 * with SwiftShader WebGL, and collects console errors in `errors`.
 * CLI: node tools/theme/smoke.mjs games/unfall/index.html out.png [w] [h] [waitMs]
 */
import http from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { join, extname, resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import puppeteer from 'puppeteer-core';

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.png': 'image/png', '.webp': 'image/webp', '.gif': 'image/gif', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2', '.woff': 'font/woff', '.json': 'application/json', '.ico': 'image/x-icon' };
const CHROME = [process.env.CHROME, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].filter(Boolean);

function serve() {
  return new Promise((ok) => {
    const srv = http.createServer(async (req, res) => {
      let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
      let f = join(ROOT, p);
      try {
        if ((await stat(f)).isDirectory()) f = join(f, 'index.html');
        res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream' });
        res.end(await readFile(f));
      } catch {
        res.writeHead(404); res.end('404');
      }
    });
    srv.listen(0, '127.0.0.1', () => ok(srv));
  });
}

export async function open(path, { w = 1280, h = 720, reducedMotion = false } = {}) {
  const srv = await serve();
  const url = `http://127.0.0.1:${srv.address().port}/${path.replace(/^\.?\//, '')}`;
  let executablePath;
  for (const c of CHROME) { try { await stat(c); executablePath = c; break; } catch {} }
  const browser = await puppeteer.launch({
    executablePath,
    headless: true,
    args: ['--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist', '--autoplay-policy=no-user-gesture-required', `--window-size=${w},${h}`],
  });
  const page = await browser.newPage();
  await page.setViewport({ width: w, height: h });
  if (reducedMotion) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  const errors = [];
  page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
  page.on('pageerror', (e) => errors.push(String(e)));
  await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
  const shot = (out) => page.screenshot({ path: out });
  const close = async () => { await browser.close(); srv.close(); };
  return { page, shot, close, errors, url, browser };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const [path, out, w = 1280, h = 720, wait = 1500] = process.argv.slice(2);
  const s = await open(path, { w: +w, h: +h });
  await new Promise((r) => setTimeout(r, +wait));
  await s.shot(out);
  console.log('shot', out, s.errors.length ? `errors: ${s.errors.join(' | ')}` : 'no console errors');
  await s.close();
}
