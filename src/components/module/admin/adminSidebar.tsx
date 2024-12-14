"use client";

import React, { useState } from "react";
import {
  FaTshirt,
  FaCubes,
  FaWarehouse,
  FaShoppingCart,
  FaCog,
  FaChevronDown,
  FaBoxOpen,
  FaClipboardList,
} from "react-icons/fa";
import Link from "next/link"; // Import Link from next/link
import { SidebarItem } from "../vendor/SidebarItem";
import { SidebarMenu } from "../vendor/SidbarMenu";
import { useAppSelector } from "@/src/redux/hook";
import { jwtDecode } from "jwt-decode";
import { verifyToken } from "@/src/utils/verifyToke";
import { ModifiedJwtPayload } from "@/src/types";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const token = useAppSelector((state) => state.auth.token);

  const user = verifyToken(token as string) as ModifiedJwtPayload;

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className="">
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

          {/* Category */}
          <SidebarMenu
            label="Category"
            icon={<FaCubes />}
            isOpen={isOpen}
            isMenuOpen={openMenu === "category"}
            onClick={() => toggleMenu("category")}
            items={[
              {
                name: "All Categories",
                path: "/admin/dashboard/category-list",
              },
              {
                name: "Add Category",
                path: `/${user.role}/dashboard/category`,
              },
            ]}
          />

          {/* Orders */}
          <SidebarMenu
            label="Orders"
            icon={<FaBoxOpen />}
            isOpen={isOpen}
            isMenuOpen={openMenu === "orders"}
            onClick={() => toggleMenu("orders")}
            items={[
              { name: "All Orders", path: "/orders/all" },
              { name: "Pending Orders", path: "/orders/pending" },
            ]}
          />

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

export default AdminSidebar;
