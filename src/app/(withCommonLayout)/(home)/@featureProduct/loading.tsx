"use client";

import SkeletonCard from "@/src/components/ui/SkeletonCard";

export default function Loading() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      lo
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
