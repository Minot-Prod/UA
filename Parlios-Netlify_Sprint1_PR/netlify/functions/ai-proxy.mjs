export async function handler(event, context) {
  try {
    const { prompt } = JSON.parse(event.body || "{}");
    if (!prompt) return { statusCode: 400, body: JSON.stringify({ error: "Missing prompt" }) };
    // TODO: fetch your real AI provider using env vars (stored in Netlify dashboard)
    return { statusCode: 200, body: JSON.stringify({ text: `DEMO — Réponse pour: ${prompt}` }) };
  } catch (e) {
    return { statusCode: 500, body: JSON.stringify({ error: "Proxy error", detail: String(e) }) };
  }
}