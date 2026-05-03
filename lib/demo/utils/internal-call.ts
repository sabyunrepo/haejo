export function getInternalUrl(path: string): string {
  const base = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : (process.env.LOCAL_URL ?? 'http://localhost:3000');
  return `${base}${path}`;
}

export function getInternalAuthHeader(): Record<string, string> {
  const secret = process.env.CRON_SECRET;
  if (!secret) throw new Error('SYS-ERR-API-001: missing CRON_SECRET');
  return { Authorization: `Bearer ${secret}` };
}
