"use client";
import { ReactNode } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import DashboardNavbar from "@/src/components/module/admin/DashboardNavbar";
import {
  SideBarProvider,
  useSideBar,
} from "@/src/ContextProvider/sideBarContex";

export default function DashboardLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <SideBarProvider>
      <InnerLayout sidebar={sidebar}> {children} </InnerLayout>
    </SideBarProvider>
  );
}

function InnerLayout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: ReactNode;
}) {
  const { isOpen, toggleSidebar } = useSideBar();

  return (
    <div className="">
      <div className="flex  relative border  md:gap-5">
        <div className={`relative ${isOpen ? "" : ""} `}>
          <div
            className={`lg:fixed ${`${isOpen ? "absolute md:fixed right-12px" : ""}`}   h-screen bg-gray-800  `}
            style={{ zIndex: 30 }}
          >
            {sidebar}
          </div>
        </div>

        {/* <button
          className={`fixed  top-2 z-50 ${isOpen ? "left-[170px] md:left-[190px] lg:left-[calc(17rem)] " : "md:left-[90px] lg:left-[calc(6rem)] "}`} // sidebar open হলে পাশে
          onClick={toggleSidebar}
        >
          <RxHamburgerMenu className="h-6 w-6 text-black bg-primary-color text-white " />
        </button> */}

        <main
          className={`w-full bg-[#F1F5F9]  md:relative  ${isOpen ? "md:ml-40 lg:ml-[256px]" : " md:ml-20 lg:ml-24"}`}
        >
          <DashboardNavbar />
          {children}
        </main>
      </div>
    </div>
  );
}
