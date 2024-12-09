"use client";

import { Button } from "@nextui-org/button";
import { Card } from "@nextui-org/card";
import { Divider } from "@nextui-org/react";
import Image from "next/image";
import React, { useState } from "react";

const ShopPage = () => {
  // State for follow/unfollow functionality
  const [isFollowing, setIsFollowing] = useState(false);

  // Dummy shop and product data
  const shopInfo = {
    name: "The Best Vendor Shop",
    description: "Selling the best quality products at amazing prices!",
    followers: 1234,
  };

  const products = [
    {
      id: 1,
      name: "Product 1",
      price: 29.99,
      image: "/product1.jpg",
    },
    {
      id: 2,
      name: "Product 2",
      price: 19.99,
      image: "/product2.jpg",
    },
    {
      id: 3,
      name: "Product 3",
      price: 39.99,
      image: "/product3.jpg",
    },
  ];

  // Follow/Unfollow handler
  const handleFollow = () => {
    setIsFollowing(!isFollowing);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Shop Header */}
      <div className="bg-white shadow-lg rounded-lg p-6 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800">{shopInfo.name}</h1>
          <p className="text-gray-600 mt-2">{shopInfo.description}</p>
          <p className="text-sm text-gray-500 mt-1">
            {shopInfo.followers} followers
          </p>
        </div>
        <Button
          onPress={handleFollow}
          className={`py-2 px-6 rounded-lg transition ${
            isFollowing
              ? "bg-gray-300 text-gray-700"
              : "bg-[#fd6506] text-white"
          }`}
        >
          {isFollowing ? "Unfollow" : "Follow"}
        </Button>
      </div>

      <Divider className="my-8" />

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card
            key={product.id}
            className="p-4 bg-white shadow-md rounded-lg hover:shadow-lg transition"
          >
            <Image
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-lg font-semibold text-gray-800 mt-4">
              {product.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">${product.price}</p>
            <Button
              className="mt-4 bg-[#fd6506] text-white py-2 w-full rounded-lg"
              variant="flat"
            >
              View Details
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
