"use client"; // Use client-side rendering since RTK Query is client-based

import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";
import Card from "../../ui/Card";

const FeatureProduct = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProductQuery(undefined);

  if (isLoading) {
    return <div className="text-center text-lg">Loading products...</div>;
  }

  if (isError) {
    return (
      <div className="text-center text-lg text-red-600">
        Failed to load products.
      </div>
    );
  }

  console.log(products, "iam produ");

  return (
    <div className="">
      <h2>Feature Product</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-6">
        {products?.data
          .slice(0, 5)
          .map((product: any) => <Card key={product.id} product={product} />)}
      </div>
    </div>
  );
};

export default FeatureProduct;
