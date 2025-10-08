import React from "react";

const loading = () => {
  return (
    <div className="p-6 bg-white">
      {[...Array(3)].map((_, idx) => (
        <div
          key={idx}
          className="flex flex-col sm:flex-row items-center gap-4 mb-4"
        >
          <div className="h-16 w-20 bg-gray-200 animate-pulse rounded" />
          <div className="flex-1 w-full space-y-2">
            <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
            <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default loading;
