"use client";

import SkeletonCard from "@/src/components/ui/SkeletonCard";



export default function Loading() {
  return (
    <div className="grid text-black grid-cols-4 md:grid-cols-4 gap-4 p-4">
      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Omnis provident in, incidunt fugiat veritatis magnam dignissimos atque tempore ex nemo ullam eveniet eligendi deleniti ea hic nihil consequatur! Rerum, molestiae?
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
