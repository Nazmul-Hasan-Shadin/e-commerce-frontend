"use client";

import Card from "@/src/components/ui/Card";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import {
  useCheckValidityOfFollowMutation,
  useFollowShopMutation,
  useGetShopInfoQuery,
  useUnfollowShopMutation,
} from "@/src/redux/feature/shop/shop.api";
import { useGetProducsByShopIdQuery } from "@/src/redux/feature/vendor/vendor.api";
import { Button } from "@nextui-org/button";

import { Divider } from "@nextui-org/react";
import React, { use, useEffect, useState } from "react";
import toast from "react-hot-toast";
type Params = Promise<{ shopId: string }>;
interface Product {
  id: string;
  shopId: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  inventoryCount: number;
  discount: number;
  vendorId: string;
  images: string;
}

const ShopPage = ({ params }: { params: Params }) => {
  const param = use(params);

  const shopId = param.shopId;

  const { data: userInformation } = useGetCurrentUserQuery(undefined);

  const [handleFollowShop, { data, error }] = useFollowShopMutation();

  const { data: shopData } = useGetShopInfoQuery(shopId);
  const { data: shopProduct } = useGetProducsByShopIdQuery(shopId);
  const [handleUnfollow] = useUnfollowShopMutation();
  const [handleCheckValidiyOfFollow] = useCheckValidityOfFollowMutation();

  const [isFollowing, setIsFollowing] = useState(false);

  // Follow/Unfollow handler
  const handleFollow = async () => {
    try {
      if (isFollowing) {
        await handleUnfollow({
          shopId: shopId,
        }).unwrap();
        setIsFollowing(false);
        toast.success("Unfollowed successfully");
      } else {
        await handleFollowShop({
          userId: userInformation?.data?.id,
          shopId,
        }).unwrap();
        setIsFollowing(true);
        toast.success("Shop followed successfully");
      }
    } catch (error: any) {
      toast.error(error?.message || "An error occurred.");
    } finally {
    }
  };

  useEffect(() => {
    const handleChecckFollowStatus = async () => {
      try {
        const response = await handleCheckValidiyOfFollow({
          userId: userInformation?.data?.id,
          shopId,
        }).unwrap();

        if (response.success) {
          setIsFollowing(response.success);
        } else {
          setIsFollowing(false);
        }
      } catch (error) {}
    };

    if (userInformation?.data?.id && shopId) {
      handleChecckFollowStatus();
    }
  }, [userInformation?.data?.id, shopId, handleCheckValidiyOfFollow]);

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
            {shopData?.data.shopFollower.length} followers
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
        {shopProduct?.data.map((product: Product) => (
          <Card product={product} key={product.id}></Card>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
