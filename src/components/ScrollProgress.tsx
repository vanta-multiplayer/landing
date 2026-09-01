import { onCleanup, onMount } from 'solid-js';

export default function ScrollProgress() {
  let bar!: HTMLDivElement;
  onMount(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      const ratio = max > 0 ? scrollY / max : 0;
      bar.style.transform = `scaleX(${Math.min(1, Math.max(0, ratio))})`;
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update, { passive: true });
    onCleanup(() => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    });
  });
  return <div ref={bar} class="fixed inset-x-0 z-70 top-0 h-0.5 origin-left bg-primary" />;
}
