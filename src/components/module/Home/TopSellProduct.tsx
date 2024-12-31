"use client"; // Use client-side rendering since RTK Query is client-based

import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";
import Card from "../../ui/Card";
import Link from "next/link";
import { useParams } from "next/navigation";
import SkeletonCard from "../../ui/SkeletonCard";

const TopSellProduct = () => {
  const { data: products, isLoading, isError } = useGetAllProductQuery({});

  return (
    <div className="my-4">
      <h2 className="text-xl md:text-3xl text-black font-bold md:ml-12">
        Current top seller <span className="text-sm"> </span>{" "}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
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
            .slice(1, 5)
            .map((product: any) => <Card key={product.id} product={product} />)
        )}
      </div>
    </div>
  );
};

export default TopSellProduct;
