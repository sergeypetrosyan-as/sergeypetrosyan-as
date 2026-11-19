#!/usr/bin/env node
/**
 * Verifies the exported artwork, decoding the real files in Chrome:
 *  - every GIF is animated (>1 frame) and loops forever
 *  - first, middle and last frames are dumped to .frames/decoded/ for review
 *  - the loop seam is small: last→first differs no more than an ordinary step
 *  - every image the README references exists
 *  - no README-referenced asset is left over from the former neon theme
 * Needs tools/theme dependencies (puppeteer-core) and Chrome/Edge.
 */
import { readFileSync, readdirSync, mkdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { REPO } from './lib.mjs';
import { open } from '../../theme/smoke.mjs';

const OUT = join(REPO, 'tools/profile-art/.frames/decoded');
mkdirSync(OUT, { recursive: true });

const gifs = [
  ...['hero.gif', 'hero-mobile.gif', 'footer.gif'].map((f) => `assets/${f}`),
  ...readdirSync(join(REPO, 'assets/cards')).filter((f) => f.endsWith('.gif')).map((f) => `assets/cards/${f}`),
];

let failed = 0;
const fail = (m) => { failed++; console.log('FAIL', m); };

// README references
const readme = readFileSync(join(REPO, 'README.md'), 'utf8');
const refs = [...readme.matchAll(/(?:src|srcset)="\.\/([^"]+)"/g)].map((m) => m[1]);
for (const r of new Set(refs)) if (!existsSync(join(REPO, r))) fail(`README references missing file ${r}`);
for (const legacy of ['hero-animation.gif', 'footer-animation.gif', 'game-preview.gif', '-preview.gif', 'img.shields.io/badge/%E2%96%B6']) if (readme.includes(legacy)) fail(`README still references former-theme asset ${legacy}`);
console.log(`README: ${new Set(refs).size} local images referenced`);

writeFileSync(join(OUT, 'blank.html'), '<!doctype html><title>check</title>');
const s = await open('tools/profile-art/.frames/decoded/blank.html', { w: 400, h: 300 });

for (const rel of gifs) {
  const bytes = [...readFileSync(join(REPO, rel))];
  const r = await s.page.evaluate(async (arr) => {
    const dec = new ImageDecoder({ data: new Uint8Array(arr), type: 'image/gif' });
    await dec.tracks.ready;
    const track = dec.tracks.selectedTrack;
    const n = track.frameCount;
    const grab = async (i) => {
      const { image } = await dec.decode({ frameIndex: i });
      const c = new OffscreenCanvas(image.displayWidth, image.displayHeight);
      const g = c.getContext('2d');
      g.drawImage(image, 0, 0);
      const px = g.getImageData(0, 0, c.width, c.height).data;
      const blob = await c.convertToBlob({ type: 'image/png' });
      const u8 = new Uint8Array(await blob.arrayBuffer());
      let bin = '';
      for (let i = 0; i < u8.length; i += 0x8000) bin += String.fromCharCode(...u8.subarray(i, i + 0x8000));
      const b64 = btoa(bin);
      image.close();
      return { px, b64, w: c.width, h: c.height };
    };
    const f0 = await grab(0);
    const f1 = await grab(1);
    const fm = await grab(n >> 1);
    const fl = await grab(n - 1);
    const diff = (a, b) => { let d = 0; for (let i = 0; i < a.px.length; i += 4) if (Math.abs(a.px[i] - b.px[i]) + Math.abs(a.px[i + 1] - b.px[i + 1]) + Math.abs(a.px[i + 2] - b.px[i + 2]) > 30) d++; return d / (a.px.length / 4); };
    return { n, loop: String(track.repetitionCount), w: f0.w, h: f0.h, seam: diff(fl, f0), step: diff(f0, f1), motion: diff(f0, fm), shots: [f0.b64, fm.b64, fl.b64] };
  }, bytes).catch((e) => ({ error: String(e) }));
  if (r.error) { fail(`${rel}: ${r.error}`); continue; }
  const name = rel.replace(/[\\/]/g, '_').replace('.gif', '');
  ['first', 'mid', 'last'].forEach((k, i) => writeFileSync(join(OUT, `${name}-${k}.png`), Buffer.from(r.shots[i], 'base64')));
  const line = `${rel}: ${r.w}x${r.h}, ${r.n} frames, loop=${r.loop}, motion ${(r.motion * 100).toFixed(1)}%, step ${(r.step * 100).toFixed(1)}%, seam ${(r.seam * 100).toFixed(1)}%`;
  if (r.n < 2) fail(`${line} — not animated`);
  else if (r.loop !== 'Infinity') fail(`${line} — does not loop forever`);
  else if (r.seam > Math.max(r.step * 2.5, 0.01)) fail(`${line} — visible jump at the loop seam`);
  else console.log('ok  ', line);
}
await s.close();
console.log(failed ? `${failed} problem(s)` : 'all artwork checks passed');
process.exit(failed ? 1 : 0);
