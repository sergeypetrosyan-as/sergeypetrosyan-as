/** Original emblem: a neon arcade cabinet screen inside a hexagonal badge. */
export function Logo(size = 34, uid = "nav"): string {
  return `
<svg class="logo" width="${size}" height="${size}" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
  <defs>
    <linearGradient id="logo-g-${uid}" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="var(--color-neon-cyan)"/>
      <stop offset="1" stop-color="var(--color-neon-pink)"/>
    </linearGradient>
  </defs>
  <path d="M24 3 42 13.5v21L24 45 6 34.5v-21z" fill="none" stroke="url(#logo-g-${uid})" stroke-width="2.5" stroke-linejoin="round"/>
  <rect x="15" y="14" width="18" height="13" rx="2" fill="none" stroke="var(--color-neon-cyan)" stroke-width="2"/>
  <path d="M19 23l3-4 2.5 2.5L27 18" fill="none" stroke="var(--color-neon-pink)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="19" cy="33" r="2.2" fill="var(--color-neon-pink)"/>
  <circle cx="29" cy="33" r="2.2" fill="var(--color-neon-cyan)"/>
</svg>`;
}
