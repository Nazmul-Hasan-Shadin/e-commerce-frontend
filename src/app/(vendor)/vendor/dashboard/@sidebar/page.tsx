"use client";

import React from "react";
import { FaShoppingCart, FaCog, FaClipboardList } from "react-icons/fa";
import { RiCouponLine } from "react-icons/ri";
import { LuLayoutDashboard, LuStore } from "react-icons/lu";

import { FaPlus } from "react-icons/fa6";

import { useAppSelector } from "@/src/redux/hook";
import { SidebarItem } from "@/src/components/module/vendor/SidebarItem";
import { useSideBar } from "@/src/ContextProvider/sideBarContex";
import { useGetCurrentUserQuery } from "@/src/redux/feature/auth/auth.api";
import { IoHomeOutline } from "react-icons/io5";
import { FiPackage, FiShoppingBag } from "react-icons/fi";

const Sidebar = () => {
  const user = useAppSelector((state) => state.auth.user);
  const { data: userData } = useGetCurrentUserQuery(undefined);
  const { isOpen, toggleSidebar } = useSideBar();
  console.log(isOpen, "isOpen sidebar");

  return (
    <div
      className={` fixed  ${isOpen ? "w-[61%] sm:w-[46%] md:w-64" : "sm:w-16 "} bg-gray-800  
       md:top-0 `}
    >
   

      <div
        className={`flex flex-col ${isOpen ? "" : "hidden sm:block"}  h-screen text-white transition-all duration-300`}
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
            icon={<IoHomeOutline />}
            isOpen={isOpen}
            label="Home"
            path="/"
          />
          {!userData?.data?.shop && (
            <SidebarItem
              icon={<LuStore />}
              isOpen={isOpen}
              label="Create Shop"
              path={`/${user?.role}/dashboard/create-shop`}
            />
          )}
          <SidebarItem
            icon={<LuLayoutDashboard />}
            isOpen={isOpen}
            label="Dashboard"
            path="/vendor/dashboard"
          />

          <SidebarItem
            icon={<FaPlus />}
            isOpen={isOpen}
            label="Add Product"
            path={`/${user?.role}/dashboard/products/add-product`}
          />
          <SidebarItem
            icon={<RiCouponLine />}
            isOpen={isOpen}
            label="Add Coupon"
            path={`/${user?.role}/dashboard/add-coupon`}
          />
          <SidebarItem
            icon={<FiShoppingBag />}
            isOpen={isOpen}
            label=" Products"
            path={`/${user?.role}/dashboard/products`}
          />

          {user && (
            <SidebarItem
              icon={<FiPackage />}
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
