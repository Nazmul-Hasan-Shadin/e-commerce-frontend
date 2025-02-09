"use client";

import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";
import Card from "../../ui/Card";
import Link from "next/link";
import { useParams } from "next/navigation";
import { divider } from "@nextui-org/theme";
import SkeletonCard from "../../ui/SkeletonCard";
import Container from "../../ui/Container";
import styles from "./bottomNav.module.css";
import { Divider } from "@nextui-org/react";
import Dividers from "../../ui/Divider";

const FeatureProduct = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProductQuery({ isFlash: true });

  if (isLoading) {
    return <div>loading</div>;
  }

  return (
    <Container className="px-1 md:px-0">
      <div>
        <h2 className="text-xl py-2 md:text-2xl text-black font-bold   md:ml-0   ">
          <span> Feature Product</span>
          <span className="text-sm pl-12">
            <Link className="text-orange-700" href={`/flash-deal?isFlash=true`}>
              view all flash deal
            </Link>
          </span>
        </h2>

        <Dividers />
        <div className="grid grid-cols-2 gap-2  lg:grid-cols-4 md:gap-6  p-1 md:p-4">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            products?.data
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

export default FeatureProduct;
