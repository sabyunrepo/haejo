export function SkeletonCard({ lines = 3 }: { lines?: number }) {
  return (
    <div className="card-soft p-4 flex flex-col gap-2">
      <div className="skeleton h-3 w-1/3 mb-2" />
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="skeleton h-3"
          style={{ width: `${100 - i * 10}%` }}
        />
      ))}
    </div>
  );
}
