import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import {
  useGetAllOrderQuery,
  useGetOrderByIdQuery,
  useGetOrderItemsFromOrderQuery,
} from "@/src/redux/feature/order/order.api";
import { Divider } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
type Order = {
  id: string;
  status: string;
  shop: {
    id: string;
    name: string;
  };
  product: {
    id:string,
    images: string[];
    name: string;
    shop: {
      vendor: {
        username: string;
      };
      name: string;
    };
  };
  price: number;
  quantity: number;
};

const OrderItemsPage = async ({
  params,
}: {
  params: Promise<{ orderItems: string }>;
}) => {
  const { orderItems: id } = await params;
  const res = await fetch(
    `https://api.rodro.online/api/v1/order/orders/items/${id}`,
    // `http://localhost:3001/api/v1/order/orders/items/${id}`,
  );
  const data = await res.json();
  console.log(data, "data");

  return (
    <div>
      <section className="grid   grid-cols-12 ">
        <div className="col-span-12 sm:col-span-8 2xl:col-span-12 mr-3  ">
          {/* ==========Tables Header============ */}
          <div className=" grid grid-cols-8   hidden sm:grid sm:grid-cols-8 font-semibold sm:font-bold  text-small sm:text-lg text-center p-4">
            <div className="">image</div>
            <div className="col-span-3 text-center">quantity</div>
            <div className="">Product Name</div>

            <div className="">Price</div>
            <div className="">Payment Status</div>
            <div className="">action</div>
          </div>
          <Divider className="w-full my-6 bg-gray-300" />
          {/* ================cart items under cart row heading=============== */}

          {data?.data?.length > 0 ? (
            <div>
              {data?.data?.map((order: Order) => (
                <div key={order?.id}>
                  <div className="hidden sm:block">
                    <div key={order?.id}>
                      <div className="grid  grid-cols-8 justify-items-center my-4">
                        <figure>
                          <Image
                            alt="cart product image"
                            height={300}
                            objectFit="contain"
                            src={order?.product?.images[0]}
                            width={90}
                          />
                        </figure>

                        <h2 className="col-span-3 text-sm sm:text-medium text-primary-color font-medium md:font-bold">
                          {order?.quantity}
                        </h2>

                        <div className="flex  justify-center">
                          <Link href={`/shop/${order?.shop?.id}`}>
                            <p className="text-sm text-primary-color md:text-medium">
                              {" "}
                              {order?.product?.name}{" "}
                            </p>
                          </Link>
                        </div>

                        <p className="text-sm md:text-medium">
                          ${order?.price * order?.quantity}
                        </p>

                        <p className="text-sm md:text-medium">
                          {order?.status}
                        </p>

                        <Link
                          href={`/user/dashboard/order/order-details/${order?.id}`}
                        >
                          {" "}
                          <p className="text-sm  md:text-medium">
                            view Details
                          </p>
                        </Link>
                      </div>
                      <Divider className="w-full my-6 bg-gray-300" />
                    </div>
                  </div>

                  {/* ==================for small device============= */}

                  <Divider className="w-[97%]  mx-auto" />
                </div>
              ))}
            </div>
          ) : (
            <div className="h-52  flex justify-center items-center">
              <h3 className="text-black">Oh no ! your cart is empty</h3>
            </div>
          )}

          {/* ====================for small device===================== */}

          <div className="sm:hidden space-y-4">
            {data?.data?.length > 0 ? (
              data.data.map((order: Order) => (
                <div key={order.id} className="bg-white rounded-lg shadow p-3">
                  {/* Top */}
                  <div className="flex justify-between text-xs text-gray-500 mb-2">
                    <p>Item ID: #{order.id.slice(0, 8)}</p>
                    <Link href={`/product-details/${order?.product?.id}`}>
                      {" "}
                      <span>Details</span>
                    </Link>
                  </div>

                  {/* Product */}
                  <div className="flex gap-3">
                    <Image
                      src={order?.product?.images?.[0] || "/no-image.jpg"}
                      width={70}
                      height={70}
                      alt=""
                      className="rounded object-cover"
                    />

                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-black line-clamp-2">
                        {order?.product?.name}
                      </h3>

                      <p className="text-xs text-gray-400">
                        Quantity: {order.quantity}
                      </p>

                      <p className="text-sm font-bold text-orange-500">
                        ৳ {order.price * order.quantity}
                      </p>

                      <p className="text-xs text-gray-500">
                        Shop: {order?.product?.shop?.name}
                      </p>
                    </div>
                  </div>

                  {/* Bottom */}
                  <div className="flex justify-between items-center mt-3">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        order.status === "DELIVERED"
                          ? "bg-green-100 text-green-600"
                          : order.status === "PENDING"
                            ? "bg-yellow-100 text-yellow-600"
                            : order.status === "SHIPPED"
                              ? "bg-blue-100 text-blue-600"
                              : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {order.status}
                    </span>

                    <Link
                      href={`/user/dashboard/order/order-details/${order.id}`}
                    >
                      <button className="text-xs border px-2 py-1 rounded">
                        View →
                      </button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-40 flex justify-center items-center">
                <p>No items found</p>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OrderItemsPage;
