import { after } from 'next/server';
import { verifyCronSecret } from '@/lib/demo/utils/auth';
import {
  getInternalUrl,
  getInternalAuthHeader,
} from '@/lib/demo/utils/internal-call';

export const runtime = 'nodejs';
export const maxDuration = 10;
export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  const auth = verifyCronSecret(req);
  if (!auth.ok) {
    return new Response('Unauthorized', { status: auth.status });
  }

  after(async () => {
    const headers = getInternalAuthHeader();
    await Promise.allSettled([
      fetch(getInternalUrl('/api/demo/internal/fetch-stocks'), {
        method: 'POST',
        headers,
      }),
      fetch(getInternalUrl('/api/demo/internal/fetch-news'), {
        method: 'POST',
        headers,
      }),
    ]);
  });

  return Response.json({
    ok: true,
    dispatched: ['fetch-stocks', 'fetch-news'],
    ts: new Date().toISOString(),
  });
}
