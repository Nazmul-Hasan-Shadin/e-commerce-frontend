import NavBar from "@/src/components/module/Home/NavBar";
import { ReactNode } from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <main>{children}</main>
    </div>
  );
}
