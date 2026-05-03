import type { StockSnapshot } from '@/lib/demo/ext/yahoo';

export function TickerCard({ snap }: { snap: StockSnapshot }) {
  const { name, ticker, price, change_pct, currency } = snap;
  const positive = (change_pct ?? 0) >= 0;
  const changeStr =
    change_pct == null
      ? '-'
      : `${positive ? '+' : ''}${change_pct.toFixed(2)}%`;
  const priceStr =
    price == null
      ? '—'
      : price >= 1000
        ? price.toLocaleString()
        : price.toFixed(2);

  const ariaLabel = `${name} ${ticker}, ${priceStr} ${currency ?? ''}, ${changeStr}`;

  return (
    <div className="card-soft p-4 flex flex-col gap-1" aria-label={ariaLabel}>
      <div className="text-[11px] text-muted truncate font-mono" title={ticker}>
        {ticker}
      </div>
      <div className="h-card text-sm truncate">{name}</div>
      <div className="font-mono text-lg leading-tight mt-1">
        {priceStr}
        <span className="text-[11px] text-muted ml-1 font-sans">
          {currency ?? ''}
        </span>
      </div>
      <div
        className={`font-mono text-xs ${positive ? 'text-pos' : 'text-neg'}`}
      >
        {changeStr}
      </div>
    </div>
  );
}
