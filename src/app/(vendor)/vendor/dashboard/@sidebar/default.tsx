"use client";

import React, { useState } from "react";
import { FaShoppingCart, FaCog, FaClipboardList } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import { FaPlus } from "react-icons/fa6";

import { useAppSelector } from "@/src/redux/hook";
import { SidebarItem } from "@/src/components/module/vendor/SidebarItem";
import { useSideBar } from "@/src/ContextProvider/sideBarContex";

const Sidebar = () => {
  // const [isOpen, setIsOpen] = useState(true);
  // const [openMenu, setOpenMenu] = useState<string | null>(null);
  const user = useAppSelector((state) => state.auth.user);

  const { isOpen, toggleSidebar } = useSideBar();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  return (
    <div>
      <button
        className={`text-red-400 absolute ${isOpen ? "left-[173px] md:left-[280px] lg:left-[300px] top-3 md:top-5" : "top-5 left-5 lg:left-28 md:left-24"} hover:text-white z-20`}
        onClick={() => toggleSidebar()} // arrow button for collaps sidebar
      >
        <RxHamburgerMenu
          className={`h-6 w-6 transform text-black ${isOpen ? "rotate-180" : ""}`}
        />
      </button>
      <div className={`${isOpen ? "lg:w-full " : "   lg:w-20"} fixed`}>
        <div
          className={`flex flex-col bg-gray-800 h-screen text-white ${
            isOpen ? " md:block md:w-64 lg:w-64" : "w-0 md:w-20"
          } transition-all duration-300`}
        >
          {/* Logo Section */}
          <div className="flex items-center justify-between p-4">
            <div className="flex items-center space-x-2 gap-4">
              <div className="bg-orange-500 hidden md:block p-2 rounded-full">
                <FaShoppingCart className="h-6  w-6 text-white" />
              </div>
              {isOpen && <h1 className="text-xl font-bold">Dashboard</h1>}
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-2 mt-6">
            {/* Dashboard */}
            <SidebarItem
              icon={<FaClipboardList />}
              isOpen={isOpen}
              label="Home"
              path="/"
            />
            <SidebarItem
              icon={<FaClipboardList />}
              isOpen={isOpen}
              label="Create Shop"
              path="/vendor/dashboard/create-shop"
            />
            <SidebarItem
              icon={<FaClipboardList />}
              isOpen={isOpen}
              label="Dashboard"
              path="/vendor/dashboard"
            />

            <SidebarItem
              icon={<FaPlus />}
              isOpen={isOpen}
              label="Add Product"
              path="/vendor/dashboard/products/add-product"
            />
            <SidebarItem
              icon={<FaPlus />}
              isOpen={isOpen}
              label=" Products"
              path={`/${user?.role}/dashboard/products`}
            />

            {user && (
              <SidebarItem
                icon={<FaClipboardList />}
                isOpen={isOpen}
                label="Order"
                path={`/${user.role}/dashboard/order`}
              />
            )}

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
    </div>
  );
};

export default Sidebar;
