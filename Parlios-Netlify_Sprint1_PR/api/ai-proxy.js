/**
 * Minimal proxy (example) — do NOT commit real keys.
 * Expect env: AI_TEXT_ENDPOINT, AI_TEXT_KEY
 */
export default async (req, res) => {
  try {
    const { prompt } = req.body || {};
    if (!prompt) return res.status(400).json({ error: 'Missing prompt' });
    // Pseudo-call (replace with real fetch to LLM provider)
    return res.status(200).json({ text: `DEMO — Réponse pour: ${prompt}` });
  } catch (e) {
    return res.status(500).json({ error: 'Proxy error', detail: String(e) });
  }
};
