import NavBar from "@/src/components/module/Home/NavBar";
import AdminSidebar from "@/src/components/module/admin/adminSidebar";
import Sidebar from "@/src/components/module/vendor/Sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex  gap-5">
      <div className="w-80">
        <AdminSidebar />
      </div>
      <main className="w-full">{children}</main>
    </div>
  );
}
