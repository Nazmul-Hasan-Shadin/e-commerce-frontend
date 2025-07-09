"use client";
import Swal from "sweetalert2";
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

import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { addToCart, replaceCart } from "@/src/redux/feature/cart/cartSlice";

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
    <div className="relative md:w-full p">
      <NextCard
        isHoverable
        className="p-1 md:w-[250px] lg:w-[270px]  lg:p-3 h-auto  shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        {/* Image */}
        <div className="relative  h-32 md:h-56">
          <Image
            alt={product?.name}
            className="rounded-t-lg mx-auto  h-full object-fill lg:w-[300px]"
            height={120}
            src={product?.images[0]}
            width={140}
          />
        </div>
        <del className="md:text-lg absolute top-1 text-primary-color p-1 right-1">
          ${product?.price}
        </del>

        {/* Card Header */}
        <CardHeader className="md:h-full p-2  md:p-1">
          <h3 className="font-semibold md:text-xl  md:font-semibold text-gray-800">
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
              <p className="md:text-xl -mt-3 md:mt-0 lg:text-xl font-semibold text-[#e10600]">
                ${product?.price - product?.discount}
              </p>
            </div>
            {/* <p className="text-[10px] hidden md:block md:text-sm p-0  text-gray-">
              {getShortDescription(product?.description)}
            </p> */}
          </div>
        </CardBody>

        {/* Card Footer */}
        <CardFooter className="p-1 md:flex gap-2  md:justify-between">
          <Button
            className=" md:hidden rounded-none text-[13px]  md:w-28 bg-primary-color text-white"
            size="sm"
            variant="bordered"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
          {/* ==============add to cart for medium device======== */}
          <Button
            className="text-sm sm:text-medium rounded-sm hidden md:block   md:w-28 bg-primary-color text-white"
            variant="bordered"
            onClick={handleAddToCart}
          >
            Add to cart
          </Button>
          <Link href={`/product-details/${product.id}`}>
            <button className="text-sm md:text-medium">Details</button>
          </Link>
        </CardFooter>

        {/* <CardFooter className="md:p-3 md:hidden flex justify-between gap-2">
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
          </Link> */}
        {/* </CardFooter> */}
      </NextCard>
    </div>
  );
};

export default Card;
