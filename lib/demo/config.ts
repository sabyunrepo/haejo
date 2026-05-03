export const DEMO_CONFIG = {
  TICKERS: [
    { ticker: '005930.KS', name: '삼성전자', searchQuery: '삼성전자' },
    { ticker: '000660.KS', name: 'SK하이닉스', searchQuery: 'SK하이닉스' },
    { ticker: 'AAPL', name: 'Apple', searchQuery: '애플 주가' },
    { ticker: 'NVDA', name: 'NVIDIA', searchQuery: '엔비디아 주가' },
    { ticker: 'TSLA', name: 'Tesla', searchQuery: '테슬라 주가' },
  ],
  MAX_TICKERS: 3,
  USER_CACHE_TTL_MIN: 30,
  BRIEFING_CACHE_TTL_HOURS: 24,
  STEP_TIMEOUT_MS: 4000,
  GEMINI_TIMEOUT_MS: 9000,
  STOCK_QUOTE_TTL_MIN: 15,
  NEWS_SUMMARY_TTL_HOURS: 12,
} as const;
