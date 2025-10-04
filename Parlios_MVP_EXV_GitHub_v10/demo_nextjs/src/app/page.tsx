'use client';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useT, setLocale, useLocale } from '../lib/i18n';
import SkipLink from '../components/SkipLink';
import LiveRegion from '../components/LiveRegion';

export default function Page() {
  const t = useT();
  const locale = useLocale();
  const [error, setError] = useState<string | null>(null);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Example non-blocking status message
    const sr = document.getElementById('sr-status');
    if (sr) sr.textContent = t('status.ready');
  }, [t]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const v = nameRef.current?.value?.trim();
    if (!v) {
      setError(t('form.error_required'));
      // Announce assertive error through LiveRegion component
      const err = document.getElementById('sr-error');
      if (err) err.textContent = t('form.error_required');
      return;
    }
    alert(t('form.hello', { name: v }));
  };

  return (
    <>
      <SkipLink href="#main">{t('a11y.skip_to_content')}</SkipLink>
      <LiveRegion />
      <header className="p-4 flex items-center justify-between">
        <h1 className="text-xl font-bold">{t('common.title')}</h1>
        <nav className="flex gap-3">
          <Link href="/" className="px-3 py-2 rounded focus-ring">{t('nav.home')}</Link>
          <Link href="/modules" className="px-3 py-2 rounded focus-ring">{t('nav.modules')}</Link>
        </nav>
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="locale-select">{t('i18n.language')}</label>
          <select
            id="locale-select"
            className="px-2 py-2 rounded border focus-ring"
            value={locale}
            onChange={(e)=>setLocale(e.target.value as any)}
          >
            <option value="fr">Français</option>
            <option value="en">English</option>
          </select>
        </div>
      </header>

      <main id="main" className="p-6 space-y-6">
        <section className="space-y-2">
          <h2 className="text-lg font-semibold">{t('hero.title')}</h2>
          <p>{t('hero.subtitle')}</p>
          <button className="px-4 py-2 rounded bg-black text-white focus-ring">
            {t('cta.start')}
          </button>
        </section>

        <section aria-labelledby="form-demo-title" className="space-y-2 max-w-md">
          <h2 id="form-demo-title" className="text-lg font-semibold">{t('form.title')}</h2>
          <form onSubmit={onSubmit} noValidate className="space-y-3">
            <div>
              <label htmlFor="name" className="block mb-1">{t('form.name')}</label>
              <input id="name" ref={nameRef} className="w-full px-3 py-2 rounded border focus-ring min-h-10" />
            </div>
            {error && (
              <p className="text-red-700" aria-live="assertive">{error}</p>
            )}
            <div className="flex gap-2">
              <button type="submit" className="px-4 py-2 rounded bg-blue-600 text-white focus-ring min-h-10 min-w-24">
                {t('form.submit')}
              </button>
              <button type="button" className="px-4 py-2 rounded border focus-ring min-h-10 min-w-24" onClick={()=>{setError(null); if (nameRef.current) nameRef.current.value='';}}>
                {t('form.clear')}
              </button>
            </div>
          </form>
        </section>
      </main>

      <footer className="p-4 text-sm text-gray-600">
        {t('footer.copy')}
      </footer>
    </>
  );
}
