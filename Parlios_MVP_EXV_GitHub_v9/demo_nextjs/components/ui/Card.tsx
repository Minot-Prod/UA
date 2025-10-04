export function Card({ children, className='' }: any){
  return <div className={'rounded-2xl p-4 shadow bg-[color-mix(in_srgb,var(--bg) 92%,var(--text))] border border-[color-mix(in_srgb,var(--text) 12%,transparent)] '+className}>{children}</div>;
}