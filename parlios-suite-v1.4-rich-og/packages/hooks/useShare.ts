
export function useShare() {
  async function share(opts: { title: string; text: string; url?: string }) {
    try {
      if (navigator.share) {
        await navigator.share(opts)
        return { ok: true, method: 'webshare' }
      }
    } catch { /* ignore */ }
    await navigator.clipboard.writeText([opts.title, opts.text, opts.url || ''].filter(Boolean).join('\n\n'))
    return { ok: true, method: 'clipboard' }
  }
  return { share }
}
