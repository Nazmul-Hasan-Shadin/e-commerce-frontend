"use client";
import EModal from "@/src/components/form/EModal";
import Container from "@/src/components/ui/Container";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import { useInitPaymentsslMutation } from "@/src/redux/feature/cart/cartApi";
import { useCreateOrderMutation } from "@/src/redux/feature/payment/order.api";
import { useAppSelector } from "@/src/redux/hook";
import { Button, Divider, Input, Textarea, useDisclosure } from "@heroui/react";
import Image from "next/image";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaHome } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";
import { RxCross1 } from "react-icons/rx";

const CheckoutPage = () => {
  const [orderInfo, setOrderInfo] = useState({
    name: "",
    phone: "",
    address: "",
    paymentMethod: "",
    note: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [handleHitPayment] = useInitPaymentsslMutation();
  const [handleCreateOrder] = useCreateOrderMutation();
  const {
    data: userData,
    isFetching,
    isLoading,
  } = useGetCurrentUserQuery(undefined);

  const cartItems = useAppSelector((state) => state.cart.orderItems);
  const totalAmount = cartItems.reduce(
    (total, items) => total + Number(items.price) * Number(items.quantity),
    0,
  );

      console.log(cartItems);
  const shopId = cartItems[0]?.shopId;
  const customerId = userData?.data?.id;

  const handlePayment = async () => {
    // if (cartItems.length === 0) return;

    const transactionId = "TXN-" + Date.now();

    try {
      const response = await handleHitPayment({
        transactionId,
        price: totalAmount,
        customerId: customerId,
        shopId: shopId,
        totalAmount,
        orderItems: cartItems,
      });

      if (response?.data?.paymentUrl) {
        window.location.assign(response.data.paymentUrl);
      }
    } catch (err: any) {
      toast.error(err.message);
      console.error("Payment initiation failed:", err);
    }
  };

  const handleChange = (e:any) => {
    const { name, value } = e.target;

    setOrderInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const transactionId = "TXN-" + Date.now();

  const createOrder = async () => {
    const payload = {
      shopId,
      customerId: customerId ,
      guestName: orderInfo.name,
      guestPhone: orderInfo?.phone,
      guestAddress: orderInfo?.address,
      paymentMethod: paymentMethod,
      totalAmount,
      orderItems: cartItems,
      transactionId,
    };


    try {
      const response = await handleCreateOrder(payload);
      console.log(response, "iam res createorder");

      if (response) toast.success('order placed successful')
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  console.log(paymentMethod);

  return (
    <Container>
      <section className="p-4">
        <span className="flex gap-2 text-lg my-4  items-center">
          <FaHome /> Checkout
        </span>
        <section className=" grid grid-cols-12">
          <div className="sm:col-span-12 md:col-span-8 space-y-5 mr-2">
            {/* ==============delivery address======== */}
            <div className="border">
              <div className="p-4 ">
                <div className="flex justify-between items-center">
                  <h3 className="text-xl">Select a Delivery Address (2/10)</h3>
                  <Button
                    onPress={onOpen}
                    className="rounded-none bg-primary-color"
                  >
                    <FaPlus /> Add Address
                  </Button>
                </div>

                {/* ============MODAL============== */}
                <EModal
                  isOpen={isOpen}
                  onClose={onClose}
                  title="Add Delivary Address"
                >
                  <div className="grid gap-x-3 grid-cols-2">
                    <div>
                      <p className="text-xl font-light my-3">
                        Contact Information
                      </p>
                      <div>
                        <Input
                          labelPlacement="outside-top"
                          label="Name"
                          onChange={handleChange}
                          name="name"
                          size={"lg"}
                        />
                      </div>
                      <div>
                        <Input
                          labelPlacement="outside-top"
                          label="Phone"
                          onChange={handleChange}
                          name="phone"
                          size={"lg"}
                        />
                      </div>
                    </div>

                    {/* =================address information ========== */}
                    <div>
                      <p className="text-xl font-light my-3">
                        Adress Information
                      </p>
                      <div>
                        <div>
                          <Input
                            disabled
                            labelPlacement="outside-top"
                            label="Street,/House"
                            size={"lg"}
                          />
                        </div>

                        <div>
                          <Input
                            disabled
                            labelPlacement="outside-top"
                            label="District"
                            size={"lg"}
                          />
                        </div>

                        <div>
                          <Textarea
                            labelPlacement="outside-top"
                            onChange={handleChange}
                            label="Full Address "
                            name="address"
                            size={"lg"}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </EModal>

                <p>
                  Nazmul Hasan Shadin
                  <p>+8801302508989</p>
                </p>
              </div>
            </div>
            {/* ========order summery items====== */}
            <div className="border p-4">
              <h3 className="text-xl font-semibold">Order summery item</h3>
              <Divider className="my-3 w-[92%] mx-auto" />
              <div className=" grid-cols-8 bg-[#FFFAE6] text-black  border hidden sm:grid sm:grid-cols-8 font-bold  text-lg text-center p-4">
                <div className="col-span-3">product details</div>

                <div className="">price</div>
                <div className="">quantity</div>
                <div className="">total</div>
              </div>
              {cartItems.length > 0 ? (
                <div>
                  {cartItems.map((cart, index) => (
                    <div key={cart?.id}>
                      <div className="grid border grid-cols-8 justify-items-center items-center my-4">
                        <figure className="flex gap-3 col-span-3">
                          <Image
                            alt="cart product image"
                            height={300}
                            objectFit="contain"
                            src={cart?.images[0]}
                            width={90}
                          />
                          <h2 className="col-span-3 text-sm sm:text-medium font-medium md:font-bold">
                            {cart?.name}
                          </h2>
                        </figure>

                        <p className="text-sm md:text-medium">
                          {" "}
                          {cart?.price}{" "}
                        </p>
                        <p className="text-sm md:text-medium">
                          {cart?.quantity}{" "}
                        </p>
                        <p className="text-sm md:text-medium">
                          ${cart?.price * cart?.quantity}
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
            </div>
            {/* ==========pyment method=========== */}

            <div className="border p-4">
              <div className="">
                <h3 className="text-xl font-mono mb-8">Payment Method</h3>
                <div>
                  {" "}
                  <span>Recommended Method</span>
                  <button
                    onClick={() => setPaymentMethod("COD")}
                    className={`p-4 rounded-lg border my-3 w-full text-left ${paymentMethod === "COD" ? "border-orange-500 " : "border-gray-300"} `}
                  >
                    Cash on Delivery
                  </button>
                </div>
                <span>Other Methods</span>
                <button
                  onClick={() => setPaymentMethod("SSL")}
                  className={`p-4 rounded-lg border my-3 w-full text-left ${paymentMethod === "SSL" ? "border-orange-500 " : "border-gray-300"} `}
                >
                  Bkash
                </button>
                <button
                  onClick={() => setPaymentMethod("SSL")}
                  className={`p-4 rounded-lg border my-3 w-full text-left ${paymentMethod === "SSL" ? "border-orange-500 " : "border-gray-300"} `}
                >
                  Nagad
                </button>
                <div className="p-4 rounded-lg border my-3">Upay</div>
              </div>
            </div>
          </div>

          {/* ==================right side items=============== */}
          <div className="sm:col-span-12 md:col-span-4">
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

              {paymentMethod === "SSL" ? (
                <Button
                  onPress={() => handlePayment()}
                  className="bg-primary-color text-white w-full my-3"
                >
                  pay and order
                </Button>
              ) : (
                <Button
                  onPress={() => createOrder()}
                  className="bg-primary-color text-white w-full my-3"
                >
                  pay and jhjhjorder
                </Button>
              )}
            </div>
          </div>
        </section>
      </section>
    </Container>
  );
};

export default CheckoutPage;
