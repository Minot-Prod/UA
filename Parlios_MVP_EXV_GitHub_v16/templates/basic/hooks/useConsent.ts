import { useEffect, useState, useCallback } from 'react';
import { CONSENT_KEY, type Consent, type Scopes } from '../lib/consent';
export function useConsent(){
  const [consent, setConsent] = useState<Consent | null>(null);
  useEffect(()=>{ try{ setConsent(JSON.parse(localStorage.getItem(CONSENT_KEY)||'null')) }catch{ setConsent(null) } }, []);
  const acceptAll = useCallback(()=>{
    const data: Consent = { version:1, updated_at:new Date().toISOString(), expires_at:new Date(Date.now()+90*24*3600*1000).toISOString(),
      scopes:{ analytics:true, ai:true, session:true, security:true } };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data)); setConsent(data);
  }, []);
  const rejectAll = useCallback(()=>{
    const data: Consent = { version:1, updated_at:new Date().toISOString(), expires_at:new Date(Date.now()+90*24*3600*1000).toISOString(),
      scopes:{ analytics:false, ai:false, session:true, security:true } };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data)); setConsent(data);
  }, []);
  const saveCustom = useCallback((scopes:Scopes)=>{
    const data: Consent = { version:1, updated_at:new Date().toISOString(), expires_at:new Date(Date.now()+90*24*3600*1000).toISOString(), scopes };
    localStorage.setItem(CONSENT_KEY, JSON.stringify(data)); setConsent(data);
  }, []);
  return { consent, acceptAll, rejectAll, saveCustom };
}
