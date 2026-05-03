import { Info } from 'lucide-react';

export function Disclaimer() {
  return (
    <div className="flex items-start gap-2 text-[12px] text-muted leading-relaxed bg-line-2/50 rounded-2xl px-4 py-3 border border-line">
      <Info className="w-3.5 h-3.5 mt-0.5 shrink-0 text-muted" />
      <span>
        이 화면의 모든 분석·전망·톤 라벨은 <b className="font-semibold">AI(Gemini)가 자동 생성한 참고용 정보</b>입니다.
        매수·매도 등 투자 권유가 아니며, 실제 투자 판단은 본인의 책임입니다.
      </span>
    </div>
  );
}
