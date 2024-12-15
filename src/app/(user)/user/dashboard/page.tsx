"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";

const UserDashboard = () => {
  const { data: userData } = useGetCurrentUserQuery(undefined);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Greeting Section */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Welcome, {userData?.data?.username || "User"} 👋
        </h1>
        <p className="text-gray-500 mt-2">
          Explore your dashboard and manage your activities.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button
          as={Link}
          href="/products"
          className="bg-teal-500 text-white hover:bg-teal-600"
          radius="sm"
          size="lg"
        >
          View Products
        </Button>

        <Button
          as={Link}
          href="/orders"
          className="bg-blue-500 text-white hover:bg-blue-600"
          radius="sm"
          size="lg"
        >
          Manage Orders
        </Button>

        <Button
          as={Link}
          href="/profile"
          className="bg-gray-500 text-white hover:bg-gray-600"
          radius="sm"
          size="lg"
        >
          View Profile
        </Button>
      </div>
    </div>
  );
};

export default UserDashboard;
