import Link from 'next/link';
import { Sparkles, ArrowUpRight } from 'lucide-react';

export function DemoBanner() {
  return (
    <div className="bg-cream border-b border-line">
      <div
        className="mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3 text-sm"
        style={{ maxWidth: 'var(--container-content)' }}
      >
        <span className="flex items-center gap-2 text-fg-3">
          <Sparkles className="w-4 h-4 text-orange shrink-0" />
          <span className="truncate">
            이 데모는 「변상훈 AI 부트캠프」에서 함께 만드는 결과물입니다.
          </span>
        </span>
        <Link
          href="/"
          className="nav-link flex items-center gap-1 shrink-0 text-sm"
        >
          강의 보기
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
