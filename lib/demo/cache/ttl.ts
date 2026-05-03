export function ttl(minutes: number): Date {
  return new Date(Date.now() + minutes * 60 * 1000);
}

export function todayKstDate(): string {
  const now = new Date();
  const kstOffsetMs = 9 * 60 * 60 * 1000;
  const kst = new Date(now.getTime() + kstOffsetMs);
  return kst.toISOString().split('T')[0];
}
