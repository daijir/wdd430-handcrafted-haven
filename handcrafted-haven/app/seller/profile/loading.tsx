export default function LoadingEditProfile() {
  return (
    <div className="animate-pulse space-y-8 max-w-2xl mx-auto">
      <div className="w-64 h-8 bg-gray-300 rounded" />

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="w-32 h-4 bg-gray-300 rounded" />
          <div className="w-full h-10 bg-gray-300 rounded" />
        </div>

        <div className="space-y-2">
          <div className="w-24 h-4 bg-gray-300 rounded" />
          <div className="w-full h-10 bg-gray-300 rounded" />
        </div>

        <div className="space-y-2">
          <div className="w-16 h-4 bg-gray-300 rounded" />
          <div className="w-full h-20 bg-gray-300 rounded" />
        </div>

        <div className="space-y-2">
          <div className="w-48 h-4 bg-gray-300 rounded" />
          <div className="w-24 h-24 bg-gray-300 rounded-full" />
        </div>

        <div className="w-32 h-10 bg-gray-300 rounded" />
      </div>
    </div>
  );
}
