import { verifyCronSecret } from '@/lib/demo/utils/auth';
import { createServiceRoleClient } from '@/lib/demo/db/server';
import { summarizeBriefing } from '@/lib/demo/ai/gemini';
import type { StockSnapshot } from '@/lib/demo/ext/yahoo';
import type { NewsItem } from '@/lib/demo/ext/gnews';
import { withTimeout } from '@/lib/demo/utils/timeout';
import { ttl, todayKstDate } from '@/lib/demo/cache/ttl';
import { DEMO_CONFIG } from '@/lib/demo/config';

export const runtime = 'nodejs';
export const maxDuration = 10;
export const dynamic = 'force-dynamic';

const PG_UNIQUE_VIOLATION = '23505';

export async function POST(req: Request) {
  const auth = verifyCronSecret(req);
  if (!auth.ok) return new Response('Unauthorized', { status: auth.status });

  const supabase = createServiceRoleClient();
  const date = todayKstDate();
  const startedAt = Date.now();

  // 1. 두 fetcher가 모두 끝났는지 확인
  const nowIso = new Date().toISOString();
  const [stocksRes, newsRes] = await Promise.all([
    supabase
      .from('stock_quote')
      .select('ticker, price, change_pct, currency, captured_at, expires_at')
      .gt('expires_at', nowIso)
      .order('captured_at', { ascending: false }),
    supabase
      .from('news_summary')
      .select('keyword, payload')
      .eq('date', date)
      .eq('locale', 'ko-KR'),
  ]);

  const freshStocks = dedupeLatestByTicker(stocksRes.data ?? []);
  const newsRows = newsRes.data ?? [];

  if (
    freshStocks.length < DEMO_CONFIG.TICKERS.length ||
    newsRows.length < DEMO_CONFIG.KEYWORDS.length
  ) {
    return Response.json({
      skipped: 'incomplete',
      stocks: freshStocks.length,
      news: newsRows.length,
    });
  }

  // 2. stale lock(만료된 'processing'/'failed' row) 자동 정리
  await supabase
    .from('briefing_cache')
    .delete()
    .eq('date', date)
    .eq('locale', 'ko-KR')
    .lt('expires_at', new Date().toISOString());

  // 3. briefing_cache 잠금: partial INSERT, conflict 시 다른 호출이 처리 중
  const expiresAt = ttl(DEMO_CONFIG.BRIEFING_CACHE_TTL_HOURS * 60).toISOString();
  const claim = await supabase.from('briefing_cache').insert({
    date,
    locale: 'ko-KR',
    payload: { status: 'processing' },
    expires_at: expiresAt,
  });

  if (claim.error) {
    if (claim.error.code === PG_UNIQUE_VIOLATION) {
      return Response.json({ skipped: 'in_progress_or_done' });
    }
    await supabase.from('fetch_log').insert({
      source: 'summarize',
      status: 'error',
      latency_ms: Date.now() - startedAt,
      error: `SYS-ERR-DB-001: ${claim.error.message}`,
    });
    return new Response('Internal Error', { status: 500 });
  }

  // 3. Gemini 요약
  let status: 'ok' | 'error' = 'ok';
  let errorMsg: string | null = null;

  try {
    const stocks: StockSnapshot[] = freshStocks.map((q) => ({
      ticker: q.ticker,
      name:
        DEMO_CONFIG.TICKERS.find((t) => t.ticker === q.ticker)?.name ??
        q.ticker,
      price: q.price,
      change_pct: q.change_pct,
      currency: q.currency,
    }));

    const newsByKeyword: Record<string, NewsItem[]> = {};
    for (const row of newsRows) {
      const items = (row.payload as { items?: NewsItem[] })?.items ?? [];
      newsByKeyword[row.keyword] = items;
    }

    const summary = await withTimeout(
      summarizeBriefing({ stocks, newsByKeyword }),
      DEMO_CONFIG.GEMINI_TIMEOUT_MS,
      'gemini',
    );

    await supabase
      .from('briefing_cache')
      .update({
        payload: { stocks, newsByKeyword, summary },
        generated_at: new Date().toISOString(),
        expires_at: expiresAt,
      })
      .eq('date', date)
      .eq('locale', 'ko-KR');
  } catch (e) {
    status = 'error';
    errorMsg = `AI-ERR-EXT-012: ${e instanceof Error ? e.message : String(e)}`;
    // 잠금 5분으로 단축 → 다음 호출이 재시도 가능
    const retryExpires = new Date(Date.now() + 5 * 60 * 1000).toISOString();
    await supabase
      .from('briefing_cache')
      .update({
        payload: { status: 'failed', error: errorMsg },
        expires_at: retryExpires,
      })
      .eq('date', date)
      .eq('locale', 'ko-KR');
  }

  await supabase.from('fetch_log').insert({
    source: 'summarize',
    status,
    latency_ms: Date.now() - startedAt,
    error: errorMsg,
  });

  return Response.json({ ok: status === 'ok', error: errorMsg });
}

type StockRow = {
  ticker: string;
  price: number | null;
  change_pct: number | null;
  currency: string | null;
  captured_at: string;
};

function dedupeLatestByTicker(rows: StockRow[]): StockRow[] {
  const map = new Map<string, StockRow>();
  for (const r of rows) {
    if (!map.has(r.ticker)) map.set(r.ticker, r);
  }
  return Array.from(map.values());
}
