type AuthResult = { ok: true } | { ok: false; status: 401 | 500 };

export function verifyCronSecret(req: Request): AuthResult {
  const secret = process.env.CRON_SECRET;
  if (!secret) return { ok: false, status: 500 };
  const header = req.headers.get('authorization');
  if (header !== `Bearer ${secret}`) return { ok: false, status: 401 };
  return { ok: true };
}
