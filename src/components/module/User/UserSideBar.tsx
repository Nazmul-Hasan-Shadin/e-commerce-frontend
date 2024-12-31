"use client";

import React, { useState } from "react";
import {
  FaTshirt,
  FaWarehouse,
  FaShoppingCart,
  FaCog,
  FaChevronDown,
  FaBoxOpen,
  FaClipboardList,
} from "react-icons/fa";
import { CgProfile } from "react-icons/cg";

import { useAppSelector } from "@/src/redux/hook";
import { SidebarItem } from "@/src/components/module/vendor/SidebarItem";
import { RiListOrdered2 } from "react-icons/ri";
import Image from "next/image";

const UserSideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const user = useAppSelector((state) => state.auth.user);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div
      className={`flex flex-col bg-white text-black h-screen  transition-all duration-300 pl-3`}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <div>
            <Image
              src={"https://i.pravatar.cc/150?u=a042581f4e29026704d"}
              width={90}
              alt="user image"
              height={100}
              className="rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-2 mt-6 pl-5">
        {/* Dashboard */}

        <SidebarItem
          label="Profile"
          icon={<CgProfile className="text-2xl" />}
          isOpen={isOpen}
          path="/dashboard"
        />
        <SidebarItem
          label="Order"
          icon={<RiListOrdered2 className="text-2xl" />}
          isOpen={isOpen}
          path="/user/dashboard/order"
        />

        {/* Orders */}
        {/* {user && (
          <SidebarMenu
            label="Orders"
            icon={<FaBoxOpen />}
            isOpen={isOpen}
            isMenuOpen={openMenu === "orders"}
            onClick={() => toggleMenu("orders")}
            items={[
              { name: "All Orders", path: `/${user.role}/dashboard/order` },
            ]}
          />
        )} */}

        {/* Settings */}
        <SidebarItem
          label="Settings"
          icon={<FaCog />}
          isOpen={isOpen}
          path="/user/dashboard/settings"
        />
      </nav>
    </div>
  );
};

export default UserSideBar;
