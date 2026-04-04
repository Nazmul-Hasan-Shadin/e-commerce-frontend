"use client";
import { ReactNode } from "react";

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
    <div className="flex  gap-0 sm:gap-3 md:gap-4 lg:gap-5">
            {isOpen && (
        <div role="button"
          onClick={toggleSidebar}
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
        />
      )} 
      <div className={`relative z-50  mt-16 ${isOpen ? "" : ""} `}>
        <div className={` h-screen bg-gray-800  `}>{sidebar}</div>
      </div>

      <main
        className={`w-full     md:relative z-30 ${isOpen ? "md:ml-40 lg:ml-[256px]" : "md:ml-20 lg:ml-24"}`}
      >
        <DashboardNavbar />
        {children}
      </main>
    </div>
  );
}
