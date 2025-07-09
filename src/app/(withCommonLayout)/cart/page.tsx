"use client";
import React from "react";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import Link from "next/link";

import { removeFromCart } from "@/src/redux/feature/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";

const CartPage = () => {
  const cartItems = useAppSelector((state) => state.cart.orderItems);
  const dispatch = useAppDispatch();

  // Handle remove item from cart
  const handleRemoveFromCart = (productId: string) => {
    dispatch(removeFromCart({ productId }));
  };

  // Calculate total price
  const totalAmount = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-[#fd6506] mb-8">
        Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center mt-12">
          <p className="text-lg text-gray-600 mb-4">
            Your cart is empty. Start shopping to add items to your cart.
          </p>
          <Link href="/products">
            <Button color="primary" size="lg">
              Browse Products
            </Button>
          </Link>
        </div>
      ) : (
        <div className="space-y-8">
          {cartItems.map((item, index) => (
            <div
              key={item.productId || index}
              className="flex items-center justify-between bg-white shadow-md p-6 rounded-lg hover:shadow-lg transition-shadow"
            >
              {/* Product Image */}
              <div className="w-28 h-28 relative flex-shrink-0 border border-gray-200 rounded-md overflow-hidden">
                <Image
                  alt={item.name || "Product Image"}
                  className="rounded-md"
                  layout="fill"
                  objectFit="cover"
                  src={item.images || "/placeholder.jpg"} // Fallback to a placeholder image
                />
              </div>

              {/* Product Details */}
              <div className="flex-grow pl-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.name || "Unnamed Product"}
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Category: {item.categoryId || "N/A"}
                </p>
                <p className="text-lg font-medium text-[#fd6506] mt-2">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity and Actions */}
              <div className="flex items-center gap-6">
                <div>
                  <p className="text-sm text-gray-500">Quantity</p>
                  <p className="text-lg font-semibold">{item.quantity}</p>
                </div>
                <Button
                  className="hover:bg-red-100"
                  color="danger"
                  size="sm"
                  variant="bordered"
                  onClick={() => handleRemoveFromCart(item.productId)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Total Amount and Proceed Button */}
      {cartItems.length > 0 && (
        <div className="mt-12 p-6 bg-white shadow-md rounded-lg">
          <div className="flex justify-between items-center">
            <p className="text-2xl font-semibold text-gray-800">
              Total:{" "}
              <span className="text-[#fd6506]">${totalAmount.toFixed(2)}</span>
            </p>
            <Link href="/payment">
              <Button className="px-6 py-3" color="success" size="lg">
                Proceed to Checkout
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
