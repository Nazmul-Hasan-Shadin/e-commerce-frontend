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
import {
  useDeleteCategoryMutation,
  useGetAllCategoryQuery,
} from "@/src/redux/feature/admin/admin.categoryapi";
import Image from "next/image";
import Link from "next/link";
import { FaTrash, FaTurnDown } from "react-icons/fa6";
import { useUpdateProductMutation } from "@/src/redux/feature/vendor/vendor.api";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { format } from "date-fns";

const columns = [
  {
    key: "name",
    label: "NAME",
  },
  {
    key: "images",
    label: "Image",
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
const INITIAL_VISIBLE_COLUMNS = ["name", "images", "createdAt", "action"];

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const Tablecib = () => {
  const [selectedKeys, setSelectedKeys] = React.useState(new Set(["2"]));
  const [page, setPage] = React.useState(1);
  const [filterValue, setFilterValue] = React.useState("");
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const { data: categroyList, isLoading } = useGetAllCategoryQuery("");
  const [handleUpdateProduct] = useUpdateProductMutation();
  const [handleDeleteCategory] = useDeleteCategoryMutation();

  const category = categroyList?.data || [];

  const hasSearchFilter = Boolean(filterValue);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...category];

    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }

    return filteredUsers;
  }, [category, filterValue, statusFilter]);

  const rowsPerPage = 3;

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems]);

  const SearchIcon = (props) => {
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

  const onSearchChange = React.useCallback((value) => {
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
    if (visibleColumns === "all") return columns;

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
      <div className=" p- md:p-4 lg:p-6 bg-white">
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
              onSelectionChange={setVisibleColumns}
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
          className="flex items-center"
          selectedKeys={selectedKeys}
          selectionMode="multiple"
          onSelectionChange={setSelectedKeys}
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
        >
          <TableHeader  columns={headerColumns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label} </TableColumn>
            )}
          </TableHeader>

          <TableBody items={items}>
            {(item) => (
              <TableRow className="border p-0" key={item.id}>
                {(columnKey) => (
                  <TableCell>
                    {columnKey === "images" ? (
                      <Image width={80} height={70} src={item?.images} alt="" />
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
