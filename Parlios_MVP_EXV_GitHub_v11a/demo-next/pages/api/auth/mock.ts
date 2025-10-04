import type { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const isProd = true;
  const cookie = [
    `parlios.session=mocktoken123`,
    `Path=/`,
    `HttpOnly`,
    `SameSite=Lax`,
    isProd ? `Secure` : ``,
    `Max-Age=${60*60*24*7}`
  ].filter(Boolean).join('; ');
  res.setHeader('Set-Cookie', cookie);
  res.status(200).json({ ok: true });
}
