import { onCleanup, onMount } from 'solid-js';

type Particle = { x: number; y: number; vx: number; vy: number; radius: number; alpha: number; warm: boolean };

export default function Particles() {
  let canvas!: HTMLCanvasElement;

  onMount(() => {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = 0;
    let height = 0;
    let frame = 0;
    let particles: Particle[] = [];
    const pointer = { x: -1000, y: -1000 };

    const make = (): Particle => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - .5) * .18,
      vy: (Math.random() - .5) * .18,
      radius: Math.random() * 1.1 + .25,
      alpha: Math.random() * .26 + .05,
      warm: Math.random() > .62,
    });

    const resize = () => {
      const dpr = Math.min(devicePixelRatio || 1, 2);
      width = innerWidth;
      height = innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: innerWidth < 700 ? 22 : Math.min(58, Math.floor(innerWidth / 28)) }, make);
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const dist = Math.hypot(dx, dy);
        if (dist < 145 && dist > 0) {
          p.vx += (dx / dist) * .003;
          p.vy += (dy / dist) * .003;
        }
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.warm ? `rgba(242,139,58,${p.alpha})` : `rgba(255,255,255,${p.alpha * .42})`;
        ctx.fill();
      }
      frame = requestAnimationFrame(draw);
    };

    const move = (e: PointerEvent) => { pointer.x = e.clientX; pointer.y = e.clientY; };
    resize();
    draw();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', move, { passive: true });
    onCleanup(() => {
      cancelAnimationFrame(frame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', move);
    });
  });

  return <canvas ref={canvas} class="pointer-events-none fixed inset-0 z-0 opacity-80" aria-hidden="true" />;
}
