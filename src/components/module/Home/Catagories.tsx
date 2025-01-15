"use client";
import { useState, useEffect } from "react";
import { TCategory } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import SkeletonCard from "../../ui/SkeletonCard";
import Container from "../../ui/Container";

const Categories = () => {
  const [categories, setCategories] = useState<TCategory[] | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const result = await fetch(
          "https://e-commerce-inky-alpha.vercel.app/api/v1/category",
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
        console.error("Error fetching categories:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []); // Empty dependency array ensures this runs only once on mount

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!categories) {
    return <div>No categories found.</div>; // Handle the null case
  }

  return (
    <Container>
      <div className="w-full mt-[400px] md:my-20">
        <h3 className="text-2xl ml-10 md:ml-0 font-bold mb-1">
          Shop By Categories
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            categories.slice(1, 6).map((category: TCategory) => (
              <div key={category.id} className="flex flex-col items-center">
                <Link href={`/product?categoryName=${category.id}`}>
                  <Image
                    src={
                      category?.images ||
                      "https://via.placeholder.com/160x180?text=No+Image"
                    }
                    alt={`${category.name} image`}
                    width={160}
                    height={180}
                  />
                </Link>
                <h2 className="text-lg font-semibold">{category.name}</h2>
              </div>
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default Categories;
