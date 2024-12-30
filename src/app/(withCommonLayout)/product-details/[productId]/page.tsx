"use client";
import { Button } from "@nextui-org/button";
import { Card, CardBody } from "@nextui-org/card";
import Image from "next/image";
import React, { use } from "react";
import laptop from "@/src/assests/test.jpg";
import { Input } from "@nextui-org/input";
import { GoPlus } from "react-icons/go";
import { FiMinus } from "react-icons/fi";
import { GiSelfLove } from "react-icons/gi";
import { Checkbox } from "@nextui-org/checkbox";
import { Divider } from "@nextui-org/react";
import ReviewTab from "@/src/components/module/ProductDetails/ReviewDescription";
import CommentBox from "@/src/components/ui/CommentBox";
import Link from "next/link";
import { IReview } from "@/src/interface/review";
import { useGetProductByIdQuery } from "@/src/redux/feature/vendor/vendor.api";
import { useParams } from "next/navigation";

interface ProductData {
  name: string;
  description: string;
  price: number;
  inventoryCount: number;
  images: string;
  review: IReview[];
  shopId: string;
}
// type Params = Promise<{ productId: string }>;
type Params = Promise<{ productId: string }>;

const ProductDetails = ({ params }: { params: Params }) => {
  const { productId } = use(params);

  const { data: productInfo, isLoading } = useGetProductByIdQuery(productId);

  if (isLoading) {
    return "loading";
  }

  // const productInfo = await fetch(
  //   `http://localhost:3001/api/v1/product/${productId}`
  // );

  const {
    name,
    description,
    price,
    inventoryCount,
    images,
    review,
    shopId,
  }: ProductData = productInfo?.data;

  return (
    <div className="px-9">
      <Card
        isBlurred
        className="border-none bg-background/60 dark:bg-default-100/50 max-w-full"
        shadow="sm"
      >
        <CardBody>
          <div className="grid grid-cols-6 md:grid-cols-12 gap-6 md:gap-12 justify-center">
            {/* Product Image */}
            <div className="relative col-span-9 md:col-span-6">
              <Image
                alt="Product image"
                className="w h-ull"
                height={600}
                width={500}
                src={images || laptop}
              />
            </div>

            {/* Product Description */}
            <div className="flex flex-col col-span-3 md:col-span-5">
              <div className="flex justify-between items-start">
                <div className="flex flex-col gap-0 space-y-6">
                  <h3 className="font-semibold text-foreground/90 text-2xl">
                    {name} Sale
                  </h3>
                  <p className="text-small text-primary-color text-foreground/80">
                    7 sold in last 17 hours
                  </p>
                  <Link href={`/shop/${shopId}`}>
                    <p className="text-xl text-primary-color">See About Shop</p>
                  </Link>
                  <p className="text-xs lg:text-sm text-gray-800">
                    {description} Availability: In Stock
                  </p>
                  <span className="text-xl font-bold flex gap-2">
                    <del className="text-xl font-bold text-gray-700">$443</del>
                    <span className="text-[#e10600]">${price}</span>
                  </span>
                  <h1 className="text-large font-medium mt-2">
                    Please hurry! Only {inventoryCount} left in stock
                  </h1>

                  <div>
                    Quantity:
                    <Input
                      type="number"
                      placeholder="0"
                      startContent={<GoPlus className="text-5xl" />}
                      endContent={<FiMinus className="text-5xl" />}
                      className="max-w-[120px]"
                    />
                  </div>

                  <div className="flex items-center gap-5">
                    <Button
                      className="w-3/4 rounded-lg bg-black text-white text-lg font-bold p-4"
                      variant="bordered"
                    >
                      Add To Cart
                    </Button>
                    <GiSelfLove className="text-5xl" />
                  </div>

                  {/* <div>
                    <Checkbox defaultSelected radius="full">
                      I agree with Terms & Conditions
                    </Checkbox>
                  </div> */}

                  {/* <div className="flex items-center gap-5">
                    <Button
                      className="w-full rounded-lg bg-[#4524DB] text-white text-xl font-bold p-6"
                      variant="bordered"
                    >
                      Go For Payment
                    </Button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </CardBody>
      </Card>

      <Divider className="my-4" />

      {/* Review and Comment Section */}
      <div className="flex flex-col justify-center px-12">
        <ReviewTab review={review} />

        <CommentBox productId={productId} />
      </div>
    </div>
  );
};

export default ProductDetails;
