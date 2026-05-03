import { XMLParser } from 'fast-xml-parser';

const parser = new XMLParser({ ignoreAttributes: false });

export type NewsItem = {
  title: string;
  link: string;
  publisher: string;
  publishedAt: string;
};

export async function fetchNewsByKeyword(keyword: string): Promise<NewsItem[]> {
  const url = `https://news.google.com/rss/search?q=${encodeURIComponent(
    keyword,
  )}&hl=ko&gl=KR&ceid=KR:ko`;

  const res = await fetch(url, {
    headers: {
      'User-Agent':
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36',
    },
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error(`gnews http ${res.status}`);
  }

  const xml = await res.text();
  const parsed = parser.parse(xml) as {
    rss?: { channel?: { item?: unknown } };
  };

  const raw = parsed?.rss?.channel?.item ?? [];
  const items = Array.isArray(raw) ? raw : [raw];

  return items.slice(0, 5).map((it) => {
    const obj = it as Record<string, unknown>;
    const source = obj.source as { '#text'?: string } | undefined;
    return {
      title: String(obj.title ?? ''),
      link: String(obj.link ?? ''),
      publisher: source?.['#text'] ?? '',
      publishedAt: String(obj.pubDate ?? ''),
    };
  });
}
