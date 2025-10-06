"use client";
import Image from "next/image";
import Link from "next/link";

import { TCategory } from "@/src/types";
import Container from "@/src/components/ui/Container";
import { HomeTitle } from "@/src/components/ui/HomeTitle";

interface CategoriesProps {
  categories: TCategory[];
}

const Categories = ({ categories }: CategoriesProps) => {
  return (
    <Container className="sm:my-10 lg:my-10 px-1 md:px-0">
      <div>
        <HomeTitle title="Categories" />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-4 mt-10 gap-1">
          {categories?.map((category: TCategory) => (
            <div
              key={category.id}
              className="flex justify-center items-center flex-col"
            >
              <Link href={`/product?categoryName=${category.id}`}>
                <Image
                  alt={`${category.name} image`}
                  className="w-24 h-20 lg:w-auto border rounded-full object-cover lg:h-[180px]"
                  height={180}
                  width={160}
                  src={
                    category?.images ||
                    "https://via.placeholder.com/160x180?text=No+Image"
                  }
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
