import React from "react";

import UserSideBar from "@/src/components/module/User/UserSideBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex  flex-col md:flex md:flex-row  gap-5">
      <div className="w-80">
        <UserSideBar />
      </div>
      <main className="w-full max-w-7xl mx-auto px-5">{children}</main>
    </div>
  );
}
