"use client";

import Link from "next/link";

import SkeletonCard from "../../ui/SkeletonCard";
import Container from "../../ui/Container";
import Card from "../../ui/Card";
import { HomeTitle } from "../../ui/HomeTitle";

import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";

const PopularProduct = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProductQuery({ sortBy: "viewCount", orderBy: "desc" });

  if (isLoading) {
    return <div>loading</div>;
  }
  console.log(products);

  return (
    <Container className="px-1 sm:my-10 md:px-0">
      <div>
        <div>
          <HomeTitle title="Popular Product" />
        </div>

        <div className="grid grid-cols-2 gap-2 mt-10  sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-10 p-1 md:p-4">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            products?.data?.data
              .slice(0, 5)
              .map((product: any) => (
                <Card key={product.id} product={product} />
              ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default PopularProduct;
