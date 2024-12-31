"use client";

import { TorderItems } from "@/src/redux/feature/cart/cartSlice";
import { useGetAllOrderQuery } from "@/src/redux/feature/order/order.api";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
} from "@nextui-org/react";
import Image from "next/image";
import { useState } from "react";

const AdminOrderTables = () => {
  const {
    data: orderData,
    isLoading,
    isError,
  } = useGetAllOrderQuery(undefined);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Number of items per page

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders</div>;

  // Calculate pagination
  const totalItems =
    orderData?.data?.reduce(
      (acc: number, order: TorderItems) => acc + order.orderItems?.length,
      0
    ) || 0;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Paginate the data
  const paginateData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const items: any[] = [];

    orderData?.data?.forEach((order: TorderItems) => {
      order.orderItems?.forEach((item: any) => {
        items.push(item);
      });
    });

    return items.slice(startIndex, startIndex + itemsPerPage);
  };

  return (
    <div className="min-h-screen z-10 p-8">
      <h1 className="text-2xl font-bold mb-2">Order Details</h1>
      <p className="text-gray-500 mb-6">
        Here are the details of the recent orders.
      </p>

      <div className="overflow-x-auto bg-white rounded-lg shadow-lg p-4">
        <Table removeWrapper aria-label="Order Items Table">
          <TableHeader>
            <TableColumn>Order ID</TableColumn>
            <TableColumn>Product Name</TableColumn>
            <TableColumn>Quantity</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Image</TableColumn>
          </TableHeader>
          <TableBody>
            {paginateData().map((item, index) => (
              <TableRow key={`${item.product?.id}-${index}`}>
                <TableCell>{item?.orderId || "N/A"}</TableCell>
                <TableCell>{item?.product?.name || "N/A"}</TableCell>
                <TableCell>{item.quantity || "N/A"}</TableCell>
                <TableCell>${item.price || "N/A"}</TableCell>
                <TableCell>
                  {item?.product?.images ? (
                    <Image
                      src={item?.product?.images[0] || "/default-image.png"}
                      width={30}
                      height={30}
                      className="rounded-full"
                      alt="Order product image"
                    />
                  ) : (
                    "N/A"
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4">
        <Pagination
          initialPage={currentPage}
          total={totalPages}
          onChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default AdminOrderTables;
