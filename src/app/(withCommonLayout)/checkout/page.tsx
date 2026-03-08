"use client";
import EModal from "@/src/components/form/EModal";
import Container from "@/src/components/ui/Container";
import { useAppSelector } from "@/src/redux/hook";
import { Button, Divider } from "@heroui/react";
import React from "react";

const CheckoutPage = () => {
  const cartItems = useAppSelector((state) => state.cart.orderItems);
  const totalAmount = cartItems.reduce(
    (total, items) => total + Number(items.price) * Number(items.quantity),
    0,
  );

  return (
    <Container>
      <section className=" grid grid-cols-12">
        <div className="col-span-8">
          <div>
            <div>
              <div className="flex justify-between items-center">
                <h3 className="text-2xl">Select a Delivery Address (2/10)</h3>
                <EModal> hi</EModal>
              </div>
              <p>
                Nazmul Hasan Shadin
                <p>+8801302508989</p>
              </p>
            </div>
          </div>
        </div>

        {/* ==================right side items=============== */}
        <div className="col-span-4">
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

            <Button className="bg-primary-color text-white w-full my-3">
              Proceed to Checkout
            </Button>
          </div>
        </div>
      </section>
    </Container>
  );
};

export default CheckoutPage;
