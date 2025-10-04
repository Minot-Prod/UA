import { useEffect, useState, useCallback } from 'react';
import { load, save, type Consent, type Scopes } from '../lib/consent';
export function useConsent(){
  const [consent, setConsent] = useState<Consent | null>(null);
  useEffect(() => { setConsent(load()) }, []);
  const acceptAll = useCallback(()=>{
    const scopes: Scopes = { analytics:true, ai:true, session:true, security:true };
    save(scopes); setConsent(load());
  }, []);
  const rejectAll = useCallback(()=>{
    const scopes: Scopes = { analytics:false, ai:false, session:true, security:true };
    save(scopes); setConsent(load());
  }, []);
  const saveCustom = useCallback((scopes:Scopes)=>{ save(scopes); setConsent(load()) }, []);
  return { consent, acceptAll, rejectAll, saveCustom };
}
