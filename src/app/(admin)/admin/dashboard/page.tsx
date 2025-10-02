"use client";
import React, { useState } from "react";
import { Card, CardBody, Pagination } from "@heroui/react";
import { BsBagDash } from "react-icons/bs";
import { FaDollarSign, FaUser, FaUsers } from "react-icons/fa6";
import { IoCubeOutline } from "react-icons/io5";
import { FaSackDollar } from "react-icons/fa6";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  User,
} from "@heroui/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import { useGetAllShopTopTenQuery } from "@/src/redux/feature/shop/shop.api";
import { useAppSelector } from "@/src/redux/hook";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import { useGetMetaQuery } from "@/src/redux/feature/meta/meta.api";
import { FaUserCircle } from "react-icons/fa";

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);

  const data = {
    earnings: { value: 559250, percentage: 16.24 },
    orders: { value: 36894, percentage: -3.57 },
    customers: { value: 183350000, percentage: 29.08 },
    balance: { value: 165890, percentage: 0.0 },
  };
  const metaInfo = useGetMetaQuery(undefined);
  console.log(metaInfo);

  return (
    <div className="min-h-screen z-10 p-8">
      {/* ==========Greeting section========== */}
      <h1 className="text-2xl font-bold mb-2">
        Good Morning, {shopOwnerInfo?.data?.username}{" "}
      </h1>
      <p className="text-gray-500 mb-6">
        Here&apos;s what&apos;s happening with your store today.
      </p>

      {/* Cards */}
      <div className="grid grid-cols-1 mb-7  md:grid-cols-3 lg:grid-cols-4 gap-6">
        {/* Earnings */}
        <Card className="p-4" shadow="sm">
          <CardBody>
            <div className="flex  gap-9">
              <span className="block w-10 h-10  bg-primary-color rounded-full flex items-center justify-center">
                <FaUser className="text-xl text-white" />
              </span>
              <div>
                <p className="text-[#23232d] text-lg ">Total Vendor</p>
                <h2 className="text-lg font-bold">
                  {metaInfo?.data?.vendorCount}
                </h2>

                <p className="mt-2 inline-block">View net earnings</p>
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
                <p className="text-[#23232d] text-sm ">Total User</p>
                <h2 className="text-lg font-bold">
                  {metaInfo?.data?.userCount}
                </h2>

                <p className="mt-2 inline-block">View net earnings</p>
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
                <p className="text-[#23232d] text-sm ">Total Admin</p>
                <h2 className="text-lg font-bold">
                  {metaInfo?.data?.adminCount}
                </h2>

                <p className="mt-2 inline-block">View net earnings</p>
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
                <p className="text-[#23232d] text-sm ">Total Profit</p>
                <h2 className="text-lg font-bold">
                  {metaInfo?.data?.totalRevenu}
                </h2>

                <p className="mt-2 inline-block">View net earnings</p>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>

      {/* ====================bar and pie chart================== */}
    </div>
  );
};

export default AdminDashboard;
