import { useGetAllCategoryQuery } from "@/src/redux/feature/admin/admin.categoryapi";
import { TCategory } from "@/src/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Catagories = async () => {
  // https://e-commerce-inky-alpha.vercel.app/api/v1/user/login
  // http://localhost:3001/api/v1/
  const result = await fetch(
    `https://e-commerce-inky-alpha.vercel.app/api/v1/category`,
    {
      cache: "no-store",
    }
  );
  const categoryList = await result.json();

  console.log(categoryList, "iam categ");

  return (
    <div className="w-full">
      <h3 className="text-2xl ml-10 font-bold mb-1">Shop By Categories</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-1">
        {categoryList?.data?.slice(1, 6).map((category: TCategory) => {
          return (
            // Add return here
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
          );
        })}
      </div>
    </div>
  );
};

export default Catagories;
