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
    dispatch(
      addToCart({
        productId: product.id,
        quantity: 1,
        price: product.price,
      })
    );
    toast.success("Product added to cart");
  };

  return (
    <div className="p-5">
      <NextCard isHoverable className="max-w-[250px] h-[475px] ">
        <Image
          src={product?.images}
          alt="card picture"
          width={211}
          height={209}
          className="w-full"
        />
        <CardHeader>
          <p className="text-xl">{product?.name}</p>
        </CardHeader>
        <CardBody>
          <span>
            <del className="text-xl text-gray-500"> ${product?.price}</del> from{" "}
            <span className="text-xl font-bold text-[#e10600]">$20</span>
          </span>
        </CardBody>

        <CardFooter className="flex justify-around">
          <Button onClick={handleAddToCart} variant="bordered">
            Quick Add
          </Button>
          <Link href={`/product-details/${product.id}`}>
            <Button variant="bordered">Details</Button>
          </Link>
        </CardFooter>
      </NextCard>
    </div>
  );
};

export default Card;
