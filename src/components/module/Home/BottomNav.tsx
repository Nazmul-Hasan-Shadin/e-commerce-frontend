"use client";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  Button,
} from "@nextui-org/react";
import styles from "./bottomNav.module.css";
import Link from "next/link";

import { IoSearchOutline } from "react-icons/io5";

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
import { useAppDispatch, useAppSelector } from "@/src/redux/hook";
import { logOut } from "@/src/redux/feature/auth/auth.slice";
import { usePathname } from "next/navigation";

const BottomNav = () => {
  const pathname = usePathname();
  console.log(pathname);

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isMegaMenuOpen, setIsMegaMenuOpen] = React.useState(false);
  const token = useAppSelector((state) => state.auth.token);

  const user = useAppSelector((state) => state.auth.user);
  const dispatch = useAppDispatch();
  const menuItems = user?.role
    ? [
        { label: "Home", link: "/" },
        { label: "Product", link: "/product" },
        { label: "Dashboard", link: `/${user!.role}/dashboard` },
        { label: "Shop", link: "/shop" },

        { label: "About", link: "/about" },
      ]
    : [
        { label: "Home", link: "/" },
        { label: "Product", link: "/product" },
        { label: "Shop", link: "/shop" },

        { label: "About", link: "/about" },

        { label: "Register", link: "/register" },
      ];

  return (
    <div className="sticky top-0 z-20">
      <Navbar
        onMenuOpenChange={setIsMenuOpen}
        isMenuOpen={isMenuOpen}
        className="bg-[#ffffff] p-0  text-white "
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
        <NavbarBrand
          className="flex gap-5 items-center hidden lg:flex relative"
          onMouseEnter={() => setIsMegaMenuOpen(true)}
          onMouseLeave={() => setIsMegaMenuOpen(false)}
        >
          <AiOutlineMenuUnfold className="text-primary-color text-3xl " />
          <p className="text-black font-medium text-2xl">Categories</p>
          <MdKeyboardArrowDown className="text-black text-xl" />

          {/* Mega Menu */}
          {isMegaMenuOpen && (
            <div className="absolute top-full left-0 w-screen bg-white text-black shadow-lg z-10">
              <div className="grid grid-cols-4 gap-8 p-6">
                {/* Category 1 */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Clothing</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/category/men">Men</Link>
                    </li>
                    <li>
                      <Link href="/category/women">Women</Link>
                    </li>
                    <li>
                      <Link href="/category/kids">Kids</Link>
                    </li>
                    <li>
                      <Link href="/category/accessories">Accessories</Link>
                    </li>
                  </ul>
                </div>
                {/* Category 2 */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Electronics</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="http://localhost:3000/product?categoryName=ac71f956-f2eb-4a57-af36-321cc234496a">
                        Mobiles
                      </Link>
                    </li>
                    <li>
                      <Link href="http://localhost:3000/product?categoryName=9315c256-f16b-4ca2-ae8e-18832af8b380">
                        Laptops
                      </Link>
                    </li>
                    <li>
                      <Link href="http://localhost:3000/product?categoryName=0d02365f-d9a8-405b-be99-de69c37d2a78">
                        Electronics
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/accessories">Accessories</Link>
                    </li>
                  </ul>
                </div>
                {/* Category 3 */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Home Appliances
                  </h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/category/refrigerators">Refrigerators</Link>
                    </li>
                    <li>
                      <Link href="/category/washing-machines">
                        Washing Machines
                      </Link>
                    </li>
                    <li>
                      <Link href="/category/microwaves">Microwaves</Link>
                    </li>
                    <li>
                      <Link href="/category/air-conditioners">
                        Air Conditioners
                      </Link>
                    </li>
                  </ul>
                </div>
                {/* Category 4 */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">Beauty</h3>
                  <ul className="space-y-2">
                    <li>
                      <Link href="/category/skincare">Skincare</Link>
                    </li>
                    <li>
                      <Link href="/category/makeup">Makeup</Link>
                    </li>
                    <li>
                      <Link href="/category/haircare">Haircare</Link>
                    </li>
                    <li>
                      <Link href="/category/fragrances">Fragrances</Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </NavbarBrand>

        {/* =============logo for small device=========== */}

        <NavbarBrand className="flex  lg:hidden gap-0 -p-16">
          {logo ? (
            <Image alt="Navbar logo" src={logo} width={150} height={50} />
          ) : null}
        </NavbarBrand>

        {/* ================ menu for large device============ */}

        <NavbarContent className="gap-20 hidden  lg:flex" justify="center">
          {menuItems.map((menu, index) => (
            <NavbarItem key={index} className="text-white">
              <li
                className={`${styles.navItem} ${pathname === menu.link ? styles.active : ""}`}
              >
                <Link href={menu.link} className="text-black">
                  {menu.label}
                </Link>
              </li>
            </NavbarItem>
          ))}

          {token ? (
            <NavbarItem key="logout" className="text-white">
              <Button onPress={() => dispatch(logOut())}>LogOut</Button>
            </NavbarItem>
          ) : (
            <NavbarItem key="login" className="text-white">
              <Link href="/login" className="text-black">
                Login
              </Link>
            </NavbarItem>
          )}
        </NavbarContent>

        {/* =========================for small device menu====================== */}

        <NavbarMenu>
          <NavbarMenu>
            {menuItems.map((menu, index) => (
              <NavbarItem key={index} className="text-white">
                <Link href={menu.link} className="text-black">
                  {menu.label}
                </Link>
              </NavbarItem>
            ))}
          </NavbarMenu>
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
            <RxAvatar className="text-3xl" />
          </NavbarItem>

          <NavbarItem className=" flex flex-col justify-center">
            <div className=" flex flex-col justify-center items-center  mx-auto">
              <IoCartOutline className="text-3xl" />
            </div>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
};

export default BottomNav;
