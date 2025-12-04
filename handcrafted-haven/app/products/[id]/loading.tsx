export default function LoadingSellerPage() {
  return (
    <div className="animate-pulse space-y-10">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gray-300" />

        <div className="flex-1 space-y-3">
          <div className="w-48 h-6 bg-gray-300 rounded" />
          <div className="w-32 h-4 bg-gray-300 rounded" />
          <div className="w-80 h-20 bg-gray-300 rounded mt-4" />
        </div>
      </div>

      <div>
        <div className="w-64 h-6 bg-gray-300 rounded mb-4" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-64 bg-gray-300 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}
