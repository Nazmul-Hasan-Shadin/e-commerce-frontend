"use client";

export default function Loading() {
  return (
    <div className="p-6 space-y-6 animate-pulse">

      {/* Header */}
      <div className="h-6 w-40 bg-gray-300 rounded"></div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="h-24 bg-gray-300 rounded-lg"></div>
        <div className="h-24 bg-gray-300 rounded-lg"></div>
        <div className="h-24 bg-gray-300 rounded-lg"></div>
      </div>

      {/* Table */}
      <div className="space-y-3">
        {[1, 2, 3, 4].map((_, i) => (
          <div key={i} className="h-12 bg-gray-200 rounded"></div>
        ))}
      </div>

    </div>
  );
}