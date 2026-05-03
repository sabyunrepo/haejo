'use client';

import { ErrorState } from './components/ErrorState';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <ErrorState
      code="SYS-ERR-FE-001"
      message="데모를 불러오는 중 문제가 발생했어요."
      onRetry={reset}
    />
  );
}
