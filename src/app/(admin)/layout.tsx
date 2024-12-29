import NavBar from "@/src/components/module/Home/NavBar";
import DashboardNavbar from "@/src/components/module/admin/DashboardNavbar";
import AdminSidebar from "@/src/components/module/admin/adminSidebar";
import Sidebar from "@/src/components/module/vendor/Sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div className="flex  gap-5">
        <div className="w-auto   z-30">
          <AdminSidebar />
        </div>
        <main className="w-full absolute md:relative z-10">
          <DashboardNavbar />
          {children}
        </main>
      </div>
    </div>
  );
}
