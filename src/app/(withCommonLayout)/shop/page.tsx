"use client";

import Link from "next/link";
import React from "react";

import { useGetAllShopTopTenQuery } from "@/src/redux/feature/shop/shop.api";

type Shop = {
  id: string;
  vendorId: string;
  product: [];
  name: string;
  logo?: string;
  description?: string;
  createdAt: string;
  updatedAt?: string;
};

const ShopPage = () => {
  const { data: shops, isLoading, error } = useGetAllShopTopTenQuery(undefined);

  if (isLoading) return <p>Loading shops...</p>;
  if (error) return <p>Failed to load shops. Please try again later.</p>;

  return (
    <div className="max-w-7xl mx-auto p-4">
      <h1
        className="text-3xl font-bold text-center mb-6"
        style={{ color: "#fd6506" }}
      >
        All Shops
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shops?.data.map((shop: Shop) => (
          <div
            key={shop.id}
            className="bg-white shadow-lg rounded-lg overflow-hidden"
          >
            {/* Shop Details */}
            <div className="flex flex-col items-center p-4">
              <img
                alt={`${shop.name || "Shop"} logo`}
                className="w-16 h-16 object-cover rounded-full mb-4"
                src={shop.logo || "/default-logo.png"}
              />
              <h2 className="text-lg font-bold text-gray-800">
                {shop.name || "Unnamed Shop"}
              </h2>
              <p className="text-sm text-gray-500">
                Joined:{" "}
                {shop.createdAt
                  ? new Date(shop.createdAt).toLocaleDateString()
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-500">
                Total Products: {shop.product?.length || 0}
              </p>
            </div>

            {/* View Shop Button */}
            <Link
              className="block text-center py-2 bg-[#fd6506] text-white font-semibold hover:bg-orange-600 transition"
              href={`/shop/${shop.id}`}
            >
              View Shop
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopPage;
