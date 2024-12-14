"use client";
import Swal from "sweetalert2";

import {
  addToCart,
  clearCart,
  replaceCart,
  useGetCurrentCart,
} from "@/src/redux/feature/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { Button } from "@nextui-org/button";
import {
  Card as NextCard,
  CardHeader,
  CardBody,
  CardFooter,
} from "@nextui-org/card";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import toast from "react-hot-toast";

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
  images: string;
}

// Function to limit description to 30 words
const getShortDescription = (description: string) => {
  const words = description.split(" ");
  if (words.length > 20) {
    return words.slice(0, 20).join(" ") + "...";
  }
  return description;
};

const Card = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.orderItems);
  console.log(cartItems, "icartitkems");

  const handleAddToCart = () => {
    const isMultipleVendorDetect =
      cartItems.length > 0 &&
      !cartItems.every((cart) => cart.shopId === product.shopId);

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

  return (
    <div className="max-w-[190px] sm:max-w-0 md:w-full">
      <NextCard
        isHoverable
        className=" w-[168px] mr-3 md:w-[260px] md:p-6 h-auto shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        {/* Image */}
        <div className="relative h-32 md:h-56 w-full">
          <Image
            src={product?.images}
            alt={product?.name}
            layout="fill"
            objectFit="contain"
            className="rounded-t-lg w-[126px] md:w-[200px]"
          />
        </div>

        {/* Card Header */}
        <CardHeader className="md:p-3">
          <h3 className="text-[12px] md:text-xl font-semibold text-gray-800">
            {product?.name}
          </h3>
        </CardHeader>

        {/* Card Body */}
        <CardBody className="md:p-3">
          <div className="flex flex-col md:gap-2">
            <div className="flex items-center space-x-2">
              <del className="text-lg text-gray-500">${product?.price}</del>
              <span className="text-xl font-bold text-[#e10600]">
                ${product?.price - product?.discount}
              </span>
            </div>
            <p className="text-sm text-gray-600">
              {getShortDescription(product?.description)}
            </p>
          </div>
        </CardBody>

        {/* Card Footer */}
        <CardFooter className="md:p-3 hidden  md:flex gap-2  justify-between">
          <Button
            onClick={handleAddToCart}
            variant="bordered"
            className="w-4 text-[13px] md:w-28"
          >
            Add to cart
          </Button>
          <Link href={`/product-details/${product.id}`}>
            <Button variant="bordered" className="w-4 text-[13px] md:w-28">
              Details
            </Button>
          </Link>
        </CardFooter>

        <CardFooter className="md:p-3 md:hidden flex justify-between gap-2">
          <Button onClick={handleAddToCart} variant="bordered" size="sm">
            Add to cart
          </Button>
          <Link href={`/product-details/${product.id}`}>
            <Button
              size="sm"
              variant="bordered"
              className="w-4 text-[13px] md:w-28 "
            >
              Details
            </Button>
          </Link>
        </CardFooter>
      </NextCard>
    </div>
  );
};

export default Card;
