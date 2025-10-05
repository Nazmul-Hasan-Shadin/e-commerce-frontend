"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { TCategory } from "@/src/types";
import Container from "@/src/components/ui/Container";
import { HomeTitle } from "@/src/components/ui/HomeTitle";
import SkeletonCard from "@/src/components/ui/SkeletonCard";
import { Skeleton } from "@heroui/react";
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const Categories = () => {
  const [categories, setCategories] = useState<TCategory[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // http://locahost:3001
  // https://independent-shop.vercel.app
  useEffect(() => {
    const fetchCategories = async () => {
      const randomDelay = Math.floor(Math.random() * 2000) + 1000;
      await delay(randomDelay);
      try {
        const result = await fetch(
          "https://independent-shop.vercel.app/api/v1/category",
          {
            cache: "no-store",
          }
        );

        if (!result.ok) {
          throw new Error(`HTTP error! status: ${result.status}`);
        }
        const categoryList = await result.json();

        setCategories(categoryList.data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (isLoading) {
    return (
      <div>
      <div className="h-6 w-40 rounded mb-4">
        <Skeleton />
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 mt-10 gap-1">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="flex justify-center items-center flex-col"
          >
            <Skeleton className="w-24 h-20 lg:w-[160px] lg:h-[180px] rounded-full" />
            <Skeleton className="mt-2 w-16 h-4 rounded" />
          </div>
        ))}
      </div>
    </div>
    );
  }

  return (
    <Container className="sm:my-10 lg:my-10 px-1 md:px-0 ">
      <div>
        <HomeTitle title="Categories" />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 mt-10 gap-1">
          {categories?.map((category: TCategory) => (
            <div
              key={category.id}
              className="flex  justify-center items-center  flex-col "
            >
              <Link href={`/product?categoryName=${category.id}`}>
                <Image
                  alt={`${category.name} image`}
                  className="w-24 h-20 lg:w-auto border rounded-full object-cover lg:h-[180px]"
                  height={180}
                  src={
                    category?.images ||
                    "https://via.placeholder.com/160x180?text=No+Image"
                  }
                  width={160}
                />
              </Link>
              <h2 className="text-[13px] md:text-lg font-medium md:font-semibold">
                {category.name}
              </h2>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Categories;
