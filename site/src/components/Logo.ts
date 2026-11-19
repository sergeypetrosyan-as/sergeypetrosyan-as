/** Emblem: a carved crescent moon with a stamped star, inside a leather-stamp ring. */
export function Logo(size = 34, uid = 'nav'): string {
  return `
<svg class="logo" width="${size}" height="${size}" viewBox="0 0 48 48" aria-hidden="true" focusable="false">
  <defs><mask id="logo-m-${uid}"><rect width="48" height="48" fill="#fff"/><circle cx="27" cy="21" r="12" fill="#000"/></mask></defs>
  <circle cx="24" cy="24" r="21.5" fill="var(--mw-umber)" stroke="var(--mw-ember)" stroke-width="2"/>
  <circle cx="24" cy="24" r="17.5" fill="none" stroke="var(--mw-tan)" stroke-opacity=".55" stroke-dasharray="2 2.6"/>
  <circle cx="21" cy="26" r="12" fill="var(--mw-bone)" mask="url(#logo-m-${uid})"/>
  <path d="M33 11l1.6 4.2 4.4.2-3.5 2.8 1.2 4.3-3.7-2.5-3.7 2.5 1.2-4.3-3.5-2.8 4.4-.2z" fill="var(--mw-red)"/>
</svg>`;
}
