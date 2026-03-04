"use client";

interface SkeletonCardProps {
  className?: string;
}

export function SkeletonCard({ className = "" }: SkeletonCardProps) {
  return (
    <div className={`card overflow-hidden ${className}`}>
      <div className="aspect-square skeleton" />
      <div className="p-4 space-y-3">
        <div className="flex justify-between">
          <div className="skeleton h-3 w-20" />
          <div className="skeleton h-3 w-12" />
        </div>
        <div className="skeleton h-5 w-3/4" />
        <div className="flex justify-between items-center pt-2">
          <div className="space-y-1">
            <div className="skeleton h-3 w-16" />
            <div className="skeleton h-5 w-20" />
          </div>
          <div className="skeleton h-9 w-16 rounded-full" />
        </div>
      </div>
    </div>
  );
}

interface SkeletonLoaderProps {
  count?: number;
}

export default function SkeletonLoader({ count = 4 }: SkeletonLoaderProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
