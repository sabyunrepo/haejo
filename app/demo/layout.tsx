import type { Metadata } from 'next';
import { DemoHeader } from './components/DemoHeader';
import { DemoBanner } from './components/DemoBanner';

export const metadata: Metadata = {
  title: 'AI-Market-Curator — 변상훈 AI 부트캠프 결과물 미리 보기',
  description:
    '강의에서 함께 만드는 AI 마켓 큐레이터의 라이브 데모입니다. 매일 아침 7시(KST) 자동 갱신.',
};

export default function DemoLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream">
      <DemoHeader />
      <DemoBanner />
      <main
        className="mx-auto px-4 sm:px-6 pt-6 pb-24"
        style={{ maxWidth: 'var(--container-content)' }}
      >
        {children}
      </main>
    </div>
  );
}
