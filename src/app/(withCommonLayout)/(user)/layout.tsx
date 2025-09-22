import React from "react";

import UserSideBar from "@/src/components/module/User/UserSideBar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex  bg-white flex-col md:flex md:flex-row 2xl:justify-center  gap-1">
      <div className="md:w-96 border">
        <UserSideBar />
      </div>
      <main className="w-full max-w-8xl mx-auto px-2 bg-white">{children}</main>
    </div>
  );
}
