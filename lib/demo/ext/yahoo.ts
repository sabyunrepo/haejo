import YahooFinance from 'yahoo-finance2';
import type { Quote } from 'yahoo-finance2/modules/quote';
import { DEMO_CONFIG } from '@/lib/demo/config';

type YahooClient = InstanceType<typeof YahooFinance>;
let cached: YahooClient | null = null;
function getClient(): YahooClient {
  if (cached) return cached;
  cached = new YahooFinance({ suppressNotices: ['yahooSurvey', 'ripHistorical'] });
  return cached;
}

export type StockSnapshot = {
  ticker: string;
  name: string;
  price: number | null;
  change_pct: number | null;
  currency: string | null;
};

export async function fetchStocks(): Promise<StockSnapshot[]> {
  const tickers: string[] = DEMO_CONFIG.TICKERS.map((t) => t.ticker);
  const quotes = (await getClient().quote(tickers)) as Quote[];

  return quotes.map((q) => {
    const meta = DEMO_CONFIG.TICKERS.find((t) => t.ticker === q.symbol);
    return {
      ticker: q.symbol,
      name: meta?.name ?? q.symbol,
      price: q.regularMarketPrice ?? null,
      change_pct: q.regularMarketChangePercent ?? null,
      currency: q.currency ?? null,
    };
  });
}
