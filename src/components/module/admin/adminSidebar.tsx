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
import Link from "next/link";
import { SidebarItem } from "../vendor/SidebarItem";
import { SidebarMenu } from "../vendor/SidbarMenu";
import { useAppSelector } from "@/src/redux/hook";
import { jwtDecode } from "jwt-decode";
import { verifyToken } from "@/src/utils/verifyToke";
import { ModifiedJwtPayload } from "@/src/types";
import { IoHomeOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const token = useAppSelector((state) => state.auth.token);

  let user: ModifiedJwtPayload | null = null;

  try {
    user = token ? (verifyToken(token as string) as ModifiedJwtPayload) : null;
  } catch (error: any) {
    console.error("Token verification failed:", error.message);
  }

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className={`${isOpen ? "md:w-[256] " : "w-20"}`}>
      <div className="fixed">
        <div
          className={`flex flex-col bg-gray-800 h-screen text-white ${
            isOpen ? " md:block md:w-64 lg:w-64" : "w-0 md:w-20"
          } transition-all duration-300`}
        >
          {/* ==========Logo and name =============== */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2 gap-4">
              <div className="bg-orange-500 hidden md:block p-2 rounded-full">
                <FaShoppingCart className="h-6  w-6 text-white" />
              </div>
              {isOpen && <h1 className="text-xl font-bold">Larkon</h1>}
            </div>
            <button
              onClick={() => setIsOpen(!isOpen)} // arrow button for collaps sidebar
              className={`text-red-400 absolute ${isOpen ? "left-[160px] md:left-[280px] md:top-5" : "top-5 left-5 md:left-36"} hover:text-white`}
            >
              <RxHamburgerMenu
                className={`h-6 w-6 transform text-black ${isOpen ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {/*============ Navigation Links=========== */}

          <nav className="flex flex-col space-y-4 mt-6 pl-4 ">
            {/* Dashboard */}
            <SidebarItem
              label="Home"
              icon={<IoHomeOutline />}
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
                  path: `/${user?.role || "admin"}/dashboard/category`,
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
                { name: "All Orders", path: `/${user?.role}/dashboard/order` },
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
    </div>
  );
};

export default AdminSidebar;
