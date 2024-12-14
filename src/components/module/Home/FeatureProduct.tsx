"use client";

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

  return (
    <div className="">
      <h2 className="text-3xl text-black font-bold ml-12   ">
        <span> Feature Product</span>
        <span className="text-sm pl-12">
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
