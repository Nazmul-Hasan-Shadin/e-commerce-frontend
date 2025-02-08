"use client"; // Use client-side rendering since RTK Query is client-based

import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";
import Card from "../../ui/Card";
import Link from "next/link";
import { useParams } from "next/navigation";
import SkeletonCard from "../../ui/SkeletonCard";
import Container from "../../ui/Container";
import { Divider } from "@nextui-org/react";
import Dividers from "../../ui/Divider";

const TopSellProduct = () => {
  const { data: products, isLoading, isError } = useGetAllProductQuery({});

  return (
    <Container>
      <div className="my-4 px-1">
        <h2 className="text-xl md:text-3xl text-black font-bold  md:ml-0">
          Current top seller <span className="text-sm"> </span>{" "}
        </h2>
        <Dividers />
        <div className="grid grid-cols-2 gap-2 md:grid-cols-2 lg:grid-cols-4 md:gap-6 md:p-4">
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
