"use client";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { Pagination } from "@heroui/react";
import { skipToken } from "@reduxjs/toolkit/query";

import Card from "@/src/components/ui/Card";
import Container from "@/src/components/ui/Container";
import { useAppSelector } from "@/src/redux/hook";
import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";
import SkeletonCard from "@/src/components/ui/SkeletonCard";

const ProductsPage = ({ initialData }: { initialData: any }) => {
  const searchParams = useSearchParams();
  const categoryNameFromQuery = searchParams.get("categoryName");
  const searchTerm = searchParams.get("searchTerm");
  const brandFilterState = useAppSelector((state) => state.category.brandName); //[brandname,brandnaem,]

  const categoryState = useAppSelector((state) => state.category.categoryName);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState<number>(1);

  //   const [limit, setLimit] = useState<number>(2);

  const handlePagination = (value: number) => {
    setPage(value);
  };

  console.log(page, "iam page");

  //  Client-side fresh fetch (Redux)
  const { data: productData, isLoading } = useGetAllProductQuery(
    page === 1
      ? skipToken
      : {
          categoryName:
            searchParams.get("categoryName") || categoryState || null,
          brandFilter: brandFilterState,
          searchTerm: searchParams.get("searchTerm") || "",
          page,
        },
  );

  console.log(initialData, "initialdata");

  if (isLoading) {
    return (
      <Container className="mb-4">
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </Container>
    );
  }

  const data = page === 1 ? initialData?.data?.data : productData?.data?.data;
  const meta = page === 1 ? initialData?.data?.meta : productData?.data?.meta;

  console.log(productData, "productdata");

  return (
    <div>
      <Container>
        {data?.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {data.map((product: any) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
            <div className="my-12 flex justify-end w-[80%]">
              <Pagination
                isCompact
                showControls
                color="default"
                initialPage={meta?.page}
                size="lg"
                total={Math.ceil(meta?.total / meta?.limit)}
                onChange={(value) => handlePagination(value)}
              />
              ;
            </div>
          </div>
        ) : (
          <div className="flex justify-center  items-center">
            <h2 className="text-2xl ">Oh No ! No Result</h2>
          </div>
        )}
      </Container>
    </div>
  );
};

export default ProductsPage;
