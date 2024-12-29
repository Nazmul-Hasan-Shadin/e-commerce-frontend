"use client";
import React from "react";
import { Card, CardBody, Button, Input } from "@nextui-org/react";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import Link from "next/link";
import { useAppSelector } from "@/src/redux/hook";
import { BsBagDash } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa6";
import { IoCubeOutline } from "react-icons/io5";
import { FaSackDollar } from "react-icons/fa6";

const AdminDashbaord = () => {
  const { data: shopOwnerInfo } = useGetCurrentUserQuery(undefined);
  const user = useAppSelector((state) => state.auth.user);
  const data = {
    earnings: { value: 559250, percentage: 16.24 },
    orders: { value: 36894, percentage: -3.57 },
    customers: { value: 183350000, percentage: 29.08 },
    balance: { value: 165890, percentage: 0.0 },
  };

  return (
    <div className="min-h-screen  z-10 p-8">
      {/* ==========Greeeting section========== */}
      <h1 className="text-2xl font-bold mb-2">
        Good Morning, {shopOwnerInfo?.data?.username}{" "}
      </h1>
      <p className="text-gray-500 mb-6">
        Herecles whats happening with your store today.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Earnings */}
        <Card shadow="sm" className="p-4">
          <CardBody>
            <div className="flex  gap-4">
              <span className="block w-10 h-10 bg-[#8B7EFF] rounded-full flex items-center justify-center">
                <BsBagDash className="text-xl text-white" />
              </span>
              <div>
                <p className="text-[#23232d] text-sm ">TOTAL EARNINGS</p>
                <h2 className="text-2xl font-bold">
                  ${data.earnings.value.toLocaleString()}k
                </h2>

                <p className="text-blue-500 mt-2 inline-block">
                  View net earnings
                </p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Orders */}
        <Card shadow="sm" className="p-4">
          <CardBody>
            <div className="flex gap-4">
              <span className="block w-10 h-10 bg-orange-500 rounded-full flex items-center justify-center">
                <FaDollarSign className="text-xl text-white" />
              </span>

              <div>
                <p className="text-gray-500">ORDERS</p>
                <h2 className="text-2xl font-bold">{data.orders.value}</h2>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Customers */}
        <Card shadow="sm" className="p-4">
          <CardBody>
            <div className="flex gap-4">
              <span className="block w-10 h-10 bg-[#8B7EFF] rounded-full flex items-center justify-center">
                <IoCubeOutline />
              </span>
              <div>
                <p className="text-gray-500">CUSTOMERS</p>
                <h2 className="text-2xl font-bold">
                  {(data.customers.value / 1000000).toFixed(2)}M
                </h2>
                <p className="text-green-500 font-medium">
                  ↑ +{data.customers.percentage} %
                </p>
                <p className="text-blue-500 mt-2 inline-block">See details</p>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Balance */}
        <Card shadow="sm" className="p-4">
          <CardBody>
            <div className="flex gap-4">
              <span className="block w-10 h-10 bg-[#2E8EF7] rounded-full flex items-center justify-center">
                <FaSackDollar className="text-white" />
              </span>
              <div>
                <p className="text-gray-500">MY BALANCE</p>
                <h2 className="text-2xl font-bold">
                  ${data.balance.value.toLocaleString()}k
                </h2>
                <p className="text-gray-400 font-medium">
                  +{data.balance.percentage} %
                </p>
                <p className="text-blue-500 mt-2 inline-block">
                  Withdraw money
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashbaord;
