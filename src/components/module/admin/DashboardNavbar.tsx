"use client";
import { Input } from "@heroui/input";
import { Navbar, NavbarContent, NavbarItem } from "@heroui/navbar";
import React from "react";
import { IoSearchOutline } from "react-icons/io5";
import { CiShoppingCart } from "react-icons/ci";
import { IoIosNotificationsOutline } from "react-icons/io";
import "./module.style.css";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";
import { GoSearch } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import { useSideBar } from "@/src/ContextProvider/sideBarContex";

const DashboardNavbar = () => {
  const { toggleSidebar, isOpen } = useSideBar();

  return (
    <Navbar className=" bg-white w-full  visiblebro" style={{ zIndex: 20 }}>
      <NavbarContent justify="start">
        <RxHamburgerMenu
          className={`text-2xl lg:relative ${isOpen ? 'lg:right-24':' lg:right-40'}`}
          onClick={() => toggleSidebar()}
        />
      </NavbarContent>

      {/* Left Section: Search Input for lagrge device */}
      <NavbarContent>
        <Input
          className="w-64 hidden md:block"
          endContent={<IoSearchOutline className="text-gray-500" />}
          placeholder="Search here"
        />
      </NavbarContent>

      {/* Center Section: Icons */}
      <NavbarContent justify="end">
        <GoSearch className=" text-xl" />
        <NavbarItem>
          <CiShoppingCart className="text-xl text-gray-700 cursor-pointer" />
        </NavbarItem>
        <NavbarItem>
          <IoIosNotificationsOutline className="text-xl text-gray-700 cursor-pointer" />
        </NavbarItem>

        <Dropdown
          className="visiblebro"
          placement="bottom-end"
          style={{ opacity: 1 }}
        >
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="secondary"
              name="Jason Hughes"
              size="sm"
              src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
            />
          </DropdownTrigger>
          <DropdownMenu
            aria-label="Profile Actions"
            className="visiblebro"
            variant="flat"
          >
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Signed in as</p>
              <p className="font-semibold">zoey@example.com</p>
            </DropdownItem>
            <DropdownItem key="settings">My Profile</DropdownItem>
            <DropdownItem key="team_settings"> Settings</DropdownItem>

            <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
            <DropdownItem key="logout" color="danger">
              Log Out
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>

      {/* Right Section: User Profile Dropdown */}
    </Navbar>
  );
};

export default DashboardNavbar;
