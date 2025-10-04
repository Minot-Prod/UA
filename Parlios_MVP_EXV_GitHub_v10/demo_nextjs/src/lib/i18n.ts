'use client';
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Locale = 'fr' | 'en';
type Dict = Record<string, string>;

const LocaleCtx = createContext<{locale: Locale, set: (l: Locale)=>void}>({locale: 'fr', set: ()=>{}});
const DictCtx = createContext<Dict>({});

async function load(locale: Locale): Promise<Dict> {
  const common = await import(`../../i18n/${locale}/common.json`);
  return common.default;
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('fr');
  const [dict, setDict] = useState<Dict>({});

  useEffect(()=>{
    load(locale).then(setDict);
    // Update <html lang="...">
    if (typeof document !== 'undefined') {
      document.documentElement.lang = locale;
      document.documentElement.dir = (locale === 'ar' ? 'rtl' : 'ltr');
    }
  }, [locale]);

  const set = (l: Locale)=> setLocaleState(l);
  const dictMemo = useMemo(()=>dict, [dict]);

  return (
    <LocaleCtx.Provider value={{locale, set}}>
      <DictCtx.Provider value={dictMemo}>{children}</DictCtx.Provider>
    </LocaleCtx.Provider>
  );
}

export function useLocale(): Locale {
  return useContext(LocaleCtx).locale;
}

export function setLocale(l: Locale) {
  const ctx = useContext(LocaleCtx);
  ctx.set(l);
}

export function useT() {
  const dict = useContext(DictCtx);
  return (key: string, vars?: Record<string, string|number>) => {
    let s = dict[key] ?? key;
    if (vars) {
      Object.entries(vars).forEach(([k,v]) => {
        s = s.replace(new RegExp(`\\{${k}\\}`, 'g'), String(v));
      });
    }
    return s;
  };
}
