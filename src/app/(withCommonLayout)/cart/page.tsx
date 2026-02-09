"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@heroui/button";
import { Divider, Input } from "@heroui/react";
import { RxCross1 } from "react-icons/rx";

import { clearCart, removeFromCart } from "@/src/redux/feature/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import Container from "@/src/components/ui/Container";
import { useInitPaymentsslMutation } from "@/src/redux/feature/cart/cartApi";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import toast from "react-hot-toast";

const CartPage = () => {
  const [handleHitPayment, { isLoading }] = useInitPaymentsslMutation();
  const { data: userData } = useGetCurrentUserQuery(undefined);

  const cartItems = useAppSelector((state) => state.cart.orderItems);
  const dispatch = useAppDispatch();
  // Handle remove item from cart
  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart({ productId }));
  };

  const shopId = cartItems[0]?.shopId;
  const customerId = userData?.data?.id;

  // Calculate total price
  const totalAmount = cartItems.reduce(
    (total, item) => total + Number(item.price || 0) * Number(item?.quantity),
    0,
  );

  const handlePayment = async () => {
    if (cartItems.length === 0) return;
     console.log(cartItems,'ccartItems');
     
    const transactionId = "TXN-" + Date.now();

    try {
      const response = await handleHitPayment({
        transactionId,
        price: totalAmount,
      });

      if (response?.data?.paymentUrl) {
        window.location.assign(response.data.paymentUrl);
      } else {
         toast.error("Payment Error")
        console.error("Payment URL not received");
      }
    } catch (err) {
      console.error("Payment initiation failed:", err);
    }
  };

  return (
    <Container>
      <section className=" p-2 sm:p-2 md:p-3 lg:p-4">
        <div className="h-[100px] flex justify-start items-center ">
          <div className=" ">
            <h2 className="font-bold text-lg md:text-xl lg:text-2xl">Cart</h2>
            <p>Home `&gt;` cart </p>
          </div>
        </div>

        <section className="grid grid-cols-12">
          <div className="col-span-12 sm:col-span-8 2xl:col-span-8  border">
            {/* ==========Tables Header============ */}
            <div className=" grid-cols-8  border hidden sm:grid sm:grid-cols-8 font-bold  text-lg text-center p-4">
              <div className="">image</div>
              <div className="col-span-3 text-center">product</div>
              <div className="">price</div>
              <div className="">quantity</div>
              <div className="">total</div>
              <div className="">remove</div>
            </div>
            <Divider className="w-[97%] mx-auto mb-4" />
            {/* ================cart items under cart row heading=============== */}

            {cartItems.length > 0 ? (
              <div>
                {cartItems.map((cart, index) => (
                  <div key={cart?.id}>
                    <div className="grid  grid-cols-8 justify-items-center my-4">
                      <figure>
                        <Image
                          alt="cart product image"
                          height={300}
                          objectFit="contain"
                          src={cart?.images[0]}
                          width={90}
                        />
                      </figure>

                      <h2 className="col-span-3 text-sm sm:text-medium font-medium md:font-bold">
                        {cart?.name}
                      </h2>
                      <p className="text-sm md:text-medium"> {cart?.price} </p>
                      <p className="text-sm md:text-medium">
                        {cart?.quantity}{" "}
                      </p>
                      <p className="text-sm md:text-medium">
                        ${cart?.price * cart?.quantity}{" "}
                      </p>
                      <p className="flex  justify-center">
                        <RxCross1
                          onClick={() => handleRemoveFromCart(cart?.id)}
                        />
                      </p>
                    </div>
                    <Divider className="w-[97%]  mx-auto" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-52  flex justify-center items-center">
                <h3 className="text-black">Oh no ! your cart is empty</h3>
              </div>
            )}

            {/* =================cart actions=========== */}

            {cartItems.length > 0 && (
              <div className="flex justify-between items-center  p-4 mt-4 rounded">
                <div className="flex gap-3 items-center">
                  <Input
                    className="max-w-xs border"
                    placeholder="Enter coupon code"
                    radius="sm"
                    size="md"
                  />
                  <Button className="bg-primary-color rounded-sm text-white">
                    Apply
                  </Button>
                </div>

                <div>
                  <Button
                    className="bg-primary-color hidden sm:block rounded-sm text-white"
                    onPress={() => dispatch(clearCart())}
                  >
                    clear Cart
                  </Button>
                </div>
              </div>
            )}
          </div>

          {/* =================right side part=========== */}
          <div className="col-span-12 sm:col-span-3 2xl:col-span-3 border p-3">
            <h2 className="md:text-xl font-semibold md:font-bold ">
              Order Summary
            </h2>
            <div className="space-y-2">
              <p>Total before VAT: {totalAmount} </p>
              <p>VAT</p>
              <p className="font-medium">Total including VAT {totalAmount}</p>
              <Divider />
              <p className="text-medium font-medium">Discount 0</p>
              <Divider />
              <p className="font-bold">Total {totalAmount}</p>
            </div>

            <Button
              className="bg-primary-color text-white w-full my-3"
              onPress={() => handlePayment()}
            >
              Proceed to Checkout
            </Button>
          </div>
        </section>

        {/* ==============cuppon and voucher section======== */}
      </section>
    </Container>
  );
};

export default CartPage;
