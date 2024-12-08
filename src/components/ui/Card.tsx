import {
  addToCart,
  useGetCurrentCart,
} from "@/src/redux/feature/cart/cartSlice";
import { useAppDispatch } from "@/src/redux/hook";
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
  images: string;
}

const Card = ({ product }: { product: IProduct }) => {
  const dispatch = useAppDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Product added to cart");
  };

  return (
    <div className="max-w-xs">
      <NextCard
        isHoverable
        className="w-[318px] p-6 h-auto shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out"
      >
        {/* Image */}
        <div className="relative h-56 w-full">
          <Image
            src={product?.images}
            alt={product?.name}
            layout="fill"
            objectFit="cover"
            className="rounded-t-lg"
          />
        </div>

        {/* Card Header */}
        <CardHeader className="p-3">
          <h3 className="text-xl font-semibold text-gray-800">
            {product?.name}
          </h3>
        </CardHeader>

        {/* Card Body */}
        <CardBody className="p-3">
          <div className="flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <del className="text-lg text-gray-500">${product?.price}</del>
              <span className="text-xl font-bold text-[#e10600]">
                ${product?.price - product?.discount}
              </span>
            </div>
            <p className="text-sm text-gray-600">{product?.description}</p>
          </div>
        </CardBody>

        {/* Card Footer */}
        <CardFooter className="p-3 flex justify-between">
          <Button onClick={handleAddToCart} variant="bordered" className="w-28">
            Quick Add
          </Button>
          <Link href={`/product-details/${product.id}`}>
            <Button variant="bordered" className="w-28">
              Details
            </Button>
          </Link>
        </CardFooter>
      </NextCard>
    </div>
  );
};

export default Card;
