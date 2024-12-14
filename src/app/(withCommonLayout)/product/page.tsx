"use client";

import Card from "@/src/components/ui/Card";
import Container from "@/src/components/ui/Container";
import PageHeaderwithBanner from "@/src/components/ui/PageHeaderwithBanner";
import { useGetAllCategoryQuery } from "@/src/redux/feature/admin/admin.categoryapi";
import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";

import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

import EForm from "@/src/components/form/EForm";
import { CiFilter } from "react-icons/ci";
import ESelect from "@/src/components/form/ESelect";
import { Button } from "@nextui-org/button";
import { TCategory } from "@/src/types";

type ProductFilterFormValues = {
  categoryName: string;
};

const ProductsPageContent = () => {
  const searchParams = useSearchParams();
  const categoryNameFromQuery = searchParams.get("categoryName");

  const [productFilter, setProductFilter] = useState(() => ({
    categoryName: categoryNameFromQuery || "",
  }));

  const { data: productData } = useGetAllProductQuery(productFilter);

  // Load all categories
  const { data: categoryList } = useGetAllCategoryQuery(undefined);

  //   ========form submit handler for filter product=========

  const onSubmit: SubmitHandler<ProductFilterFormValues> = (data) => {
    setProductFilter((prev) => ({
      ...prev,
      categoryName: data.categoryName as string,
    }));
    console.log("form data", data);
  };

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
      <PageHeaderwithBanner
        bannerDescription="Explore products by category and filters."
        title="Product List"
      />

      <EForm onSubmit={onSubmit}>
        <div className="w-4/5 mx-auto z-40 my-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-1 items-center">
            <span className="flex items-center gap-3">
              <CiFilter className="text-3xl" /> <span>Filter By</span>
            </span>
            <ESelect
              label="Category"
              name="categoryName"
              options={categoryList?.data?.map((category: TCategory) => ({
                id: category.id,
                name: category.name,
              }))}
              defaultValue={categoryNameFromQuery || ""}
            />
            <ESelect
              label="Price Range"
              name="priceRange"
              options={[
                { key: "1", label: "$0 - $50" },
                { key: "2", label: "$51 - $100" },
                { key: "3", label: "$101 - $200" },
              ]}
            />
            <Button size="sm" type="submit" variant="bordered">
              Search
            </Button>
          </div>
        </div>
      </EForm>

      <Container>
        <h2 className="text-2xl text-primary-color ml-5">Products</h2>
        <div className="grid grid-cols-4 gap-4">
          {productData?.data?.map((product: any) => (
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
