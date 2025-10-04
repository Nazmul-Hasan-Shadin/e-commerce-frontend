"use client";

import React, { useState } from "react";
import { FaShoppingCart, FaCog, FaClipboardList } from "react-icons/fa";
import { GoChecklist } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";

import { useAppSelector } from "@/src/redux/hook";
import { verifyToken } from "@/src/utils/verifyToke";
import { ModifiedJwtPayload } from "@/src/types";
import { SidebarItem } from "@/src/components/module/vendor/SidebarItem";
import { useSideBar } from "@/src/ContextProvider/sideBarContex";

const AdminSidebar = () => {
  // const [isOpen, setIsOpen] = useState(true);
  const { isOpen, toggleSidebar } = useSideBar();
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
    <div className={` fixed z-50`} style={{ zIndex: 50 }}>
      <div
        className={`flex flex-col ${isOpen ? "" : "hidden sm:block"}  bg-gray-800 h-screen text-white ${
          isOpen ? " w-full  md:w-64 lg:w-64" : "w-0 md:w-20"
        } transition-all duration-300`}
      >
        {/* ==========Logo and name =============== */}
        <div className="flex items-center justify-between p-1 md:p-4">
          <div className="flex items-center space-x-2 gap-4">
            <div className="bg-orange-500 hidden md:block p-2 rounded-full">
              <FaShoppingCart className="h-6  w-6 text-white" />
            </div>
            {isOpen && (
              <h1 className=" hidden sm:block sm:text-medium md:text-lg lg:text-xl font-bold">
                Larkon
              </h1>
            )}
          </div>
        </div>

        {/*============ Navigation Links=========== */}

        <nav className="flex flex-col space-y-4 mt-6 pl-4 ">
          {/* Dashboard */}
          <SidebarItem
            icon={<FaClipboardList />}
            isOpen={isOpen}
            label="Dashboard"
            path="/dashboard"
          />
          <SidebarItem
            icon={<IoHomeOutline />}
            isOpen={isOpen}
            label="Home"
            path="/"
          />

          {/* Category */}

          <SidebarItem
            icon={<FaPlus />}
            isOpen={isOpen}
            label="Add Category"
            path={`/${user?.role || "admin"}/dashboard/category`}
          />
          <SidebarItem
            icon={<FaClipboardList />}
            isOpen={isOpen}
            label="Category"
            path="/admin/dashboard/category-list"
          />

          <SidebarItem
            icon={<GoChecklist />}
            isOpen={isOpen}
            label="Product"
            path={`/${user?.role}/dashboard/product`}
          />
          <SidebarItem
            icon={<GoChecklist />}
            isOpen={isOpen}
            label="Shop"
            path={`/${user?.role}/dashboard/shop`}
          />
          {/* Orders */}

          <SidebarItem
            icon={<GoChecklist />}
            isOpen={isOpen}
            label="Order"
            path={`/${user?.role}/dashboard/order`}
          />

          {/* Settings */}
          <SidebarItem
            icon={<FaCog />}
            isOpen={isOpen}
            label="Settings"
            path="/settings"
          />
        </nav>
      </div>
    </div>
  );
};

export default AdminSidebar;
