"use client";

import { useMemo } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAppSelector, useAppDispatch } from "@/src/redux/hook";
import { clearCart } from "@/src/redux/feature/cart/cartSlice";
import { useCreateOrderMutation } from "@/src/redux/feature/payment/order.api";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";

export default function SuccessPaymentClient() {
  const cartItems = useAppSelector((state) => state.cart.orderItems);
  const { data: userData, isLoading: userLoading } =
    useGetCurrentUserQuery(undefined);
  const [createOrder, { isLoading: orderLoading }] = useCreateOrderMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const params = useSearchParams();
  
  console.log("iam params", params);

  const tranId = useMemo(() => params.get("tran_id"), [params]);

  // ✅ Guard: only trigger when all data is ready
  const canCreateOrder =
    tranId && userData?.data?.id && cartItems.length > 0 && !orderLoading;

  const handleOrderCreation = async () => {
    if (!canCreateOrder) return;

    try {
      const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0,
      );

      const payload = {
        customer: { connect: { id: userData.data.id } },
        shop: { connect: { id: cartItems[0]?.shopId } },
        totalAmount,
        orderItems: cartItems.map((item) => ({
          productId: item.id,
          quantity: item.quantity,
          price: item.price,
        })),
        status: "COMPLETE",
        transactionId: tranId,
      };

      const response = await createOrder(payload).unwrap();
       console.log(response);
       

      if (response.success) {
        dispatch(clearCart());
        router.push("/order-success");
      } else {
       
         
        toast.error("Order creation failed.");
      }
    } catch (err) {
      console.error("Order creation failed:", err);
      toast.error("Something went wrong during order creation.");
    }
  };

  // ✅ Auto-create order once ready
  if (canCreateOrder) handleOrderCreation();

  return (
    <div className="flex justify-center items-center h-screen text-lg font-medium">
      Payment processing... please wait
    </div>
  );
}
