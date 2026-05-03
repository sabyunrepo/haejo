'use client';

import Link from 'next/link';
import { ArrowLeft, LogIn } from 'lucide-react';

export function DemoHeader() {
  return (
    <header className="border-b border-line bg-bg">
      <div
        className="mx-auto flex items-center justify-between px-4 sm:px-6 py-4"
        style={{ maxWidth: 'var(--container-content)' }}
      >
        <Link
          href="/#build"
          className="nav-link flex items-center gap-1.5 text-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          강의로 돌아가기
        </Link>
        <div className="h-card text-sm sm:text-base">
          <span className="text-fg">AI-Market-Curator</span>
          <span className="text-muted ml-2 font-mono text-[11px]">
            live demo
          </span>
        </div>
        <button
          type="button"
          disabled
          aria-disabled="true"
          className="text-sm text-muted-2 cursor-not-allowed flex items-center gap-1.5"
          title="로그인은 다음 업데이트에서 제공됩니다"
        >
          <LogIn className="w-4 h-4" />
          <span className="hidden sm:inline">로그인</span>
        </button>
      </div>
    </header>
  );
}
