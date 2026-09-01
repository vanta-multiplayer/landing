import type { JSX } from 'solid-js';
import { cn } from '@/lib/cn';

interface ButtonProps extends JSX.AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
}

export function Button(props: ButtonProps) {
  const variants = {
    primary: 'bg-primary text-[#180b03] hover:bg-primary-soft shadow-[0_0_0_1px_rgba(255,255,255,.06),0_12px_40px_rgba(242,139,58,.16)]',
    secondary: 'border border-border bg-white/[.025] text-foreground hover:border-primary/50 hover:bg-primary/[.06]',
    ghost: 'text-muted hover:text-foreground hover:bg-white/[.04]',
  };

  return (
    <a
      {...props}
      class={cn(
        'inline-flex min-h-11 items-center justify-center gap-2 rounded-md px-5 py-2.5 text-sm font-extrabold tracking-[-.01em] transition-all duration-200 active:translate-y-px',
        variants[props.variant ?? 'primary'],
        props.class,
      )}
    />
  );
}
