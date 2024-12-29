"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Input,
  DropdownItem,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  Avatar,
  NavbarMenuToggle,
  NavbarMenu,
} from "@nextui-org/react";
import { IoSearchOutline } from "react-icons/io5";

import logo from "@/src/assests/icon/logo.png";
import Image from "next/image.js";

import React, { useEffect, useState } from "react";
import { GiSelfLove } from "react-icons/gi";
import { CartIcon, UserIcon, WatchListIcon } from "../../icons";
import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";
import SearchResultList from "./SearchResultList";
import { skipToken } from "@reduxjs/toolkit/query";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [searchQuery, setSearchQuery] = useState<string | null>();
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<
    string | null
  >();

  const icons = [
    { Icon: WatchListIcon, label: "watchlist" },
    { Icon: UserIcon, label: "signin" },
    { Icon: CartIcon, label: "cart", path: "/cart" },
  ];

  const handeSearch = (e: any) => {
    const searchValue = e.target.value;
    setSearchQuery(searchValue);
  };

  useEffect(() => {
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  }, [searchQuery]);

  const { data: searchResult } = useGetAllProductQuery(
    debouncedSearchQuery ? { searchTerm: debouncedSearchQuery } : skipToken
  );

  return (
    <div className="hidden lg:block">
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        className="bg-primary-color p-4 text-white"
        maxWidth="full"
      >
        {/* logo */}

        <NavbarContent className="sm:hidden">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent>

        <NavbarBrand className="flex gap-0">
          <Image alt="Navbar logo" src={logo} width={180} height={100} />
        </NavbarBrand>

        <NavbarContent className="flex-col gap-1 ">
          <p className="">Available 24/7 at</p>
          <p>091 234-ELLA</p>
        </NavbarContent>

        <NavbarContent className="hidden md:flex relative">
          <Input
            onChange={(e) => handeSearch(e)}
            classNames={{
              base: "max-w-full",
              inputWrapper:
                "h-full  font-bold  text-default-500 text-2xl  pr-6 bg-default-400/20 dark:bg-default-500/20",
              mainWrapper: "w-[500px] h-12",
            }}
            endContent={<IoSearchOutline />}
            placeholder="search here"
            className="rouded-full bg-white rounded-full "
            size="md"
          />

          {searchResult && (
            <SearchResultList searchResult={searchResult?.data} />
          )}
        </NavbarContent>

        {/* ================icnons============ */}

        <NavbarContent justify="end">
          {icons.map((icon, index) => (
            <NavbarItem key={index}>
              <div className="text-white flex flex-col justify-center items-center  mx-auto">
                <icon.Icon className="text-4xl" />
                <Link className="text-white" href={icon?.path}>
                  {" "}
                  <span> {icon.label}</span>
                </Link>
              </div>
            </NavbarItem>
          ))}
        </NavbarContent>
        <NavbarContent style={{ opacity: 1 }} as="div" justify="end">
          <Dropdown style={{ opacity: 1 }} placement="bottom-start">
            <DropdownTrigger>
              <Avatar
                as="button"
                className="transition-transform"
                color="secondary"
                name="Jason Hughes"
                isBordered
                src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                size="sm"
              />
            </DropdownTrigger>
            <DropdownMenu
              style={{ opacity: 1 }}
              aria-label="Profile Actions"
              className="z-20 opacity-5"
            >
              <DropdownItem key={"profile"}>My Profile</DropdownItem>
              <DropdownItem key={"h"}>My Profile</DropdownItem>
              <DropdownItem key={"f"}>My Profile</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </NavbarContent>

        {/* =========================for small device menu====================== */}
        {/* 
        <NavbarMenu className="z-20 ">
          {menuItems.map((menu, index) => (
            <NavbarItem key={index} className="text-white">
              <Link href={menu.link} className="text-black">
                {menu.label}
              </Link>
            </NavbarItem>
          ))}
        </NavbarMenu> */}

        {/* ==================Navbar rightside content=========== */}
      </Navbar>
    </div>
  );
};

export default NavBar;
