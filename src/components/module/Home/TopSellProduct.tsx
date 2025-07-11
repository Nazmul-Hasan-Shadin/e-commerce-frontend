"use client"; // Use client-side rendering since RTK Query is client-based

import Card from "../../ui/Card";
import SkeletonCard from "../../ui/SkeletonCard";
import Container from "../../ui/Container";
import Dividers from "../../ui/Divider";

import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";
import { HomeTitle } from "../../ui/HomeTitle";

const TopSellProduct = () => {
  const { data: products, isLoading, isError } = useGetAllProductQuery({});

  return (
    <Container>
      <div className="mt-10 px-1">
        <HomeTitle title="Top Sell Product"/>
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
            products?.data
              ?.data.slice(1, 5)
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
