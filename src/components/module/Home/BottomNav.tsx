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

import { SearchIcon } from "../../icons.jsx";
import React from "react";
import { GiSelfLove } from "react-icons/gi";
import { RxAvatar } from "react-icons/rx";
import { IoCartOutline } from "react-icons/io5";
import { AiOutlineMenuUnfold } from "react-icons/ai";
import { FcCustomerSupport } from "react-icons/fc";
import { LiaFlagUsaSolid } from "react-icons/lia";
import { MdKeyboardArrowDown } from "react-icons/md";
import logo from "@/src/assests/icon/bottomnavlogo.avif";
import Image from "next/image.js";

const BottomNav = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="">
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        className="bg-[#ffffff] p-0 sm:p-4 text-white "
        maxWidth="full"
      >
        <NavbarContent className="text-black flex gap-12 lg:hidden">
          <NavbarMenuToggle
            className="text-block"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          />

          <NavbarItem>
            <IoSearchOutline className="text-black font-bold text-3xl" />
          </NavbarItem>
        </NavbarContent>

        {/* ==========logo for big devie=========== */}
        <NavbarBrand className="flex gap-5 items-center hidden lg:flex">
          <AiOutlineMenuUnfold className="text-primary-color text-3xl " />
          <p className="text-black font-medium text-2xl">Categories</p>

          <MdKeyboardArrowDown className="text-black text-xl" />
        </NavbarBrand>

        {/* =============logo for small device=========== */}

        <NavbarBrand className="flex  lg:hidden gap-0 -p-16">
          <Image alt="Navbar logo" src={logo} width={150} height={50} />
        </NavbarBrand>

        {/* ================ menu for large device============ */}

        <NavbarContent className="gap-20 hidden lg:flex" justify="center">
          <NavbarItem className="text-xl ">
            <Link color="foreground">Home</Link>
          </NavbarItem>
          <NavbarItem className="text-xl ">
            <Link color="foreground">Product</Link>
          </NavbarItem>

          <NavbarItem className="text-xl ">
            <Link color="foreground">Dashboard</Link>
          </NavbarItem>
          <NavbarItem className="text-xl ">
            <Link color="foreground">About</Link>
          </NavbarItem>
          <NavbarItem className="text-xl ">
            <Link color="foreground">Login</Link>
          </NavbarItem>
        </NavbarContent>

        {/* =========================for small device menu====================== */}

        <NavbarMenu className="z-20">
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
        </NavbarMenu>

        {/* =================icons fro large  device========== */}

        <NavbarContent className="hidden lg:flex" justify="end">
          <NavbarItem className="flex justify-center items-center gap-2">
            <FcCustomerSupport className="text-3xl" />
            <p className="text-md text-black"> Help</p>
          </NavbarItem>

          <NavbarItem className="flex justify-center items-center gap-2">
            <LiaFlagUsaSolid className="text-3xl text-red-400" />

            <p className="text-md text-black"> En / Us</p>
          </NavbarItem>
        </NavbarContent>

        {/* =================icons fro small  device========== */}

        <NavbarContent className=" lg:hidden text-black" justify="end">
          <NavbarItem className="lex flex-col justify-center">
            <RxAvatar className="text-4xl" />
          </NavbarItem>

          <NavbarItem className=" flex flex-col justify-center">
            <div className=" flex flex-col justify-center items-center  mx-auto">
              <IoCartOutline className="text-4xl" />
            </div>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default BottomNav;
