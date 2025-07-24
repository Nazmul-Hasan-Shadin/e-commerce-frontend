"use client";

import { Divider, Button } from "@heroui/react";
import Image from "next/image";

import Container from "@/src/components/ui/Container";
import { useGetAllOrderQuery } from "@/src/redux/feature/order/order.api";


const UserOrderPage = () => {
  const {
    data: orderData,
    isLoading,
    isError,
  } = useGetAllOrderQuery(undefined);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders</div>;

  return (
    <Container className="mx-auto">
      <div className="font-bold  md:p-5 bg-white">
        <h1 className="text-xl my-4">Your Orders</h1>

        <div className="border rounded-lg overflow-x-auto">
          {/* ======== TABLE HEADER ======== */}
          <div className="lg:grid grid-cols-8 hidden lg:flex-row font-semibold text-center p-4 bg-gray-100 text-sm">
            <div className="col-span-1">Image</div>
            <div className="col-span-3">Total Product</div>
            <div className="col-span-3">Price</div>
          </div>

          <Divider className="w-[97%] mx-auto mb-4" />

          {/* ======== TABLE CONTENT ======== */}
          {orderData?.data.length ? (
            <div className=" ">
              {orderData.data.map((cart) => (
                <div className="hidden md:block" key={cart.id}>
                  <div className="grid grid-cols-8 justify-items-center items-center my-4 px-2 text-sm">
                    {/* Product image */}
                    <figure className="col-span-1">
                      <Image
                        alt="cart product image"
                        src={
                          cart?.orderItems?.[0]?.product?.images?.[0] ||
                          "/no-image.jpg"
                        }
                        width={70}
                        height={70}
                        className="object-contain rounded"
                      />
                    </figure>

                    {/* Total product count */}
                    <h2 className="col-span-3 text-center font-medium">
                      {cart?.orderItems.length} product(s)
                    </h2>

                    {/* Total amount */}
                    <p className="col-span-3 text-center font-semibold">
                      ${cart?.totalAmount}
                    </p>
                  </div>

                  <Divider className="w-[97%] mx-auto" />
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
