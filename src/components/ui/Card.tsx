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

const Card = ({ product }) => {
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
          <Button variant="bordered">Quick Add</Button>
          <Link href={`/product-details/${product.id}`}>
            <Button variant="bordered">Details</Button>
          </Link>
        </CardFooter>
      </NextCard>
    </div>
  );
};

export default Card;
