"use client";

import { Divider, Button } from "@heroui/react";
import Image from "next/image";

import Container from "@/src/components/ui/Container";
import { useGetAllOrderQuery } from "@/src/redux/feature/order/order.api";
import { useState } from "react";
import Link from "next/link";

interface IOrder {
  id: string;
  orderStatus:string,
  shopId: string;
  shop: {
    name: string;
    logo: string;
    id: string;
  };
  customerId: string;

  status: string;
  totalAmount: number;
  orderItems: IOrderItems[];
}

interface IOrderItems {
  id: string;
  product: {
    images: string[];
    name: string;
    quantity: number;
    price: number;
  };
  price: number;
  quantity: number;
}

const UserOrderPage = () => {
  const [activeTab, setActiveTab] = useState("ALL");

  const {
    data: orderData,
    isLoading,
    isError,
  } = useGetAllOrderQuery(undefined);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders</div>;
  console.log(orderData, "orderdata");

  return (
    <Container className="mx-auto">
      <div className="font-bold md:border  md:p-5 text-black dark:text-white bg-white">
        <h1 className="text-xl my-4">My Orders</h1>

        {/* 🔥 ADD THIS TAB */}
        <div className="flex justify-between border-b mb-4 text-sm">
          {["ALL", "PENDING", "CONFIRMED", "DELIVERED", "CANCELLED"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2 ${
                  activeTab === tab
                    ? "border-b-2 border-orange-500 text-orange-500 font-semibold"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ),
          )}
        </div>

        <Divider className="mb-5" />

        <div className="border hidden sm:block rounded-lg overflow-x-auto">
          {/* ======== TABLE HEADER ======== */}
          <div className="lg:grid grid-cols-10 hidden justify-items-center lg:flex-row font-semibold text-center p-4 bg-gray-100 dark:text-black text-sm">
            <div className="col-span-1">Image</div>

            <div className="col-span-2">shop name</div>
            <div className="col-span-2">total price</div>
            <div className="col-span-2">total product</div>

            <div className="col-span-1">status</div>
            <div className="col-span-1">payment method</div>
          </div>

          <Divider className="w-[97%] mx-auto mb-4" />

          {/* ======== TABLE CONTENT ======== */}
          {orderData?.data.length ? (
            <div className=" ">
              {orderData.data?.map((order: IOrder) => (
                <div key={order.id}>
                  <div className="hidden md:block">
                    <div>
                      <div className="grid grid-cols-10 justify-items-center  my-4 px-2 text-sm">
                        {/* Product image */}
                        <figure className="col-span-1">
                          <Image
                            alt="cart product image"
                            className="object-contain rounded"
                            height={70}
                            src={order.shop.logo || "/no-image.jpg"}
                            width={70}
                          />
                        </figure>

                        <h2 className="col-span-2 text-center font-medium">
                          {order.shop.name}
                        </h2>

                        <p className="col-span-2 text-center font-semibold">
                          {order.totalAmount}
                        </p>

                        <p className="col-span-2 text-center font-semibold">
                          {order.orderItems.length}
                        </p>
                        <Button
                          className="col-span-1 text-center font-semibold"
                          size="sm"
                          variant="bordered"
                        >
                          {order.status}
                        </Button>

                        <p className="col-span-1 text-center font-semibold">
                          sslcommerce
                        </p>
                      </div>
                    </div>

                    <Divider className="w-[97%] mx-auto" />
                  </div>
                </div>
              ))}

              {/* ===============for small device only========= */}
              {orderData?.data.map((orderData: IOrder) => (
                <div key={orderData?.id} className="p-2 md:hidden">
                  <div className="flex gap-4 mb-4">
                    <figure>
                      <Image
                        alt="product image"
                        height={70}
                        src={
                          orderData?.orderItems?.[0]?.product?.images?.[0] ||
                          "/no-image.jpg"
                        }
                        width={70}
                      />
                    </figure>
                    <div className="font-normal">
                      <h3 className="text-sm ">Mini laptop del inspiron 35</h3>
                      <p className="text-xs text-gray-400">
                        color family : black
                      </p>
                      <p>$ {orderData?.totalAmount}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="h-52 flex justify-center items-center">
              <h3>Product not found</h3>
            </div>
          )}
        </div>

        {/* ================mobile view ========== */}

        <div className="sm:hidden space-y-4">
          {orderData?.data?.length ? (
            orderData.data.map((order: IOrder) => (
              <div key={order.id} className="bg-white rounded-lg shadow p-3">
                {/* Top */}
                <div className="flex justify-between text-xs text-gray-500 mb-2">
                  <p>Order ID: #{order.id.slice(0, 8)}</p>
                  <span className="text-blue-500">View</span>
                </div>
                <Divider className=" w-full bg-gray-300" />
                <p> ffff hu</p>
                {/* Product */}
                <div className="flex gap-8">
                  <Image
                    src={
                      order?.orderItems?.[0]?.product?.images?.[0] ||
                      "/no-image.jpg"
                    }
                    width={70}
                    height={70}
                    alt=""
                    className="rounded"
                  />

                  <div className="flex-1">
                    <div>
                      <h3 className="text-sm font-medium text-black line-clamp-2">
                        {order?.shop?.name}
                      </h3>

                      <p className="text-xs text-gray-400">
                        Items: {order.orderItems.length}
                      </p>

                      <p className="text-sm text-gray-500  font-bold">
                        ৳ {order.totalAmount}
                      </p>
                    </div>
                    <div className="border flex justify-between">
                      {" "}
                      <p className="text-xs text-gray-500">
                        Seller: {order.shop?.name}
                      </p>
                      <p className="text-black text-xs">{order?.orderStatus}</p>
                    </div>
                  </div>
                </div>
                {/* Bottom */}
                <div className="flex justify-between items-center mt-3">
                  <span className="text-xs px-2 py-1 rounded text-black bg-gray-100">
                    {order.status === "PENDING"
                      ? "UNPAID"
                      : order.status === "COMPLETE"
                        ? "PAID"
                        : "FAILED"}
                  </span>

                  <Link
                    href={`/user/dashboard/orders/${order?.id}`}
                  >
                    <span className="text-xs text-orange-500">Details →</span>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="h-40 flex justify-center items-center">
              <p>No orders found</p>
            </div>
          )}
        </div>
      </div>
    </Container>
  );
};

export default UserOrderPage;
