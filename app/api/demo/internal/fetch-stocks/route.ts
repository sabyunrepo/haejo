import { after } from 'next/server';
import { verifyCronSecret } from '@/lib/demo/utils/auth';
import { fetchStocks } from '@/lib/demo/ext/yahoo';
import { createServiceRoleClient } from '@/lib/demo/db/server';
import { withTimeout } from '@/lib/demo/utils/timeout';
import { ttl } from '@/lib/demo/cache/ttl';
import {
  getInternalUrl,
  getInternalAuthHeader,
} from '@/lib/demo/utils/internal-call';
import { DEMO_CONFIG } from '@/lib/demo/config';

export const runtime = 'nodejs';
export const maxDuration = 10;
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  const auth = verifyCronSecret(req);
  if (!auth.ok) return new Response('Unauthorized', { status: auth.status });

  const supabase = createServiceRoleClient();
  const startedAt = Date.now();
  let status: 'ok' | 'error' = 'ok';
  let errorMsg: string | null = null;
  let inserted = 0;

  try {
    const stocks = await withTimeout(
      fetchStocks(),
      DEMO_CONFIG.STEP_TIMEOUT_MS,
      'yahoo',
    );
    const expiresAt = ttl(DEMO_CONFIG.STOCK_QUOTE_TTL_MIN).toISOString();
    const rows = stocks.map((s) => ({
      ticker: s.ticker,
      price: s.price,
      change_pct: s.change_pct,
      currency: s.currency,
      expires_at: expiresAt,
    }));
    const { error } = await supabase.from('stock_quote').insert(rows);
    if (error) throw new Error(`db: ${error.message}`);
    inserted = rows.length;
  } catch (e) {
    status = 'error';
    errorMsg = `MKT-ERR-EXT-010: ${e instanceof Error ? e.message : String(e)}`;
  }

  await supabase.from('fetch_log').insert({
    source: 'fetch-stocks',
    status,
    latency_ms: Date.now() - startedAt,
    error: errorMsg,
  });

  after(() =>
    fetch(getInternalUrl('/api/demo/internal/summarize'), {
      method: 'POST',
      headers: getInternalAuthHeader(),
    }).catch(() => {
      /* trigger은 best-effort. summarize 실패는 자기 fetch_log에 기록 */
    }),
  );

  return Response.json({ ok: status === 'ok', inserted, error: errorMsg });
}
