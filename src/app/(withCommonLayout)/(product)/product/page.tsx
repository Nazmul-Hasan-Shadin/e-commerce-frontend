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
  const brandFilterState = useAppSelector((state) => state.category.brandName); //[brandname,brandnaem,]

  const categoryState = useAppSelector((state) => state.category.categoryName);
  const [category, setCategory] = useState("");

  const [productFilter, setProductFilter] = useState(() => ({
    categoryName: "",
  }));

  // Fetch product data using the query
  const { data: productData, isLoading } = useGetAllProductQuery({
    categoryName: categoryNameFromQuery || categoryState || null,
    brandFilter: brandFilterState,
  });

  if (isLoading) {
    return <h2>Loading bro</h2>;
  }

  return (
    <div>
      <Container>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 gap-4">
          {productData?.data?.data.map((product: any) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default ProductsPageContent;
