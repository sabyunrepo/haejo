import { Newspaper } from 'lucide-react';
import { readPublicBriefing } from './lib/briefing';
import { MarketQuickView } from './components/MarketQuickView';
import { BriefingHeadline } from './components/BriefingHeadline';
import { KeywordTabs } from './components/KeywordTabs';

export const revalidate = 60;

export default async function DemoPage() {
  const briefing = await readPublicBriefing();

  if (briefing.status !== 'ready') {
    return <EmptyState status={briefing.status} />;
  }

  const { payload, generatedAt } = briefing;

  return (
    <div className="flex flex-col gap-8">
      <MarketQuickView stocks={payload.stocks} />
      <BriefingHeadline
        headline={payload.summary.headline}
        sentiment={payload.summary.sentiment}
        summaryMd={payload.summary.summary_md}
        generatedAt={generatedAt}
      />
      <section>
        <h2 className="h-card text-xl sm:text-2xl mb-4 flex items-center gap-2">
          <Newspaper className="w-5 h-5" />
          키워드별 핵심 뉴스
        </h2>
        <KeywordTabs newsByKeyword={payload.newsByKeyword} />
      </section>
    </div>
  );
}

const EMPTY_MESSAGES = {
  empty: {
    title: '오늘 브리핑이 아직 준비되지 않았어요.',
    body: '매일 오전 7시(KST)에 새로운 브리핑이 올라옵니다.',
  },
  processing: {
    title: '브리핑을 만들고 있어요.',
    body: '잠시 후 새로고침해 주세요. (보통 1분 이내)',
  },
  failed: {
    title: '브리핑 생성에 실패했어요.',
    body: '곧 다시 시도합니다. 새로고침해 주세요.',
  },
} as const;

function EmptyState({ status }: { status: 'empty' | 'processing' | 'failed' }) {
  const { title, body } = EMPTY_MESSAGES[status];
  return (
    <div className="card-soft p-12 text-center">
      <p className="h-card text-xl mb-2">{title}</p>
      <p className="text-fg-3">{body}</p>
    </div>
  );
}
