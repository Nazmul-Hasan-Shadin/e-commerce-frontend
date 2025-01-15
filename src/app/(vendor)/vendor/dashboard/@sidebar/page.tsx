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
import { RxHamburgerMenu } from "react-icons/rx";
import { SidebarItem } from "@/src/components/module/vendor/SidebarItem";
import { SidebarMenu } from "@/src/components/module/vendor/SidbarMenu";
import { FaPlus } from "react-icons/fa6";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const user = useAppSelector((state) => state.auth.user);

  const toggleMenu = (menu: string) => {
    setOpenMenu(openMenu === menu ? null : menu);
  };

  return (
    <div className={`${isOpen ? "md:w-[256] " : "w-20"}`}>
      <div className="fixed">
        <div
          className={`flex flex-col bg-white text-black h-screen  ${
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
            <button
              onClick={() => setIsOpen(!isOpen)} // arrow button for collaps sidebar
              className={`text-red-400 absolute ${isOpen ? "left-[160px] md:left-[280px] md:top-5" : "top-5 left-5 md:left-36"} hover:text-white`}
            >
              <RxHamburgerMenu
                className={`h-6 w-6 transform text-black ${isOpen ? "rotate-180" : ""}`}
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
              label="Create Shop"
              icon={<FaClipboardList />}
              isOpen={isOpen}
              path="/vendor/dashboard/create-shop"
            />
            <SidebarItem
              label="Dashboard"
              icon={<FaClipboardList />}
              isOpen={isOpen}
              path="/vendor/dashboard"
            />

            <SidebarItem
              label="Add Product"
              icon={<FaPlus />}
              isOpen={isOpen}
              path="/vendor/dashboard/products/add-product"
            />
            <SidebarItem
              label=" Products"
              icon={<FaPlus />}
              isOpen={isOpen}
              path={`/${user?.role}/dashboard/products`}
            />

            {/* Products
            {user && (
              <SidebarMenu
                label="Products"
                icon={<FaTshirt />}
                isOpen={isOpen}
                isMenuOpen={openMenu === "products"}
                onClick={() => toggleMenu("products")}
                items={[
                  {
                    name: "Create Products",
                    path: "/vendor/dashboard/products/add-product",
                  },
                  {
                    name: "Products",
                    path: `/${user.role}/dashboard/products`,
                  },
                ]}
              />
            )} */}

            {/* Inventory */}
            {/* <SidebarMenu
              label="Inventory"
              icon={<FaWarehouse />}
              isOpen={isOpen}
              isMenuOpen={openMenu === "inventory"}
              onClick={() => toggleMenu("inventory")}
              items={[
                { name: "Warehouse", path: "/inventory/warehouse" },
                { name: "Received Orders", path: "/inventory/received-orders" },
              ]}
            /> */}

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

            {user && (
              <SidebarItem
                label="Order"
                icon={<FaClipboardList />}
                isOpen={isOpen}
                path={`/${user.role}/dashboard/order`}
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
    </div>
  );
};

export default Sidebar;
