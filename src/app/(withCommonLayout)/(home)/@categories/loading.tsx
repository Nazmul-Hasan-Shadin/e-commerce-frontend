'use client'
import SkeletonCard from "@/src/components/ui/SkeletonCard";



export default function Loading() {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4 gap-4 p-4">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam vitae, cum voluptatibus a eum rem vero. Quibusdam repudiandae molestiae expedita in ipsum veniam, minus cumque labore. Iure aliquid doloribus commodi?
      {Array.from({ length: 8 }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
