"use client";
import React from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";

const ProfilePage = () => {
  const { data: userData } = useGetCurrentUserQuery(undefined);

  const user = userData?.data || {};

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Profile Header */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="flex items-center space-x-4">
          <img
            src={
              user?.avatar || "https://i.pravatar.cc/150?u=a042581f4e29026704d"
            } // Replace with user avatar
            alt="User Avatar"
            className="w-20 h-20 rounded-full object-cover"
          />
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              {user?.username || "User"}
            </h1>
            <p className="text-gray-500">{user?.email || "user@example.com"}</p>
          </div>
        </div>
      </div>

      {/* User Information */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          User Information
        </h2>
        <ul className="text-gray-600 space-y-2">
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
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Bio</h2>
        <p className="text-gray-600">
          {user?.bio || "This user hasn't written a bio yet."}
        </p>
      </div>

      {/* Quick Actions */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Quick Actions
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button
            as={Link}
            href="/products"
            className="bg-[#fd6506] text-white hover:bg-orange-700"
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
            href="/profile/edit"
            className="bg-gray-500 text-white hover:bg-gray-600"
            radius="sm"
            size="lg"
          >
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
