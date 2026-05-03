/**
 * 다음 부트캠프 주말(토·일)을 KST 기준으로 자동 계산.
 *
 * 정의: 일요일에 페이지를 보면 "다음 주 토·일"을 표시한다.
 *  - 평일 (월~금) → 이번 주 토 (1~5일 후)
 *  - 토요일       → 다음 주 토 (7일 후)
 *  - 일요일       → 다음 주 토 (6일 후)
 */
export type WeekendDate = { month: number; day: number };
export type BootcampWeekend = {
  saturday: WeekendDate;
  sunday: WeekendDate;
};

export function getNextBootcampWeekend(
  now: Date = new Date(),
): BootcampWeekend {
  const KST_OFFSET_MS = 9 * 60 * 60 * 1000;
  const kst = new Date(now.getTime() + KST_OFFSET_MS);
  const day = kst.getUTCDay(); // 0=일, 1=월, ..., 6=토

  const daysToSat =
    day === 0 ? 6 : day === 6 ? 7 : 6 - day;

  const sat = new Date(kst);
  sat.setUTCDate(sat.getUTCDate() + daysToSat);
  const sun = new Date(sat);
  sun.setUTCDate(sun.getUTCDate() + 1);

  return {
    saturday: { month: sat.getUTCMonth() + 1, day: sat.getUTCDate() },
    sunday: { month: sun.getUTCMonth() + 1, day: sun.getUTCDate() },
  };
}
