import { icon } from '../lib/html';
import { SITE } from '../data/site';

/** Deterministic skyline so the static HTML is identical on every build. */
function skyline(): string {
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const rects: string[] = [];
  const windows: string[] = [];
  let x = 0;
  while (x < 1200) {
    const w = 26 + Math.floor(rnd() * 46);
    const h = 60 + Math.floor(rnd() * 170);
    const y = 260 - h;
    rects.push(`<rect x="${x}" y="${y}" width="${w}" height="${h}"/>`);
    if (rnd() < 0.35) rects.push(`<rect x="${x + w / 2 - 1}" y="${y - 18}" width="2" height="18"/>`);
    for (let wy = y + 10; wy < 250; wy += 14) {
      for (let wx = x + 5; wx < x + w - 6; wx += 10) {
        if (rnd() < 0.16) windows.push(`<rect x="${wx}" y="${wy}" width="4" height="6"/>`);
      }
    }
    x += w + 2 + Math.floor(rnd() * 8);
  }
  return `
<svg class="hv-city" viewBox="0 0 1200 260" preserveAspectRatio="xMidYMax slice" aria-hidden="true" focusable="false">
  <g class="hv-city-blocks">${rects.join('')}</g>
  <g class="hv-city-windows">${windows.join('')}</g>
</svg>`;
}

/** Arcade cabinet centrepiece: marquee, CRT screen with a mini scene, control deck. */
function cabinet(): string {
  const invaders = [0, 1, 2, 3, 4]
    .map((i) => `<use href="#hv-invader" x="${78 + i * 34}" y="${i % 2 ? 96 : 92}" class="hv-inv hv-inv-${i}"/>`)
    .join('');
  return `
<svg class="hv-cabinet" viewBox="0 0 340 460" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="hv-edge" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="var(--color-neon-cyan)"/>
      <stop offset=".55" stop-color="var(--color-neon-purple)"/>
      <stop offset="1" stop-color="var(--color-neon-pink)"/>
    </linearGradient>
    <linearGradient id="hv-screen" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#140a33"/>
      <stop offset=".62" stop-color="#3a0f55"/>
      <stop offset="1" stop-color="#ff3bd4" stop-opacity=".55"/>
    </linearGradient>
    <linearGradient id="hv-sun" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffd84a"/>
      <stop offset="1" stop-color="#ff3bd4"/>
    </linearGradient>
    <clipPath id="hv-screen-clip"><rect x="58" y="72" width="224" height="170" rx="10"/></clipPath>
    <symbol id="hv-invader" viewBox="0 0 11 8" width="22" height="16">
      <path d="M2 0h1v1H2zM8 0h1v1H8zM3 1h5v1H3zM2 2h7v1H2zM1 3h2v1H1zM4 3h3v1H4zM8 3h2v1H8zM0 4h11v1H0zM0 5h1v2H0zM2 5h7v1H2zM10 5h1v2h-1zM2 6h1v1H2zM8 6h1v1H8zM3 7h2v1H3zM6 7h2v1H6z" fill="currentColor"/>
    </symbol>
  </defs>
  <!-- cabinet body -->
  <path class="hv-cab-body" d="M40 20h260l20 30v190l-24 40v150H44V280l-24-40V50z"/>
  <path class="hv-cab-edge" d="M40 20h260l20 30v190l-24 40v150H44V280l-24-40V50z"/>
  <!-- marquee -->
  <rect x="62" y="30" width="216" height="30" rx="6" class="hv-marquee"/>
  <text x="170" y="51" text-anchor="middle" class="hv-marquee-text">NEON ARCADE</text>
  <!-- screen -->
  <rect x="52" y="66" width="236" height="182" rx="14" class="hv-bezel"/>
  <g clip-path="url(#hv-screen-clip)">
    <rect x="58" y="72" width="224" height="170" fill="url(#hv-screen)"/>
    <circle cx="170" cy="196" r="38" fill="url(#hv-sun)" class="hv-screen-sun"/>
    <g class="hv-sun-cuts"><rect x="120" y="200" width="100" height="3"/><rect x="120" y="210" width="100" height="4"/><rect x="120" y="221" width="100" height="5"/></g>
    <g class="hv-screen-grid">
      <path d="M58 234H282M58 226H282M58 220H282"/>
      <path d="M170 214 90 242M170 214 130 242M170 214 210 242M170 214 250 242M170 214 170 242"/>
    </g>
    <g class="hv-invaders">${invaders}</g>
    <path class="hv-ship" d="M163 186h14l-3-6h-8z"/>
    <rect class="hv-shot" x="169" y="150" width="2" height="9"/>
    <text x="170" y="138" text-anchor="middle" class="hv-press">PRESS START</text>
    <rect class="hv-scan" x="58" y="72" width="224" height="170"/>
  </g>
  <!-- control deck -->
  <path class="hv-deck" d="M44 280h252l-20 34H64z"/>
  <circle cx="110" cy="296" r="6" class="hv-stick-base"/>
  <line x1="110" y1="296" x2="104" y2="280" class="hv-stick"/>
  <circle cx="104" cy="279" r="6" class="hv-stick-ball"/>
  <circle cx="196" cy="297" r="6" class="hv-btn hv-btn-a"/>
  <circle cx="216" cy="292" r="6" class="hv-btn hv-btn-b"/>
  <circle cx="236" cy="297" r="6" class="hv-btn hv-btn-c"/>
  <!-- coin door -->
  <rect x="140" y="350" width="60" height="70" rx="6" class="hv-coin"/>
  <rect x="160" y="366" width="20" height="4" rx="2" class="hv-coin-slot"/>
  <text x="170" y="396" text-anchor="middle" class="hv-coin-text">INSERT</text>
  <text x="170" y="408" text-anchor="middle" class="hv-coin-text">COIN</text>
</svg>`;
}

