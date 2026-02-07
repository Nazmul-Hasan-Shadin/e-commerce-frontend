"use client";

import { use, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { useAppSelector, useAppDispatch } from "@/src/redux/hook";
import { useCreateOrderMutation } from "@/src/redux/feature/payment/order.api";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
type Params = Promise<{ tranId: string }>;
const PaymentSuccessPage = ({ params }: { params: Params }) => {
  const cartItems = useAppSelector((state) => state.cart.orderItems);
  const [handleCreateOrder] = useCreateOrderMutation();
  const { data: userData } = useGetCurrentUserQuery(undefined);
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const id = use(params).tranId;

  useEffect(() => {
    const createOrderAfterPayment = async () => {
      if (!cartItems?.length || !userData?.data?.id) return;

      try {
        const shopId = cartItems[0]?.shopId;
        const orderData = {
          customerId: userData?.data?.id,
          orderItems: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
          totalAmount: cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0,
          ),
          shopId: shopId,
          status: "COMPLETE",
        };

        console.log(orderData, "lgo");

        const createOrderToDb = await handleCreateOrder(orderData);

        console.log(createOrderToDb, "orderceate t odb");

        // dispatch(clearCart());
        // router.push("/order-success");
      } catch (error) {
        console.error("Order creation failed:", error);
      } finally {
        setLoading(false);
      }
    };

    createOrderAfterPayment();
  }, [cartItems, userData]);

  if (loading) return <p>Processing your order...</p>;

  return <p>Order created successfully! {id} </p>;
};

export default PaymentSuccessPage;
