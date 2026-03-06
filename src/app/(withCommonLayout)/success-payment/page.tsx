"use client";

import { use, useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "@/src/redux/hook";

import { clearCart } from "@/src/redux/feature/cart/cartSlice";
type Params = Promise<{ tranId: string }>;
const PaymentSuccessPage = () => {
  const dispatch = useAppDispatch();



  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return <p>Order created successfully! </p>;
};

export default PaymentSuccessPage;
