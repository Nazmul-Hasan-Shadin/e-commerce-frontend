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
import { SearchIcon } from "../../icons.jsx";
import React from "react";
import { GiSelfLove } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FcCustomerSupport } from "react-icons/fc";
import { LiaFlagUsaSolid } from "react-icons/lia";

const BottomNav = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(true);

  return (
    <div className="">
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        className="bg-[#ffffff] p-4 text-white"
        maxWidth="full"
      >
        {/* logo */}

        {/* <NavbarContent className="sm:hidden">
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />
        </NavbarContent> */}

        <NavbarBrand className="flex gap-5">
          <AiOutlineMenuUnfold className="text-primary-color text-3xl " />
          <p className="text-black font-medium text-2xl">Categories</p>
        </NavbarBrand>

        {/* ================icnons============ */}

        <NavbarContent className="hidden sm:flex" justify="center">
          <NavbarItem>
            <Link color="foreground">Home</Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground">Product</Link>
          </NavbarItem>

          <NavbarItem>
            <Link color="foreground">Dashboard</Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground">About</Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground">Login</Link>
          </NavbarItem>
        </NavbarContent>

        {/* =========================for small device menu====================== */}

        {/* <NavbarMenu className="z-20 ">
          <NavbarItem className="text-white">
            <Link className="text-black">Home</Link>
          </NavbarItem>

          <NavbarItem>
            <Link className="text-black">Product</Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-black">Dashboard</Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-black">About</Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-black">Login</Link>
          </NavbarItem>
        </NavbarMenu> */}

        <NavbarContent justify="end">
          <NavbarItem className="flex justify-center items-center gap-2">
            <FcCustomerSupport className="text-3xl" />
            <p className="text-md text-black"> Help</p>
          </NavbarItem>

          <NavbarItem className="flex justify-center items-center gap-2">
            <LiaFlagUsaSolid className="text-3xl text-red-400" />

            <p className="text-md text-black"> En / Us</p>
          </NavbarItem>
        </NavbarContent>

        {/* ==================Navbar rightside content=========== */}
      </Navbar>
    </div>
  );
};

export default BottomNav;
