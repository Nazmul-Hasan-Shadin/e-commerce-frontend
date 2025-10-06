"use client";

import Card from "@/src/components/ui/Card";
import Container from "@/src/components/ui/Container";
import { HomeTitle } from "@/src/components/ui/HomeTitle";
import SkeletonCard from "@/src/components/ui/SkeletonCard";
import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";

type Props = {
  initialData: any;
};

const PopularProduct = ({ initialData }: Props) => {
  const { data: products = initialData, isLoading } = useGetAllProductQuery(
    { sortBy: "viewCount", orderBy: "desc" },
    {
      skip: !!initialData,
    }
  );

  const list = products?.data?.data || [];

  return (
    <Container className="px-1 sm:my-10 md:px-0">
      <div>
        <HomeTitle title="Popular Product" />
        <div className="grid grid-cols-2 gap-2 mt-10 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 md:gap-10 p-1 md:p-4">
          {isLoading && list.length === 0 ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            list.map((product: any) => (
              <Card key={product.id} product={product} />
            ))
          )}
        </div>
      </div>
    </Container>
  );
};

export default PopularProduct;
