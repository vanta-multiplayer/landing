import { createSignal, onCleanup, onMount } from 'solid-js';
import { Menu, X, ArrowUpRight } from 'lucide-solid';
import { Button } from '@/components/ui/Button';

const links = [
  ['Home', '#home'],
  ['Platform', '#platform'],
  ['Developers', '#developers'],
  ['Roadmap', '#roadmap'],
  ['FAQ', '#faq'],
] as const;

export default function Header() {
  const [open, setOpen] = createSignal(false);
  const [scrolled, setScrolled] = createSignal(false);

  onMount(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    onCleanup(() => window.removeEventListener('scroll', onScroll));
  });

  return (
    <header class={`fixed inset-x-0 top-0 z-50 border-b transition-all duration-300 ${scrolled() ? 'glass border-border-soft' : 'border-transparent bg-transparent'}`}>
      <div class="mx-auto flex h-[76px] max-w-[1480px] items-center gap-6 px-5 sm:px-8 lg:px-10">
        <a href="#home" class="flex items-center gap-3" aria-label="Vanta home">
          <img src="/vanta-logo.png" alt="" class="size-10 object-contain" />
          <span class="font-display text-[19px] font-bold tracking-[-.04em] text-white">vanta<span class="text-primary">.mp</span></span>
        </a>

        <nav class="ml-auto hidden items-center gap-1 md:flex" aria-label="Main navigation">
          {links.map(([label, href]) => (
            <a href={href} class="rounded-md px-3.5 py-2 text-sm font-semibold text-muted transition hover:bg-white/[.035] hover:text-white">{label}</a>
          ))}
        </nav>

        <Button class="hidden md:inline-flex" href="https://discord.gg/Xmmv5Zh446" target="_blank" rel="noreferrer">
          Join Discord <ArrowUpRight class="size-4" />
        </Button>

        <button
          class="ml-auto inline-flex size-10 items-center justify-center rounded-md border border-border bg-surface-raised text-white md:hidden"
          onClick={() => setOpen(!open())}
          aria-label="Toggle menu"
          aria-expanded={open()}
        >
          {open() ? <X class="size-5" /> : <Menu class="size-5" />}
        </button>
      </div>

      {open() && (
        <div class="glass border-t border-border-soft px-5 pb-5 pt-3 md:hidden">
          <nav class="mx-auto flex max-w-[1480px] flex-col gap-1">
            {links.map(([label, href]) => (
              <a href={href} onClick={() => setOpen(false)} class="rounded-md px-3 py-3 text-sm font-semibold text-muted hover:bg-white/[.04] hover:text-white">{label}</a>
            ))}
            <Button class="mt-2 w-full" href="https://discord.gg/Xmmv5Zh446" target="_blank" rel="noreferrer">Join Discord</Button>
          </nav>
        </div>
      )}
    </header>
  );
}
