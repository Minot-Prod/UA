import * as React from 'react'
export function Button(props: React.ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      {...props}
      className={
        'inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium ' +
        'bg-black text-white hover:opacity-90 active:opacity-80 disabled:opacity-50'
      }
    />
  )
}
