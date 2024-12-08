"use client";

import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
} from "@nextui-org/react";
import { MdEdit, MdDelete } from "react-icons/md";
import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";

const primaryColor = "#4524DB";

const GetAllProductPage = () => {
  const { data: productList, isLoading } = useGetAllProductQuery(undefined);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const products = productList?.data || [];

  const handleEdit = (id: string) => {
    console.log(`Edit product with ID: ${id}`);
    // Add edit logic here
  };

  const handleDelete = (id: string) => {
    console.log(`Delete product with ID: ${id}`);
    // Add delete logic here
  };

  return (
    <div className="p-6">
      <h1
        style={{
          fontSize: "24px",
          fontWeight: "bold",
          color: primaryColor,
          marginBottom: "20px",
        }}
      >
        Product Management
      </h1>
      <Table aria-label="Product List">
        <TableHeader>
          <TableColumn>PRODUCT NAME</TableColumn>
          <TableColumn>PRICE</TableColumn>
          <TableColumn>INVENTORY</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {products.map((product: any) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.inventoryCount}</TableCell>
              <TableCell>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Tooltip content="Edit Product" placement="top">
                    <MdEdit
                      size={20}
                      color={primaryColor}
                      style={{ cursor: "pointer" }}
                      onClick={() => handleEdit(product.id)}
                    />
                  </Tooltip>
                  <Tooltip content="Delete Product" placement="top">
                    <MdDelete
                      size={20}
                      color="red"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDelete(product.id)}
                    />
                  </Tooltip>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GetAllProductPage;
