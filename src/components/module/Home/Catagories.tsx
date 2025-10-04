"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import SkeletonCard from "../../ui/SkeletonCard";
import Container from "../../ui/Container";
import { HomeTitle } from "../../ui/HomeTitle";

import { TCategory } from "@/src/types";

const Categories = () => {
  const [categories, setCategories] = useState<TCategory[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // http://locahost:3001
  // https://independent-shop.vercel.app
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await fetch(
          "https://independent-shop.vercel.app/api/v1/category",
          {
            cache: "no-store",
          },
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

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!categories) {
    return <div>No categories found.</div>;
  }

  return (
    <Container className="sm:my-10 lg:my-10 px-1 md:px-0 ">
      <div>
        <HomeTitle title="Categories" />
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 mt-10 gap-1">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            categories.slice(1, 6).map((category: TCategory) => (
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
                <h2 className="text-lg font-medium md:font-semibold">
                  {category.name}
                </h2>
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default Categories;
