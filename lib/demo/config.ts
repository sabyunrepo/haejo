export const DEMO_CONFIG = {
  TICKERS: [
    { ticker: '005930.KS', name: '삼성전자' },
    { ticker: '000660.KS', name: 'SK하이닉스' },
    { ticker: 'AAPL', name: 'Apple' },
    { ticker: 'NVDA', name: 'NVIDIA' },
    { ticker: 'TSLA', name: 'Tesla' },
  ],
  KEYWORDS: ['반도체', 'AI', '금리', '전기차', '환율'],
  MAX_TICKERS: 3,
  MAX_KEYWORDS: 3,
  USER_CACHE_TTL_MIN: 30,
  BRIEFING_CACHE_TTL_HOURS: 24,
  STEP_TIMEOUT_MS: 4000,
  GEMINI_TIMEOUT_MS: 7000,
  STOCK_QUOTE_TTL_MIN: 15,
  NEWS_SUMMARY_TTL_HOURS: 12,
} as const;
