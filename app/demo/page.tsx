import { LineChart } from 'lucide-react';
import { readPublicBriefing } from './lib/briefing';
import { MarketQuickView } from './components/MarketQuickView';
import { BriefingHeadline } from './components/BriefingHeadline';
import {
  StockBriefingGrid,
  type BriefingItem,
} from './components/StockBriefingGrid';
import { Disclaimer } from './components/Disclaimer';

export const revalidate = 60;

export default async function DemoPage() {
  const briefing = await readPublicBriefing();

  if (briefing.status !== 'ready') {
    return <EmptyState status={briefing.status} />;
  }

  const { payload, generatedAt } = briefing;
  const { market_overview, stock_briefings } = payload.summary;

  // 종목별 데이터 통합 (시세 + 뉴스 + 분석)
  const items: BriefingItem[] = stock_briefings
    .map((analysis) => {
      const stock = payload.stocks.find((s) => s.ticker === analysis.ticker);
      const news = payload.newsByTicker[analysis.ticker] ?? [];
      return stock ? { stock, news, analysis } : null;
    })
    .filter((x): x is BriefingItem => x !== null);

  return (
    <div className="flex flex-col gap-8">
      <MarketQuickView stocks={payload.stocks} />
      <BriefingHeadline
        headline={market_overview.headline}
        sentiment={market_overview.sentiment}
        summaryMd={market_overview.summary_md}
        generatedAt={generatedAt}
      />
      <section>
        <h2 className="h-card text-xl sm:text-2xl mb-4 flex items-center gap-2">
          <LineChart className="w-5 h-5" />
          종목별 AI 분석
        </h2>
        <StockBriefingGrid items={items} />
      </section>
      <Disclaimer />
    </div>
  );
}

const EMPTY_MESSAGES = {
  empty: {
    title: '오늘 브리핑이 아직 준비되지 않았어요.',
    body: '매일 오전 7시(KST)에 새로운 브리핑이 올라옵니다.',
  },
  processing: {
    title: '브리핑을 만들고 있어요.',
    body: '잠시 후 새로고침해 주세요. (보통 1분 이내)',
  },
  failed: {
    title: '브리핑 생성에 실패했어요.',
    body: '곧 다시 시도합니다. 새로고침해 주세요.',
  },
} as const;

function EmptyState({ status }: { status: 'empty' | 'processing' | 'failed' }) {
  const { title, body } = EMPTY_MESSAGES[status];
  return (
    <div className="card-soft p-12 text-center">
      <p className="h-card text-xl mb-2">{title}</p>
      <p className="text-fg-3">{body}</p>
    </div>
  );
}
