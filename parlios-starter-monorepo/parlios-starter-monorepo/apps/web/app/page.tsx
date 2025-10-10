import { Button } from '@parlios/ui'
export default function Page() {
  return (
    <main className="p-8 max-w-3xl mx-auto space-y-6">
      <h1 className="text-3xl font-bold">Parlios — MVP</h1>
      <p className="text-neutral-600 dark:text-neutral-300">
        Next.js App Router + Tailwind + Radix-ready. Shared UI package wired.
      </p>
      <Button>Action primaire</Button>
    </main>
  )
}
