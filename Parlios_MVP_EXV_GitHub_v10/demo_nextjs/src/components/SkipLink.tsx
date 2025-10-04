'use client';
import { PropsWithChildren } from 'react';

export default function SkipLink({ href, children }: PropsWithChildren<{ href: string }>) {
  return (
    <a
      href={href}
      className="sr-only focus:not-sr-only focus-ring fixed left-2 top-2 z-50 bg-white text-black px-3 py-2 rounded shadow"
    >
      {children}
    </a>
  );
}
