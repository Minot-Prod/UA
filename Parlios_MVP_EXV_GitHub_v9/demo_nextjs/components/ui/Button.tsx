'use client';
import { cn } from '@/lib/cn';
type Variant = 'primary'|'ghost'|'outline';
type Size = 'sm'|'md'|'lg';

export function Button({children, as='button', variant='primary', size='md', disabled, loading=false, className, ...props}: any & {variant?:Variant; size?:Size; loading?:boolean}){
  const Comp:any = as;
  const base = 'inline-flex items-center justify-center rounded-2xl transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--primary)] disabled:opacity-60 disabled:cursor-not-allowed';
  const sizes = { sm:'h-9 px-3 text-sm', md:'h-10 px-4 text-sm', lg:'h-12 px-5 text-base' }[size];
  const variants = {
    primary:'bg-[var(--primary)] text-[var(--text)] hover:brightness-110',
    ghost:'bg-transparent text-[var(--text)] hover:bg-[color-mix(in_srgb,var(--text) 8%,transparent)]',
    outline:'bg-transparent border border-[color-mix(in_srgb,var(--text) 24%,transparent)] text-[var(--text)] hover:bg-[color-mix(in_srgb,var(--text) 6%,transparent)]'
  }[variant];
  return <Comp className={cn(base, sizes, variants, 'shadow', className)} aria-busy={loading||undefined} disabled={disabled||loading} {...props}>
    {loading && <span aria-hidden className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-[var(--text)] border-t-transparent" />}
    {children}
  </Comp>;
}