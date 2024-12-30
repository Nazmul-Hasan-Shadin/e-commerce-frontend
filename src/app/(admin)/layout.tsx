import NavBar from "@/src/components/module/Home/NavBar";
import DashboardNavbar from "@/src/components/module/admin/DashboardNavbar";
import AdminSidebar from "@/src/components/module/admin/adminSidebar";
import Sidebar from "@/src/components/module/vendor/Sidebar";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div className="flex  gap-5">
        <div className="relative z-30">
          <div className=" top-0 left-0">
            <AdminSidebar />
          </div>
        </div>
        <main className="w-full bg-[#F5F6FA] absolute md:relative z-10">
          <DashboardNavbar />
          {children}
        </main>
      </div>
    </div>
  );
}
