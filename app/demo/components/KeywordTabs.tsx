'use client';

import { useState } from 'react';
import type { NewsItem } from '@/lib/demo/ext/gnews';
import { NewsSummaryCard } from './NewsSummaryCard';

export function KeywordTabs({
  newsByKeyword,
}: {
  newsByKeyword: Record<string, NewsItem[]>;
}) {
  const keywords = Object.keys(newsByKeyword);
  const [active, setActive] = useState(keywords[0] ?? '');

  if (!keywords.length) {
    return (
      <p className="text-sm text-muted">키워드별 뉴스가 아직 없습니다.</p>
    );
  }

  const items = newsByKeyword[active] ?? [];

  return (
    <div>
      <div
        role="tablist"
        className="flex gap-2 overflow-x-auto pb-3 -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {keywords.map((kw) => {
          const isActive = kw === active;
          return (
            <button
              key={kw}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActive(kw)}
              className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition ${
                isActive
                  ? 'bg-fg text-white'
                  : 'bg-bg border border-line text-fg-3 hover:border-orange-soft hover:text-orange'
              }`}
            >
              #{kw}
            </button>
          );
        })}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
        {items.slice(0, 6).map((it, i) => (
          <NewsSummaryCard key={`${active}-${i}`} item={it} />
        ))}
      </div>
    </div>
  );
}
