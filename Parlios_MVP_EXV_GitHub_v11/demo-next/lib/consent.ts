export const CONSENT_KEY = 'parlios.consent.v1';
export type Scopes = { analytics: boolean; ai: boolean; session: boolean; security: boolean };
export type Consent = { version: number; updated_at: string; scopes: Scopes; expires_at: string };
const EXPIRE_DAYS = 90;
export function load(): Consent | null {
  try { return JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null') } catch { return null }
}
export function save(scopes: Scopes) {
  const data: Consent = {
    version: 1,
    updated_at: new Date().toISOString(),
    scopes,
    expires_at: new Date(Date.now() + EXPIRE_DAYS*24*3600*1000).toISOString()
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(data));
}
