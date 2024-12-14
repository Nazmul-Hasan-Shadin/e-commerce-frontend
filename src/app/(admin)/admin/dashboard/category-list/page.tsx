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
  useUpdateProductMutation,
} from "@/src/redux/feature/vendor/vendor.api";
import toast from "react-hot-toast";
import Link from "next/link";
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "@/src/redux/feature/admin/admin.categoryapi";
import Image from "next/image";

const primaryColor = "#4524DB";

const CategoryListPage = () => {
  const { data: categroyList, isLoading } = useGetAllCategoryQuery("");
  const [handleUpdateProduct] = useUpdateProductMutation();
  const [handleDeleteCategory] = useDeleteCategoryMutation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const category = categroyList?.data || [];

  const handleEdit = (id: string) => {};

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );
    if (confirmDelete) {
      try {
        await handleDeleteCategory(id);
        toast.success("Category deleted successful");
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
        Category Management
      </h1>
      <Table aria-label="Product List">
        <TableHeader>
          <TableColumn>Category NAME</TableColumn>
          <TableColumn>Images</TableColumn>

          <TableColumn>ACTIONS</TableColumn>
        </TableHeader>
        <TableBody>
          {category.map((category: any) => (
            <TableRow key={category.id}>
              <TableCell>{category.name}</TableCell>

              <TableCell>
                {category?.images ? (
                  <Image
                    src={category.images}
                    width={80}
                    height={80}
                    alt="categor imageas"
                    className="rounded-full"
                  />
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>
                <div style={{ display: "flex", gap: "10px" }}>
                  <Link
                    href={`/admin/dashboard/update-category/${category.id}`}
                  >
                    <Tooltip content="Edit Product" placement="top">
                      <MdEdit
                        size={20}
                        color={primaryColor}
                        style={{ cursor: "pointer" }}
                        onClick={() => handleEdit(category.id)}
                      />
                    </Tooltip>
                  </Link>
                  <Tooltip content="Delete Product" placement="top">
                    <MdDelete
                      size={20}
                      color="red"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleDeleteCategory(category.id)}
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

export default CategoryListPage;
