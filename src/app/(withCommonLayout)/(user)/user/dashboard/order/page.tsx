"use client";

import { Divider, Button } from "@heroui/react";
import Image from "next/image";

import Container from "@/src/components/ui/Container";
import { useGetAllOrderQuery } from "@/src/redux/feature/order/order.api";
import { RxCross1 } from "react-icons/rx";

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
      <div className="font-bold p-5">
        <h1 className="text-xl my-4">Your Orders</h1>

        <div className="border rounded-lg overflow-x-auto">
          {/* ======== TABLE HEADER ======== */}
          <div className="grid grid-cols-8 font-semibold text-center p-4 bg-gray-100 text-sm">
            <div className="col-span-1">Image</div>
            <div className="col-span-3">Total Product</div>
            <div className="col-span-3">Price</div>
            <div className="col-span-1">Remove</div>
          </div>

          <Divider className="w-[97%] mx-auto mb-4" />

          {/* ======== TABLE CONTENT ======== */}
          {orderData?.data.length ? (
            <div>
              {orderData.data.map((cart) => (
                <div key={cart.id}>
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

                    {/* Remove button */}
                    <div className="col-span-1 flex justify-center">
                      <Button size="sm" variant="ghost" color="danger">
                        <RxCross1 />
                      </Button>
                    </div>
                  </div>

                  <Divider className="w-[97%] mx-auto" />
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
