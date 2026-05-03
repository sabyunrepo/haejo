import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import type { StockSnapshot } from '@/lib/demo/ext/yahoo';
import type { NewsItem } from '@/lib/demo/ext/gnews';

export type StockAnalysis = {
  ticker: string;
  tone: 'positive' | 'neutral' | 'negative';
  key_points: string[];
  watch_for: string;
};

export type MarketOverview = {
  headline: string;
  summary_md: string;
  sentiment: 'positive' | 'neutral' | 'negative';
};

export type BriefingSummary = {
  market_overview: MarketOverview;
  stock_briefings: StockAnalysis[];
};

export async function summarizeBriefing(input: {
  stocks: StockSnapshot[];
  newsByTicker: Record<string, NewsItem[]>;
}): Promise<BriefingSummary> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('AI-ERR-EXT-012: missing GEMINI_API_KEY');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-2.5-flash-lite',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
        type: SchemaType.OBJECT,
        properties: {
          market_overview: {
            type: SchemaType.OBJECT,
            properties: {
              headline: { type: SchemaType.STRING },
              summary_md: { type: SchemaType.STRING },
              sentiment: {
                type: SchemaType.STRING,
                format: 'enum',
                enum: ['positive', 'neutral', 'negative'],
              },
            },
            required: ['headline', 'summary_md', 'sentiment'],
          },
          stock_briefings: {
            type: SchemaType.ARRAY,
            items: {
              type: SchemaType.OBJECT,
              properties: {
                ticker: { type: SchemaType.STRING },
                tone: {
                  type: SchemaType.STRING,
                  format: 'enum',
                  enum: ['positive', 'neutral', 'negative'],
                },
                key_points: {
                  type: SchemaType.ARRAY,
                  items: { type: SchemaType.STRING },
                },
                watch_for: { type: SchemaType.STRING },
              },
              required: ['ticker', 'tone', 'key_points', 'watch_for'],
            },
          },
        },
        required: ['market_overview', 'stock_briefings'],
      },
      maxOutputTokens: 1536,
      temperature: 0.3,
    },
  });

  const stocksLine = input.stocks
    .map((s) => {
      const change =
        s.change_pct == null ? 'N/A' : `${s.change_pct.toFixed(2)}%`;
      return `- ${s.name}(${s.ticker}): ${s.price ?? 'N/A'} ${s.currency ?? ''} (전일 대비 ${change})`;
    })
    .join('\n');

  const newsByTickerLine = Object.entries(input.newsByTicker)
    .map(([ticker, items]) => {
      const heads = items
        .slice(0, 2)
        .map((it) => `  - ${it.title}`)
        .join('\n');
      return `[${ticker}]\n${heads}`;
    })
    .join('\n\n');

  const tickerList = input.stocks.map((s) => s.ticker).join(', ');

  const prompt = `너는 한국 직장인을 위한 AI 마켓 큐레이터다.
입력된 주식 시세와 종목별 뉴스를 바탕으로 오늘의 한국어 마켓 브리핑을 JSON으로 작성해.

[주식 시세]
${stocksLine}

[종목별 뉴스 헤드라인]
${newsByTickerLine}

[작성 규칙]
- "market_overview": 한 줄 (35자 이내) + 본문 (250자 이내) + sentiment
- "stock_briefings": 입력된 모든 종목(${tickerList})에 대해 각각 1개씩 작성
  - "tone": positive | neutral | negative (AI 톤 분석, 매수/매도 추천 아님)
  - "key_points": 핵심 헤드라인 1개만 (25자 이내, 배열에 1개 항목)
  - "watch_for": 시장이 주목하는 포인트 1줄 (25자 이내)
- 절대 "매수", "매도", "추천", "권유" 같은 직접 투자 권유 어휘 사용 금지
- 한국 직장인 관점, 간결하게

JSON만 반환해.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const finishReason = response.candidates?.[0]?.finishReason ?? '?';
  const usage = response.usageMetadata;
  const text = response.text();
  const cleaned = text
    .replace(/^```(?:json)?\s*/, '')
    .replace(/\s*```$/, '')
    .trim();

  try {
    return JSON.parse(cleaned) as BriefingSummary;
  } catch (e) {
    const preview = cleaned.slice(0, 400).replace(/\s+/g, ' ');
    throw new Error(
      `gemini parse fail [finish=${finishReason} prompt=${usage?.promptTokenCount} out=${usage?.candidatesTokenCount} total=${usage?.totalTokenCount}] err=${e instanceof Error ? e.message : String(e)} | raw="${preview}"`,
    );
  }
}
