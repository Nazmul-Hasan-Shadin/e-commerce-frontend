"use client";
import React from "react";
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import Image from "next/image";
import { Button } from "@nextui-org/button";
import { removeFromCart } from "@/src/redux/feature/cart/cartSlice";
import Link from "next/link";

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
    0
  );

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-[#fd6506] mb-12">
        Your Shopping Cart
      </h1>

      {cartItems.length === 0 ? (
        <p className="text-lg text-gray-600 text-center">
          Your cart is empty. Please add items to your cart.
        </p>
      ) : (
        <div className="space-y-8">
          {cartItems.map((item, index) => (
            <div
              key={item.productId || index}
              className="flex items-center justify-between bg-white shadow-lg p-6 rounded-lg transition-transform transform hover:scale-105"
            >
              {/* Product Image */}
              <div className="w-28 h-28 relative flex-shrink-0">
                <Image
                  src={item.images || "/placeholder.jpg"} // Fallback to a placeholder image
                  alt={item.name || "Product Image"}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>

              {/* Product Details */}
              <div className="flex-grow pl-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  {item.name || "Unnamed Product"}
                </h2>
                <p className="text-sm text-gray-600">{item.categoryId}</p>
                <p className="text-lg font-medium text-gray-900">
                  ${item.price.toFixed(2)}
                </p>
              </div>

              {/* Quantity and Actions */}
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Quantity: {item.quantity}
                </span>
                <Button
                  variant="bordered"
                  color="primary"
                  size="sm"
                  className="bg-[#fd6506] text-white"
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
        <div className="flex justify-between items-center mt-12 p-6 bg-white shadow-md rounded-lg">
          <p className="text-2xl font-semibold text-gray-800">
            Total: ${totalAmount.toFixed(2)}
          </p>
          <Link href="/payment">
            <Button color="success" size="lg" className="px-8 py-3 text-lg">
              Proceed to Payment
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default CartPage;
