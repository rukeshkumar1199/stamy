export default function EnquirySkeleton() {
  return (
    <section className="py-15 bg-black text-white animate-pulse">
      <div className="max-w-6xl mx-auto px-6 text-center">
        {/* Heading Skeleton */}
        <div className="mb-12 flex flex-col items-center gap-4">
          <div className="h-8 w-96 bg-gray-700 rounded"></div>
          <div className="h-[2px] w-24 bg-gray-600 rounded"></div>
        </div>

        {/* Paragraph Skeleton */}
        <div className="mb-20 space-y-3 max-w-3xl mx-auto">
          <div className="h-4 bg-gray-800 rounded"></div>
          <div className="h-4 bg-gray-800 rounded"></div>
          <div className="h-4 bg-gray-800 rounded w-3/4 mx-auto"></div>
        </div>

        {/* Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-14">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="
                relative h-[310px]
                bg-gray-800
                border border-yellow-400/20
                overflow-hidden
                rounded
              "
            >
              {/* Image placeholder */}
              <div className="absolute inset-0 bg-gray-700"></div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

              {/* Button placeholder */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
                <div className="h-8 w-32 bg-gray-600 rounded-full"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
