import { cn } from '@/lib/cn';
export function Input({ className, ...props }: any){
  return <input className={cn('w-full h-10 px-3 rounded-xl bg-[var(--bg)] text-[var(--text)] border border-[color-mix(in_srgb,var(--text) 24%,transparent)] placeholder:text-[color-mix(in_srgb,var(--text) 45%,transparent)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)]', className)} {...props} />;
}