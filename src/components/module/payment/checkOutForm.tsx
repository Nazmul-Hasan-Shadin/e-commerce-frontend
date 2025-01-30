"use client";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import { useCreateOrderMutation } from "@/src/redux/feature/payment/order.api";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { RootState } from "@/src/redux/store";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const CheckOutForm = () => {
  const [makeOrder] = useCreateOrderMutation();
  const [clientSecret, setClientSecret] = useState("");
  const [error, setError] = useState<string | null>(null);
  const stripe = useStripe();
  const elements = useElements();
  const cartItems = useAppSelector((state: RootState) => state.cart.orderItems);
  const { data: currentUser, isLoading: isUserLoading } =
    useGetCurrentUserQuery("");

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const shopId = cartItems[0]?.shopId;
  const customerId = currentUser?.data?.id;
  // https://e-commerce-inky-alpha.vercel.app/api/v1/user/login
  // http://localhost:3001/api/v1/

  useEffect(() => {
    const fetchClientSecret = async () => {
      try {
        const response = await fetch(
          "https://swift-mart-bd.vercel.app/api/v1/create-payment-intent",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ price: totalAmount * 100 }),
          }
        );
        const data = await response.json();
        setClientSecret(data.clientSecret);
      } catch (error) {
        console.error("Error fetching client secret:", error);
      }
    };

    if (totalAmount > 0) {
      fetchClientSecret();
    }
  }, [totalAmount]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!stripe || !elements || isUserLoading || !customerId) {
      return;
    }

    const card = elements.getElement(CardElement);
    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setError(
        error.message || "An error occurred while creating the payment method."
      );
      return;
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: "testbro",
          },
        },
      });

    if (confirmError) {
      setError(
        confirmError.message ||
          "An error occurred while confirming the payment."
      );
      return;
    }

    if (paymentIntent?.status === "succeeded") {
      toast.success(`$${totalAmount} payment successful`);

      try {
        const orderData = {
          shopId,
          customerId,
          totalAmount,
          orderItems: cartItems.map((item) => ({
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          })),
        };

        await makeOrder(orderData).unwrap();
        toast.success("Order created successfully!");
      } catch (error: unknown) {
        if (typeof error === "object" && error !== null && "data" in error) {
          const err = error as { data: { message: string } };
          toast.error(err.data.message);
        } else {
          toast.error("An unknown error occurred while creating the order.");
        }
      }
    }
  };

  if (isUserLoading || !customerId) {
    return <div>Loading...</div>; // Show a loading message until the user is loaded
  }

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 border rounded-md shadow-md bg-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "18px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
            className="p-3 border rounded-md w-full"
          />
        </div>
        <button
          type="submit"
          disabled={!stripe || !clientSecret}
          className="w-full py-3 px-6 bg-green-600 text-white font-bold rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors duration-300 disabled:bg-green-400"
        >
          Pay Now
        </button>
        {error && <p className="text-center text-red-500 mt-2">{error}</p>}
      </form>
    </div>
  );
};

export default CheckOutForm;
