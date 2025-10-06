"use client";

import Container from "@/src/components/ui/Container";
import { HomeTitle } from "@/src/components/ui/HomeTitle";
import SkeletonCard from "@/src/components/ui/SkeletonCard";

const PopularProductLoading = () => {
  return (
    <Container className="px-1 sm:my-10 md:px-0">
      <div>
        {/* Section Title Skeleton */}
        <div className="h-6 w-40 rounded mb-4 bg-gray-200 animate-pulse" />
        <HomeTitle title="Popular Product" />

        {/* Product Grid Skeleton */}
        <div className="grid grid-cols-2 gap-2 mt-10 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-10 p-1 md:p-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    </Container>
  );
};

export default PopularProductLoading;
