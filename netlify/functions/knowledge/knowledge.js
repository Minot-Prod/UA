// Netlify Function: /api/knowledge
// Lit le fichier local knowledge/knowledge_index.json et le renvoie.
// CORS permissif pour l'utilisation par d'autres agents.

import { readFileSync } from "fs";

export default async () => {
  try {
    const raw = readFileSync("knowledge/knowledge_index.json", "utf-8");
    const data = JSON.parse(raw);

    return new Response(JSON.stringify({ ok: true, data }), {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "access-control-allow-origin": "*",
        "access-control-allow-methods": "GET, OPTIONS",
        "access-control-allow-headers": "Content-Type, Authorization",
        "cache-control": "public, max-age=60",
      },
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: String(err) }), {
      status: 500,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "access-control-allow-origin": "*",
      },
    });
  }
}

export const config = {
  path: "/api/knowledge",
}
