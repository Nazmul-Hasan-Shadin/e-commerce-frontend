import { ReactNode } from "react";

import DashboardNavbar from "@/src/components/module/admin/DashboardNavbar";

export default function layout({
  children,
  sidebar,
}: {
  children: React.ReactNode;
  sidebar: ReactNode;
}) {
  return (
    <div className="flex  gap-5">
      <div className="relative z-30">
        <div className=" top-0 left-0">
          <>{sidebar}</>
        </div>
      </div>
      <main className="w-full bg-[#F5F6FA] absolute md:relative z-10">
        <DashboardNavbar />
        {children}
      </main>
    </div>
  );
}
