"use client";
import React, { useState } from "react";
import { Card, CardBody, Pagination } from "@nextui-org/react";
import { BsBagDash } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa6";
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
} from "@nextui-org/react";
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

const chartData = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

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

  const tableColumns: TableColumn[] = [
    { name: "NAME", uid: "name" },
    { name: "LOGO", uid: "logo" },
    { name: "EMAIL", uid: "email" },
    { name: "ACTIONS", uid: "action" },
  ];

  const renderCell = (user: UserData, columnKey: keyof UserData) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ src: user.logo }}
            description={user.description}
            name={user.name}
          />
        );
      case "logo":
        return <img alt={`${user.name}'s logo`} src={user.logo} width="40" />;
      case "email":
        return <span>{user.email}</span>;
      case "action":
        return (
          <div className="flex flex-col gap-2">
            <p className="font-bold">100</p>
            <p className="text-gray-400">sales</p>
          </div>
        );
      default:
        return user[columnKey];
    }
  };

  // Paginate the data
  const paginateData = (data: UserData[]) => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;

    return data.slice(startIndex, endIndex);
  };

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
        <Card className="p-4" shadow="sm">
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
        <Card className="p-4" shadow="sm">
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
        <Card className="p-4" shadow="sm">
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

      {/* ====================bar and pie chart================== */}

      <div className="flex-col lg:flex lg:flex-row  gap-3">
        <div className=" h-[300] lg:h-[400px] w-full flex-1">
          <ResponsiveContainer height="100%" width="100%">
            <BarChart
              barSize={20}
              className="w-full"
              data={chartData}
              height={300}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
              width={500}
            >
              <XAxis
                dataKey="name"
                padding={{ left: 10, right: 10 }}
                scale="point"
              />
              <YAxis />
              <Tooltip />
              <Legend />
              <CartesianGrid strokeDasharray="3 3" />
              <Bar background={{ fill: "#eee" }} dataKey="pv" fill="#8884d8" />
              <Bar dataKey="uv" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Shop Table */}
        <div className="flex-1 w-full h-full">
          <Table aria-label="Shop Table">
            <TableHeader>
              {tableColumns.map((column) => (
                <TableColumn key={column.name}>{column.name}</TableColumn>
              ))}
            </TableHeader>
            <TableBody>
              {paginateData(allshopTopTen?.data || []).map((user) => (
                <TableRow key={user.id}>
                  {tableColumns.map(({ uid }) => (
                    <TableCell key={uid}>{renderCell(user, uid)}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <Pagination
            initialPage={currentPage}
            total={Math.ceil(allshopTopTen?.data?.length || 0)} // Total pages
            onChange={(page) => setCurrentPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
