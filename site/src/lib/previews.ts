/**
 * Cards show a light static poster; the heavier animated GIF is fetched only
 * when a pointer hovers (or keyboard focus enters) the card, then kept.
 */
export function initPreviews(): void {
  if (!window.matchMedia('(hover: hover)').matches) return;
  document.querySelectorAll<HTMLElement>('.game-card').forEach((card) => {
    const img = card.querySelector<HTMLImageElement>('img[data-preview]');
    if (!img) return;
    const poster = img.src;
    const gif = img.dataset.preview!;
    let loaded = false;
    const show = () => {
      if (loaded) { img.src = gif; return; }
      const pre = new Image();
      pre.onload = () => { loaded = true; if (card.matches(':hover, :focus-within')) img.src = gif; };
      pre.src = gif;
    };
    const hide = () => { if (!card.matches(':hover, :focus-within')) img.src = poster; };
    card.addEventListener('pointerenter', show);
    card.addEventListener('focusin', show);
    card.addEventListener('pointerleave', hide);
    card.addEventListener('focusout', () => setTimeout(hide, 0));
  });
}
