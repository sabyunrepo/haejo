import { ArrowUpRight } from 'lucide-react';
import type { NewsItem } from '@/lib/demo/ext/gnews';

export function NewsSummaryCard({ item }: { item: NewsItem }) {
  const date = item.publishedAt ? new Date(item.publishedAt) : null;
  const dateStr =
    date && !Number.isNaN(date.getTime())
      ? date.toLocaleDateString('ko-KR', { month: '2-digit', day: '2-digit' })
      : '';

  return (
    <a
      href={item.link}
      target="_blank"
      rel="noopener noreferrer"
      className="card-soft p-4 flex flex-col gap-2 group arr-host"
    >
      <p className="h-card text-sm leading-snug line-clamp-3 flex-1">
        {item.title}
      </p>
      <div className="flex items-center justify-between text-xs text-muted mt-auto pt-1">
        <span className="truncate font-mono">{item.publisher || '뉴스'}</span>
        <span className="flex items-center gap-1 text-orange opacity-90">
          {dateStr}
          <ArrowUpRight className="w-3 h-3 arr-chev" />
        </span>
      </div>
    </a>
  );
}
