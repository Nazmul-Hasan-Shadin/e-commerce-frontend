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

import React from "react";
import { GiSelfLove } from "react-icons/gi";
import { CartIcon, UserIcon, WatchListIcon } from "../../icons";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const icons = [
    { Icon: WatchListIcon, label: "watchlist" },
    { Icon: UserIcon, label: "signin" },
    { Icon: CartIcon, label: "cart" },
  ];

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

        <NavbarContent className="hidden md:flex">
          <Input
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
        </NavbarContent>

        {/* ================icnons============ */}

        <NavbarContent justify="end">
          {icons.map((icon, index) => (
            <NavbarItem key={index}>
              <div className="text-white flex flex-col justify-center items-center  mx-auto">
                <icon.Icon className="text-4xl" />
                <span> {icon.label}</span>
              </div>
            </NavbarItem>
          ))}
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
