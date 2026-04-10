export default function EventCardSkeletonLoader() {
  return (
    <div className="w-full max-w-[280px] bg-white rounded overflow-hidden shadow">
      {/* Image Skeleton */}
      <div className="w-full aspect-[4/5] shimmer" />

      {/* Text Skeleton */}
      <div className="p-4 space-y-3">
        <div className="h-4 rounded shimmer w-3/4" />
        <div className="h-3 rounded shimmer w-1/2" />
      </div>
    </div>
  );
}
