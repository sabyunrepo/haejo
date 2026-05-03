import { LineChart } from 'lucide-react';
import type { StockSnapshot } from '@/lib/demo/ext/yahoo';
import { TickerCard } from './TickerCard';

export function MarketQuickView({ stocks }: { stocks: StockSnapshot[] }) {
  return (
    <section>
      <h2 className="h-card text-xl sm:text-2xl mb-4 flex items-center gap-2">
        <LineChart className="w-5 h-5" />
        오늘의 마켓 퀵뷰
      </h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {stocks.map((s) => (
          <TickerCard key={s.ticker} snap={s} />
        ))}
      </div>
    </section>
  );
}
