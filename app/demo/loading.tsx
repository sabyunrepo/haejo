import { SkeletonCard } from './components/SkeletonCard';

export default function Loading() {
  return (
    <div className="flex flex-col gap-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} lines={2} />
        ))}
      </div>
      <div className="card-data p-8">
        <div className="skeleton h-3 w-32 mb-4" />
        <div className="skeleton h-6 w-3/4 mb-3" />
        <div className="skeleton h-3 w-2/3 mb-2" />
        <div className="skeleton h-3 w-1/2" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <SkeletonCard key={i} lines={4} />
        ))}
      </div>
    </div>
  );
}
