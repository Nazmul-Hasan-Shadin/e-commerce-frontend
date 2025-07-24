"use client";
import { Button } from "@heroui/button";
import Image from "next/image";
import React, { use, useEffect, useState } from "react";
import { Input } from "@heroui/input";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { GiSelfLove } from "react-icons/gi";
import Link from "next/link";

import ReviewTab from "@/src/components/module/ProductDetails/ReviewDescription";
import CommentBox from "@/src/components/ui/CommentBox";
import { IReview } from "@/src/interface";
import {
  useGetProductByIdQuery,
  useUpdateViewCountMutation,
} from "@/src/redux/feature/vendor/vendor.api";
import laptop from "@/src/assests/test.jpg";

interface ProductData {
  name: string;
  description: string;
  price: number;
  inventoryCount: number;
  images: string[];
  review: IReview[];
  shopId: string;
}

type Params = Promise<{ productId: string }>;

const ProductDetails = ({ params }: { params: Params }) => {
  const { productId } = use(params);

  const { data: productInfo, isLoading } = useGetProductByIdQuery(productId);
  const [handleUpdateView] = useUpdateViewCountMutation();
  const [mainImage, setMainImage] = useState<string>("");
  const [quantity, setQuantity] = useState<number>(1); // State for product quantity

  // Guard against undefined data
  const {
    name = "",
    description = "",
    price = 0,
    inventoryCount = 0,
    images = [],
    review = [],
    shopId = "",
  }: ProductData = productInfo?.data || {};

  // Handle thumbnail click
  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  useEffect(() => {
    if (images.length > 0) {
      setMainImage(images[0]);
    }
  }, [images]);

  useEffect(() => {
    handleUpdateView({ id: productId });
  }, [productId]);

  // Handle quantity increase
  const handleIncreaseQuantity = () => {
    if (quantity < inventoryCount) {
      setQuantity(quantity + 1);
    }
  };

  // Handle quantity decrease
  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  if (isLoading) {
    return "loading...";
  }

  return (
    <div className="px-9 mt-10">
      <div>
        <div>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-12 justify-center">
            {/* Main Product Image */}
            <div className="relative col-span-9 md:col-span-6">
              <div>
                <Image
                  alt="Main Product image"
                  className="mt-16"
                  height={600}
                  src={mainImage || laptop}
                  width={500}
                />
              </div>

              <div className="col-span-9 md:col-span-6 flex items-center gap-6 mt-12 ">
                {images.map((image, index) => (
                  <div
                    key={index}
                    className="cursor-pointer"
                    role="button"
                    tabIndex={0}
                    onClick={() => handleThumbnailClick(image)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        handleThumbnailClick(image);
                      }
                    }}
                  >
                    <Image
                      alt={`Thumbnail ${index + 1}`}
                      className="object-contain"
                      height={60}
                      src={image || laptop}
                      width={60}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* ==========Product Description========== */}
            <div className="flex flex-col col-span-3 md:col-span-5">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0 space-y-3">
                  <h3 className="font-semibold text-foreground/90  md:text-2xl">
                    {name || "No name available"}
                  </h3>

                  <span className="text-xl font-bold flex gap-2">
                    <del className="text-xl font-bold text-gray-700">$443</del>
                    <span className="text-[#e10600]">${price}</span>
                  </span>

                  <p>
                    <span className="font-bold">Brand</span>: Samsung
                  </p>
                  <p>
                    <span className="font-bold">Stock</span>: {inventoryCount}
                  </p>
                  <p>
                    <span className="font-bold">Status</span>:{" "}
                    {inventoryCount ? "In Stock" : "Out of Stock"}
                  </p>

                  <p className="text-small text-primary-color text-foreground/80">
                    7 sold in last 17 hours
                  </p>
                  <Link href={`/shop/${shopId}`}>
                    <p className="text-xl text-primary-color">See About Shop</p>
                  </Link>
                  <p className="text-xs lg:text-sm text-gray-800">
                    {description} Availability: In Stock
                  </p>

                  {/* Quantity Field */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-4">
                      <p>Quantity</p>
                      <FiMinus
                        className="text-3xl text-primary-color cursor-pointer"
                        onClick={handleDecreaseQuantity}
                      />
                      <Input
                        readOnly
                        className="w-20 md:w-[120px] border text-center"
                        value={quantity.toString()}
                      />
                      <GoPlus
                        className="text-3xl text-primary-color cursor-pointer"
                        onClick={handleIncreaseQuantity}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-5">
                    <Button
                      className="w-56 rounded-lg bg-primary-color text-white text-lg font-bold p-5"
                      variant="bordered"
                    >
                      Add To Cart
                    </Button>
                    <GiSelfLove className="text-5xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <Divider className="my-4" /> */}

      {/* Review and Comment Section */}
      <div className="flex flex-col justify-start md:px-12">
        <ReviewTab review={review} />

        <CommentBox productId={productId} />
      </div>
    </div>
  );
};

export default ProductDetails;
