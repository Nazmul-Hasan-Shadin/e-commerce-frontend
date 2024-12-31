"use client";
import React, { useState } from "react";
import { Card, CardBody, Button } from "@nextui-org/react";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import { useAppSelector } from "@/src/redux/hook";
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
  Chip,
  Pagination,
} from "@nextui-org/react";
import { useGetAllShopTopTenQuery } from "@/src/redux/feature/shop/shop.api";
import { useGetProducsByShopIdQuery } from "@/src/redux/feature/vendor/vendor.api";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import Container from "@/src/components/ui/Container";

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
  const { data: shopPorductList } = useGetProducsByShopIdQuery(
    shopOwnerInfo?.data?.shop?.id
  );
  const user = useAppSelector((state) => state.auth.user);

  const data = {
    earnings: { value: 559250, percentage: 16.24 },
    orders: { value: 36894, percentage: -3.57 },
    customers: { value: 183350000, percentage: 29.08 },
    balance: { value: 165890, percentage: 0.0 },
  };

  const tableColumns: TableColumn[] = [
    { name: "NAME", uid: "name" },
    { name: "ACTIONS", uid: "action" },
  ];

  const renderCell = (
    user: UserData,
    columnKey: "name" | "logo" | "actions"
  ) => {
    switch (columnKey) {
      case "name":
        return (
          <User
            avatarProps={{ src: user?.logo }}
            description={user?.description}
            name={user?.name}
          />
        );

      case "actions":
        return (
          <div className="flex flex-col gap-2">
            <p className="font-bold">100</p>
            <p className="text-gray-400">sales</p>
          </div>
        );
      default:
        return user[columnKey as keyof UserData];
    }
  };

  // Pagination state for products and top shops
  const [productPage, setProductPage] = useState(1);
  const [shopPage, setShopPage] = useState(1);
  const itemsPerPage = 2;

  const productStartIndex = (productPage - 1) * itemsPerPage;
  const paginatedProducts = shopPorductList?.data.slice(
    productStartIndex,
    productStartIndex + itemsPerPage
  );

  const shopStartIndex = (shopPage - 1) * itemsPerPage;
  const paginatedShops = allshopTopTen?.data.slice(
    shopStartIndex,
    shopStartIndex + itemsPerPage
  );

  const chartDataofSale = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400,
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

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
                <h2 className="text-2xl font-bold">
                  {shopOwnerInfo?.data?.order?.length || 0}
                </h2>
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
      {/* ===========================chart============= */}

      <Container>
        <div className="grid  grid-cols-12">
          <div className="col-span-11 md:col-span-7 w-full h-[300px]">
            <h2 className="text-xl font-bold my-3 pl-2 ">Sell summery</h2>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart width={300} height={100} data={chartDataofSale}>
                <Line
                  type="monotone"
                  dataKey="pv"
                  stroke="#8884d8"
                  strokeWidth={2}
                />
                <YAxis />
                <XAxis dataKey="name" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </Container>

      {/* ==================== Shop and Product Tables ================== */}
      <Container className="mt-10">
        <div className="flex-col lg:flex lg:flex-row gap-3">
          <div className="flex-1">
            <h2 className="text-lg font-semibold p-4">Product list</h2>
            <Table aria-label="Product List">
              <TableHeader columns={tableColumns}>
                {(column) => (
                  <TableColumn key={column.uid}>{column.name}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={paginatedProducts || []}>
                {(user: any) => (
                  <TableRow key={user.id}>
                    {(columnKey: any) => (
                      <TableCell>{renderCell(user, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <Pagination
              className="mt-4"
              color="success"
              total={Math.ceil(
                (shopPorductList?.data.length || 0) / itemsPerPage
              )}
              initialPage={productPage}
              onChange={(page) => setProductPage(page)}
            />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold p-4">Top 10 Shops</h2>
            <Table aria-label="Top Shops">
              <TableHeader columns={tableColumns}>
                {(column) => (
                  <TableColumn key={column.uid}>{column.name}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={paginatedShops || []}>
                {(user: any) => (
                  <TableRow key={user.id}>
                    {(columnKey: any) => (
                      <TableCell>{renderCell(user, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <Pagination
              className="mt-4"
              color="success"
              total={Math.ceil(
                (allshopTopTen?.data.length || 0) / itemsPerPage
              )}
              initialPage={shopPage}
              onChange={(page) => setShopPage(page)}
            />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default AdminDashboard;
