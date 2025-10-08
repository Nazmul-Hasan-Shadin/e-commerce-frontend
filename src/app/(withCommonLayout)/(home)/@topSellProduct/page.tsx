"use client"; // Use client-side rendering since RTK Query is client-based

import Card from "@/src/components/ui/Card";
import Container from "@/src/components/ui/Container";
import { HomeTitle } from "@/src/components/ui/HomeTitle";
import SkeletonCard from "@/src/components/ui/SkeletonCard";
import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";

const TopSellProduct = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProductQuery({
    sortBy: "salesCount",
    orderBy: "desc",
  });

  console.log(products, "top sell product");

  return (
    <Container>
      <div className="mt-10 px-1">
        <HomeTitle title="Top Sell Product" />
        <div className="grid grid-cols-2 mt-10  gap-2 sm:grid-cols-3 md:grid-cols-3  lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-6 md:p-4">
          {isLoading ? (
            <>
              <SkeletonCard />
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

export default TopSellProduct;
