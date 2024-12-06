"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";

const OrderTablePage = ({ orderData }: { orderData: any }) => {
  // Define columns for the table
  const columns = [
    { key: "productId", label: "Product ID" },
    { key: "quantity", label: "Quantity" },
    { key: "price", label: "Price" },
    { key: "total", label: "Total" },
  ];

  // Format the rows for the table
  const rows = orderData?.orderItems?.map((item: any, index: number) => ({
    key: index.toString(),
    productId: item.productId,
    quantity: item.quantity,
    price: item.price,
    total: (item.quantity * item.price).toFixed(2),
  }));

  return (
    <Table aria-label="Order Table with dynamic content">
      <TableHeader>
        {columns.map((column) => (
          <TableColumn key={column.key}>{column.label}</TableColumn>
        ))}
      </TableHeader>
      <TableBody>
        {rows?.map((row) => (
          <TableRow key={row.key}>
            <TableCell>{row.productId}</TableCell>
            <TableCell>{row.quantity}</TableCell>
            <TableCell>{row.price}</TableCell>
            <TableCell>{row.total}</TableCell>
          </TableRow>
        ))}
        {/* Add total amount row */}
        <TableRow>
          <TableCell
            colSpan={3}
            css={{ textAlign: "right", fontWeight: "bold" }}
          >
            Total Amount
          </TableCell>
          <TableCell>{orderData.totalAmount.toFixed(2)}</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default OrderTablePage;
