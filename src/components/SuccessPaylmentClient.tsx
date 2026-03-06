"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAppSelector, useAppDispatch } from "@/src/redux/hook";
import { clearCart } from "@/src/redux/feature/cart/cartSlice";
import { useCreateOrderMutation } from "@/src/redux/feature/payment/order.api";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";

export default function SuccessPaymentClient() {


  return (
    <div className="flex justify-center items-center h-screen text-lg font-medium">
      Payment processing... please wait
    </div>
  );
}
