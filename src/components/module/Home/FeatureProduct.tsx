"use client"; // Use client-side rendering since RTK Query is client-based

import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";
import Card from "../../ui/Card";
import Link from "next/link";
import { useParams } from "next/navigation";

const FeatureProduct = () => {
  const {
    data: products,
    isLoading,
    isError,
  } = useGetAllProductQuery({ isFlash: true });

  // if (isLoading) {
  //   return <div className="text-center text-lg">Loading products...</div>;
  // }

  // if (isError) {
  //   return (
  //     <div className="text-center text-lg text-red-600">
  //       Failed to load products.
  //     </div>
  //   );
  // }

  console.log(products, "iam produ");

  return (
    <div className="">
      <h2 className="text-3xl text-black font-bold ml-12">
        Feature Product{" "}
        <span className="text-sm">
          {" "}
          <Link className="text-blue-700" href={`/flash-deal?isFlash=true`}>
            view all flash deal
          </Link>{" "}
        </span>{" "}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4">
        {products?.data
          .slice(0, 5)
          .map((product: any) => <Card key={product.id} product={product} />)}
      </div>
    </div>
  );
};

export default FeatureProduct;
