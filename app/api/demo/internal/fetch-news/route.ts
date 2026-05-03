import { after } from 'next/server';
import { verifyCronSecret } from '@/lib/demo/utils/auth';
import { fetchNewsByKeyword, type NewsItem } from '@/lib/demo/ext/gnews';
import { createServiceRoleClient } from '@/lib/demo/db/server';
import { withTimeout } from '@/lib/demo/utils/timeout';
import { ttl, todayKstDate } from '@/lib/demo/cache/ttl';
import {
  getInternalUrl,
  getInternalAuthHeader,
} from '@/lib/demo/utils/internal-call';
import { DEMO_CONFIG } from '@/lib/demo/config';

export const runtime = 'nodejs';
export const maxDuration = 10;
export const dynamic = 'force-dynamic';

type TickerNewsResult = { ticker: string; items: NewsItem[] };

export async function POST(req: Request) {
  const auth = verifyCronSecret(req);
  if (!auth.ok) return new Response('Unauthorized', { status: auth.status });

  const supabase = createServiceRoleClient();
  const startedAt = Date.now();
  let status: 'ok' | 'error' = 'ok';
  let errorMsg: string | null = null;
  let inserted = 0;

  try {
    const date = todayKstDate();
    const expiresAt = ttl(DEMO_CONFIG.NEWS_SUMMARY_TTL_HOURS * 60).toISOString();

    const settled = await Promise.allSettled(
      DEMO_CONFIG.TICKERS.map((t) =>
        withTimeout(
          fetchNewsByKeyword(t.searchQuery),
          DEMO_CONFIG.STEP_TIMEOUT_MS,
          `gnews:${t.ticker}`,
        ).then<TickerNewsResult>((items) => ({ ticker: t.ticker, items })),
      ),
    );

    const fulfilled = settled
      .filter(
        (r): r is PromiseFulfilledResult<TickerNewsResult> =>
          r.status === 'fulfilled',
      )
      .map((r) => r.value);

    const rows = fulfilled.map((r) => ({
      keyword: r.ticker,
      date,
      locale: 'ko-KR',
      payload: { items: r.items },
      expires_at: expiresAt,
    }));

    if (rows.length > 0) {
      const { error } = await supabase
        .from('news_summary')
        .upsert(rows, { onConflict: 'keyword,date,locale' });
      if (error) throw new Error(`db: ${error.message}`);
      inserted = rows.length;
    }

    if (fulfilled.length < DEMO_CONFIG.TICKERS.length) {
      status = 'error';
      const missed = DEMO_CONFIG.TICKERS.length - fulfilled.length;
      errorMsg = `NWS-WARN-EXT-011: ${missed} ticker(s) failed`;
    }
  } catch (e) {
    status = 'error';
    errorMsg = `NWS-ERR-EXT-011: ${e instanceof Error ? e.message : String(e)}`;
  }

  await supabase.from('fetch_log').insert({
    source: 'fetch-news',
    status,
    latency_ms: Date.now() - startedAt,
    error: errorMsg,
  });

  after(() =>
    fetch(getInternalUrl('/api/demo/internal/summarize'), {
      method: 'POST',
      headers: getInternalAuthHeader(),
    }).catch(() => {}),
  );

  return Response.json({ ok: status === 'ok', inserted, error: errorMsg });
}
