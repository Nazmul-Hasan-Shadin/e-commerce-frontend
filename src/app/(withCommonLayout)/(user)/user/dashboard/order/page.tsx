"use client";

import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/react";
import Image from "next/image";

import Container from "@/src/components/ui/Container";
import { TorderItems } from "@/src/redux/feature/cart/cartSlice";
import { useGetAllOrderQuery } from "@/src/redux/feature/order/order.api";

const UserOrderPage = () => {
  // Fetch order data using Redux Query
  const {
    data: orderData,
    isLoading,
    isError,
  } = useGetAllOrderQuery(undefined);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading orders</div>;

  return (
    <Container className="mx-auto">
      <Table removeWrapper aria-label="Order Items Table">
        <TableHeader>
          <TableColumn>Order ID</TableColumn>
          <TableColumn>Product Name</TableColumn>
          <TableColumn>Quantity</TableColumn>
          <TableColumn>Price</TableColumn>
          <TableColumn>Image</TableColumn>
        </TableHeader>
        <TableBody>
          {orderData?.data?.map((order: TorderItems) =>
            order.orderItems?.map((item: any, index: any) => (
              <TableRow key={`${order.id}-${index}`}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{item?.product?.name || "N/A"}</TableCell>
                <TableCell>{item.quantity || "N/A"}</TableCell>
                <TableCell>${item.price || "N/A"}</TableCell>
                <TableCell>
                  {item?.product?.images ? (
                    <div className="flex justify-center items-center">
                      <Image
                        alt="Order product image"
                        className="rounded-full"
                        height={50} // Adjust the height as per your needs
                        src={item?.product?.images || "/default-image.png"} // Fallback to a placeholder
                        width={50} // Adjust the width as per your needs
                      />
                    </div>
                  ) : (
                    "N/A"
                  )}
                </TableCell>
              </TableRow>
            )),
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default UserOrderPage;
