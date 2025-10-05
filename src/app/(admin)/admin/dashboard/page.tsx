"use client";
import React, { useState } from "react";
import { Card, CardBody } from "@heroui/react";
import { FaDollarSign, FaUser, FaUsers } from "react-icons/fa6";
import { FaUserCircle } from "react-icons/fa";

import { useGetAllShopTopTenQuery } from "@/src/redux/feature/shop/shop.api";
import { useAppSelector } from "@/src/redux/hook";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import { useGetMetaQuery } from "@/src/redux/feature/meta/meta.api";

interface TableColumn {
  name: string;
  uid: keyof UserData;
}

interface UserData {
  id: number;
  name: string;
  logo: string;
  description: string;
  email: string;
  action: string;
  avatar: string;
}

const AdminDashboard: React.FC = () => {
  const { data: allshopTopTen } = useGetAllShopTopTenQuery(undefined);
  const { data: shopOwnerInfo } = useGetCurrentUserQuery(undefined);
  const user = useAppSelector((state) => state.auth.user);

  const { data: metaInfo, isLoading } = useGetMetaQuery(undefined);

  if (isLoading) {
    return <div className="text-center text-3xl text">Loading</div>;
  }
  console.log({ metaInfo });

  return (
    <div className="min-h-screen -z-10 p-8">
      {/* ==========Greeting section========== */}
      <h1 className="text-2xl font-bold mb-2">
        Good Morning, {shopOwnerInfo?.data?.username}{" "}
      </h1>
      <p className="text-gray-500 mb-6">
        Here&apos;s what&apos;s happening with your store today.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 mb-7  md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Earnings */}
        <Card className="p-4" shadow="sm">
          <CardBody>
            <div className="flex  gap-9">
              <span className="block w-10 h-10  bg-primary-color rounded-full flex items-center justify-center">
                <FaUser className="text-xl text-white" />
              </span>
              <div>
                <p className="text-[#23232d] text-sm font-bold sm:text-medium md:text-lg ">
                  Total Vendor
                </p>
                <h2 className="text-lg font-bold">{metaInfo?.vendorCount}</h2>

                <p className="mt-2 text-sm  sm:text-medium md:text-lg inline-block">
                  View net earnings
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* user count */}

        <Card className="p-4" shadow="sm">
          <CardBody>
            <div className="flex  gap-9">
              <span className="block w-10 h-10  bg-primary-color rounded-full flex items-center justify-center">
                <FaUsers className="text-xl   text-white" />
              </span>
              <div>
                <p className="text-[#23232d] text-sm font-bold sm:text-medium md:text-lg ">
                  Total User
                </p>
                <h2 className="text-lg font-bold">{metaInfo?.userCount}</h2>

                <p className="mt-2  text-sm  sm:text-medium md:text-lg inline-block">
                  View net earnings
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
        {/* admin count */}

        <Card className="p-4" shadow="sm">
          <CardBody>
            <div className="flex  gap-9">
              <span className="block w-10 h-10  bg-primary-color rounded-full flex items-center justify-center">
                <FaUserCircle className="text-xl   text-white" />
              </span>
              <div>
                <p className="text-[#23232d] text-sm font-bold sm:text-medium md:text-lg ">
                  Total Admin
                </p>
                <h2 className="text-lg font-bold">{metaInfo?.adminCount}</h2>

                <p className="mt-2  text-sm  sm:text-medium md:text-lg inline-block">
                  View net earnings
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/*  total reveunu */}

        <Card className="p-4" shadow="sm">
          <CardBody>
            <div className="flex  gap-9">
              <span className="block w-10 h-10 bg-primary-color rounded-full flex items-center justify-center">
                <FaDollarSign className="text-xl text-white" />
              </span>
              <div>
                <p className="text-[#23232d]text-sm font-bold sm:text-medium md:text-lg ">
                  Total Profit
                </p>
                <h2 className="text-lg font-bold">
                  {metaInfo?.totalRevenu || 0}
                </h2>

                <p className="mt-2  text-sm  sm:text-medium md:text-lg inline-block">
                  View net earnings
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        <h2 className=" text-4xl text-center ">
          chart and feature comming soon{" "}
        </h2>
      </div>

      {/* ====================bar and pie chart================== */}
    </div>
  );
};

export default AdminDashboard;
