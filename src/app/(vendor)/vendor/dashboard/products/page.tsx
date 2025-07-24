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
  Button,
} from "@heroui/react";
import { MdEdit, MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";

import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import {
  useDeleteProductMutation,
  useGetProductByShopIdQuery,
} from "@/src/redux/feature/vendor/vendor.api";

const primaryColor = "#4524DB";

const GetAllProductPage = () => {
  const { data: vendorInfo } = useGetCurrentUserQuery(undefined);
  const shopId = vendorInfo?.data?.shop?.id;
  const { data: productList, isLoading } = useGetProductByShopIdQuery(shopId);
  const [handleDeleteProduct] = useDeleteProductMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const products = productList?.data || [];

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (confirmDelete) {
      try {
        await handleDeleteProduct({ id });
        toast.success("Product deleted successfully");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("Failed to delete");
      }
    }
  };

  return (
    <div className="p-6">
      <div className="mb-5 space-y-1">
        <h1 className="text-2xl font-bold">Product Management</h1>
        <p className="text-medium">Create product or delete</p>
      </div>
      <div className="flex justify-end mx-8 my-4">
        <Button className="bg-primary-color text-white p-3">
          {" "}
          <FaPlus className="text-xl" /> Add Product
        </Button>
      </div>
      <Table aria-label="Product List">
        <TableHeader>
          <TableColumn>PRODUCT NAME</TableColumn>
          <TableColumn>PRICE</TableColumn>
          <TableColumn>INVENTORY</TableColumn>
          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {products.map((product: any, index: number) => (
            <TableRow key={product.id}>
              <TableCell className="text-medium">{product.name}</TableCell>
              <TableCell>${product.price.toFixed(2)}</TableCell>
              <TableCell>{product.inventoryCount}</TableCell>
              <TableCell>
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                  }}
                >
                  <Link
                    href={`/vendor/dashboard/products/update-product/${product.id}`}
                  >
                    <Tooltip content="Edit Product" placement="top">
                      <MdEdit
                        color={primaryColor}
                        size={40}
                        style={{
                          cursor: "pointer",
                          padding: "8px",
                          borderRadius: "8px",
                          transition: "background-color 0.3s ease",
                          backgroundColor: "rgba(69, 36, 219, 0.1)",
                        }}
                      />
                    </Tooltip>
                  </Link>
                  <Tooltip content="Delete Product" placement="top">
                    <MdDelete
                      color="red"
                      size={40}
                      style={{
                        cursor: "pointer",
                        padding: "8px",
                        borderRadius: "8px",
                        transition: "background-color 0.3s ease",
                        backgroundColor: "rgba(255, 0, 0, 0.1)",
                      }}
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
