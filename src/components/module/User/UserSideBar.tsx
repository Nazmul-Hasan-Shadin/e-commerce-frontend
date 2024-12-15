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

import { useAppSelector } from "@/src/redux/hook";
import { SidebarItem } from "@/src/components/module/vendor/SidebarItem";
import { SidebarMenu } from "@/src/components/module/vendor/SidbarMenu";

const UserSideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const user = useAppSelector((state) => state.auth.user);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div>
      <div
        className={`flex flex-col bg-gray-800 h-screen text-white ${
          isOpen ? "w-64" : "w-20"
        } transition-all duration-300`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <div className="bg-orange-500 p-2 rounded-full">
              <FaShoppingCart className="h-6 w-6 text-white" />
            </div>
            {isOpen && <h1 className="text-xl font-bold">Larkon</h1>}
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-400 hover:text-white"
          >
            <FaChevronDown
              className={`h-6 w-6 transform ${isOpen ? "rotate-180" : ""}`}
            />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col space-y-2 mt-6">
          {/* Dashboard */}
          <SidebarItem
            label="Home"
            icon={<FaClipboardList />}
            isOpen={isOpen}
            path="/"
          />

          <SidebarItem
            label="Dashboard"
            icon={<FaClipboardList />}
            isOpen={isOpen}
            path="/dashboard"
          />

          {/* Orders */}
          {user && (
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
          )}

          {/* Settings */}
          <SidebarItem
            label="Settings"
            icon={<FaCog />}
            isOpen={isOpen}
            path="/settings"
          />
        </nav>
      </div>
    </div>
  );
};

export default UserSideBar;
