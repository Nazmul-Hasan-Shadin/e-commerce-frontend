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

  const shopId = cartItems[0]?.shopId;
  const customerId = userData?.data?.id;

  useEffect(() => {
    const id = params.get("tran_id");
    setTranId(id);
  }, [params]);

  useEffect(() => {
    const createOrderAfterPayment = async () => {
      if (!cartItems.length || !customerId || !shopId || !tranId) {
        router.push("/");
        return;
      }

      try {
        const totalAmount = cartItems.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        );

        const payload = {
          customer: { connect: { id: customerId } },
          shop: { connect: { id: shopId } },
          totalAmount,
          orderItems: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          status: "COMPLETE",
          transactionId: tranId, 
        };

        await createOrder(payload).unwrap(); 
        dispatch(clearCart());
        router.push("/order-success");
      } catch (error) {
        console.error("❌ Order creation failed:", error);
      }
    };

    if (tranId) {
      createOrderAfterPayment();
    }
  }, [tranId, cartItems, customerId, shopId, createOrder, dispatch, router]);

  return (
    <div className="flex justify-center items-center h-screen text-lg font-medium">
      Payment processing... please wait
    </div>
  );
}
