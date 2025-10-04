"use client";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Pagination,
  Button,
  Divider,
  Input,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from "@heroui/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTrash, FaTurnDown } from "react-icons/fa6";
import toast from "react-hot-toast";
import { format } from "date-fns";

import {
  useGetAllProductQuery,
  useUpdateProductMutation,
} from "@/src/redux/feature/vendor/vendor.api";
import { useDeleteCategoryMutation } from "@/src/redux/feature/admin/admin.categoryapi";

const columns = [
  {
    key: "shop",
    label: "Shop",
  },
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "images",
    label: "Image",
  },

  {
    key: "category",
    label: "Category",
  },
  {
    key: "price",
    label: "Price",
  },
  {
    key: "createdAt",
    label: "CreatedAt",
  },
  {
    key: "action",
    label: "Action",
  },
];
const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "images",
  "price",
  "shop",
  "category",
  "createdAt",
  "action",
];

function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const Tablecib = () => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["2"]));
  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const { data: categroyList, isLoading } = useGetAllProductQuery("");
  const [handleUpdateProduct] = useUpdateProductMutation();
  const [handleDeleteCategory] = useDeleteCategoryMutation();

  const products = categroyList?.data?.data || [];

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...products];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    // if (
    //   statusFilter !== "all" &&
    //   Array.from(statusFilter).length !== statusOptions.length
    // ) {
    //   filteredUsers = filteredUsers.filter((user) =>
    //     Array.from(statusFilter).includes(user.status)
    //   );
    // }

    return filteredUsers;
  }, [products, filterValue, statusFilter]);

  const rowsPerPage = 7;

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const SearchIcon = (props: any) => {
    return (
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        height="1em"
        role="presentation"
        viewBox="0 0 24 24"
        width="1em"
        {...props}
      >
        <path
          d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
        <path
          d="M22 22L20 20"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    );
  };

  const onSearchChange = React.useCallback((value: string) => {
    console.log("search value", value);

    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = React.useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  //  for visible and unvisible column filter

  const headerColumns = React.useMemo(() => {
    // if (visibleColumns === "all") return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.key),
    );
  }, [visibleColumns]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  const handleEdit = (id: string) => {};

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
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
    <div>
      <div className="p-6 bg-white">
        <div className="flex justify-between">
          <h2 className="md:text-md lg:text-xl font-bold text-gray-800 ">
            Manage Category
          </h2>
          <Link href={"/admin/dashboard/category"}>
            <Button className="bg-primary-color text-white rounded-sm">
              {" "}
              Create Category
            </Button>
          </Link>
        </div>
        <Divider className="my-4" />

        {/*  search and filter */}

        <div className="flex justify-between py-4">
          <h2 className="md:text-md lg:text-xl font-bold text-gray-800 ">
            <Input
              isClearable
              className="w-full border"
              placeholder="Search by name..."
              startContent={<SearchIcon />}
              value={filterValue}
              onClear={() => onClear()}
              onValueChange={onSearchChange}
            />
          </h2>

          <Dropdown>
            <DropdownTrigger className="hidden sm:flex">
              <Button
                className="rounded-none border-2 text-lg"
                startContent={<FaTurnDown className="text-small" />}
                variant="bordered"
              >
                Views
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              aria-label="Table Columns"
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={(keys) =>
                setVisibleColumns(
                  keys === "all"
                    ? new Set(INITIAL_VISIBLE_COLUMNS)
                    : new Set(keys as Set<string>),
                )
              }
            >
              {columns.map((column) => (
                <DropdownItem key={column.key} className="capitalize">
                  {capitalize(column.label)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>

        <Table
          aria-label="Controlled table example with dynamic content"
          bottomContent={
            <div className="flex w-full my-3 justify-end">
              <Pagination
                isCompact
                showControls
                showShadow
                color="default"
                page={page}
                total={pages}
                onChange={(page) => setPage(page)}
              />
            </div>
          }
          className="flex items-center"
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          onSelectionChange={(keys) => {
            // Convert keys to string safely
            const stringKeys = new Set(Array.from(keys).map(String));

            setSelectedKeys(stringKeys);
          }}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label} </TableColumn>
            )}
          </TableHeader>

          <TableBody items={items}>
            {(item) => {
              console.log(item, "iam item");

              return (
                <TableRow key={item.id} className="border">
                  {(columnKey) => (
                    <TableCell>
                      {columnKey === "images" ? (
                        <Image
                          alt=""
                          height={400}
                          src={item?.images[0]}
                          width={50}
                        />
                      ) : columnKey === "category" ? (
                        getKeyValue(item?.category?.name, columnKey)
                      ) : columnKey === "shop" ? (
                        getKeyValue(item?.shop?.name, columnKey)
                      ) : columnKey === "action" ? (
                        <div className="flex gap-4">
                          <FaTrash
                            className="text-2xl text-primary-color"
                            onClick={() => handleDelete(item.id)}
                          />
                        </div>
                      ) : columnKey === "createdAt" ? (
                        format(
                          new Date(getKeyValue(item, columnKey)),
                          "dd/MM/yyyy",
                        )
                      ) : (
                        getKeyValue(item, columnKey)
                      )}
                    </TableCell>
                  )}
                </TableRow>
              );
            }}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Tablecib;
