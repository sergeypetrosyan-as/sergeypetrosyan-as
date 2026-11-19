import { icon } from '../lib/html';
import { SITE } from '../data/site';

/** Deterministic PRNG so the pre-rendered SVG is identical on every build. */
function rng(seed: number) {
  return () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
}

/** Quiet background stars: small four-point glyphs and dots, denser at the zenith. */
function stars(): string {
  const r = rng(11);
  const out: string[] = [];
  for (let i = 0; i < 170; i++) {
    const x = Math.round(r() * 1440);
    const y = Math.round(r() * 700 * r());
    const s = 0.5 + r() * 1.4;
    const o = (0.25 + r() * 0.55).toFixed(2);
    out.push(
      s > 1.6
        ? `<path d="M${x} ${y - s * 2}Q${x} ${y} ${x + s * 2} ${y}Q${x} ${y} ${x} ${y + s * 2}Q${x} ${y} ${x - s * 2} ${y}Q${x} ${y} ${x} ${y - s * 2}z" opacity="${o}"/>`
        : `<rect x="${x}" y="${y}" width="${s.toFixed(1)}" height="${s.toFixed(1)}" opacity="${o}"/>`,
    );
  }
  return out.join('');
}

/** A mesa ridge: flat-topped plateaus with sloped shoulders. */
function ridge(seed: number, base: number, height: number, plateaus: number): string {
  const r = rng(seed);
  const step = 1440 / plateaus;
  let d = `M-20 900L-20 ${base - height * 0.2}`;
  for (let i = 0; i < plateaus; i++) {
    const sx = i * step + step * (0.08 + r() * 0.12);
    const ex = (i + 1) * step - step * (0.08 + r() * 0.12);
    const top = base - height * (0.6 + r() * 0.4);
    const sh = step * 0.07;
    d += `L${sx.toFixed(0)} ${(base - height * (0.15 + r() * 0.2)).toFixed(0)}L${(sx + sh).toFixed(0)} ${top.toFixed(0)}L${(ex - sh).toFixed(0)} ${top.toFixed(0)}L${ex.toFixed(0)} ${(base - height * (0.15 + r() * 0.2)).toFixed(0)}`;
  }
  return `${d}L1460 ${base - height * 0.2}L1460 900Z`;
}

function cactus(x: number, y: number, h: number): string {
  const w = h * 0.16;
  return `<g transform="translate(${x} ${y})"><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" rx="${w / 2}"/><rect x="${-w * 1.9}" y="${-h * 0.55}" width="${w * 1.6}" height="${w * 0.7}"/><rect x="${-w * 2.3}" y="${-h * 0.82}" width="${w * 0.8}" height="${h * 0.32}" rx="${w * 0.4}"/><rect x="${w * 0.3}" y="${-h * 0.4}" width="${w * 1.5}" height="${w * 0.7}"/><rect x="${w * 1.4}" y="${-h * 0.62}" width="${w * 0.8}" height="${h * 0.27}" rx="${w * 0.4}"/></g>`;
}

/**
 * The frontier observatory: engraved night sky, a carved moon resting on the
 * horizon, a low mesa, sparse cacti, and the observatory whose telescope points
 * at three stars that drift into line (the scene's one motion; CSS, 9 s loop).
 */
