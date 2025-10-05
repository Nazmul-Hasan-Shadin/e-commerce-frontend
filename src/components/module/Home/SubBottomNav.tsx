"use client";
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import React from "react";
import { IoMenuOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";

import { useGetAllCategoryQuery } from "@/src/redux/feature/admin/admin.categoryapi";
import Link from "next/link";

interface ICategory {
  name: string;
  id: string;
}

const SubBottomNavPage = () => {
  const { data: categroyList, isLoading } = useGetAllCategoryQuery("");
  const category: ICategory[] = categroyList?.data || [];

  return (
    <Navbar className=" z-30 sm:hidden">
      <NavbarContent justify="start">
        <NavbarItem className="flex items-center gap-2 p-1 bg-primary-color text-white">
          <IoMenuOutline className="text-3xl text-white" />
          <Dropdown>
            <DropdownTrigger className="text-medium">
              All category
            </DropdownTrigger>

            <DropdownMenu aria-label="Dynamic Actions" items={category}>
              {(item) => (
                <DropdownItem key={item?.id}>
                  {" "}
                  <Link href={`/product/${item?.id}`}> {item.name}</Link>{" "}
                </DropdownItem>
              )}
            </DropdownMenu>
          </Dropdown>
          <IoIosArrowDown className="text-3xl" />
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className=" sm:flex gap-4" justify="end">
        <NavbarItem className="text-black flex items-center gap-2">
          <IoMenuOutline className="text-3xl text-primary-color" />
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};

export default SubBottomNavPage;
