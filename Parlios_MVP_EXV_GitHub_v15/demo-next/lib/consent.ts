export const CONSENT_KEY = 'parlios.consent.v1' as const;
export type Consent = { scopes: { analytics: boolean, ai: boolean, session: boolean, security: boolean } } | null
export function hasAnalyticsConsent(): boolean {
  try {
    const v = JSON.parse(localStorage.getItem(CONSENT_KEY) || 'null') as Consent
    return !!v?.scopes?.analytics
  } catch { return false }
}
