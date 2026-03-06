"use client";

import { use, useEffect, useState } from "react";

import { useAppSelector, useAppDispatch } from "@/src/redux/hook";

import { clearCart } from "@/src/redux/feature/cart/cartSlice";
type Params = Promise<{ tranId: string }>;
const PaymentSuccessPage = ({ params }: { params: Params }) => {
  const dispatch = useAppDispatch();

  const id = use(params).tranId;

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  return <p>Order created successfully! {id} </p>;
};

export default PaymentSuccessPage;
