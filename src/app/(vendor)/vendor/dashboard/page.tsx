"use client";
import React from "react";
import { Card, CardBody, Button, Input } from "@nextui-org/react";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import Link from "next/link";
import { useAppSelector } from "@/src/redux/hook";
import BestSellingAndTopSellers from "./_Component/BesSellerandTopSellProduct";

const Dashboard = () => {
  const { data: shopOwnerInfo } = useGetCurrentUserQuery(undefined);
  const user = useAppSelector((state) => state.auth.user);
  const data = {
    earnings: { value: 559250, percentage: 16.24 },
    orders: { value: 36894, percentage: -3.57 },
    customers: { value: 183350000, percentage: 29.08 },
    balance: { value: 165890, percentage: 0.0 },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-2xl font-bold mb-2">
        Good Morning, {shopOwnerInfo?.data?.username}{" "}
      </h1>
      <p className="text-gray-500 mb-6">
        Herecles whats happening with your store today.
      </p>

      {/* Date Picker and Add Product Button */}
      <div className="flex justify-between items-center mb-8">
        <Input
          type="date"
          className="w-[250px]"
          placeholder="Select Date Range"
        />

        <Button color="primary" className="bg-teal-300 text-white">
          <Link href={`/${user?.role}/create-product`}> Add Product </Link>
        </Button>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-4 gap-6">
        {/* Earnings */}
        <Card shadow="sm" className="p-4">
          <CardBody>
            <p className="text-gray-500">TOTAL EARNINGS</p>
            <h2 className="text-2xl font-bold">
              ${data.earnings.value.toLocaleString()}k
            </h2>
            <p className="text-green-500 font-medium">
              ↑ +{data.earnings.percentage} %
            </p>
            <p className="text-blue-500 mt-2 inline-block">View net earnings</p>
          </CardBody>
        </Card>

        {/* Orders */}
        <Card shadow="sm" className="p-4">
          <CardBody>
            <p className="text-gray-500">ORDERS</p>
            <h2 className="text-2xl font-bold">{data.orders.value}</h2>
            <p className="text-red-500 font-medium">
              ↓ {data.orders.percentage} %
            </p>
            {/* <a  className="text-blue-500 mt-2 inline-block">View all orders</a> */}
          </CardBody>
        </Card>

        {/* Customers */}
        <Card shadow="sm" className="p-4">
          <CardBody>
            <p className="text-gray-500">CUSTOMERS</p>
            <h2 className="text-2xl font-bold">
              {(data.customers.value / 1000000).toFixed(2)}M
            </h2>
            <p className="text-green-500 font-medium">
              ↑ +{data.customers.percentage} %
            </p>
            <p className="text-blue-500 mt-2 inline-block">See details</p>
          </CardBody>
        </Card>

        {/* Balance */}
        <Card shadow="sm" className="p-4">
          <CardBody>
            <p className="text-gray-500">MY BALANCE</p>
            <h2 className="text-2xl font-bold">
              ${data.balance.value.toLocaleString()}k
            </h2>
            <p className="text-gray-400 font-medium">
              +{data.balance.percentage} %
            </p>
            <p className="text-blue-500 mt-2 inline-block">Withdraw money</p>
          </CardBody>
        </Card>
      </div>

      <BestSellingAndTopSellers />
    </div>
  );
};

export default Dashboard;
