"use client";

import { useGetAllOrderQuery } from "@/src/redux/feature/order/order.api";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import Image from "next/image";

const OrderTablePage = () => {
  // Fetch order data using Redux Query
  const {
    data: orderData,
    isLoading,
    isError,
  } = useGetAllOrderQuery(undefined);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders</div>;

  console.log(orderData, "Order Data");

  return (
    <Table removeWrapper aria-label="Order Items Table">
      <TableHeader>
        <TableColumn>Order ID</TableColumn>
        <TableColumn>Product Name</TableColumn>
        <TableColumn>Quantity</TableColumn>
        <TableColumn>Price</TableColumn>
        <TableColumn>Image</TableColumn>
      </TableHeader>
      <TableBody>
        {orderData?.data?.map((order) =>
          order.orderItems?.map((item, index) => (
            <TableRow key={`${order.id}-${index}`}>
              <TableCell>{order.id}</TableCell>
              <TableCell>{item?.product?.name || "N/A"}</TableCell>
              <TableCell>{item.quantity || "N/A"}</TableCell>
              <TableCell>${item.price || "N/A"}</TableCell>
              <TableCell>
                {item?.product?.images ? (
                  <Image
                    src={item?.product?.images || "/default-image.png"} // Fallback to a placeholder
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
          ))
        )}
      </TableBody>
    </Table>
  );
};

export default OrderTablePage;
