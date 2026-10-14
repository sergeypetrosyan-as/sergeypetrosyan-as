/** Sticky-nav state, mobile menu and the active-section indicator. */
export function initNav(): void {
  const nav = document.querySelector<HTMLElement>('[data-nav]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-nav-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-nav-menu]');
  if (!nav || !toggle || !menu) return;

  const setOpen = (open: boolean) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only')!.textContent = open ? 'Close menu' : 'Menu';
    menu.classList.toggle('is-open', open);
  };
  toggle.addEventListener('click', () => setOpen(toggle.getAttribute('aria-expanded') !== 'true'));
  menu.addEventListener('click', (e) => {
    if ((e.target as HTMLElement).closest('a')) setOpen(false);
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') {
      setOpen(false);
      toggle.focus();
    }
  });
  window.matchMedia('(min-width: 821px)').addEventListener('change', (e) => e.matches && setOpen(false));

  // Background solidifies once the page scrolls (sentinel avoids scroll listeners).
  const hero = document.querySelector('[data-hero]');
  if (hero) {
    new IntersectionObserver(([entry]) => nav.classList.toggle('is-scrolled', entry.intersectionRatio < 0.85), {
      threshold: [0.85],
    }).observe(hero);
  }

  // Highlight the link for the section currently in view.
  const links = [...document.querySelectorAll<HTMLAnchorElement>('[data-nav-link]')];
  const sections = links
    .map((a) => document.querySelector<HTMLElement>(a.getAttribute('href')!))
    .filter((s): s is HTMLElement => s !== null);
  const visible = new Map<Element, number>();
  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) visible.set(e.target, e.isIntersecting ? e.intersectionRatio : 0);
      let best: Element | null = null;
      let bestRatio = 0;
      for (const s of sections) {
        const r = visible.get(s) ?? 0;
        if (r > bestRatio) { best = s; bestRatio = r; }
      }
      for (const a of links) {
        const active = best !== null && a.getAttribute('href') === `#${best.id}`;
        if (active) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      }
    },
    { threshold: [0, 0.15, 0.3, 0.5, 0.75], rootMargin: '-68px 0px -30% 0px' },
  );
  sections.forEach((s) => io.observe(s));
}
