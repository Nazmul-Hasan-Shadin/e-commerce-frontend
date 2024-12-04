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

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <div className="">
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
          <NavbarItem>
            <div className="text-white flex flex-col justify-center items-center  mx-auto">
              <GiSelfLove className="text-4xl" />
              <span> watchlist</span>
            </div>
          </NavbarItem>

          <NavbarItem className="text-white flex flex-col justify-center">
            <RxAvatar className="text-4xl" />
            <span> signin</span>
          </NavbarItem>

          <NavbarItem className="text-white flex flex-col justify-center">
            <div className="text-white flex flex-col justify-center items-center  mx-auto">
              <IoCartOutline className="text-4xl" />
              <span> cart</span>
            </div>
          </NavbarItem>

          <NavbarItem className="text-white flex flex-col justify-center">
            <GiSelfLove className="text-4xl" />
            <span> watchlist</span>
          </NavbarItem>
        </NavbarContent>

        {/* <NavbarContent className="hidden sm:flex" justify="end">
          <NavbarItem className="text-white flex flex-col justify-center">
            <GiSelfLove className="text-4xl" />
            <span> watchlist</span>
          </NavbarItem>

          <NavbarItem>
            <Link className="text-white">Product</Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-white">Dashboard</Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-white">About</Link>
          </NavbarItem>
          <NavbarItem>
            <Link className="text-white">Login</Link>
          </NavbarItem>
        </NavbarContent> */}

        {/* =========================for small device menu====================== */}

        <NavbarMenu className="z-20 ">
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

        {/* ==================Navbar rightside content=========== */}
      </Navbar>
    </div>
  );
};

export default NavBar;
