"use client";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";

import Card from "@/src/components/ui/Card";
import Container from "@/src/components/ui/Container";
import { useAppSelector } from "@/src/redux/hook";
import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";

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
  const categoryFilterState = useAppSelector((state) => state.category);
  const categoryFilterByArray = categoryFilterState.categoryName;

  const [productFilter, setProductFilter] = useState(() => ({
    categoryName: categoryNameFromQuery || null,
  }));

  // Fetch product data using the query
  const { data: productData, isLoading } = useGetAllProductQuery({
    categoryFilterByArray,
    categoryName: productFilter.categoryName || undefined,
  });

  useEffect(() => {
    if (categoryNameFromQuery) {
      setProductFilter((prev) => ({
        ...prev,
        categoryName: categoryNameFromQuery,
      }));
    }
  }, [categoryNameFromQuery]);

  if (isLoading) {
    return <h2>Loading bro</h2>;
  }

  return (
    <div>
      <Container>
        <h2 className="text-2xl text-primary-color ml-5">Products</h2>
        <div className="grid grid-cols-4 gap-4">
          {productData?.data.map((product: any) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ProductsPageContent;
