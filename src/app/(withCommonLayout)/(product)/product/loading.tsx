import React from "react";

import SkeletonCard from "@/src/components/ui/SkeletonCard";
import Container from "@/src/components/ui/Container";

const Loading = () => {
  return (
    <Container className="mb-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <SkeletonCard key={index} />
        ))}
      </div>
    </Container>
  );
};

export default Loading;
