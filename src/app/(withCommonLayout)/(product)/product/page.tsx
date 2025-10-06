"use client";
import { useSearchParams } from "next/navigation";
import React, { useState, Suspense } from "react";
import { Pagination } from "@heroui/react";

import Card from "@/src/components/ui/Card";
import Container from "@/src/components/ui/Container";
import { useAppSelector } from "@/src/redux/hook";
import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";
import SkeletonCard from "@/src/components/ui/SkeletonCard";

const ProductsPageContent = () => {
  return (
    <Suspense fallback={<h2>Loading search params...</h2>}>
      <ProductsPage />
    </Suspense>
  );
};

const ProductsPage = () => {
  const searchParams = useSearchParams();
  const categoryNameFromQuery = searchParams.get("categoryName");
  const searchTerm = searchParams.get("searchTerm");
  const brandFilterState = useAppSelector((state) => state.category.brandName); //[brandname,brandnaem,]

  const categoryState = useAppSelector((state) => state.category.categoryName);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState<number>();

  const [limit, setLimit] = useState<number>(2);

  const [productFilter, setProductFilter] = useState(() => ({
    categoryName: "",
  }));

  const handlePagination = (value: number) => {
    setPage(value);
  };

  // Fetch product data using the query
  const { data: productData, isLoading } = useGetAllProductQuery({
    categoryName: categoryNameFromQuery || categoryState || null,
    brandFilter: brandFilterState,
    searchTerm: searchTerm || '',
  });

  const total = Math.ceil(
    productData?.data?.meta.total / productData?.data?.meta.limit
  );

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

  console.log(productData,'productdata');
  

  return (
    <div>
      <Container>
        {productData?.data?.data.length > 0 ? (
          <div>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
              {productData?.data?.data.map((product: any) => (
                <Card key={product.id} product={product} />
              ))}
            </div>
            <div className="my-12 flex justify-end w-[80%]">
              <Pagination
                isCompact
                showControls
                color="default"
                initialPage={productData?.data?.meta?.page}
                size="lg"
                total={total}
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

export default ProductsPageContent;
