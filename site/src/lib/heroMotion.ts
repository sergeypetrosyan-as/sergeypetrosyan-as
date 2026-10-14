/**
 * Hero motion: pointer parallax (one CSS-variable write per animation frame,
 * never per event) and a small particle field on a canvas. Both stop when the
 * hero scrolls out of view or the tab is hidden, and are skipped for reduced motion.
 */
export function initHeroMotion(reducedMotion: MediaQueryList): void {
  const hero = document.querySelector<HTMLElement>('[data-hero]');
  const canvas = hero?.querySelector<HTMLCanvasElement>('[data-particles]');
  if (!hero || reducedMotion.matches) return;

  let inView = true;
  new IntersectionObserver(([e]) => {
    inView = e.isIntersecting;
    if (inView) particles?.start();
    else particles?.stop();
  }).observe(hero);

  // --- Parallax
  if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
    let tx = 0, ty = 0, queued = false;
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      ty = ((e.clientY - r.top) / r.height) * 2 - 1;
      if (queued) return;
      queued = true;
      requestAnimationFrame(() => {
        queued = false;
        hero.style.setProperty('--px', tx.toFixed(3));
        hero.style.setProperty('--py', ty.toFixed(3));
      });
    });
    hero.addEventListener('pointerleave', () => {
      hero.style.setProperty('--px', '0');
      hero.style.setProperty('--py', '0');
    });
  }

  // --- Particles
  const particles = canvas && getComputedStyle(canvas).display !== 'none' ? createParticles(canvas) : null;
  particles?.start();
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) particles?.stop();
    else if (inView) particles?.start();
  });
  reducedMotion.addEventListener('change', (e) => e.matches && particles?.stop());
}

interface Particle { x: number; y: number; vy: number; size: number; hue: number; phase: number; }

function createParticles(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  const COUNT = 46;
  const ps: Particle[] = [];
  let w = 0, h = 0, raf = 0, last = 0;
  const colors = ['50,246,255', '255,59,212', '155,92,255'];

  const resize = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    w = canvas.clientWidth;
    h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr);
    canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  };
  const spawn = (p: Partial<Particle> = {}): Particle => ({
    x: Math.random() * w,
    y: p.y ?? Math.random() * h,
    vy: 6 + Math.random() * 16,
    size: 0.6 + Math.random() * 1.8,
    hue: Math.floor(Math.random() * colors.length),
    phase: Math.random() * Math.PI * 2,
  });
  resize();
  for (let i = 0; i < COUNT; i++) ps.push(spawn());
  new ResizeObserver(resize).observe(canvas);

  const frame = (t: number) => {
    raf = requestAnimationFrame(frame);
    const dt = Math.min(0.05, (t - (last || t)) / 1000);
    last = t;
    ctx.clearRect(0, 0, w, h);
    for (let i = 0; i < ps.length; i++) {
      const p = ps[i];
      p.y -= p.vy * dt;
      p.phase += dt;
      if (p.y < -10) ps[i] = spawn({ y: h + 10 });
      const a = 0.35 + 0.35 * Math.sin(p.phase * 1.7);
      ctx.fillStyle = `rgba(${colors[p.hue]},${a.toFixed(2)})`;
      ctx.fillRect(p.x + Math.sin(p.phase) * 6, p.y, p.size, p.size);
    }
  };
  return {
    start() { if (!raf) { last = 0; raf = requestAnimationFrame(frame); } },
    stop() { cancelAnimationFrame(raf); raf = 0; },
  };
}
