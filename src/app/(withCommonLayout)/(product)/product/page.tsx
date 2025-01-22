"use client";
import Card from "@/src/components/ui/Card";
import Container from "@/src/components/ui/Container";
import PageHeaderwithBanner from "@/src/components/ui/PageHeaderwithBanner";
import { useGetAllCategoryQuery } from "@/src/redux/feature/admin/admin.categoryapi";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

import EForm from "@/src/components/form/EForm";
import { CiFilter } from "react-icons/ci";
import ESelect from "@/src/components/form/ESelect";
import { Button } from "@nextui-org/button";
import { TCategory } from "@/src/types";
import { useAppSelector } from "@/src/redux/hook";
import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";

type ProductFilterFormValues = {
  categoryName: string;
};

const ProductsPageContent = () => {
  const searchParams = useSearchParams();
  const categoryNameFromQuery = searchParams.get("categoryName");
  const categoryFilterState = useAppSelector((state) => state.category);

  const categoryFilterByArray = categoryFilterState.categoryName;

  // Set up product filter state
  const [productFilter, setProductFilter] = useState(() => ({
    categoryName: categoryNameFromQuery || null,
  }));

  console.log(productFilter, "iam productilter");

  // Fetch product data using the query
  const { data: productData } = useGetAllProductQuery({
    categoryFilterByArray,
    categoryName: productFilter.categoryName || undefined,
  });

  console.log(productData, "iamproduct data");

  // Fetch category data
  const { data: categoryList } = useGetAllCategoryQuery(undefined);

  // Form submit handler for filter
  const onSubmit: SubmitHandler<ProductFilterFormValues> = (data) => {
    setProductFilter((prev) => ({
      ...prev,
      categoryName: data.categoryName || null,
    }));
  };

  // Update product filter if categoryName is in the URL query
  useEffect(() => {
    if (categoryNameFromQuery) {
      setProductFilter((prev) => ({
        ...prev,
        categoryName: categoryNameFromQuery,
      }));
    }
  }, [categoryNameFromQuery]);

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

const ProductsPage = () => (
  <Suspense fallback={<LoadingFallback />}>
    <ProductsPageContent />
  </Suspense>
);

const LoadingFallback = () => (
  <div className="loading-container">
    <p>Loading...</p>
  </div>
);

export default ProductsPage;
