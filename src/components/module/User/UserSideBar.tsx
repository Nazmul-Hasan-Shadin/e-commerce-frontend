"use client";

import React, { useState } from "react";
import { FaCog } from "react-icons/fa";
import { CgProfile } from "react-icons/cg";
import { RiListOrdered2 } from "react-icons/ri";
import Image from "next/image";

import { useAppSelector } from "@/src/redux/hook";
import { SidebarItem } from "@/src/components/module/vendor/SidebarItem";
import { Button } from "@heroui/button";

const UserSideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const user = useAppSelector((state) => state.auth.user);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div
      className={`flex flex-col bg-white text-black h-auto md:h-screen transition-all duration-300 `}
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-2">
          <div>
            <Image
              alt="user image"
              className="rounded-full"
              height={100}
              src={"https://i.pravatar.cc/150?u=a042581f4e29026704d"}
              width={90}
            />
          </div>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex flex-col space-y-2 mt-6">
        {/* Dashboard */}
        <SidebarItem
          icon={<CgProfile className="text-2xl" />}
          isOpen={isOpen}
          label="Dashboard"
          path="/user/dashboard"
        />
        <SidebarItem
          icon={<CgProfile className="text-2xl" />}
          isOpen={isOpen}
          label="Orders "
          path="/user/dashboard/orders"
        />
        <SidebarItem
          icon={<RiListOrdered2 className="text-2xl" />}
          isOpen={isOpen}
          label="Order Items"
          path="/user/dashboard/order"
        />

        <SidebarItem
          icon={<RiListOrdered2 className="text-2xl" />}
          isOpen={isOpen}
          label="Review"
          path="/user/dashboard/review"
        />

        {/* Settings */}
        <SidebarItem
          icon={<FaCog />}
          isOpen={isOpen}
          label="Settings"
          path="/user/dashboard/settings"
        />

        <Button className="rounded-none" variant="ghost">
          Log Out
        </Button>
      </nav>
    </div>
  );
};

export default UserSideBar;
