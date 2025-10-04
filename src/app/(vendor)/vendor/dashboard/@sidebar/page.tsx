"use client";

import React from "react";
import { FaShoppingCart, FaCog, FaClipboardList } from "react-icons/fa";
import { FaPlus } from "react-icons/fa6";

import { useAppSelector } from "@/src/redux/hook";
import { SidebarItem } from "@/src/components/module/vendor/SidebarItem";
import { useSideBar } from "@/src/ContextProvider/sideBarContex";

const Sidebar = () => {
  // const [isOpen, setIsOpen] = useState(true);
  // const [openMenu, setOpenMenu] = useState<string | null>(null);
  const user = useAppSelector((state) => state.auth.user);

  const { isOpen, toggleSidebar } = useSideBar();

  return (
    <div className={` fixed z-50 md:top-0 `}>
      <div
        className={`flex flex-col ${isOpen ? "" : "hidden sm:block"}  bg-gray-800 h-screen text-white ${
          isOpen ? " w-full  md:w-64 lg:w-64" : "w-0 md:w-20"
        } transition-all duration-300`}
      >
        {/* Logo Section */}
        <div className="flex items-center justify-between p-1 md:p-4">
          <div className="flex items-center space-x-2 gap-4">
            <div className="bg-orange-500 hidden md:block p-2 rounded-full">
              <FaShoppingCart className="h-6  w-6 text-white" />
            </div>
            {isOpen && (
              <h1 className=" hidden sm:block sm:text-medium md:text-lg lg:text-xl font-bold">
                Mart
              </h1>
            )}
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
  );
};

export default Sidebar;
