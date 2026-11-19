/**
 * Cards show the still tarot card; its animated loop is fetched only when a
 * pointer hovers (or keyboard focus enters) the card, then kept. Skipped under
 * reduced motion — the still card is the whole composition.
 */
export function initPreviews(reducedMotion: MediaQueryList): void {
  if (reducedMotion.matches || !window.matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll<HTMLElement>('.game-card').forEach((card) => {
    const img = card.querySelector<HTMLImageElement>('img[data-preview]');
    if (!img) return;
    const still = img.src;
    const gif = img.dataset.preview!;
    let loaded = false;
    const show = () => {
      if (loaded) { img.src = gif; return; }
      const pre = new Image();
      pre.onload = () => { loaded = true; if (card.matches(':hover, :focus-within')) img.src = gif; };
      pre.src = gif;
    };
    const hide = () => { if (!card.matches(':hover, :focus-within')) img.src = still; };
    card.addEventListener('pointerenter', show);
    card.addEventListener('focusin', show);
    card.addEventListener('pointerleave', hide);
    card.addEventListener('focusout', () => setTimeout(hide, 0));
  });
}
