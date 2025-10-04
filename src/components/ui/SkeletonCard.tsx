"use client";

import {
  Card as NextCard,
  CardHeader,
  CardBody,
  CardFooter,
} from "@heroui/card";
import { Skeleton } from "@heroui/skeleton";
import React from "react";

const SkeletonCard = () => {
  return (
    <div className="relative md:w-full p-1">
      <NextCard isHoverable className="p-1 max-w-2xl lg:p-3 h-auto shadow-lg">
        {/* Image */}
        <div className="relative flex items-center h-32 md:h-56">
          <Skeleton className="rounded-t-lg mx-auto h-[90px] sm:h-full sm:w-[220px] md:h-[140px] w-[140px]" />
        </div>

        {/* Compare Icon */}
        <div className="absolute top-0 left-1 p-1">
          <Skeleton className="h-6 w-6 rounded-full" />
        </div>

        {/* Card Header */}
        <CardHeader className="md:h-full p-2 md:p-1">
          <Skeleton className="h-5 w-32 rounded" />
        </CardHeader>

        {/* Card Body */}
        <CardBody className="h-3/4 p-2 md:p-1">
          <div className="flex flex-col md:gap-2">
            <div className="flex items-center space-x-2">
              <Skeleton className="h-4 w-20 rounded" />
            </div>
          </div>
        </CardBody>

        {/* Card Footer */}
        <CardFooter className="p-1 sm:flex md:gap-3 sm:justify-between md:flex 2xl:flex 2xl:justify-between gap-2 md:justify-between">
          <Skeleton className="h-8 w-24 rounded-sm md:hidden" />
          <Skeleton className="h-8 w-32 rounded-sm hidden md:block" />
          <Skeleton className="h-6 w-16 rounded" />
        </CardFooter>
      </NextCard>
    </div>
  );
};

export default SkeletonCard;
