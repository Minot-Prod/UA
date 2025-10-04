export const CONSENT_KEY = 'parlios.consent.v1';
export type Scopes = { analytics: boolean; ai: boolean; session: boolean; security: boolean };
export type Consent = { version: number; updated_at: string; scopes: Scopes; expires_at: string };
export function hasAnalyticsConsent(): boolean {
  try{ const v = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null') as Consent | null; return !!v?.scopes?.analytics }catch{ return false }
}
