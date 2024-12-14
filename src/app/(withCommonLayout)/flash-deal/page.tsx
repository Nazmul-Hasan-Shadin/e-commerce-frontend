"use client";

import EForm from "@/src/components/form/EForm";
import ESelect from "@/src/components/form/ESelect";
import Card from "@/src/components/ui/Card";
import Container from "@/src/components/ui/Container";
import PageHeaderwithBanner from "@/src/components/ui/PageHeaderwithBanner";
import { useGetAllCategoryQuery } from "@/src/redux/feature/admin/admin.categoryapi";
import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";
import { Button } from "@nextui-org/button";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState, Suspense } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { CiFilter } from "react-icons/ci";

const FlashDealContent = () => {
  const searchParams = useSearchParams();
  const isFlashQuery = searchParams.get("isFlash");

  const [flashProduct, setFlashProduct] = useState([]);
  const [productFilter, setProuctFilter] = useState({}); // State for filtering products

  const { data: productData } = useGetAllProductQuery({
    productFilter,
    isFlash: isFlashQuery,
  });

  // Load all categories
  const { data: categoryList } = useGetAllCategoryQuery(undefined);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setProuctFilter({ ...data, isFlash: true });
  };

  return (
    <div>
      <PageHeaderwithBanner
        bannerDescription={
          "Nullam aliquet vestibulum augue non varius. Cras cosmo congue melitos. Duis tristique del ante le maliquam praesent murna de telluslaoreet cosmopolis. Quisque hendrerit nibh an purus "
        }
        title="Home 19 Collection Flash Deals"
      />
      <Container>
        <EForm onSubmit={onSubmit}>
          <div className="w-4/5 mx-auto z-40 my-8">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-1  mx-auto items-center ">
              <span className="  flex items-center  gap-3">
                <CiFilter className="text-3xl" /> <span>Filter By</span>
              </span>
              <ESelect
                label="Category"
                name="categoryName"
                options={categoryList?.data || []}
              />
              <ESelect
                label="price"
                name="price"
                options={[
                  { key: "1", label: "price" },
                  { key: "2", label: "price" },
                  { key: "3", label: "price" },
                ]}
              />
              <ESelect
                label="price"
                name="price"
                options={[
                  { key: "1", label: "price" },
                  { key: "2", label: "price" },
                  { key: "3", label: "price" },
                ]}
              />
              <ESelect
                label="price"
                name="price"
                options={[
                  { key: "1", label: "price" },
                  { key: "2", label: "price" },
                  { key: "3", label: "price" },
                ]}
              />
              <Button size="sm" type="submit" variant="bordered">
                search
              </Button>
            </div>
          </div>
        </EForm>

        <h2 className="text-2xl text-primary-color ml-5">Flash Deal</h2>
        <div className="grid grid-cols-4 gap-4">
          {productData?.data?.map((product: any) => (
            <Card key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

const FlashDeal = () => (
  <Suspense fallback={<LoadingFallback />}>
    <FlashDealContent />
  </Suspense>
);

const LoadingFallback = () => (
  <div className="loading-container">
    <p>Loading...</p>
  </div>
);

export default FlashDeal;
