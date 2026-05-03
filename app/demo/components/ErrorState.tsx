'use client';

import { AlertTriangle } from 'lucide-react';

export function ErrorState({
  code,
  message,
  onRetry,
}: {
  code?: string;
  message: string;
  onRetry?: () => void;
}) {
  return (
    <div className="card-soft p-8 flex flex-col items-center text-center gap-3">
      <AlertTriangle className="w-8 h-8 text-orange" />
      <p className="h-card text-base">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="btn-ghost-light !py-2 !px-4 !text-sm"
        >
          다시 시도
        </button>
      )}
      {code && (
        <button
          type="button"
          onClick={() => {
            if (typeof navigator !== 'undefined' && navigator.clipboard) {
              navigator.clipboard.writeText(code).catch(() => {});
            }
          }}
          className="font-mono text-[11px] text-muted hover:text-fg-3 transition"
          title="클릭해서 복사"
        >
          {code}
        </button>
      )}
    </div>
  );
}
