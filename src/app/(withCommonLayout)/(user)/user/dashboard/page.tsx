"use client";
import React from "react";
import { Button, Divider, Input } from "@heroui/react";
import Link from "next/link";
import Image from "next/image";

import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import { useGetAllOrderQuery } from "@/src/redux/feature/order/order.api";
import { RxCross1 } from "react-icons/rx";

const ProfilePage = () => {
  const { data: userData } = useGetCurrentUserQuery(undefined);
  const { data: userOrder } = useGetAllOrderQuery(undefined);
  const user = userData?.data || {};

  return (
    <div className="min-h-screen bg-gray-50 md:p-8 text-black">
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
      {/* ====================User Information *======================*/}
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
      {/*================ Bio Section =============*/}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h2 className="text-medium  md:text-medium lg:text-lg xl:text-xl font-semibold text-gray-800 mb-4">
          Bio
        </h2>
        <p className="text-gray-600">
          {user?.bio || "This user hasn't written a bio yet."}
        </p>
      </div>
      {/* ==========================Quick Actions=================== */}
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
      <Divider className="w-full my-6 bg-gray-300" />

      <div className="bg-white p-6 mb-8">
        <h3 className="text-black font-semibold text-xl">Track Order</h3>
        <Divider className="w-full my-6 bg-gray-300" />
        <section className="grid grid-cols-12 ">
          <div className="col-span-12 sm:col-span-8 2xl:col-span-12 mr-3  ">
            {/* ==========Tables Header============ */}
            <div className=" grid-cols-8   hidden sm:grid sm:grid-cols-8 font-bold  text-lg text-center p-4">
              <div className="">image</div>
              <div className="col-span-3 text-center">order Date</div>
              <div className="">Shop Name</div>

              <div className="">Price</div>
              <div className="">Status</div>
              <div className="">action</div>
            </div>
            <Divider className="w-full my-6 bg-gray-300" />
            {/* ================cart items under cart row heading=============== */}

            {userOrder?.data?.length > 0 ? (
              <div>
                {userOrder?.data?.map((order: any, index) => (
                  <div key={order?.id}>
                    <div className="">
                      {order.orderItems.map((item: any, index) => {
                        return (
                          <div key={item?.id}>
                            <div
                              key={item.id}
                              className="grid  grid-cols-8 justify-items-center my-4"
                            >
                              <figure>
                                <Image
                                  alt="cart product image"
                                  height={300}
                                  objectFit="contain"
                                  src={item?.product?.images[0]}
                                  width={90}
                                />
                              </figure>

                              <h2 className="col-span-3 text-sm sm:text-medium font-medium md:font-bold">
                                {item?.product?.createdAt}
                              </h2>

                              <div className="flex  justify-center">
                                <Link href={`/shop/${order?.shop?.id}`}>
                                  <p className="text-sm text-primary-color md:text-medium">
                                    {" "}
                                    {order?.shop?.name}{" "}
                                  </p>
                                </Link>
                              </div>

                              <p className="text-sm md:text-medium">
                                ${item?.price * item?.quantity}
                              </p>

                              <p className="text-sm md:text-medium">
                                {order?.status}
                              </p>

                              <Link
                                href={`/user/dashboard/order/order-details/${item?.id}`}
                              >
                                {" "}
                                <p className="text-sm text-primary-color md:text-medium">
                                  view Details
                                </p>
                              </Link>
                            </div>
                            <Divider className="w-full my-6 bg-gray-300" />
                          </div>
                        );
                      })}
                    </div>
                    <Divider className="w-[97%]  mx-auto" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="h-52  flex justify-center items-center">
                <h3 className="text-black">Oh no ! your cart is empty</h3>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
