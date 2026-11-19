#!/usr/bin/env node
/**
 * Regenerates every piece of profile artwork:
 *   assets/hero.gif, assets/hero-mobile.gif, assets/footer.gif
 *   assets/rule-dark.png, assets/rule-light.png, assets/skills-map.png, assets/arcade-button.png
 *   assets/cards/<game>.gif           (README + hub hover preview)
 *   arcade/media/<game>-card.webp     (hub poster, also copied to site/public)
 *   og-image.jpg (site/public)        (social image)
 *
 *   node src/build.mjs            all
 *   node src/build.mjs cards      one group (hero | footer | static | cards | posters)
 *   node src/build.mjs --frames   also dump first/middle/last frames for review
 */
import { writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { canvas, renderGif, writePng, writeWebp, writeJpeg, dumpFrames, REPO } from './lib.mjs';
import { HERO_DESKTOP, HERO_MOBILE, drawHero, FOOTER, drawFooter, drawSeparator, MAP, drawMap, BUTTON, drawButton, drawOg } from './profile.mjs';
import { CARDS, CARD, drawCard } from './cards.mjs';

const args = process.argv.slice(2);
const only = args.filter((a) => !a.startsWith('--'));
const want = (k) => !only.length || only.includes(k);
const frames = args.includes('--frames');
const FRAMES_DIR = join(REPO, 'tools/profile-art/.frames');
const report = [];

function gif(rel, w, h, n, delay, draw, opts) {
  const r = renderGif(rel, w, h, n, delay, draw, opts);
  report.push(`${rel}  ${w}x${h}  ${n} frames @${delay}ms  ${(r.bytes / 1024).toFixed(0)} KB`);
  if (frames) {
    const base = rel.replace(/[\\/]/g, '_').replace(/\.gif$/, '');
    dumpFrames(FRAMES_DIR, w, h, [[`${base}-first`, r.firstFrame], [`${base}-mid`, r.midFrame], [`${base}-last`, r.lastFrame]]);
  }
  return r;
}

if (want('hero')) {
  gif('assets/hero.gif', HERO_DESKTOP.W, HERO_DESKTOP.H, 40, 80, drawHero(HERO_DESKTOP), { colors: 96 });
  gif('assets/hero-mobile.gif', HERO_MOBILE.W, HERO_MOBILE.H, 40, 80, drawHero(HERO_MOBILE), { colors: 96 });
}

if (want('footer')) gif('assets/footer.gif', FOOTER.W, FOOTER.H, 48, 90, drawFooter, { colors: 64 });

if (want('static')) {
  for (const v of ['dark', 'light']) {
    const { c, g } = canvas(1280, 44);
    drawSeparator(g, 1280, 44, v);
    report.push(writePng(c, `assets/rule-${v}.png`).replace(REPO, '.'));
  }
  {
    const { c, g } = canvas(MAP.W, MAP.H);
    drawMap(g);
    report.push(writePng(c, 'assets/skills-map.png').replace(REPO, '.'));
  }
  {
    const { c, g } = canvas(BUTTON.W, BUTTON.H);
    drawButton(g);
    report.push(writePng(c, 'assets/arcade-button.png').replace(REPO, '.'));
  }
}

if (want('cards')) {
  for (const card of CARDS) gif(`assets/cards/${card.id}.gif`, CARD.W, CARD.H, card.frames ?? 36, card.delay ?? 80, drawCard(card), { colors: 64, transparent: true });
}

if (want('posters')) {
  // Hub posters: the card's first frame at 2x, as WebP; og image.
  for (const card of CARDS) {
    const { c, g } = canvas(CARD.W * 2, CARD.H * 2);
    g.scale(2, 2);
    drawCard(card)(g, 0);
    report.push(writeWebp(c, `arcade/media/${card.id}-card.webp`).replace(REPO, '.'));
    writeWebp(c, `site/public/arcade/media/${card.id}-card.webp`);
    // Each game's own source poster (referenced by its docs) is the same card.
    for (const ext of ['png', 'webp']) if (existsSync(join(REPO, `source/${card.id}/poster.${ext}`))) (ext === 'png' ? writePng : writeWebp)(c, `source/${card.id}/poster.${ext}`);
  }
  const { c, g } = canvas(1200, 630);
  drawOg(g, 1200, 630);
  report.push(writeJpeg(c, 'site/public/og-image.jpg').replace(REPO, '.'));
  const icon = canvas(180, 180);
  icon.g.fillStyle = '#150607';
  icon.g.fillRect(0, 0, 180, 180);
  const { drawIcon } = await import('./cards.mjs');
  drawIcon(icon.g, 180);
  report.push(writePng(icon.c, 'site/public/apple-touch-icon.png').replace(REPO, '.'));
}

mkdirSync(join(REPO, 'tools/profile-art'), { recursive: true });
writeFileSync(join(REPO, 'tools/profile-art/last-build.txt'), report.join('\n') + '\n');
console.log(report.join('\n'));
