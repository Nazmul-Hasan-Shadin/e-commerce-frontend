"use client";
import React from "react";
import { Button } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";

import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";

const ProfilePage = () => {
  const { data: userData } = useGetCurrentUserQuery(undefined);

  const user = userData?.data || {};

  return (
    <div className="min-h-screen bg-gray-50 md:p-8">
      {/* Profile Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-4">
          <Image
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover"
            height={300}
            src={
              user?.avatar || "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            }
            width={200}
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {user?.username}
            </h1>
            <p className="text-gray-500">{user?.email || "user@example.com"}</p>
          </div>
        </div>
      </div>

      {/* User Information */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="font-medium md:text-md lg:text-lg font-semibold text-gray-800 mb-4">
          User Information
        </h2>
        <ul className="text-gray-600 text-sm md:text-medium space-y-2">
          <li>
            <strong>Full Name:</strong> {user?.fullName || "N/A"}
          </li>
          <li>
            <strong>Email:</strong> {user?.email || "N/A"}
          </li>
          <li>
            <strong>Phone:</strong> {user?.phone || "N/A"}
          </li>
          <li>
            <strong>Address:</strong> {user?.address || "N/A"}
          </li>
        </ul>
      </div>

      {/* Bio Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-medium  md:text-medium lg:text-lg xl:text-xl font-semibold text-gray-800 mb-4">
          Bio
        </h2>
        <p className="text-gray-600">
          {user?.bio || "This user hasn't written a bio yet."}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-medium md:text-medium lg:text-lg xl:text-xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            as={Link}
            className="bg-[#fd6506] text-white hover:bg-orange-700"
            href="/products"
            radius="sm"
            size="sm"
          >
            View Products
          </Button>

          <Button
            as={Link}
            className="bg-blue-500 text-white hover:bg-blue-600"
            href="/orders"
            radius="sm"
            size="sm"
          >
            Manage Orders
          </Button>

          <Button
            as={Link}
            className="bg-gray-500 text-white hover:bg-gray-600"
            href="/profile/edit"
            radius="sm"
            size="sm"
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
