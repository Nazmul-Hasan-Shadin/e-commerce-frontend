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
  const { isOpen } = useSideBar();

  return (
    <div className="">
      <div className="flex  gap-5">
        <div className="relative z-30">
          <div className=" top-0 left-0">{sidebar}</div>
        </div>
        <main
          className={`w-full bg-[#F1F5F9]  md:relative z-10 ${isOpen ? "md:ml-40 lg:ml-[256px]" : "md:ml-20 lg:ml-24"}`}
        >
          <DashboardNavbar />
          {children}
        </main>
      </div>
    </div>
  );
}