export function Hero(gameCount: number): string {
  return `
<section class="hero" id="home" aria-labelledby="hero-title" data-hero>
  <div class="hero-bg" aria-hidden="true">
    <div class="hv-aurora"></div>
    <div class="hv-sun" data-depth="0.15"><span></span></div>
    <div class="hv-city-wrap" data-depth="0.3">${skyline()}</div>
    <div class="hv-grid"><div class="hv-grid-plane"></div></div>
    <canvas class="hv-particles" data-particles></canvas>
  </div>
  <div class="hero-inner container">
    <div class="hero-copy">
      <p class="status-line reveal-hero" style="--d:0">
        <span class="status-dot"></span>ARCADE SYSTEM <span class="sep">//</span> READY TO PLAY
      </p>
      <h1 class="hero-title" id="hero-title">
        <span class="reveal-hero" style="--d:1">REAL CODE.</span>
        <span class="reveal-hero hero-title-accent" style="--d:2">VIRTUAL WORLDS.</span>
      </h1>
      <p class="hero-lead reveal-hero" style="--d:3">Experimental browser games, immersive worlds, and interactive experiences built with code.</p>
      <div class="hero-actions reveal-hero" style="--d:4">
        <a class="btn btn-primary" href="#games">EXPLORE GAMES ${icon('arrowDown', 16)}</a>
        <a class="btn btn-ghost" href="${SITE.githubProfile}" target="_blank" rel="noopener noreferrer">${icon('github', 16)} VIEW GITHUB</a>
      </div>
      <dl class="hero-meta reveal-hero" style="--d:5">
        <div><dt>CARTRIDGES</dt><dd>${String(gameCount).padStart(2, '0')}</dd></div>
        <div><dt>ENGINE</dt><dd>THE BROWSER</dd></div>
        <div><dt>INSTALL</dt><dd>NONE</dd></div>
      </dl>
    </div>
    <div class="hero-visual" aria-hidden="true">
      <div class="hv-halo" data-depth="0.6"><i></i><i></i><i></i></div>
      <div class="hv-cabinet-wrap" data-depth="1">${cabinet()}</div>
      <div class="hv-shapes" data-depth="1.4">
        <span class="shape shape-tri"></span><span class="shape shape-ring"></span>
        <span class="shape shape-diamond"></span><span class="shape shape-cross"></span>
        <span class="shape shape-dot"></span>
      </div>
    </div>
  </div>
  <a class="scroll-cue" href="#games" aria-label="Scroll to games">${icon('arrowDown', 18)}</a>
</section>`;
}
