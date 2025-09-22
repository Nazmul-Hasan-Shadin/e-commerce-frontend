"use client";

import { Divider, Button } from "@heroui/react";
import Image from "next/image";

import Container from "@/src/components/ui/Container";
import { useGetAllOrderQuery } from "@/src/redux/feature/order/order.api";

interface IOrder {
  id: string;
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
      <div className="font-bold border  md:p-5 bg-white">
        <h1 className="text-xl my-4">My Orders</h1>
        <Divider className="mb-5" />
        <div className="border rounded-lg overflow-x-auto">
          {/* ======== TABLE HEADER ======== */}
          <div className="lg:grid grid-cols-10 hidden justify-items-center lg:flex-row font-semibold text-center p-4 bg-gray-100 text-sm">
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
                            src={order.shop.logo || "/no-image.jpg"}
                            width={70}
                            height={70}
                            className="object-contain rounded"
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
                          size="sm"
                          variant="bordered"
                          className="col-span-1 text-center font-semibold"
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
              {orderData?.data.map((orderData) => (
                <div key={orderData?.id} className="p-2 md:hidden">
                  <div className="flex gap-4 mb-4">
                    <figure>
                      <Image
                        height={70}
                        width={70}
                        src={
                          orderData?.orderItems?.[0]?.product?.images?.[0] ||
                          "/no-image.jpg"
                        }
                        alt="product image"
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
      </div>
    </Container>
  );
};

export default UserOrderPage;
