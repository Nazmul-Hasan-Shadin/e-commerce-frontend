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
import { FaEdit } from "react-icons/fa";
import { format } from "date-fns";

import { useUpdateProductMutation } from "@/src/redux/feature/vendor/vendor.api";
import { useDeleteCategoryMutation } from "@/src/redux/feature/admin/admin.categoryapi";
import { useGetAllShopsQuery } from "@/src/redux/feature/shop/shop.api";
import { IoIosArrowDown } from "react-icons/io";

const columns = [
  {
    key: "logo",
    label: "Logo",
  },
  {
    key: "name",
    label: "Shop Name",
  },
  {
    key: "totalProduct",
    label: "TotalProduct",
  },
  {
    key: "totalOrder",
    label: "Total Orders",
  },
  {
    key: "totalFollower",
    label: "Total Follower",
  },
  {
    key: "status",
    label: "Status",
  },

  {
    key: "createdAt",
    label: "createdAt",
  },
  {
    key: "action",
    label: "Action",
  },
];
const INITIAL_VISIBLE_COLUMNS = [
  "name",
  "logo",
  "createdAt",
  "totalOrder",
  "status",
  "totalFollower",
  "totalProduct",
  "action",
];

function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const Tablecib = () => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["2"]));
  const [selectRowPerPage, setSelectRowPerPage] = React.useState<number>(4);

  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const { data: shopLists, isLoading } = useGetAllShopsQuery({
    limit: selectRowPerPage,
    page,
    searchTerm: filterValue,
  });
  const [handleUpdateProduct] = useUpdateProductMutation();
  const [handleDeleteCategory] = useDeleteCategoryMutation();

  console.log({ shopLists });

  const shops = shopLists?.data?.data || [];
  const meta = shopLists?.data?.meta;

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
    if (visibleColumns.size === columns.length) return columns;

    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.key)
    );
  }, [visibleColumns]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

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
    <div>
      <div className=" p-2 md:p-4 lg:p-6 bg-white">
        <div className="flex justify-between">
          <h2 className="md:text-md lg:text-xl font-bold text-gray-800 ">
            Shop Name
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
              onSelectionChange={(keys) => {
                // Convert keys to Set<string>
                const newKeys = new Set(
                  keys instanceof Set
                    ? Array.from(keys).map((k) => k.toString())
                    : [keys.toString()]
                );

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
            const newKeys = new Set(
              keys instanceof Set
                ? Array.from(keys).map((k) => k.toString())
                : [keys.toString()]
            );

            setSelectedKeys(newKeys);
          }}
        >
          <TableHeader columns={headerColumns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label} </TableColumn>
            )}
          </TableHeader>

          <TableBody items={shops}>
            {(item: {
              id: string;
              logo: string;
              _count: {
                Order: string;
                product: number;
                shopFollower: number;
              };
            }) => (
              <TableRow key={item.id} className="border p-0">
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "logo" ? (
                      <Image alt="" height={70} src={item?.logo} width={80} />
                    ) : columnKey === "action" ? (
                      <div className="flex gap-4">
                        <FaEdit
                          className="text-2xl  text-primary-color"
                          onClick={() => handleEdit(item.id)}
                        />

                        <FaTrash
                          className="text-2xl text-primary-color"
                          onClick={() => handleDelete(item.id)}
                        />
                      </div>
                    ) : columnKey === "totalOrder" ? (
                      getKeyValue(item._count.Order, columnKey)
                    ) : columnKey === "totalProduct" ? (
                      getKeyValue(item._count.product, columnKey)
                    ) : columnKey === "totalFollower" ? (
                      getKeyValue(item._count.shopFollower, columnKey)
                    ) : columnKey === "createdAt" ? (
                      format(
                        new Date(getKeyValue(item, columnKey)),
                        "dd/MM/yyyy"
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
  );
};

export default Tablecib;
