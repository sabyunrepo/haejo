import { TrendingUp, TrendingDown, Minus, ArrowUpRight, Eye } from 'lucide-react';
import type { StockSnapshot } from '@/lib/demo/ext/yahoo';
import type { NewsItem } from '@/lib/demo/ext/gnews';
import type { StockAnalysis } from '@/lib/demo/ai/gemini';

const TONE_META: Record<
  StockAnalysis['tone'],
  { label: string; cls: string; bg: string; Icon: typeof TrendingUp }
> = {
  positive: {
    label: '긍정 톤',
    cls: 'text-pos',
    bg: 'bg-mint',
    Icon: TrendingUp,
  },
  neutral: {
    label: '중립 톤',
    cls: 'text-fg-2',
    bg: 'bg-line-2',
    Icon: Minus,
  },
  negative: {
    label: '부정 톤',
    cls: 'text-neg',
    bg: 'bg-peach',
    Icon: TrendingDown,
  },
};

export function StockBriefingCard({
  stock,
  news,
  analysis,
}: {
  stock: StockSnapshot;
  news: NewsItem[];
  analysis: StockAnalysis;
}) {
  const positive = (stock.change_pct ?? 0) >= 0;
  const changeStr =
    stock.change_pct == null
      ? '-'
      : `${positive ? '+' : ''}${stock.change_pct.toFixed(2)}%`;
  const priceStr =
    stock.price == null
      ? '—'
      : stock.price >= 1000
        ? stock.price.toLocaleString()
        : stock.price.toFixed(2);

  const tone = TONE_META[analysis.tone] ?? TONE_META.neutral;

  return (
    <article className="card-soft p-5 sm:p-6 flex flex-col gap-5">
      {/* 헤더: 종목명 + 시세 */}
      <header className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <div className="font-mono text-[11px] text-muted">{stock.ticker}</div>
          <div className="h-card text-[17px] truncate">{stock.name}</div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-mono text-lg leading-tight">
            {priceStr}
            <span className="text-[11px] text-muted ml-1 font-sans">
              {stock.currency ?? ''}
            </span>
          </div>
          <div
            className={`font-mono text-xs ${positive ? 'text-pos' : 'text-neg'}`}
          >
            {changeStr}
          </div>
        </div>
      </header>

      {/* AI 톤 라벨 */}
      <div
        className={`inline-flex items-center gap-1.5 self-start px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${tone.cls} ${tone.bg}`}
      >
        <tone.Icon className="w-3 h-3" />
        AI 분석: {tone.label}
      </div>

      {/* 핵심 헤드라인 */}
      <div>
        <div className="text-[11px] font-mono text-muted uppercase tracking-wider mb-2">
          오늘의 핵심
        </div>
        <ul className="flex flex-col gap-1.5">
          {analysis.key_points.map((pt, i) => (
            <li key={i} className="flex items-start gap-2 text-[14px] leading-snug">
              <span className="text-orange shrink-0 mt-1">·</span>
              <span>{pt}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 시장이 주목하는 포인트 */}
      <div className="flex items-start gap-2 bg-cream rounded-xl px-3 py-2.5 border border-line">
        <Eye className="w-3.5 h-3.5 mt-0.5 text-orange shrink-0" />
        <div>
          <div className="text-[11px] font-mono text-muted uppercase tracking-wider mb-0.5">
            시장이 주목하는 포인트
          </div>
          <p className="text-[13px] text-fg-2 leading-snug">
            {analysis.watch_for}
          </p>
        </div>
      </div>

      {/* 원문 뉴스 링크 (최대 3건) */}
      {news.length > 0 && (
        <div className="border-t border-line pt-4">
          <div className="text-[11px] font-mono text-muted uppercase tracking-wider mb-2">
            관련 뉴스
          </div>
          <ul className="flex flex-col gap-1.5">
            {news.slice(0, 3).map((it, i) => (
              <li key={i}>
                <a
                  href={it.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-1.5 text-[13px] text-fg-3 hover:text-orange transition leading-snug group"
                >
                  <ArrowUpRight className="w-3 h-3 mt-1 shrink-0 arr-chev" />
                  <span className="line-clamp-2">{it.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </article>
  );
}
