import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';
import type { StockSnapshot } from '@/lib/demo/ext/yahoo';
import type { NewsItem } from '@/lib/demo/ext/gnews';

export type BriefingSummary = {
  headline: string;
  summary_md: string;
  sentiment: 'positive' | 'neutral' | 'negative';
};

export async function summarizeBriefing(input: {
  stocks: StockSnapshot[];
  newsByKeyword: Record<string, NewsItem[]>;
}): Promise<BriefingSummary> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('AI-ERR-EXT-012: missing GEMINI_API_KEY');
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const model = genAI.getGenerativeModel({
    model: 'gemini-flash-latest',
    generationConfig: {
      responseMimeType: 'application/json',
      responseSchema: {
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
      maxOutputTokens: 1024,
      temperature: 0.4,
    },
  });

  const stocksLine = input.stocks
    .map((s) => {
      const change = s.change_pct == null ? 'N/A' : `${s.change_pct.toFixed(2)}%`;
      return `- ${s.name}(${s.ticker}): ${s.price ?? 'N/A'} ${s.currency ?? ''} (전일 대비 ${change})`;
    })
    .join('\n');

  const newsLine = Object.entries(input.newsByKeyword)
    .map(([kw, items]) => {
      const heads = items
        .slice(0, 3)
        .map((it) => `  - ${it.title}`)
        .join('\n');
      return `[${kw}]\n${heads}`;
    })
    .join('\n\n');

  const prompt = `너는 한국 직장인을 위한 AI 마켓 큐레이터다.
입력 데이터를 바탕으로 오늘의 한국어 마켓 브리핑을 JSON으로 작성해.

[주식 시세]
${stocksLine}

[키워드별 뉴스 헤드라인]
${newsLine}

[출력 JSON 형식]
{
  "headline": "한 줄 요약 (35자 이내, 시장 분위기를 자연스럽게)",
  "summary_md": "마크다운 요약 (300자 이내, 한국 직장인 관점)",
  "sentiment": "positive | neutral | negative 중 하나"
}

JSON만 반환해.`;

  const result = await model.generateContent(prompt);
  const response = result.response;
  const finishReason = response.candidates?.[0]?.finishReason ?? '?';
  const usage = response.usageMetadata;
  const text = response.text();
  const cleaned = text.replace(/^```(?:json)?\s*/, '').replace(/\s*```$/, '').trim();

  try {
    return JSON.parse(cleaned) as BriefingSummary;
  } catch (e) {
    const preview = cleaned.slice(0, 400).replace(/\s+/g, ' ');
    throw new Error(
      `gemini parse fail [finish=${finishReason} prompt=${usage?.promptTokenCount} out=${usage?.candidatesTokenCount} total=${usage?.totalTokenCount}] err=${e instanceof Error ? e.message : String(e)} | raw="${preview}"`,
    );
  }
}