function skyline(): string {
  return `
<svg class="sky" viewBox="0 0 1440 900" preserveAspectRatio="xMaxYMax slice" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="sky-g" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="var(--mw-ink)"/><stop offset=".5" stop-color="var(--mw-night)"/><stop offset=".86" stop-color="var(--mw-dusk)"/>
    </linearGradient>
    <linearGradient id="ground-g" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--mw-umber)"/><stop offset="1" stop-color="var(--mw-ink)"/></linearGradient>
    <pattern id="strata" width="8" height="7" patternUnits="userSpaceOnUse"><rect width="8" height="1" fill="var(--mw-ember)" opacity=".28"/></pattern>
    <pattern id="engrave" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)"><rect width="6" height="1" fill="var(--mw-wine)" opacity=".35"/></pattern>
    <radialGradient id="moon-halo"><stop offset=".4" stop-color="var(--mw-bone)" stop-opacity=".16"/><stop offset="1" stop-color="var(--mw-bone)" stop-opacity="0"/></radialGradient>
    <radialGradient id="star-halo"><stop offset="0" stop-color="var(--mw-rose)" stop-opacity=".45"/><stop offset="1" stop-color="var(--mw-rose)" stop-opacity="0"/></radialGradient>
    <symbol id="sky-star" viewBox="-10 -10 20 20"><path d="M0-10Q0 0 10 0Q0 0 0 10Q0 0-10 0Q0 0 0-10z" fill="var(--mw-bone)" stroke="var(--mw-rose)" stroke-width="1.2"/></symbol>
  </defs>
  <rect width="1440" height="900" fill="url(#sky-g)"/>
  <g class="sky-stars" fill="var(--mw-bone)">${stars()}</g>
  <g class="sky-moon">
    <circle cx="930" cy="742" r="200" fill="url(#moon-halo)"/>
    <circle cx="930" cy="742" r="96" fill="var(--mw-bone)"/>
    <circle cx="930" cy="742" r="96" fill="url(#engrave)"/>
    <circle cx="930" cy="742" r="86" fill="none" stroke="var(--mw-ember)" stroke-opacity=".45"/>
    <circle cx="930" cy="742" r="76" fill="none" stroke="var(--mw-ember)" stroke-opacity=".3"/>
    <circle cx="930" cy="742" r="96" fill="none" stroke="var(--mw-ember)" stroke-width="3"/>
  </g>
  <path d="${ridge(8, 800, 96, 3)}" fill="var(--mw-mesa)"/>
  <path d="${ridge(8, 800, 96, 3)}" fill="url(#strata)"/>
  <path d="M1120 900L1150 750L1180 694H1400L1430 750L1460 900Z" fill="var(--mw-umber)"/>
  <path d="M1120 900L1150 750L1180 694H1400L1430 750L1460 900Z" fill="url(#strata)"/>
  <g class="observatory" fill="var(--mw-ink)">
    <rect x="1252" y="660" width="64" height="34"/>
    <path d="M1257 660a27 27 0 0 1 54 0z"/>
    <rect x="1226" y="626" width="50" height="8" transform="rotate(38 1276 640)"/>
    <rect x="1283" y="634" width="3" height="26" fill="var(--mw-red)"/>
    <rect x="1278" y="678" width="11" height="16" fill="var(--mw-red)"/>
  </g>
  <path d="M1250 612L1204 576L1158 540L1112 504L1060 463" class="sight" fill="none" stroke="var(--mw-rose)" stroke-dasharray="2 7"/>
  <g class="align">
    <g class="align-star a1"><circle cx="1204" cy="576" r="26" fill="url(#star-halo)"/><use href="#sky-star" x="1194" y="566" width="20" height="20"/></g>
    <g class="align-star a2"><circle cx="1158" cy="540" r="30" fill="url(#star-halo)"/><use href="#sky-star" x="1146" y="528" width="24" height="24"/></g>
    <g class="align-star a3"><circle cx="1112" cy="504" r="26" fill="url(#star-halo)"/><use href="#sky-star" x="1102" y="494" width="20" height="20"/></g>
  </g>
  <path d="${ridge(5, 850, 44, 4)}" fill="var(--mw-umber)"/>
  <rect y="850" width="1440" height="50" fill="url(#ground-g)"/>
  <g fill="var(--mw-ink)">${cactus(700, 858, 58)}${cactus(1040, 858, 34)}${cactus(80, 858, 44)}</g>
</svg>`;
}

export function Hero(gameCount: number): string {
  return `
<section class="hero" id="home" aria-labelledby="hero-title" data-hero>
  <div class="hero-bg" aria-hidden="true">${skyline()}</div>
  <div class="hero-inner container">
    <div class="hero-copy">
      <p class="kicker m-enter" style="--d:0">${SITE.owner} · Browser games</p>
      <h1 class="hero-title m-enter" id="hero-title" style="--d:1">MYSTICAL WESTERN ARCADE</h1>
      <p class="hero-lead m-enter" style="--d:2">${gameCount} original games you play in the browser: a time-lens puzzle, a 3D tank arena, a detective case, a stealth heist and more. Pick a card; nothing to install.</p>
      <div class="hero-actions m-enter" style="--d:3">
        <a class="btn btn-primary" href="#games">Pick a game ${icon('arrowDown', 16)}</a>
        <a class="btn btn-ghost" href="./frontier/">Browse 90 more games</a>
        <a class="btn btn-ghost" href="${SITE.repository}" target="_blank" rel="noopener noreferrer">${icon('github', 16)} Read the source</a>
      </div>
      <dl class="hero-meta m-enter" style="--d:4">
        <div><dt>Games</dt><dd>${gameCount}</dd></div>
        <div><dt>Runs in</dt><dd>The browser</dd></div>
        <div><dt>Install</dt><dd>None</dd></div>
      </dl>
    </div>
  </div>
</section>`;
}
