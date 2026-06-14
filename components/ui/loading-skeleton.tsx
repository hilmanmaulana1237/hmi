type LoadingSkeletonProps = {
  rows?: number;
};

export function LoadingSkeleton({ rows = 3 }: LoadingSkeletonProps) {
  return (
    <div className="grid gap-4" aria-label="Memuat konten">
      {Array.from({ length: rows }, (_, index) => (
        <div
          key={index}
          className="h-24 animate-pulse rounded-2xl bg-[#EAF2EE]"
        />
      ))}
    </div>
  );
}
