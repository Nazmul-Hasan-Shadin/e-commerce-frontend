"use client";

import { Button } from "@heroui/button";
import { Divider } from "@heroui/react";
import Image from "next/image";
import React from "react";
import { FaPrint } from "react-icons/fa6";

import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import Container from "@/src/components/ui/Container";

const ComparePage = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.compareItem.product);

  console.log(products, "products");

  return (
    <Container>
      <div className="bg-white border p-4 md:p-6 lg:p-8">
        <div className="flex justify-between">
          <div>
            <p className="  text-lg lg:text-2xl font-bold">
              Product Comparison
            </p>
            <p className="hidden lg:block">
              Find and select products to see the differences and similarities
              between them print Print Share
            </p>
          </div>

          <div className="hidden md:block">
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

        {products.length > 0 ? (
          <div className="">
            <table className="w-full  border-gray-400">
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
                <tr className="">
                  <th className=" hidden lg:table-cell border">jhjh</th>
                  {products.map((product, index) => (
                    <th
                      key={product.id}
                      className={` md:border ${index === 0 ? "border-r" : ""}  border-gray-200 md:border-black`}
                    >
                      <div className="flex flex-col justify-center items-center">
                        {" "}
                        <Image
                          alt="fjkjf"
                          className="w-20 h-16"
                          height={100}
                          src={product.images[0]}
                          width={200}
                        />
                        <span className="text-[12px] md:text-medium">
                          {product.name}
                        </span>
                        <span className="text-red-500 text-[12px] md:text-medium">
                          {product.price}
                        </span>
                      </div>
                    </th>
                  ))}
                </tr>

                {/*  row heading of category for small device */}
                <tr className="md:hidden">
                  <th
                    className="text-center bg-gray-100 font-medium"
                    colSpan={products.length}
                  >
                    Category
                  </th>
                </tr>

                <tr>
                  <td className="hidden  lg:table-cell font-medium border mb-2">
                    Category
                  </td>
                  {products.map((product, index) => (
                    <>
                      <td
                        key={product.id}
                        className={`md:border ${index === 0 ? "border-r" : ""}  border-gray-200 md:border-black`}
                      >
                        <div className="flex text-[12px] sm:text-medium md:text-medium  justify-center ">
                          <span>{product?.category.name}</span>
                        </div>
                      </td>
                    </>
                  ))}
                </tr>

                {/*  row heading of availability for small device */}
                <tr className="md:hidden">
                  <th
                    className="text-center bg-gray-100 font-medium"
                    colSpan={products.length}
                  >
                    Availability
                  </th>
                </tr>

                <tr>
                  <th className="hidden  lg:table-cell w-[20px] border">
                    Availability
                  </th>
                  {products.map((product, index) => (
                    <td
                      key={product.id}
                      className={`md:border ${index === 0 ? "border-r" : ""}   border-gray-200 md:border-black`}
                    >
                      <div className="flex  text-[12px] sm:text-medium md:text-medium justify-center ">
                        <span>{product?.inventoryCount}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/*  row heading of Description for small device */}
                <tr className="md:hidden">
                  <th
                    className="text-center bg-gray-100 font-medium"
                    colSpan={products.length}
                  >
                    Summery
                  </th>
                </tr>

                <tr>
                  <th className="hidden   lg:table-cell w-[20px] border">
                    Description
                  </th>
                  {products.map((product, index) => (
                    <td
                      key={product.id}
                      className={`md:border ${index === 0 ? "border-r" : ""}  w-[20px]  border-gray-200 md:border-black`}
                    >
                      <div className="flex  text-[12px] sm:text-medium md:text-medium  justify-center ">
                        <span>{product?.description}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/*  row heading of discount for small device */}
                <tr className="md:hidden">
                  <th
                    className="text-center bg-gray-100 font-medium"
                    colSpan={products.length}
                  >
                    Discount
                  </th>
                </tr>
                <tr>
                  <th className=" hidden bg-gray-100  lg:table-cell  w-[20px] border">
                    Discount
                  </th>
                  {products.map((product, index) => (
                    <td
                      key={product.id}
                      className={`md:border ${index === 0 ? "border-r" : ""}  w-[20px]  border-gray-200 md:border-black`}
                    >
                      <div className="flex  text-[12px] sm:text-medium md:text-medium justify-center ">
                        <span>{product?.discount}</span>
                      </div>
                    </td>
                  ))}
                </tr>

                {/*  row heading of price for small device */}
                <tr className="md:hidden">
                  <th
                    className="text-center bg-gray-100 font-medium"
                    colSpan={products.length}
                  >
                    Category
                  </th>
                </tr>

                <tr>
                  <th className=" hidden  lg:table-cell w-[20px] border">
                    Price
                  </th>
                  {products.map((product, index) => (
                    <td
                      key={product.id}
                      className={`md:border ${index === 0 ? "border-r" : ""}  w-[20px]  border-gray-200 md:border-black`}
                    >
                      <div className="flex  text-[12px] sm:text-medium md:text-medium justify-center ">
                        <span>{product?.price}</span>
                      </div>
                    </td>
                  ))}
                </tr>
              </thead>
            </table>
          </div>
        ) : (
          <div className="h-52  flex justify-center items-center">
            <h3 className="text-black">Oh no ! your cart is empty</h3>
          </div>
        )}
      </div>
    </Container>
  );
};

export default ComparePage;
