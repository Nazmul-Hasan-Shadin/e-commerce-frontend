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
  Tooltip,
} from "@heroui/react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTrash, FaTurnDown } from "react-icons/fa6";
import toast from "react-hot-toast";
import { format } from "date-fns";
import { skipToken } from "@reduxjs/toolkit/query";
import { MdEdit } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import {
  useDeleteProductMutation,
  useGetProductByShopIdQuery,
  useUpdateProductMutation,
} from "@/src/redux/feature/vendor/vendor.api";
import Container from "@/src/components/ui/Container";

const columns = [
  {
    key: "images",
    label: "Image",
  },
  {
    key: "name",
    label: "NAME",
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
    label: "Product Uploaded",
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
  "createdAt",
  "action",
];

function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const Vendor = () => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["2"]));
  const [selectRowPerPage, setSelectRowPerPage] = React.useState<number>(4);
  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");

  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS),
  );
  const { data: vendorInfo } = useGetCurrentUserQuery(undefined);

  const shopId = vendorInfo?.data?.shop?.id;

  const {
    data: productList,
    isLoading,
    isFetching,
  } = useGetProductByShopIdQuery(
    shopId
      ? {
          shopId,
          limit: selectRowPerPage,
          page,
          searchTerm: filterValue,
        }
      : skipToken,
  );

  const [handleUpdateProduct] = useUpdateProductMutation();

  const [handleDeleteProduct] = useDeleteProductMutation();

  const products = productList?.data?.data || [];
  const meta = productList?.data?.meta;
  const hasSearchFilter = Boolean(filterValue);

  const pages = Math.ceil(meta?.total / selectRowPerPage);

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

  const handleEdit = (id: string) => {};

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

  // if (isLoading || items.length === 0 || isFetching) {
  //   return (
  //     <div className="p-6 bg-white">
  //       {/* Skeleton Table */}
  //       {[...Array(3)].map((_, idx) => (
  //         <div key={idx} className="flex items-center gap-4 mb-4">
  //           <div className="h-16 w-20 bg-gray-200 animate-pulse rounded" />
  //           <div className="flex-1 space-y-2">
  //             <div className="h-4 w-1/2 bg-gray-200 animate-pulse rounded" />
  //             <div className="h-4 w-1/3 bg-gray-200 animate-pulse rounded" />
  //           </div>
  //         </div>
  //       ))}
  //     </div>
  //   );
  // }

  console.log(selectRowPerPage);

  return (
    <Container>
      <div>
        <div className=" p- md:p-4 lg:p-6 bg-white">
          <div className="flex justify-between items-center">
            <h2 className="text-medium md:text-md lg:text-xl font-bold text-gray-800 ">
              Manage Product
            </h2>
            <Link href={"/vendor/dashboard/product"}>
              <Button className="bg-primary-color text-white rounded-sm">
                {" "}
                Create Product
              </Button>
            </Link>
          </div>
          <Divider className="my-4" />

          {/*  search and filter */}

          <div className="flex justify-between py-4 px-0">
            <h2 className="md:text-md lg:text-xl font-bold text-gray-800 ">
              <Input
                isClearable
                className="w-full  "
                placeholder="Search by name..."
                startContent={<SearchIcon />}
                value={filterValue}
                variant="bordered"
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
                onSelectionChange={(keys) => {
                  // keys can be string | Set<Key> | SharedSelection
                  let newKeys: Set<string>;

                  if (keys instanceof Set) {
                    // multiple selection
                    newKeys = new Set(
                      Array.from(keys).map((k) => k.toString()),
                    );
                  } else {
                    // single selection or SharedSelection object
                    newKeys = new Set([keys.toString()]);
                  }

                  setVisibleColumns(newKeys);
                }}
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
              <div className="flex items-center gap-3 w-full my-3 justify-end">
                <p> Row per page</p>{" "}
                <Dropdown>
                  <DropdownTrigger>
                    <Button className="capitalize" variant="bordered">
                      {selectRowPerPage} <IoIosArrowDown />
                    </Button>
                  </DropdownTrigger>
                  <DropdownMenu
                    disallowEmptySelection
                    aria-label="Single selection example"
                    // selectedKeys={selectedKeys}
                    selectionMode="single"
                    variant="flat"
                    onSelectionChange={(keys) => {
                      const selectedKey = Array.from(keys)[0];

                      if (selectedKey) {
                        setSelectRowPerPage(Number(selectedKey));
                      }
                    }}
                  >
                    <DropdownItem key="5">5</DropdownItem>
                    <DropdownItem key="10">10</DropdownItem>
                    <DropdownItem key="15">15</DropdownItem>
                  </DropdownMenu>
                </Dropdown>
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
              const newKeys =
                keys instanceof Set
                  ? new Set(Array.from(keys).map((k) => k.toString()))
                  : new Set([keys.toString()]);

              setSelectedKeys(newKeys);
            }}
          >
            <TableHeader columns={headerColumns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label} </TableColumn>
              )}
            </TableHeader>

            <TableBody items={products}>
              {(item: { id: string; images: string[] }) => (
                <TableRow key={item.id} className="border-gray-200 border p-0">
                  {(columnKey) => (
                    <TableCell>
                      {columnKey === "images" ? (
                        <Image
                          alt=""
                          height={70}
                          src={item?.images[0]}
                          width={80}
                        />
                      ) : columnKey === "action" ? (
                        <div className="flex gap-4">
                          <Link
                            href={`/vendor/dashboard/products/update-product/${item?.id}`}
                          >
                            <Tooltip content="Edit Product" placement="top">
                              <MdEdit
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
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </Container>
  );
};

export default Vendor;
