import type { StockSnapshot } from '@/lib/demo/ext/yahoo';
import type { NewsItem } from '@/lib/demo/ext/gnews';
import type { StockAnalysis } from '@/lib/demo/ai/gemini';
import { StockBriefingCard } from './StockBriefingCard';

export type BriefingItem = {
  stock: StockSnapshot;
  news: NewsItem[];
  analysis: StockAnalysis;
};

export function StockBriefingGrid({ items }: { items: BriefingItem[] }) {
  if (!items.length) {
    return <p className="text-sm text-muted">종목별 분석이 아직 없습니다.</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((it) => (
        <StockBriefingCard
          key={it.stock.ticker}
          stock={it.stock}
          news={it.news}
          analysis={it.analysis}
        />
      ))}
    </div>
  );
}
