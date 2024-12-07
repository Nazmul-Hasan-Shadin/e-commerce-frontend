"use client";

import Card from "@/src/components/ui/Card";
import { useGetShopInfoQuery } from "@/src/redux/feature/shop/shop.api";
import { useGetProducsByShopIdQuery } from "@/src/redux/feature/vendor/vendor.api";
import { Button } from "@nextui-org/button";

import { Divider } from "@nextui-org/react";
import React, { use, useState } from "react";
type Params = Promise<{ shopId: string }>;

const ShopPage = ({ params }: { params: Params }) => {
  const param = use(params);

  const shopId = param.shopId;

  const { data: shopData } = useGetShopInfoQuery(shopId);
  const { data: shopProduct } = useGetProducsByShopIdQuery(shopId);
  console.log(shopProduct, "isasm hsopd dat");

  const [isFollowing, setIsFollowing] = useState(false);

  const shopInfo = {
    name: "The Best Vendor Shop",
    description: "Selling the best quality products at amazing prices!",
    followers: 1234,
  };

  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      image: "/product1.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 19.99,
      image: "/product2.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      price: 39.99,
      image: "/product3.jpg",
    },
  ];

  // Follow/Unfollow handler
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Shop Header */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800">
            {shopData?.data?.name}
          </h1>
          <p className="text-gray-600 mt-2">
            {shopData?.data?.description} iam descrioption
          </p>
          <p className="text-sm text-gray-500 mt-1">
            {shopInfo.followers} followers
          </p>
        </div>
        <Button
          onPress={handleFollow}
          className={`py-2 px-6 rounded-lg transition ${
            isFollowing
              ? "bg-gray-300 text-gray-700"
              : "bg-[#fd6506] text-white"
          }`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </div>

      <Divider className="my-8" />

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shopProduct?.data.map((product) => (
          <Card product={product} key={product.id}></Card>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
