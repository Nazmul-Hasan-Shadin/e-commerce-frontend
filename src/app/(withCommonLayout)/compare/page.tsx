"use client";
import Container from "@/src/components/ui/Container";
import { IProduct } from "@/src/interface";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { Button } from "@heroui/button";
import { Divider } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { FaPrint } from "react-icons/fa6";
import { IoGitCompareOutline } from "react-icons/io5";

const ComparePage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.compareItem.product);
  console.log(products, "products");

  return (
    <Container>
      <div className="bg-white border p-8">
        <div className="flex justify-between">
          <div>
            <p className="text-2xl font-medium">Product Comparison</p>
            <p>
              Find and select products to see the differences and similarities
              between them print Print Share
            </p>
          </div>

          <div>
            {" "}
            <Button className="" size="sm" variant="ghost">
              <FaPrint className="text-xl" />
            </Button>
            <Button className="" size="sm" variant="ghost">
              <FaPrint className="text-xl" />
            </Button>{" "}
          </div>
        </div>
        <Divider className="my-7" />

        <div className="">
          <table className="w-full border">
            <thead>
              {/* <tr>
              {products.map((product) => (
                <th className="w-[60px] border" key={product.id}>
                  <div className="flex flex-col justify-center items-center">
                    {" "}
                      <div className="w-[200px] h-[100px]"></div>
                   
                  </div>
                </th>
              ))}
            </tr> */}
              <tr>
                <th className=" w-[20px] border">jhjh</th>
                {products.map((product) => (
                  <th className="w-[20px] border" key={product.id}>
                    <div className="flex flex-col justify-center items-center">
                      {" "}
                      <Image
                        alt="fjkjf"
                        src={product.images[0]}
                        width={200}
                        height={100}
                      />
                      <span>{product.name}</span>
                      <span className="text-red-500">{product.price}</span>
                    </div>
                  </th>
                ))}
              </tr>
              <tr>
                <th className="w-[20px] border">Category</th>
                {products.map((product) => (
                  <td className="border w-[20px]" key={product.id}>
                    <div className="flex  justify-center ">
                      <span>{product?.category.name}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <th className="w-[20px] border">Availability</th>
                {products.map((product) => (
                  <td className="border w-[20px]" key={product.id}>
                    <div className="flex  justify-center ">
                      <span>{product?.inventoryCount}</span>
                    </div>
                  </td>
                ))}
              </tr>
              <tr>
                <th className="w-[20px] border">Description</th>
                {products.map((product) => (
                  <td className="border w-[20px]" key={product.id}>
                    <div className="flex  justify-center ">
                      <span>{product?.description}</span>
                    </div>
                  </td>
                ))}
              </tr>
               <tr>
                <th className="w-[20px] border">Discount</th>
                {products.map((product) => (
                  <td className="border w-[20px]" key={product.id}>
                    <div className="flex  justify-center ">
                      <span>{product?.discount}</span>
                    </div>
                  </td>
                ))}
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </Container>
  );
};

export default ComparePage;
