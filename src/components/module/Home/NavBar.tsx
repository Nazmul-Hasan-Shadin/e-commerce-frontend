"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Input,
  NavbarMenuToggle,
} from "@heroui/react";
import { IoSearchOutline } from "react-icons/io5";
import Image from "next/image.js";
import React, { useEffect, useState } from "react";
import { skipToken } from "@reduxjs/toolkit/query";
import Link from "next/link";

import { CartIcon, UserIcon, WatchListIcon } from "../../icons";
import Container from "../../ui/Container";

import SearchResultList from "./SearchResultList";
import UserDropDownMenu from "./UserDropDownMenu";

import { useGetAllProductQuery } from "@/src/redux/feature/vendor/vendor.api";
import logo from "@/src/assests/icon/logo.png";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = useState<string | null>();
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState<
    string | null
  >();

  const icons = [
    { Icon: WatchListIcon, label: "watchlist" },
    { Icon: UserIcon, label: "signin", path: "/login" },
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
    <div className="hidden  lg:block">
      <div className="bg-[var(--primary-color)] z-20">
        <Container>
          <Navbar
            className="p-4 text-white bg-primary-color "
            isMenuOpen={isMenuOpen}
            maxWidth="full"
            onMenuOpenChange={setIsMenuOpen}
          >
            {/* Menu toggle for small device */}

            <NavbarContent className="sm:hidden">
              <NavbarMenuToggle
                aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              />
            </NavbarContent>

            <NavbarBrand className="flex z-20 gap-0">
              <Image alt="Navbar logo" height={100} src={logo} width={180} />
            </NavbarBrand>

            <NavbarContent className="flex-col gap-1 ">
              <p className="">Available 24/7 at</p>
              <p>091 234-ELLA</p>
            </NavbarContent>

            <NavbarContent className="hidden md:flex relative ">
              <Input
                className=" bg-white rounded-full "
                classNames={{
                  base: "max-w-full",

                  inputWrapper:
                    "h-full  font-bold  text-default-500 text-2xl  pr-6 bg-default-400/20 dark:bg-default-500/20",
                  mainWrapper: "w-[500px] h-12",
                }}
                endContent={<IoSearchOutline />}
                placeholder="search here"
                size="md"
                onChange={(e) => handeSearch(e)}
              />

              {debouncedSearchQuery && searchResult?.data.length && (
                <SearchResultList searchResult={searchResult?.data} />
              )}

              <UserDropDownMenu />
            </NavbarContent>

            {/* ================icnons============ */}

            <NavbarContent justify="end">
              {icons.map((icon, index) => (
                <NavbarItem key={index}>
                  <div className="text-white flex flex-col justify-center items-center  mx-auto">
                    <icon.Icon className="text-4xl" />
                    <Link className="text-white" href={`${icon?.path}`}>
                      <span> {icon.label}</span>
                    </Link>
                  </div>
                </NavbarItem>
              ))}
            </NavbarContent>
            {/* ===============user dropDown menue */}

            {/* =========================for small device menu====================== */}

            {/* <NavbarMenu className="z-20 ">∏
          {menuItems.map((menu, index) => (
            <NavbarItem key={index} className="text-white">
              <Link href={menu.link} className="text-black">
                {menu.label}
              </Link>
            </NavbarItem>
          ))}∏
          ∏
        </NavbarMenu>  */}
          </Navbar>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
