"use client";
import Swal from "sweetalert2";
import { Button } from "@heroui/button";
import {
  Card as NextCard,
  CardHeader,
  CardBody,
  CardFooter,
} from "@heroui/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";
import { IoGitCompareOutline } from "react-icons/io5";

import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { addToCart, replaceCart } from "@/src/redux/feature/cart/cartSlice";
import { addToCompare } from "@/src/redux/feature/compare/compare.slice";

export interface IProduct {
  id: string;
  shopId: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  inventoryCount: number;
  discount: number;
  vendorId?: string;
  images: string[];
}

// Function to limit description to 30 words
const getShortDescription = (description: string) => {
  const words = description.split(" ");

  if (words.length > 20) {
    return words.slice(0, 5).join(" ") + "...";
  }

  return description;
};
const getShortName = (description: string) => {
  const words = description.split(" ");

  if (words.length > 4) {
    return words.slice(0, 4).join(" ");
  }

  return description;
};

const Card = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.orderItems);

  const compareProducts = useAppSelector((state) => state.compareItem.product);

  const handleAddToCart = () => {
    const isMultipleVendorDetect =
      cartItems.length >= 0 &&
      !cartItems.every((cart) => cart?.shopId === product?.shopId);

    if (isMultipleVendorDetect) {
      Swal.fire({
        title: " Mutliple vedor detected replace cart?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Replace it!",
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(replaceCart(product));

          Swal.fire({
            title: "Replaced!",
            text: "cart Replaced with new shop product.",
            icon: "success",
          });
        }
      });
    } else {
      dispatch(addToCart(product));

      toast.success("Product added to cart");
    }
  };

  const handleCompare = async (product: IProduct) => {
    if (!compareProducts.find((item) => item.id === product.id)) {
      dispatch(addToCompare(product));
      toast.success("product has added to compare");
    }
  };

  return (
    <div className="relative md:w-full p-1">
      <NextCard
        isHoverable
        className="p-1  max-w-2xl  lg:p-3 h-auto  shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        {/* md:w-[200px] lg:w-[270px] */}
        {/* Image */}
        <div className="relative flex items-center  h-32 md:h-56">
          <Image
            alt={product?.name}
            className="rounded-t-lg mx-auto h-[90px] sm:h-full object-fill sm:w-[220px] md:h-[140px]"
            height={120}
            src={product?.images[0]}
            width={140}
          />
        </div>

        <div className=" font-bold  sm:text-sm md:text-lg absolute top-0 text-primary-color p-1 left-1">
          <IoGitCompareOutline
            className=" text-medium sm:text-xl md:text-xl lg:text-2xl font-bold text-primary-color"
            onClick={() => handleCompare(product)}
          />
        </div>

        {/* Card Header */}
        <CardHeader className="md:h-full p-2  md:p-1">
          <h3 className="font-light   sm:font-semibold md:font-semibold text-sm sm:text-medium  md:text-md  lg:text-lg 2xl:text-xl text-gray-800">
            {getShortName(product?.name)}
          </h3>
          <br />
        </CardHeader>

        {/* Card Body */}
        <CardBody className="h-3/4 p-2 md:p-1">
          <div className="flex flex-col md:gap-2">
            <div className="flex items-center space-x-2">
              {/* <span className="md:text-xl hidden font-bold text-[#e10600]">
                ${product?.price - product?.discount}
              </span> */}
              <p className="md:text-medium 2xl:text-xl -mt-3 md:mt-0 lg:text-xl font-semibold text-[#e10600]">
                ${product?.price - product?.discount}
              </p>
            </div>
            {/* <p className="text-[10px] hidden md:block md:text-sm p-0  text-gray-">
              {getShortDescription(product?.description)}
            </p> */}
          </div>
        </CardBody>

        {/* Card Footer */}
        <CardFooter className="p-1  sm:flex md:gap-3 sm:justify-between md:flex 2xl:flex 2xl:justify-between gap-2  md:justify-between">
          <Button
            className=" md:hidden rounded-[1px] sm:p-5 sm:w-32 text-[11px] sm:text-medium md:text-sm  bg-primary-color text-white"
            size="sm"
            variant="bordered"
            onPress={handleAddToCart}
          >
            Add to cart
          </Button>
          {/* ==============add to cart for medium device======== */}
          <Button
            className="text-sm sm:text-medium md:text-medium lg:text-sm md:flex-1 2xl:flex-1 rounded-sm hidden md:block   bg-primary-color text-white"
            variant="bordered"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
          <Link href={`/product-details/${product.id}`}>
            <button className="text-[11px] sm:text-medium md:text-lg 2xl:text-medium ">
              Details
            </button>
          </Link>
        </CardFooter>
      </NextCard>
    </div>
  );
};

export default Card;
