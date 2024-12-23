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
import {
  useDeleteProductMutation,
  useGetAllProductQuery,
  useGetProducsByShopIdQuery,
  useUpdateProductMutation,
} from "@/src/redux/feature/vendor/vendor.api";
import toast from "react-hot-toast";
import Link from "next/link";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";

const primaryColor = "#4524DB";

const GetAllProductPage = () => {
  const { data: vendorInfo } = useGetCurrentUserQuery(undefined);
  console.log(vendorInfo, "imam vendiorin info for vendorid");

  const shopId = vendorInfo?.data?.shop?.id;
  const { data: productList, isLoading } = useGetProducsByShopIdQuery(shopId);
  const [handleUpdateProduct] = useUpdateProductMutation();
  const [handleDeleteProduct] = useDeleteProductMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const products = productList?.data || [];

  const handleEdit = (id: string) => {};

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        await handleDeleteProduct({ id });
        toast.success("Product deleted successful");
      } catch (error) {
        console.error("Error deleting product:", error);
        toast.error("failed to deletee");
      }
    }
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
                  <Link
                    href={`/vendor/dashboard/products/update-product/${product.id}`}
                  >
                    <Tooltip content="Edit Product" placement="top">
                      <MdEdit
                        size={20}
                        color={primaryColor}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEdit(product.id)}
                      />
                    </Tooltip>
                  </Link>
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
