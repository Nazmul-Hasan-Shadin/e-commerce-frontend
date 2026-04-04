"use client";
import React from "react";
import { useParams } from "next/navigation";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";

import { useGetOrderItemsFromOrderQuery, useGetOrderItemsQuery } from "@/src/redux/feature/order/order.api";

const OrderItems = () => {
  const params = useParams<{ orderId: string }>();

  const { data, isLoading } = useGetOrderItemsFromOrderQuery(params.orderId);

  const items = data?.data || [];
  console.log(items);
  

  console.log(items);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="w-full overflow-x-auto p-4">
      <Table isCompact isStriped aria-label="Order Items Table">
        <TableHeader>
          <TableColumn>Product</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Quantity</TableColumn>
          <TableColumn>Subtotal</TableColumn>
        </TableHeader>

        <TableBody emptyContent="No order items found">
          {items.map((item: any) => (
            <TableRow key={item.id}>
              <TableCell>{item.product?.name || "No Product"}</TableCell>

              <TableCell>৳ {item.price}</TableCell>

              <TableCell>{item.quantity}</TableCell>

              <TableCell>৳ {item.price * item.quantity}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default OrderItems;
