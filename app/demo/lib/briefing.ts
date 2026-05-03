import { createAnonClient } from '@/lib/demo/db/anon';
import type { StockSnapshot } from '@/lib/demo/ext/yahoo';
import type { NewsItem } from '@/lib/demo/ext/gnews';
import type { BriefingSummary } from '@/lib/demo/ai/gemini';

export type BriefingPayload = {
  stocks: StockSnapshot[];
  newsByTicker: Record<string, NewsItem[]>;
  summary: BriefingSummary;
};

export type CachedBriefing =
  | {
      status: 'ready';
      date: string;
      generatedAt: string;
      payload: BriefingPayload;
    }
  | {
      status: 'empty' | 'processing' | 'failed';
      date: string | null;
    };

export async function readPublicBriefing(): Promise<CachedBriefing> {
  const supabase = createAnonClient();
  const { data, error } = await supabase
    .from('briefing_cache')
    .select('date, generated_at, payload')
    .eq('locale', 'ko-KR')
    .order('date', { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error || !data) return { status: 'empty', date: null };

  const payload = data.payload as { status?: string; summary?: unknown };
  if (payload?.status === 'processing') {
    return { status: 'processing', date: data.date };
  }
  if (payload?.status === 'failed') {
    return { status: 'failed', date: data.date };
  }
  if (!payload?.summary) {
    return { status: 'empty', date: data.date };
  }

  return {
    status: 'ready',
    date: data.date,
    generatedAt: data.generated_at,
    payload: payload as unknown as BriefingPayload,
  };
}
