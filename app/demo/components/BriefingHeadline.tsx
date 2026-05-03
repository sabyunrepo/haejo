import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import type { BriefingSummary } from '@/lib/demo/ai/gemini';

const SENTIMENT_META: Record<
  BriefingSummary['sentiment'],
  { label: string; cls: string; Icon: typeof TrendingUp }
> = {
  positive: { label: '호조', cls: 'text-pos', Icon: TrendingUp },
  neutral: { label: '중립', cls: 'text-orange-soft', Icon: Minus },
  negative: { label: '약세', cls: 'text-neg', Icon: TrendingDown },
};

export function BriefingHeadline({
  headline,
  sentiment,
  summaryMd,
  generatedAt,
}: {
  headline: string;
  sentiment: BriefingSummary['sentiment'];
  summaryMd: string;
  generatedAt: string;
}) {
  const meta = SENTIMENT_META[sentiment] ?? SENTIMENT_META.neutral;
  const ts = new Date(generatedAt);
  const timeStr = ts.toLocaleString('ko-KR', {
    timeZone: 'Asia/Seoul',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <section className="card-data p-6 sm:p-8">
      <div className="flex items-center gap-2 text-[11px] font-mono text-muted-2 mb-3 uppercase tracking-wider">
        <span>BRIEFING</span>
        <span>·</span>
        <span>{timeStr} KST</span>
        <span className={`ml-auto flex items-center gap-1 ${meta.cls}`}>
          <meta.Icon className="w-3.5 h-3.5" />
          {meta.label}
        </span>
      </div>
      <h3 className="h-display text-xl sm:text-2xl mb-4 leading-snug text-white">
        {headline}
      </h3>
      <p className="text-sm sm:text-base leading-relaxed text-muted-2">
        {summaryMd}
      </p>
    </section>
  );
}
