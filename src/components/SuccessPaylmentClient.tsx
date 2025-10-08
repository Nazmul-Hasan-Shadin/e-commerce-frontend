"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";

import { useAppSelector, useAppDispatch } from "@/src/redux/hook";
import { clearCart } from "@/src/redux/feature/cart/cartSlice";
import { useCreateOrderMutation } from "@/src/redux/feature/payment/order.api";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";

export default function SuccessPaymentClient() {
  const [tranId, setTranId] = useState<string | null>(null);
  const cartItems = useAppSelector((state) => state.cart.orderItems);
  const { data: userData } = useGetCurrentUserQuery(undefined);
  const [createOrder] = useCreateOrderMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams();

  useEffect(() => {
    setTranId(params.get("tran_id"));
  }, [params]);

  useEffect(() => {
    const createOrderAfterPayment = async () => {
      if (!cartItems.length || !userData?.id || !tranId) {
        router.push("/");

        return;
      }

      try {
        const shopId = cartItems[0].shopId;

        await createOrder({
          customerId: userData.id,
          totalAmount: cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
          ),
          orderItems: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          status: "COMPLETE",
          shopId,
          transactionId: tranId,
        });

        dispatch(clearCart());
        router.push("/order-success");
      } catch (error) {
        console.error("Order creation failed:", error);
      }
    };

    if (tranId) createOrderAfterPayment();
  }, [tranId, cartItems, userData, router]);

  return (
    <div className="flex justify-center items-center h-screen text-lg font-medium">
      Payment processing... please wait
    </div>
  );
}
